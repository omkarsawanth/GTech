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
  Zap
} from 'lucide-react';
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
import { motion } from 'framer-motion';
import { MentorChatModal } from '../components/common/MentorChatModal';

export const DashboardPage = () => {
  const { activeCareerProfile, analysisResult } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMentorModalOpen, setIsMentorModalOpen] = React.useState(false);

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

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/assessment')}
          >
            Retake Assessment
          </Button>
          <Button
            variant="glow"
            size="md"
            onClick={() => navigate('/roadmap')}
            className="font-display"
            icon={Compass}
            iconPosition="right"
          >
            View My Roadmap
          </Button>
        </div>
      </div>

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
          title="Skills Completed"
          value={`${skillsMasteredCount} / ${totalSkillsCount}`}
          subtitle="Proficient skills verified"
          icon={CheckCircle2}
          color="emerald"
          trend="up"
          trendValue="12 Verified Skills"
        />

        <StatCard
          title="Roadmap Progress"
          value={`${roadmapProgress}%`}
          subtitle="Phase 3 of 7 in progress"
          icon={Compass}
          color="cyan"
          trend="up"
          trendValue="Phase 3 Active"
        />

        <StatCard
          title="Projects Completed"
          value={`${projectsCompletedCount}`}
          subtitle="Portfolio projects built"
          icon={FolderGit2}
          color="rose"
          trend="up"
          trendValue="+1 this week"
        />

      </div>

      {/* AI CAREER MENTOR FEATURE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 rounded-2xl glass-panel p-6 border-l-4 border-l-purple-500 border border-purple-500/30 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/40 shrink-0">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="purple" size="sm" className="font-display">AI Career Mentor</Badge>
                <span className="text-xs text-slate-400 font-medium font-mono">Personalized Insight</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                {nextMove.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Your biggest current gap is <strong className="text-purple-300 font-semibold">{nextMove.skill}</strong>. Completing the next three roadmap milestones could significantly improve your readiness for your target role.
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
              variant="glow"
              size="md"
              onClick={() => navigate('/roadmap')}
              className="font-display"
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
        <Card hover className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Current Skill Level vs Target Benchmark
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Quantified skill metrics for {activeCareerProfile?.title}</p>
            </div>
            <Badge variant="purple" size="sm">Live Analytics</Badge>
          </div>

          <div className="h-72 w-full pt-2 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="skill" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="currentLevel" name="Current Level %" fill="#8B5CF6" radius={[6, 6, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="requiredLevel" name="Target Benchmark %" fill="#06B6D4" radius={[6, 6, 0, 0]} opacity={0.5} isAnimationActive={false} />
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

    </AppLayout>
  );
};
