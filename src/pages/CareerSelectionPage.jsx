import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  BrainCircuit, 
  BarChart3, 
  Code2, 
  ShieldCheck, 
  Cloud, 
  LineChart, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { Button, Card, Badge } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export const CareerSelectionPage = () => {
  const { user, updateUserProfile, CAREER_PROFILES } = useApp();
  const navigate = useNavigate();
  const [selectedCareerId, setSelectedCareerId] = useState(user.targetCareer || 'ai-engineer');

  const iconMap = {
    Cpu,
    BrainCircuit,
    BarChart3,
    Code2,
    ShieldCheck,
    Cloud,
    LineChart
  };

  const handleSelect = (careerId) => {
    setSelectedCareerId(careerId);
  };

  const handleContinue = () => {
    updateUserProfile({ targetCareer: selectedCareerId });
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-[#07090E] px-4 py-12 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="w-full max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-2 text-xs font-semibold text-purple-300 font-display">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Step 2 of 3 — Select Target Track
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Choose Your Target Tech Career</h1>
            <p className="text-sm text-slate-400 mt-1">GTech benchmarks your skill profile against live industry criteria for this track.</p>
          </div>

          <Button
            variant="glow"
            size="lg"
            onClick={handleContinue}
            className="mt-4 sm:mt-0 font-display"
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue to Assessment →
          </Button>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.values(CAREER_PROFILES).map((career, idx) => {
            const isSelected = selectedCareerId === career.id;
            const IconComponent = iconMap[career.iconName] || Cpu;

            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleSelect(career.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-950/80 to-slate-900 border-2 border-purple-500 shadow-xl scale-[1.02]'
                    : 'glass-card hover:border-purple-500/30 hover:bg-slate-900/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white rounded-full p-1 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-purple-600/30 text-purple-300 border border-purple-400/50' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">{career.category}</span>
                      <h3 className="text-lg font-display font-bold text-white tracking-tight">{career.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{career.description}</p>

                  <div className="mb-4">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 font-mono">Core Skills Required:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.slice(0, 4).map((sk) => (
                        <span
                          key={sk.name}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {sk.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Avg Salary</span>
                    <span className="font-bold text-slate-200 font-mono text-[11px]">{career.avgSalary}</span>
                  </div>
                  <Badge variant={isSelected ? 'purple' : 'slate'} size="sm">
                    {career.difficulty}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-10 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Active Target Selection</span>
            <h4 className="text-lg font-display font-bold text-white">
              Target Role: <span className="text-purple-300">{CAREER_PROFILES[selectedCareerId]?.title}</span>
            </h4>
          </div>

          <Button
            variant="glow"
            size="lg"
            onClick={handleContinue}
            className="font-display"
            icon={ArrowRight}
            iconPosition="right"
          >
            Continue to Assessment →
          </Button>
        </div>

      </div>
    </div>
  );
};
