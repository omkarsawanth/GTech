import { getLeaderboardData, updateLeaderboardSettings } from '../services/leaderboardService.js';

/**
 * GET /api/leaderboard?career=ai-engineer
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const career = req.query.career || 'ai-engineer';
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
    const { displayHandle, optIn } = req.body;
    const result = await updateLeaderboardSettings(req.user.uid, { displayHandle, optIn });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
