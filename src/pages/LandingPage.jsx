import React from 'react';
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
  FolderGit2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/common/Navbar';
import { Button, Card, Badge } from '../components/common/UIComponents';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const floatingCards = [
    { title: 'Python Mastery', score: '88%', status: 'Strong', color: 'purple', delay: 0 },
    { title: 'Machine Learning', score: '42%', status: 'Gap Alert', color: 'rose', delay: 0.5 },
    { title: 'Deep Learning', score: '28%', status: 'Critical Gap', color: 'rose', delay: 1 },
    { title: 'LLM RAG Apps', score: '65%', status: 'Developing', color: 'cyan', delay: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Subtle grid pattern backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Ambient lighting glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 mb-8 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              GTech AI Career Intelligence Platform
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.1]"
          >
            Build the career you're <span className="gradient-text">actually ready for.</span>
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
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto text-base font-display"
            >
              Start Your Career Analysis
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('workflow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base font-display"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Hero Visual Mockup & Floating Skill Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-5xl mx-auto relative rounded-2xl glass-panel p-3 border border-purple-500/20 shadow-2xl"
          >
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-6 sm:p-8 text-left relative">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-500">gtech.ai/dashboard</span>
                </div>
                <Badge variant="purple" size="sm" className="font-display">Target Track: AI Engineer (72% Ready)</Badge>
              </div>

              {/* Demo Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400">Career Readiness</div>
                  <div className="text-2xl font-bold text-white font-mono mt-1">72%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-500 h-full w-[72%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400">Skills Mastered</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">12 / 20</div>
                  <div className="text-[11px] text-slate-400 mt-1">Python, SQL, Git, OOP</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400">Roadmap Progress</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">38%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Phase 3 Active</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400">Projects Done</div>
                  <div className="text-2xl font-bold text-purple-300 font-mono mt-1">3 Projects</div>
                  <div className="text-[11px] text-slate-400 mt-1">Student ML, RAG App</div>
                </div>
              </div>

              {/* Interactive Skill Gap Row */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-300">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">AI Career Mentor Recommendation</h4>
                    <p className="text-xs text-slate-300">Your biggest current gap is Machine Learning. Completing 3 roadmap milestones will boost readiness +18%.</p>
                  </div>
                </div>
                <Button variant="glow" size="sm" onClick={() => navigate('/roadmap')} className="shrink-0">
                  View Milestone →
                </Button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="workflow" className="py-24 border-t border-b border-slate-800/60 bg-slate-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="cyan" size="md" className="mb-4 uppercase tracking-wider font-display">
            HOW IT WORKS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            5 Steps to Become Job Ready
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-2xl mx-auto">
            A precise AI pipeline that takes you from where you are to your dream tech offer.
          </p>

          {/* 5-Step Pipeline */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative text-left">
            
            <Card hover className="p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-display font-extrabold text-purple-500/50 block mb-3 font-mono">01</span>
                <h3 className="text-lg font-bold text-white font-display mb-1">Build Your Profile</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Input degree, major, current skills, languages, and target track.
                </p>
              </div>
            </Card>

            <Card hover className="p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-display font-extrabold text-indigo-500/50 block mb-3 font-mono">02</span>
                <h3 className="text-lg font-bold text-white font-display mb-1">Assess Your Skills</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete 10-question baseline technical foundations evaluation.
                </p>
              </div>
            </Card>

            <Card hover className="p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-display font-extrabold text-rose-500/50 block mb-3 font-mono">03</span>
                <h3 className="text-lg font-bold text-white font-display mb-1">AI Finds Your Gaps</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Get quantified readiness score and critical prerequisite gaps.
                </p>
              </div>
            </Card>

            <Card hover className="p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-display font-extrabold text-amber-500/50 block mb-3 font-mono">04</span>
                <h3 className="text-lg font-bold text-white font-display mb-1">Follow Your Roadmap</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Execute custom vertical timeline with courses & milestones.
                </p>
              </div>
            </Card>

            <Card hover className="p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-3xl font-display font-extrabold text-emerald-500/50 block mb-3 font-mono">05</span>
                <h3 className="text-lg font-bold text-white font-display mb-1">Become Job Ready</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Build AI projects and parse target job descriptions to land offers.
                </p>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="purple" size="md" className="mb-4 uppercase tracking-wider font-display">
              FEATURES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Engineered for high-growth tech careers
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Six core AI features that eliminate ambiguity and accelerate your trajectory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">1. AI Skill Gap Analysis</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Objective baseline measuring current vs target role criteria across ML, statistics, and engineering.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">2. Career Matching</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Benchmark against real tech tracks (Full Stack, AI, ML, Data Science, Cloud, Security) with salary data.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5">
                <SearchCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">3. Job Description Analyzer</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Paste any live job posting to calculate match score %, extract missing skills, and auto-inject roadmap steps.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">4. Personalized Roadmaps</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Dynamic vertical timeline with curated learning resources, docs, and milestone projects for every phase.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">5. AI Project Generator</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Generate resume-ready portfolio projects tailored specifically to eliminate your largest skill gaps.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">6. Job Readiness Score</h3>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                Track your quantified readiness score trend in real time as you complete milestones and projects.
              </p>
            </Card>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Build the career you're actually ready for.
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Stop guessing what skills to learn next. Let GTech navigate your path to your dream job.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
              icon={ArrowRight}
              iconPosition="right"
              className="text-base px-8 py-4 font-display"
            >
              Start Your Free Career Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 GTech. AI Career Intelligence Platform.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
