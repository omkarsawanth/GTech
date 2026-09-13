import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  BrainCircuit,
  FolderGit2,
  BookOpen,
  Award,
  Zap,
  Lock,
  CalendarCheck,
  Flame,
  Share2,
  Trophy,
  Snowflake,
  ShieldCheck
} from 'lucide-react';
import { TaskCard } from '../components/common/TaskCard';
import { ShareProgressModal } from '../components/common/ShareProgressModal';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { StatCard, Card, Badge, ProgressBar, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MentorChatModal } from '../components/common/MentorChatModal';

export const DashboardPage = () => {
  const { 
    activeCareerProfile, 
    analysisResult, 
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
  const [isMentorModalOpen, setIsMentorModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const readinessScore = analysisResult?.readinessScore || 72;
  const skillsMasteredCount = analysisResult?.skillsMasteredCount || 12;
  const totalSkillsCount = analysisResult?.totalSkillsCount || 20;
  const roadmapProgress = analysisResult?.roadmapProgress || 38;
  const projectsCompletedCount = 3;

  const chartData = analysisResult?.skillChartData || [
    { skill: 'Python', currentLevel: 85, requiredLevel: 90 },
    { skill: 'Statistics', currentLevel: 55, requiredLevel: 80 },
    { skill: 'NumPy', currentLevel: 60, requiredLevel: 85 },
    { skill: 'Pandas', currentLevel: 65, requiredLevel: 85 },
    { skill: 'ML', currentLevel: 42, requiredLevel: 85 },
    { skill: 'Deep Learning', currentLevel: 28, requiredLevel: 80 },
    { skill: 'LLMs', currentLevel: 35, requiredLevel: 80 }
  ];

  const radarData = chartData.map(item => ({
    subject: item.skill,
    Current: item.currentLevel,
    Required: item.requiredLevel,
  }));

  const nextMove = analysisResult?.nextBestMove || {
    title: 'Learn Machine Learning Fundamentals',
    reason: 'Machine Learning is currently one of your largest skill gaps. Completing the next three roadmap milestones could significantly improve your readiness for your target role.',
    skill: 'Machine Learning'
  };

  return (
    <AppLayout>
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> GTech Command Center
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Good morning, {user?.displayName?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's your path to becoming a <span className="text-purple-300 font-semibold">{activeCareerProfile?.title || 'AI Engineer'}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsShareModalOpen(true)}
            className="text-xs font-display hover:border-solar-coral/50"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5 text-solar-coral" />
            Share Progress
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/leaderboard')}
            className="text-xs font-display hover:border-solar-amber/50"
          >
            <Trophy className="w-3.5 h-3.5 mr-1.5 text-solar-amber" />
            Leaderboard
          </Button>

          <Button
            variant="solar"
            size="md"
            onClick={() => navigate('/roadmap')}
            className="font-display font-bold text-xs"
            icon={Compass}
            iconPosition="right"
          >
            View Roadmap
          </Button>
        </div>
      </div>

      {/* STREAK FREEZE ALERT (Phase 2 Protection) */}
      <AnimatePresence>
        {streakFreezeUsedAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-900/90 via-dark-900 to-cyan-950/90 border border-cyan-500/40 text-cyan-200 font-display flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Snowflake className="w-6 h-6 animate-pulse text-cyan-300" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  ❄️ STREAK FREEZE ACTIVATED!
                </div>
                <div className="text-xs text-cyan-300/80 mt-0.5">
                  Your streak was protected from breaking yesterday. 1 free miss used.
                </div>
              </div>
            </div>
            <Badge variant="cyan" size="sm" className="font-mono">PROTECTED</Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STREAK CELEBRATION BANNER (Phase 2 Animation) */}
      <AnimatePresence>
        {streakCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="mb-6 p-4.5 rounded-2xl bg-gradient-to-r from-solar-coral via-solar-amber to-solar-coral text-white font-display font-bold flex items-center justify-between shadow-2xl shadow-rose-950/60"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-dark-950/30 rounded-xl">
                <Flame className="w-7 h-7 text-yellow-200 animate-bounce" />
              </div>
              <div>
                <div className="text-base flex items-center gap-2">
                  STREAK EXTENDED! You're on a {currentStreak} Day Streak! 🔥
                </div>
                <div className="text-xs font-normal text-rose-100">
                  Daily task completed! Consistency is the #1 predictor of career success.
                </div>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setIsShareModalOpen(true)}
              className="bg-dark-950/50 text-white hover:bg-dark-950 border-white/25 shrink-0"
            >
              Share Streak 🚀
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        <StatCard
          title="Career Readiness"
          value={`${readinessScore}%`}
          subtitle="Target role match benchmark"
          icon={TrendingUp}
          color="purple"
          trend="up"
          trendValue="+14% this month"
        />

        {/* DUOLINGO-STYLE INTERACTIVE FLAME WIDGET */}
        <Card hover className="p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-950 border-solar-amber/40 shadow-xl shadow-amber-950/20 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Streak Level</span>
            {streakFreezes > 0 ? (
              <Badge variant="glass" size="sm" className="text-[10px] font-mono text-cyan-300 border-cyan-500/30 flex items-center gap-1">
                <Snowflake className="w-2.5 h-2.5 text-cyan-400" />
                {streakFreezes} Freeze
              </Badge>
            ) : (
              <Badge variant="glass" size="sm" className="text-[10px] font-mono text-slate-500">
                0 Freezes
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3.5 my-1">
            {/* Animated Duolingo Flame with Number Overlay */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-solar-amber/25 blur-xl group-hover:bg-solar-amber/40 transition-all" />
              
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,138,0,0.6)]">
                <defs>
                  <linearGradient id="flameGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#FF3366" />
                    <stop offset="50%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FFE600" />
                  </linearGradient>
                  <linearGradient id="innerFlameGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M32 4 C32 4, 46 20, 46 38 C46 51, 38 60, 32 60 C26 60, 18 51, 18 38 C18 20, 32 4, 32 4 Z"
                  fill="url(#flameGrad)"
                />
                <path
                  d="M32 20 C32 20, 40 30, 40 42 C40 50, 35 56, 32 56 C29 56, 24 50, 24 42 C24 30, 32 20, 32 20 Z"
                  fill="url(#innerFlameGrad)"
                  opacity="0.85"
                />
              </svg>

              {/* Number Overlay in Center of Flame */}
              <span className="absolute inset-0 flex items-center justify-center font-display font-black text-lg text-dark-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] pt-2 select-none">
                {currentStreak}
              </span>
            </div>

            <div>
              <div className="text-lg font-display font-extrabold text-white flex items-center gap-1.5">
                {currentStreak} Day Streak
              </div>
              <div className="text-[11px] text-solar-amber font-mono mt-0.5 font-semibold">
                {currentStreak >= 30 ? '🌟 Solar Titan' : currentStreak >= 14 ? '💥 Cyber Surge' : currentStreak >= 7 ? '⚡ Flamekeeper' : currentStreak >= 3 ? '🔥 Spark' : '🌱 Ember Habit'}
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Protected 1x/wk</span>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="text-solar-coral hover:text-white font-medium transition-colors"
            >
              Brag 🔥
            </button>
          </div>
        </Card>

        <StatCard
          title="Skills Completed"
          value={`${skillsMasteredCount} / ${totalSkillsCount}`}
          subtitle="Proficient skills verified"
          icon={CheckCircle2}
          color="emerald"
          trend="up"
          trendValue="Verified Skills"
        />

        <StatCard
          title="Roadmap Progress"
          value={`${roadmapProgress}%`}
          subtitle="Active milestones track"
          icon={Compass}
          color="cyan"
          trend="up"
          trendValue="Milestone Active"
        />

      </div>

      {/* TODAY'S TASKS — Daily Retention Loop */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-solar-coral/20 text-rose-300 border border-solar-coral/30">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white">Today's Tasks</h2>
              <p className="text-xs text-slate-400">Complete your daily learning tasks to stay on track</p>
            </div>
          </div>
          {dailyTasks?.activeTasks?.length > 0 && (
            <Badge variant="coral" size="sm" className="font-mono">
              {dailyTasks.activeTasks.length} active
            </Badge>
          )}
        </div>

        {dailyTasksLoading ? (
          <div className="text-center py-8 text-slate-400 text-sm">Loading today's tasks...</div>
        ) : dailyTasks?.activeTasks?.length === 0 && dailyTasks?.previewTasks?.length === 0 ? (
          <Card className="p-6 text-center border-dashed border-slate-700">
            <p className="text-slate-400 text-sm">No tasks yet. Generate a roadmap to get started!</p>
            <Button variant="solar" size="sm" className="mt-3" onClick={() => navigate('/roadmap')}>
              Generate Roadmap
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {/* Active / unlocked tasks */}
            {dailyTasks?.activeTasks?.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={markTaskComplete} isLocked={false} />
            ))}

            {/* Locked preview tasks */}
            {dailyTasks?.previewTasks?.length > 0 && (
              <>
                <div className="flex items-center gap-2 mt-6 mb-2">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Coming up next</span>
                </div>
                {dailyTasks.previewTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onComplete={() => {}} isLocked={true} />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* AI CAREER MENTOR FEATURE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 rounded-2xl glass-panel p-6 border-l-4 border-l-solar-coral border border-solar-coral/30 relative overflow-hidden shadow-xl shadow-rose-950/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-solar-coral/20 text-rose-300 border border-solar-coral/40 shrink-0 shadow-[0_0_15px_rgba(255,51,102,0.3)]">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="coral" size="sm" className="font-display font-semibold">AI Career Mentor</Badge>
                <span className="text-xs text-slate-400 font-medium font-mono">Gemini 3.6 Flash</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                {nextMove.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Your biggest current gap is <strong className="text-rose-300 font-semibold">{nextMove.skill}</strong>. Completing the next three roadmap milestones will significantly improve your target role readiness.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsMentorModalOpen(true)}
              icon={BrainCircuit}
            >
              Ask AI Mentor
            </Button>
            <Button
              variant="solar"
              size="md"
              onClick={() => navigate('/roadmap')}
              className="font-display font-bold"
              icon={ArrowRight}
              iconPosition="right"
            >
              Start Learning
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Mentor Chat Modal */}
      <MentorChatModal isOpen={isMentorModalOpen} onClose={() => setIsMentorModalOpen(false)} />

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Recharts Bar Chart (2 columns width) */}
        <Card hover className="lg:col-span-2 p-6 flex flex-col justify-between border-solar-coral/15 hover:border-solar-coral/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-solar-coral" />
                Current Skill Level vs Target Benchmark
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Quantified skill metrics for {activeCareerProfile?.title}</p>
            </div>
            <Badge variant="amber" size="sm">Live Analytics</Badge>
          </div>

          <div className="h-72 w-full pt-2 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c2333" />
                <XAxis dataKey="skill" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0D14',
                    borderColor: '#FF336640',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="currentLevel" name="Current Level %" fill="#FF3366" radius={[6, 6, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="requiredLevel" name="Target Benchmark %" fill="#FF8A00" radius={[6, 6, 0, 0]} opacity={0.65} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Proficiency Breakdown (1 column width) */}
        <Card hover className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-display font-bold text-white mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              Skill Proficiency Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-6">Percentage completion towards target benchmarks</p>

            <div className="space-y-4">
              {chartData.slice(0, 6).map((item) => {
                const color = item.currentLevel >= 70 ? 'purple' : item.currentLevel >= 40 ? 'cyan' : 'rose';
                return (
                  <ProgressBar
                    key={item.skill}
                    label={item.skill}
                    progress={Math.round((item.currentLevel / item.requiredLevel) * 100)}
                    color={color}
                    showText
                  />
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">View detailed gap analysis</span>
            <button
              onClick={() => navigate('/skill-gap')}
              className="text-purple-400 font-semibold hover:text-purple-300 flex items-center gap-1"
            >
              Skill Matrix <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

      </div>

      {/* FULLSCREEN CONFETTI & BADGE UNLOCK CELEBRATION MODAL */}
      <AnimatePresence>
        {milestoneUnlocked && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md">
            {/* Lightweight Confetti Particles (Framer Motion) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: `${(i * 6.2) % 100}vw`, 
                    y: '-10vh', 
                    rotate: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    y: '110vh', 
                    rotate: (i % 2 === 0 ? 360 : -360) * 2,
                    opacity: [1, 1, 0] 
                  }}
                  transition={{ 
                    duration: 2.8 + (i % 4) * 0.4, 
                    repeat: Infinity, 
                    ease: 'linear',
                    delay: (i * 0.15) % 1.5
                  }}
                  className={`absolute w-3 h-3 rounded-sm ${
                    i % 4 === 0 ? 'bg-solar-coral' : i % 4 === 1 ? 'bg-solar-amber' : i % 4 === 2 ? 'bg-solar-violet' : 'bg-yellow-300'
                  }`}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              className="relative max-w-md w-full rounded-3xl p-8 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900 border-2 border-solar-amber shadow-[0_0_50px_rgba(255,138,0,0.35)] text-center z-10"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-solar-coral via-solar-amber to-yellow-400 p-1 flex items-center justify-center shadow-2xl shadow-rose-950/60">
                <div className="w-full h-full bg-dark-950 rounded-[22px] flex items-center justify-center text-4xl">
                  {milestoneUnlocked.icon}
                </div>
              </div>

              <Badge variant="amber" size="sm" className="mb-2 font-mono tracking-wider animate-pulse">
                MILESTONE UNLOCKED • {milestoneUnlocked.days} DAYS
              </Badge>

              <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">
                {milestoneUnlocked.title}
              </h2>
              <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
                {milestoneUnlocked.desc}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  variant="solar"
                  size="md"
                  onClick={() => {
                    setMilestoneUnlocked(null);
                    setIsShareModalOpen(true);
                  }}
                  className="w-full font-display font-bold text-xs"
                >
                  Share Badge on Instagram / Discord 🚀
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMilestoneUnlocked(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Keep Crushing It ➔
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Progress Modal (Phase 3) */}
      <ShareProgressModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        careerTitle={activeCareerProfile?.title || 'AI Engineer'}
        readinessScore={readinessScore}
        currentStreak={currentStreak || 1}
        skillsCount={skillsMasteredCount}
        totalSkills={totalSkillsCount}
        userName={user?.displayName || user?.name || 'Student'}
      />

    </AppLayout>
  );
};
