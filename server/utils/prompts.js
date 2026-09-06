/**
 * GTech Gemini Prompt Library
 * All prompts are defined here to keep controllers/services clean.
 */

export const PROMPTS = {

  SKILL_GAP: ({ profile, career, assessment }) => `
You are a world-class AI career counselor for GTech, an AI-powered career platform.
Analyze this student's skill gap for their target career.

USER PROFILE:
Name: ${profile.name || 'Student'}
Degree: ${profile.degree || 'Not specified'}
Major: ${profile.major || 'Not specified'}
Experience Level: ${profile.experienceLevel || 'Entry-Level'}
Current Skills: ${(profile.skills || []).join(', ') || 'None listed'}

TARGET CAREER: ${career || 'Software Engineer'}

ASSESSMENT RESULTS:
${assessment ? JSON.stringify(assessment, null, 2) : 'Not completed'}

Return ONLY a valid JSON object with this exact structure:
{
  "readinessScore": <number 0-100>,
  "summary": "<2-3 sentence personalized summary>",
  "currentSkills": [<list of skills the user already has that are relevant>],
  "requiredSkills": [<all skills required for target career>],
  "missingSkills": [
    {
      "name": "<skill name>",
      "severity": "<Critical|High|Medium|Low>",
      "importance": "<Critical|High|Medium>",
      "reason": "<why this skill matters for the career>",
      "recommendedAction": "<specific action to gain this skill>",
      "estimatedWeeks": <number>
    }
  ],
  "recommendations": [
    {
      "priority": <1-5>,
      "action": "<specific recommendation>",
      "impact": "<what this will improve>"
    }
  ],
  "nextBestMove": {
    "title": "<actionable title>",
    "skill": "<skill to focus on>",
    "reason": "<why this is the highest leverage move>",
    "estimatedTime": "<X-Y Weeks>"
  }
}
`,

  CAREER_MATCH: ({ profile }) => `
You are a GTech AI career advisor. Analyze this user's profile and rank the best-fitting tech careers.

USER PROFILE:
Name: ${profile.name || 'Student'}
Degree: ${profile.degree || 'Not specified'}
Major: ${profile.major || 'Not specified'}
Experience Level: ${profile.experienceLevel || 'Entry-Level'}
Current Skills: ${(profile.skills || []).join(', ') || 'None listed'}

Rank these careers by fit:
AI Engineer, ML Engineer, Data Scientist, Data Analyst, Software Engineer, Cloud Engineer, Cybersecurity Engineer, Full Stack Developer

Return ONLY valid JSON:
{
  "careerMatches": [
    {
      "career": "<career title>",
      "matchScore": <0-100>,
      "whyItMatches": "<personalized explanation>",
      "strengths": ["<strength1>", "<strength2>"],
      "skillGaps": ["<gap1>", "<gap2>"],
      "recommendation": "<specific next step>"
    }
  ]
}
`,

  ROADMAP: ({ career, profile, skillGap }) => `
You are a GTech AI roadmap generator. Create a personalized learning roadmap.

USER PROFILE:
Name: \${profile.name || 'Student'}
Experience: \${profile.experienceLevel || 'Entry-Level'}
Current Skills: \${(profile.skills || []).join(', ') || 'None listed'}

TARGET CAREER: \${career || 'Software Engineer'}

SKILL GAPS TO ADDRESS:
\${skillGap ? JSON.stringify(skillGap.missingSkills?.slice(0, 5), null, 2) : 'General skill development needed'}

Return ONLY valid JSON with both milestones AND daily tasks:
{
  "roadmap": [
    {
      "id": "step-1",
      "stageNumber": "01",
      "title": "<milestone title>",
      "description": "<detailed description>",
      "duration": "<X Weeks>",
      "difficulty": "<Beginner|Intermediate|Advanced>",
      "status": "<completed|in-progress|locked>",
      "progress": <0-100>,
      "skills": ["<skill1>", "<skill2>"],
      "resources": [
        { "title": "<resource title>", "url": "<real URL>", "type": "<Course|Docs|Book|Guide>" }
      ],
      "project": {
        "title": "<project title>",
        "description": "<project description>"
      }
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "milestoneId": "step-1",
      "dayNumber": 1,
      "title": "<concise task title>",
      "description": "<what to do in 15-30 min>",
      "durationMinutes": <15-30>,
      "resourceUrl": "<real URL to a free learning resource>",
      "resourceTitle": "<resource name>"
    }
  ]
}

- Generate 6-8 milestones ordered from foundation to advanced. First 1-2 should be completed/in-progress based on user's existing skills.
- Create 5-8 small daily tasks per milestone, each 15-30 minutes.
- Tasks should be sequential learning steps within each milestone.
- Each task has exactly one resource link (real URLs to free resources).
- dayNumber should be globally sequential across all milestones (1, 2, 3, ... up to total).
- Generate 30-50 total tasks across all milestones.
`,

  JOB_ANALYSIS: ({ jobDescription, profile, career }) => `
You are a GTech AI job description analyzer. Analyze this job posting against the user's profile.

JOB DESCRIPTION:
${jobDescription}

USER PROFILE:
Experience: ${profile.experienceLevel || 'Entry-Level'}
Current Skills: ${(profile.skills || []).join(', ') || 'None listed'}
Target Career: ${career || 'Software Engineer'}

Return ONLY valid JSON:
{
  "jobTitle": "<extracted job title>",
  "company": "<extracted company name or 'Not specified'>",
  "readinessScore": <0-100>,
  "requiredSkills": ["<skill1>", "<skill2>"],
  "matchingSkills": ["<skills user has>"],
  "missingSkills": [
    {
      "name": "<skill>",
      "priority": "<High|Medium|Low>",
      "reason": "<why it matters>"
    }
  ],
  "experienceGaps": ["<gap1>", "<gap2>"],
  "recommendations": ["<rec1>", "<rec2>", "<rec3>"],
  "jobSpecificRoadmap": [
    {
      "week": "<Week 1-2>",
      "focus": "<what to learn>",
      "resource": "<specific resource>"
    }
  ],
  "summary": "<2-3 sentence personalized assessment>"
}
`,

  PROJECTS: ({ career, skills, missingSkills, experienceLevel }) => `
You are a GTech AI project generator. Suggest portfolio projects for this developer.

TARGET CAREER: ${career || 'Software Engineer'}
EXPERIENCE LEVEL: ${experienceLevel || 'Entry-Level'}
CURRENT SKILLS: ${(skills || []).join(', ') || 'None listed'}
SKILLS TO PRACTICE: ${(missingSkills || []).join(', ') || 'General skills'}

Return ONLY valid JSON:
{
  "projects": [
    {
      "id": "proj-1",
      "title": "<project title>",
      "description": "<detailed description>",
      "difficulty": "<Beginner|Intermediate|Advanced>",
      "duration": "<X-Y Hours>",
      "skills": ["<skill1>", "<skill2>"],
      "technology": ["<tech1>", "<tech2>"],
      "learningOutcomes": ["<outcome1>", "<outcome2>"],
      "impact": "<resume/portfolio impact>",
      "milestones": [
        { "step": 1, "title": "<milestone>", "description": "<details>" }
      ]
    }
  ]
}

Generate 3-4 projects ranging from beginner-friendly to advanced.
`,

  ASSESSMENT_ANALYSIS: ({ answers, career }) => `
You are a GTech AI assessment analyzer. Evaluate these assessment answers.

TARGET CAREER: ${career || 'Software Engineer'}
ASSESSMENT ANSWERS:
${JSON.stringify(answers, null, 2)}

Return ONLY valid JSON:
{
  "technicalScore": <0-100>,
  "problemSolvingScore": <0-100>,
  "knowledgeScore": <0-100>,
  "softSkillScore": <0-100>,
  "overallScore": <0-100>,
  "strengths": ["<strength1>", "<strength2>"],
  "weaknesses": ["<weakness1>", "<weakness2>"],
  "recommendedSkills": ["<skill1>", "<skill2>"],
  "summary": "<personalized 2-3 sentence summary>"
}
`,

  MENTOR: ({ question, profile, career, skillGap, roadmap }) => `
You are the GTech AI Career Mentor — a personalized AI advisor with full context about this specific user.

USER CONTEXT:
Name: ${profile?.name || 'Student'}
Target Career: ${career || 'Not set'}
Experience Level: ${profile?.experienceLevel || 'Entry-Level'}
Current Skills: ${(profile?.skills || []).join(', ') || 'Not set'}
Readiness Score: ${skillGap?.readinessScore || 'Not assessed'}%
Top Missing Skills: ${(skillGap?.missingSkills || []).slice(0, 3).map(s => s.name || s).join(', ') || 'Not analyzed'}
Roadmap Progress: ${roadmap ? `${roadmap.filter(s => s.status === 'completed').length}/${roadmap.length} milestones complete` : 'Not started'}

USER'S QUESTION:
"${question}"

Respond as a knowledgeable, encouraging career mentor. Use the user's actual data above to give specific, personalized advice. Keep response under 300 words. Be direct and actionable.
`,
};
