import express from 'express';
import { 
  handleCreateSquad, 
  handleJoinSquad, 
  handleLeaveSquad, 
  handleGetCurrentSquad 
} from '../controllers/squadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Squad endpoints (all require authentication)
 */
router.get('/current', requireAuth, handleGetCurrentSquad);
router.post('/create', requireAuth, handleCreateSquad);
router.post('/join', requireAuth, handleJoinSquad);
router.post('/leave', requireAuth, handleLeaveSquad);

export default router;
