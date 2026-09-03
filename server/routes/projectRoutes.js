import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { generateProjects } from '../controllers/projectController.js';

const router = Router();

router.post('/generate', requireAuth, generateProjects);

export default router;
