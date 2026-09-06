/**
 * AI Service for GTech Platform
 * Modular service architecture structured for direct integration with Gemini API.
 */

export const CAREER_PROFILES = {
  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    description: 'Build intelligent applications using machine learning, LLMs, neural networks, and modern AI pipelines.',
    difficulty: 'Advanced',
    iconName: 'Cpu',
    avgSalary: '$135,000 - $180,000',
    requiredSkills: [
      { name: 'Python', requiredLevel: 90, importance: 'Critical' },
      { name: 'Machine Learning', requiredLevel: 85, importance: 'Critical' },
      { name: 'Deep Learning', requiredLevel: 80, importance: 'Critical' },
      { name: 'TensorFlow / PyTorch', requiredLevel: 80, importance: 'Critical' },
      { name: 'LLMs & RAG', requiredLevel: 85, importance: 'High' },
      { name: 'APIs & Microservices', requiredLevel: 75, importance: 'Medium' },
      { name: 'Statistics & Math', requiredLevel: 75, importance: 'High' },
      { name: 'NumPy & Pandas', requiredLevel: 85, importance: 'High' },
      { name: 'SQL & Vector DBs', requiredLevel: 70, importance: 'Medium' },
      { name: 'Git & MLOps', requiredLevel: 70, importance: 'Medium' }
    ]
  },
  'ml-engineer': {
    id: 'ml-engineer',
    title: 'ML Engineer',
    category: 'Machine Learning',
    description: 'Design, build, and deploy production-ready machine learning models and automated data pipelines.',
    difficulty: 'Advanced',
    iconName: 'BrainCircuit',
    avgSalary: '$130,000 - $175,000',
    requiredSkills: [
      { name: 'Python', requiredLevel: 90, importance: 'Critical' },
      { name: 'Machine Learning', requiredLevel: 90, importance: 'Critical' },
      { name: 'Scikit-Learn', requiredLevel: 85, importance: 'High' },
      { name: 'Statistics', requiredLevel: 80, importance: 'High' },
      { name: 'NumPy & Pandas', requiredLevel: 85, importance: 'High' },
      { name: 'MLOps & Docker', requiredLevel: 75, importance: 'Critical' },
      { name: 'SQL', requiredLevel: 75, importance: 'Medium' },
      { name: 'Git', requiredLevel: 75, importance: 'Medium' }
    ]
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Extract actionable insights from complex datasets using statistical modeling and machine learning.',
    difficulty: 'Intermediate-Advanced',
    iconName: 'BarChart3',
    avgSalary: '$120,000 - $160,000',
    requiredSkills: [
      { name: 'Python', requiredLevel: 85, importance: 'Critical' },
      { name: 'Statistics & Math', requiredLevel: 90, importance: 'Critical' },
      { name: 'SQL', requiredLevel: 85, importance: 'Critical' },
      { name: 'Data Visualization', requiredLevel: 80, importance: 'High' },
      { name: 'Machine Learning', requiredLevel: 75, importance: 'High' },
      { name: 'Data Wrangling', requiredLevel: 85, importance: 'Critical' }
    ]
  },
  'fullstack-developer': {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Full Stack Engineering',
    description: 'Build complete web applications spanning front-end UI, REST APIs, backend microservices, and databases.',
    difficulty: 'Intermediate',
    iconName: 'Code2',
    avgSalary: '$115,000 - $155,000',
    requiredSkills: [
      { name: 'JavaScript / TypeScript', requiredLevel: 90, importance: 'Critical' },
      { name: 'React / Next.js', requiredLevel: 85, importance: 'Critical' },
      { name: 'Node.js / Express', requiredLevel: 85, importance: 'Critical' },
      { name: 'SQL & PostgreSQL', requiredLevel: 80, importance: 'High' },
      { name: 'Git & CI/CD', requiredLevel: 80, importance: 'High' },
      { name: 'REST & GraphQL APIs', requiredLevel: 80, importance: 'High' }
    ]
  },
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Development',
    description: 'Develop scalable web applications, algorithms, robust APIs, and modern system architectures.',
    difficulty: 'Intermediate',
    iconName: 'Code2',
    avgSalary: '$110,000 - $150,000',
    requiredSkills: [
      { name: 'Data Structures & Algorithms', requiredLevel: 90, importance: 'Critical' },
      { name: 'Python / Java / JS', requiredLevel: 85, importance: 'Critical' },
      { name: 'System Design', requiredLevel: 75, importance: 'High' },
      { name: 'SQL & NoSQL', requiredLevel: 80, importance: 'High' },
      { name: 'Git', requiredLevel: 85, importance: 'Critical' },
      { name: 'REST APIs', requiredLevel: 80, importance: 'High' }
    ]
  },
  'cybersecurity-engineer': {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Security',
    description: 'Protect critical infrastructure, perform vulnerability assessments, and secure cloud ecosystems.',
    difficulty: 'Advanced',
    iconName: 'ShieldCheck',
    avgSalary: '$125,000 - $165,000',
    requiredSkills: [
      { name: 'Network Security', requiredLevel: 90, importance: 'Critical' },
      { name: 'Linux Administration', requiredLevel: 85, importance: 'Critical' },
      { name: 'Ethical Hacking', requiredLevel: 80, importance: 'High' },
      { name: 'Cryptography', requiredLevel: 75, importance: 'High' },
      { name: 'Python / Scripting', requiredLevel: 75, importance: 'Medium' }
    ]
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Infrastructure',
    description: 'Architect, automate, and deploy cloud solutions on AWS, Azure, or Google Cloud Platform.',
    difficulty: 'Intermediate-Advanced',
    iconName: 'Cloud',
    avgSalary: '$120,000 - $165,000',
    requiredSkills: [
      { name: 'AWS / GCP / Azure', requiredLevel: 85, importance: 'Critical' },
      { name: 'Docker & Kubernetes', requiredLevel: 85, importance: 'Critical' },
      { name: 'Terraform & IaC', requiredLevel: 75, importance: 'High' },
      { name: 'CI/CD Pipelines', requiredLevel: 80, importance: 'High' },
      { name: 'Linux', requiredLevel: 80, importance: 'High' }
    ]
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Business Intelligence',
    description: 'Translate raw business metrics into intuitive dashboards, reports, and strategic insights.',
    difficulty: 'Beginner-Intermediate',
    iconName: 'LineChart',
    avgSalary: '$85,000 - $115,000',
    requiredSkills: [
      { name: 'SQL', requiredLevel: 90, importance: 'Critical' },
      { name: 'Excel / Spreadsheets', requiredLevel: 85, importance: 'High' },
      { name: 'Tableau / PowerBI', requiredLevel: 85, importance: 'Critical' },
      { name: 'Python for Analysis', requiredLevel: 70, importance: 'Medium' },
      { name: 'Statistics', requiredLevel: 75, importance: 'High' }
    ]
  }
};

