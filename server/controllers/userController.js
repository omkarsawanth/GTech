import { db } from '../config/firebaseAdmin.js';
import { ProfileInputSchema } from '../utils/validation.js';

/**
 * GET /api/user/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const snap = await db.collection('users').doc(req.user.uid).get();
    res.json({
      success: true,
      data: snap.exists ? snap.data() : { uid: req.user.uid, email: req.user.email, displayName: req.user.displayName },
    });
  } catch (err) { next(err); }
};

/**
 * PUT /api/user/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const parsed = ProfileInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message || 'Invalid input' },
      });
    }

    const { name, degree, major, experienceLevel, skills, targetCareer } = parsed.data;
    const updates = {
      ...(name !== undefined && { displayName: name, name }),
      ...(degree !== undefined && { degree }),
      ...(major !== undefined && { major }),
      ...(experienceLevel !== undefined && { experienceLevel }),
      ...(skills !== undefined && { skills }),
      ...(targetCareer !== undefined && { targetCareer }),
      updatedAt: new Date(),
    };

    await db.collection('users').doc(req.user.uid).set(updates, { merge: true });
    res.json({ success: true, data: updates });
  } catch (err) { next(err); }
};

/**
 * GET /api/user/dashboard — aggregated dashboard data
 */
export const getDashboard = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    const [userSnap, skillGapSnap, roadmapSnap] = await Promise.all([
      db.collection('users').doc(uid).get(),
      db.collection('users').doc(uid).collection('skillGap').doc('current').get(),
      db.collection('users').doc(uid).collection('roadmap').doc('current').get(),
    ]);

    const profile = userSnap.exists ? userSnap.data() : {};
    const skillGap = skillGapSnap.exists ? skillGapSnap.data() : null;
    const roadmap = roadmapSnap.exists ? roadmapSnap.data() : null;

    // Calculate roadmap progress
    let roadmapProgress = 0;
    if (roadmap?.roadmap?.length) {
      const completed = roadmap.roadmap.filter(m => m.status === 'completed').length;
      roadmapProgress = Math.round((completed / roadmap.roadmap.length) * 100);
    }

    res.json({
      success: true,
      data: {
        profile,
        skillGap,
        roadmap,
        readinessScore: skillGap?.readinessScore || null,
        roadmapProgress,
        skillsMasteredCount: skillGap?.currentSkills?.length || 0,
        totalSkillsCount: skillGap?.requiredSkills?.length || 0,
        criticalGapsCount: skillGap?.missingSkills?.filter(s => s.severity === 'Critical').length || 0,
        currentStreak: profile?.currentStreak || 0,
        lastCompletedDate: profile?.lastCompletedDate || null,
        streakFreezes: profile?.streakFreezes !== undefined ? profile.streakFreezes : 1,
      },
    });
  } catch (err) { next(err); }
};
