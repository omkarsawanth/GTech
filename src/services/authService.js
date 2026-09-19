import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore/lite';
import { auth, db } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();
// Always show the account-chooser popup, even if only one account is signed in
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Translate Firebase Auth error codes into user-friendly messages.
 */
export const handleAuthError = (error) => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled. Please try again.';
    case 'auth/popup-blocked':
      return 'Google sign-in was blocked by your browser. Please allow popups for this site and try again.';
    case 'auth/cancelled-popup-request':
      return 'A sign-in popup is already open. Please complete it before opening another.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Firebase Authentication. Add it in Firebase Console → Authentication → Settings → Authorized domains.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method → Google.';
    case 'auth/invalid-api-key':
      return 'Firebase API key is invalid. Please check your .env file and ensure VITE_FIREBASE_API_KEY is set correctly.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection and try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with a different sign-in method for this email address.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    default:
      return error.message || 'An unexpected authentication error occurred. Please try again.';
  }
};

/**
 * Create or update a Firestore user document after successful login.
 * Uses setDoc with merge:true so existing profile data is never overwritten.
 */
const upsertUserDocument = async (firebaseUser) => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // First login — create the document
    await setDoc(userRef, {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName || null,
      email: firebaseUser.email || null,
      photoURL: firebaseUser.photoURL || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // Subsequent login — only update mutable fields (name/photo can change in Google)
    await setDoc(
      userRef,
      {
        displayName: firebaseUser.displayName || snap.data().displayName || null,
        email: firebaseUser.email || snap.data().email || null,
        photoURL: firebaseUser.photoURL || snap.data().photoURL || null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
};

/**
 * Sign in with Google via Firebase popup.
 * Returns { user: FirebaseUser, error: null } on success.
 * Returns { user: null, error: string } on failure.
 * NEVER returns a fake/demo user.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    // Persist user data to Firestore
    await upsertUserDocument(firebaseUser);

    return { user: firebaseUser, error: null };
  } catch (error) {
    console.error('[GTech Auth] Google sign-in failed:', error.code, error.message);
    return { user: null, error: handleAuthError(error) };
  }
};

/**
 * Sign out the current Firebase user.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error('[GTech Auth] Logout failed:', error);
    return { error: handleAuthError(error) };
  }
};
