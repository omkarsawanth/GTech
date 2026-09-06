import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  Target, 
  Compass, 
  Briefcase, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Cpu, 
  SearchCode,
  Code2,
  TrendingUp,
  FolderGit2,
  Rocket,
  Users,
  GraduationCap,
  Globe,
  Lightbulb,
  ChevronDown,
  Star
} from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import { Navbar } from '../components/common/Navbar';
import { Button, Card, Badge } from '../components/common/UIComponents';
import { useAuth } from '../context/AuthContext';

// Particle Component for Background
const Particle = ({ delay }) => {
  const [x, setX] = useState(Math.random() * window.innerWidth);
  const [y, setY] = useState(Math.random() * window.innerHeight);
  const [size] = useState(Math.random() * 4 + 2);
  const [opacity] = useState(Math.random() * 0.5 + 0.3);

  useEffect(() => {
    const moveParticle = () => {
      setX(Math.random() * window.innerWidth);
      setY(Math.random() * window.innerHeight);
    };

    const interval = setInterval(moveParticle, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 blur-sm animate-pulse"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
        animationDelay: `${delay}s`
      }}
    />
  );
};

// Gradient Orb Component
const GradientOrb = ({ size = 400, color = 'purple', top = '20%', left = '10%', blur = 'blur-3xl', animation = true }) => {
  return (
    <div
      className={`absolute ${size}px ${blur} rounded-full pointer-events-none opacity-60 ${animation ? 'animate-pulse' : ''}`}
      style={{
        top,
        left,
        background: color === 'purple' 
          ? 'radial-gradient(circle, hsl(270, 100%, 60%), transparent 70%)'
          : color === 'cyan'
          ? 'radial-gradient(circle, hsl(200, 100%, 60%), transparent 70%)'
          : 'radial-gradient(circle, hsl(300, 100%, 60%), transparent 70%)'
      }}
    />
  );
};

