import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, Sparkles, ChevronRight, User, BrainCircuit } from 'lucide-react';
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
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-20 glass-panel border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between backdrop-blur-md">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Target Career Quick Switcher Pill */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-1.5">
              <span className="text-xs text-slate-400 font-medium">Target Track:</span>
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {activeCareerProfile?.title || 'AI Engineer'}
              </span>
              <Link
                to="/career-selection"
                className="text-[11px] font-semibold text-slate-400 hover:text-white underline ml-1"
              >
                Change
              </Link>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* AI Career Mentor Quick Launcher */}
            <button
              onClick={() => setIsMentorOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-cyan-500/20 border border-purple-500/40 hover:border-purple-400 rounded-xl px-3 py-1.5 text-xs font-semibold text-purple-200 hover:text-white transition-all shadow-sm"
              title="Launch AI Career Mentor"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Ask AI Mentor</span>
            </button>

            {/* Career Readiness Badge Pill */}
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-xl px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-purple-200">
                Readiness: <span className="text-white font-extrabold font-mono">{analysisResult?.readinessScore || 72}%</span>
              </span>
            </div>

            {/* Notifications Button */}
            <button
              title="Notifications"
              className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500" />
            </button>

            {/* User Profile Quick Link */}
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-lg object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {user?.displayName ? user.displayName.charAt(0) : 'U'}
                </div>
              )}
              <span className="hidden md:inline text-xs font-semibold text-slate-200 pr-1 truncate max-w-[120px]">
                {user?.displayName?.split(' ')[0] || 'User'}
              </span>
            </button>

          </div>
        </header>

        {/* Page Body Container with Framer Motion Transition */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
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
