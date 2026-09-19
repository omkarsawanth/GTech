import rateLimit from 'express-rate-limit';

/**
 * General rate limiter for standard API routes (100 requests per 15 minutes per IP).
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
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
 * Strict rate limiter for AI-powered endpoints (20 requests per 15 minutes per IP)
 * to prevent runaway Gemini API costs.
 */
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 AI generation requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many AI requests from this IP. Please try again after 15 minutes.',
      },
    });
  },
});

/**
 * Daily roast rate limiter: cap at 5 roasts/day/user to keep costs controlled
 * and preserve comedic novelty.
 */
export const roastLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // 5 roasts per user/IP per day
  keyGenerator: (req) => req.user?.uid || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        code: 'ROAST_DAILY_LIMIT_REACHED',
        message: "You've used all 5 roasts for today. Your ego needs time to recover — come back tomorrow!",
      },
    });
  },
});
