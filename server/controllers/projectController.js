import { generateProjects as genProjects } from '../services/projectService.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * POST /api/projects/generate
 */
export const generateProjects = async (req, res, next) => {
  try {
    const { career, skills, missingSkills, experienceLevel } = req.body;

    // Fallback to user Firestore profile if not provided
    let userProfile = {};
    if (!career && !skills) {
      const snap = await db.collection('users').doc(req.user.uid).get();
      userProfile = snap.exists ? snap.data() : {};
    }

    const result = await genProjects({
      career: career || userProfile.targetCareer || 'Software Engineer',
      skills: skills || userProfile.skills || [],
      missingSkills: missingSkills || [],
      experienceLevel: experienceLevel || userProfile.experienceLevel || 'Entry-Level',
    });

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
