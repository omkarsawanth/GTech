/**
 * AI Service for GTech Career Intelligence Platform
 * Universal Career Engine spanning 15 professional disciplines.
 */
import { ALL_CAREERS, getCareerById, CAREER_CATEGORIES } from '../data/careersData.js';
import { apiPost, apiGet, apiPut } from './api.js';

/**
 * Universal CAREER_PROFILES dictionary dynamically constructed from ALL_CAREERS.
 * Provides backwards-compatible access and full multi-profession expansion.
 */
export const CAREER_PROFILES = ALL_CAREERS.reduce((acc, career) => {
  acc[career.id] = {
    id: career.id,
    title: career.title,
    domain: career.domain,
    category: career.domain,
    description: career.description || career.manifesto,
    difficulty: career.experienceReq || '0-2 YRS FOUNDATIONS',
    salary: career.salary,
    avgSalary: career.salary,
    demand: career.demand,
    evidenceType: career.evidenceType,
    skills: career.skills || [],
    requiredSkills: (career.skills || []).map(s => ({
      name: s.name,
      requiredLevel: s.required,
      baselineLevel: s.baseline || 40,
      category: s.category,
      importance: s.importance || 'High'
    })),
    knowledge: career.knowledge || [],
    education: career.education || [],
    certifications: career.certifications || [],
    licenses: career.licenses || [],
    portfolio: career.portfolio || [],
    projects: career.projects || [],
    practicalTraining: career.practicalTraining || [],
    requiredEvidence: career.requiredEvidence || [],
    nextAction: career.nextAction
  };
  return acc;
}, {});

/**
 * Synchronous Universal Skill Analysis Engine
 * Evaluates evidence-based Career Readiness across skills, roadmap completion, practical casework, and experience.
 */
