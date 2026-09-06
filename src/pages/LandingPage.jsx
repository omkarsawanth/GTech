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
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 opacity-80" />
        
        {/* Floating Gradient Orbs */}
        <GradientOrb size={600} top="10%" left="5%" color="purple" blur="blur-3xl" />
        <GradientOrb size={400} top="60%" right="10%" color="cyan" blur="blur-2xl" />
        <GradientOrb size={300} bottom="20%" left="20%" color="indigo" blur="blur-xl" />

        {/* Subtle grid pattern backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Mouse Tracking Glow */}
        <div 
          className="absolute pointer-events-none -z-5 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl transition-all duration-200 ease-out"
          style={{
            left: cursorX - 150,
            top: cursorY - 150,
            opacity: 0.3,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Hero Badge with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 mb-8 shadow-md hover:shadow-xl transition-shadow"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              GTech AI Career Intelligence Platform
            </span>
          </motion.div>

          {/* Main Headline with 3D Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 15, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.1] transform-gpu"
            style={{
              perspective: 1000,
            }}
          >
            Build the career you're <span className="gradient-text inline-block">actually ready for.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            GTech analyzes your skills, identifies your gaps, and builds a personalized AI-powered roadmap to your target career.
          </motion.p>

          {/* Primary / Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              className="w-full sm:w-auto text-base font-display group relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Career Analysis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 opacity-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('workflow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base font-display group"
            >
              See How It Works
              <div className="ml-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
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

            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-6 sm:p-8 text-left relative">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-2 text-xs font-mono text-slate-500">gtech.ai/dashboard</span>
                </div>
                <Badge variant="purple" size="sm" className="font-display animate-pulse">
                  Target Track: AI Engineer (72% Ready)
                </Badge>
              </div>

              {/* Demo Stats with Animated Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <motion.div 
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 group cursor-pointer hover:scale-[1.02] transition-transform"
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
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="bg-purple-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 group cursor-pointer hover:scale-[1.02] transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Skills Mastered</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                    12<span className="text-slate-500 text-sm"> / 20</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Python, SQL, Git, OOP</div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 group cursor-pointer hover:scale-[1.02] transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Roadmap Progress</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
                    38<span className="text-slate-500 text-sm">%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Phase 3 Active</div>
                </motion.div>

                <motion.div 
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 group cursor-pointer hover:scale-[1.02] transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-xs text-slate-400">Projects Done</div>
                  <div className="text-2xl font-bold text-purple-300 font-mono mt-1">
                    3 
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Student ML, RAG App</div>
                </motion.div>
              </div>

              {/* Interactive Skill Gap Row */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:backdrop-blur-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-300 animate-pulse">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">AI Career Mentor Recommendation</h4>
                    <p className="text-xs text-slate-300">Your biggest current gap is Machine Learning. Completing 3 roadmap milestones will boost readiness +18%.</p>
                  </div>
                </div>
                <Button variant="glow" size="sm" onClick={() => navigate('/roadmap')} className="shrink-0 group">
                  View Milestone
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="workflow" className="py-24 border-t border-b border-slate-800/60 bg-slate-950/60 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="cyan" size="md" className="mb-4 uppercase tracking-wider font-display animate-bounce">
            HOW IT WORKS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            5 Steps to Become Job Ready
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
            A precise AI pipeline that takes you from where you are to your dream tech offer.
          </p>

          {/* 5-Step Pipeline with Enhanced Cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              { step: 1, title: 'Build Your Profile', desc: 'Input degree, major, current skills, languages, and target track.', color: 'purple' },
              { step: 2, title: 'Assess Your Skills', desc: 'Complete 10-question baseline technical foundations evaluation.', color: 'cyan' },
              { step: 3, title: 'AI Finds Your Gaps', desc: 'Get quantified readiness score and critical prerequisite gaps.', color: 'rose' },
              { step: 4, title: 'Follow Your Roadmap', desc: 'Execute custom vertical timeline with courses & milestones.', color: 'amber' },
              { step: 5, title: 'Become Job Ready', desc: 'Build AI projects and parse target job descriptions to land offers.', color: 'emerald' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="text-center">
                    <motion.div 
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white font-mono mb-4"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `linear-gradient(135deg, hsl(270, 85%, 50%), hsl(${item.color === 'purple' ? '270' : item.color === 'cyan' ? '200' : item.color === 'rose' ? '340' : item.color === 'amber' ? '40' : '150'}, 85%, 50%))`
                      }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-lg font-bold text-white font-display mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  
                  <div className="mt-4 absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full filter blur-xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/20 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="purple" size="md" className="mb-4 uppercase tracking-wider font-display animate-fade-in">
              FEATURES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Engineered for high-growth tech careers
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Six core AI features that eliminate ambiguity and accelerate your trajectory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0px 25px 50px -12px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Card hover className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display mb-4 text-left">{feature.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-slate-400">AI-Powered</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA with Enhanced Effects */}
      <section className="py-20 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Build the career you're actually ready for.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 text-lg"
          >
            Stop guessing what skills to learn next. Let GTech navigate your path to your dream job.
          </motion.p>
          <div className="mt-8 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="glow"
                size="lg"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                className="text-base px-8 py-4 font-display group relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Free Career Analysis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 opacity-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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