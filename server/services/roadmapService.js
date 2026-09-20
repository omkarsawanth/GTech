import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { DailyRoadmapResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * Generate a personalized roadmap via Gemini and persist it.
 */
export const generateRoadmap = async (uid, { career, profile, skillGap }) => {
  const prompt = PROMPTS.ROADMAP({ career, profile, skillGap });
  const result = await generateStructuredResponse(prompt, DailyRoadmapResponseSchema, { uid, tag: 'roadmap' });

  // Initialize tasks
  if (result.tasks && result.tasks.length > 0) {
    result.tasks.forEach(task => {
      task.status = task.dayNumber === 1 ? 'unlocked' : 'locked';
      task.completedAt = null;
    });
  }

  await db.collection('users').doc(uid).collection('roadmap').doc('current').set({
    ...result,
    career,
    updatedAt: new Date(),
  }, { merge: true });

  return result;
};

/**
 * Get cached roadmap.
 */
export const getCachedRoadmap = async (uid) => {
  const snap = await db.collection('users').doc(uid).collection('roadmap').doc('current').get();
  return snap.exists ? snap.data() : null;
};

/**
 * Update a single milestone's status / progress.
 */
export const updateMilestone = async (uid, milestoneId, updates) => {
  const roadmapRef = db.collection('users').doc(uid).collection('roadmap').doc('current');
  const snap = await roadmapRef.get();
  if (!snap.exists) throw Object.assign(new Error('No roadmap found'), { statusCode: 404 });

  const data = snap.data();
  const roadmap = data.roadmap || [];
  const idx = roadmap.findIndex(m => m.id === milestoneId);
  if (idx === -1) throw Object.assign(new Error('Milestone not found'), { statusCode: 404 });

  roadmap[idx] = { ...roadmap[idx], ...updates };
  await roadmapRef.update({ roadmap, updatedAt: new Date() });
  return roadmap[idx];
};

/**
 * Complete a task and unlock the next one.
 */
export const completeTask = async (uid, taskId) => {
  const roadmapRef = db.collection('users').doc(uid).collection('roadmap').doc('current');
  const snap = await roadmapRef.get();
  if (!snap.exists) throw Object.assign(new Error('No roadmap found'), { statusCode: 404 });

  const data = snap.data();
  const tasks = data.tasks || [];
  const roadmap = data.roadmap || [];
  
  const taskIdx = tasks.findIndex(t => t.id === taskId);
  if (taskIdx === -1) throw Object.assign(new Error('Task not found'), { statusCode: 404 });
  
  const task = tasks[taskIdx];
  if (task.status === 'completed') throw Object.assign(new Error('Task already completed'), { statusCode: 400 });

  task.status = 'completed';
  task.completedAt = new Date();

  // Find next task by dayNumber
  const nextTaskIdx = tasks.findIndex(t => t.dayNumber === task.dayNumber + 1);
  let nextTask = null;
  if (nextTaskIdx !== -1) {
    tasks[nextTaskIdx].status = 'unlocked';
    nextTask = tasks[nextTaskIdx];
  }

  // Update milestone progress
  const milestoneId = task.milestoneId;
  const milestoneIdx = roadmap.findIndex(m => m.id === milestoneId);
  let milestoneProgress = 0;
  if (milestoneIdx !== -1) {
    const milestoneTasks = tasks.filter(t => t.milestoneId === milestoneId);
    const completedTasks = milestoneTasks.filter(t => t.status === 'completed');
    milestoneProgress = Math.round((completedTasks.length / milestoneTasks.length) * 100);
    
    roadmap[milestoneIdx].progress = milestoneProgress;
    if (milestoneProgress === 100) {
      roadmap[milestoneIdx].status = 'completed';
    } else if (roadmap[milestoneIdx].status === 'locked') {
      roadmap[milestoneIdx].status = 'in-progress';
    }
  }

  await roadmapRef.update({ tasks, roadmap, updatedAt: new Date() });
  
  // Update streak in user document with Streak Freeze mechanic
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const userRef = db.collection('users').doc(uid);
  const userSnap = await userRef.get();
  const userData = userSnap.exists ? userSnap.data() : {};
  let currentStreak = userData.currentStreak || 0;
  const lastCompletedDate = userData.lastCompletedDate || null;
  let streakFreezes = userData.streakFreezes !== undefined ? userData.streakFreezes : 1;
  let streakIncremented = false;
  let streakSavedByFreeze = false;

  // Weekly freeze refresh check (grant 1 freeze per week)
  const lastFreezeRefresh = userData.lastFreezeRefresh ? new Date(userData.lastFreezeRefresh) : null;
  const daysSinceRefresh = lastFreezeRefresh ? (Date.now() - lastFreezeRefresh.getTime()) / (1000 * 60 * 60 * 24) : 999;
  if (daysSinceRefresh >= 7 && streakFreezes < 1) {
    streakFreezes = 1;
  }

  if (!lastCompletedDate) {
    currentStreak = 1;
    streakIncremented = true;
  } else if (lastCompletedDate === yesterdayStr) {
    currentStreak += 1;
    streakIncremented = true;
  } else if (lastCompletedDate === todayStr) {
    streakIncremented = false;
  } else {
    // Missed at least one day: check if streak freeze can protect the streak
    if (streakFreezes > 0 && currentStreak > 0) {
      streakFreezes -= 1;
      currentStreak += 1;
      streakSavedByFreeze = true;
      streakIncremented = true;
    } else {
      currentStreak = 1;
      streakIncremented = true;
    }
  }

  // Check streak milestone unlocks (e.g. 3, 7, 14, 30, 100 days)
  const streakMilestones = {
    3: { days: 3, badge: 'Spark Initiate', title: '3-Day Momentum Spark', desc: 'First habit loop locked in.', icon: '🔥' },
    7: { days: 7, badge: 'Cyber Flamekeeper', title: '7-Day High Roller', desc: 'Top 10% consistency tier unlocked.', icon: '⚡' },
    14: { days: 14, badge: 'Neural Surfer', title: '14-Day Cyber Surge', desc: '2 consecutive weeks of unstoppable build momentum.', icon: '💥' },
    30: { days: 30, badge: 'Solar Titan', title: '30-Day Relentless', desc: 'Full month streak! Industry-ready mindset verified.', icon: '🌟' },
    100: { days: 100, badge: 'Quantum Overlord', title: '100-Day Legend', desc: 'Elite top 0.1% disciplined tech builder.', icon: '👑' }
  };
  const milestoneUnlocked = streakMilestones[currentStreak] || null;

  const userUpdates = {
    currentStreak,
    lastCompletedDate: todayStr,
    streakFreezes,
    ...(milestoneUnlocked && { milestoneUnlocked }),
    ...(streakSavedByFreeze && { lastFreezeUsedAt: todayStr }),
    updatedAt: new Date(),
  };

  await userRef.set(userUpdates, { merge: true });

  return { 
    completedTask: task, 
    nextTask, 
    milestoneProgress, 
    currentStreak, 
    milestoneUnlocked,
    streakIncremented, 
    streakSavedByFreeze,
    streakFreezes 
  };
};

/**
 * Get today's active and preview tasks.
 */
export const getTodaysTasks = async (uid) => {
  const roadmapRef = db.collection('users').doc(uid).collection('roadmap').doc('current');
  const snap = await roadmapRef.get();
  if (!snap.exists) {
    return { activeTasks: [], previewTasks: [], career: null };
  }

  const data = snap.data();
  const tasks = data.tasks || [];
  
  const activeTasks = tasks.filter(t => t.status === 'unlocked');
  
  // Find the max dayNumber among unlocked tasks to determine preview tasks
  const maxUnlockedDay = activeTasks.length > 0 
    ? Math.max(...activeTasks.map(t => t.dayNumber))
    : (tasks.find(t => t.status === 'completed') ? Math.max(...tasks.filter(t => t.status === 'completed').map(t => t.dayNumber)) : 0);
    
  const previewTasks = tasks
    .filter(t => t.status === 'locked' && t.dayNumber > maxUnlockedDay)
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .slice(0, 3);
    
  return { activeTasks, previewTasks, career: data.career };
};
