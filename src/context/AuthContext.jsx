import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInWithGoogle as googleSignIn, logout as authLogout } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Always start with null — Firebase is the ONLY source of truth
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Real Firebase user — extract only what the app needs
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
        });
      } else {
        // No Firebase session → user is logged out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Sign in with Google.
   * Opens the real Google OAuth popup via Firebase.
   */
  const signInWithGoogle = async () => {
    const { user: firebaseUser, error } = await googleSignIn();
    // onAuthStateChanged above will update `user` automatically after success
    return { user: firebaseUser, error };
  };

  /**
   * Log out the current user.
   * onAuthStateChanged will set user → null automatically.
   */
  const logout = async () => {
    await authLogout();
    // onAuthStateChanged fires and sets user to null
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
};
