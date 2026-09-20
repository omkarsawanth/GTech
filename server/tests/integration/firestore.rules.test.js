import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

describe('Firestore Security Rules Unit Tests', () => {
  let testEnv;

  beforeAll(async () => {
    const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
    const rules = fs.readFileSync(rulesPath, 'utf8');

    testEnv = await initializeTestEnvironment({
      projectId: 'demo-kalpa-test',
      firestore: {
        rules,
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    if (testEnv) {
      await testEnv.cleanup();
    }
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 1. Rate Limits Collection: Completely denied to all clients
  // ──────────────────────────────────────────────────────────────────────────
  it('denies authenticated and unauthenticated clients from reading or writing rateLimits/*', async () => {
    // Seed rate limit doc via admin context
    await testEnv.withSecurityRulesDisabled(async (adminContext) => {
      const adminDb = adminContext.firestore();
      await setDoc(doc(adminDb, 'rateLimits', 'roast_alice_today'), {
        count: 5,
        maxAllowed: 5,
      });
    });

    const aliceContext = testEnv.authenticatedContext('alice');
    const aliceDb = aliceContext.firestore();
    const unauthContext = testEnv.unauthenticatedContext();
    const unauthDb = unauthContext.firestore();

    // Read attempts must fail
    await assertFails(getDoc(doc(aliceDb, 'rateLimits', 'roast_alice_today')));
    await assertFails(getDoc(doc(unauthDb, 'rateLimits', 'roast_alice_today')));

    // Write attempts must fail
    await assertFails(setDoc(doc(aliceDb, 'rateLimits', 'roast_alice_today'), { count: 0 }));
    await assertFails(setDoc(doc(unauthDb, 'rateLimits', 'roast_attacker'), { count: 0 }));
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. User Document Isolation: User A cannot read or write User B's profile
  // ──────────────────────────────────────────────────────────────────────────
  it('prevents user A from reading or writing user B users/{uid} document', async () => {
    // Seed User B profile
    await testEnv.withSecurityRulesDisabled(async (adminContext) => {
      const adminDb = adminContext.firestore();
      await setDoc(doc(adminDb, 'users', 'bob'), {
        uid: 'bob',
        displayName: 'Bob The Builder',
        email: 'bob@kalpa.dev',
      });
    });

    const aliceContext = testEnv.authenticatedContext('alice');
    const aliceDb = aliceContext.firestore();

    // Alice cannot read Bob's document
    await assertFails(getDoc(doc(aliceDb, 'users', 'bob')));

    // Alice cannot write to Bob's document
    await assertFails(setDoc(doc(aliceDb, 'users', 'bob'), {
      displayName: 'Hacked by Alice',
    }));
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. User Document Whitelist: Client cannot tamper with streaks or roles
  // ──────────────────────────────────────────────────────────────────────────
  it('rejects client writes to users/{uid} when attempting to tamper with non-whitelisted fields (e.g. currentStreak)', async () => {
    const aliceContext = testEnv.authenticatedContext('alice');
    const aliceDb = aliceContext.firestore();

    // 1. Creation with valid whitelisted fields succeeds
    await assertSucceeds(setDoc(doc(aliceDb, 'users', 'alice'), {
      uid: 'alice',
      displayName: 'Alice Engineer',
      email: 'alice@kalpa.dev',
      photoURL: 'https://kalpa.dev/alice.jpg',
      createdAt: '2026-09-19T00:00:00.000Z',
      updatedAt: '2026-09-19T00:00:00.000Z',
    }));

    // 2. Attempting to update currentStreak or streak directly from client MUST FAIL
    await assertFails(updateDoc(doc(aliceDb, 'users', 'alice'), {
      currentStreak: 999,
    }));

    // 3. Attempting to update role or readinessScore directly from client MUST FAIL
    await assertFails(updateDoc(doc(aliceDb, 'users', 'alice'), {
      readinessScore: 100,
    }));

    // 4. Updating whitelisted field (displayName, updatedAt) succeeds
    await assertSucceeds(updateDoc(doc(aliceDb, 'users', 'alice'), {
      displayName: 'Alice Lead Architect',
      updatedAt: '2026-09-19T12:00:00.000Z',
    }));
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Squad Member-Only Reads
  // ──────────────────────────────────────────────────────────────────────────
  it('allows squad members to read squads/{squadId}, but rejects non-members and unauthenticated requests', async () => {
    // Seed squad with Alice (creator) and Bob (member)
    await testEnv.withSecurityRulesDisabled(async (adminContext) => {
      const adminDb = adminContext.firestore();
      await setDoc(doc(adminDb, 'squads', 'squad-alpha'), {
        id: 'squad-alpha',
        name: 'Cyber Strike Alpha',
        createdBy: 'alice',
        memberUids: ['alice', 'bob'],
        careerFocus: 'AI Systems Architect',
      });
    });

    const aliceContext = testEnv.authenticatedContext('alice');
    const bobContext = testEnv.authenticatedContext('bob');
    const charlieContext = testEnv.authenticatedContext('charlie'); // Non-member
    const unauthContext = testEnv.unauthenticatedContext();

    // Alice (founder) can read
    await assertSucceeds(getDoc(doc(aliceContext.firestore(), 'squads', 'squad-alpha')));

    // Bob (member) can read
    await assertSucceeds(getDoc(doc(bobContext.firestore(), 'squads', 'squad-alpha')));

    // Charlie (non-member) CANNOT read
    await assertFails(getDoc(doc(charlieContext.firestore(), 'squads', 'squad-alpha')));

    // Unauthenticated client CANNOT read
    await assertFails(getDoc(doc(unauthContext.firestore(), 'squads', 'squad-alpha')));
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Squad Server-Only Writes: No client can write to squads
  // ──────────────────────────────────────────────────────────────────────────
  it('blocks all client writes to squads/{squadId} (server-only via Admin SDK)', async () => {
    const aliceContext = testEnv.authenticatedContext('alice');
    const aliceDb = aliceContext.firestore();

    // Creating squad via client SDK is denied
    await assertFails(setDoc(doc(aliceDb, 'squads', 'squad-malicious'), {
      name: 'Rogue Squad',
      createdBy: 'alice',
      memberUids: ['alice'],
    }));

    // Seed squad first
    await testEnv.withSecurityRulesDisabled(async (adminContext) => {
      const adminDb = adminContext.firestore();
      await setDoc(doc(adminDb, 'squads', 'squad-beta'), {
        name: 'Squad Beta',
        createdBy: 'alice',
        memberUids: ['alice'],
      });
    });

    // Updating squad via client SDK is denied (even for creator)
    await assertFails(updateDoc(doc(aliceDb, 'squads', 'squad-beta'), {
      name: 'Renamed By Client',
    }));
  });
});
