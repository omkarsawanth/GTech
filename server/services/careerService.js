import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { CareerMatchResponseSchema } from '../utils/validation.js';

/**
 * Match user profile to ranked careers via Gemini.
 */
export const matchCareers = async ({ profile }, uid = null) => {
  const prompt = PROMPTS.CAREER_MATCH({ profile });
  return await generateStructuredResponse(prompt, CareerMatchResponseSchema, { uid, tag: 'career-match' });
};