// Floating Skill Card Component
const FloatingSkillCard = ({ skill, delay }) => (
  <motion.div
    className="absolute rounded-xl glass-panel p-4 border border-purple-500/20 min-w-[180px]"
    style={{
      x: Math.random() * 600 - 300,
      y: Math.random() * 100 - 50,
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.7, 1, 0.7],
      scale: [0.8, 1.05, 0.8],
      y: [0, -20, 0]
    }}
    transition={{ 
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    <div className="text-xs text-slate-400 mb-1">{skill.name}</div>
    <div className="flex items-center gap-1 mb-2">
      <div className="text-xs text-slate-300">Level:</div>
      <div className="font-bold text-white text-xs">{skill.level}</div>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
        style={{ width: `${skill.progress}%` }}
      />
    </div>
  </motion.div>
);

// Animated Numbers Counter
const AnimatedNumber = ({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const start = 0;
      const end = value;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const current = Math.floor(start + (end - start) * progress);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
          setHasAnimated(true);
        }
      };

      animate();
    }
  }, [value, duration, hasAnimated]);

  return <span>{displayValue}</span>;
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const controls = useAnimation();
  const[cursorX, setCursorX] = useState(0);
  const[cursorY, setCursorY] = useState(0);
  const[showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingCards = [
    { title: 'Python Mastery', score: '88%', status: 'Strong', color: 'purple', delay: 0 },
    { title: 'Machine Learning', score: '42%', status: 'Gap Alert', color: 'rose', delay: 0.5 },
    { title: 'Deep Learning', score: '28%', status: 'Critical Gap', color: 'rose', delay: 1 },
    { title: 'LLM RAG Apps', score: '65%', status: 'Developing', color: 'cyan', delay: 1.5 },
  ];

  const features = [
    { 
      title: 'AI Skill Gap Analysis', 
      description: 'Objective baseline measuring current vs target role criteria across ML, statistics, and engineering.',
      icon: BrainCircuit,
      color: 'purple'
    },
    { 
      title: 'Career Matching', 
      description: 'Benchmark against real tech tracks (Full Stack, AI, ML, Data Science, Cloud, Security) with salary data.',
      icon: Target,
      color: 'cyan'
    },
    { 
      title: 'Job Description Analyzer', 
      description: 'Paste any live job posting to calculate match score %, extract missing skills, and auto-inject roadmap steps.',
      icon: SearchCode,
      color: 'emerald'
    },
    { 
      title: 'Personalized Roadmaps', 
      description: 'Dynamic vertical timeline with curated learning resources, docs, and milestone projects for every phase.',
      icon: Compass,
      color: 'amber'
    },
    { 
      title: 'AI Project Generator', 
      description: 'Generate resume-ready portfolio projects tailored specifically to eliminate your largest skill gaps.',
      icon: FolderGit2,
      color: 'rose'
    },
    { 
      title: 'Job Readiness Score', 
      description: 'Track your quantified readiness score trend in real time as you complete milestones and projects.',
      icon: BarChart3,
      color: 'indigo'
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      <Navbar />

      {/* Particles Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
        {/* Animated Solar Flare Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-[#0C0F1A] to-dark-950" />
        
        {/* Floating Sunset Flare Radiant Orbs */}
        <div className="absolute top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-solar-coral/25 via-solar-amber/20 to-transparent blur-[110px] pointer-events-none animate-solar-pulse" />
        <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-solar-violet/25 via-solar-purple/20 to-transparent blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[10%] left-[30%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-solar-amber/20 via-solar-rose/15 to-transparent blur-[100px] pointer-events-none animate-pulse-slow" />

        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Solar Flare Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full glass-panel border border-solar-coral/35 mb-8 shadow-lg shadow-rose-950/30 hover:border-solar-coral/60 transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-solar-amber animate-pulse" />
            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-solar-coral via-solar-amber to-solar-violet uppercase tracking-wider font-display">
              GTech Solar AI • Next-Gen Career Intelligence
            </span>
          </motion.div>

          {/* Main Headline with Solar Flare Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.08] transform-gpu"
          >
            Build the career you're <span className="gradient-text-solar inline-block drop-shadow-solar-glow">actually ready for.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            GTech pinpoints your exact skill gaps against real industry roles and builds a fiery, AI-guided execution roadmap powered by <strong className="text-white font-semibold">Gemini 3.6 Flash</strong>.
          </motion.p>

          {/* Primary / Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            <Button
              variant="solar"
              size="lg"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              className="w-full sm:w-auto text-base font-display group relative overflow-hidden"
            >
              <span className="relative z-10 font-bold">Start Your Career Analysis</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform relative z-10" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('workflow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base font-display hover:border-solar-coral/40 group"
            >
              See How It Works
              <div className="ml-2.5 w-2 h-2 bg-solar-coral rounded-full animate-pulse shadow-[0_0_8px_#FF3366]" />
            </Button>
          </motion.div>

          {/* Hero Visual Mockup & Floating Skill Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto relative rounded-2xl glass-panel p-3 border border-purple-500/20 shadow-2xl overflow-hidden"
          >
            {/* Floating Skills Preview */}
            <div className="absolute -z-10 opacity-10">
              {[...Array(6)].map((_, i) => (
                <FloatingSkillCard key={i} skill={floatingCards[i % floatingCards.length]} delay={i * 0.5} />
              ))}
            </div>

            <div className="rounded-xl overflow-hidden bg-dark-950/90 border border-solar-coral/20 p-6 sm:p-8 text-left relative shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-solar-coral/80 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-solar-amber/80 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-solar-violet/80 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2 text-xs font-mono text-slate-400">gtech.ai/command-center</span>
                </div>
                <Badge variant="coral" size="sm" className="font-display animate-pulse">
                  Target: AI Engineer (72% Ready)
                </Badge>
              </div>

              {/* Demo Stats with Animated Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <motion.div 
                  className="p-4 rounded-xl bg-dark-900/90 border border-solar-coral/20 group cursor-pointer hover:border-solar-coral/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Career Readiness</div>
                  <motion.div 
                    className="text-2xl font-bold text-white font-mono mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    72%
                  </motion.div>
                  <div className="w-full bg-dark-950 h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
                    <motion.div 
                      className="bg-gradient-to-r from-solar-coral to-solar-amber h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-dark-900/90 border border-slate-800/80 group cursor-pointer hover:border-solar-amber/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Skills Mastered</div>
                  <div className="text-2xl font-bold text-solar-amber font-mono mt-1">
                    12<span className="text-slate-500 text-sm"> / 20</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Python, SQL, Git, OOP</div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-dark-900/90 border border-slate-800/80 group cursor-pointer hover:border-solar-violet/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Roadmap Progress</div>
                  <div className="text-2xl font-bold text-solar-violet font-mono mt-1">
                    38<span className="text-slate-500 text-sm">%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Phase 3 Active</div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-dark-900/90 border border-slate-800/80 group cursor-pointer hover:border-solar-coral/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Projects Built</div>
                  <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
                    3 
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Student ML, RAG App</div>
                </motion.div>
              </div>

              {/* Interactive Skill Gap Row */}
              <div className="p-4.5 rounded-xl bg-gradient-to-r from-solar-coral/15 via-solar-amber/10 to-transparent border border-solar-coral/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-solar-coral/20 text-rose-300 animate-pulse border border-solar-coral/30 shadow-[0_0_12px_rgba(255,51,102,0.3)]">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                      AI Career Mentor Recommendation
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-solar-coral/20 text-rose-200 font-mono font-normal">Gemini</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">Your biggest current gap is Machine Learning. Completing 3 roadmap milestones will boost readiness +18%.</p>
                  </div>
                </div>
                <Button variant="solar" size="sm" onClick={() => navigate('/roadmap')} className="shrink-0 group">
                  View Milestone
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="workflow" className="py-24 border-t border-b border-slate-800/60 bg-[#090B12] relative overflow-hidden">
        {/* Animated Solar Radiant Spot */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-solar-coral via-solar-amber to-solar-violet blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="coral" size="md" className="mb-4 uppercase tracking-wider font-display">
            HOW IT WORKS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            5 Steps to Become Job Ready
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
            A precise AI pipeline that takes you from where you are to your dream tech offer.
          </p>

          {/* 5-Step Pipeline with Enhanced Solar Cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { step: 1, title: 'Build Your Profile', desc: 'Input degree, major, current skills, languages, and target track.', tag: 'Profile' },
              { step: 2, title: 'Assess Your Skills', desc: 'Complete 10-question baseline technical foundations evaluation.', tag: 'Assessment' },
              { step: 3, title: 'AI Finds Your Gaps', desc: 'Get quantified readiness score and critical prerequisite gaps.', tag: 'Analysis' },
              { step: 4, title: 'Follow Your Roadmap', desc: 'Execute custom vertical timeline with courses & milestones.', tag: 'Execution' },
              { step: 5, title: 'Become Job Ready', desc: 'Build AI projects and parse target job descriptions to land offers.', tag: 'Offer' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="p-6 relative overflow-hidden group text-left border-solar-coral/15 hover:border-solar-coral/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-solar-coral to-solar-amber text-white font-bold font-mono text-xs flex items-center justify-center shadow-[0_0_10px_rgba(255,51,102,0.35)]">
                      0{item.step}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300 font-semibold px-2 py-0.5 rounded-full bg-solar-coral/10 border border-solar-coral/20">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-solar-coral/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-solar-violet/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="amber" size="md" className="mb-4 uppercase tracking-wider font-display">
              CORE CAPABILITIES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Engineered for high-growth tech careers
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Six core AI modules that eliminate ambiguity and accelerate your trajectory to a top-tier role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Card hover className="p-7 h-full flex flex-col justify-between border-solar-coral/15 hover:border-solar-coral/50">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-solar-coral/20 to-solar-amber/20 border border-solar-coral/30 flex items-center justify-center text-solar-coral mb-5 shadow-[0_0_15px_rgba(255,51,102,0.2)]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display mb-3 text-left group-hover:text-rose-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-solar-coral animate-pulse" />
                      <span className="text-xs font-mono text-slate-400">Gemini 3.6 Flash</span>
                    </div>
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-solar-coral to-solar-amber">
                      Active
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA with Sunset Radiant Glow */}
      <section className="py-24 relative overflow-hidden text-center border-t border-slate-800/60 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-solar-coral/20 via-solar-amber/20 to-solar-violet/20 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Badge variant="coral" size="sm" className="mb-4 font-mono font-bold tracking-widest">
            READY TO LEVEL UP?
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Build the career you're <span className="gradient-text-solar">actually ready for.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Stop guessing what skills to learn next. Let GTech's real-time AI matrix navigate your exact path to a dream tech offer.
          </motion.p>
          <div className="mt-9 flex justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="solar"
                size="lg"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                className="text-base px-8 py-4 font-display font-bold shadow-xl shadow-rose-950/50"
              >
                <span className="relative z-10">Start Your Free Career Analysis</span>
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">© 2026 GTech</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">AI Career Intelligence Platform</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-all duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-all duration-200">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-all duration-200">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};