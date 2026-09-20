import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Sparkles, ArrowRight, User, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MentorChatModal } from '../common/MentorChatModal';
import { CyberParticles } from '../common/CyberParticles';
import { cyberAudio } from '../../utils/cyberAudio';

export const AppLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => cyberAudio.getMuted());
  const { activeCareerProfile, analysisResult } = useApp();
  const { user } = useAuth();

  const handleToggleMute = () => {
    const muted = cyberAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      cyberAudio.playClick();
    }
  };

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
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-[#8F9AA9] hover:text-white lg:hidden border border-[#1E232F] bg-[#0B0D12] shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs truncate">
              <span className="text-[#6B7688] hidden sm:inline uppercase">CAREER /</span>
              <span className="text-white font-bold tracking-tight truncate">
                {activeCareerProfile?.title || 'Software Engineer'}
              </span>
              <Link
                to="/career-selection"
                className="hidden sm:inline-flex text-[10px] text-gorange hover:underline font-bold uppercase tracking-wider ml-1 items-center gap-0.5 shrink-0"
              >
                <span>CHANGE</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* Center: System Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#6B7688] tracking-widest uppercase">
            <span>KALPA</span>
            <span>/</span>
            <span className="text-white">COMMAND CENTER</span>
          </div>

          {/* Right: Readiness score & Profile action */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Sound Effects Toggle Button */}
            <button
              onClick={handleToggleMute}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`hidden sm:flex p-1.5 border transition-colors ${
                isMuted 
                  ? 'text-[#6B7688] border-[#1E232F] bg-[#0B0D12] hover:text-white' 
                  : 'text-gorange border-gorange/40 bg-gorange/10 shadow-[0_0_8px_rgba(255,85,0,0.2)]'
              }`}
              title={isMuted ? 'Unmute Cyber Sound FX' : 'Mute Sound FX'}
              aria-label={isMuted ? 'Unmute Cyber Sound FX' : 'Mute Sound FX'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            </button>

            {/* AI Mentor launcher */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setIsMentorOpen(true);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gorange border border-gorange/40 bg-gorange/5 hover:bg-gorange/10 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Mentor</span>
            </button>

            {/* Readiness Readout */}
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs px-2.5 sm:px-3 py-1.5 bg-[#0D1017] border border-[#1E232F]">
              <span className="text-[#6B7688] hidden sm:inline uppercase text-[10px]">READINESS:</span>
              <span className="text-gorange font-bold">
                {analysisResult?.readinessScore || 64}%
              </span>
            </div>

            {/* Profile Avatar link */}
            <Link
              to="/profile"
              className="w-7 h-7 bg-[#141822] border border-[#2B3242] flex items-center justify-center text-xs font-mono font-bold text-white hover:border-gorange transition-colors shrink-0"
              title="My Profile"
            >
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-16 relative">
          {/* Subtle Ambient Particle Field */}
          <CyberParticles density={16} speed={0.4} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* AI Mentor Modal */}
      {isMentorOpen && (
        <MentorChatModal isOpen={isMentorOpen} onClose={() => setIsMentorOpen(false)} />
      )}
    </div>
  );
};