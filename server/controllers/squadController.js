import { createSquad, joinSquad, leaveSquad, getSquadDetails } from '../services/squadService.js';
import { CreateSquadInputSchema, JoinSquadInputSchema } from '../utils/validation.js';

/**
 * POST /api/squad/create
 * Creates a new squad room for the current user
 */
export const handleCreateSquad = async (req, res, next) => {
  try {
    const validatedData = CreateSquadInputSchema.parse(req.body);
    const result = await createSquad(req.user.uid, validatedData);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/squad/join
 * Joins an existing squad room using inviteCode
 */
export const handleJoinSquad = async (req, res, next) => {
  try {
    const validatedData = JoinSquadInputSchema.parse(req.body);
    const result = await joinSquad(req.user.uid, validatedData);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/squad/leave
 * Leaves the squad room
 */
export const handleLeaveSquad = async (req, res, next) => {
  try {
    const { squadId } = req.body;
    if (!squadId) {
      return res.status(400).json({ success: false, error: 'squadId is required' });
    }
    const result = await leaveSquad(req.user.uid, squadId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/squad/current
 * Fetches current user's squad room details or null
 */
export const handleGetCurrentSquad = async (req, res, next) => {
  try {
    const result = await getSquadDetails(req.user.uid);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
