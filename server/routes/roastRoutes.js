import express from 'express';
import { createSkillRoast } from '../controllers/roastController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { roastLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

/**
 * POST /api/roast/generate
 * Generates a savage skill gap roast with daily 5-roast rate limit
 */
router.post('/generate', requireAuth, roastLimiter, createSkillRoast);

export default router;
