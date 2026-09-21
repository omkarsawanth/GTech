import React from 'react';
import { motion } from 'framer-motion';

/**
 * CyberRadarBadge — Refero & KokonutUI inspired live telemetry radar pill.
 * Features an SVG radar sweep, live status pulse, and monospaced diagnostics.
 */
const COLOR_VARIANTS = {
  orange: {
    border: 'border-gorange/40 hover:border-gorange/70',
    bg: 'bg-[#100C09]/90',
    text: 'text-gorange',
    dot: 'bg-gorange',
    radar: '#FF5500',
  },
  amber: {
    border: 'border-solar-amber/40 hover:border-solar-amber/70',
    bg: 'bg-[#120D06]/90',
    text: 'text-solar-amber',
    dot: 'bg-solar-amber',
    radar: '#FF8A00',
  },
  cyan: {
    border: 'border-cyan-500/40 hover:border-cyan-500/70',
    bg: 'bg-[#080F16]/90',
    text: 'text-cyan-400',
    dot: 'bg-cyan-400',
    radar: '#06B6D4',
  },
  emerald: {
    border: 'border-emerald-500/40 hover:border-emerald-500/70',
    bg: 'bg-[#07130D]/90',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    radar: '#10B981',
  },
};

/**
 * CyberRadarBadge — Refero & KokonutUI inspired live telemetry radar pill.
 * Features an SVG radar sweep, live status pulse, and monospaced diagnostics.
 */
export const CyberRadarBadge = ({
  label,
  status = 'SYSTEM ONLINE',
  latency = '24ms',
  node = 'NODE-01',
  variant = 'orange', // 'orange' | 'amber' | 'cyan' | 'emerald'
  className = '',
}) => {
  const colors = COLOR_VARIANTS[variant] || COLOR_VARIANTS.orange;
  const displayText = label || status;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 border font-mono text-[10px] tracking-wider uppercase backdrop-blur-md transition-all shadow-md shadow-black/40 ${colors.border} ${colors.bg} ${className}`}
    >
      {/* Animated Mini Radar Scanner */}
      <div className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="10" stroke={colors.radar} strokeWidth="1.5" fill="none" opacity="0.4" />
          <circle cx="12" cy="12" r="5" stroke={colors.radar} strokeWidth="1" fill="none" opacity="0.3" />
        </svg>

        {/* Rotating sweep line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-[1px] h-1.5 origin-bottom"
            style={{
              background: `linear-gradient(to top, ${colors.radar}, transparent)`,
            }}
          />
        </motion.div>

        {/* Blinking center beacon */}
        <div className={`w-1 h-1 rounded-full ${colors.dot} animate-ping`} />
      </div>

      <span className={`font-bold ${colors.text}`}>{displayText}</span>
      <span className="text-[#566173]">/</span>
      <span className="text-[#8F9AA9] hidden sm:inline">{node}</span>
      <span className="text-[#566173] hidden sm:inline">•</span>
      <span className="text-[#6B7688] font-semibold">{latency}</span>
    </div>
  );
};

export default CyberRadarBadge;
