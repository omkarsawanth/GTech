import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { RoadmapResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * Generate a personalized roadmap via Gemini and persist it.
 */
export const generateRoadmap = async (uid, { career, profile, skillGap }) => {
  const prompt = PROMPTS.ROADMAP({ career, profile, skillGap });
  const result = await generateStructuredResponse(prompt, RoadmapResponseSchema);

  await db.collection('users').doc(uid).collection('roadmap').doc('current').set({
    ...result,
    career,
    updatedAt: new Date(),
  }, { merge: true });

  return result;
};

/**
 * Get cached roadmap.
 */
export const getCachedRoadmap = async (uid) => {
  const snap = await db.collection('users').doc(uid).collection('roadmap').doc('current').get();
  return snap.exists ? snap.data() : null;
};

/**
 * Update a single milestone's status / progress.
 */
export const updateMilestone = async (uid, milestoneId, updates) => {
  const roadmapRef = db.collection('users').doc(uid).collection('roadmap').doc('current');
  const snap = await roadmapRef.get();
  if (!snap.exists) throw Object.assign(new Error('No roadmap found'), { statusCode: 404 });

  const data = snap.data();
  const roadmap = data.roadmap || [];
  const idx = roadmap.findIndex(m => m.id === milestoneId);
  if (idx === -1) throw Object.assign(new Error('Milestone not found'), { statusCode: 404 });

  roadmap[idx] = { ...roadmap[idx], ...updates };
  await roadmapRef.update({ roadmap, updatedAt: new Date() });
  return roadmap[idx];
};