export function analyzeSkills(
  userSkills = [], 
  targetCareerId = 'software-engineer', 
  assessmentAnswers = {},
  roadmap = [],
  userProfile = {},
  dailyTasks = { activeTasks: [], previewTasks: [] }
) {
  const profile = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES['software-engineer'] || Object.values(CAREER_PROFILES)[0];
  
  const userSkillMap = {};
  (userSkills || []).forEach(s => {
    if (s) userSkillMap[String(s).toLowerCase().trim()] = true;
  });

  // Calculate Roadmap Phase Verification
  const phasesList = Array.isArray(roadmap) ? roadmap : (roadmap?.roadmap || []);
  const completedPhases = phasesList.filter(r => r.status === 'Completed');
  const totalPhasesCount = Math.max(1, phasesList.length || 4);
  const completedPhasesCount = completedPhases.length;
  const roadmapProgress = Math.round((completedPhasesCount / totalPhasesCount) * 100);

  // Set of skills verified by completed roadmap phases
  const completedRoadmapSkills = new Set();
  completedPhases.forEach(phase => {
    (phase.skills || []).forEach(sk => {
      if (sk) completedRoadmapSkills.add(String(sk).toLowerCase().trim());
    });
  });

  // Count verified daily tasks & capstone projects
  const verifiedTasksCount = 
    (roadmap?.tasks || []).filter(t => t.status === 'completed').length + 
    (dailyTasks?.activeTasks || []).filter(t => t.status === 'completed').length;

  const skillChartData = profile.requiredSkills.map((req, index) => {
    const key = req.name.toLowerCase().trim();
    let currentLevel = req.baselineLevel || 35;

    // 1. Check direct match or substring in user profile skills
    if (userSkillMap[key] || (userSkills || []).some(u => u && (key.includes(String(u).toLowerCase().trim()) || String(u).toLowerCase().trim().includes(key)))) {
      currentLevel = Math.max(currentLevel, 68);
    }

    // 2. Check specific assessment answers if mapped
    const ansKey = `q_skill_${index}`;
    if (assessmentAnswers[ansKey]) {
      const valMap = { 'Beginner': 28, 'Basic': 52, 'Intermediate': 75, 'Advanced': 92 };
      currentLevel = valMap[assessmentAnswers[ansKey]] || currentLevel;
    }

    // 3. Roadmap Milestone Verification Impact:
    // If a completed roadmap phase specifically targets this skill, boost proficiency
    const isExplicitlyVerifiedInRoadmap = Array.from(completedRoadmapSkills).some(cs => key.includes(cs) || cs.includes(key));
    if (isExplicitlyVerifiedInRoadmap) {
      currentLevel = Math.max(currentLevel, Math.min(req.requiredLevel, currentLevel + 25));
    } else if (completedPhasesCount > 0) {
      // General curriculum completion provides cross-domain skill lift
      const phaseLift = Math.round((completedPhasesCount / totalPhasesCount) * 10);
      currentLevel = Math.min(req.requiredLevel, currentLevel + phaseLift);
    }

    const gap = Math.max(0, req.requiredLevel - currentLevel);
    const percentage = Math.round((currentLevel / req.requiredLevel) * 100);

    return {
      skill: req.name,
      currentLevel,
      requiredLevel: req.requiredLevel,
      gap,
      percentage: Math.min(100, percentage),
      importance: req.importance
    };
  });

  // Skills Component Score
  const totalRequired = skillChartData.reduce((acc, item) => acc + item.requiredLevel, 0);
  const totalCurrent = skillChartData.reduce((acc, item) => acc + Math.min(item.currentLevel, item.requiredLevel), 0);
  const skillsProficiency = Math.round((totalCurrent / (totalRequired || 1)) * 100) || 50;

  // Practical Evidence Score (from assessment answer q_evidence, daily tasks, and capstone phase)
  let evidenceScore = 35;
  if (assessmentAnswers['q_evidence']) {
    const evMap = { 'Beginner': 25, 'Basic': 50, 'Intermediate': 75, 'Advanced': 95 };
    evidenceScore = evMap[assessmentAnswers['q_evidence']] || 35;
  }
  if (verifiedTasksCount > 0) {
    evidenceScore = Math.min(100, evidenceScore + Math.min(25, verifiedTasksCount * 4));
  }
  if (completedPhases.some(p => p.stageNumber === '04' || p.stageNumber === '03' || String(p.title).toLowerCase().includes('capstone') || String(p.title).toLowerCase().includes('evidence'))) {
    evidenceScore = Math.min(100, evidenceScore + 15);
  }

  // Domain Experience & Background Score (from userProfile)
  let experienceScore = 55;
  const expLevel = userProfile?.experienceLevel;
  if (expLevel) {
    if (expLevel.includes('Junior') || expLevel.includes('1-2')) experienceScore = 70;
    else if (expLevel.includes('Mid-Level') || expLevel.includes('3-5')) experienceScore = 85;
    else if (expLevel.includes('Senior') || expLevel.includes('Transition')) experienceScore = 90;
  }
  if (userProfile?.degree) {
    experienceScore = Math.min(100, experienceScore + 10);
  }

  // Multi-Pillar Composite Career Readiness Score:
  // At 0 phases completed and no assessment: skillsProficiency determines the exact foundational baseline (e.g. 56% for Financial Analyst).
  // Completing roadmap phases elevates skills and adds roadmap verification credit.
  // When all 4 phases are verified, readiness reaches ~86% (clearly distinguished from 100% roadmap progress).
  let compositeReadiness;
  if (completedPhasesCount === 0 && !assessmentAnswers['q_skill_0'] && (!userSkills || userSkills.length === 0)) {
    // Exact baseline for cold-start candidates
    compositeReadiness = skillsProficiency;
  } else {
    // Weighted multi-pillar evaluation
    const roadmapVerificationBonus = Math.round(roadmapProgress * 0.15); // 0 to 15 points
    const evidenceBonus = Math.round((evidenceScore / 100) * 8); // 2 to 8 points
    const experienceBonus = Math.round((experienceScore / 100) * 6); // 3 to 6 points
    const calculatedScore = Math.round((skillsProficiency * 0.75) + roadmapVerificationBonus + evidenceBonus + experienceBonus);
    compositeReadiness = Math.max(skillsProficiency, calculatedScore);
  }

  const readinessScore = Math.min(98, Math.max(15, compositeReadiness));

  const strongSkills = skillChartData.filter(s => s.currentLevel >= 70);
  const developingSkills = skillChartData.filter(s => s.currentLevel >= 40 && s.currentLevel < 70);
  const criticalGaps = skillChartData.filter(s => s.currentLevel < 40 || s.gap >= 35);

  const topGap = criticalGaps[0] || developingSkills[0] || skillChartData[0] || { skill: 'Core Competency' };
  
  const rawNextAction = profile.nextAction || {
    badge: `MASTER ${topGap.skill.toUpperCase()}`,
    title: `Close ${topGap.skill} Competency Deficit`,
    type: profile.evidenceType || 'Casework Artifact',
    tags: [topGap.skill, 'Domain Rigor', 'Portfolio Proof'],
    description: `${topGap.skill} is the primary gap distinguishing your current profile from the verified benchmark for ${profile.title}.`,
    impactDelta: '+28% Career Readiness'
  };

  const nextBestMove = {
    title: rawNextAction.title,
    skill: topGap.skill,
    reason: rawNextAction.description,
    badge: rawNextAction.badge,
    type: rawNextAction.type,
    impactDelta: rawNextAction.impactDelta,
    tags: rawNextAction.tags || [topGap.skill],
    estimatedTime: '2-3 Weeks',
    actionText: 'Start Execution'
  };

  return {
    careerTitle: profile.title,
    readinessScore,
    roadmapProgress,
    completedPhasesCount,
    totalPhasesCount,
    skillsMasteredCount: strongSkills.length,
    totalSkillsCount: profile.requiredSkills.length,
    criticalGapsCount: criticalGaps.length,
    evidenceScore,
    experienceScore,
    readinessBreakdown: {
      skills: skillsProficiency,
      roadmap: roadmapProgress,
      evidence: evidenceScore,
      experience: experienceScore
    },
    skillChartData,
    strongSkills,
    developingSkills,
    criticalGaps,
    nextBestMove
  };
}

