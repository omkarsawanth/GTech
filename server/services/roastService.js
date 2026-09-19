import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { RoastResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

// Realistic fallbacks in case AI is unconfigured or rate-limited
const FALLBACK_ROASTS = [
  {
    roast: "You've got HTML and CSS on lock, respectfully, that's 2015 energy. React's just sitting there unclaimed like a group project nobody wants to touch. Zero tests written — bold of you to assume your code just works.",
    punchline: "Bold of you to assume your code just works.",
    burnRating: 4,
  },
  {
    roast: "Python? Solid. SQL? Never met her. You can write a for-loop but can't JOIN two tables — that's like knowing how to drive but never learning what a stop sign is.",
    punchline: "That's like knowing how to drive but never learning what a stop sign is.",
    burnRating: 5,
  },
  {
    roast: "You put 'proficient in Git' on your resume, but every merge conflict has you contemplating a career change to sheep farming in New Zealand.",
    punchline: "Every merge conflict has you contemplating sheep farming.",
    burnRating: 4,
  },
  {
    roast: "You have 14 tabs open with documentation you swore you'd read on Sunday. Your GitHub commit history looks like a barcode that scans as 'procrastination'.",
    punchline: "Your GitHub commit history scans as 'procrastination'.",
    burnRating: 5,
  },
];

/**
 * Generate a savage-but-affectionate skill gap roast
 * @param {string} uid - User ID
 * @param {object} params - { skills, targetRole, missingSkills }
 * @returns {Promise<object>} - { roast, punchline, burnRating, targetRole, timestamp }
 */
export const generateSkillRoast = async (uid, { skills = [], targetRole = 'Software Engineer', missingSkills = [] }) => {
  let result;

  try {
    const prompt = PROMPTS.ROAST({ skills, targetRole, missingSkills });
    result = await generateStructuredResponse(prompt, RoastResponseSchema, { uid, tag: 'roast' });
  } catch (err) {
    console.warn('[roastService] AI generation failed, using curated roast fallback:', err.message);
    const randomIndex = Math.floor(Math.random() * FALLBACK_ROASTS.length);
    result = FALLBACK_ROASTS[randomIndex];
  }

  const roastData = {
    ...result,
    targetRole,
    skills,
    missingSkills,
    createdAt: new Date().toISOString(),
  };

  // Persist latest roast to Firestore if database is available
  if (db && uid) {
    try {
      await db.collection('users').doc(uid).collection('roasts').add(roastData);
    } catch (dbErr) {
      console.warn('[roastService] Failed to save roast to Firestore:', dbErr.message);
    }
  }

  return roastData;
};
