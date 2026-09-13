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
  Check
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
  userName = 'Student' 
}) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');

      // 1. Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
      bgGrad.addColorStop(0, '#07080D');
      bgGrad.addColorStop(0.5, '#0E1019');
      bgGrad.addColorStop(1, '#07080D');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // 2. Ambient glows
      const glow1 = ctx.createRadialGradient(250, 150, 10, 250, 150, 400);
      glow1.addColorStop(0, 'rgba(255, 51, 102, 0.25)');
      glow1.addColorStop(1, 'rgba(255, 51, 102, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, 1200, 630);

      const glow2 = ctx.createRadialGradient(950, 480, 10, 950, 480, 450);
      glow2.addColorStop(0, 'rgba(255, 138, 0, 0.2)');
      glow2.addColorStop(1, 'rgba(255, 138, 0, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, 1200, 630);

      // Outer Frame
      ctx.strokeStyle = 'rgba(255, 51, 102, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 1140, 570);

      // Corner Accents
      ctx.fillStyle = '#FF3366';
      ctx.fillRect(26, 26, 16, 4);
      ctx.fillRect(26, 26, 4, 16);
      ctx.fillRect(1158, 26, 16, 4);
      ctx.fillRect(1170, 26, 4, 16);
      ctx.fillRect(26, 600, 16, 4);
      ctx.fillRect(26, 588, 4, 16);
      ctx.fillRect(1158, 600, 16, 4);
      ctx.fillRect(1170, 588, 4, 16);

      // 3. Header Logo
      ctx.font = 'bold 36px sans-serif';
      const logoGrad = ctx.createLinearGradient(80, 0, 300, 0);
      logoGrad.addColorStop(0, '#FF3366');
      logoGrad.addColorStop(0.5, '#FF8A00');
      logoGrad.addColorStop(1, '#8B5CF6');
      ctx.fillStyle = logoGrad;
      ctx.fillText('GTech Solar AI', 80, 110);

      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#FF8A00';
      ctx.fillText('• CAREER READINESS MATRIX', 380, 108);

      // 4. Target Role
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(`CAREER TARGET FOR ${userName.toUpperCase()}`, 80, 190);

      ctx.font = 'extrabold 52px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(careerTitle, 80, 255);

      // 5. Stat Panels
      // Stat 1: Readiness
      drawStatBox(ctx, 80, 310, 320, 180, 'Career Readiness', `${readinessScore}%`, '#FF3366', 'Benchmark Qualified');
      // Stat 2: Streak
      drawStatBox(ctx, 440, 310, 320, 180, 'Daily Streak', `${currentStreak} Days 🔥`, '#FF8A00', 'Active Learner');
      // Stat 3: Skills
      drawStatBox(ctx, 800, 310, 320, 180, 'Skills Mastered', `${skillsCount} / ${totalSkills}`, '#8B5CF6', 'Verified Capabilities');

      // 6. Footer
      ctx.font = '16px monospace';
      ctx.fillStyle = '#64748B';
      ctx.fillText('VERIFIED VIA GTECH PLATFORM  •  POWERED BY GEMINI AI  •  GTECH.AI', 80, 550);

      const link = document.createElement('a');
      link.download = `gtech-progress-${careerTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const drawStatBox = (ctx, x, y, w, h, label, value, color, subtitle) => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(label.toUpperCase(), x + 25, y + 45);

    ctx.font = 'bold 42px monospace';
    ctx.fillStyle = color;
    ctx.fillText(value, x + 25, y + 105);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.fillText(subtitle, x + 25, y + 145);
  };

  const handleShare = async () => {
    const shareData = {
      title: `My GTech Career Progress: ${careerTitle}`,
      text: `I'm ${readinessScore}% ready for my target role as ${careerTitle} with a ${currentStreak}-day learning streak on GTech! 🔥`,
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `🔥 ${readinessScore}% Career Ready for ${careerTitle} on GTech! Streak: ${currentStreak} days. Build yours: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-solar-coral/20 text-rose-300 border border-solar-coral/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">Share Your Career Milestone</h3>
                <p className="text-xs text-slate-400">Export high-resolution card for LinkedIn, Twitter, or your portfolio</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Card Preview */}
          <div className="p-6">
            <div 
              ref={cardRef}
              className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-dark-950 via-[#0E101A] to-dark-950 border border-solar-coral/40 relative overflow-hidden shadow-2xl"
            >
              {/* Radial Glowing Mesh */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-solar-coral/15 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-solar-amber/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-solar-coral to-solar-amber flex items-center justify-center font-display font-extrabold text-white text-xs">
                    G
                  </span>
                  <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-solar-coral via-solar-amber to-solar-violet text-sm">
                    GTech Solar AI
                  </span>
                </div>
                <Badge variant="coral" size="sm" className="font-mono text-[10px] tracking-wider">
                  VERIFIED PROFILE
                </Badge>
              </div>

              <div className="relative z-10 mb-6">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Target Role Matrix
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {careerTitle}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Candidate: <strong className="text-white font-semibold">{userName}</strong>
                </div>
              </div>

              {/* 3 Metric Pillars */}
              <div className="grid grid-cols-3 gap-3 relative z-10 mb-6">
                <div className="p-4 rounded-xl bg-dark-900/80 border border-solar-coral/30">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Readiness</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-solar-coral mt-1">
                    {readinessScore}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Top Match</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900/80 border border-solar-amber/30">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Daily Streak</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-solar-amber mt-1 flex items-center gap-1">
                    {currentStreak} <Flame className="w-5 h-5 text-solar-amber animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Consistency</div>
                </div>

                <div className="p-4 rounded-xl bg-dark-900/80 border border-solar-violet/30">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Skills</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-solar-violet mt-1">
                    {skillsCount}<span className="text-xs text-slate-500 font-normal">/{totalSkills}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Mastered</div>
                </div>
              </div>

              {/* Footer watermark */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800/80 relative z-10">
                <span>gtech.ai/verify</span>
                <span>Powered by Gemini AI</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-dark-950/60 border-t border-slate-800">
            <button
              onClick={copyToClipboard}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied share link to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy progress text</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                onClick={handleShare}
                className="w-full sm:w-auto text-xs"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                variant="solar"
                size="md"
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full sm:w-auto text-xs font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Download Image (PNG)'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
