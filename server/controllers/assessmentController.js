import { generateStructuredResponse } from '../services/geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { AssessmentResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * POST /api/assessment — analyze assessment answers
 */
export const analyzeAssessment = async (req, res, next) => {
  try {
    const { answers, career } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Assessment answers are required.' },
      });
    }

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
