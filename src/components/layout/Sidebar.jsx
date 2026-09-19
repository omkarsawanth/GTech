import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Compass, 
  SearchCode, 
  FolderGit2, 
  ClipboardCheck, 
  Settings, 
  LogOut,
  User,
  Trophy,
  MessageSquare,
  Sparkles,
  Users,
  X,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen, onOpenMentor }) => {
  const { activeCareerProfile, analysisResult } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Two distinct tiers: Daily Habit Loop (prominent) vs Tools & Reference (secondary)
  const dailyNavItems = [
    { code: '01', name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { code: '02', name: 'Roadmap', path: '/roadmap', icon: Compass },
    { code: '03', name: 'Squad Rooms', path: '/squad', icon: Users },
  ];

  const toolsNavItems = [
    { code: '04', name: 'Careers', path: '/career-selection', icon: Target },
    { code: '05', name: 'Skills & Gaps', path: '/skill-gap', icon: Target },
    { code: '06', name: 'Assessment', path: '/assessment', icon: ClipboardCheck },
    { code: '07', name: 'Job Analyzer', path: '/job-analysis', icon: SearchCode },
    { code: '08', name: 'Evidence & Projects', path: '/projects', icon: FolderGit2 },
    { code: '09', name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#08090E] border-r border-[#1E232F] transition-transform duration-300 flex flex-col justify-between ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand & Directory Header */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1E232F] shrink-0">
            <NavLink to="/" className="group flex flex-col">
              <span className="font-display font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                KALPA<span className="text-gorange">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#6B7688]">
                CAREER INTELLIGENCE
              </span>
            </NavLink>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-[#8F9AA9] hover:text-white lg:hidden border border-[#1E232F]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Career Readout Tile */}
          <div className="p-4 mx-3 my-3 bg-[#0B0D12] border border-[#1E232F] shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7688] uppercase tracking-wider mb-1.5">
              <span>TARGET ROLE</span>
              <span className="text-gorange font-bold font-mono">
                {analysisResult?.readinessScore || 64}% READY
              </span>
            </div>
            <div className="font-display font-bold text-sm text-white truncate">
              {activeCareerProfile?.title || 'Software Engineer'}
            </div>
            <div className="mt-2.5 w-full bg-[#161B24] h-1 border border-[#1E232F]">
              <div
                className="bg-gorange h-full transition-all duration-500"
                style={{ width: `${analysisResult?.readinessScore || 64}%` }}
              />
            </div>
          </div>

          {/* Scrollable Navigation Area */}
          <nav className="px-3 flex-1 overflow-y-auto space-y-4 pr-2 select-none">
            {/* TIER 1: DAILY HABIT LOOP (Top, visually prominent) */}
            <div>
              <div className="px-3 pt-1 pb-2 font-mono text-[9px] text-gorange tracking-[0.22em] uppercase font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gorange rounded-full animate-pulse shadow-sm shadow-gorange/80" />
                  DAILY ROUTINE
                </span>
                <span className="text-[8px] text-gorange/60 font-mono">CORE LOOP</span>
              </div>

              <div className="space-y-1">
                {dailyNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 text-xs font-mono tracking-wider transition-all border ${
                        isActive
                          ? 'bg-gradient-to-r from-[#17120C] to-[#0E121A] text-white border-gorange/50 border-l-2 border-l-gorange font-bold shadow-md shadow-black/40'
                          : 'bg-[#0B0E14]/70 text-[#A2AEBD] border-[#1A212E] hover:text-white hover:border-[#2C374A] hover:bg-[#111622]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[10px] text-gorange/80 font-mono font-bold">{item.code}</span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <item.icon className="w-4 h-4 text-gorange/90 shrink-0" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* TIER 2: TOOLS & REFERENCE (Secondary, muted reference tools) */}
            <div>
              <div className="px-3 pt-1 pb-2 font-mono text-[9px] text-[#5D6B7F] tracking-[0.22em] uppercase font-semibold flex items-center justify-between border-t border-[#181E29] pt-3">
                <span>ANALYSIS & TOOLS</span>
                <span className="text-[8px] text-[#414B5A] font-mono">ON DEMAND</span>
              </div>

              <div className="space-y-0.5">
                {toolsNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all border ${
                        isActive
                          ? 'bg-[#10141D] text-white border-[#273042] border-l-2 border-l-[#8F9AA9] font-bold'
                          : 'bg-transparent text-[#6E7B8C] border-transparent hover:text-slate-200 hover:bg-[#0C0F16]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[9px] text-[#454F5E] font-normal">{item.code}</span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <item.icon className="w-3.5 h-3.5 text-[#566173] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* AI Career Mentor Launcher Button */}
            {onOpenMentor && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenMentor();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono tracking-wider text-gorange bg-gorange/5 border border-gorange/30 hover:bg-gorange/10 hover:border-gorange/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Mentor</span>
                  </div>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 bg-gorange/20 text-gorange">LIVE</span>
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom Profile & Logout Bar */}
        <div className="p-4 border-t border-[#1E232F] bg-[#07080D]">
          <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#6B7688] uppercase tracking-wider">
            <span>ACCOUNT</span>
            <div className="flex items-center gap-2">
              <NavLink to="/profile" className="hover:text-white transition-colors">PROFILE</NavLink>
              <span>•</span>
              <NavLink to="/settings" className="hover:text-white transition-colors">SETTINGS</NavLink>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate max-w-[170px]">
              <div className="w-7 h-7 bg-[#141822] border border-[#2B3242] flex items-center justify-center font-mono font-bold text-xs text-white shrink-0">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <div className="text-xs text-white truncate font-medium">
                  {user?.displayName || 'Student'}
                </div>
                <div className="text-[10px] text-[#566173] font-mono truncate">
                  {user?.email || 'authenticated'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-[#6B7688] hover:text-white hover:bg-[#141822] border border-transparent hover:border-[#2B3242] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};