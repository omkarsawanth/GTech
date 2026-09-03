import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { ProjectsResponseSchema } from '../utils/validation.js';

/**
 * Generate portfolio projects via Gemini.
 */
export const generateProjects = async ({ career, skills, missingSkills, experienceLevel }) => {
  const prompt = PROMPTS.PROJECTS({ career, skills, missingSkills, experienceLevel });
  return await generateStructuredResponse(prompt, ProjectsResponseSchema);
};