let globalDayCounter = 1;

/**
 * Universal Synchronous Roadmap Generator
 * Creates a profession-aware chronological curriculum tailored to the specific domain.
 */
export function generateRoadmap(targetCareerId = 'software-engineer', customSkillsToAdd = []) {
  const profile = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES['software-engineer'] || Object.values(CAREER_PROFILES)[0];
  const skills = profile.requiredSkills || [];

  const skill1 = skills[0]?.name || 'Foundational Principles';
  const skill2 = skills[1]?.name || 'Core Methods';
  const skill3 = skills[2]?.name || 'Applied Systems';
  const skill4 = skills[3]?.name || 'Professional Casework';
  const skill5 = skills[4]?.name || 'Industry Readiness';

  const baseRoadmap = [
    {
      id: 'step-1',
      stageNumber: '01',
      title: `${skill1} & Core Theoretical Foundations`,
      description: `Establish analytical rigor and essential theory in ${skill1} required for institutional practice.`,
      duration: '2 Weeks',
      difficulty: 'Foundations',
      status: 'In Progress',
      progress: 0,
      skills: [skill1, ...(profile.knowledge?.slice(0, 2) || ['Theory'])],
      resources: [
        { title: `${skill1} Standard Reference Manual`, url: 'https://en.wikipedia.org/wiki/Portal:Contents', type: 'Docs' },
        { title: `${skill1} Foundational Lecture Series`, url: 'https://ocw.mit.edu/', type: 'Course' }
      ],
      project: {
        title: `${skill1} Diagnostic Synthesis`,
        description: `Complete an analytical synthesis testing theoretical limits and foundational formulas in ${skill1}.`
      }
    },
    {
      id: 'step-2',
      stageNumber: '02',
      title: `${skill2} & Domain Frameworks`,
      description: `Transition into practical methodologies, standards, and structured frameworks in ${skill2}.`,
      duration: '3 Weeks',
      difficulty: 'Intermediate',
      status: 'Upcoming',
      progress: 0,
      skills: [skill2, skill3],
      resources: [
        { title: `${skill2} Professional Practice Guidelines`, url: 'https://www.coursera.org/', type: 'Guide' },
        { title: `Applied ${skill3} Working Laboratory`, url: 'https://github.com/', type: 'Interactive' }
      ],
      project: {
        title: `${skill2} Structured Case Analysis`,
        description: `Develop a comprehensive evaluation applying ${skill2} and ${skill3} against an industry dataset or real case.`
      }
    },
    {
      id: 'step-3',
      stageNumber: '03',
      title: `Capstone Evidence: ${profile.nextAction?.title || 'Production System'}`,
      description: profile.nextAction?.description || `Build and document an end-to-end ${profile.evidenceType} verifying hire readiness.`,
      duration: '4 Weeks',
      difficulty: 'Advanced',
      status: 'Upcoming',
      progress: 0,
      skills: [skill4, ...(profile.nextAction?.tags || ['Capstone'])],
      resources: [
        { title: `${profile.title} Industry Benchmark Standard`, url: 'https://www.bls.gov/', type: 'Report' },
        { title: `${profile.evidenceType} Specification`, url: 'https://scholar.google.com/', type: 'Spec' }
      ],
      project: {
        title: profile.nextAction?.title || `${profile.title} Capstone Artifact`,
        description: profile.nextAction?.description || `Deliver a peer-reviewable ${profile.evidenceType}.`
      }
    },
    {
      id: 'step-4',
      stageNumber: '04',
      title: `Verified Credentials & Professional Licensing`,
      description: `Formalize industry readiness through credentialing, peer evaluation, and portfolio publication.`,
      duration: '2 Weeks',
      difficulty: 'Professional',
      status: 'Locked',
      progress: 0,
      skills: [skill5, ...(profile.certifications?.slice(0, 2) || ['Ethics & Compliance'])],
      resources: [
        { title: `${profile.certifications?.[0] || 'Professional Accreditation'} Syllabus`, url: 'https://www.credentialengine.org/', type: 'Certification' },
        { title: `Ethics & Professional Standards Review`, url: 'https://www.scu.edu/ethics/', type: 'Ethics' }
      ],
      project: {
        title: `Comprehensive Career Portfolio Dossier`,
        description: `Compile a complete portfolio demonstrating mastery across all ${profile.skills.length} core competencies for ${profile.title}.`
      }
    }
  ];

  // Append any custom skills added from job description analyzer
  if (Array.isArray(customSkillsToAdd) && customSkillsToAdd.length > 0) {
    customSkillsToAdd.forEach((customSkill, idx) => {
      baseRoadmap.push({
        id: `custom-step-${idx + 1}`,
        stageNumber: `0${baseRoadmap.length + 1}`,
        title: `Targeted Competency: ${customSkill}`,
        description: `Dedicated learning sprint specifically added to address market requirements for ${customSkill}.`,
        duration: '1-2 Weeks',
        difficulty: 'Focused',
        status: 'Upcoming',
        progress: 0,
        skills: [customSkill],
        resources: [
          { title: `${customSkill} Quick-Start Guide`, url: 'https://developer.mozilla.org/', type: 'Guide' }
        ],
        project: {
          title: `${customSkill} Practical Evidence`,
          description: `Construct a tangible evidence artifact demonstrating ${customSkill}.`
        }
      });
    });
  }

  // Generate daily atomic tasks for each milestone
  const allTasks = [];
  let dayCounter = 1;

  baseRoadmap.forEach((milestone, mIdx) => {
    const taskCount = 3;
    for (let tIdx = 0; tIdx < taskCount; tIdx++) {
      const skillName = milestone.skills[tIdx % milestone.skills.length] || milestone.title;
      allTasks.push({
        id: `task-${mIdx + 1}-${tIdx + 1}`,
        milestoneId: milestone.id,
        dayNumber: dayCounter,
        title: `${skillName} — Concept Drill ${tIdx + 1}`,
        description: `Review and complete 20 minutes of guided practice on ${skillName} methodologies.`,
        durationMinutes: 20 + (tIdx * 5),
        resourceUrl: milestone.resources?.[0]?.url || 'https://en.wikipedia.org/',
        resourceTitle: milestone.resources?.[0]?.title || 'Learning Resource',
        status: dayCounter === 1 ? 'unlocked' : 'locked',
        completedAt: null
      });
      dayCounter++;
    }
  });

  return { roadmap: baseRoadmap, tasks: allTasks };
}

