import { generateSkillRoast } from '../services/roastService.js';
import { RoastInputSchema } from '../utils/validation.js';

/**
 * POST /api/roast/generate
 * Generates a punchy skill-gap roast using Gemini
 */
export const createSkillRoast = async (req, res, next) => {
  try {
    const validatedData = RoastInputSchema.parse(req.body);
    const result = await generateSkillRoast(req.user?.uid, validatedData);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
