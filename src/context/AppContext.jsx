import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { analyzeSkills, generateRoadmap, CAREER_PROFILES, fetchTodaysTasks, completeTaskAPI } from '../services/aiService';
import { useAuth } from './AuthContext';
import { apiGet, apiPut, apiPost } from '../services/api';

const AppContext = createContext();

const STORAGE_KEY_USER = 'skillnav_user_profile';
const STORAGE_KEY_ASSESSMENT = 'skillnav_assessment';
const STORAGE_KEY_ROADMAP = 'skillnav_roadmap';
const STORAGE_KEY_JOBS = 'skillnav_jobs';

/**
 * Build a default user object from Firebase auth, falling back to localStorage.
 */
const buildDefaultUser = (authUser) => {
  if (authUser) {
    return {
      name: authUser.displayName || 'Student',
      email: authUser.email || '',
      degree: '',
      major: '',
      skills: [],
      targetCareer: 'ai-engineer',
      experienceLevel: 'Entry-Level / Student',
    };
  }
  return {
    name: 'Student',
    email: '',
    degree: '',
    major: '',
    skills: [],
    targetCareer: 'ai-engineer',
    experienceLevel: 'Entry-Level / Student',
  };
};

const DEFAULT_ASSESSMENT = {
  completed: false,
  answers: {},
  timestamp: null,
};

