import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, Sparkles, ChevronRight, User, BrainCircuit, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MentorChatModal } from '../common/MentorChatModal';

export const AppLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const { activeCareerProfile, analysisResult } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex">
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header with Enhanced Effects */}
        <header className="sticky top-0 z-20 h-20 glass-panel border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur-md">
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </motion.button>

            {/* Target Career Quick Switcher Pill */}
            <motion.div 
              className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-slate-900/80 to-slate-800/60 border border-purple-500/20 rounded-xl px-3.5 py-1.5 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xs text-slate-400 font-medium">Target Track:</span>
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                {activeCareerProfile?.title || 'AI Engineer'}
              </span>
              <Link
                to="/career-selection"
                className="text-[11px] font-semibold text-slate-400 hover:text-white underline ml-1"
              >
                Change
              </Link>
            </motion.div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* AI Career Mentor Quick Launcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMentorOpen(true)}
              className="flex items-center gap-2.5 gradient-solar-btn rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white transition-all shadow-md shadow-rose-950/40"
              title="Launch AI Career Mentor"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline font-display">Ask AI Mentor</span>
              <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
            </motion.button>

            {/* Career Readiness Badge Pill with Pulse */}
            <div className="flex items-center gap-2 bg-solar-coral/10 border border-solar-coral/30 rounded-xl px-3 py-1.5 shadow-[0_0_15px_rgba(255,51,102,0.1)]">
              <div className="w-2 h-2 rounded-full bg-solar-coral animate-pulse shadow-[0_0_8px_#FF3366]" />
              <span className="text-xs font-semibold text-rose-200">
                Readiness: <span className="text-white font-extrabold font-mono">{analysisResult?.readinessScore || 72}%</span>
              </span>
            </div>

            {/* Notifications Button with Badge */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Notifications"
                className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </motion.button>
            </div>

            {/* User Profile Quick Link */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full object-cover border-2 border-purple-500/40" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {user?.displayName ? user.displayName.charAt(0) : 'U'}
                  </div>
                )}
                <span className="hidden md:inline text-xs font-semibold text-slate-200 pr-1 truncate max-w-[120px]">
                  {user?.displayName?.split(' ')[0] || 'User'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page Body Container with Framer Motion Transition */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* AI Career Mentor Modal */}
      <MentorChatModal isOpen={isMentorOpen} onClose={() => setIsMentorOpen(false)} />
    </div>
  );
};