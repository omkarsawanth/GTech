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
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 glass-panel border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with 3D Effect */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-purple-400 text-lg">G</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
                GTech <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  AI PLATFORM
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">AI Career Intelligence</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => handleNavClick('workflow')}
              className="hover:text-purple-400 transition-colors relative py-2 px-3 rounded-full hover:bg-purple-500/10"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('features')}
              className="hover:text-purple-400 transition-colors relative py-2 px-3 rounded-full hover:bg-purple-500/10"
            >
              Features
            </button>
            <Link 
              to="/career-selection" 
              className="hover:text-purple-400 transition-colors relative py-2 px-3 rounded-full hover:bg-purple-500/10"
            >
              Careers
            </Link>
            <Link 
              to="/job-analysis" 
              className="hover:text-purple-400 transition-colors flex items-center gap-1 relative py-2 px-3 rounded-full hover:bg-purple-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Job Parser
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="glow"
                  size="md"
                  onClick={() => navigate('/dashboard')}
                  className="group"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Go to Dashboard
                </Button>
                <div className="h-8 w-px bg-slate-700/60 mx-2" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/settings')}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/signup')}
                  className="group"
                >
                  Start Career Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
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
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-slate-800 px-4 pt-4 pb-6 space-y-3"
          >
            <button
              onClick={() => handleNavClick('workflow')}
              className="block text-left w-full text-base font-medium text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-800/60"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="block text-left w-full text-base font-medium text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-800/60"
            >
              Features
            </button>
            <Link
              to="/job-analysis"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-800/60"
            >
              Job Description Parser
            </Link>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Button variant="glow" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>
                    Go to Dashboard
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/settings'); }}>
                    Account Settings
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
                    Sign In
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}>
                    Start Career Analysis
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};