import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { CyberTiltCard } from './CyberTiltCard';
import { cyberAudio } from '../../utils/cyberAudio';
import { triggerCyberConfetti } from '../../utils/cyberConfetti';

export const TaskCard = ({ task, onComplete, isLocked }) => {
  const isCompleted = task?.status === 'completed';

  const handleComplete = (e) => {
    cyberAudio.playSuccess();
    if (e && e.clientX && e.clientY) {
      triggerCyberConfetti({
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        particleCount: 45,
      });
    } else {
      triggerCyberConfetti();
    }
    if (onComplete) {
      onComplete(task.id);
    }
  };

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden border border-[#1A212E] bg-[#090C12]/50 p-4"
      >
        <div className="opacity-40 blur-[1px] pointer-events-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-mono font-bold text-[#6B7688] uppercase tracking-wide">
                {task?.title || 'Locked Protocol'}
              </h4>
              <p className="text-xs text-[#4A5568] mt-1 line-clamp-2">{task?.description}</p>
            </div>
            {task?.durationMinutes && (
              <span className="shrink-0 flex items-center gap-1 font-mono text-[10px] text-[#4A5568] border border-[#1A212E] px-2 py-0.5">
                <Clock className="w-2.5 h-2.5" />
                {task.durationMinutes}M
              </span>
            )}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-[#07080D]/60 backdrop-blur-[1px]">
          <div className="bg-[#0D1017] p-2 border border-[#1E232F] text-[#6B7688] shadow-lg flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-solar-amber/70" />
            <span>LOCKED // PREREQUISITE REQUIRED</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <CyberTiltCard
      maxTilt={4}
      glare={true}
      corners={!isCompleted}
      soundOnHover={true}
      className={`p-4 border transition-all duration-300 ${
        isCompleted
          ? 'border-emerald-500/30 bg-emerald-950/15'
          : 'border-[#1E232F] hover:border-gorange/60 bg-[#0B0E14]/90 shadow-xl shadow-black/60'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {isCompleted && (
            <div className="mt-0.5 shrink-0 text-emerald-400">
              <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-[10px] uppercase tracking-wider font-bold ${isCompleted ? 'text-emerald-400' : 'text-gorange'}`}>
                {isCompleted ? 'PROTOCOL VERIFIED' : `DAY ${task?.dayNumber || 1} // ACTIVE DIRECTIVE`}
              </span>
            </div>

            <h4 className={`text-sm sm:text-base font-display font-bold ${isCompleted ? 'text-[#8F9AA9] line-through' : 'text-white'}`}>
              {task?.title}
            </h4>
            <p className="text-xs text-[#8F9AA9] mt-1 leading-relaxed">{task?.description}</p>
            
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {task?.durationMinutes && (
                <span className="font-mono text-[10px] px-2 py-0.5 bg-[#141822] border border-[#232B3B] text-solar-amber flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.durationMinutes} MIN
                </span>
              )}
              {isCompleted ? (
                <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider">
                  COMPLETE
                </span>
              ) : (
                task?.resourceUrl && (
                  <a 
                    href={task.resourceUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    onMouseEnter={() => cyberAudio.playHover()}
                    data-interactive="true"
                    className="font-mono text-[10px] text-gorange hover:text-solar-coral flex items-center gap-1 transition-colors uppercase tracking-wider underline underline-offset-2"
                  >
                    <span>{task.resourceTitle || 'Documentation'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        
        {!isCompleted && (
          <button
            onClick={handleComplete}
            onMouseEnter={() => cyberAudio.playHover()}
            data-interactive="true"
            className="shrink-0 px-3 py-2 bg-gradient-to-r from-gorange to-solar-coral hover:from-solar-coral hover:to-gorange text-white font-mono text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-lg shadow-gorange/25 hover:shadow-gorange/45 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span>Complete</span>
          </button>
        )}
      </div>
    </CyberTiltCard>
  );
};
export default TaskCard;
