import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Share2, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  Copy,
  Check,
  Zap,
  Target,
  Layers
} from 'lucide-react';
import { Button, Badge } from './UIComponents';

export const ShareProgressModal = ({ 
  isOpen, 
  onClose, 
  careerTitle = 'AI Engineer', 
  readinessScore = 78, 
  currentStreak = 7, 
  skillsCount = 14, 
  totalSkills = 20, 
  userName = 'Student',
  initialTemplate = 'stats'
}) => {
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  // Auto-generate caption based on template
  const getShareCaption = () => {
    if (activeTemplate === 'badge') {
      return `Just unlocked the ${currentStreak}-Day Milestone Badge on Kalpa 🔥 Building my ${careerTitle} roadmap with 100% verified consistency! #BuildInPublic #AI`;
    } else if (activeTemplate === 'gap') {
      return `Closed ${readinessScore}% of my skill gap toward becoming an industry-ready ${careerTitle} on Kalpa 🚀 Roadmap in bio! #TechCareers`;
    }
    return `Just hit a ${currentStreak}-day learning streak on my ${careerTitle} roadmap on Kalpa! 🔥 Readiness score: ${readinessScore}%. Challenge me: ${window.location.origin}`;
  };

  const currentCaption = getShareCaption();

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(currentCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  // Generate Canvas for export
  const renderCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // 1. Base dark background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, '#07080D');
    bgGrad.addColorStop(0.5, '#0D1019');
    bgGrad.addColorStop(1, '#07080D');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Ambient glows
    const glow1 = ctx.createRadialGradient(250, 150, 10, 250, 150, 420);
    glow1.addColorStop(0, 'rgba(255, 51, 102, 0.28)');
    glow1.addColorStop(1, 'rgba(255, 51, 102, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 1200, 630);

    const glow2 = ctx.createRadialGradient(950, 480, 10, 950, 480, 450);
    glow2.addColorStop(0, 'rgba(255, 138, 0, 0.22)');
    glow2.addColorStop(1, 'rgba(255, 138, 0, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, 1200, 630);

    // Outer Cyber Frame
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 1140, 570);

    // Corner Tech Accents
    ctx.fillStyle = '#FF3366';
    ctx.fillRect(26, 26, 20, 4);
    ctx.fillRect(26, 26, 4, 20);
    ctx.fillRect(1154, 26, 20, 4);
    ctx.fillRect(1170, 26, 4, 20);
    ctx.fillRect(26, 596, 20, 4);
    ctx.fillRect(26, 580, 4, 20);
    ctx.fillRect(1154, 596, 20, 4);
    ctx.fillRect(1170, 580, 4, 20);

    // Header Branding
    ctx.font = 'bold 36px sans-serif';
    const logoGrad = ctx.createLinearGradient(80, 0, 300, 0);
    logoGrad.addColorStop(0, '#FF3366');
    logoGrad.addColorStop(0.5, '#FF8A00');
    logoGrad.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = logoGrad;
    ctx.fillText('Kalpa Solar AI', 80, 110);

    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = '#FF8A00';
    ctx.fillText('• VERIFIED CAREER ROADMAP MATRIX', 380, 108);

    // Render by active template
    if (activeTemplate === 'badge') {
      // TEMPLATE: MILESTONE UNLOCK BADGE
      ctx.font = '18px monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`OFFICIAL STREAK MILESTONE ACHIEVED BY ${userName.toUpperCase()}`, 80, 180);

      ctx.font = 'extrabold 50px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`${currentStreak}-Day Consistency Badge`, 80, 245);

      // Large Medal Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(80, 280, 1040, 220);
      ctx.strokeStyle = '#FF8A00';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 280, 1040, 220);

      // Huge Flame Medal Center-left
      ctx.font = '80px sans-serif';
      ctx.fillText('🔥', 130, 420);

      ctx.font = 'bold 44px sans-serif';
      ctx.fillStyle = '#FF8A00';
      ctx.fillText(`${currentStreak} CONSECUTIVE DAYS ACTIVE`, 250, 360);

      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText(`Trajectory Target: ${careerTitle}  •  Readiness: ${readinessScore}%`, 250, 410);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#10B981';
      ctx.fillText('✓ Top 5% Habit Builder Tier  •  Protected by Streak Freeze  •  Zero Days Slipped', 250, 455);
    } else if (activeTemplate === 'gap') {
      // TEMPLATE: BEFORE & AFTER SKILL GAP
      ctx.font = '18px monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`SKILL GAP CLOSURE BENCHMARK FOR ${userName.toUpperCase()}`, 80, 180);

      ctx.font = 'extrabold 50px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Role Trajectory: ${careerTitle}`, 80, 245);

      // Comparison Bar Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(80, 280, 1040, 220);
      ctx.strokeStyle = '#FF3366';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 280, 1040, 220);

      // Progress Track
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('READINESS PROGRESSION', 120, 335);

      // Outer Bar Track
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(120, 360, 800, 36);

      // Filled Gradient Bar
      const barGrad = ctx.createLinearGradient(120, 0, 920, 0);
      barGrad.addColorStop(0, '#FF3366');
      barGrad.addColorStop(1, '#FF8A00');
      ctx.fillStyle = barGrad;
      ctx.fillRect(120, 360, (800 * readinessScore) / 100, 36);

      ctx.font = 'bold 32px monospace';
      ctx.fillStyle = '#FF3366';
      ctx.fillText(`${readinessScore}%`, 940, 390);

      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#CBD5E1';
      ctx.fillText(`Skills Mastered: ${skillsCount} of ${totalSkills} core capabilities verified via AI roadmap.`, 120, 445);
    } else {
      // TEMPLATE: STATS MATRIX
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`CAREER TARGET FOR ${userName.toUpperCase()}`, 80, 180);

      ctx.font = 'extrabold 50px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(careerTitle, 80, 245);

      // 3 Stat Panels
      drawStatBox(ctx, 80, 290, 320, 190, 'Career Readiness', `${readinessScore}%`, '#FF3366', 'Benchmark Qualified');
      drawStatBox(ctx, 440, 290, 320, 190, 'Daily Streak', `${currentStreak} Days 🔥`, '#FF8A00', 'Active Habit Loop');
      drawStatBox(ctx, 800, 290, 320, 190, 'Skills Mastered', `${skillsCount} / ${totalSkills}`, '#8B5CF6', 'Verified Capabilities');
    }

    // Footer Watermark
    ctx.font = '16px monospace';
    ctx.fillStyle = '#64748B';
    ctx.fillText('VERIFIED VIA KALPA PLATFORM  •  POWERED BY GEMINI 3.6 FLASH  •  KALPA.AI', 80, 545);

    return canvas;
  };

  const drawStatBox = (ctx, x, y, w, h, label, value, color, subtitle) => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(label.toUpperCase(), x + 25, y + 45);

    ctx.font = 'bold 42px monospace';
    ctx.fillStyle = color;
    ctx.fillText(value, x + 25, y + 110);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(subtitle, x + 25, y + 155);
  };

  const handleDownload = () => {
    setIsGenerating(true);
    try {
      const canvas = renderCanvas();
      const link = document.createElement('a');
      link.download = `kalpa-${activeTemplate}-${careerTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      handleCopyCaption();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    setIsGenerating(true);
    try {
      const canvas = renderCanvas();

      canvas.toBlob(async (blob) => {
        if (!blob) {
          handleDownload();
          return;
        }

        const file = new File([blob], `kalpa-progress-${currentStreak}d.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `My Kalpa Progress: ${careerTitle}`,
              text: currentCaption,
            });
            setIsGenerating(false);
            return;
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') {
              setIsGenerating(false);
              return;
            }
          }
        }

        // Fallback for desktop or non-file-sharing browsers
        handleDownload();
      });
    } catch (err) {
      handleDownload();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-dark-900 border border-solar-coral/30 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-solar-coral/20 text-rose-300 border border-solar-coral/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-white">Share Your Trajectory</h3>
                <p className="text-xs text-slate-400">Export high-resolution card optimized for Stories, WhatsApp &amp; Discord</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Alternate Visual Templates Switcher */}
          <div className="px-4 sm:px-6 pt-4 flex items-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <Layers className="w-3 h-3 text-solar-coral" /> Layout:
            </span>
            <button
              onClick={() => setActiveTemplate('stats')}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-semibold transition-all shrink-0 ${
                activeTemplate === 'stats'
                  ? 'bg-solar-coral text-white shadow-md shadow-rose-950/40'
                  : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Stats Matrix
            </button>
            <button
              onClick={() => setActiveTemplate('gap')}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-semibold transition-all shrink-0 ${
                activeTemplate === 'gap'
                  ? 'bg-solar-amber text-dark-950 shadow-md shadow-amber-950/40'
                  : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Skill Gap Delta
            </button>
            <button
              onClick={() => setActiveTemplate('badge')}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-semibold transition-all shrink-0 ${
                activeTemplate === 'badge'
                  ? 'bg-solar-violet text-white shadow-md shadow-purple-950/40'
                  : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Milestone Badge 🔥
            </button>
          </div>

          {/* Visual Card Live Preview */}
          <div className="p-6">
            <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-dark-950 via-[#0E101A] to-dark-950 border border-solar-coral/40 relative overflow-hidden shadow-2xl">
              {/* Radial Glowing Mesh */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-solar-coral/15 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-solar-amber/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/80 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-solar-coral to-solar-amber flex items-center justify-center font-display font-extrabold text-white text-xs">
                    K
                  </span>
                  <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-solar-coral via-solar-amber to-solar-violet text-xs">
                    Kalpa Solar AI
                  </span>
                </div>
                <Badge variant="coral" size="sm" className="font-mono text-[9px] tracking-wider">
                  VERIFIED PROFILE
                </Badge>
              </div>

              {/* Dynamic Template Content */}
              {activeTemplate === 'badge' ? (
                <div className="relative z-10 my-2">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900/90 border border-solar-amber/40">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-solar-coral to-solar-amber flex items-center justify-center text-3xl shadow-lg shrink-0">
                      🔥
                    </div>
                    <div>
                      <Badge variant="amber" size="sm" className="font-mono text-[9px]">
                        {currentStreak} DAYS CONSECUTIVE
                      </Badge>
                      <h4 className="text-lg font-display font-bold text-white mt-1">
                        Consistency Badge Unlocked
                      </h4>
                      <p className="text-xs text-slate-300">
                        Targeting: <strong className="text-white">{careerTitle}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTemplate === 'gap' ? (
                <div className="relative z-10 my-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Role Benchmark: {careerTitle}
                  </div>
                  <div className="p-4 rounded-2xl bg-dark-900/90 border border-solar-coral/30">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-300">Skill Gap Closed</span>
                      <span className="text-solar-coral font-bold text-base">{readinessScore}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-solar-coral to-solar-amber h-full rounded-full"
                        style={{ width: `${readinessScore}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-3">
                      {skillsCount} of {totalSkills} capabilities mastered for industry readiness.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Target Role Matrix
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-4">
                    {careerTitle}
                  </h2>

                  {/* 3 Metric Pillars */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-dark-900/80 border border-solar-coral/30">
                      <div className="text-[9px] font-mono uppercase text-slate-400">Readiness</div>
                      <div className="text-xl font-bold font-mono text-solar-coral mt-0.5">
                        {readinessScore}%
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-900/80 border border-solar-amber/30">
                      <div className="text-[9px] font-mono uppercase text-slate-400">Daily Streak</div>
                      <div className="text-xl font-bold font-mono text-solar-amber mt-0.5 flex items-center gap-1">
                        {currentStreak} <Flame className="w-4 h-4 text-solar-amber animate-pulse" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-900/80 border border-solar-violet/30">
                      <div className="text-[9px] font-mono uppercase text-slate-400">Skills</div>
                      <div className="text-xl font-bold font-mono text-solar-violet mt-0.5">
                        {skillsCount}<span className="text-xs text-slate-500 font-normal">/{totalSkills}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer watermark */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-3 border-t border-slate-800/80 relative z-10">
                <span>kalpa.ai/verify</span>
                <span>Gemini 3.6 Flash Engine</span>
              </div>
            </div>
          </div>

          {/* Auto-Generated Shareable Caption */}
          <div className="px-6 pb-4">
            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-sans truncate">{currentCaption}</span>
              <button
                onClick={handleCopyCaption}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1 transition-colors"
              >
                {copiedCaption ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedCaption ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 p-5 bg-dark-950/60 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isGenerating}
              className="text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download PNG
            </Button>

            <Button
              variant="solar"
              size="sm"
              onClick={handleNativeShare}
              disabled={isGenerating}
              className="text-xs font-bold"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share to Stories / Discord 🚀
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
