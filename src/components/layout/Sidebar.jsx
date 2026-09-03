import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Compass, 
  SearchCode, 
  Code2, 
  ClipboardCheck, 
  Settings, 
  LogOut,
  Sparkles,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/UIComponents';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { activeCareerProfile, analysisResult } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Skill Assessment', path: '/assessment', icon: ClipboardCheck },
    { name: 'Skill Gap Matrix', path: '/skill-gap', icon: Target },
    { name: 'Personalized Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Job Analyzer', path: '/job-analysis', icon: SearchCode, badge: 'AI' },
    { name: 'AI Projects', path: '/projects', icon: Code2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 glass-panel border-r border-slate-800/80 transition-transform duration-300 flex flex-col justify-between ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-md shadow-purple-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-bold text-purple-400">
                G
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-extrabold tracking-tight text-white">GTech</span>
              <span className="text-[10px] text-purple-400 font-medium tracking-wide uppercase">AI CAREER PLATFORM</span>
            </div>
          </NavLink>
        </div>

        {/* Target Career Card */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-slate-900/90 border border-purple-500/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Target Track</span>
            <Badge variant="purple" size="sm">
              {analysisResult?.readinessScore || 72}% Ready
            </Badge>
          </div>
          <p className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
            <Sparkles className="w-4 h-4 text-purple-400" />
            {activeCareerProfile?.title || 'AI Engineer'}
          </p>
          <div className="mt-2.5 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${analysisResult?.readinessScore || 72}%` }}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-current" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile & Logout Bottom Bar */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user?.displayName || 'User'}
                className="w-9 h-9 rounded-full object-cover border border-purple-500/40"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {user?.displayName ? user.displayName.charAt(0) : 'U'}
              </div>
            )}
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">{user?.displayName || 'User'}</span>
              <span className="text-[11px] text-slate-400 truncate">{user?.email || ''}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
