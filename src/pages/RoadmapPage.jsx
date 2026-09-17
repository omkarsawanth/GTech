import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Share2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialPanel, 
  EditorialButton, 
  EditorialProgress, 
  EditorialBadge 
} from '../components/common/EditorialComponents';
import { ShareProgressModal } from '../components/common/ShareProgressModal';
import { useApp } from '../context/AppContext';

export const RoadmapPage = () => {
  const { 
    roadmap, 
    toggleRoadmapStep, 
    activeCareerProfile, 
    dailyTasks, 
    markTaskComplete, 
    currentStreak, 
    user, 
    analysisResult 
  } = useApp();
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [expandedStepId, setExpandedStepId] = useState(roadmap[0]?.id || 'step-1');

  const completedStepsCount = (roadmap || []).filter(r => r.status === 'Completed').length;
  const totalStepsCount = (roadmap || []).length || 1;
  const overallRoadmapPercent = Math.round((completedStepsCount / totalStepsCount) * 100);

  const allTasks = roadmap?.tasks || (dailyTasks?.activeTasks || []).concat(dailyTasks?.previewTasks || []) || [];

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Header */}
        <EditorialHeader
          index="05"
          tag="ROADMAP"
          title="CHRONOLOGICAL CAREER PATHWAY."
          subtitle={`Structured milestone roadmap calibrating your progression toward verified hiring standards for ${activeCareerProfile?.title}.`}
        >
          <EditorialButton
            variant="outline"
            size="md"
            onClick={() => setIsShareModalOpen(true)}
            icon={Share2}
          >
            Share Progress
          </EditorialButton>
          <EditorialButton
            variant="primary"
            size="md"
            onClick={() => navigate('/dashboard')}
          >
            Command Center
          </EditorialButton>
        </EditorialHeader>

        {/* Milestone Sequence Metric Row */}
        <div className="p-6 bg-[#0B0D12] border border-[#1E232F] mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="font-display font-black text-5xl text-white">
              {overallRoadmapPercent}%
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-gorange">
                ROADMAP PROGRESS
              </div>
              <div className="text-sm text-[#8F9AA9] mt-0.5 font-light">
                {completedStepsCount} of {totalStepsCount} Phases Verified
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#8F9AA9]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-400 inline-block" />
              <span>COMPLETED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-gorange inline-block" />
              <span>IN PROGRESS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#2B3242] inline-block" />
              <span>UPCOMING / LOCKED</span>
            </div>
          </div>
        </div>

        {/* EDITORIAL TIMELINE */}
        <div className="space-y-6">
          {(roadmap || []).map((step, index) => {
            const isExpanded = expandedStepId === step.id;
            const isCompleted = step.status === 'Completed';
            const isInProgress = step.status === 'In Progress';
            const isLocked = step.status === 'Locked';

            return (
              <div
                key={step.id}
                className={`border transition-colors ${
                  isExpanded ? 'border-gorange bg-[#0B0D12]' : 'border-[#1E232F] bg-[#08090E] hover:border-[#2B3242]'
                }`}
              >
                {/* Stage Header Line */}
                <div
                  onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                  className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs font-bold text-gorange px-2.5 py-1 bg-[#121620] border border-[#202736]">
                      {step.stageNumber || `0${index + 1}`}
                    </span>
                    
                    <div>
                      <h2 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                        {step.title}
                      </h2>
                      <div className="font-mono text-xs text-[#7F8B9D] mt-1 flex items-center gap-3">
                        <span>DURATION: {step.duration || '2-3 Weeks'}</span>
                        <span>•</span>
                        <span>DIFFICULTY: {step.difficulty || 'Intermediate'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs self-end sm:self-center">
                    <span className={`px-2.5 py-1 uppercase text-[10px] tracking-wider font-bold border ${
                      isCompleted 
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                        : isInProgress
                        ? 'bg-gorange/10 text-gorange border-gorange/40'
                        : 'bg-[#121620] text-[#6B7688] border-[#1E232F]'
                    }`}>
                      {step.status}
                    </span>

                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-[#6B7688]" />}
                  </div>
                </div>

                {/* Expanded Stage Dossier */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 border-t border-[#1E232F] bg-[#07090D]">
                    <p className="text-base text-[#C8CFDB] font-light mt-4 mb-6 leading-relaxed max-w-4xl">
                      {step.description}
                    </p>

                    {/* Competency tags */}
                    <div className="mb-6">
                      <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-2">
                        TARGET COMPETENCIES TESTED
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(step.skills || []).map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-[#10131A] border border-[#1E232F] text-white font-mono text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources & Project Evidence Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                      {/* Curated Resources */}
                      <div className="p-5 bg-[#0B0D12] border border-[#1E232F]">
                        <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-3">
                          RECOMMENDED CURRICULUM SOURCES
                        </div>
                        <div className="space-y-2">
                          {(step.resources || []).map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-[#08090E] border border-[#161B24] hover:border-gorange transition-colors flex items-center justify-between font-mono text-xs group"
                            >
                              <span className="text-[#E4E7EC] group-hover:text-white truncate pr-2">
                                {res.title}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-[#6B7688] group-hover:text-gorange shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Capstone Project / Evidence */}
                      {step.project && (
                        <div className="p-5 bg-[#0B0D12] border border-[#1E232F] flex flex-col justify-between">
                          <div>
                            <div className="font-mono text-[10px] text-gorange uppercase tracking-widest mb-2">
                              VERIFIABLE EVIDENCE ARTIFACT
                            </div>
                            <div className="font-display font-bold text-base text-white">
                              {step.project.title}
                            </div>
                            <p className="text-xs text-[#8F9AA9] mt-2 font-light leading-relaxed">
                              {step.project.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Toggle Completion Control */}
                    <div className="mt-6 pt-6 border-t border-[#1E232F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="font-mono text-xs text-[#7F8B9D]">
                        CURRENT STATUS: <strong className="text-white">{step.status.toUpperCase()}</strong>
                      </div>

                      <EditorialButton
                        variant={isCompleted ? 'outline' : 'primary'}
                        size="md"
                        onClick={() => toggleRoadmapStep(step.id)}
                      >
                        {isCompleted ? 'Mark Phase In Progress' : 'Mark Phase Completed ✓'}
                      </EditorialButton>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </EditorialShell>

      {isShareModalOpen && (
        <ShareProgressModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          currentStreak={currentStreak}
          readinessScore={analysisResult?.readinessScore || 64}
          targetCareer={activeCareerProfile?.title || 'Professional'}
          userName={user?.displayName || 'Builder'}
        />
      )}
    </AppLayout>
  );
};
