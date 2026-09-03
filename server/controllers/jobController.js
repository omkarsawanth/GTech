import { analyzeJob } from '../services/jobAnalysisService.js';
import { JobAnalysisInputSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * POST /api/job/analyze
 */
export const analyzeJobDescription = async (req, res, next) => {
  try {
    const parsed = JobAnalysisInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid input' },
      });
    }

    // Fetch user profile for context
    const userSnap = await db.collection('users').doc(req.user.uid).get();
    const profile = userSnap.exists ? userSnap.data() : {};
    const career = profile.targetCareer || req.body.career || 'Software Engineer';

    const result = await analyzeJob(req.user.uid, {
      jobDescription: parsed.data.jobDescription,
      profile,
      career,
    });

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
