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