/**
 * Synchronous Skill Analysis Engine
 */
export function analyzeSkills(userSkills = [], targetCareerId = 'ai-engineer', assessmentAnswers = {}) {
  const profile = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES['ai-engineer'];
  
  const userSkillMap = {};
  (userSkills || []).forEach(s => {
    if (s) userSkillMap[String(s).toLowerCase().trim()] = true;
  });

  const skillChartData = profile.requiredSkills.map(req => {
    const key = req.name.toLowerCase();
    let currentLevel = 15;

    if (userSkillMap[key] || (userSkills || []).some(u => u && req.name.toLowerCase().includes(String(u).toLowerCase()))) {
      currentLevel = 60;
    }

    if (key.includes('python') && userSkillMap['python']) currentLevel = Math.max(currentLevel, 85);
    if (key.includes('javascript') && userSkillMap['javascript']) currentLevel = Math.max(currentLevel, 85);
    if (key.includes('react') && userSkillMap['react']) currentLevel = Math.max(currentLevel, 80);
    if (key.includes('java') && userSkillMap['java']) currentLevel = Math.max(currentLevel, 75);
    if (key.includes('sql') && userSkillMap['sql']) currentLevel = Math.max(currentLevel, 70);
    if (key.includes('git') && userSkillMap['git']) currentLevel = Math.max(currentLevel, 75);
    if (key.includes('machine learning') && userSkillMap['machine learning']) currentLevel = Math.max(currentLevel, 50);

    if (assessmentAnswers['q_python'] && key.includes('python')) {
      const valMap = { 'Beginner': 30, 'Basic': 55, 'Intermediate': 80, 'Advanced': 95 };
      currentLevel = valMap[assessmentAnswers['q_python']] || currentLevel;
    }
    if (assessmentAnswers['q_ml'] && key.includes('machine learning')) {
      const valMap = { 'Beginner': 20, 'Basic': 40, 'Intermediate': 70, 'Advanced': 90 };
      currentLevel = valMap[assessmentAnswers['q_ml']] || currentLevel;
    }
    if (assessmentAnswers['q_stats'] && key.includes('statistic')) {
      const valMap = { 'Beginner': 25, 'Basic': 45, 'Intermediate': 75, 'Advanced': 90 };
      currentLevel = valMap[assessmentAnswers['q_stats']] || currentLevel;
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

  const totalRequired = skillChartData.reduce((acc, item) => acc + item.requiredLevel, 0);
  const totalCurrent = skillChartData.reduce((acc, item) => acc + Math.min(item.currentLevel, item.requiredLevel), 0);
  const readinessScore = Math.round((totalCurrent / totalRequired) * 100) || 72;

  const strongSkills = skillChartData.filter(s => s.currentLevel >= 70);
  const developingSkills = skillChartData.filter(s => s.currentLevel >= 35 && s.currentLevel < 70);
  const criticalGaps = skillChartData.filter(s => s.currentLevel < 35 || s.gap >= 40);

  const topGap = criticalGaps[0] || developingSkills[0] || { skill: 'Machine Learning' };
  const nextBestMove = {
    title: `Master ${topGap.skill} Fundamentals`,
    skill: topGap.skill,
    reason: `${topGap.skill} represents your single largest leverage gap for the ${profile.title} role. Closing this gap will boost your overall readiness by up to 18%.`,
    estimatedTime: '2-3 Weeks',
    actionText: 'Start Learning Module'
  };

  return {
    careerTitle: profile.title,
    readinessScore,
    skillsMasteredCount: strongSkills.length,
    totalSkillsCount: profile.requiredSkills.length,
    criticalGapsCount: criticalGaps.length,
    roadmapProgress: 38,
    skillChartData,
    strongSkills,
    developingSkills,
    criticalGaps,
    nextBestMove
  };
}

/**
 * Synchronous Roadmap Generator
 */
export function generateRoadmap(targetCareerId = 'ai-engineer', customSkillsToAdd = []) {
  const profile = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES['ai-engineer'];

  const baseRoadmap = [
    {
      id: 'step-1',
      stageNumber: '01',
      title: 'Python for Data Science & AI',
      description: 'Master advanced Python techniques, OOP principles, virtual environments, async processing, and data handling libraries.',
      duration: '2 Weeks',
      difficulty: 'Beginner',
      status: 'Completed',
      progress: 100,
      skills: ['Python', 'Data Structures', 'OOP'],
      resources: [
        { title: 'Python 3 Deep Dive Guide', url: 'https://docs.python.org/3/', type: 'Docs' },
        { title: 'Core Python Data Structures Masterclass', url: 'https://realpython.com/', type: 'Course' }
      ],
      project: {
        title: 'CLI Data Processing Utility',
        description: 'Build a high-performance command line tool to parse and transform large datasets.'
      }
    },
    {
      id: 'step-2',
      stageNumber: '02',
      title: 'NumPy & Pandas Data Manipulation',
      description: 'Clean, filter, aggregate, and analyze multi-dimensional matrix operations and complex tabular data.',
      duration: '2 Weeks',
      difficulty: 'Intermediate',
      status: 'Completed',
      progress: 100,
      skills: ['NumPy', 'Pandas', 'Data Wrangling'],
      resources: [
        { title: 'Pandas Cookbook & Tutorials', url: 'https://pandas.pydata.org/docs/', type: 'Guide' },
        { title: 'Exploratory Data Analysis in Python', url: 'https://numpy.org/doc/', type: 'Interactive' }
      ],
      project: {
        title: 'Exploratory Data Analysis Dashboard',
        description: 'Perform complete EDA on real-world financial/user datasets with clean visual summaries.'
      }
    },
    {
      id: 'step-3',
      stageNumber: '03',
      title: 'Statistics & Mathematical Foundations',
      description: 'Learn descriptive & inferential statistics, probability distributions, linear algebra basics, and hypothesis testing.',
      duration: '3 Weeks',
      difficulty: 'Intermediate',
      status: 'In Progress',
      progress: 50,
      skills: ['Statistics', 'Probability', 'Linear Algebra'],
      resources: [
        { title: 'Khan Academy Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra', type: 'Course' },
        { title: 'Statistical Inference for Data Science', url: 'https://www.scipy.org/', type: 'Book' }
      ],
      project: {
        title: 'A/B Testing Statistical Calculator',
        description: 'Build a statistical engine that calculates confidence intervals and p-values for experimental results.'
      }
    },
    {
      id: 'step-4',
      stageNumber: '04',
      title: 'Machine Learning Fundamentals',
      description: 'Implement supervised and unsupervised learning algorithms using Scikit-Learn: Regression, Classification, Clustering, and Evaluation metrics.',
      duration: '4 Weeks',
      difficulty: 'Intermediate-Advanced',
      status: 'Locked',
      progress: 0,
      skills: ['Machine Learning', 'Scikit-Learn', 'Feature Engineering'],
      resources: [
        { title: 'Hands-On Machine Learning (O\'Reilly)', url: 'https://scikit-learn.org/stable/', type: 'Book' },
        { title: 'Scikit-Learn Official User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Docs' }
      ],
      project: {
        title: 'Student Performance Prediction Model',
        description: 'Build and deploy a machine learning regression model that predicts academic success based on study metrics.'
      }
    },
    {
      id: 'step-5',
      stageNumber: '05',
      title: 'Deep Learning & Neural Networks',
      description: 'Understand backpropagation, activation functions, CNNs, RNNs, and framework implementations in PyTorch and TensorFlow.',
      duration: '4 Weeks',
      difficulty: 'Advanced',
      status: 'Locked',
      progress: 0,
      skills: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Neural Nets'],
      resources: [
        { title: 'Fast.ai Practical Deep Learning', url: 'https://www.fast.ai/', type: 'Course' },
        { title: 'PyTorch Tutorials & Documentation', url: 'https://pytorch.org/tutorials/', type: 'Course' }
      ],
      project: {
        title: 'Image Classification System',
        description: 'Train a Convolutional Neural Network (CNN) to classify complex medical/satellite image assets.'
      }
    },
    {
      id: 'step-6',
      stageNumber: '06',
      title: 'Large Language Models (LLMs) & RAG Applications',
      description: 'Leverage modern Generative AI, embeddings, vector databases (Chroma/Pinecone), prompt engineering, and LangChain/LlamaIndex frameworks.',
      duration: '3 Weeks',
      difficulty: 'Advanced',
      status: 'Locked',
      progress: 0,
      skills: ['LLMs', 'RAG', 'Vector DBs', 'LangChain'],
      resources: [
        { title: 'Building Applications with LLMs', url: 'https://python.langchain.com/', type: 'Guide' },
        { title: 'Pinecone Vector Database Masterclass', url: 'https://www.pinecone.io/learn/', type: 'Docs' }
      ],
      project: {
        title: 'GTech AI Document Assistant (RAG)',
        description: 'Build an interactive Retrieval-Augmented Generation assistant that answers questions over custom PDF domain knowledge bases.'
      }
    }
  ];

  if (customSkillsToAdd && customSkillsToAdd.length > 0) {
    customSkillsToAdd.forEach((skillName, idx) => {
      baseRoadmap.push({
        id: `custom-step-${Date.now()}-${idx}`,
        stageNumber: `0${baseRoadmap.length + 1}`,
        title: `Target Skill Specialization: ${skillName}`,
        description: `Dedicated learning track added directly from job description analysis for ${skillName}.`,
        duration: '2 Weeks',
        difficulty: 'High Priority',
        status: 'Locked',
        progress: 0,
        skills: [skillName],
        resources: [
          { title: `${skillName} Fast-Track Guide`, url: 'https://developer.mozilla.org/', type: 'Tutorial' },
          { title: `Industry Standard ${skillName} Best Practices`, url: 'https://github.com/', type: 'Docs' }
        ],
        project: {
          title: `Real-World ${skillName} Implementation`,
          description: `Construct an end-to-end practical project demonstrating mastery in ${skillName}.`
        }
      });
    });
  }

  let globalDayCounter = 1;
  const allTasks = [];

  baseRoadmap.forEach((milestone, milestoneIndex) => {
    const taskCount = milestone.skills.length > 0 ? milestone.skills.length : 3;
    for (let taskIndex = 0; taskIndex < taskCount; taskIndex++) {
      allTasks.push({
        id: `task-${milestoneIndex}-${taskIndex}`,
        milestoneId: milestone.id,
        dayNumber: globalDayCounter++,
        title: `${milestone.skills[0] || milestone.title} - Day ${taskIndex + 1}`,
        description: `Study and practice ${milestone.skills[taskIndex % milestone.skills.length] || milestone.title} concepts`,
        durationMinutes: 20,
        resourceUrl: milestone.resources?.[0]?.url || 'https://developer.mozilla.org/',
        resourceTitle: milestone.resources?.[0]?.title || 'Learning Resource',
        status: globalDayCounter === 2 ? 'unlocked' : 'locked', // first one unlocked, globalDayCounter was incremented
        completedAt: null
      });
    }
  });

  return { roadmap: baseRoadmap, tasks: allTasks };
}

/**
 * Synchronous Job Description Parser
 */
export function analyzeJobDescription(jobText = '', userSkills = []) {
  if (!jobText || jobText.trim().length < 15) {
    throw new Error('Please enter a comprehensive job description to analyze.');
  }

  const sampleKeywords = [
    'Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 
    'SQL', 'Git', 'Statistics', 'RAG', 'LLMs', 'Vector Databases', 'Docker', 
    'Kubernetes', 'AWS', 'Pandas', 'NumPy', 'Scikit-Learn', 'REST APIs', 
    'System Design', 'MLOps', 'Tableau', 'PowerBI', 'Communication', 'React', 'Node.js'
  ];

  const lowerJobText = jobText.toLowerCase();

  const requiredSkillsFound = sampleKeywords.filter(kw => {
    return lowerJobText.includes(kw.toLowerCase());
  });

  const requiredList = requiredSkillsFound.length >= 3 ? requiredSkillsFound : ['Python', 'Machine Learning', 'Statistics', 'Deep Learning', 'PyTorch', 'SQL', 'Git', 'LLMs'];

  const userSkillUpper = (userSkills || []).map(s => String(s).toUpperCase());

  const matchingSkills = requiredList.filter(req => 
    userSkillUpper.includes(req.toUpperCase()) ||
    (userSkills || []).some(u => u && (String(u).toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(String(u).toLowerCase())))
  );

  const missingSkills = requiredList.filter(req => !matchingSkills.includes(req));

  const totalReq = requiredList.length || 1;
  const matchCount = matchingSkills.length;
  const readinessScore = Math.min(95, Math.max(35, Math.round((matchCount / totalReq) * 100) + 15));

  const skillGapImpact = missingSkills.map(skill => {
    let priority = 'Medium';
    if (['Machine Learning', 'Deep Learning', 'Python', 'PyTorch', 'Statistics', 'LLMs'].includes(skill)) {
      priority = 'High Impact';
    }
    return {
      skill,
      priority,
      impactReason: `Appears in requirements. Essential for technical interviews.`
    };
  });

  return {
    jobTitle: extractJobTitle(jobText),
    companyName: extractCompanyName(jobText),
    readinessScore,
    requiredSkillsCount: requiredList.length,
    matchingSkills,
    missingSkills,
    skillGapImpact,
    summary: `You are a ${readinessScore >= 75 ? 'Strong' : readinessScore >= 55 ? 'Moderate' : 'Developing'} match for this role. Adding ${missingSkills.slice(0, 3).join(', ')} to your learning plan will significantly boost your callback probability.`
  };
}

function extractJobTitle(text) {
  const titles = ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Full Stack Developer', 'Software Engineer', 'Cloud Architect', 'Data Analyst', 'Backend Developer'];
  for (const t of titles) {
    if (text.toLowerCase().includes(t.toLowerCase())) return t;
  }
  return 'Target Tech Role';
}

function extractCompanyName(text) {
  const match = text.match(/(?:at|company:?)\s+([A-Z][A-Za-z0-9\s]{2,15})/i);
  return match ? match[1].trim() : 'Tech Corporation';
}

/**
 * Synchronous Project Recommendation Generator
 */
export function generateProjects(missingSkills = ['Machine Learning', 'Deep Learning', 'Statistics', 'LLMs']) {
  const projectDatabase = {
    'Machine Learning': {
      title: 'Student Academic Performance Prediction Engine',
      difficulty: 'Intermediate',
      estimatedTime: '8-10 Hours',
      skillsPracticed: ['Python', 'Scikit-Learn', 'Feature Engineering', 'EDA'],
      description: 'Build an end-to-end machine learning pipeline that ingests student demographic & study habit data, trains ensemble algorithms (XGBoost/RandomForest), and deploys a prediction endpoint.',
      impact: 'High Resume Relevance'
    },
    'Deep Learning': {
      title: 'Medical Image Classification with PyTorch',
      difficulty: 'Advanced',
      estimatedTime: '12-15 Hours',
      skillsPracticed: ['PyTorch', 'Convolutional Neural Networks', 'Transfer Learning', 'Torchvision'],
      description: 'Fine-tune a ResNet architecture to classify X-ray images with over 94% validation accuracy, complete with confusion matrix visualizations.',
      impact: 'Critical Portfolio Project'
    },
    'Statistics': {
      title: 'A/B Testing & Statistical Inference Workbench',
      difficulty: 'Intermediate',
      estimatedTime: '6-8 Hours',
      skillsPracticed: ['Statistics', 'SciPy', 'Hypothesis Testing', 'Bootstrap Resampling'],
      description: 'Analyze e-commerce conversion rates using standard t-tests, chi-square tests, and Bayesian inference to drive product decisioning.',
      impact: 'Core Industry Skill'
    },
    'LLMs': {
      title: 'Enterprise Document RAG Assistant with LangChain & Pinecone',
      difficulty: 'Advanced',
      estimatedTime: '10-12 Hours',
      skillsPracticed: ['LangChain', 'OpenAI/Gemini APIs', 'Vector Embeddings', 'FastAPI'],
      description: 'Develop a conversational AI application that parses corporate PDF manuals, stores embeddings in Pinecone, and delivers grounded answers with citations.',
      impact: 'Cutting-Edge AI Tech'
    },
    'SQL': {
      title: 'Multi-Tenant E-Commerce Analytics Schema & Queries',
      difficulty: 'Intermediate',
      estimatedTime: '5-7 Hours',
      skillsPracticed: ['PostgreSQL', 'Complex Joins', 'Window Functions', 'Query Optimization'],
      description: 'Design normalized SQL database schemas and construct high-performance window function queries to compute customer cohort retention metrics.',
      impact: 'Fundamental Tech Requirement'
    }
  };

  const results = [];
  (missingSkills || []).forEach(skill => {
    if (projectDatabase[skill]) {
      results.push(projectDatabase[skill]);
    } else {
      results.push({
        title: `Production-Grade ${skill} Implementation Project`,
        difficulty: 'Intermediate',
        estimatedTime: '8-10 Hours',
        skillsPracticed: [skill, 'Git', 'Best Practices'],
        description: `Build a modular full-featured project leveraging ${skill} tailored for your target career portfolio.`,
        impact: 'High Practical Value'
      });
    }
  });

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// ASYNC GTECH BACKEND API CLIENTS (Connected to Node Express + Gemini API)
// ─────────────────────────────────────────────────────────────────────────────
import { apiPost, apiGet, apiPut } from './api';

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
    return { projects: generateProjects(missingSkills) };
  }
}

let globalDayCounter = 1;

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

