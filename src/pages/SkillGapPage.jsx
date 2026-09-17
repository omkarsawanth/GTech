import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Plus, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  Compass, 
  Target 
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialSection, 
  EditorialPanel, 
  EditorialButton, 
  EditorialProgress, 
  EditorialBadge 
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';

export const SkillGapPage = () => {
  const { activeCareerProfile, analysisResult, addSkillsToRoadmap } = useApp();
  const navigate = useNavigate();

  const skillChartData = analysisResult?.skillChartData || (activeCareerProfile?.requiredSkills || []).map(s => ({
    skill: s.name,
    currentLevel: s.baselineLevel || 40,
    requiredLevel: s.requiredLevel || 85,
    gap: Math.max(0, (s.requiredLevel || 85) - (s.baselineLevel || 40)),
    importance: s.importance || 'High'
  }));

  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const selectedSkill = skillChartData[selectedSkillIndex] || skillChartData[0];

  const handleAddGapToRoadmap = (skillName) => {
    addSkillsToRoadmap(skillName);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Header */}
        <EditorialHeader
          index="03"
          tag="SKILL GAP"
          title="WHERE THE DISTANCE IS."
          subtitle={`Interactive analytical breakdown comparing your current evaluated baseline against verified professional benchmarks for ${activeCareerProfile?.title}.`}
        >
          <EditorialButton
            variant="primary"
            size="md"
            onClick={() => navigate('/roadmap')}
            icon={ArrowRight}
          >
            Personalized Roadmap
          </EditorialButton>
        </EditorialHeader>

        {/* Analytical Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 font-mono">
          <div className="p-4 bg-[#0B0D12] border border-[#1E232F]">
            <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">TARGET CAREER</div>
            <div className="text-base sm:text-lg font-bold text-white mt-1 truncate">
              {activeCareerProfile?.title}
            </div>
          </div>

          <div className="p-4 bg-[#0B0D12] border border-[#1E232F]">
            <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">CURRENT READINESS</div>
            <div className="text-2xl font-bold text-gorange mt-0.5">
              {analysisResult?.readinessScore || 64}%
            </div>
          </div>

          <div className="p-4 bg-[#0B0D12] border border-[#1E232F]">
            <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">TOTAL BENCHMARKS</div>
            <div className="text-2xl font-bold text-white mt-0.5">
              {skillChartData.length} Competencies
            </div>
          </div>

          <div className="p-4 bg-[#0B0D12] border border-[#1E232F]">
            <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">EVIDENCE GOAL</div>
            <div className="text-xs font-semibold text-white mt-1 truncate">
              {activeCareerProfile?.evidenceType || 'Casework Artifacts'}
            </div>
          </div>
        </div>

        {/* Master Comparison: Table + Selected Skill Inspection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Full Skills Matrix Table */}
          <div className="lg:col-span-7 space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B7688] pb-3 border-b border-[#1E232F] flex items-center justify-between">
              <span>COMPETENCY EVALUATION</span>
              <span>GAP DELTA</span>
            </div>

            <div className="space-y-2">
              {skillChartData.map((item, idx) => {
                const isSelected = idx === selectedSkillIndex;
                const deficit = Math.max(0, item.requiredLevel - item.currentLevel);

                return (
                  <div
                    key={item.skill}
                    onClick={() => setSelectedSkillIndex(idx)}
                    className={`p-4 border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#10131A] border-gorange text-white'
                        : 'bg-[#0B0D12] border-[#1E232F] text-[#8F9AA9] hover:border-[#2B3242] hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#566173]">0{idx + 1}</span>
                        <span className="font-sans font-semibold text-sm text-white">{item.skill}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#141822] text-[#8F9AA9] border border-[#202736]">
                          {item.importance || 'High'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[11px]">
                        <span>CURRENT {item.currentLevel}%</span>
                        <span className="text-[#566173]">|</span>
                        <span className="text-white">REQ {item.requiredLevel}%</span>
                        <span className="text-[#566173]">|</span>
                        <span className={deficit > 25 ? 'text-gorange font-bold' : 'text-emerald-400 font-bold'}>
                          -{deficit}%
                        </span>
                      </div>
                    </div>

                    {/* Differential Visual Line */}
                    <div className="w-full bg-[#141822] h-1.5 border border-[#1E232F] overflow-hidden">
                      <div
                        className="bg-gorange h-full transition-all duration-300"
                        style={{ width: `${Math.round((item.currentLevel / item.requiredLevel) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Skill Deep-Dive Inspector */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 p-8 bg-[#0B0D12] border border-[#1E232F]">
              <div className="font-mono text-[10px] text-gorange uppercase tracking-widest mb-2">
                [ COMPETENCY DRILLDOWN ]
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {selectedSkill.skill}
              </h2>

              <div className="mt-4 pb-4 border-b border-[#1E232F] font-mono text-xs text-[#8F9AA9] flex items-center justify-between">
                <span>EVALUATED GAP: <strong className="text-gorange font-bold">-{selectedSkill.gap}%</strong></span>
                <span>PRIORITY: <strong className="text-white">{selectedSkill.importance || 'Critical'}</strong></span>
              </div>

              {/* Why it Matters */}
              <div className="my-6">
                <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-1.5">
                  WHY THIS MATTERS
                </div>
                <p className="text-sm text-[#C8CFDB] font-light leading-relaxed">
                  In {activeCareerProfile?.title}, proficiency in {selectedSkill.skill} directly impacts institutional execution, regulatory credibility, and compensation tiers. Closing this {selectedSkill.gap}% delta elevates your competitive percentile.
                </p>
              </div>

              {/* Benchmark comparison bar */}
              <div className="my-6 p-4 bg-[#08090E] border border-[#161B24]">
                <EditorialProgress
                  current={selectedSkill.currentLevel}
                  target={selectedSkill.requiredLevel}
                  label="EVALUATION PROGRESS"
                  showValues
                />
              </div>

              {/* Notification when added to roadmap */}
              {addedNotice && (
                <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Added {selectedSkill.skill} module directly to your active roadmap.</span>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-[#1E232F] flex flex-col gap-3">
                <EditorialButton
                  variant="primary"
                  size="md"
                  onClick={() => handleAddGapToRoadmap(selectedSkill.skill)}
                  icon={Plus}
                >
                  Add Gap Fix to Roadmap
                </EditorialButton>

                <EditorialButton
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/roadmap')}
                >
                  View Active Roadmap
                </EditorialButton>
              </div>

            </div>
          </div>

        </div>

      </EditorialShell>
    </AppLayout>
  );
};
