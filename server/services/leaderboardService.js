import { db } from '../config/firebaseAdmin.js';

const MOCK_COHORTS = {
  'ai-engineer': [
    { handle: 'NeuralNinja', readiness: 88, streak: 14, tasksCompleted: 24 },
    { handle: 'TensorsFlow', readiness: 84, streak: 9, tasksCompleted: 21 },
    { handle: 'PromptArchitect', readiness: 79, streak: 12, tasksCompleted: 19 },
    { handle: 'VectorValkyrie', readiness: 75, streak: 7, tasksCompleted: 17 },
    { handle: 'DeepLearningDan', readiness: 71, streak: 5, tasksCompleted: 15 },
    { handle: 'ByteAlchemist', readiness: 68, streak: 4, tasksCompleted: 13 },
    { handle: 'MatrixRider', readiness: 62, streak: 3, tasksCompleted: 11 },
  ],
  'ml-engineer': [
    { handle: 'ModelTuner', readiness: 89, streak: 16, tasksCompleted: 26 },
    { handle: 'WeightsAndBiases', readiness: 82, streak: 11, tasksCompleted: 20 },
    { handle: 'DataDrifter', readiness: 77, streak: 8, tasksCompleted: 18 },
    { handle: 'ScikitSurfer', readiness: 73, streak: 6, tasksCompleted: 14 },
    { handle: 'FeatureCrafter', readiness: 67, streak: 4, tasksCompleted: 12 },
  ],
  'fullstack-developer': [
    { handle: 'AsyncWizard', readiness: 92, streak: 18, tasksCompleted: 28 },
    { handle: 'TailwindTitan', readiness: 85, streak: 13, tasksCompleted: 22 },
    { handle: 'FullStackPhantasm', readiness: 81, streak: 9, tasksCompleted: 19 },
    { handle: 'NodeNomad', readiness: 76, streak: 7, tasksCompleted: 16 },
    { handle: 'ReactRocket', readiness: 70, streak: 5, tasksCompleted: 13 },
  ],
  'software-engineer': [
    { handle: 'AlgoAce', readiness: 91, streak: 15, tasksCompleted: 25 },
    { handle: 'KernelKnight', readiness: 86, streak: 10, tasksCompleted: 22 },
    { handle: 'BinaryBreeze', readiness: 80, streak: 8, tasksCompleted: 18 },
    { handle: 'StackOverlord', readiness: 74, streak: 6, tasksCompleted: 15 },
  ],
};

/**
 * Get leaderboard for a target career cohort.
 */
export const getLeaderboardData = async (currentUid, career = 'ai-engineer') => {
  const usersRef = db.collection('users');
  let realUsers = [];

  try {
    const snap = await usersRef.limit(50).get();
    snap.forEach((doc) => {
      const d = doc.data();
      realUsers.push({
        id: doc.id,
        handle: d.displayHandle || (d.displayName ? `@${d.displayName.split(' ')[0].toLowerCase()}` : `user_${doc.id.slice(0, 5)}`),
        readiness: d.readinessScore || Math.floor(Math.random() * 30) + 60,
        streak: d.currentStreak || 1,
        career: d.targetCareer || 'ai-engineer',
        optIn: d.leaderboardOptIn !== false,
        isCurrentUser: doc.id === currentUid,
      });
    });
  } catch (err) {
    console.warn('[LeaderboardService] Firestore query error, using seeds:', err.message);
  }

  // Filter or augment with realistic cohort peers
  const cohortSeeds = MOCK_COHORTS[career] || MOCK_COHORTS['ai-engineer'];
  const simulatedList = cohortSeeds.map((peer, idx) => ({
    id: `cohort-peer-${idx}`,
    handle: `@${peer.handle.toLowerCase()}`,
    readiness: peer.readiness,
    streak: peer.streak,
    tasksCompleted: peer.tasksCompleted,
    isCurrentUser: false,
    career,
  }));

  // Find or insert current user
  const currentUserEntry = realUsers.find((u) => u.isCurrentUser) || {
    id: currentUid,
    handle: '@you',
    readiness: 72,
    streak: 1,
    tasksCompleted: 3,
    isCurrentUser: true,
    career,
  };

  const combined = [currentUserEntry, ...simulatedList]
    .sort((a, b) => b.readiness - a.readiness || b.streak - a.streak);

  // Assign ranks
  const ranked = combined.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return {
    career,
    totalParticipants: ranked.length,
    userRank: ranked.find((u) => u.isCurrentUser)?.rank || 1,
    leaderboard: ranked,
  };
};

/**
 * Update user leaderboard opt-in status and display handle.
 */
export const updateLeaderboardSettings = async (uid, { displayHandle, optIn }) => {
  const updates = {
    updatedAt: new Date(),
    ...(displayHandle !== undefined && { displayHandle: displayHandle.trim().replace(/^@/, '') }),
    ...(optIn !== undefined && { leaderboardOptIn: Boolean(optIn) }),
  };

  await db.collection('users').doc(uid).set(updates, { merge: true });
  return updates;
};
