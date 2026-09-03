import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile, getDashboard } from '../controllers/userController.js';

const router = Router();

router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);
router.get('/dashboard', requireAuth, getDashboard);

export default router;
