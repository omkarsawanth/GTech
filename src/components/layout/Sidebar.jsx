import React, { useState } from 'react';
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
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/UIComponents';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { activeCareerProfile, analysisResult } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Skill Assessment', path: '/assessment', icon: ClipboardCheck },
    { name: 'Skill Gap Matrix', path: '/skill-gap', icon: Target },
    { name: 'Personalized Roadmap', path: '/roadmap', icon: Compass },
    { name: 'Job Analyzer', path: '/job-analysis', icon: SearchCode, badge: 'AI' },
    { name: 'AI Projects', path: '/projects', icon: Code2 },
    ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 glass-panel border-r border-slate-800/80 transition-transform duration-300 flex flex-col justify-between ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Animated Gradient */}
        <div className="relative">
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-purple-600/30">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-bold text-purple-400 relative overflow-hidden">
                      <span className="z-10">G</span>
                      {/* Animated Sparkle */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 animate-[pulse_1s_infinite]" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    GTech <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    AI
                  </span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">PLATFORM</span>
                </div>
              </NavLink>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
            
          {/* Enhanced Target Career Card with Solar Gradient Border */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-gradient-to-br from-dark-900/90 via-dark-850 to-dark-800/80 border border-solar-coral/25 shadow-lg shadow-rose-950/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Target Track</span>
              <Badge variant="coral" size="sm" className="animate-pulse">
                {analysisResult?.readinessScore || 72}% Ready
              </Badge>
            </div>
            <motion.div 
              className="flex items-center gap-2 text-sm font-bold text-white font-display"
              whileHover={{ x: 3 }}
            >
              <Sparkles className="w-4 h-4 text-solar-amber shrink-0" />
              <span className="truncate">{activeCareerProfile?.title || 'AI Engineer'}</span>
            </motion.div>
            
            {/* Animated Solar Progress Bar */}
            <div className="mt-3 w-full bg-dark-950 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/5">
              <motion.div
                className="bg-gradient-to-r from-solar-coral via-solar-amber to-solar-violet h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisResult?.readinessScore || 72}%` }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{ width: `${analysisResult?.readinessScore || 72}%` }}
              />
            </div>
          </div>

          {/* Navigation Links with Solar Hover Effects */}
          <nav className="px-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-solar-coral/20 via-solar-amber/10 to-transparent text-rose-200 border-l-2 border-solar-coral shadow-[0_0_15px_rgba(255,51,102,0.15)] font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-current transition-transform duration-200 group-hover:scale-110 group-hover:text-solar-coral" />
                    <span className="relative">
                      <span>{item.name}</span>
                    </span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-solar-coral/20 text-rose-300 border border-solar-coral/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Quick Actions Divider */}
        <div className="px-3">
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800/60"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-xs text-slate-500 font-medium uppercase tracking-wider">
                Quick Actions
              </span>
            </div>
          </div>
        </div>

        {/* User Profile & Logout Bottom Bar */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={user.photoURL}
                    alt={user?.displayName || 'User'}
                    className="w-9 h-9 rounded-full object-cover border-2 border-purple-500/40 shadow-md"
                  />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md"
                >
                  {user?.displayName ? user.displayName.charAt(0) : 'U'}
                </motion.div>
              )}
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white truncate transition-all duration-200">
                  {user?.displayName || 'User'}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {user?.email || ''}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 63, 94, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              title="Log Out"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Import X for mobile menu close button
import { X } from 'lucide-react';