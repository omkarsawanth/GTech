import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Play,
  X,
  Sparkles
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
import { RoastCard } from '../components/common/RoastCard';
import { CyberTiltCard } from '../components/common/CyberTiltCard';
import { AnimeCounter } from '../components/common/AnimeCounter';
import { ParticleButton } from '../components/common/ParticleButton';
import { CyberRadarBadge } from '../components/common/CyberRadarBadge';
import { fetchSkillRoastAPI } from '../services/aiService';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { cyberAudio } from '../utils/cyberAudio';
import { triggerCyberConfetti } from '../utils/cyberConfetti';

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
  const [shareModalTemplate, setShareModalTemplate] = useState('stats');
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(0);

  // Audio & Confetti Celebrations
  useEffect(() => {
    if (streakCelebration) {
      cyberAudio.playSuccess();
      triggerCyberConfetti({ particleCount: 50 });
    }
  }, [streakCelebration]);

  // Auto-dismiss milestone celebration banner/modal after 12s if not interacted with
  useEffect(() => {
    if (!milestoneUnlocked) return;
    cyberAudio.playSuccess();
    triggerCyberConfetti({ particleCount: 75 });
    const timer = setTimeout(() => {
      setMilestoneUnlocked(null);
    }, 12000);
    return () => clearTimeout(timer);
  }, [milestoneUnlocked, setMilestoneUnlocked]);

  // Skill Roast State
  const [isRoastModalOpen, setIsRoastModalOpen] = useState(false);
  const [roastData, setRoastData] = useState(null);
  const [isRoastLoading, setIsRoastLoading] = useState(false);
  const [roastError, setRoastError] = useState(null);

  const triggerRoastFetch = async () => {
    setIsRoastLoading(true);
    setRoastError(null);
    try {
      const skills = (activeCareerProfile?.skills || []).map(s => s.name || s);
      const missingSkills = (analysisResult?.missingSkills || []).map(s => s.name || s);
      const res = await fetchSkillRoastAPI({
        skills,
        targetRole: activeCareerProfile?.title || 'Software Engineer',
        missingSkills,
      });
      setRoastData(res.data);
    } catch (err) {
      console.warn('Roast fetch error:', err);
      setRoastError(err.message || 'Daily limit reached or service unavailable. Come back tomorrow!');
    } finally {
      setIsRoastLoading(false);
    }
  };

  const handleGetRoast = () => {
    setIsRoastModalOpen(true);
    if (!roastData) {
      triggerRoastFetch();
    }
  };

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
        
        {/* Top Status Bar: Prominent Animated Streak Hero Card + Secondary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 pb-5 border-b border-[#1E232F] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* STREAK & CONSISTENCY HERO CARD (Dominates the visual hierarchy) */}
          <CyberTiltCard
            maxTilt={5}
            glare={true}
            corners={true}
            soundOnHover={true}
            className="relative bg-gradient-to-r from-[#160E0A] via-[#0E121A] to-[#0A0D12] border border-gorange/40 hover:border-gorange/80 p-3 sm:px-4 sm:py-3 flex items-center gap-4 shadow-xl shadow-black/60 transition-all group"
          >
            {/* Ambient background glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gorange/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />

            {/* Glowing Flame Icon with Pulse Animation */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={currentStreak > 0 ? {
                  scale: [1, 1.14, 1],
                  filter: [
                    'drop-shadow(0 0 6px rgba(255,138,0,0.6))',
                    'drop-shadow(0 0 16px rgba(255,138,0,0.95))',
                    'drop-shadow(0 0 6px rgba(255,138,0,0.6))'
                  ]
                } : {}}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-none bg-gorange/10 border border-gorange/40 flex items-center justify-center"
              >
                <Flame className={`w-6 h-6 ${currentStreak > 0 ? 'text-gorange fill-gorange/20' : 'text-[#6B7688]'}`} />
              </motion.div>
            </div>

            {/* Prominent Streak Numeral & Subtitle with Anime.js Counter */}
            <div className="flex flex-col pr-3.5 border-r border-[#1E2533]">
              <div className="flex items-baseline gap-1.5 leading-none">
                <AnimeCounter
                  value={currentStreak}
                  padZero
                  className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight"
                />
                <span className="font-mono text-xs font-bold text-gorange uppercase tracking-wider">
                  DAYS
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#7E8B9F] uppercase tracking-widest mt-0.5">
                ACTIVE CONSISTENCY
              </span>
            </div>

            {/* Streak Freeze Indicator */}
            <div className="flex items-center gap-2.5 pl-1">
              <div className="w-8 h-8 rounded-none bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-center">
                <Snowflake className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-cyan-300 leading-tight">
                  <AnimeCounter value={streakFreezes} padZero /> {streakFreezes === 1 ? 'FREEZE' : 'FREEZES'}
                </span>
                <span className="font-mono text-[9px] text-cyan-500/80 uppercase tracking-widest leading-tight">
                  {streakFreezes > 0 ? 'PROTECTED' : 'DEPLETED'}
                </span>
              </div>
            </div>
          </CyberTiltCard>

          {/* Secondary Action Links with KokonutUI/Refero particle buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap font-mono text-xs">
            <ParticleButton
              variant="outline"
              size="sm"
              onClick={() => {
                cyberAudio.playEnergy();
                handleGetRoast();
              }}
              icon={Flame}
              iconPosition="left"
            >
              <span>GET ROASTED 🔥</span>
            </ParticleButton>

            <ParticleButton
              variant="glass"
              size="sm"
              onClick={() => {
                cyberAudio.playClick();
                setShareModalTemplate('stats');
                setIsShareModalOpen(true);
              }}
              icon={Share2}
              iconPosition="left"
            >
              <span>SHARE PROGRESS</span>
            </ParticleButton>

            <Link
              to="/leaderboard"
              onMouseEnter={() => cyberAudio.playHover()}
              className="px-3 py-2 bg-[#0B0D12] hover:bg-[#141820] border border-[#1E232F] hover:border-solar-amber/60 text-[#8F9AA9] hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase"
            >
              <Trophy className="w-3.5 h-3.5 text-solar-amber" />
              <span>LEADERBOARD</span>
            </Link>
          </div>
        </motion.div>

        {/* STREAK ALERTS (Smooth Framer-Motion Animated Banners) */}
        <AnimatePresence>
          {streakFreezeUsedAlert && (
            <motion.div
              key="freeze-alert"
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-6 p-4 bg-[#0A1017] border border-cyan-800/60 flex items-center justify-between font-mono text-xs text-cyan-300 overflow-hidden"
            >
              <div className="flex items-center gap-2.5">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                <span>STREAK PROTECTED: Free miss applied automatically yesterday. Continuity maintained.</span>
              </div>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                {streakFreezes} {streakFreezes === 1 ? 'FREEZE' : 'FREEZES'} REMAINING
              </span>
            </motion.div>
          )}

          {streakCelebration && (
            <motion.div
              key="streak-celebration"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="mb-6 p-4 bg-gradient-to-r from-[#1E120A] via-[#140E0A] to-[#1E120A] border-l-4 border-l-gorange border-y border-r border-gorange/50 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-gorange shadow-lg shadow-gorange/10"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-gorange drop-shadow-[0_0_8px_rgba(255,138,0,0.8)]" />
                <span className="font-bold text-white tracking-wide">
                  DAILY TASK LOGGED. STREAK EXTENDED TO {currentStreak} DAYS.
                </span>
              </div>
              <button
                onClick={() => {
                  setShareModalTemplate('stats');
                  setIsShareModalOpen(true);
                }}
                className="px-3 py-1.5 bg-gorange hover:bg-orange-400 text-black font-bold uppercase tracking-wider text-[10px] transition-transform hover:scale-105 active:scale-95 shadow-md shadow-gorange/30 flex items-center gap-1.5"
              >
                <Share2 className="w-3 h-3" />
                <span>Share Proof</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <EditorialHeader
          index="01"
          tag="DASHBOARD"
          title="YOUR CAREER COMMAND CENTER."
          subtitle={`A live analytical view of your current position, verified competencies, and next milestones for ${activeCareerProfile?.title}.`}
        >
          <div className="hidden lg:flex items-center mr-2">
            <CyberRadarBadge 
              status="CALIBRATED" 
              node="CORE-SYS" 
              latency="14ms" 
              variant="orange" 
            />
          </div>
          <ParticleButton
            variant="glass"
            size="md"
            onClick={() => navigate('/career-selection')}
          >
            Change Role
          </ParticleButton>
          <ParticleButton
            variant="solar"
            size="md"
            onClick={() => navigate('/roadmap')}
            icon={ArrowRight}
            iconPosition="right"
          >
            Full Roadmap
          </ParticleButton>
        </EditorialHeader>

        {/* PRIMARY MODULE: CAREER READINESS OVERVIEW (Coherent Integrated System) */}
        <CyberTiltCard
          maxTilt={3}
          glare={true}
          corners={true}
          className="mb-14 p-8 bg-[#0B0D12] border border-[#1E232F] shadow-2xl shadow-black/80"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#1E232F]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-gorange mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gorange rounded-full animate-ping" />
                <span>OVERALL POSITION BENCHMARK</span>
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
                <AnimeCounter
                  value={readinessScore}
                  suffix="%"
                  className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter"
                />
                <div className="font-mono text-xs text-gorange font-bold uppercase tracking-wider">
                  CAREER READINESS
                </div>
              </div>
              <div className="font-mono text-[11px] text-[#8F9AA9] mt-1 font-light">
                Based on verified skills, roadmap phases, casework evidence, and profile experience
              </div>
            </div>
          </div>

          {/* Core Benchmark Metrics Row with Anime.js Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 font-mono">
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">VERIFIED SKILLS</div>
              <div className="text-2xl font-bold text-white mt-1">
                <AnimeCounter value={skillsMasteredCount} /> <span className="text-[#566173] text-sm">/ {totalSkillsCount}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">CRITICAL GAPS</div>
              <div className="text-2xl font-bold text-gorange mt-1">
                <AnimeCounter value={criticalGapsCount} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#6B7688] uppercase tracking-wider">ROADMAP PROGRESS</div>
              <div className="text-2xl font-bold text-white mt-1">
                <AnimeCounter 
                  value={Math.round(((roadmap || []).filter(r => r.status === 'Completed').length / Math.max(1, (roadmap || []).length)) * 100)} 
                  suffix="%" 
                />
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
        </CyberTiltCard>

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
                    <div key={item.skill} className="p-4 bg-[#0B0D12] border border-[#1E232F] hover:border-[#2E374A] transition-colors">
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
              <CyberTiltCard
                maxTilt={6}
                glare={true}
                corners={true}
                borderBeam={true}
                className="p-6 bg-[#0B0D12] border border-gorange/50 flex flex-col justify-between h-[calc(100%-48px)] shadow-xl shadow-black/80"
              >
                <div>
                  <div className="font-mono text-[10px] text-gorange uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gorange" />
                    <span>[ {nextMove.badge || 'PRIMARY INTERVENTION'} ]</span>
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
                    onClick={() => {
                      cyberAudio.playClick();
                      navigate('/roadmap');
                    }}
                    icon={ArrowRight}
                  >
                    Start Action
                  </EditorialButton>
                </div>
              </CyberTiltCard>
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
                          onClick={(e) => {
                            if (!isDone) {
                              cyberAudio.playSuccess();
                              triggerCyberConfetti({
                                origin: {
                                  x: e.clientX ? e.clientX / window.innerWidth : 0.5,
                                  y: e.clientY ? e.clientY / window.innerHeight : 0.5,
                                },
                                particleCount: 40,
                              });
                            }
                            markTaskComplete(task.id);
                          }}
                          onMouseEnter={() => cyberAudio.playHover()}
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
                            onMouseEnter={() => cyberAudio.playHover()}
                            className="text-[#8F9AA9] hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            <span>Resource</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        {!isDone && (
                          <button
                            onClick={(e) => {
                              cyberAudio.playSuccess();
                              triggerCyberConfetti({
                                origin: {
                                  x: e.clientX ? e.clientX / window.innerWidth : 0.5,
                                  y: e.clientY ? e.clientY / window.innerHeight : 0.5,
                                },
                                particleCount: 45,
                              });
                              markTaskComplete(task.id);
                            }}
                            onMouseEnter={() => cyberAudio.playHover()}
                            className="px-3 py-1 bg-white hover:bg-gorange text-black hover:text-black font-bold uppercase tracking-wider text-[10px] transition-all shadow-md shadow-white/10 hover:shadow-gorange/40 hover:scale-105 active:scale-95"
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

      {/* Milestone Celebration Modal & Particle Burst */}
      <AnimatePresence>
        {milestoneUnlocked && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
            {/* Lightweight Framer-Motion Particle Burst */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i / 32) * 360;
                const distance = 140 + (i % 5) * 60;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;
                const colors = ['#FF8A00', '#FF3366', '#FFD700', '#00F0FF', '#FFFFFF'];
                const color = colors[i % colors.length];
                const size = (i % 3 === 0) ? 8 : 5;

                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{ 
                      x: [0, x * 0.7, x], 
                      y: [0, y * 0.7 - 25, y + 40], 
                      opacity: [1, 1, 0], 
                      scale: [0, 1.4, 0.6],
                      rotate: [0, (i % 2 === 0 ? 180 : -180)]
                    }}
                    transition={{ duration: 1.8 + (i % 4) * 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}`
                    }}
                  />
                );
              })}
            </div>

            {/* Celebration Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-lg bg-[#0B0D12] border-2 border-gorange/80 p-6 sm:p-8 text-center shadow-2xl shadow-gorange/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setMilestoneUnlocked(null)}
                className="absolute top-4 right-4 text-[#8F9AA9] hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Subheader */}
              <div className="font-mono text-[11px] text-gorange tracking-[0.25em] uppercase font-bold mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONSISTENCY MILESTONE UNLOCKED</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Animated Badge Icon Hex */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto my-4 rounded-none bg-gradient-to-b from-[#1F130A] to-[#0D1117] border-2 border-gorange flex items-center justify-center text-4xl shadow-lg shadow-gorange/40"
              >
                <span className="select-none">{milestoneUnlocked.icon || '🔥'}</span>
              </motion.div>

              {/* Headline */}
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {milestoneUnlocked.days} DAY STREAK UNLOCKED!
              </h2>

              {/* Badge Title */}
              <div className="inline-block mt-2 px-3 py-1 bg-gorange/20 border border-gorange/60 text-gorange font-mono text-xs font-bold uppercase tracking-wider">
                {milestoneUnlocked.badge} • {milestoneUnlocked.title}
              </div>

              {/* Description */}
              <p className="mt-3 font-mono text-xs text-[#8F9AA9] max-w-sm mx-auto leading-relaxed">
                {milestoneUnlocked.desc}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-[#1E232F] flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setShareModalTemplate('badge');
                    setIsShareModalOpen(true);
                    setMilestoneUnlocked(null);
                  }}
                  className="px-5 py-2.5 bg-gorange hover:bg-orange-400 text-black font-bold uppercase font-mono tracking-wider text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gorange/25 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Milestone Proof</span>
                </button>
                <button
                  onClick={() => setMilestoneUnlocked(null)}
                  className="px-5 py-2.5 bg-transparent hover:bg-[#1A202C] text-[#8F9AA9] hover:text-white border border-[#2D3748] font-mono tracking-wider text-xs uppercase transition-colors"
                >
                  Continue Run
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Progress Modal */}
      {isShareModalOpen && (
        <ShareProgressModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          currentStreak={currentStreak}
          readinessScore={readinessScore}
          careerTitle={activeCareerProfile?.title || 'Professional'}
          userName={user?.displayName || 'Builder'}
          initialTemplate={shareModalTemplate}
        />
      )}

      {/* Skill Roast Modal */}
      {isRoastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsRoastModalOpen(false)}
                className="font-mono text-xs text-[#8F9AA9] hover:text-white tracking-widest uppercase transition-colors"
              >
                [ CLOSE ESC ]
              </button>
            </div>
            <RoastCard
              roastData={roastData}
              onRegenerate={triggerRoastFetch}
              isLoading={isRoastLoading}
              targetRole={activeCareerProfile?.title || 'Target Role'}
            />
            {roastError && (
              <div className="mt-3 p-3.5 bg-[#120D06]/90 border border-solar-amber/40 text-solar-amber font-mono text-xs flex items-center gap-2.5 shadow-lg shadow-black/60">
                <AlertTriangle className="w-4 h-4 shrink-0 text-solar-amber animate-pulse" />
                <span>{roastError}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};
