import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const SignupPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    const { error } = await signInWithGoogle();
    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error);
    } else {
      // New users go to conversational onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080D] flex flex-col md:flex-row relative overflow-hidden">

      {/* LEFT PANEL — Brand & Value Proposition */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#1E232F] bg-[#07080D]/95">
        {/* Ambient Solar Flare Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[350px] bg-gradient-to-tr from-gorange/15 via-solar-coral/10 to-solar-violet/10 rounded-full blur-[120px] pointer-events-none opacity-70" />

        <div className="relative z-10">
          {/* Wordmark (Matches LandingPage and Sidebar) */}
          <div className="mb-10">
            <Link to="/" className="group inline-flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-1.5 uppercase">
                KALPA<span className="text-gorange text-2xl sm:text-3xl">.</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#6B7688] mt-0.5">
                CAREER INTELLIGENCE / VERIFIED CONSISTENCY
              </span>
            </Link>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-gorange uppercase tracking-[0.22em] font-bold mb-3 flex items-center gap-2">
            <span>[ ACCESS GATEWAY // CANDIDATE ONBOARDING ]</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08] max-w-lg">
            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gorange via-solar-coral to-solar-amber">Kalpa account.</span>
          </h1>

          <p className="mt-4 font-mono text-xs sm:text-sm text-[#8F9AA9] max-w-md leading-relaxed">
            Join thousands of developers and tech students using AI intelligence to navigate career paths and eliminate skill gaps.
          </p>

          <div className="mt-10 space-y-3 max-w-md font-mono">
            <div className="flex items-center gap-3 text-xs text-[#A2AEBD] p-3 bg-[#0B0E14]/80 border border-[#1A212E]">
              <CheckCircle2 className="w-4 h-4 text-gorange shrink-0" />
              <span>Full Stack, AI, ML, Data Science, Cloud &amp; Security tracks</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#A2AEBD] p-3 bg-[#0B0E14]/80 border border-[#1A212E]">
              <CheckCircle2 className="w-4 h-4 text-solar-amber shrink-0" />
              <span>Personalized vertical timeline roadmap generation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#A2AEBD] p-3 bg-[#0B0E14]/80 border border-[#1A212E]">
              <CheckCircle2 className="w-4 h-4 text-solar-coral shrink-0" />
              <span>AI Portfolio Project Generator tailored for missing skills</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 font-mono text-[10px] text-[#566173] uppercase tracking-widest flex items-center gap-2">
          <span>© 2026 KALPA AI PLATFORM</span>
          <span>•</span>
          <span>SECURED BY FIREBASE</span>
        </div>
      </div>

      {/* RIGHT PANEL — Authentication Card */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center relative bg-[#07080D]">
        <div className="w-full max-w-md relative z-10">

          <div className="mb-6">
            <div className="font-mono text-[10px] text-gorange uppercase tracking-[0.2em] font-bold mb-1.5">
              AUTHENTICATION GATEWAY
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Create your Kalpa account<span className="text-gorange">.</span>
            </h2>
            <p className="font-mono text-xs text-[#8F9AA9] mt-1 tracking-wide">
              Start your AI-guided career transformation today
            </p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-950/40 border border-red-800/60 font-mono text-xs text-red-300 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <div className="border border-[#1E232F] bg-[#0B0D12] p-8 sm:p-10 shadow-2xl shadow-black/80 relative">
            {/* Solar Flare Top Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gorange via-solar-coral to-transparent" />

            {/* Real Google OAuth button */}
            <button
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              type="button"
              className="w-full py-3.5 px-4 bg-white hover:bg-[#F3F4F6] text-gray-900 font-display font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-200 shadow-md shadow-black/50 hover:shadow-lg hover:shadow-gorange/10 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed border border-white"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>{isSubmitting ? 'Connecting to Google...' : 'Sign up with Google'}</span>
            </button>

            <div className="mt-8 pt-6 border-t border-[#1E232F] text-center">
              <p className="font-mono text-xs text-[#8F9AA9]">
                Already have an account?{' '}
                <Link to="/login" className="text-gorange hover:text-white font-bold transition-colors ml-1 inline-flex items-center gap-1 group">
                  <span>Sign in</span>
                  <span className="transition-transform group-hover:translate-x-0.5">➔</span>
                </Link>
              </p>

              <p className="mt-4 font-mono text-[10px] text-[#566173] uppercase tracking-wider leading-relaxed">
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
