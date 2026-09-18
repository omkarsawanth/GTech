import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerConstellation } from '../components/3d/CareerConstellation';

export const AIAnalysisTransitionPage = () => {
  const navigate = useNavigate();
  const { activeCareerProfile } = useApp();

  const [stepIndex, setStepIndex] = useState(0);

  const careerTitle = activeCareerProfile?.title || 'Target Role';

  const steps = [
    `Ingesting diagnostic response vectors for ${careerTitle}...`,
    `Benchmarking candidate profile against empirical market criteria...`,
    `Evaluating critical gaps and verified competencies...`,
    `Synthesizing chronological roadmap milestones and casework...`,
    `Compiling Career Command Center...`
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
          }, 600);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [navigate, steps.length]);

  const progressPercent = Math.round(((stepIndex + 1) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-[#07080D] px-4 flex flex-col justify-center items-center relative text-left overflow-hidden">
      {/* 3D Telemetry Lattice Canvas */}
      <CareerConstellation categoryIndex={1} className="opacity-45" />

      <div className="max-w-xl w-full relative z-10">
        
        {/* Monospace telemetry header */}
        <div className="font-mono text-xs text-gorange uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
          <Terminal className="w-3.5 h-3.5 text-gorange" />
          <span>[ TELEMETRY // CAREER INTELLIGENCE COMPILATION ]</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2">
          Calibrating Career Readiness.
        </h1>
        <p className="text-sm text-[#8F9AA9] font-light mb-8">
          Generating empirical benchmarks, competency differential, and milestone curriculum for <span className="text-white font-medium">{careerTitle}</span>.
        </p>

        {/* Telemetry Console Panel */}
        <div className="border border-[#1E232F] bg-[#0B0D12] p-6 space-y-4 mb-6">
          <div className="font-mono text-[11px] text-[#6B7688] uppercase tracking-wider pb-3 border-b border-[#1E232F] flex justify-between">
            <span>SYSTEM LOG</span>
            <span className="text-gorange">{progressPercent}%</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {steps.map((stepText, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 transition-opacity duration-200 ${
                    isDone 
                      ? 'text-[#8F9AA9]' 
                      : isCurrent 
                      ? 'text-white font-bold' 
                      : 'text-[#3E4756]'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {isDone ? (
                      <span className="text-emerald-400 font-bold">[✓]</span>
                    ) : isCurrent ? (
                      <span className="text-gorange animate-pulse">[›]</span>
                    ) : (
                      <span className="text-[#384152]">[ ]</span>
                    )}
                  </span>
                  <span className="leading-relaxed">{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#1E232F]">
          <div
            className="bg-gorange h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      </div>
    </div>
  );
};
