import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Sparkles, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  UserCheck, 
  Lock,
  Edit3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { fetchLeaderboardAPI, optInLeaderboardAPI } from '../services/aiService';

const CAREER_TRACKS = [
  { id: 'ai-engineer', label: 'AI Engineer' },
  { id: 'ml-engineer', label: 'ML Engineer' },
  { id: 'fullstack-developer', label: 'Full Stack' },
  { id: 'software-engineer', label: 'Software Engineer' },
];

export const LeaderboardPage = () => {
  const { user, activeCareerProfile, currentStreak } = useApp();

  const [selectedCareer, setSelectedCareer] = useState(user?.targetCareer || 'ai-engineer');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [displayHandle, setDisplayHandle] = useState(user?.displayHandle || user?.name || 'You');

  useEffect(() => {
    loadLeaderboard(selectedCareer);
  }, [selectedCareer]);

  const loadLeaderboard = async (career) => {
    setIsLoading(true);
    try {
      const res = await fetchLeaderboardAPI(career);
      if (res && res.leaderboard) {
        setLeaderboardData(res.leaderboard);
      } else {
        // Fallback local list if backend query is offline
        generateFallbackList(career);
      }
    } catch (err) {
      generateFallbackList(career);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackList = (career) => {
    const list = [
      { rank: 1, handle: '@neuralninja', readiness: 88, streak: 14, tasksCompleted: 24, isCurrentUser: false },
      { rank: 2, handle: '@asyncwizard', readiness: 85, streak: 12, tasksCompleted: 21, isCurrentUser: false },
      { rank: 3, handle: `@${(user?.name || 'you').toLowerCase().replace(/\s+/g, '')}`, readiness: 78, streak: currentStreak || 5, tasksCompleted: 14, isCurrentUser: true },
      { rank: 4, handle: '@tensorsflow', readiness: 76, streak: 9, tasksCompleted: 17, isCurrentUser: false },
      { rank: 5, handle: '@promptcraft', readiness: 72, streak: 7, tasksCompleted: 15, isCurrentUser: false },
      { rank: 6, handle: '@matrixrider', readiness: 68, streak: 4, tasksCompleted: 11, isCurrentUser: false },
    ];
    setLeaderboardData(list);
  };

  const handleSaveHandle = async (e) => {
    e.preventDefault();
    try {
      await optInLeaderboardAPI(displayHandle, true);
      setLeaderboardData(prev => prev.map(item => item.isCurrentUser ? { ...item, handle: `@${displayHandle.replace(/^@/, '')}` } : item));
      setIsEditModalOpen(false);
    } catch (err) {
      setIsEditModalOpen(false);
    }
  };

  const topThree = leaderboardData.slice(0, 3);
  const chartData = leaderboardData.slice(0, 8).map(item => ({
    name: item.handle.length > 12 ? item.handle.slice(0, 10) + '..' : item.handle,
    readiness: item.readiness,
    isCurrent: item.isCurrentUser,
  }));

  return (
    <AppLayout>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-solar-amber uppercase tracking-wider mb-1 font-mono">
            <Trophy className="w-4 h-4 text-solar-amber" /> Global Cohort Standings
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Peer Readiness Leaderboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compare verified skill mastery and consistency streaks against peers targeting the same role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsEditModalOpen(true)}
            className="text-xs"
          >
            <Edit3 className="w-3.5 h-3.5 mr-2" />
            Set My Display Handle
          </Button>
        </div>
      </div>

      {/* Career Filter Pills */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {CAREER_TRACKS.map((track) => (
          <button
            key={track.id}
            onClick={() => setSelectedCareer(track.id)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all whitespace-nowrap ${
              selectedCareer === track.id
                ? 'bg-gradient-to-r from-solar-coral to-solar-amber text-white shadow-lg shadow-rose-950/40'
                : 'bg-dark-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* PODIUM SECTION FOR TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* 2nd Place */}
        {topThree[1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <Card hover className="p-6 text-center border-slate-700/60 relative overflow-hidden bg-gradient-to-b from-dark-900 via-dark-900/90 to-dark-950">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-display font-extrabold text-lg shadow-lg">
                2
              </div>
              <Badge variant="slate" size="sm" className="mb-2 font-mono text-[10px]">
                SILVER TIER
              </Badge>
              <h3 className="text-lg font-display font-bold text-white truncate">
                {topThree[1].handle}
              </h3>
              <div className="text-2xl font-bold font-mono text-slate-200 mt-2">
                {topThree[1].readiness}%
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-solar-amber" /> {topThree[1].streak} Day Streak
              </div>
            </Card>
          </motion.div>
        )}

        {/* 1st Place (Winner) */}
        {topThree[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="order-1 md:order-2 md:-mt-4"
          >
            <Card hover className="p-7 text-center border-solar-coral/50 relative overflow-hidden bg-gradient-to-b from-solar-coral/15 via-dark-900 to-dark-950 shadow-2xl shadow-rose-950/30">
              <div className="absolute top-2 right-2">
                <Crown className="w-6 h-6 text-solar-amber animate-bounce" />
              </div>
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-solar-coral to-solar-amber flex items-center justify-center text-white font-display font-extrabold text-xl shadow-xl shadow-rose-950/50">
                1
              </div>
              <Badge variant="coral" size="sm" className="mb-2 font-mono text-[10px] tracking-wider animate-pulse">
                TOP COHORT LEADER
              </Badge>
              <h3 className="text-xl font-display font-bold text-white truncate">
                {topThree[0].handle}
              </h3>
              <div className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-solar-coral to-solar-amber mt-2">
                {topThree[0].readiness}%
              </div>
              <div className="text-xs text-slate-300 mt-1 flex items-center justify-center gap-1 font-medium">
                <Flame className="w-4 h-4 text-solar-amber" /> {topThree[0].streak} Day Streak
              </div>
            </Card>
          </motion.div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="order-3"
          >
            <Card hover className="p-6 text-center border-solar-amber/30 relative overflow-hidden bg-gradient-to-b from-dark-900 via-dark-900/90 to-dark-950">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-solar-amber/20 border border-solar-amber/40 flex items-center justify-center text-solar-amber font-display font-extrabold text-lg shadow-lg">
                3
              </div>
              <Badge variant="amber" size="sm" className="mb-2 font-mono text-[10px]">
                BRONZE TIER
              </Badge>
              <h3 className="text-lg font-display font-bold text-white truncate">
                {topThree[2].handle}
              </h3>
              <div className="text-2xl font-bold font-mono text-solar-amber mt-2">
                {topThree[2].readiness}%
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-solar-amber" /> {topThree[2].streak} Day Streak
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* RECHARTS COMPARISON BAR CHART */}
      <Card hover className="p-6 mb-10 border-solar-coral/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-solar-coral" />
              Cohort Benchmark Comparison
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Top 8 Candidates by Verified Readiness Score</p>
          </div>
          <Badge variant="coral" size="sm">Live Rankings</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2333" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B0D14',
                  borderColor: '#FF336640',
                  borderRadius: '12px',
                  color: '#F8FAFC',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="readiness" 
                name="Readiness %" 
                fill="#FF3366" 
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* FULL RANKINGS LIST */}
      <div className="space-y-3">
        <h3 className="text-base font-display font-bold text-white mb-4">Complete Cohort Standings</h3>

        {leaderboardData.map((peer) => (
          <div
            key={peer.handle + peer.rank}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
              peer.isCurrentUser
                ? 'bg-gradient-to-r from-solar-coral/20 via-dark-900 to-dark-950 border-solar-coral shadow-lg shadow-rose-950/30'
                : 'bg-dark-900/60 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
                peer.rank === 1 ? 'bg-solar-amber text-dark-950' : peer.rank === 2 ? 'bg-slate-300 text-dark-950' : peer.rank === 3 ? 'bg-amber-600 text-white' : 'bg-dark-950 text-slate-400 border border-slate-800'
              }`}>
                {peer.rank}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-white text-sm">
                    {peer.handle}
                  </span>
                  {peer.isCurrentUser && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-solar-coral text-white font-semibold">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                  <span>{peer.tasksCompleted || 12} tasks done</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-solar-amber">
                    <Flame className="w-3 h-3" /> {peer.streak}d streak
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold font-mono text-white">
                {peer.readiness}%
              </div>
              <div className="text-[10px] text-slate-400">Readiness</div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Handle Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-dark-900 border border-solar-coral/30 shadow-2xl"
          >
            <h3 className="text-lg font-display font-bold text-white mb-1">Set Leaderboard Display Handle</h3>
            <p className="text-xs text-slate-400 mb-5">Keep your identity private with a cool anonymous handle.</p>

            <form onSubmit={handleSaveHandle} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Display Handle</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">@</span>
                  <input
                    type="text"
                    value={displayHandle.replace(/^@/, '')}
                    onChange={(e) => setDisplayHandle(e.target.value)}
                    placeholder="cyber_coder"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-solar-coral"
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="solar" size="sm" type="submit">
                  Save Handle
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AppLayout>
  );
};
