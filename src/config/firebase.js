import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// Validate that real config values are present (not placeholders)
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v || v.includes('YOUR_') || v.includes('PLACEHOLDER'))
  .map(([k]) => `VITE_FIREBASE_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`);

if (missingVars.length > 0) {
  console.error(
    '[GTech Firebase] Missing or placeholder environment variables detected:\n' +
    missingVars.join('\n') +
    '\nPlease update your .env file at the project root with real Firebase values.'
  );
}

let app = null;
let auth = { currentUser: null };
let db = {};

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.warn('[GTech Firebase] Firebase client initialization deferred:', err.message);
}

export { auth, db };
export default app;