export const AppProvider = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();

  // User Profile State — seeded from localStorage, synced to backend when possible
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fall through */ }
    }
    return buildDefaultUser(authUser);
  });

  // Assessment State
  const [assessment, setAssessment] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ASSESSMENT);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fall through */ }
    }
    return DEFAULT_ASSESSMENT;
  });

  // Synchronous initial calculation for Analysis Data (local fallback)
  const [analysisResult, setAnalysisResult] = useState(() => {
    return analyzeSkills(user.skills, user.targetCareer, assessment.answers || {});
  });

  // Roadmap State
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROADMAP);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { /* fall through */ }
    }
    const result = generateRoadmap(user.targetCareer);
    return Array.isArray(result) ? result : result.roadmap;
  });

  // Job Description Analyses State
  const [jobAnalyses, setJobAnalyses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_JOBS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fall through */ }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(false);

  // ── Check backend availability on mount ────────────────────────────────────
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/health`).then(r => {
      if (r.ok) setBackendAvailable(true);
    }).catch(() => setBackendAvailable(false));
  }, []);

  // ── Sync auth user info into profile ───────────────────────────────────────
  useEffect(() => {
    if (authUser && isAuthenticated) {
      setUser(prev => {
        // Only update if the Firebase user is different (first login or account switch)
        if (prev.email === authUser.email && prev.name && prev.name !== 'Student') return prev;
        return {
          ...prev,
          name: authUser.displayName || prev.name || 'Student',
          email: authUser.email || prev.email,
        };
      });

      // Try to fetch profile from backend
      if (backendAvailable) {
        apiGet('/user/profile').then(profile => {
          if (profile && profile.skills) {
            setUser(prev => ({ ...prev, ...profile, name: profile.displayName || profile.name || prev.name }));
          }
        }).catch(() => { /* backend not ready yet, use local */ });
      }
    }
  }, [authUser, isAuthenticated, backendAvailable]);

  // ── Sync state to LocalStorage (offline-first) ────────────────────────────
  useEffect(() => { localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_ASSESSMENT, JSON.stringify(assessment)); }, [assessment]);
  useEffect(() => {
    if (roadmap.length > 0) localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(roadmap));
  }, [roadmap]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobAnalyses)); }, [jobAnalyses]);

  // ── Recalculate analysis when profile / assessment changes ─────────────────
  useEffect(() => {
    if (user && user.targetCareer) {
      const result = analyzeSkills(user.skills, user.targetCareer, assessment.answers || {});
      setAnalysisResult(result);
    }
  }, [user.targetCareer, user.skills, assessment]);

  const [dailyTasks, setDailyTasks] = useState(() => {
    const saved = localStorage.getItem('skillnav_daily_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fall through */ }
    }
    return { activeTasks: [], previewTasks: [], career: null };
  });
  const [dailyTasksLoading, setDailyTasksLoading] = useState(false);

  // ── Streak Tracking (Phase 2) ──────────────────────────────────────────────
  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem('skillnav_streak');
    return saved ? parseInt(saved, 10) || 1 : 1;
  });
  const [streakCelebration, setStreakCelebration] = useState(false);

  useEffect(() => {
    localStorage.setItem('skillnav_daily_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  useEffect(() => {
    localStorage.setItem('skillnav_streak', String(currentStreak));
  }, [currentStreak]);

  const fetchDailyTasks = useCallback(async () => {
    if (!backendAvailable || !isAuthenticated) return;
    setDailyTasksLoading(true);
    try {
      const result = await fetchTodaysTasks();
      setDailyTasks(result || { activeTasks: [], previewTasks: [], career: null });
    } catch (err) {
      console.warn('[AppContext] Failed to fetch daily tasks:', err.message);
    } finally {
      setDailyTasksLoading(false);
    }
  }, [backendAvailable, isAuthenticated]);

  const markTaskComplete = useCallback(async (taskId) => {
    try {
      const result = await completeTaskAPI(taskId);
      if (result?.currentStreak !== undefined) {
        setCurrentStreak(result.currentStreak);
        setUser(prev => ({ ...prev, currentStreak: result.currentStreak }));
      } else {
        setCurrentStreak(s => s + 1);
      }
      setStreakCelebration(true);
      setTimeout(() => setStreakCelebration(false), 3500);

      await fetchDailyTasks();
      return result;
    } catch (err) {
      console.error('[AppContext] Failed to complete task:', err.message);
      // Fallback local update
      setCurrentStreak(s => s + 1);
      setStreakCelebration(true);
      setTimeout(() => setStreakCelebration(false), 3500);
      setDailyTasks(prev => ({
        ...prev,
        activeTasks: (prev.activeTasks || []).map(t => t.id === taskId ? { ...t, status: 'completed' } : t)
      }));
    }
  }, [fetchDailyTasks]);

  useEffect(() => {
    if (backendAvailable && isAuthenticated) {
      fetchDailyTasks();
    }
  }, [backendAvailable, isAuthenticated, fetchDailyTasks]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const updateUserProfile = useCallback((updates) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updates };
      const result = analyzeSkills(nextUser.skills, nextUser.targetCareer, assessment.answers || {});
      setAnalysisResult(result);
      if (updates.targetCareer && updates.targetCareer !== prev.targetCareer) {
        const generated = generateRoadmap(nextUser.targetCareer);
        setRoadmap(Array.isArray(generated) ? generated : generated.roadmap);
      }
      return nextUser;
    });

    // Persist to backend if available
    if (backendAvailable && isAuthenticated) {
      apiPut('/user/profile', updates).catch(console.error);
    }
  }, [assessment, backendAvailable, isAuthenticated]);

  const saveAssessment = useCallback((answers) => {
    setIsLoading(true);
    const newAssessment = { completed: true, answers, timestamp: new Date().toISOString() };
    setAssessment(newAssessment);

    const result = analyzeSkills(user.skills, user.targetCareer, answers);
    setAnalysisResult(result);

    const generated = generateRoadmap(user.targetCareer);
    setRoadmap(Array.isArray(generated) ? generated : generated.roadmap);

    setIsLoading(false);
    return result;
  }, [user.skills, user.targetCareer]);

  const toggleRoadmapStep = useCallback((stepId) => {
    setRoadmap(prev => prev.map(item => {
      if (item.id === stepId) {
        const newStatus = item.status === 'Completed' ? 'In Progress' : 'Completed';
        const newProgress = newStatus === 'Completed' ? 100 : 50;
        return { ...item, status: newStatus, progress: newProgress };
      }
      return item;
    }));
  }, []);

  const addSkillsToRoadmap = useCallback((skillsToAdd) => {
    const skillList = Array.isArray(skillsToAdd) ? skillsToAdd : [skillsToAdd];
    const existingSkillsLower = roadmap.flatMap(r => (r.skills || []).map(s => String(s).toLowerCase()));
    const newSkills = skillList.filter(s => s && !existingSkillsLower.includes(String(s).toLowerCase()));

    if (newSkills.length === 0) return false;

    const newSteps = newSkills.map((skill, index) => ({
      id: `job-skill-${Date.now()}-${index}`,
      stageNumber: `0${roadmap.length + index + 1}`,
      title: `Job Gap Fix: ${skill} Mastery`,
      description: `Targeted learning phase dynamically added from job requirement analysis for ${skill}.`,
      duration: '2 Weeks',
      difficulty: 'High Impact',
      status: 'Upcoming',
      progress: 0,
      skills: [skill],
      resources: [
        { title: `${skill} Quick-Start Guide`, url: 'https://developer.mozilla.org/', type: 'Tutorial' },
        { title: `${skill} Documentation`, url: 'https://github.com/', type: 'Docs' }
      ],
      project: {
        title: `Portfolio Implementation: ${skill}`,
        description: `Build a concrete demo project highlighting ${skill} to present to recruiters.`
      }
    }));

    setRoadmap(prev => [...prev, ...newSteps]);
    return true;
  }, [roadmap]);

  const saveJobAnalysis = useCallback((analysisData) => {
    setJobAnalyses(prev => [analysisData, ...prev]);
  }, []);

  const activeCareerProfile = CAREER_PROFILES[user.targetCareer] || CAREER_PROFILES['ai-engineer'];

  return (
    <AppContext.Provider value={{
      user,
      assessment,
      analysisResult,
      roadmap,
      jobAnalyses,
      isLoading,
      backendAvailable,
      activeCareerProfile,
      updateUserProfile,
      saveAssessment,
      toggleRoadmapStep,
      addSkillsToRoadmap,
      saveJobAnalysis,
      CAREER_PROFILES,
      dailyTasks,
      dailyTasksLoading,
      fetchDailyTasks,
      markTaskComplete,
      currentStreak,
      streakCelebration,
      setStreakCelebration
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
