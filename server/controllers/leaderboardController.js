import { getLeaderboardData, updateLeaderboardSettings } from '../services/leaderboardService.js';
import { LeaderboardQuerySchema, LeaderboardOptInSchema } from '../utils/validation.js';

/**
 * GET /api/leaderboard?career=ai-engineer
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const parsed = LeaderboardQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid leaderboard query' },
      });
    }

    const { career } = parsed.data;
    const result = await getLeaderboardData(req.user.uid, career);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/leaderboard/opt-in
 */
export const updateOptIn = async (req, res, next) => {
  try {
    const parsed = LeaderboardOptInSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid leaderboard opt-in payload' },
      });
    }

    const result = await updateLeaderboardSettings(req.user.uid, parsed.data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
