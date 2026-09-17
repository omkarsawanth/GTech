import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Sparkles, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MentorChatModal } from '../common/MentorChatModal';

export const AppLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const { activeCareerProfile, analysisResult } = useApp();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#060709] text-[#E4E7EC] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenMentor={() => setIsMentorOpen(true)}
      />

      {/* Main Content Shell */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Editorial Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-[#08090E] border-b border-[#1E232F] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile trigger & Target Career switcher */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-[#8F9AA9] hover:text-white lg:hidden border border-[#1E232F] bg-[#0B0D12]"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#6B7688] hidden sm:inline uppercase">CAREER /</span>
              <span className="text-white font-bold tracking-tight">
                {activeCareerProfile?.title || 'Software Engineer'}
              </span>
              <Link
                to="/career-selection"
                className="text-[10px] text-gorange hover:underline font-bold uppercase tracking-wider ml-1 flex items-center gap-0.5"
              >
                <span>CHANGE</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* Center: System Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#6B7688] tracking-widest uppercase">
            <span>GTECH</span>
            <span>/</span>
            <span className="text-white">COMMAND CENTER</span>
          </div>

          {/* Right: Readiness score & Profile action */}
          <div className="flex items-center gap-4">
            {/* AI Mentor launcher */}
            <button
              onClick={() => setIsMentorOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gorange border border-gorange/40 bg-gorange/5 hover:bg-gorange/10 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Mentor</span>
            </button>

            {/* Readiness Readout */}
            <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 bg-[#0D1017] border border-[#1E232F]">
              <span className="text-[#6B7688] hidden xs:inline uppercase text-[10px]">READINESS:</span>
              <span className="text-gorange font-bold">
                {analysisResult?.readinessScore || 64}%
              </span>
            </div>

            {/* Profile Avatar link */}
            <Link
              to="/profile"
              className="w-7 h-7 bg-[#141822] border border-[#2B3242] flex items-center justify-center text-xs font-mono font-bold text-white hover:border-gorange transition-colors"
              title="My Profile"
            >
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-16">
          {children}
        </main>
      </div>

      {/* AI Mentor Modal */}
      {isMentorOpen && (
        <MentorChatModal isOpen={isMentorOpen} onClose={() => setIsMentorOpen(false)} />
      )}
    </div>
  );
};