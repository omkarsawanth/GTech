import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import {
  startTestServer,
  stopTestServer,
  createTestUserToken,
  clearFirestoreEmulator,
  API_BASE,
} from './testHelper.js';
import { db } from '../../config/firebaseAdmin.js';

describe('Kalpa Authenticated API Integration Suite', () => {
  beforeAll(async () => {
    await startTestServer();
  });

  afterAll(async () => {
    await stopTestServer();
  });

  beforeEach(async () => {
    await clearFirestoreEmulator();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 1. Roast Rate Limiting & Persistent Firestore Counter
  // ──────────────────────────────────────────────────────────────────────────
  describe('Roast Generation & Daily Persistent Rate Limiting', () => {
    it('allows exactly 5 roasts per user per day and rejects the 6th with 429 ROAST_DAILY_LIMIT_REACHED', async () => {
      const user = await createTestUserToken('roast-rate-limit-user');

      const roastPayload = {
        skills: ['JavaScript', 'HTML'],
        targetRole: 'Software Engineer',
        missingSkills: ['TypeScript', 'Docker', 'Kubernetes'],
      };

      // Requests 1 through 5 must all succeed (200)
      for (let i = 1; i <= 5; i++) {
        const response = await fetch(`${API_BASE}/api/roast/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.idToken}`,
          },
          body: JSON.stringify(roastPayload),
        });

        const data = await response.json();
        expect(response.status, `Request #${i} should return HTTP 200`).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.roast).toBeDefined();
        expect(data.data.punchline).toBeDefined();
      }

      // Verify Firestore persistent limit counter directly
      const todayUTC = new Date().toISOString().slice(0, 10);
      const limitDoc = await db.collection('rateLimits').doc(`roast_${user.uid}_${todayUTC}`).get();
      expect(limitDoc.exists).toBe(true);
      expect(limitDoc.data().count).toBe(5);

      // The 6th request must be rejected with HTTP 429 ROAST_DAILY_LIMIT_REACHED
      const sixthResponse = await fetch(`${API_BASE}/api/roast/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
        body: JSON.stringify(roastPayload),
      });

      const sixthData = await sixthResponse.json();
      expect(sixthResponse.status).toBe(429);
      expect(sixthData.success).toBe(false);
      expect(sixthData.error.code).toBe('ROAST_DAILY_LIMIT_REACHED');
      expect(sixthData.error.message).toContain("You've used all 5 roasts for today");
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Squad Lifecycle & 5-Member Room Capacity Enforcement
  // ──────────────────────────────────────────────────────────────────────────
  describe('Squad Rooms Lifecycle & Capacity Enforcement', () => {
    it('creates squad, lets members join, and enforces max 5-member capacity rejection on 6th recruit', async () => {
      // User 1 creates squad
      const founder = await createTestUserToken('squad-founder-user');
      const createRes = await fetch(`${API_BASE}/api/squad/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${founder.idToken}`,
        },
        body: JSON.stringify({
          name: 'Cyber Strike Alpha',
          careerFocus: 'AI Systems Architect',
        }),
      });

      expect(createRes.status).toBe(201);
      const squadCreated = await createRes.json();
      expect(squadCreated.success).toBe(true);
      const squadId = squadCreated.data.id;
      const inviteCode = squadCreated.data.inviteCode;
      expect(inviteCode).toBeDefined();
      expect(squadCreated.data.members).toHaveLength(1);
      expect(squadCreated.data.spotsRemaining).toBe(4);

      // Users 2, 3, 4, 5 join using inviteCode
      for (let i = 2; i <= 5; i++) {
        const recruit = await createTestUserToken(`squad-member-${i}`);
        const joinRes = await fetch(`${API_BASE}/api/squad/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${recruit.idToken}`,
          },
          body: JSON.stringify({ inviteCode }),
        });

        expect(joinRes.status, `Recruit #${i} should join successfully`).toBe(200);
        const joinData = await joinRes.json();
        expect(joinData.success).toBe(true);
        expect(joinData.data.members).toHaveLength(i);
        expect(joinData.data.spotsRemaining).toBe(5 - i);
      }

      // Verify Firestore squad document member count and memberUids array
      const squadDoc = await db.collection('squads').doc(squadId).get();
      expect(squadDoc.exists).toBe(true);
      const squadData = squadDoc.data();
      expect(squadData.members).toHaveLength(5);
      expect(squadData.memberUids).toHaveLength(5);

      // 6th candidate attempts to join full room -> rejected with HTTP 400
      const sixthCandidate = await createTestUserToken('squad-member-6');
      const rejectRes = await fetch(`${API_BASE}/api/squad/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sixthCandidate.idToken}`,
        },
        body: JSON.stringify({ inviteCode }),
      });

      const rejectData = await rejectRes.json();
      expect(rejectRes.status).toBe(400);
      expect(rejectData.success).toBe(false);
      expect(rejectData.error.message).toContain('max 5 members reached');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Streak Increment & Milestone Trigger
  // ──────────────────────────────────────────────────────────────────────────
  describe('Streak Calculation & Milestone Unlocks', () => {
    it('increments streak on task completion and unlocks 7-day Cyber Flamekeeper milestone in Firestore', async () => {
      const user = await createTestUserToken('streak-milestone-user');

      // Seed 6 consecutive days streak in user document (last completed yesterday)
      const yesterday = new Date();
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      await db.collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: 'Test User Streak',
        currentStreak: 6,
        lastCompletedDate: yesterdayStr,
        streakFreezes: 1,
        updatedAt: new Date(),
      });

      // Seed roadmap with task-1 completed and task-2 ready to be completed
      await db.collection('users').doc(user.uid).collection('roadmap').doc('current').set({
        career: 'software-engineer',
        roadmap: [
          {
            id: 'milestone-1',
            stageNumber: '01',
            title: 'Core Foundations',
            description: 'Core runtime principles',
            status: 'in-progress',
            progress: 50,
            skills: ['Node.js'],
            resources: [],
          },
        ],
        tasks: [
          {
            id: 'task-1',
            milestoneId: 'milestone-1',
            dayNumber: 1,
            title: 'Event Loop',
            description: 'Study event loop phases',
            durationMinutes: 20,
            status: 'completed',
            completedAt: new Date(),
          },
          {
            id: 'task-2',
            milestoneId: 'milestone-1',
            dayNumber: 2,
            title: 'Cluster & Worker Threads',
            description: 'Build threadpool demo',
            durationMinutes: 20,
            status: 'unlocked',
            completedAt: null,
          },
        ],
      });

      // Complete task-2 via API
      const completeRes = await fetch(`${API_BASE}/api/roadmap/task/task-2/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
      });

      expect(completeRes.status).toBe(200);
      const completeData = await completeRes.json();
      expect(completeData.success).toBe(true);
      expect(completeData.data.currentStreak).toBe(7);
      expect(completeData.data.streakIncremented).toBe(true);
      expect(completeData.data.milestoneUnlocked).toBeDefined();
      expect(completeData.data.milestoneUnlocked.days).toBe(7);
      expect(completeData.data.milestoneUnlocked.badge).toBe('Cyber Flamekeeper');

      // Verify Firestore user document was updated with streak=7 and milestoneUnlocked
      const updatedUserDoc = await db.collection('users').doc(user.uid).get();
      const updatedUserData = updatedUserDoc.data();
      expect(updatedUserData.currentStreak).toBe(7);
      expect(updatedUserData.lastCompletedDate).toBe(new Date().toISOString().split('T')[0]);
      expect(updatedUserData.milestoneUnlocked).toBeDefined();
      expect(updatedUserData.milestoneUnlocked.days).toBe(7);
      expect(updatedUserData.milestoneUnlocked.badge).toBe('Cyber Flamekeeper');
      expect(updatedUserData.milestoneUnlocked.title).toBe('7-Day High Roller');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Zod Schema Input Validation Enforcement (Rejecting Malformed Bodies)
  // ──────────────────────────────────────────────────────────────────────────
  describe('Input Validation Rejection (400 VALIDATION_ERROR)', () => {
    let user;

    beforeAll(async () => {
      user = await createTestUserToken('validation-test-user');
    });

    it('rejects POST /api/assessment with empty answers object', async () => {
      const res = await fetch(`${API_BASE}/api/assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
        body: JSON.stringify({ answers: {} }),
      });

      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Assessment answers are required');
    });

    it('rejects POST /api/roadmap when career is missing or blank', async () => {
      const res = await fetch(`${API_BASE}/api/roadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
        body: JSON.stringify({ career: '   ' }),
      });

      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Target career is required');
    });

    it('rejects POST /api/projects/generate when skills is not an array', async () => {
      const res = await fetch(`${API_BASE}/api/projects/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
        body: JSON.stringify({ skills: 'invalid-string-instead-of-array' }),
      });

      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Expected array');
    });

    it('rejects PUT /api/leaderboard/opt-in when handle is too short', async () => {
      const res = await fetch(`${API_BASE}/api/leaderboard/opt-in`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.idToken}`,
        },
        body: JSON.stringify({ displayHandle: 'x', optIn: true }),
      });

      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Handle must be at least 2 characters');
    });
  });
});
