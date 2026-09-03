import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Plus, 
  BrainCircuit, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, ProgressBar, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';

export const SkillGapPage = () => {
  const { activeCareerProfile, analysisResult, addSkillsToRoadmap } = useApp();
  const navigate = useNavigate();

  const strongSkills = analysisResult?.strongSkills || [];
  const developingSkills = analysisResult?.developingSkills || [];
  const criticalGaps = analysisResult?.criticalGaps || [];

  const handleAddGapToRoadmap = (skillName) => {
    addSkillsToRoadmap(skillName);
    navigate('/roadmap');
  };

  return (
    <AppLayout>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            <Target className="w-3.5 h-3.5" /> AI Skill Gap Analysis Matrix
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Skill Gaps & Prerequisite Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Categorized breakdown for <span className="text-purple-300 font-semibold">{activeCareerProfile?.title || 'AI Engineer'}</span> based on your assessment results.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => navigate('/roadmap')}
          icon={ArrowUpRight}
          iconPosition="right"
        >
          Go to Personalized Roadmap
        </Button>
      </div>

      {/* SECTION 1: YOUR BIGGEST GAPS (CRITICAL PRIORITIES) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Your Biggest Gaps</h2>
              <p className="text-xs text-slate-400">High-priority skill missing requirements requiring immediate attention</p>
            </div>
          </div>
          <Badge variant="red" size="md font-mono font-bold">{criticalGaps.length} Critical Gaps</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {criticalGaps.map((item) => (
            <Card key={item.skill} hover className="p-5 border-rose-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="red" size="sm">
                    {item.importance || 'Critical'}
                  </Badge>
                  <span className="text-xs font-bold text-rose-400 font-mono">
                    -{item.gap}% Gap
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{item.skill}</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Current level {item.currentLevel}% vs required target {item.requiredLevel}%
                </p>

                <ProgressBar
                  progress={Math.round((item.currentLevel / item.requiredLevel) * 100)}
                  color="rose"
                  showText
                  label="Role Benchmark"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => handleAddGapToRoadmap(item.skill)}
                  icon={Plus}
                >
                  Add to My Roadmap
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 2: DEVELOPING SKILLS */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Developing Skills</h2>
            <p className="text-xs text-slate-400">Moderate proficiency — requires refinement to meet senior target standards</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {developingSkills.map((item) => (
            <Card key={item.skill} hover className="p-5 border-cyan-500/20">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="cyan" size="sm">Developing</Badge>
                <span className="text-xs font-semibold text-cyan-300 font-mono">
                  {item.currentLevel}% / {item.requiredLevel}%
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.skill}</h3>
              <ProgressBar
                progress={Math.round((item.currentLevel / item.requiredLevel) * 100)}
                color="cyan"
                showText
                label="Target Completion"
              />
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 3: STRONG SKILLS */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Strong Skills</h2>
            <p className="text-xs text-slate-400">Verified competencies meeting or exceeding target benchmarks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {strongSkills.map((item) => (
            <Card key={item.skill} hover className="p-5 border-emerald-500/20">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="green" size="sm">Mastered</Badge>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  {item.currentLevel}% Level
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.skill}</h3>
              <ProgressBar
                progress={Math.min(100, Math.round((item.currentLevel / item.requiredLevel) * 100))}
                color="emerald"
                showText
                label="Proficiency"
              />
            </Card>
          ))}
        </div>
      </div>

    </AppLayout>
  );
};
