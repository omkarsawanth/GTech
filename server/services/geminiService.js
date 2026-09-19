import { genai, GEMINI_MODEL_NAME } from '../config/gemini.js';

/**
 * Core Gemini call — parses the response and validates JSON.
 * @param {string} prompt - The full prompt string
 * @param {ZodSchema} schema - Zod schema to validate the response
 * @returns {object} Validated and parsed response data
 */
export const generateStructuredResponse = async (prompt, schema, metadata = {}) => {
  if (!genai) {
    const appError = new Error('GEMINI_API_KEY is not configured on the server.');
    appError.code = 'GEMINI_NOT_CONFIGURED';
    appError.userMessage = 'Gemini API key is not configured. Please add GEMINI_API_KEY to your server .env file.';
    throw appError;
  }
  const auditUid = metadata.uid || 'anonymous';
  const auditTag = metadata.tag || 'structured';
  console.log(`[Gemini Audit] [${new Date().toISOString()}] uid=${auditUid} action=${auditTag} model=${GEMINI_MODEL_NAME}`);
  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      throw new Error('Gemini returned an empty response.');
    }

    // Strip markdown code fences if present
    const cleanJson = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('[Gemini] JSON parse failed. Raw response:', rawText.substring(0, 500));
      throw new Error('AI returned malformed JSON. Please try again.');
    }

    // Validate with Zod schema
    const validated = schema.safeParse(parsed);
    if (!validated.success) {
      console.error('[Gemini] Schema validation failed:', validated.error.flatten());
      const appError = new Error('Gemini response did not match the required schema.');
      appError.code = 'GEMINI_SCHEMA_MISMATCH';
      appError.userMessage = 'AI generated a response that did not match the required format. Please try again.';
      throw appError;
    }

    return validated.data;
  } catch (error) {
    if (error.code) {
      throw error;
    }
    // Re-throw as a typed error
    const appError = new Error(error.message || 'AI generation failed');
    appError.code = 'GEMINI_ERROR';
    appError.userMessage = 'AI analysis is temporarily unavailable. Please try again in a moment.';
    throw appError;
  }
};

/**
 * Simple text generation (no JSON parsing) — used for mentor responses
 */
export const generateTextResponse = async (prompt, metadata = {}) => {
  if (!genai) {
    const appError = new Error('GEMINI_API_KEY is not configured on the server.');
    appError.code = 'GEMINI_NOT_CONFIGURED';
    appError.userMessage = 'Gemini API key is not configured. Please add GEMINI_API_KEY to your server .env file.';
    throw appError;
  }
  const auditUid = metadata.uid || 'anonymous';
  const auditTag = metadata.tag || 'text';
  console.log(`[Gemini Audit] [${new Date().toISOString()}] uid=${auditUid} action=${auditTag} model=${GEMINI_MODEL_NAME}`);
  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    return response.text?.trim() || 'I was unable to generate a response. Please try again.';
  } catch (error) {
    console.error('[Gemini API Error]', error);
    let msg = error.message || 'AI mentor is temporarily unavailable.';
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400 || error.message?.includes('API key not valid')) {
      msg = 'Your Gemini API Key is invalid or expired. Please check your GEMINI_API_KEY in .env.';
    } else if (error.status === 429 || error.message?.includes('RESOURCE_EXHAUSTED')) {
      msg = 'Gemini quota limit reached. Please wait a moment and try again.';
    }
    const appError = new Error(msg);
    appError.code = 'GEMINI_ERROR';
    appError.userMessage = msg;
    throw appError;
  }
};
