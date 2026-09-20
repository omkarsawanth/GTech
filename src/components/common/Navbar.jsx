import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  UserCheck, 
  LayoutDashboard 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge } from './UIComponents';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-[#060709]/95 backdrop-blur-md border-b border-[#1E232F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Editorial Wordmark */}
          <Link to="/" className="flex items-baseline gap-3 group">
            <span className="font-display font-extrabold text-2xl tracking-tighter text-white uppercase">
              Kalpa<span className="text-gorange text-2xl">.</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-[#6B7688] uppercase">
              Career Intelligence / 2026
            </span>
          </Link>

<div className="hidden lg:flex items-center gap-10 font-mono text-xs tracking-wider uppercase text-[#8F9AA9]">
  <button
    onClick={() => handleNavClick('story-where')}
    className="hover:text-white transition-colors flex items-center gap-2 group"
  >
    <span className="text-[#4E5664] group-hover:text-gorange transition-colors">01</span>
    <span>INDEX</span>
  </button>
  <button
    onClick={() => handleNavClick('story-target')}
    className="hover:text-white transition-colors flex items-center gap-2 group"
  >
    <span className="text-[#4E5664] group-hover:text-gorange transition-colors">02</span>
    <span>CAREERS</span>
  </button>
  <button
    onClick={() => handleNavClick('story-gaps')}
    className="hover:text-white transition-colors flex items-center gap-2 group"
  >
    <span className="text-[#4E5664] group-hover:text-gorange transition-colors">03</span>
    <span>SKILLS</span>
  </button>
  <button
    onClick={() => handleNavClick('story-readiness')}
    className="hover:text-white transition-colors flex items-center gap-2 group"
  >
    <span className="text-[#4E5664] group-hover:text-gorange transition-colors">04</span>
    <span>READINESS</span>
  </button>
</div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 bg-white text-black font-semibold hover:bg-[#E4E7EC] transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="font-mono text-xs tracking-widest uppercase text-[#8F9AA9] hover:text-white transition-colors"
                >
                  Settings
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-mono text-xs tracking-widest uppercase text-[#8F9AA9] hover:text-white transition-colors px-2 py-1"
                >
                  Log In
                </Link>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 bg-gorange text-black font-bold hover:bg-[#FF6D24] transition-all flex items-center gap-2"
                >
                  <span>Launch Kalpa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gorange transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0B0D12] border-b border-[#1E232F] px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider text-[#A0AABA]">
              <button 
                onClick={() => handleNavClick('story-where')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-[#1E232F]"
              >
                <span>01 — Where Are You</span>
                <span className="text-gorange">→</span>
              </button>
              <button 
                onClick={() => handleNavClick('story-target')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-[#1E232F]"
              >
                <span>02 — Career Explorer</span>
                <span className="text-gorange">→</span>
              </button>
              <button 
                onClick={() => handleNavClick('story-gaps')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-[#1E232F]"
              >
                <span>03 — Skills & Gaps</span>
                <span className="text-gorange">→</span>
              </button>
              <button 
                onClick={() => handleNavClick('story-actions')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-[#1E232F]"
              >
                <span>04 — Next Actions</span>
                <span className="text-gorange">→</span>
              </button>
              <button 
                onClick={() => handleNavClick('story-readiness')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-[#1E232F]"
              >
                <span>05 — Readiness</span>
                <span className="text-gorange">→</span>
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full py-3 bg-gorange text-black font-mono text-xs uppercase font-bold tracking-widest text-center"
              >
                Launch Kalpa
              </button>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="w-full py-2.5 border border-[#2B3242] text-white font-mono text-xs uppercase tracking-widest text-center block"
                >
                  Log In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};