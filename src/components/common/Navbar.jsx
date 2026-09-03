import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Compass, Menu, X, ArrowRight, UserCheck, LayoutDashboard } from 'lucide-react';
import { Button, Badge } from './UIComponents';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

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
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-purple-400 text-lg">G</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
                GTech <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 font-sans">AI PLATFORM</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">AI Career Intelligence</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => handleNavClick('workflow')} className="hover:text-purple-400 transition-colors">
              How It Works
            </button>
            <button onClick={() => handleNavClick('features')} className="hover:text-purple-400 transition-colors">
              Features
            </button>
            <Link to="/career-selection" className="hover:text-purple-400 transition-colors">
              Careers
            </Link>
            <Link to="/job-analysis" className="hover:text-purple-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Job Parser
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                variant="glow"
                size="md"
                onClick={() => navigate('/dashboard')}
                icon={LayoutDashboard}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2">
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/signup')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Career Analysis
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('workflow')}
            className="block text-left w-full text-base font-medium text-slate-300 hover:text-white py-2"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="block text-left w-full text-base font-medium text-slate-300 hover:text-white py-2"
          >
            Features
          </button>
          <Link
            to="/job-analysis"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-2"
          >
            Job Description Parser
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {isAuthenticated ? (
              <Button variant="glow" className="w-full" onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}>
                Go to Dashboard
              </Button>
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
        </div>
      )}
    </nav>
  );
};
