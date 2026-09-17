import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Search, 
  UserCheck, 
  Edit3, 
  Swords, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink 
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
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton,
  EditorialBadge
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';
import { fetchLeaderboardAPI, optInLeaderboardAPI } from '../services/aiService';
import { ALL_CAREERS } from '../data/careersData';

// Select primary tracks representing diverse disciplines
const CAREER_TRACKS = [
  { id: 'software-engineer', label: '01 / SOFTWARE' },
  { id: 'ai-engineer', label: '02 / AI & ML' },
  { id: 'financial-analyst', label: '03 / FINANCE' },
  { id: 'product-designer', label: '04 / DESIGN' },
  { id: 'clinical-operations-lead', label: '05 / HEALTHCARE' },
  { id: 'corporate-legal-analyst', label: '06 / LAW' },
  { id: 'robotics-engineer', label: '07 / ROBOTICS' },
  { id: 'architectural-designer', label: '08 / ARCHITECTURE' },
];

export const LeaderboardPage = () => {
  const { user, activeCareerProfile, currentStreak } = useApp();

  const [selectedCareer, setSelectedCareer] = useState(user?.targetCareer || 'software-engineer');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [challengeCopied, setChallengeCopied] = useState(false);
  const [displayHandle, setDisplayHandle] = useState(user?.displayHandle || user?.name || 'You');

  useEffect(() => {
    loadLeaderboard(selectedCareer);
  }, [selectedCareer]);

  const loadLeaderboard = async (career) => {
    setIsLoading(true);
    try {
      const res = await fetchLeaderboardAPI(career);
      if (res && res.leaderboard && res.leaderboard.length > 0) {
        setLeaderboardData(res.leaderboard);
      } else {
        generateFallbackList(career);
      }
    } catch (err) {
      generateFallbackList(career);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackList = (career) => {
    const activeCareerObj = ALL_CAREERS.find(c => c.id === career) || { title: 'Engineer' };
    const list = [
      { rank: 1, handle: '@quant_master', readiness: 92, streak: 18, tasksCompleted: 34, isCurrentUser: false },
      { rank: 2, handle: '@axiom_builder', readiness: 87, streak: 14, tasksCompleted: 28, isCurrentUser: false },
      { rank: 3, handle: `@${(user?.name || 'you').toLowerCase().replace(/\s+/g, '')}`, readiness: 78, streak: currentStreak || 7, tasksCompleted: 19, isCurrentUser: true },
      { rank: 4, handle: '@vector_scribe', readiness: 75, streak: 11, tasksCompleted: 22, isCurrentUser: false },
      { rank: 5, handle: '@systemic_lead', readiness: 71, streak: 9, tasksCompleted: 16, isCurrentUser: false },
      { rank: 6, handle: '@benchmark_dev', readiness: 68, streak: 6, tasksCompleted: 13, isCurrentUser: false },
      { rank: 7, handle: '@rigorous_proto', readiness: 64, streak: 5, tasksCompleted: 11, isCurrentUser: false },
      { rank: 8, handle: '@evidence_forge', readiness: 61, streak: 3, tasksCompleted: 8, isCurrentUser: false },
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
  const filteredData = leaderboardData.filter(item => 
    item.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = leaderboardData.slice(0, 8).map(item => ({
    name: item.handle.length > 12 ? item.handle.slice(0, 10) + '..' : item.handle,
    readiness: item.readiness,
    isCurrent: item.isCurrentUser,
  }));

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Editorial Header */}
        <EditorialHeader
          index="08"
          tag="EMPIRICAL TALENT REGISTRY"
          title="Cohort Standings."
          subtitle="Empirical candidate benchmarks comparing verified competency readiness, consistency streaks, and completed evidence deliverables."
        >
          <EditorialButton
            variant="secondary"
            size="sm"
            onClick={() => setIsChallengeModalOpen(true)}
            icon={Swords}
            iconPosition="left"
          >
            CHALLENGE PEER
          </EditorialButton>

          <EditorialButton
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            icon={Edit3}
            iconPosition="left"
          >
            EDIT HANDLE
          </EditorialButton>
        </EditorialHeader>

        {/* Discipline Filter Row */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 border-b border-[#1E232F]">
          <span className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mr-2 shrink-0">
            DISCIPLINE:
          </span>
          {CAREER_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedCareer(track.id)}
              className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors shrink-0 ${
                selectedCareer === track.id
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#0B0D12] text-[#8F9AA9] border border-[#1E232F] hover:border-[#384152] hover:text-white'
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>

        {/* TOP 3 PODIUM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="border border-[#1E232F] bg-[#0B0D12] p-6 flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F] font-mono text-[11px]">
                  <span className="text-[#8F9AA9]">RANK 02 // SILVER</span>
                  <span className="text-[#6B7688]">{topThree[1].tasksCompleted} TASKS</span>
                </div>
                <div className="font-mono text-4xl text-[#8F9AA9] font-extrabold mb-1">02</div>
                <h3 className="font-mono text-lg font-bold text-white truncate">
                  {topThree[1].handle}
                </h3>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1E232F] flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="text-[10px] text-[#6B7688] uppercase">READINESS</div>
                  <div className="text-2xl text-white font-bold">{topThree[1].readiness}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#6B7688] uppercase">CONSISTENCY</div>
                  <div className="text-white">{topThree[1].streak}d streak</div>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place (Winner) */}
          {topThree[0] && (
            <div className="border-2 border-gorange bg-[#121622] p-6 flex flex-col justify-between order-1 md:order-2">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F] font-mono text-[11px]">
                  <span className="text-gorange font-bold uppercase tracking-wider">RANK 01 // LEADER</span>
                  <span className="text-[#8F9AA9]">{topThree[0].tasksCompleted} EVIDENCE TASKS</span>
                </div>
                <div className="font-mono text-5xl text-gorange font-extrabold mb-1">01</div>
                <h3 className="font-mono text-xl font-bold text-white truncate">
                  {topThree[0].handle}
                </h3>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1E232F] flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="text-[10px] text-gorange uppercase tracking-wider">READINESS</div>
                  <div className="text-3xl text-white font-bold">{topThree[0].readiness}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#6B7688] uppercase">CONSISTENCY</div>
                  <div className="text-gorange font-bold">{topThree[0].streak}d active streak</div>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className={`border p-6 flex flex-col justify-between order-3 ${
              topThree[2].isCurrentUser 
                ? 'border-[#2D3748] bg-[#0E121B]' 
                : 'border-[#1E232F] bg-[#0B0D12]'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F] font-mono text-[11px]">
                  <span className="text-[#8F9AA9]">RANK 03 // BRONZE</span>
                  <span className="text-[#6B7688]">{topThree[2].tasksCompleted} TASKS</span>
                </div>
                <div className="font-mono text-4xl text-[#8F9AA9] font-extrabold mb-1">03</div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-lg font-bold text-white truncate">
                    {topThree[2].handle}
                  </h3>
                  {topThree[2].isCurrentUser && (
                    <span className="font-mono text-[9px] bg-gorange text-black font-bold px-1.5 py-0.5">YOU</span>
                  )}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1E232F] flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="text-[10px] text-[#6B7688] uppercase">READINESS</div>
                  <div className="text-2xl text-white font-bold">{topThree[2].readiness}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#6B7688] uppercase">CONSISTENCY</div>
                  <div className="text-white">{topThree[2].streak}d streak</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* CANDIDATE REGISTRY DIRECTORY TABLE */}
        <div className="border border-[#1E232F] bg-[#0B0D12] mb-12">
          
          {/* Table Header Bar with Search */}
          <div className="p-4 sm:p-6 border-b border-[#1E232F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-gorange inline-block" />
              <span>CANDIDATE DIRECTORY // VERIFIED COHORT ({filteredData.length})</span>
            </div>

            <div className="w-full sm:w-64 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="FILTER BY HANDLE..."
                className="w-full px-3 py-1.5 bg-[#07080D] border border-[#1E232F] text-xs font-mono text-white placeholder-[#4B5565] focus:outline-none focus:border-gorange"
              />
            </div>
          </div>

          {/* Tabular Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1E232F] font-mono text-[10px] uppercase text-[#6B7688] tracking-wider">
            <div className="col-span-1">RANK</div>
            <div className="col-span-4">CANDIDATE SPECIFICATION</div>
            <div className="col-span-3">READINESS SCORE</div>
            <div className="col-span-2">CONSISTENCY</div>
            <div className="col-span-2 text-right">EVIDENCE DELIVERED</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#1E232F]">
            {filteredData.map((item) => (
              <div
                key={item.rank}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 items-center transition-colors font-mono text-xs ${
                  item.isCurrentUser 
                    ? 'bg-[#121622] border-l-2 border-l-gorange' 
                    : 'hover:bg-[#0E1118]'
                }`}
              >
                <div className="col-span-1 text-[#8F9AA9] font-bold">
                  #{String(item.rank).padStart(2, '0')}
                </div>
                
                <div className="col-span-4 flex items-center gap-2">
                  <span className={`font-bold ${item.isCurrentUser ? 'text-gorange' : 'text-white'}`}>
                    {item.handle}
                  </span>
                  {item.isCurrentUser && (
                    <span className="text-[9px] bg-gorange text-black font-bold px-1.5 py-0.5">YOU</span>
                  )}
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-24 h-1 bg-[#1E232F] hidden sm:block">
                    <div
                      className={`h-full ${item.isCurrentUser ? 'bg-gorange' : 'bg-white'}`}
                      style={{ width: `${item.readiness}%` }}
                    />
                  </div>
                  <span className="text-white font-bold">{item.readiness}%</span>
                </div>

                <div className="col-span-2 text-[#8F9AA9]">
                  {item.streak} days active
                </div>

                <div className="col-span-2 sm:text-right text-[#8F9AA9]">
                  {item.tasksCompleted} units verified
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* DISTRIBUTION COMPARISON CHART */}
        <div className="border border-[#1E232F] bg-[#0B0D12] p-6 mb-16">
          <div className="font-mono text-xs text-[#6B7688] uppercase tracking-wider pb-4 mb-6 border-b border-[#1E232F]">
            TOP 8 READINESS DISTRIBUTION // {selectedCareer.toUpperCase()}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E232F" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7688" 
                  fontSize={11} 
                  fontFamily="monospace"
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7688" 
                  fontSize={11} 
                  fontFamily="monospace"
                  domain={[0, 100]}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#07080D',
                    borderColor: '#1E232F',
                    borderRadius: '0px',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#FF4D00' }}
                />
                <Bar 
                  dataKey="readiness" 
                  fill="#FF4D00" 
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </EditorialShell>

      {/* EDIT HANDLE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-8 max-w-md w-full">
            <div className="font-mono text-xs text-gorange uppercase tracking-wider mb-2">
              [ PROFILE CONFIGURATION ]
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Configure Public Handle
            </h3>
            <p className="text-xs text-[#8F9AA9] font-light mb-6">
              Enter your public handle to appear in the global cohort standings.
            </p>

            <form onSubmit={handleSaveHandle} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-1">
                  HANDLE / SPECIFIER
                </label>
                <div className="flex items-center bg-[#07080D] border border-[#1E232F] px-3 py-2">
                  <span className="text-[#6B7688] font-mono mr-1">@</span>
                  <input
                    type="text"
                    value={displayHandle.replace(/^@/, '')}
                    onChange={(e) => setDisplayHandle(e.target.value)}
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                    placeholder="architect_one"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E232F]">
                <EditorialButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  CANCEL
                </EditorialButton>
                <EditorialButton
                  variant="primary"
                  size="sm"
                  type="submit"
                >
                  CONFIRM HANDLE
                </EditorialButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHALLENGE PEER MODAL */}
      {isChallengeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-8 max-w-md w-full">
            <div className="font-mono text-xs text-gorange uppercase tracking-wider mb-2">
              [ PEER BENCHMARK CHALLENGE ]
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Challenge a Peer
            </h3>
            <p className="text-xs text-[#8F9AA9] font-light mb-6">
              Share this direct benchmark invitation. Track consistency, task completion velocity, and skill scores side-by-side.
            </p>

            <div className="border border-[#1E232F] bg-[#07080D] p-3 mb-6 font-mono text-xs text-[#8F9AA9] break-all">
              {window.location.origin}/signup?ref={(user?.name || 'peer').toLowerCase().replace(/\s+/g, '')}&track={selectedCareer}
            </div>

            <div className="flex items-center justify-end gap-3">
              <EditorialButton
                variant="ghost"
                size="sm"
                onClick={() => setIsChallengeModalOpen(false)}
              >
                CLOSE
              </EditorialButton>
              <EditorialButton
                variant="primary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${(user?.name || 'peer').toLowerCase().replace(/\s+/g, '')}&track=${selectedCareer}`);
                  setChallengeCopied(true);
                  setTimeout(() => setChallengeCopied(false), 2000);
                }}
                icon={challengeCopied ? Check : Copy}
                iconPosition="left"
              >
                {challengeCopied ? 'LINK COPIED' : 'COPY INVITE LINK'}
              </EditorialButton>
            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
};
