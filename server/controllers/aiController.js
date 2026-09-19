import { analyzeSkillGap } from '../services/skillGapService.js';
import { matchCareers } from '../services/careerService.js';
import { askMentor } from '../services/mentorService.js';
import { SkillGapInputSchema, MentorInputSchema, CareerMatchInputSchema } from '../utils/validation.js';

/**
 * POST /api/ai/skill-gap
 */
export const skillGap = async (req, res, next) => {
  try {
    const parsed = SkillGapInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid input' },
      });
    }
    const result = await analyzeSkillGap(req.user.uid, parsed.data);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * POST /api/ai/career-match
 */
export const careerMatch = async (req, res, next) => {
  try {
    const parsed = CareerMatchInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid input' },
      });
    }
    const result = await matchCareers({ profile: parsed.data.profile }, req.user.uid);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * POST /api/ai/mentor
 */
export const mentor = async (req, res, next) => {
  try {
    const parsed = MentorInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid input' },
      });
    }
    const result = await askMentor(req.user.uid, parsed.data);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
