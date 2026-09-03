import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BrainCircuit, Cpu, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIAnalysisTransitionPage = () => {
  const navigate = useNavigate();
  const { activeCareerProfile, analysisResult } = useApp();

  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Parsing your skill assessment responses...',
    'Benchmarking current profiles against live job market criteria...',
    `Calculating career readiness matrix for ${activeCareerProfile?.title || 'AI Engineer'}...`,
    'Categorizing Strong Skills, Developing Areas & Critical Gaps...',
    'Constructing personalized vertical learning roadmap phases...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/dashboard');
          }, 800);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [navigate, steps.length]);

  return (
    <div className="min-h-screen bg-[#07090E] px-4 flex flex-col justify-center items-center relative overflow-hidden text-center">
      {/* Glow pulse backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Animated Scanner Ring */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 animate-spin duration-3000">
            <div className="w-full h-full bg-slate-950 rounded-[20px]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-purple-400">
            <BrainCircuit className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          AI is analyzing your career readiness...
        </h2>
        <p className="text-xs text-slate-400 mt-2">
          Generating instant baseline stats, radar gap matrix, and custom roadmap.
        </p>

        {/* Live Step Progress */}
        <div className="mt-8 p-6 rounded-2xl glass-panel border border-purple-500/30 text-left space-y-3">
          {steps.map((stepText, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                  isDone ? 'text-purple-300 font-medium' : isCurrent ? 'text-white font-bold' : 'text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>

        {/* Progress percent bar */}
        <div className="mt-6 w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-purple-600 to-cyan-400 h-full transition-all duration-500"
            style={{ width: `${Math.round(((stepIndex + 1) / steps.length) * 100)}%` }}
          />
        </div>

      </div>
    </div>
  );
};
