import { db } from '../config/firebaseAdmin.js';
import { FieldValue } from 'firebase-admin/firestore';
import rateLimit from 'express-rate-limit';

/**
 * General in-memory rate limiter for standard low-cost API routes.
 * 100 requests per 15 minutes per IP.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP. Please try again after 15 minutes.',
      },
    });
  },
});

/**
 * Helper: Sanitizes a key for Firestore document path.
 */
const sanitizeDocKey = (key) => {
  return String(key || 'anonymous').replace(/[\/\s#?]/g, '_');
};

/**
 * Persistent Firestore atomic daily rate limiter.
 * Single atomic transaction (read -> check -> increment).
 *
 * @param {object} options
 * @param {number} options.max - Maximum allowed requests per day (UTC)
 * @param {string} options.action - Namespace identifier (e.g., 'roast')
 * @param {string} options.errorCode - Error code for 429 response
 * @param {string} options.errorMessage - User-friendly 429 message
 */
export const createPersistentDailyLimiter = ({
  max = 5,
  action = 'roast',
  errorCode = 'ROAST_DAILY_LIMIT_REACHED',
  errorMessage = "You've used all 5 roasts for today. Your ego needs time to recover — come back tomorrow!",
}) => {
  return async (req, res, next) => {
    const key = req.user?.uid || req.ip || 'anonymous';
    const todayUTC = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const docId = `${action}_${sanitizeDocKey(key)}_${todayUTC}`;
    const limitRef = db.collection('rateLimits').doc(docId);

    try {
      await db.runTransaction(async (transaction) => {
        const snap = await transaction.get(limitRef);

        if (!snap.exists) {
          // First request for this key today
          transaction.set(limitRef, {
            key,
            action,
            date: todayUTC,
            count: 1,
            maxAllowed: max,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          });
          return;
        }

        const data = snap.data();
        const currentCount = data.count || 0;

        if (currentCount >= max) {
          const limitErr = new Error(errorMessage);
          limitErr.statusCode = 429;
          limitErr.code = errorCode;
          throw limitErr;
        }

        transaction.update(limitRef, {
          count: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
      });

      next();
    } catch (err) {
      if (err.statusCode === 429) {
        return res.status(429).json({
          success: false,
          error: {
            code: err.code || errorCode,
            message: err.message || errorMessage,
          },
        });
      }
      console.warn(`[rateLimitMiddleware] Firestore error on ${action} limiter:`, err.message);
      // Fail-open gracefully if Firestore has a transient network glitch
      next();
    }
  };
};

/**
 * Persistent Firestore atomic windowed rate limiter.
 * Enforces sliding/fixed-window caps (e.g., 20 requests / 15 minutes).
 *
 * @param {object} options
 * @param {number} options.max - Maximum requests per window
 * @param {number} options.windowMs - Window length in milliseconds
 * @param {string} options.action - Namespace identifier (e.g., 'ai_general')
 * @param {string} options.errorCode - Error code for 429 response
 * @param {string} options.errorMessage - User-friendly 429 message
 */
export const createPersistentWindowLimiter = ({
  max = 20,
  windowMs = 15 * 60 * 1000,
  action = 'ai_general',
  errorCode = 'RATE_LIMIT_EXCEEDED',
  errorMessage = 'Too many AI requests. Please try again after 15 minutes.',
}) => {
  return async (req, res, next) => {
    const key = req.user?.uid || req.ip || 'anonymous';
    // Window bucket: floor(now / windowMs)
    const now = Date.now();
    const windowBucket = Math.floor(now / windowMs);
    const docId = `${action}_${sanitizeDocKey(key)}_${windowBucket}`;
    const limitRef = db.collection('rateLimits').doc(docId);

    try {
      await db.runTransaction(async (transaction) => {
        const snap = await transaction.get(limitRef);

        if (!snap.exists) {
          transaction.set(limitRef, {
            key,
            action,
            windowBucket,
            count: 1,
            maxAllowed: max,
            expiresAt: new Date(now + windowMs),
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
          });
          return;
        }

        const data = snap.data();
        const currentCount = data.count || 0;

        if (currentCount >= max) {
          const limitErr = new Error(errorMessage);
          limitErr.statusCode = 429;
          limitErr.code = errorCode;
          throw limitErr;
        }

        transaction.update(limitRef, {
          count: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        });
      });

      next();
    } catch (err) {
      if (err.statusCode === 429) {
        return res.status(429).json({
          success: false,
          error: {
            code: err.code || errorCode,
            message: err.message || errorMessage,
          },
        });
      }
      console.warn(`[rateLimitMiddleware] Firestore error on ${action} limiter:`, err.message);
      next();
    }
  };
};

/**
 * Strict Persistent rate limiter for AI-powered endpoints
 * (20 requests per 15 minutes per user/IP) enforced across all serverless instances.
 */
export const aiLimiter = createPersistentWindowLimiter({
  max: 20,
  windowMs: 15 * 60 * 1000,
  action: 'ai_general',
  errorCode: 'RATE_LIMIT_EXCEEDED',
  errorMessage: 'Too many AI requests from your account. Please try again after 15 minutes.',
});

/**
 * Daily roast rate limiter: cap at 5 roasts/day/user
 * Persistent Firestore atomic transaction store (immune to Vercel cold restarts).
 */
export const roastLimiter = createPersistentDailyLimiter({
  max: 5,
  action: 'roast',
  errorCode: 'ROAST_DAILY_LIMIT_REACHED',
  errorMessage: "You've used all 5 roasts for today. Your ego needs time to recover — come back tomorrow!",
});
