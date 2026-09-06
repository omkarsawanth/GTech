import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { generateRoadmap, getRoadmap, updateRoadmapMilestone, completeTask, getTodaysTasks } from '../controllers/roadmapController.js';

const router = Router();

router.post('/', requireAuth, generateRoadmap);
router.get('/today', requireAuth, getTodaysTasks);
router.get('/', requireAuth, getRoadmap);
router.put('/task/:taskId/complete', requireAuth, completeTask);
router.put('/milestone/:id', requireAuth, updateRoadmapMilestone);

export default router;
