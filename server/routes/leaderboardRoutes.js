import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getLeaderboard, updateOptIn } from '../controllers/leaderboardController.js';

const router = Router();

router.get('/', requireAuth, getLeaderboard);
router.put('/opt-in', requireAuth, updateOptIn);

export default router;
