import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Sparkles, 
  Clock, 
  Plus, 
  CheckCircle2, 
  FolderGit2, 
  ArrowRight,
  BadgeAlert
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { generateProjects, fetchProjectsAI } from '../services/aiService';

export const ProjectGeneratorPage = () => {
  const { analysisResult, addSkillsToRoadmap, user, backendAvailable } = useApp();
  const navigate = useNavigate();

  const criticalSkills = (analysisResult?.criticalGaps || []).map(g => g.skill);
  const missingSkillList = criticalSkills.length > 0 ? criticalSkills : ['Machine Learning', 'Deep Learning', 'Statistics', 'LLMs'];

  const [projects, setProjects] = useState([]);
  const [addedSkills, setAddedSkills] = useState({});

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        if (backendAvailable) {
          const res = await fetchProjectsAI(user?.targetCareer || 'ai-engineer', user?.skills || [], missingSkillList, user?.experienceLevel || 'Entry-Level');
          setProjects(res?.projects || res || []);
        } else {
          const projs = await generateProjects(missingSkillList);
          setProjects(projs);
        }
      } catch (err) {
        console.warn('Backend project generation failed, using local generator:', err);
        const projs = await generateProjects(missingSkillList);
        setProjects(projs);
      }
    };
    fetchProjectsData();
  }, [backendAvailable]);

  const handleAddProject = async (projTitle, skillsPracticed) => {
    const targetSkill = skillsPracticed[0] || 'Machine Learning';
    await addSkillsToRoadmap(targetSkill);
    setAddedSkills(prev => ({ ...prev, [projTitle]: true }));
    setTimeout(() => {
      navigate('/roadmap');
    }, 800);
  };

  return (
    <AppLayout>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <FolderGit2 className="w-3.5 h-3.5" /> AI Portfolio Project Generator
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Hands-On Portfolio Projects
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build resume-boosting projects tailored specifically to close your target skill gaps.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => navigate('/roadmap')}
          icon={ArrowRight}
          iconPosition="right"
        >
          View Active Roadmap
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => {
          const isAdded = addedSkills[proj.title];
          return (
            <Card key={idx} hover className="p-6 flex flex-col justify-between border-purple-500/20">
              <div>
                {/* Header pills */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="purple" size="sm">
                    {proj.difficulty}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> {proj.estimatedTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {proj.title}
                </h3>
                
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Skills practiced */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Skills Practiced:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skillsPracticed?.map((sk) => (
                      <span key={sk} className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-cyan-300 border border-slate-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400">{proj.impact}</span>
                <Button
                  variant={isAdded ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => handleAddProject(proj.title, proj.skillsPracticed)}
                  icon={isAdded ? CheckCircle2 : Plus}
                >
                  {isAdded ? 'Added to Roadmap!' : 'Add to Roadmap'}
                </Button>
              </div>

            </Card>
          );
        })}
      </div>

    </AppLayout>
  );
};
