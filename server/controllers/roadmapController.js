import { generateRoadmap as genRoadmap, getCachedRoadmap, updateMilestone, completeTask as completeTaskService, getTodaysTasks as getTodaysTasksService } from '../services/roadmapService.js';
import { RoadmapGenerationInputSchema, UpdateMilestoneInputSchema } from '../utils/validation.js';

/**
 * POST /api/roadmap — generate new roadmap
 */
export const generateRoadmap = async (req, res, next) => {
  try {
    const parsed = RoadmapGenerationInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid roadmap input' },
      });
    }

    const { career, profile, skillGap } = parsed.data;
    const result = await genRoadmap(req.user.uid, { career, profile, skillGap });
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
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Milestone ID is required' },
      });
    }

    const parsed = UpdateMilestoneInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid milestone update input' },
      });
    }

    const result = await updateMilestone(req.user.uid, id, parsed.data);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * PUT /api/roadmap/task/:taskId/complete
 */
export const completeTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await completeTaskService(req.user.uid, taskId);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * GET /api/roadmap/today
 */
export const getTodaysTasks = async (req, res, next) => {
  try {
    const result = await getTodaysTasksService(req.user.uid);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
