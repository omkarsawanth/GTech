import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { JobAnalysisResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * Analyze a job description against user profile via Gemini.
 */
export const analyzeJob = async (uid, { jobDescription, profile, career }) => {
  const prompt = PROMPTS.JOB_ANALYSIS({ jobDescription, profile, career });
  const result = await generateStructuredResponse(prompt, JobAnalysisResponseSchema);

  // Store analysis history
  const docRef = db.collection('users').doc(uid).collection('jobAnalyses').doc();
  await docRef.set({
    ...result,
    jobDescriptionSnippet: jobDescription.substring(0, 500),
    createdAt: new Date(),
  });

  return { ...result, id: docRef.id };
};
