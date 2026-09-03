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

dotenv.config();

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

const firebaseApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      })
    : getApps()[0];

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;

console.log('[GTech Firebase Admin] Firebase Admin initialized successfully');