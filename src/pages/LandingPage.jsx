import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  ChevronRight,
  TrendingUp,
  Compass,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  UserCheck,
  Target
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { InterestSelector } from '../components/common/InterestSelector';
import { useAuth } from '../context/AuthContext';
import { CAREER_CATEGORIES } from '../data/careersData';

// Deferred 3D WebGL components — not in initial critical path
const CareerConstellation = React.lazy(() => import('../components/3d/CareerConstellation'));
const FluidShaderGradient = React.lazy(() => import('../components/3d/FluidShaderGradient'));
const LiquidGlassContainer = React.lazy(() => import('../components/common/LiquidGlassView').then(m => ({ default: m.LiquidGlassContainer })));
const OpticalGlassLens = React.lazy(() => import('../components/common/LiquidGlassView').then(m => ({ default: m.OpticalGlassLens })));

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Defer heavy 3D WebGL shaders ~800ms after first paint for instant initial render
  const [load3D, setLoad3D] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad3D(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Selected Category and Career State (Category -> Profession)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const activeCategory = CAREER_CATEGORIES[selectedCategoryIndex];

  const [selectedCareerIndex, setSelectedCareerIndex] = useState(0);
  const activeCareer = activeCategory.careers[selectedCareerIndex] || activeCategory.careers[0];

  const handleCategoryChange = (index) => {
    setSelectedCategoryIndex(index);
    setSelectedCareerIndex(0);
  };

  // Interactive Gap Matrix State
  const [gapMode, setGapMode] = useState('diff'); // 'diff' | 'target' | 'baseline'
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Interactive Readiness Simulator State
  const [simulatedCompletedActions, setSimulatedCompletedActions] = useState(3);
  const totalSimActions = 7;
  const baseScore = 38;
  const calculatedReadiness = Math.min(94, Math.round(baseScore + (simulatedCompletedActions / totalSimActions) * 56));

  // Live Market Metric Ticker
  const [analyzedPaths, setAnalyzedPaths] = useState(128450);
  useEffect(() => {
    const timer = setInterval(() => {
      setAnalyzedPaths(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#060709] text-[#E4E7EC] font-sans selection:bg-gorange selection:text-black relative overflow-x-hidden">
      
      {/* Top Editorial Navbar */}
      <Navbar />

      {/* =========================================================================
          01 — WHERE ARE YOU? (Universal Career Positioning)
          ========================================================================= */}
      <section id="story-where" className="relative min-h-[92vh] border-b border-[#1E232F] flex flex-col justify-between px-6 lg:px-14 pt-16 pb-14 overflow-hidden">
        
        {/* 3D React Three Fiber Career Constellation Canvas (Deferred, non-blocking) */}
        {load3D && (
          <React.Suspense fallback={<div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,#FF8A0010,transparent_70%)]" />}>
            <CareerConstellation categoryIndex={selectedCategoryIndex} />
          </React.Suspense>
        )}

        {/* Top Monospace Meta Coordinates */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] border-b border-[#1E232F] pb-5">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">01 / WHERE ARE YOU?</span>
            <span className="text-[#3A4354]">—</span>
            <span>YOUR STARTING POINT IS PART OF THE JOURNEY</span>
          </div>
          <div className="flex items-center gap-6">
            <span>INDEXED PATHWAYS: <strong className="text-white font-mono">{analyzedPaths.toLocaleString()}</strong></span>
            <span className="hidden md:inline">EVALUATION: MULTI-DISCIPLINARY</span>
            <span className="text-gorange font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gorange animate-pulse" />
              SPATIAL 3D: ONLINE
            </span>
          </div>
        </div>

        {/* Main Editorial Headline with Generous Spacing & High Readability */}
        <div className="relative z-10 my-auto py-12 lg:py-16 max-w-[1440px]">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-gorange mb-6 flex items-center gap-2">
            <span>[ SYSTEM AUDIT ]</span>
            <span className="h-px w-12 bg-gorange/40" />
            <span className="text-[#8F9AA9]">CAREER INTELLIGENCE FOR EVERY PATH</span>
          </div>

          <h1 className="font-display font-extrabold text-display tracking-[-0.035em] text-white leading-[0.92] max-w-6xl">
            Don't just choose a career. <span className="underline decoration-gorange decoration-4 underline-offset-8">Build toward it.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14 pt-10 border-t border-[#1E232F]">
            <div className="lg:col-span-7">
              <p className="text-xl sm:text-2xl text-[#B6BFCD] font-light leading-relaxed">
                Kalpa maps your current background, skills, and interests against the verified standards of any profession you want to pursue — from software and finance to design, healthcare, law, and engineering.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:pl-8">
              <div className="font-mono text-xs space-y-2 text-[#7F8B9D]">
                <div>STARTING MODEL: <span className="text-white font-semibold">WHOLE PERSON PROFILE</span></div>
                <div>GAP ENGINE: <span className="text-white font-semibold">ROLE-AGNOSTIC MATRIX</span></div>
                <div>RECOMMENDATION: <span className="text-gorange font-bold">DISCIPLINE SPECIFIC</span></div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('story-target');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-xs uppercase tracking-widest px-8 py-4.5 bg-white text-black font-bold hover:bg-gorange transition-colors flex items-center gap-3 shrink-0"
              >
                <span>Explore Careers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Personalization Domain Selector */}
        <div className="relative z-10 mb-10">
          <InterestSelector
            categories={CAREER_CATEGORIES}
            selectedCategoryIndex={selectedCategoryIndex}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Whole-Person Archetype Display — Proving Kalpa Understands Any Candidate */}
        <div className="relative z-10 pt-8 border-t border-[#1E232F]">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#6B7688] mb-4">
            UNIVERSAL PROFILE AUDIT &amp; SYNTHESIS ARCHETYPE
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4.5 bg-[#0B0D12] border border-[#1E232F]">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gorange uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" /> Education
              </div>
              <div className="text-base font-display font-bold text-white mt-1.5">Degree – Field of Study</div>
              <div className="text-xs text-[#7F8B9D] mt-1 font-mono">Foundations &amp; Coursework</div>
            </div>

            <div className="p-4.5 bg-[#0B0D12] border border-[#1E232F]">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gorange uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Current Skills
              </div>
              <div className="text-base font-display font-bold text-white mt-1.5">Core &amp; Applied Skills</div>
              <div className="text-xs text-[#7F8B9D] mt-1 font-mono">Baseline Competency Audit</div>
            </div>

            <div className="p-4.5 bg-[#0B0D12] border border-[#1E232F]">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gorange uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" /> Experience
              </div>
              <div className="text-base font-display font-bold text-white mt-1.5">Internship, Lab or Project</div>
              <div className="text-xs text-[#7F8B9D] mt-1 font-mono">Hands-on Applied Proof</div>
            </div>

            <div className="p-4.5 bg-[#0B0D12] border border-[#1E232F]">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gorange uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> Target Vectors
              </div>
              <div className="text-base font-display font-bold text-white mt-1.5">Target Discipline &amp; Trajectory</div>
              <div className="text-xs text-[#7F8B9D] mt-1 font-mono">Industry Vector Horizon</div>
            </div>

            <div className="p-4.5 bg-[#0D1017] border border-gorange/40">
              <div className="flex items-center gap-2 text-[10px] font-mono text-gorange uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" /> Mapped Synthesis
              </div>
              <div className="text-base font-display font-bold text-white mt-1.5">{activeCareer.title} Pathway</div>
              <div className="text-xs text-gorange mt-1 font-mono font-bold">Curated Readiness Blueprint</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — WHERE DO YOU WANT TO GO? (Universal Category -> Career Explorer)
          ========================================================================= */}
      <section id="story-target" className="relative border-b border-[#1E232F] px-6 lg:px-14 py-24 lg:py-32">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">02 / WHERE DO YOU WANT TO GO?</span>
            <span className="text-[#3A4354]">—</span>
            <span>CAREER EXPLORER</span>
          </div>
          <div>[ CATEGORY &rarr; PROFESSION INTERACTION ]</div>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-14">
          <h2 className="font-display font-extrabold text-section text-white tracking-tight leading-[1.02]">
            Every profession has requirements. Know them before you apply.
          </h2>
          <p className="text-xl text-[#8F9AA9] mt-5 font-light leading-relaxed">
            Select an industry category to explore verified professions, compensation benchmarks, core skills, and proof-of-competence evidence.
          </p>
        </div>

        {/* Career Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#1E232F] scrollbar-thin">
          {CAREER_CATEGORIES.map((cat, idx) => {
            const isCatSelected = idx === selectedCategoryIndex;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(idx)}
                className={`px-5 py-3 font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-2.5 border ${
                  isCatSelected
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-[#0B0D12] text-[#8F9AA9] border-[#1E232F] hover:border-[#384255] hover:text-white'
                }`}
              >
                <span className={isCatSelected ? 'text-gorange' : 'text-[#4E5664]'}>{cat.code}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Professions in Selected Category */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#6B7688] mb-2 flex items-center justify-between">
              <span>{activeCategory.name.toUpperCase()} PROFESSIONS</span>
              <span>{activeCategory.careers.length} TRACKS</span>
            </div>

            {activeCategory.careers.map((career, cIdx) => {
              const isSelectedCareer = cIdx === selectedCareerIndex;
              return (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareerIndex(cIdx)}
                  className={`w-full text-left p-6 transition-all border flex items-center justify-between group ${
                    isSelectedCareer
                      ? 'bg-[#0E1118] border-gorange text-white'
                      : 'bg-[#07090D] border-[#1E232F] text-[#8F9AA9] hover:border-[#2B3242] hover:text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest">
                      <span className={isSelectedCareer ? 'text-gorange font-bold' : 'text-[#4E5664]'}>
                        ROLE 0{cIdx + 1}
                      </span>
                      <span className="text-[#3A4354]">•</span>
                      <span className="uppercase text-[10px] text-[#6B7688]">{career.experienceReq}</span>
                    </div>
                    
                    <div className="font-display font-bold text-2xl mt-1 tracking-tight text-white">
                      {career.title}
                    </div>
                    
                    <div className="text-xs text-[#6B7688] mt-1 font-mono">
                      {career.field}
                    </div>
                  </div>

                  <div className="text-right pl-4">
                    <div className="font-mono text-xs text-gorange font-bold">{career.demand}</div>
                    <div className={`mt-2 font-mono text-[10px] tracking-widest uppercase ${isSelectedCareer ? 'text-white' : 'text-transparent group-hover:text-[#6B7688]'}`}>
                      AUDIT &rarr;
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="p-5 border border-dashed border-[#1E232F] text-xs font-mono text-[#6B7688] leading-relaxed">
              * Kalpa's career ontology expands across all professional sectors. Additional paths can be custom-parsed with our Job Description Parser.
            </div>
          </div>

          {/* Right: Technical/Professional Manifest for Selected Career */}
          <div className="lg:col-span-7 bg-[#0B0D12] border border-[#1E232F] p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E232F] pb-6 mb-8">
                <div>
                  <span className="font-mono text-[11px] tracking-widest text-gorange uppercase">
                    {activeCategory.name.toUpperCase()} &bull; CAREER SPECIFICATION
                  </span>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-1.5">
                    {activeCareer.title}
                  </h3>
                </div>
                
                <div className="text-right font-mono">
                  <div className="text-[10px] text-[#6B7688] uppercase tracking-widest">MARKET COMPENSATION</div>
                  <div className="text-xl font-bold text-white mt-0.5">{activeCareer.salary}</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="font-mono text-[11px] text-[#6B7688] uppercase tracking-widest mb-2">ROLE OVERVIEW</div>
                <p className="text-lg text-[#C8CFDB] font-light leading-relaxed">
                  "{activeCareer.manifesto}"
                </p>
              </div>

              {/* Requirement Manifest Table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-[11px] text-[#6B7688] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>CORE SKILLS &amp; COMPETENCIES</span>
                  <span>INDUSTRY BENCHMARK</span>
                </div>
                
                {activeCareer.skills.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between py-3 border-b border-[#1E232F]/80">
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

              {/* Extended Knowledge & Credential Requirements */}
              {((activeCareer.knowledge?.length > 0) || (activeCareer.certifications?.length > 0) || (activeCareer.portfolio?.length > 0)) && (
                <div className="mt-8 pt-6 border-t border-[#1E232F] space-y-4 font-mono text-xs">
                  {activeCareer.knowledge?.length > 0 && (
                    <div>
                      <div className="text-[10px] text-[#6B7688] uppercase tracking-widest mb-2">DOMAIN KNOWLEDGE FOUNDATIONS</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCareer.knowledge.map((k) => (
                          <span key={k} className="px-2.5 py-1 bg-[#10131A] border border-[#1E232F] text-[#B0BAC8] text-[11px]">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeCareer.certifications?.length > 0 && (
                    <div>
                      <div className="text-[10px] text-[#6B7688] uppercase tracking-widest mb-2">RECOGNIZED CERTIFICATIONS &amp; LICENSES</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCareer.certifications.map((c) => (
                          <span key={c} className="px-2.5 py-1 bg-gorange/10 border border-gorange/30 text-gorange text-[11px] font-semibold">
                            {c}
                          </span>
                        ))}
                        {activeCareer.licenses?.map((l) => (
                          <span key={l} className="px-2.5 py-1 bg-white/10 border border-white/20 text-white text-[11px] font-semibold">
                            LIC: {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-8 mt-8 border-t border-[#1E232F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#7F8B9D]">
                TARGET EVIDENCE: <strong className="text-white font-normal">{activeCareer.evidenceType}</strong>
              </span>
              
              <button
                onClick={() => {
                  const el = document.getElementById('story-gaps');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-mono text-xs uppercase tracking-widest px-6 py-3.5 bg-gorange text-black font-bold hover:bg-[#FF6D24] transition-colors flex items-center gap-2"
              >
                <span>Inspect Career Gap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          03 — WHAT IS MISSING? (Interactive Skill-Gap Intelligence Visualization)
          ========================================================================= */}
      <section id="story-gaps" className="relative border-b border-[#1E232F] px-6 lg:px-14 py-24 lg:py-32 bg-[#08090E]">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">03 / WHAT IS MISSING?</span>
            <span className="text-[#3A4354]">—</span>
            <span>CAREER GAP DIFFERENTIAL MATRIX</span>
          </div>
          <div>[ REAL-TIME DIFFERENTIAL ENGINE ]</div>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-12">
          <h2 className="font-display font-extrabold text-section text-white tracking-tight leading-[1.02]">
            The deficit between your starting baseline and the industry standard.
          </h2>
          <p className="text-xl text-[#8F9AA9] mt-5 font-light leading-relaxed">
            Interactive matrix mapping applicant baseline knowledge against verified professional benchmarks for <strong className="text-white font-medium">{activeCareer.title}</strong> in <span className="text-gorange">{activeCategory.name}</span>.
          </p>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-8">
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

        {/* Optical Glass Telemetry Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#6B7688] mb-4 pb-2 border-b border-[#1E232F]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">OPTICAL REFRACTION ENGINE: ACTIVE</span>
            <span className="text-[#3A4354]">—</span>
            <span className="text-[#8F9AA9]">REAL-TIME WEBGL MULTI-PASS REFRACTION &amp; CHROMATIC ABERRATION</span>
          </div>
          <div className="text-gorange hidden sm:block">
            [ DRAG THE FLOATING LENS OVER SKILL BARS TO REFRACT LIGHT ]
          </div>
        </div>

        {/* Large Data-Led Skill Gap Visualization with LiquidGlassContainer */}
        <LiquidGlassContainer className="border border-[#1E232F] bg-[#060709] p-6 lg:p-10 relative overflow-hidden">
          {/* Draggable Optical Glass Lens (Direct child of LiquidGlassContainer) */}
          <OpticalGlassLens
            careerTitle={activeCareer.title}
            score={calculatedReadiness}
            category={activeCategory.name}
            className="absolute top-8 right-8 z-30 hidden xl:block"
          />

          <div className="space-y-6">
            {activeCareer.skills.map((skill, index) => {
              const gap = Math.max(0, skill.required - skill.baseline);
              const isHovered = hoveredSkill === skill.name;

              return (
                <div 
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-5 border transition-all ${
                    isHovered ? 'border-gorange bg-[#0D1017]' : 'border-[#1E232F] bg-[#0A0C10]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#4E5664]">0{index + 1}</span>
                      <span className="font-display font-bold text-xl text-white">{skill.name}</span>
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
                  <div className="relative h-7 bg-[#121620] border border-[#1E232F] overflow-hidden">
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

                  <div className="flex items-center justify-between mt-2 font-mono text-[11px] text-[#6B7688]">
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
            <div className="flex flex-wrap items-center gap-6">
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
        </LiquidGlassContainer>
      </section>

      {/* =========================================================================
          04 — WHAT SHOULD YOU DO NEXT? (Recommended Actions & Evidence)
          ========================================================================= */}
      <section id="story-actions" className="relative border-b border-[#1E232F] px-6 lg:px-14 py-24 lg:py-32">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">04 / WHAT SHOULD YOU DO NEXT?</span>
            <span className="text-[#3A4354]">—</span>
            <span>RECOMMENDED ACTIONS &amp; EVIDENCE</span>
          </div>
          <div>[ PROOF-OF-COMPETENCE ENGINE ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Philosophy & Execution Steps */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-section text-white tracking-tight leading-[1.05]">
                Stop collecting passive advice. Create proof of capability.
              </h2>
              <p className="text-lg text-[#8F9AA9] mt-6 font-light leading-relaxed">
                Hiring managers, partners, and evaluation committees evaluate tangible proof, structured casework, and verified practice — not empty resume keywords.
              </p>

              {/* Execution Protocol */}
              <div className="mt-8 space-y-4 font-mono text-xs">
                <div className="p-4.5 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-gorange font-bold uppercase tracking-wider">PHASE 01: FOUNDATIONAL COMPETENCY DRILL</div>
                  <div className="text-[#8F9AA9] mt-1.5 font-sans text-sm leading-relaxed">Close core theoretical, analytical, and domain deficits with guided 20-min daily atomic tasks.</div>
                </div>
                <div className="p-4.5 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-white font-bold uppercase tracking-wider">PHASE 02: CAPSTONE PROOF &amp; CASE ARTIFACT</div>
                  <div className="text-[#8F9AA9] mt-1.5 font-sans text-sm leading-relaxed">Produce verifiable evidence tailored to your target profession — e.g. financial model, clinical case analysis, design system, or production codebase.</div>
                </div>
                <div className="p-4.5 border border-[#1E232F] bg-[#0A0C10]">
                  <div className="text-white font-bold uppercase tracking-wider">PHASE 03: LIVE MARKET REQUIREMENT AUDIT</div>
                  <div className="text-[#8F9AA9] mt-1.5 font-sans text-sm leading-relaxed">Audit your background directly against live job listings and market standards using our JD parser.</div>
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

          {/* Right: Curated Action / Project Artifact for Selected Career */}
          <div className="lg:col-span-7 bg-[#0B0D12] border border-gorange/40 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-[#1E232F] pb-4 mb-6">
                <span className="font-mono text-[11px] text-gorange font-bold uppercase tracking-widest">
                  {activeCareer.nextAction?.badge || 'RECOMMENDED ACTION ARTIFACT'}
                </span>
                <span className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest">
                  TARGET: {activeCareer.title.toUpperCase()}
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {activeCareer.nextAction?.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 my-6">
                {activeCareer.nextAction?.tags?.map(tag => (
                  <span key={tag} className="font-mono text-xs px-3 py-1.5 bg-[#151923] border border-[#232938] text-white">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-[#C8CFDB] font-light leading-relaxed mb-8">
                {activeCareer.nextAction?.description}
              </p>

              {/* Architecture Spec Breakdown */}
              <div className="p-6 border border-[#1E232F] bg-[#060709] font-mono text-xs space-y-3.5 mb-8">
                <div className="text-[#6B7688] uppercase tracking-widest text-[10px]">EVALUATION SPECIFICATION</div>
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-[#1E232F]/60">
                  <span>EVIDENCE FORMAT:</span>
                  <span className="text-white font-medium">{activeCareer.evidenceType}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-[#1E232F]/60">
                  <span>ESTIMATED TIMELINE:</span>
                  <span className="text-white">14 — 21 Days (Guided Milestones)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pt-1">
                  <span>MEASURABLE READINESS GAIN:</span>
                  <span className="text-gorange font-bold">{activeCareer.nextAction?.impactDelta || '+25% Career Readiness'}</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate('/projects')}
                className="font-mono text-xs uppercase tracking-widest px-7 py-3.5 border border-white text-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <span>Inspect Recommended Action</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          05 — ARE YOU READY? (Career Readiness Model)
          ========================================================================= */}
      <section id="story-readiness" className="relative border-b border-[#1E232F] px-6 lg:px-14 py-24 lg:py-32 bg-[#07080D]">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">05 / ARE YOU READY?</span>
            <span className="text-[#3A4354]">—</span>
            <span>CAREER READINESS MODEL</span>
          </div>
          <div>[ DEMONSTRATION &amp; PROJECTION ENGINE ]</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Oversized Readiness Score Display */}
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gorange mb-3">
              PROJECTED READINESS INDEX
            </div>
            
            <div className="flex items-baseline gap-4">
              <span className="font-display font-black text-8xl sm:text-[9rem] text-white tracking-tighter leading-none">
                {calculatedReadiness}
              </span>
              <span className="font-display font-bold text-4xl text-gorange">%</span>
            </div>

            <div className="h-3.5 w-full bg-[#121620] border border-[#1E232F] mt-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gorange"
                initial={{ width: '38%' }}
                animate={{ width: `${calculatedReadiness}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-[#6B7688] mt-3">
              <span>BASELINE: 38%</span>
              <span className="text-white font-medium">MARKET READY BAR: 80%+</span>
              <span>100% MAXIMUM</span>
            </div>

            <p className="font-mono text-[11px] text-[#6B7688] mt-6 leading-relaxed">
              * Demonstration model. Evaluates knowledge depth, practical problem solving, and verifiable portfolio evidence across your target discipline.
            </p>
          </div>

          {/* Right: Interactive Simulator Controls */}
          <div className="lg:col-span-6 bg-[#0B0D12] border border-[#1E232F] p-8 lg:p-10">
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B7688] mb-2">
              INTERACTIVE READINESS SIMULATOR
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-4">
              Simulate completing key career requirements
            </h3>
            <p className="text-base text-[#8F9AA9] font-light leading-relaxed mb-6">
              Adjust completed milestones to see how structured evidence moves your readiness score from applicant baseline to market-ready candidate:
            </p>

            {/* Slider / Counter Toggle */}
            <div className="space-y-5 mb-8">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white">COMPLETED CAREER MILESTONES:</span>
                <span className="text-gorange font-bold text-base">{simulatedCompletedActions} of {totalSimActions}</span>
              </div>

              <input 
                type="range"
                min="0"
                max={totalSimActions}
                value={simulatedCompletedActions}
                onChange={(e) => setSimulatedCompletedActions(parseInt(e.target.value))}
                className="w-full h-2 bg-[#1E232F] accent-gorange cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 border border-[#1E232F] bg-[#060709]">
                  <div className="text-[#6B7688]">CURRENT ESTIMATE:</div>
                  <div className="text-white font-bold mt-1">
                    {calculatedReadiness >= 80 ? 'Market Ready Candidate' : calculatedReadiness >= 65 ? 'Competitive Contender' : 'Foundation Building'}
                  </div>
                </div>
                <div className="p-3.5 border border-[#1E232F] bg-[#060709]">
                  <div className="text-[#6B7688]">SELECTION PROBABILITY:</div>
                  <div className="text-gorange font-bold mt-1">
                    {calculatedReadiness >= 80 ? 'HIGH (3.8×)' : calculatedReadiness >= 65 ? 'STRONG (2.2×)' : 'DEVELOPING (1.2×)'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/skill-gap')}
              className="w-full font-mono text-xs uppercase tracking-widest py-4 bg-white text-black font-bold hover:bg-gorange transition-colors flex items-center justify-center gap-2"
            >
              <span>Calculate Your Real Score</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          06 — START (Decisive Editorial Finale & Universal CTA)
          ========================================================================= */}
      <section className="relative px-6 lg:px-14 py-24 lg:py-36 bg-[#060709] overflow-hidden">
        
        {/* 3D Fluid Shader Gradient Mesh Background (Deferred, non-blocking) */}
        {load3D && (
          <React.Suspense fallback={<div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-[#FF8A00]/10 via-[#FF3366]/10 to-[#8B5CF6]/10" />}>
            <FluidShaderGradient 
              color1="#FF8A00" 
              color2="#FF3366" 
              color3="#8B5CF6" 
              type="waterPlane" 
              uSpeed={0.25}
              uStrength={2.6}
              opacity={0.35}
            />
          </React.Suspense>
        )}

        {/* Section Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-gorange inline-block" />
            <span className="text-white font-semibold">06 / START</span>
            <span className="text-[#3A4354]">—</span>
            <span>LAUNCH YOUR CAREER TRAJECTORY</span>
          </div>
          <div className="flex items-center gap-2 text-gorange">
            <span className="w-1.5 h-1.5 rounded-full bg-gorange animate-pulse" />
            <span>SHADER GRADIENT: ONLINE</span>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <h2 className="font-display font-extrabold text-display text-white tracking-tight leading-[0.95]">
            Whatever you want to become. <span className="text-gorange">Start here.</span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#8F9AA9] font-light mt-8 max-w-2xl leading-relaxed">
            Whether you're stepping into technology, finance, healthcare, public policy, creative arts, media, science, or engineering — understand exactly where you stand and what to build next.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/onboarding')}
              className="font-mono text-xs uppercase tracking-widest px-10 py-5 bg-gorange text-black font-bold hover:bg-[#FF6D24] transition-all flex items-center gap-3 text-sm shadow-xl"
            >
              <span>Start Your Career Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/career-selection"
              className="font-mono text-xs uppercase tracking-widest px-8 py-5 border border-[#2B3242] text-white hover:border-white transition-colors backdrop-blur-sm bg-black/40"
            >
              Explore All Careers &rarr;
            </Link>

            <Link
              to="/job-analysis"
              className="font-mono text-xs uppercase tracking-widest px-8 py-5 border border-[#1E232F] text-[#8F9AA9] hover:text-white hover:border-[#384255] transition-colors backdrop-blur-sm bg-black/40"
            >
              Run JD Parser
            </Link>
          </div>
        </div>

        {/* Universal Specification Footer */}
        <div className="relative z-10 mt-28 pt-12 border-t border-[#1E232F] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#6B7688]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-bold tracking-wider">KALPA &bull; 2026</span>
            <span>&bull;</span>
            <span>UNIVERSAL CAREER INTELLIGENCE PLATFORM</span>
            <span>&bull;</span>
            <span className="text-gorange">MULTI-DISCIPLINARY COHORTS</span>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <Link to="/career-selection" className="hover:text-white transition-colors">CAREERS</Link>
            <Link to="/job-analysis" className="hover:text-white transition-colors">JOB PARSER</Link>
            <Link to="/skill-gap" className="hover:text-white transition-colors">GAP MATRIX</Link>
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