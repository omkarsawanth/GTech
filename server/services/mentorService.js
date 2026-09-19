import { generateTextResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * AI Career Mentor — uses full user context for personalized advice.
 */
export const askMentor = async (uid, { question }) => {
  let profile = {};
  let skillGap = null;
  let roadmap = null;

  // Gather user context from Firestore safely (fallback to empty if not yet saved)
  try {
    const userSnap = await db.collection('users').doc(uid).get();
    if (userSnap.exists) profile = userSnap.data();

    const skillGapSnap = await db.collection('users').doc(uid).collection('skillGap').doc('current').get();
    if (skillGapSnap.exists) skillGap = skillGapSnap.data();

    const roadmapSnap = await db.collection('users').doc(uid).collection('roadmap').doc('current').get();
    if (roadmapSnap.exists) {
      const roadmapData = roadmapSnap.data();
      roadmap = roadmapData?.roadmap || null;
    }
  } catch (firestoreErr) {
    console.warn('[askMentor] Firestore read warning (continuing with prompt):', firestoreErr.message);
  }

  const career = skillGap?.career || profile?.targetCareer || 'Software Engineer';
  const prompt = PROMPTS.MENTOR({ question, profile, career, skillGap, roadmap });
  const answer = await generateTextResponse(prompt, { uid, tag: 'mentor' });

  // Save session in background if possible
  try {
    await db.collection('users').doc(uid).collection('mentorSessions').add({
      question,
      answer,
      createdAt: new Date(),
    });
  } catch (saveErr) {
    console.warn('[askMentor] Could not persist mentor session:', saveErr.message);
  }

  return { answer };
};
