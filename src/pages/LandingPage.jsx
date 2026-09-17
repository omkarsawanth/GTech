import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Terminal, 
  Sliders, 
  Crosshair, 
  Check, 
  Minus,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  CornerDownRight
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';

// Real tech career dataset
const EDITORIAL_CAREERS = [
  {
    id: 'ai-engineer',
    code: 'ROLE.01',
    title: 'AI Engineer',
    field: 'Foundation Models / Neural Systems',
    salary: '$145,000 — $195,000',
    demand: '+142% YoY',
    experienceReq: '0-2 YRS FOUNDATION',
    manifesto: 'Engineering inference pipelines, fine-tuning LLMs, vector embedding spaces, and production evaluation frameworks.',
    skills: [
      { name: 'PyTorch / GPU Kernels', required: 92, baseline: 35, category: 'Core Math' },
      { name: 'LLM RAG Architectures', required: 90, baseline: 55, category: 'Inference' },
      { name: 'Vector DBs & Indexing', required: 85, baseline: 40, category: 'Data' },
      { name: 'Python Systems & Async', required: 88, baseline: 70, category: 'Engineering' },
      { name: 'Evaluation & Benchmarks', required: 82, baseline: 25, category: 'Ops' },
    ],
    recommendedProject: {
      title: 'Multi-Modal Local Agent Core',
      type: 'Production Artifact',
      stack: ['Python', 'vLLM', 'Qdrant', 'FastAPI'],
      desc: 'High-throughput local RAG pipeline with hybrid search, streaming quantization, and verifiable synthetic benchmark tests.',
      impactDelta: '+28% Verified Readiness'
    }
  },
  {
    id: 'ml-engineer',
    code: 'ROLE.02',
    title: 'ML Engineer',
    field: 'Production Systems / MLOps',
    salary: '$140,000 — $185,000',
    demand: '+98% YoY',
    experienceReq: '1-3 YRS SYSTEMS',
    manifesto: 'Continuous model deployment, feature stores, drift detection, and orchestrating distributed training jobs.',
    skills: [
      { name: 'Distributed Training', required: 88, baseline: 30, category: 'Compute' },
      { name: 'Docker & Kubernetes MLOps', required: 85, baseline: 45, category: 'Infra' },
      { name: 'Feature Stores & Feast', required: 78, baseline: 20, category: 'Data' },
      { name: 'Scikit-Learn & XGBoost', required: 92, baseline: 75, category: 'Modeling' },
      { name: 'Model Monitoring & Drift', required: 80, baseline: 20, category: 'Ops' },
    ],
    recommendedProject: {
      title: 'Distributed Model Serving Gateway',
      type: 'Infra Blueprint',
      stack: ['Kubernetes', 'Triton', 'Docker', 'Prometheus'],
      desc: 'Zero-downtime model rollouts with latency profiling, automated A/B traffic splitting, and drift trigger webhooks.',
      impactDelta: '+32% Verified Readiness'
    }
  },
  {
    id: 'fullstack-developer',
    code: 'ROLE.03',
    title: 'Full Stack Engineer',
    field: 'High-Concurrence Web Applications',
    salary: '$120,000 — $165,000',
    demand: '+64% YoY',
    experienceReq: '0-2 YRS APPS',
    manifesto: 'Architecting resilient cloud APIs, real-time client state sync, relational schemas, and accessible interfaces.',
    skills: [
      { name: 'TypeScript & React SPA', required: 92, baseline: 65, category: 'Frontend' },
      { name: 'PostgreSQL & Query Tuning', required: 85, baseline: 40, category: 'Database' },
      { name: 'Node.js / Go Microservices', required: 88, baseline: 50, category: 'Backend' },
      { name: 'Distributed Caching (Redis)', required: 78, baseline: 30, category: 'Caching' },
      { name: 'CI/CD & Cloud Deployments', required: 82, baseline: 45, category: 'DevOps' },
    ],
    recommendedProject: {
      title: 'Real-Time Collaboration Canvas',
      type: 'Architecture Case Study',
      stack: ['TypeScript', 'WebSockets', 'PostgreSQL', 'Redis'],
      desc: 'Multiplayer room engine featuring optimistic UI updates, conflict-free replicated data, and sub-40ms event relays.',
      impactDelta: '+26% Verified Readiness'
    }
  },
  {
    id: 'data-scientist',
    code: 'ROLE.04',
    title: 'Data Scientist',
    field: 'Statistical Intelligence / Forecasting',
    salary: '$125,000 — $170,000',
    demand: '+52% YoY',
    experienceReq: '0-2 YRS ANALYTICS',
    manifesto: 'Translating noisy multimodal data into causal inferences, probabilistic forecasting, and automated decision engines.',
    skills: [
      { name: 'Advanced Statistical Inference', required: 94, baseline: 55, category: 'Math' },
      { name: 'SQL Window Funcs & Warehousing', required: 90, baseline: 65, category: 'Data' },
      { name: 'Predictive Modeling & Scikit', required: 88, baseline: 60, category: 'ML' },
      { name: 'A/B Experimentation Rigor', required: 85, baseline: 30, category: 'Product' },
      { name: 'Storytelling & Visualization', required: 80, baseline: 50, category: 'Comms' },
    ],
    recommendedProject: {
      title: 'Causal Lift & User Retention Engine',
      type: 'Statistical Engine',
      stack: ['Python', 'DuckDB', 'Statsmodels', 'Plotly'],
      desc: 'Heterogeneous treatment effect modeling on million-row cohort datasets with automated sensitivity bounds.',
      impactDelta: '+24% Verified Readiness'
    }
  }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Active Target Career State
  const [selectedCareerIndex, setSelectedCareerIndex] = useState(0);
  const activeRole = EDITORIAL_CAREERS[selectedCareerIndex];

  // Interactive Gap Matrix State
  const [gapMode, setGapMode] = useState('diff'); // 'diff' | 'target' | 'baseline'
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Interactive Readiness Simulator State
  const [simulatedCompletedTasks, setSimulatedCompletedTasks] = useState(3);
  const totalSimTasks = 8;
  const baseScore = 42;
  const calculatedReadiness = Math.min(94, Math.round(baseScore + (simulatedCompletedTasks / totalSimTasks) * 52));

  // Live Market Metric Ticker
  const [marketMetric, setMarketMetric] = useState(48219);
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketMetric(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#060709] text-[#E4E7EC] font-sans selection:bg-gorange selection:text-black relative overflow-x-hidden">
      
      {/* Top Editorial Navbar */}
      <Navbar />

      {/* =========================================================================
          01 — WHERE ARE YOU? (Hero / Reality of Tech Hiring)
          ========================================================================= */}
      <section id="story-where" className="relative min-h-[90vh] border-b border-[#1E232F] flex flex-col justify-between px-6 lg:px-12 pt-16 pb-12">
        
        {/* Top Monospace Meta Coordinates */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] border-b border-[#1E232F] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 01</span>
            <span>—</span>
            <span>CURRENT POSITION & MARKET REALITY</span>
          </div>
          <div className="flex items-center gap-6">
            <span>INDEXED ROLES: <strong className="text-white font-normal">{marketMetric.toLocaleString()}</strong></span>
            <span className="hidden md:inline">SYSTEM: GEMINI 3.6 FLASH</span>
            <span>STATUS: LIVE</span>
          </div>
        </div>

        {/* Main Editorial Headline — Asymmetric, Oversized, Left-Aligned */}
        <div className="my-auto py-12 lg:py-16 max-w-[1400px]">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-gorange mb-6 flex items-center gap-2">
            <span>[ SYSTEM AUDIT ]</span>
            <span className="h-px w-12 bg-gorange/40" />
            <span className="text-[#8F9AA9]">STOP GUESSING YOUR TECH QUALIFICATION</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[6.5rem] tracking-[-0.035em] text-white leading-[0.95] max-w-6xl">
            You are applying into a market that measures <span className="underline decoration-gorange decoration-4 underline-offset-8">exact skills</span>, not resume keywords.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pt-8 border-t border-[#1E232F]">
            <div className="lg:col-span-6">
              <p className="text-lg sm:text-xl text-[#A0AABA] font-light leading-relaxed">
                Most students and early engineers waste 9 months learning redundant web tutorials. GTech replaces ambiguity with a cold, quantified delta between where you stand and what modern hiring algorithms demand.
              </p>
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:pl-12">
              <div className="font-mono text-xs space-y-1 text-[#6B7688]">
                <div>DELTA DETECTION: <span className="text-white">ACCURATE TO 1.4%</span></div>
                <div>VERIFICATION ENGINE: <span className="text-white">GRAPH MATRIX</span></div>
                <div>ROADMAP GENERATION: <span className="text-gorange font-bold">ACTIVE</span></div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('story-target');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-xs uppercase tracking-widest px-8 py-4 bg-white text-black font-bold hover:bg-gorange hover:text-black transition-colors flex items-center gap-3 shrink-0"
              >
                <span>Select Target Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Data Ticker Banner */}
        <div className="pt-6 border-t border-[#1E232F] grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7688]">AVERAGE SKILL GAP</div>
            <div className="text-2xl font-bold text-white mt-1">58.4%</div>
            <div className="text-[10px] text-[#6B7688] mt-0.5">Found across 2026 graduates</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7688]">TIME SAVED</div>
            <div className="text-2xl font-bold text-gorange mt-1">4.2 MOS</div>
            <div className="text-[10px] text-[#6B7688] mt-0.5">Eliminating unneeded tutorials</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7688]">HIRE ACCELERATION</div>
            <div className="text-2xl font-bold text-white mt-1">3.1×</div>
            <div className="text-[10px] text-[#6B7688] mt-0.5">With verified portfolio artifacts</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7688]">ACCESS MODEL</div>
            <div className="text-2xl font-bold text-white mt-1">100% FREE</div>
            <div className="text-[10px] text-[#6B7688] mt-0.5">Open career intelligence</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — WHERE DO YOU WANT TO GO? (Target Career Selection)
          ========================================================================= */}
      <section id="story-target" className="relative border-b border-[#1E232F] px-6 lg:px-12 py-20 lg:py-28">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 02</span>
            <span>—</span>
            <span>WHERE DO YOU WANT TO GO?</span>
          </div>
          <div>[ SELECT AN INDUSTRY VECTOR ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Role Navigation Directory */}
          <div className="lg:col-span-5 space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#6B7688] mb-4">
              PRIMARY TRACKS / SPECIFICATIONS
            </div>

            {EDITORIAL_CAREERS.map((role, idx) => {
              const isSelected = idx === selectedCareerIndex;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedCareerIndex(idx)}
                  className={`w-full text-left p-6 transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0E1118] border-gorange text-white'
                      : 'bg-transparent border-[#1E232F] text-[#8F9AA9] hover:border-[#2B3242] hover:text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest">
                      <span className={isSelected ? 'text-gorange' : 'text-[#4E5664]'}>{role.code}</span>
                      <span className="text-[#6B7688]">•</span>
                      <span className="uppercase text-[10px]">{role.experienceReq}</span>
                    </div>
                    <div className="font-display font-bold text-2xl mt-1 tracking-tight">
                      {role.title}
                    </div>
                    <div className="text-xs text-[#6B7688] mt-1 font-mono">
                      {role.field}
                    </div>
                  </div>

                  <div className="text-right pl-4">
                    <div className="font-mono text-xs text-gorange font-bold">{role.demand}</div>
                    <div className={`mt-2 font-mono text-[10px] tracking-widest uppercase ${isSelected ? 'text-white' : 'text-transparent group-hover:text-[#6B7688]'}`}>
                      VIEW MATRIX →
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Role Technical Manifest */}
          <div className="lg:col-span-7 bg-[#0B0D12] border border-[#1E232F] p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E232F] pb-6 mb-8">
                <div>
                  <span className="font-mono text-[11px] tracking-widest text-gorange uppercase">{activeRole.code} MANIFEST</span>
                  <h2 className="font-display font-black text-4xl text-white tracking-tight mt-1">{activeRole.title}</h2>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[10px] text-[#6B7688] uppercase tracking-widest">COMPENSATION BRACKET</div>
                  <div className="text-xl font-bold text-white mt-0.5">{activeRole.salary}</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="font-mono text-[11px] text-[#6B7688] uppercase tracking-widest mb-2">ROLE SPECIFICATION</div>
                <p className="text-base sm:text-lg text-[#C8CFDB] font-light leading-relaxed">
                  "{activeRole.manifesto}"
                </p>
              </div>

              {/* Requirement Manifest Table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-[11px] text-[#6B7688] uppercase tracking-widest mb-3">KEY INDUSTRY PREREQUISITES</div>
                {activeRole.skills.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-[#1E232F]/80">
                    <span className="flex items-center gap-3">
                      <span className="text-[#4E5664]">0{i + 1}</span>
                      <span className="text-white font-sans text-sm font-medium">{s.name}</span>
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-[#6B7688] tracking-widest uppercase">{s.category}</span>
                      <span className="text-gorange font-bold">{s.required}% REQ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#1E232F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#6B7688]">
                READY TO RUN REAL GAP AUDIT FOR THIS TRACK?
              </span>
              <button
                onClick={() => {
                  const el = document.getElementById('story-gaps');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-xs uppercase tracking-widest px-6 py-3 bg-gorange text-black font-bold hover:bg-[#FF6D24] transition-colors flex items-center gap-2"
              >
                <span>Inspect Skill Matrix</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          03 — WHAT IS MISSING? (Interactive Skill-Gap Intelligence Visualization)
          ========================================================================= */}
      <section id="story-gaps" className="relative border-b border-[#1E232F] px-6 lg:px-12 py-20 lg:py-28 bg-[#08090E]">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 03</span>
            <span>—</span>
            <span>WHAT IS MISSING? (SKILL-GAP MATRIX)</span>
          </div>
          <div>[ REAL-TIME DIFFERENTIAL ENGINE ]</div>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-12">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            The deficit between student confidence and industry bar.
          </h2>
          <p className="text-lg text-[#8F9AA9] mt-4 font-light">
            Interactive visualization mapping average applicant baseline knowledge against the verified production benchmark for <strong className="text-white font-normal">{activeRole.title}</strong>.
          </p>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs mb-8">
          <span className="text-[#6B7688] mr-3 uppercase tracking-wider">VIEW LAYER:</span>
          <button
            onClick={() => setGapMode('diff')}
            className={`px-4 py-2 uppercase tracking-widest transition-all ${
              gapMode === 'diff'
                ? 'bg-white text-black font-bold'
                : 'bg-[#10131A] text-[#8F9AA9] border border-[#1E232F] hover:text-white'
            }`}
          >
            Skill Deficit Delta
          </button>
          <button
            onClick={() => setGapMode('target')}
            className={`px-4 py-2 uppercase tracking-widest transition-all ${
              gapMode === 'target'
                ? 'bg-gorange text-black font-bold'
                : 'bg-[#10131A] text-[#8F9AA9] border border-[#1E232F] hover:text-white'
            }`}
          >
            Market Target (100%)
          </button>
          <button
            onClick={() => setGapMode('baseline')}
            className={`px-4 py-2 uppercase tracking-widest transition-all ${
              gapMode === 'baseline'
                ? 'bg-white text-black font-bold'
                : 'bg-[#10131A] text-[#8F9AA9] border border-[#1E232F] hover:text-white'
            }`}
          >
            Applicant Baseline
          </button>
        </div>

        {/* Large Data-Led Skill Gap Visualization */}
        <div className="border border-[#1E232F] bg-[#060709] p-6 lg:p-10">
          <div className="space-y-6">
            {activeRole.skills.map((skill, index) => {
              const gap = skill.required - skill.baseline;
              const isHovered = hoveredSkill === skill.name;

              return (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-4 border transition-all ${
                    isHovered ? 'border-gorange bg-[#0D1017]' : 'border-[#1E232F] bg-[#0A0C10]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#4E5664]">0{index + 1}</span>
                      <span className="font-display font-bold text-lg text-white">{skill.name}</span>
                      <span className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest bg-[#141822] px-2 py-0.5 border border-[#1E232F]">
                        {skill.category}
                      </span>
                    </div>

                    <div className="font-mono text-xs flex items-center gap-4">
                      <span className="text-[#6B7688]">BASELINE: <strong className="text-white font-normal">{skill.baseline}%</strong></span>
                      <span className="text-[#6B7688]">TARGET: <strong className="text-white font-normal">{skill.required}%</strong></span>
                      <span className="text-gorange font-bold">DEFICIT: -{gap}%</span>
                    </div>
                  </div>

                  {/* High-Contrast Data Bar Visualizer */}
                  <div className="relative h-6 bg-[#121620] border border-[#1E232F] overflow-hidden">
                    {/* Baseline Bar */}
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-[#2E3646] transition-all duration-500"
                      style={{ width: `${skill.baseline}%` }}
                    />
                    
                    {/* Gap Delta Bar (Orange) */}
                    <div 
                      className="absolute top-0 bottom-0 bg-gorange transition-all duration-500 opacity-90"
                      style={{ 
                        left: `${skill.baseline}%`, 
                        width: `${gap}%`,
                        display: gapMode === 'baseline' ? 'none' : 'block' 
                      }}
                    />

                    {/* Target Threshold Marker Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                      style={{ left: `${skill.required}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 font-mono text-[10px] text-[#6B7688]">
                    <span>0% ENTRY</span>
                    <span>50% WORKING KNOWLEDGE</span>
                    <span className="text-white">MARKET HIRE LINE ({skill.required}%)</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Matrix Legend Footer */}
          <div className="mt-8 pt-6 border-t border-[#1E232F] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#6B7688]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#2E3646] inline-block" />
                <span>CURRENT APPLICANT BASELINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gorange inline-block" />
                <span>CRITICAL LEARNING GAP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-3 bg-white inline-block" />
                <span>PRODUCTION HIRE THRESHOLD</span>
              </div>
            </div>
            
            <div>EVALUATION CONFIDENCE: 98.6%</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — WHAT SHOULD YOU BUILD? (Roadmap & Architectural Projects)
          ========================================================================= */}
      <section id="story-roadmap" className="relative border-b border-[#1E232F] px-6 lg:px-12 py-20 lg:py-28">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 04</span>
            <span>—</span>
            <span>WHAT SHOULD YOU BUILD?</span>
          </div>
          <div>[ PROOF-OF-WORK ARTIFACTS ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Philosophy & Execution Steps */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Stop building todo apps. Build verifiable systems.
              </h2>
              <p className="text-base sm:text-lg text-[#8F9AA9] mt-6 font-light leading-relaxed">
                Engineering managers do not read bullet points. They inspect architecture diagrams, GitHub pull requests, and real latency benchmarks.
              </p>

              {/* Execution Protocol */}
              <div className="mt-8 space-y-4 font-mono text-xs">
                <div className="p-4 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-gorange font-bold uppercase">PHASE 01: FOUNDATIONAL DEEP DIVE</div>
                  <div className="text-[#8F9AA9] mt-1 font-sans text-sm">Close math, inference & async systems gaps via 20-min daily atomic tasks.</div>
                </div>
                <div className="p-4 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-white font-bold uppercase">PHASE 02: CAPSTONE SYSTEM ARCHITECTURE</div>
                  <div className="text-[#8F9AA9] mt-1 font-sans text-sm">Design, scaffold, and bench a full production-ready repo.</div>
                </div>
                <div className="p-4 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-white font-bold uppercase">PHASE 03: LIVE JD PARSER REFINEMENT</div>
                  <div className="text-[#8F9AA9] mt-1 font-sans text-sm">Paste active job postings to inject missing keywords and requirements.</div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#1E232F]">
              <button
                onClick={() => navigate('/roadmap')}
                className="font-mono text-xs uppercase tracking-widest px-8 py-4 bg-white text-black font-bold hover:bg-gorange transition-colors flex items-center gap-3"
              >
                <span>Explore Full Daily Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Curated Capstone Project Artifact */}
          <div className="lg:col-span-7 bg-[#0B0D12] border border-gorange/40 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-gorange text-black font-mono text-[10px] font-bold uppercase tracking-widest">
              RECOMMENDED PORTFOLIO ARTIFACT
            </div>

            <div className="font-mono text-xs text-[#6B7688] uppercase tracking-widest mb-2">
              TARGET SPECIFIC: {activeRole.title.toUpperCase()}
            </div>

            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {activeRole.recommendedProject.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 my-6">
              {activeRole.recommendedProject.stack.map(tech => (
                <span key={tech} className="font-mono text-xs px-3 py-1 bg-[#151923] border border-[#232938] text-white">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-base text-[#C8CFDB] font-light leading-relaxed mb-8">
              {activeRole.recommendedProject.desc}
            </p>

            {/* Architecture Spec Breakdown */}
            <div className="p-5 border border-[#1E232F] bg-[#060709] font-mono text-xs space-y-3 mb-8">
              <div className="text-[#6B7688] uppercase tracking-widest text-[10px]">EVALUATION SPECIFICATION</div>
              <div className="flex items-center justify-between text-slate-300">
                <span>BENCHMARK CRITERIA:</span>
                <span className="text-white">&lt; 85ms P99 Latency / Concurrency 500</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>ESTIMATED BUILD TIME:</span>
                <span className="text-white">14 Days (Guided Milestones)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>VERIFIED READINESS DELTA:</span>
                <span className="text-gorange font-bold">{activeRole.recommendedProject.impactDelta}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <span>Inspect Project Generator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          05 — ARE YOU READY? (Career Readiness Metric Result)
          ========================================================================= */}
      <section id="story-readiness" className="relative border-b border-[#1E232F] px-6 lg:px-12 py-20 lg:py-28 bg-[#07080D]">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 05</span>
            <span>—</span>
            <span>ARE YOU READY?</span>
          </div>
          <div>[ VERIFIED READINESS ENGINE ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Oversized Readiness Score Display */}
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gorange mb-3">
              SIMULATED READINESS INDEX
            </div>
            
            <div className="flex items-baseline gap-4">
              <span className="font-display font-black text-8xl sm:text-[9rem] text-white tracking-tighter leading-none">
                {calculatedReadiness}
              </span>
              <span className="font-display font-bold text-4xl text-gorange">%</span>
            </div>

            <div className="h-3 w-full bg-[#121620] border border-[#1E232F] mt-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gorange"
                initial={{ width: '42%' }}
                animate={{ width: `${calculatedReadiness}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-[#6B7688] mt-3">
              <span>DAY 0: 42% (UNPREPARED)</span>
              <span className="text-white">HIRE READY THRESHOLD: 80%+</span>
              <span>100% MAXIMUM</span>
            </div>
          </div>

          {/* Right: Interactive Simulator Controls */}
          <div className="lg:col-span-6 bg-[#0B0D12] border border-[#1E232F] p-8 lg:p-10">
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B7688] mb-2">
              INTERACTIVE READINESS SIMULATOR
            </div>
            <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4">
              See what happens when you finish milestones
            </h3>
            <p className="text-sm text-[#8F9AA9] font-light leading-relaxed mb-6">
              Toggle the number of completed daily modules to see your objective readiness score adjust in real time:
            </p>

            {/* Slider / Counter Toggle */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white">COMPLETED MILESTONES:</span>
                <span className="text-gorange font-bold text-base">{simulatedCompletedTasks} of {totalSimTasks}</span>
              </div>

              <input 
                type="range"
                min="0"
                max={totalSimTasks}
                value={simulatedCompletedTasks}
                onChange={(e) => setSimulatedCompletedTasks(parseInt(e.target.value))}
                className="w-full h-2 bg-[#1E232F] accent-gorange cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 border border-[#1E232F] bg-[#060709]">
                  <div className="text-[#6B7688]">CURRENT COHORT:</div>
                  <div className="text-white font-bold mt-0.5">Top 18% of Applicants</div>
                </div>
                <div className="p-3 border border-[#1E232F] bg-[#060709]">
                  <div className="text-[#6B7688]">INTERVIEW PROBABILITY:</div>
                  <div className="text-gorange font-bold mt-0.5">{calculatedReadiness >= 80 ? 'HIGH (3.8×)' : 'MODERATE (1.4×)'}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/skill-gap')}
              className="w-full font-mono text-xs uppercase tracking-widest py-3.5 bg-white text-black font-bold hover:bg-gorange transition-colors flex items-center justify-center gap-2"
            >
              <span>Calculate Your Real Score</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          06 — START (Decisive Editorial Finale & CTA)
          ========================================================================= */}
      <section className="relative px-6 lg:px-12 py-24 lg:py-32 bg-[#060709] overflow-hidden">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-gorange inline-block" />
            <span className="text-white">SECTION 06</span>
            <span>—</span>
            <span>START YOUR TRAJECTORY</span>
          </div>
          <div>[ DEPLOY YOUR ENGINE ]</div>
        </div>

        <div className="max-w-5xl">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95]">
            Build the career you're <span className="text-gorange">actually ready for.</span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#8F9AA9] font-light mt-8 max-w-2xl leading-relaxed">
            Eliminate tutorial hell. Benchmark your real technical baseline in 4 minutes with Gemini 3.6 Flash.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/onboarding')}
              className="font-mono text-xs uppercase tracking-widest px-10 py-5 bg-gorange text-black font-bold hover:bg-[#FF6D24] transition-all flex items-center gap-3 text-sm shadow-xl"
            >
              <span>Launch Onboarding Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/assessment"
              className="font-mono text-xs uppercase tracking-widest px-8 py-5 border border-[#2B3242] text-white hover:border-white transition-colors"
            >
              Take 10-Question Diagnostic →
            </Link>
          </div>
        </div>

        {/* Technical Specification Footer */}
        <div className="mt-24 pt-12 border-t border-[#1E232F] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#6B7688]">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider">GTECH SYSTEM 2026</span>
            <span>•</span>
            <span>AI CAREER GAP PLATFORM</span>
            <span>•</span>
            <span className="text-gorange">REACT 18 + VITE + TAILWIND</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/career-selection" className="hover:text-white transition-colors">CAREERS</Link>
            <Link to="/job-analysis" className="hover:text-white transition-colors">JOB PARSER</Link>
            <Link to="/leaderboard" className="hover:text-white transition-colors">LEADERBOARD</Link>
            <a href="https://github.com/omkarsawanth/GTech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              GITHUB <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};