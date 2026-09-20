import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Shield, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CyberParticles } from '../components/common/CyberParticles';
import { CyberTiltCard } from '../components/common/CyberTiltCard';
import { CyberTextReveal } from '../components/common/CyberTextReveal';
import { CyberRadarBadge } from '../components/common/CyberRadarBadge';
import { ParticleButton } from '../components/common/ParticleButton';
import { cyberAudio } from '../utils/cyberAudio';

export const SignupPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    cyberAudio.playClick();
    setErrorMsg('');
    setIsSubmitting(true);
    const { error } = await signInWithGoogle();
    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error);
    } else {
      cyberAudio.playSuccess();
      // New users start at onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080D] flex flex-col md:flex-row relative overflow-hidden selection:bg-gorange selection:text-black">
      {/* Dynamic Ambient Solar Embers & Kinetic Runes */}
      <CyberParticles density={30} speed={0.6} className="absolute inset-0 pointer-events-none z-0 opacity-70" />

      {/* Cyber Grid Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#FF5500 1px, transparent 1px), linear-gradient(90deg, #FF5500 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* LEFT PANEL — Brand & Value Proposition */}
      <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#1E232F]/80 bg-[#07080D]/80 backdrop-blur-md z-10">
        
        {/* Ambient Radial Solar Glow */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[350px] bg-gradient-to-tr from-gorange/15 via-solar-coral/10 to-solar-violet/10 rounded-full blur-[120px] pointer-events-none opacity-80" />

        <div className="relative z-10">
          {/* Brand Wordmark */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link to="/" className="group inline-flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-1.5 uppercase group-hover:text-white transition-colors">
                KALPA<span className="text-gorange text-2xl sm:text-3xl animate-pulse">.</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#6B7688] mt-0.5">
                CAREER INTELLIGENCE / VERIFIED CONSISTENCY
              </span>
            </Link>
          </motion.div>

          {/* System status radar badge */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <CyberRadarBadge 
              status="ONBOARDING GATEWAY" 
              node="PROD-CALIBRATE" 
              latency="21ms" 
              variant="orange" 
            />
          </motion.div>

          {/* Headline with Anime.js text reveal */}
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08] max-w-lg mb-4">
            <CyberTextReveal
              text="Create your Kalpa account."
              highlightWords={["Kalpa", "account."]}
              delay={200}
            />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-mono text-xs sm:text-sm text-[#8F9AA9] max-w-md leading-relaxed"
          >
            Join thousands of developers and tech students using AI intelligence to navigate career paths and eliminate skill gaps.
          </motion.p>

          {/* Track Badges */}
          <div className="mt-10 space-y-3 max-w-md font-mono">
            {[
              {
                text: 'Full Stack, AI, ML, Data Science, Cloud & Security tracks',
                iconColor: 'text-gorange',
                borderHover: 'hover:border-gorange/60',
              },
              {
                text: 'Personalized vertical timeline roadmap generation',
                iconColor: 'text-solar-amber',
                borderHover: 'hover:border-solar-amber/60',
              },
              {
                text: 'AI Portfolio Project Generator tailored for missing skills',
                iconColor: 'text-solar-coral',
                borderHover: 'hover:border-solar-coral/60',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={`flex items-center gap-3 text-xs text-[#A2AEBD] p-3.5 bg-[#0B0E14]/90 border border-[#1A212E] ${feature.borderHover} transition-colors group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CheckCircle2 className={`w-4 h-4 ${feature.iconColor} shrink-0`} />
                <span className="group-hover:text-white transition-colors">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="relative z-10 pt-12 font-mono text-[10px] text-[#566173] uppercase tracking-widest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>© 2026 KALPA PLATFORM</span>
            <span>•</span>
            <span className="text-emerald-500/90 flex items-center gap-1">
              <Shield className="w-3 h-3" /> SECURE FIREBASE AUTH
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-gorange/80">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Interactive 3D Signup Card */}
      <div className="md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >

          {/* Section Heading */}
          <div className="mb-6">
            <div className="font-mono text-[10px] text-gorange uppercase tracking-[0.2em] font-bold mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-gorange inline-block" />
              AUTHENTICATION GATEWAY
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Create your account<span className="text-gorange">.</span>
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

          {/* 3D Tilt Card Container */}
          <CyberTiltCard
            maxTilt={6}
            glare={true}
            corners={true}
            borderBeam={true}
            className="border border-[#1E232F] bg-[#0B0D12]/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/90"
          >
            {/* Top Laser Accent Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gorange via-solar-coral to-solar-violet shadow-[0_0_12px_#FF5500]" />

            {/* Google OAuth Particle Button */}
            <ParticleButton
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              variant="white"
              size="lg"
              className="w-full"
            >
              <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>{isSubmitting ? 'Connecting to Google...' : 'Sign up with Google'}</span>
            </ParticleButton>

            {/* Switch to Login Link & Footnote */}
            <div className="mt-8 pt-6 border-t border-[#1E232F] text-center">
              <p className="font-mono text-xs text-[#8F9AA9]">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  onMouseEnter={() => cyberAudio.playHover()}
                  data-interactive="true"
                  className="text-gorange hover:text-white font-bold transition-colors ml-1 inline-flex items-center gap-1 group"
                >
                  <span>Sign in</span>
                  <span className="transition-transform group-hover:translate-x-1">➔</span>
                </Link>
              </p>

              <p className="mt-4 font-mono text-[10px] text-[#566173] uppercase tracking-wider leading-relaxed">
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </CyberTiltCard>

        </motion.div>
      </div>
    </div>
  );
};
export default SignupPage;
