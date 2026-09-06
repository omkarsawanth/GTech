import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from './UIComponents';

export const TaskCard = ({ task, onComplete, isLocked }) => {
  const isCompleted = task.status === 'completed';

  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-dark-900/40 p-4"
      >
        <div className="opacity-50 blur-[2px] pointer-events-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-base font-display font-bold text-slate-300">{task.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{task.description}</p>
            </div>
            {task.durationMinutes && (
              <Badge variant="glass" size="sm" className="shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.durationMinutes} min
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-dark-950/20 backdrop-blur-[1px]">
          <div className="bg-slate-900 p-2 rounded-full border border-slate-800 text-slate-400 shadow-lg">
            <Lock className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border p-4 bg-dark-900/60 backdrop-blur-xl transition-all duration-300 ${
        isCompleted 
          ? 'border-emerald-500/30 bg-emerald-950/10' 
          : 'border-slate-700/50 hover:border-solar-coral/50 shadow-[inset_4px_0_0_0_#FF3366]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {isCompleted && (
            <div className="mt-0.5 shrink-0 text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          <div>
            <h4 className={`text-base font-display font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
              {task.title}
            </h4>
            <p className="text-sm text-slate-300 mt-1">{task.description}</p>
            
            <div className="flex items-center gap-3 mt-3">
              {task.durationMinutes && (
                <Badge variant={isCompleted ? "glass" : "amber"} size="sm" className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {task.durationMinutes} min
                </Badge>
              )}
              {isCompleted ? (
                <Badge variant="glass" size="sm" className="text-emerald-400 border-emerald-500/30">
                  Completed
                </Badge>
              ) : (
                task.resourceUrl && (
                  <a 
                    href={task.resourceUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-solar-violet hover:text-rose-300 flex items-center gap-1 transition-colors"
                  >
                    {task.resourceTitle || 'Resource'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        
        {!isCompleted && (
          <Button 
            variant="solar" 
            size="sm" 
            onClick={() => onComplete && onComplete(task.id)}
            className="shrink-0"
          >
            Mark Complete ✓
          </Button>
        )}
      </div>
    </motion.div>
  );
};
