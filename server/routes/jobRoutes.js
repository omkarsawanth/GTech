import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { analyzeJobDescription } from '../controllers/jobController.js';

const router = Router();

router.post('/analyze', requireAuth, analyzeJobDescription);

export default router;
