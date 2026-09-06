import { generateStructuredResponse } from './geminiService.js';
import { PROMPTS } from '../utils/prompts.js';
import { DailyRoadmapResponseSchema } from '../utils/validation.js';
import { db } from '../config/firebaseAdmin.js';

/**
 * Generate a personalized roadmap via Gemini and persist it.
 */
export const generateRoadmap = async (uid, { career, profile, skillGap }) => {
  const prompt = PROMPTS.ROADMAP({ career, profile, skillGap });
  const result = await generateStructuredResponse(prompt, DailyRoadmapResponseSchema);

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
  
  return { completedTask: task, nextTask, milestoneProgress };
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
