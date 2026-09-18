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
  X,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen, onOpenMentor }) => {
  const { activeCareerProfile, analysisResult } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { code: '01', name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { code: '02', name: 'Careers', path: '/career-selection', icon: Target },
    { code: '03', name: 'Skills & Gaps', path: '/skill-gap', icon: Target },
    { code: '04', name: 'Assessment', path: '/assessment', icon: ClipboardCheck },
    { code: '05', name: 'Roadmap', path: '/roadmap', icon: Compass },
    { code: '06', name: 'Job Analyzer', path: '/job-analysis', icon: SearchCode },
    { code: '07', name: 'Evidence & Projects', path: '/projects', icon: FolderGit2 },
    { code: '08', name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { code: '09', name: 'Chat Onboarding', path: '/onboarding', icon: MessageSquare },
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
        <div>
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1E232F]">
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
          <div className="p-4 mx-3 my-4 bg-[#0B0D12] border border-[#1E232F]">
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

          {/* Navigation Links */}
          <nav className="px-3 space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-xs font-mono tracking-wider transition-all select-none border ${
                    isActive
                      ? 'bg-[#10131A] text-white border-[#2B3242] border-l-2 border-l-gorange font-bold'
                      : 'bg-transparent text-[#8F9AA9] border-transparent hover:text-white hover:bg-[#0E1118]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-[10px] text-[#566173] font-normal">{item.code}</span>
                  <span className="truncate">{item.name}</span>
                </div>
                <item.icon className="w-3.5 h-3.5 text-[#566173] shrink-0" />
              </NavLink>
            ))}

            {/* AI Career Mentor Launcher Button */}
            {onOpenMentor && (
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenMentor();
                }}
                className="w-full mt-2 flex items-center justify-between px-3 py-2 text-xs font-mono tracking-wider text-gorange bg-gorange/5 border border-gorange/30 hover:bg-gorange/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gorange/60">10</span>
                  <span>AI Mentor</span>
                </div>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
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