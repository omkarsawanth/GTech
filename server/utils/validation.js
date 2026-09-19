import { z } from 'zod';

// ── Reusable sub-schemas ────────────────────────────────────────────────────

export const MissingSkillSchema = z.object({
  name: z.string(),
  severity: z.enum(['Critical', 'High', 'Medium', 'Low']).optional().default('Medium'),
  importance: z.enum(['Critical', 'High', 'Medium']).optional().default('Medium'),
  reason: z.string().optional().default(''),
  recommendedAction: z.string().optional().default(''),
  estimatedWeeks: z.number().optional().default(2),
});

export const RecommendationSchema = z.object({
  priority: z.number().optional(),
  action: z.string(),
  impact: z.string().optional().default(''),
});

export const ResourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional().default('https://developer.mozilla.org/'),
  type: z.string().optional().default('Guide'),
});

export const MilestoneSchema = z.object({
  id: z.string(),
  stageNumber: z.string().optional(),
  title: z.string(),
  description: z.string(),
  duration: z.string().optional().default('2 Weeks'),
  difficulty: z.string().optional().default('Intermediate'),
  status: z.enum(['completed', 'in-progress', 'locked']).default('locked'),
  progress: z.number().min(0).max(100).default(0),
  skills: z.array(z.string()).default([]),
  resources: z.array(ResourceSchema).default([]),
  project: z.object({
    title: z.string(),
    description: z.string(),
  }).optional(),
});

export const DailyTaskSchema = z.object({
  id: z.string(),
  milestoneId: z.string(),
  dayNumber: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  durationMinutes: z.number().int().min(10).max(60).default(20),
  resourceUrl: z.string().url().optional().default('https://developer.mozilla.org/'),
  resourceTitle: z.string().optional().default('Learning Resource'),
  status: z.enum(['completed', 'unlocked', 'locked']).default('locked'),
  completedAt: z.any().nullable().default(null),
});

// ── Response schemas ────────────────────────────────────────────────────────

export const DailyRoadmapResponseSchema = z.object({
  roadmap: z.array(MilestoneSchema),
  tasks: z.array(DailyTaskSchema),
});

export const SkillGapResponseSchema = z.object({
  readinessScore: z.number().min(0).max(100),
  summary: z.string().optional().default(''),
  currentSkills: z.array(z.string()).default([]),
  requiredSkills: z.array(z.string()).default([]),
  missingSkills: z.array(MissingSkillSchema).default([]),
  recommendations: z.array(RecommendationSchema).default([]),
  nextBestMove: z.object({
    title: z.string(),
    skill: z.string(),
    reason: z.string(),
    estimatedTime: z.string(),
  }).optional(),
});

export const CareerMatchResponseSchema = z.object({
  careerMatches: z.array(z.object({
    career: z.string(),
    matchScore: z.number().min(0).max(100),
    whyItMatches: z.string(),
    strengths: z.array(z.string()).default([]),
    skillGaps: z.array(z.string()).default([]),
    recommendation: z.string(),
  })),
});

export const RoadmapResponseSchema = z.object({
  roadmap: z.array(MilestoneSchema),
});

export const JobAnalysisResponseSchema = z.object({
  jobTitle: z.string().default('Tech Role'),
  company: z.string().default('Not specified'),
  readinessScore: z.number().min(0).max(100),
  requiredSkills: z.array(z.string()).default([]),
  matchingSkills: z.array(z.string()).default([]),
  missingSkills: z.array(z.object({
    name: z.string(),
    priority: z.enum(['High', 'Medium', 'Low']).default('Medium'),
    reason: z.string().optional().default(''),
  })).default([]),
  experienceGaps: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  jobSpecificRoadmap: z.array(z.object({
    week: z.string(),
    focus: z.string(),
    resource: z.string().optional(),
  })).default([]),
  summary: z.string().optional().default(''),
});

