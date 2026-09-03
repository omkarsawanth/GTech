import { generateRoadmap as genRoadmap, getCachedRoadmap, updateMilestone } from '../services/roadmapService.js';

/**
 * POST /api/roadmap — generate new roadmap
 */
export const generateRoadmap = async (req, res, next) => {
  try {
    const { career, profile, skillGap } = req.body;
    if (!career) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Target career is required.' },
      });
    }
    const result = await genRoadmap(req.user.uid, { career, profile: profile || {}, skillGap });
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * GET /api/roadmap — get cached roadmap
 */
export const getRoadmap = async (req, res, next) => {
  try {
    const result = await getCachedRoadmap(req.user.uid);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * PUT /api/roadmap/milestone/:id — update milestone progress
 */
export const updateRoadmapMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, progress } = req.body;
    const result = await updateMilestone(req.user.uid, id, { status, progress });
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
