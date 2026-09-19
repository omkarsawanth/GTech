import { generateProjects as genProjects } from '../services/projectService.js';
import { ProjectGenerationInputSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * POST /api/projects/generate
 */
export const generateProjects = async (req, res, next) => {
  try {
    const parsed = ProjectGenerationInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid project generation parameters' },
      });
    }

    const { career, skills, missingSkills, experienceLevel } = parsed.data;

    // Fallback to user Firestore profile if not provided
    let userProfile = {};
    if (!career && (!skills || skills.length === 0)) {
      const snap = await db.collection('users').doc(req.user.uid).get();
      userProfile = snap.exists ? snap.data() : {};
    }

    const result = await genProjects({
      career: career || userProfile.targetCareer || 'Software Engineer',
      skills: (skills && skills.length > 0) ? skills : (userProfile.skills || []),
      missingSkills: missingSkills || [],
      experienceLevel: experienceLevel || userProfile.experienceLevel || 'Entry-Level',
    }, req.user?.uid);

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