/**
 * Universal Job Description Analyzer
 * Parses ANY pasted job posting across tech, finance, design, healthcare, law, etc.
 */
export function analyzeJobDescription(jobText = '', userSkills = []) {
  const normalizedText = (jobText || '').toLowerCase();
  
  // Extract or detect matched career
  let matchedCareer = ALL_CAREERS.find(c => normalizedText.includes(c.title.toLowerCase())) || ALL_CAREERS[0];

  const matchedSkills = [];
  const missingSkills = [];

  const candidateSkillsLower = (userSkills || []).map(s => String(s).toLowerCase().trim());

  matchedCareer.skills.forEach(s => {
    const skillLower = s.name.toLowerCase();
    const hasSkill = candidateSkillsLower.some(cs => cs.includes(skillLower) || skillLower.includes(cs));
    
    if (hasSkill) {
      matchedSkills.push(s.name);
    } else {
      missingSkills.push(s.name);
    }
  });

  // Calculate match percentage
  const totalSkills = matchedCareer.skills.length || 5;
  const matchScore = Math.min(95, Math.max(25, Math.round((matchedSkills.length / totalSkills) * 100)));

  return {
    jobTitle: extractJobTitle(jobText, matchedCareer.title),
    companyName: extractCompanyName(jobText),
    detectedDomain: matchedCareer.domain,
    matchScore,
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : [matchedCareer.skills[0]?.name || 'Communication'],
    missingSkills: missingSkills.length > 0 ? missingSkills : [matchedCareer.skills[1]?.name || 'Advanced Analysis'],
    summary: `Your profile currently matches ${matchScore}% of the requirements for this ${matchedCareer.title} opening. Closing the gaps in ${missingSkills.slice(0, 2).join(' and ')} will bring you to verified hire readiness.`
  };
}

