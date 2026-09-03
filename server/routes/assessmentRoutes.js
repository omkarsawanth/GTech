import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { analyzeAssessment, getAssessment } from '../controllers/assessmentController.js';

const router = Router();

router.post('/', requireAuth, analyzeAssessment);
router.get('/', requireAuth, getAssessment);

export default router;
