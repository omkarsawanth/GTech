import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { generateRoadmap, getRoadmap, updateRoadmapMilestone } from '../controllers/roadmapController.js';

const router = Router();

router.post('/', requireAuth, generateRoadmap);
router.get('/', requireAuth, getRoadmap);
router.put('/milestone/:id', requireAuth, updateRoadmapMilestone);

export default router;
