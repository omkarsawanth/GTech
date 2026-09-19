import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { SkillGapResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * Run Gemini skill gap analysis and persist results to Firestore.
 */
export const analyzeSkillGap = async (uid, { profile, career, assessment }) => {
  const prompt = PROMPTS.SKILL_GAP({ profile, career, assessment });
  const result = await generateStructuredResponse(prompt, SkillGapResponseSchema, { uid, tag: 'skill-gap' });

  // Persist to Firestore
  await db.collection('users').doc(uid).collection('skillGap').doc('current').set({
    ...result,
    career,
    updatedAt: new Date(),
  }, { merge: true });

  return result;
};

/**
 * Get cached skill gap from Firestore (if exists).
 */
export const getCachedSkillGap = async (uid) => {
  const snap = await db.collection('users').doc(uid).collection('skillGap').doc('current').get();
  return snap.exists ? snap.data() : null;
};