function extractJobTitle(text, fallback) {
  for (const c of ALL_CAREERS) {
    if (text.toLowerCase().includes(c.title.toLowerCase())) return c.title;
  }
  return fallback || 'Target Professional Role';
}

function extractCompanyName(text) {
  const match = text.match(/(?:at|company:?|employer:?)\s+([A-Z][A-Za-z0-9\s]{2,20})/i);
  return match ? match[1].trim() : 'Hiring Organization';
}

/**
 * Profession-Aware Project & Evidence Generator
 * Produces tangible casework, design systems, clinical audits, or code repositories.
 */
export function generateProjects(missingSkills = ['Machine Learning', 'Deep Learning', 'Statistics'], targetCareerId = 'software-engineer') {
  const profile = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES['software-engineer'] || Object.values(CAREER_PROFILES)[0];

  return missingSkills.slice(0, 4).map((skill, idx) => ({
    title: `${profile.evidenceType?.split('&')?.[0]?.trim() || 'Applied Artifact'}: ${skill}`,
    difficulty: idx === 0 ? 'Intermediate' : 'Advanced',
    estimatedTime: `${6 + (idx * 3)}-${10 + (idx * 3)} Hours`,
    skillsPracticed: [skill, ...(profile.skills.slice(0, 2).map(s => s.name))],
    description: `Construct a rigorous ${profile.evidenceType} demonstrating practical capability in ${skill} tailored for institutional evaluation in ${profile.title}.`,
    impact: 'High Portfolio Relevance',
    evidenceType: profile.evidenceType
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC API CLIENTS (Connected to Node Express backend & Gemini endpoints)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchSkillGapAI(profile, career, assessment = {}) {
  try {
    return await apiPost('/ai/skill-gap', { profile, career, assessment });
  } catch (err) {
    console.warn('[aiService] Backend /ai/skill-gap unavailable, falling back to local engine:', err.message);
    return analyzeSkills(profile?.skills || [], career, assessment);
  }
}

export async function fetchCareerMatchAI(profile) {
  try {
    return await apiPost('/ai/career-match', { profile });
  } catch (err) {
    console.warn('[aiService] Backend /ai/career-match unavailable:', err.message);
    throw err;
  }
}

export async function fetchRoadmapAI(career, profile, skillGap) {
  try {
    return await apiPost('/roadmap', { career, profile, skillGap });
  } catch (err) {
    console.warn('[aiService] Backend /roadmap unavailable, falling back to local engine:', err.message);
    return generateRoadmap(career);
  }
}

export async function fetchJobAnalysisAI(jobDescription, career) {
  try {
    return await apiPost('/job/analyze', { jobDescription, career });
  } catch (err) {
    console.warn('[aiService] Backend /job/analyze unavailable, falling back to local engine:', err.message);
    return analyzeJobDescription(jobDescription);
  }
}

export async function fetchProjectsAI(career, skills, missingSkills, experienceLevel) {
  try {
    return await apiPost('/projects/generate', { career, skills, missingSkills, experienceLevel });
  } catch (err) {
    console.warn('[aiService] Backend /projects/generate unavailable, falling back to local engine:', err.message);
    return { projects: generateProjects(missingSkills, career) };
  }
}

export async function askCareerMentorAI(question) {
  try {
    return await apiPost('/ai/mentor', { question });
  } catch (err) {
    console.warn('[aiService] Backend /ai/mentor unavailable:', err.message);
    throw err;
  }
}

export async function fetchTodaysTasks() {
  try {
    return await apiGet('/roadmap/today');
  } catch (err) {
    console.warn('[aiService] Backend /roadmap/today unavailable:', err.message);
    throw err;
  }
}

export async function completeTaskAPI(taskId) {
  try {
    return await apiPut(`/roadmap/task/${taskId}/complete`);
  } catch (err) {
    console.warn('[aiService] Backend task complete unavailable:', err.message);
    throw err;
  }
}

export async function fetchLeaderboardAPI(career = 'software-engineer') {
  try {
    return await apiGet(`/leaderboard?career=${encodeURIComponent(career)}`);
  } catch (err) {
    console.warn('[aiService] Backend /leaderboard unavailable:', err.message);
    return null;
  }
}

export async function optInLeaderboardAPI(displayHandle, optIn = true) {
  try {
    return await apiPut('/leaderboard/opt-in', { displayHandle, optIn });
  } catch (err) {
    console.warn('[aiService] Backend /leaderboard/opt-in unavailable:', err.message);
    throw err;
  }
}
