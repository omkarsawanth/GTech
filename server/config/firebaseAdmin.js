import {
  getApps,
  initializeApp,
  cert,
} from 'firebase-admin/app';

import {
  getFirestore,
} from 'firebase-admin/firestore';

import {
  getAuth,
} from 'firebase-admin/auth';

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env.test if in test mode, otherwise default .env
if (process.env.NODE_ENV === 'test') {
  const envTestPath = path.resolve(process.cwd(), '.env.test');
  if (fs.existsSync(envTestPath)) {
    dotenv.config({ path: envTestPath });
  } else {
    dotenv.config();
  }
} else {
  dotenv.config();
}

const isEmulator = Boolean(
  process.env.FIRESTORE_EMULATOR_HOST ||
  process.env.FIREBASE_AUTH_EMULATOR_HOST ||
  process.env.NODE_ENV === 'test'
);

let firebaseApp;

if (isEmulator) {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'demo-kalpa-test';
  // Ensure host variables are explicitly populated for SDK auto-detection
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  }
  if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  }

  firebaseApp =
    getApps().length === 0
      ? initializeApp({ projectId })
      : getApps()[0];

  console.log(`[GTech Firebase Admin] Initialized in EMULATOR mode (projectId: ${projectId}, Firestore: ${process.env.FIRESTORE_EMULATOR_HOST}, Auth: ${process.env.FIREBASE_AUTH_EMULATOR_HOST})`);
} else {
  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.error('[GTech Firebase Admin] Missing environment variables:');

    if (!FIREBASE_PROJECT_ID) {
      console.error('  - FIREBASE_PROJECT_ID');
    }

    if (!FIREBASE_CLIENT_EMAIL) {
      console.error('  - FIREBASE_CLIENT_EMAIL');
    }

    if (!FIREBASE_PRIVATE_KEY) {
      console.error('  - FIREBASE_PRIVATE_KEY');
    }

    throw new Error(
      '[GTech Firebase Admin] Firebase Admin credentials are incomplete.'
    );
  }

  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  firebaseApp =
    getApps().length === 0
      ? initializeApp({
          credential: cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey,
          }),
        })
      : getApps()[0];

  console.log('[GTech Firebase Admin] Firebase Admin initialized successfully');
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;