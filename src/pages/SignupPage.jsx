import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/UIComponents';
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
    <div className="min-h-screen bg-[#07090E] flex flex-col md:flex-row relative overflow-hidden">

      {/* LEFT PANEL */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-950/60">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/15 to-indigo-500/15 rounded-full blur-3xl pointer-events-none opacity-60" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-bold text-purple-400 text-lg">
                G
              </div>
            </div>
            <span className="text-2xl font-display font-extrabold text-white tracking-tight">GTech</span>
          </Link>

          <h1 className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mt-6">
            Create your <span className="gradient-text-cyan">GTech account.</span>
          </h1>

          <p className="mt-4 text-sm text-slate-300 max-w-md leading-relaxed">
            Join thousands of developers and tech students using AI intelligence to navigate career paths and eliminate skill gaps.
          </p>

          <div className="mt-10 space-y-3 max-w-md">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Stack, AI, ML, Data Science, Cloud &amp; Security tracks</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Personalized vertical timeline roadmap generation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>AI Portfolio Project Generator tailored for missing skills</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 text-xs text-slate-500">
          © 2026 GTech AI Platform. Secured by Firebase.
        </div>
      </div>

      {/* RIGHT PANEL — Auth */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center relative">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Create your GTech account</h2>
            <p className="text-xs text-slate-400 mt-1">Start your AI-guided career transformation today</p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <Card className="p-8">
            {/* Real Google OAuth button */}
            <button
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed border border-gray-200"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              {isSubmitting ? 'Connecting to Google...' : 'Sign up with Google'}
            </button>

            <p className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </p>

            <p className="mt-4 text-center text-xs text-slate-600">
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
