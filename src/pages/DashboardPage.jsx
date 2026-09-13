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
  Trophy
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
    streakCelebration 
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

        <StatCard
          title="Daily Streak"
          value={`${currentStreak} Days`}
          subtitle="Consecutive daily learning"
          icon={Flame}
          color="amber"
          trend="up"
          trendValue="Momentum Active"
        />

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
