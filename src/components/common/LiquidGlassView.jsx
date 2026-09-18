import React, { useEffect, useRef, useState } from 'react';
import { LiquidGlass } from '@ybouane/liquidglass';
import { Sparkles, Move, Eye, ShieldCheck, Zap } from 'lucide-react';

/**
 * LiquidGlassContainer
 * Reusable wrapper that orchestrates LiquidGlass WebGL refraction pipeline
 * with automatic cleanup and seamless CSS fallback.
 */
export const LiquidGlassContainer = ({
  children,
  className = '',
  defaults = {},
  onReady,
  ...props
}) => {
  const rootRef = useRef(null);
  const instanceRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    let active = true;

    async function initGlass() {
      if (!rootRef.current) return;
      try {
        // Query direct child glass elements
        const glassElements = rootRef.current.querySelectorAll('.glass-optical');
        if (!glassElements || glassElements.length === 0) return;

        // Initialize WebGL multi-pass glass shader pipeline
        const instance = await LiquidGlass.init({
          root: rootRef.current,
          glassElements: Array.from(glassElements),
          defaults: {
            blurAmount: 0.2,
            refraction: 0.72,
            chromAberration: 0.08,
            edgeHighlight: 0.1,
            specular: 0.4,
            fresnel: 1.0,
            cornerRadius: 20,
            shadowOpacity: 0.3,
            ...defaults,
          },
        });

        if (active) {
          instanceRef.current = instance;
          if (onReady) onReady(instance);
        } else {
          instance.destroy();
        }
      } catch (err) {
        console.warn('[LiquidGlass] WebGL optical shader fallback to CSS backdrop:', err);
        if (active) setIsSupported(false);
      }
    }

    // Delay init slightly to let initial DOM & fonts settle
    const timer = setTimeout(() => {
      initGlass();
    }, 150);

    return () => {
      active = false;
      clearTimeout(timer);
      if (instanceRef.current) {
        try {
          instanceRef.current.destroy();
        } catch {
          // ignore cleanup issues
        }
        instanceRef.current = null;
      }
    };
  }, [defaults, onReady]);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * OpticalGlassLens
 * An interactive, draggable floating glass lens that refracts background content
 * with real-time WebGL chromatic aberration and refraction shaders.
 */
export const OpticalGlassLens = ({
  careerTitle = 'Software Engineer',
  score = 84,
  category = 'Technology',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('optical');

  // Liquid glass shader configuration
  const glassConfig = {
    floating: true,
    blurAmount: 0.15,
    refraction: 0.85,
    chromAberration: 0.14,
    edgeHighlight: 0.12,
    specular: 0.5,
    fresnel: 1.2,
    cornerRadius: 24,
    zRadius: 36,
    shadowOpacity: 0.35,
    shadowSpread: 12,
  };

  return (
    <div
      className={`glass-optical p-6 text-white select-none backdrop-blur-md bg-[#0A0D14]/70 border border-white/20 shadow-2xl transition-shadow cursor-grab active:cursor-grabbing ${className}`}
      data-config={JSON.stringify(glassConfig)}
      style={{
        minWidth: '320px',
        maxWidth: '380px',
      }}
    >
      {/* Header Bar with Drag Handle */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 font-mono text-[10px] uppercase tracking-widest text-[#8F9AA9]">
        <div className="flex items-center gap-2 text-gorange font-semibold">
          <Move className="w-3.5 h-3.5 animate-pulse" />
          <span>DRAG OPTICAL LENS</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60">
          <Zap className="w-3 h-3 text-gorange" />
          <span>WEBGL 2.0 SHADER</span>
        </div>
      </div>

      {/* Target Spec Information */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#A0AEC0]">TARGET AUDIT</span>
          <span className="px-2 py-0.5 bg-gorange/20 border border-gorange/40 text-gorange font-mono text-[10px] font-bold">
            {category}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg text-white leading-tight">
          {careerTitle}
        </h3>

        {/* Live Refraction Metric */}
        <div className="p-3 bg-black/40 border border-white/10 rounded-lg flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#718096]">READINESS VECTOR</div>
            <div className="font-display font-black text-2xl text-white mt-0.5">{score}% READY</div>
          </div>
          <div className="text-right font-mono text-[10px] space-y-0.5 text-[#A0AEC0]">
            <div>REFRACT: <span className="text-white font-bold">0.85λ</span></div>
            <div>ABERR: <span className="text-gorange font-bold">+14%</span></div>
          </div>
        </div>

        <p className="text-xs text-[#CBD5E1] font-light leading-relaxed">
          Move this optical lens over any card or typography to witness real-time multi-pass glass refraction, chromatic fringing, and depth blur.
        </p>

        {/* Bottom Interactive Chip */}
        <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-[#94A3B8]">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED EVIDENCE
          </span>
          <span className="text-[#64748B]">[ REFRACTING DOM ]</span>
        </div>
      </div>
    </div>
  );
};

export default LiquidGlassContainer;
