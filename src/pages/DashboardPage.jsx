import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Lock, 
  Clock, 
  ExternalLink,
  Flame, 
  Snowflake, 
  Share2, 
  Trophy,
  Compass,
  AlertTriangle,
  Play
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
import { ShareProgressModal } from '../components/common/ShareProgressModal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { 
    activeCareerProfile, 
    analysisResult, 
    roadmap,
    dailyTasks, 
    dailyTasksLoading, 
    markTaskComplete,
    currentStreak,
    streakCelebration,
    streakFreezes,
    streakFreezeUsedAlert,
    milestoneUnlocked,
    setMilestoneUnlocked
  } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(0);

  const readinessScore = analysisResult?.readinessScore || 64;
  const skillsMasteredCount = analysisResult?.skillsMasteredCount || 0;
  const totalSkillsCount = analysisResult?.totalSkillsCount || activeCareerProfile?.requiredSkills?.length || 5;
  const criticalGapsCount = analysisResult?.criticalGapsCount || 0;
  const completedPhasesCount = (roadmap || []).filter(r => r.status === 'Completed').length;
  const totalPhasesCount = (roadmap || []).length || 4;

  const skillChartData = analysisResult?.skillChartData || (activeCareerProfile?.requiredSkills || []).map(s => ({
    skill: s.name,
    currentLevel: s.baselineLevel || 40,
    requiredLevel: s.requiredLevel || 85,
    gap: Math.max(0, (s.requiredLevel || 85) - (s.baselineLevel || 40)),
    importance: s.importance || 'High'
  }));

  const nextMove = analysisResult?.nextBestMove || {
    title: `Master ${skillChartData[0]?.skill || 'Core Competency'}`,
    skill: skillChartData[0]?.skill || 'Core Principles',
    reason: `${skillChartData[0]?.skill || 'This competency'} represents your highest leverage gap for the ${activeCareerProfile?.title} path.`,
    badge: 'HIGH LEVERAGE GAP',
    type: activeCareerProfile?.evidenceType || 'Casework Artifact',
    actionText: 'Start Action'
  };

  const activeTasksList = dailyTasks?.activeTasks || [];
  const previewTasksList = dailyTasks?.previewTasks || [];

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Minimal Editorial Streak & Consistency Status Banner */}
        <div className="mb-6 pb-4 border-b border-[#1E232F] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4 text-[#8F9AA9]">
            <div className="flex items-center gap-1.5 text-white">
              <Flame className="w-3.5 h-3.5 text-gorange" />
              <span className="font-bold tracking-wider">{currentStreak < 10 ? `0${currentStreak}` : currentStreak} DAYS</span>
              <span className="text-[#566173]">/ ACTIVE CONSISTENCY</span>
            </div>
            <span className="text-[#3A4354]">|</span>
            <div className="flex items-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
              <span>FREEZE: {streakFreezes < 10 ? `0${streakFreezes}` : streakFreezes} AVAILABLE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-[#8F9AA9] hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <Share2 className="w-3 h-3 text-gorange" />
              <span>SHARE PROGRESS</span>
            </button>
            <span className="text-[#3A4354]">|</span>
            <Link
              to="/leaderboard"
              className="text-[#8F9AA9] hover:text-white transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>LEADERBOARD</span>
            </Link>
          </div>
        </div>

        {/* STREAK ALERTS (Editorial Banner Format) */}
        {streakFreezeUsedAlert && (
          <div className="mb-6 p-4 bg-[#0A1017] border border-cyan-800/60 flex items-center justify-between font-mono text-xs text-cyan-300">
            <div className="flex items-center gap-2.5">
              <Snowflake className="w-4 h-4 text-cyan-400" />
              <span>STREAK PROTECTED: Free miss applied automatically yesterday. Continuity maintained.</span>
            </div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">1 FREEZE REMAINING</span>
          </div>
        )}

        {streakCelebration && (
          <div className="mb-6 p-4 bg-[#140E0A] border border-gorange/60 flex items-center justify-between font-mono text-xs text-gorange">
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-gorange" />
              <span className="font-bold text-white">DAILY TASK LOGGED. STREAK EXTENDED TO {currentStreak} DAYS.</span>
            </div>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1 bg-gorange text-black font-bold uppercase tracking-wider text-[10px]"
            >
              Share Proof
            </button>
          </div>
        )}

        {/* HEADER */}
        <EditorialHeader
          index="01"
          tag="DASHBOARD"
          title="YOUR CAREER COMMAND CENTER."
          subtitle={`A live analytical view of your current position, verified competencies, and next milestones for ${activeCareerProfile?.title}.`}
        >
          <EditorialButton
            variant="outline"
            size="md"
            onClick={() => navigate('/career-selection')}
          >
            Change Role
          </EditorialButton>
          <EditorialButton
            variant="primary"
            size="md"
            onClick={() => navigate('/roadmap')}
            icon={ArrowRight}
          >
            Full Roadmap
          </EditorialButton>
        </EditorialHeader>

        {/* PRIMARY MODULE: CAREER READINESS OVERVIEW (Coherent Integrated System) */}
        <div className="mb-14 p-8 bg-[#0B0D12] border border-[#1E232F]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#1E232F]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-gorange mb-2">
                OVERALL POSITION BENCHMARK
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {activeCareerProfile?.title || 'Target Role'}
              </h2>
              <div className="font-mono text-xs text-[#7F8B9D] mt-2 flex items-center gap-4">
                <span>SECTOR: {activeCareerProfile?.domain?.toUpperCase() || 'TECHNOLOGY'}</span>
                <span>•</span>
                <span>ESTIMATED PAY: {activeCareerProfile?.salary || 'Market Rate'}</span>
              </div>
            </div>

            <div className="lg:text-right">
              <div className="flex items-baseline gap-3 lg:justify-end">
                <div className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter">
                  {readinessScore}%
                </div>
                <div className="font-mono text-xs text-gorange font-bold uppercase tracking-wider">
                  CAREER READINESS
                </div>
              </div>
              <div className="font-mono text-[11px] text-[#8F9AA9] mt-1 font-light">
                Based on verified skills, roadmap phases, casework evidence, and profile experience
              </div>
            </div>
          </div>

          {/* Core Benchmark Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 font-mono">
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">VERIFIED SKILLS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {skillsMasteredCount} <span className="text-[#566173] text-sm">/ {totalSkillsCount}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">CRITICAL GAPS</div>
              <div className="text-2xl font-bold text-gorange mt-1">
                {criticalGapsCount}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">ROADMAP PROGRESS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {Math.round(((roadmap || []).filter(r => r.status === 'Completed').length / Math.max(1, (roadmap || []).length)) * 100)}%
                <span className="text-[#566173] text-sm ml-1.5 font-normal">
                  ({(roadmap || []).filter(r => r.status === 'Completed').length}/{(roadmap || []).length || 4} PHASES)
                </span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">EVIDENCE REQUIREMENT</div>
              <div className="text-sm font-semibold text-white mt-1 truncate">
                {activeCareerProfile?.evidenceType || 'Production Artifacts'}
              </div>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN ANALYTICAL GRID: THE GAP & NEXT ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          
          {/* SECOND: THE GAP MATRIX (Horizontal Differential Bars) */}
          <div className="lg:col-span-7">
            <EditorialSection
              index="02"
              tag="THE GAP"
              title="Competency Differential Matrix"
              subtitle={`Comparing your current evaluated proficiency against verified benchmarks for ${activeCareerProfile?.title}.`}
              action={
                <Link to="/skill-gap" className="text-gorange hover:underline font-mono text-xs flex items-center gap-1">
                  <span>Full Matrix</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              }
            >
              <div className="space-y-4">
                {skillChartData.slice(0, 5).map((item) => {
                  const percent = Math.round((item.currentLevel / (item.requiredLevel || 1)) * 100);
                  const deficit = Math.max(0, item.requiredLevel - item.currentLevel);

                  return (
                    <div key={item.skill} className="p-4 bg-[#0B0D12] border border-[#1E232F]">
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="text-white font-medium">{item.skill}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#7F8B9D] text-[11px]">
                            {item.currentLevel}% <span className="text-[#4E5664]">/ {item.requiredLevel}%</span>
                          </span>
                          <span className={deficit > 20 ? 'text-gorange font-bold text-[11px]' : 'text-emerald-400 text-[11px]'}>
                            -{deficit}% GAP
                          </span>
                        </div>
                      </div>

                      {/* Differential Bar */}
                      <div className="w-full bg-[#141822] h-2 border border-[#1E232F] overflow-hidden flex">
                        <div
                          className="bg-gorange h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </EditorialSection>
          </div>

          {/* THIRD: NEXT ACTION (Role-Specific Priority Move) */}
          <div className="lg:col-span-5">
            <EditorialSection
              index="03"
              tag="NEXT ACTION"
              title="High-Leverage Execution"
              subtitle="The single most impactful move to close your largest competency deficit."
            >
              <div className="p-6 bg-[#0B0D12] border border-gorange/40 flex flex-col justify-between h-[calc(100%-48px)]">
                <div>
                  <div className="font-mono text-[10px] text-gorange uppercase tracking-widest font-bold mb-2">
                    [ {nextMove.badge || 'PRIMARY INTERVENTION'} ]
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-white tracking-tight mt-1">
                    {nextMove.title}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-[#1E232F] font-mono text-xs space-y-2">
                    <div className="text-[#6B7688] uppercase tracking-wider">WHY THIS ACTION:</div>
                    <p className="text-sm text-[#C8CFDB] font-sans font-light leading-relaxed">
                      {nextMove.reason}
                    </p>
                  </div>

                  <div className="mt-4 font-mono text-xs text-[#7F8B9D]">
                    <span>ESTIMATED EFFORT: </span>
                    <span className="text-white font-bold">{nextMove.estimatedTime || '2-3 Weeks'}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1E232F] flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gorange font-bold">
                    {nextMove.impactDelta || '+28% Readiness'}
                  </span>
                  
                  <EditorialButton
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/roadmap')}
                    icon={ArrowRight}
                  >
                    Start Action
                  </EditorialButton>
                </div>
              </div>
            </EditorialSection>
          </div>

        </div>

        {/* FOURTH: YOUR PATH (Editorial Chronological Timeline) */}
        <div className="mb-14">
          <EditorialSection
            index="04"
            tag="YOUR PATH"
            title="Chronological Milestone Sequence"
            subtitle="The verified sequential stages required to reach industry hiring standards."
            action={
              <Link to="/roadmap" className="text-gorange hover:underline font-mono text-xs flex items-center gap-1">
                <span>Expand All Phases</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(roadmap || []).map((stage, sIdx) => {
                const isSelected = selectedTimelineStage === sIdx;
                const isComplete = stage.status === 'Completed';
                const isInProgress = stage.status === 'In Progress';
                const isLocked = stage.status === 'Locked';

                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedTimelineStage(sIdx)}
                    className={`p-5 border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0E1118] border-gorange text-white'
                        : isComplete
                        ? 'bg-[#090C10] border-emerald-900/60 text-[#8F9AA9]'
                        : 'bg-[#0B0D12] border-[#1E232F] text-[#8F9AA9] hover:border-[#2B3242]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className="text-gorange font-bold">{stage.stageNumber || `0${sIdx + 1}`}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        isComplete ? 'text-emerald-400' : isInProgress ? 'text-gorange' : 'text-[#566173]'
                      }`}>
                        {stage.status}
                      </span>
                    </div>

                    <div className="font-display font-bold text-base text-white mt-1 line-clamp-2">
                      {stage.title}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#1E232F]/80 font-mono text-[11px] text-[#6B7688]">
                      {stage.skills?.slice(0, 2).join(' • ')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Stage Detail Drawer */}
            {roadmap[selectedTimelineStage] && (
              <div className="mt-4 p-6 bg-[#080A0E] border border-[#1E232F] flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] text-gorange uppercase tracking-widest">
                    SELECTED PHASE: {roadmap[selectedTimelineStage].stageNumber} / {roadmap[selectedTimelineStage].title}
                  </div>
                  <p className="text-sm text-[#8F9AA9] mt-1.5 max-w-3xl font-light">
                    {roadmap[selectedTimelineStage].description}
                  </p>
                </div>
                <EditorialButton
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/roadmap')}
                >
                  Inspect Phase
                </EditorialButton>
              </div>
            )}
          </EditorialSection>
        </div>

        {/* FIFTH: TODAY'S RETENTION LOOP (Compact Editorial Task Rows) */}
        <div className="mb-12">
          <EditorialSection
            index="05"
            tag="TODAY"
            title="Daily Atomic Interventions"
            subtitle="20-minute daily concept drills. Complete these daily to maintain streak continuity."
          >
            {dailyTasksLoading ? (
              <div className="p-8 text-center font-mono text-xs text-[#6B7688] border border-[#1E232F]">
                UPDATING DAILY QUEUE...
              </div>
            ) : activeTasksList.length === 0 && previewTasksList.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-[#8F9AA9] border border-[#1E232F] bg-[#0B0D12]">
                <p>No active tasks currently queued for today.</p>
                <EditorialButton
                  variant="primary"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate('/roadmap')}
                >
                  Inspect Roadmap & Tasks
                </EditorialButton>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Active Unlocked Tasks */}
                {activeTasksList.map((task) => {
                  const isDone = task.status === 'completed';
                  return (
                    <div
                      key={task.id}
                      className="p-4 bg-[#0B0D12] border border-[#1E232F] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-[#2B3242]"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          onClick={() => markTaskComplete(task.id)}
                          className="mt-0.5 sm:mt-0 text-[#6B7688] hover:text-gorange transition-colors shrink-0"
                          title={isDone ? 'Task Completed' : 'Mark Complete'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        
                        <div>
                          <div className={`text-sm font-display font-medium ${isDone ? 'line-through text-[#6B7688]' : 'text-white'}`}>
                            {task.title}
                          </div>
                          <div className="text-xs text-[#7F8B9D] mt-0.5 font-light">
                            {task.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs shrink-0 self-end sm:self-center">
                        <span className="text-[#6B7688] flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {task.durationMinutes || 20}m
                        </span>

                        {task.resourceUrl && (
                          <a
                            href={task.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8F9AA9] hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            <span>Resource</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        {!isDone && (
                          <button
                            onClick={() => markTaskComplete(task.id)}
                            className="px-3 py-1 bg-white text-black font-bold uppercase tracking-wider text-[10px] hover:bg-gorange transition-colors"
                          >
                            Done ✓
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Coming Up Next (Preview) */}
                {previewTasksList.length > 0 && (
                  <div className="pt-4">
                    <div className="font-mono text-[10px] text-[#566173] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      <span>COMING UP NEXT (LOCKED)</span>
                    </div>
                    {previewTasksList.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className="py-3 px-4 bg-[#07090D] border border-[#161B24] opacity-50 flex items-center justify-between text-xs font-mono text-[#6B7688] mb-1.5"
                      >
                        <div className="truncate">{task.title}</div>
                        <span>{task.durationMinutes || 20}m</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </EditorialSection>
        </div>

      </EditorialShell>

      {/* Share Progress Modal */}
      {isShareModalOpen && (
        <ShareProgressModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          currentStreak={currentStreak}
          readinessScore={readinessScore}
          targetCareer={activeCareerProfile?.title || 'Professional'}
          userName={user?.displayName || 'Builder'}
        />
      )}
    </AppLayout>
  );
};
