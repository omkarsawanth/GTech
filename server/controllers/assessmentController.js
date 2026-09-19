import { generateStructuredResponse } from '../services/geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { AssessmentResponseSchema, AssessmentInputSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * POST /api/assessment — analyze assessment answers
 */
export const analyzeAssessment = async (req, res, next) => {
  try {
    const parsed = AssessmentInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid assessment input' },
      });
    }

    const { answers, career } = parsed.data;

    const prompt = PROMPTS.ASSESSMENT_ANALYSIS({ answers, career });
    const result = await generateStructuredResponse(prompt, AssessmentResponseSchema, { uid: req.user.uid, tag: 'assessment' });

    // Persist
    await db.collection('users').doc(req.user.uid).collection('assessment').doc('current').set({
      ...result,
      answers,
      career,
      updatedAt: new Date(),
    }, { merge: true });

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

/**
 * GET /api/assessment — get cached assessment
 */
export const getAssessment = async (req, res, next) => {
  try {
    const snap = await db.collection('users').doc(req.user.uid).collection('assessment').doc('current').get();
    res.json({ success: true, data: snap.exists ? snap.data() : null });
  } catch (err) { next(err); }
};