export const ProjectsResponseSchema = z.object({
  projects: z.array(z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    difficulty: z.string().default('Intermediate'),
    duration: z.string().default('8-10 Hours'),
    skills: z.array(z.string()).default([]),
    technology: z.array(z.string()).default([]),
    learningOutcomes: z.array(z.string()).default([]),
    impact: z.string().optional().default(''),
    milestones: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })).optional().default([]),
  })),
});

export const AssessmentResponseSchema = z.object({
  technicalScore: z.number().min(0).max(100),
  problemSolvingScore: z.number().min(0).max(100),
  knowledgeScore: z.number().min(0).max(100),
  softSkillScore: z.number().min(0).max(100),
  overallScore: z.number().min(0).max(100),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  recommendedSkills: z.array(z.string()).default([]),
  summary: z.string().optional().default(''),
});

// ── Input validators ────────────────────────────────────────────────────────

export const ProfileInputSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  degree: z.string().max(100).optional(),
  major: z.string().max(100).optional(),
  experienceLevel: z.string().optional(),
  skills: z.array(z.string()).max(50).optional(),
  targetCareer: z.string().optional(),
});

export const SkillGapInputSchema = z.object({
  profile: z.object({
    name: z.string().optional(),
    degree: z.string().optional(),
    major: z.string().optional(),
    experienceLevel: z.string().optional(),
    skills: z.array(z.string()).optional(),
  }),
  career: z.string().min(1, 'Career is required'),
  assessment: z.record(z.any()).optional(),
});

export const CareerMatchInputSchema = z.object({
  profile: z.object({
    name: z.string().optional(),
    degree: z.string().optional(),
    major: z.string().optional(),
    experienceLevel: z.string().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

export const JobAnalysisInputSchema = z.object({
  jobDescription: z.string().min(50, 'Please provide a job description of at least 50 characters'),
});

export const MentorInputSchema = z.object({
  question: z.string().min(5, 'Please ask a question').max(1000),
});

export const RoastResponseSchema = z.object({
  roast: z.string(),
  punchline: z.string().optional().default(''),
  burnRating: z.number().min(1).max(5).default(4),
});

export const RoastInputSchema = z.object({
  skills: z.array(z.string()).optional().default([]),
  targetRole: z.string().min(1, 'Target role is required'),
  missingSkills: z.array(z.string()).optional().default([]),
});

export const CreateSquadInputSchema = z.object({
  name: z.string().min(2, 'Squad name must be at least 2 characters').max(50, 'Squad name must be under 50 characters'),
  careerFocus: z.string().optional().default('Software Engineer'),
});

export const JoinSquadInputSchema = z.object({
  inviteCode: z.string().min(4, 'Invite code is required').max(12),
});

export const AssessmentInputSchema = z.object({
  answers: z.record(z.any()).refine(obj => Object.keys(obj).length > 0, {
    message: 'Assessment answers are required and cannot be empty.',
  }),
  career: z.string().trim().min(1, 'Target career is required').optional().default('software-engineer'),
});

export const LeaderboardQuerySchema = z.object({
  career: z.string().trim().min(1).max(100).optional().default('ai-engineer'),
});

export const LeaderboardOptInSchema = z.object({
  displayHandle: z.string().trim().min(2, 'Handle must be at least 2 characters').max(50, 'Handle cannot exceed 50 characters').optional().nullable(),
  optIn: z.boolean().default(true),
});

export const ProjectGenerationInputSchema = z.object({
  career: z.string().trim().min(1).optional(),
  skills: z.array(z.string()).optional(),
  missingSkills: z.array(z.string()).optional(),
  experienceLevel: z.string().trim().optional(),
});

export const RoadmapGenerationInputSchema = z.object({
  career: z.string().trim().min(1, 'Target career is required'),
  profile: z.record(z.any()).optional().default({}),
  skillGap: z.record(z.any()).optional().nullable(),
});

export const UpdateMilestoneInputSchema = z.object({
  status: z.enum(['Completed', 'In Progress', 'Locked', 'completed', 'in-progress', 'locked']).optional(),
  progress: z.number().min(0).max(100).optional(),
}).refine(data => data.status !== undefined || data.progress !== undefined, {
  message: 'At least status or progress must be provided to update milestone.',
});

