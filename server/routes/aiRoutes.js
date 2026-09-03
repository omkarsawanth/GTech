import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { skillGap, careerMatch, mentor } from '../controllers/aiController.js';

const router = Router();

router.post('/skill-gap', requireAuth, skillGap);
router.post('/career-match', requireAuth, careerMatch);
router.post('/mentor', requireAuth, mentor);

export default router;
