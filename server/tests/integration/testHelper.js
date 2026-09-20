import app from '../../server.js';
import { auth, db } from '../../config/firebaseAdmin.js';

export const TEST_PORT = process.env.PORT || 5001;
export const API_BASE = `http://127.0.0.1:${TEST_PORT}`;

// Strict safety guard to guarantee tests NEVER touch production
export function verifyEmulatorEnvironment() {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    throw new Error('FATAL SECURITY GUARD: FIRESTORE_EMULATOR_HOST is not set! Tests cannot run without the Firestore emulator.');
  }
  if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error('FATAL SECURITY GUARD: FIREBASE_AUTH_EMULATOR_HOST is not set! Tests cannot run without the Auth emulator.');
  }
  const projectId = process.env.FIREBASE_PROJECT_ID || '';
  if (!projectId.startsWith('demo-') && projectId !== 'demo-kalpa-test') {
    throw new Error(`FATAL SECURITY GUARD: FIREBASE_PROJECT_ID (${projectId}) is not a demo project! Must start with "demo-" to ensure emulator isolation.`);
  }
}

let serverInstance = null;

export async function startTestServer() {
  verifyEmulatorEnvironment();
  return new Promise((resolve) => {
    if (serverInstance) return resolve(serverInstance);
    serverInstance = app.listen(TEST_PORT, () => {
      resolve(serverInstance);
    });
  });
}

export async function stopTestServer() {
  return new Promise((resolve) => {
    if (serverInstance) {
      serverInstance.close(() => {
        serverInstance = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

/**
 * Creates a real test user in Firebase Auth Emulator and retrieves a real ID token.
 */
export async function createTestUserToken(uid, email = `${uid}@test.kalpa.dev`) {
  verifyEmulatorEnvironment();
  try {
    await auth.deleteUser(uid);
  } catch (err) {
    // User does not exist yet; safe to proceed
  }

  await auth.createUser({
    uid,
    email,
    displayName: `Test User ${uid}`,
  });

  // Mint custom token and exchange with Auth Emulator REST API for a real ID token
  const customToken = await auth.createCustomToken(uid);
  const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
  const response = await fetch(`http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: customToken, returnSecureToken: true }),
  });

  const data = await response.json();
  if (!data.idToken) {
    throw new Error(`Failed to obtain ID token from Auth emulator: ${JSON.stringify(data)}`);
  }

  return {
    uid,
    email,
    idToken: data.idToken,
  };
}

/**
 * Clears all Firestore documents in emulator for fresh test isolation.
 */
export async function clearFirestoreEmulator() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'demo-kalpa-test';
  const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
  await fetch(`http://${firestoreHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`, {
    method: 'DELETE',
  });
}
