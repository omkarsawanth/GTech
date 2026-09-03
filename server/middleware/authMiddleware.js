import { auth } from '../config/firebaseAdmin.js';

/**
 * Express middleware that verifies a Firebase ID token from the Authorization header.
 * Attaches req.user = { uid, email, displayName, ... } on success.
 * Responds 401 on missing, invalid, or expired tokens.
 */
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'MISSING_TOKEN',
        message: 'Authentication required. Please sign in.',
      },
    });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    // Attach verified Firebase claims to the request — never trust client-supplied uid
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      displayName: decodedToken.name || null,
      photoURL: decodedToken.picture || null,
      emailVerified: decodedToken.email_verified || false,
    };
    next();
  } catch (error) {
    console.error('[GTech Auth Middleware] Token verification failed:', error.code);

    let message = 'Invalid or expired authentication token. Please sign in again.';
    if (error.code === 'auth/id-token-expired') {
      message = 'Your session has expired. Please sign in again.';
    } else if (error.code === 'auth/argument-error') {
      message = 'Invalid authentication token format.';
    }

    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message },
    });
  }
};

export default requireAuth;
