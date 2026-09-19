import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, RefreshCw, Share2, Copy, Check, Download, AlertCircle, Quote } from 'lucide-react';
import { exportRoastCardPNG } from '../../utils/canvasExport';

/**
 * RoastCard Component
 * Displays a savage-but-affectionate skill gap roast in a meme-card / chat-bubble format
 * with export-to-PNG and regeneration capabilities.
 */
export const RoastCard = ({
  roastData,
  onRegenerate,
  isLoading = false,
  targetRole = 'Software Engineer',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const roastText = roastData?.roast || "You're writing code like it's 2015 and hoping nobody runs `git blame`. Bold strategy.";
  const punchline = roastData?.punchline || "Bold strategy assuming your code just works.";
  const burnRating = roastData?.burnRating || 4;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${roastText}\n\n"${punchline}" — Roasted by Kalpa AI 🔥`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPNG = () => {
    setIsExporting(true);
    try {
      exportRoastCardPNG({
        roast: roastText,
        punchline,
        burnRating,
        targetRole,
      });
    } catch (err) {
      console.error('Failed to export roast canvas:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border border-[#283042] bg-[#0A0D14] p-6 lg:p-8 relative overflow-hidden ${className}`}
    >
      {/* Top Background Glow Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gorange/10 via-[#FF3366]/5 to-transparent blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E232F] font-mono text-[11px] uppercase tracking-widest text-[#7F8B9D]">
        <div className="flex items-center gap-2 text-gorange font-bold">
          <Flame className="w-4 h-4 text-gorange animate-pulse" />
          <span>AI SKILL ROAST // UNFILTERED</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#4E5664]">ROLE:</span>
          <span className="text-white font-medium">{targetRole}</span>
          <span className="px-2 py-0.5 bg-gorange/15 border border-gorange/40 text-gorange font-bold text-[10px]">
            {'🔥'.repeat(burnRating)} {burnRating}/5 BURN
          </span>
        </div>
      </div>

      {/* Main Roast Chat-Bubble / Meme Block */}
      <div className="my-6 relative">
        <div className="p-6 bg-[#07090E] border-l-4 border-gorange border-y border-r border-[#1E232F] rounded-r-lg relative">
          <Quote className="w-8 h-8 text-gorange/20 absolute top-4 right-4 pointer-events-none" />

          {isLoading ? (
            <div className="py-8 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-gorange animate-spin mx-auto" />
              <p className="font-mono text-xs text-[#8F9AA9]">Cooking up a fresh roast with Gemini...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="font-sans text-base sm:text-lg text-[#E2E8F0] leading-relaxed font-normal">
                {roastText}
              </p>

              {punchline && (
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-gorange font-mono text-xs font-bold">
                  <span>&gt;</span>
                  <span>"{punchline}"</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1E232F]">
        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 bg-[#121622] hover:bg-[#1A2030] text-white border border-[#283042] hover:border-gorange transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Roast Me Again</span>
          </button>

          <button
            onClick={handleCopy}
            className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 bg-[#121622] hover:bg-[#1A2030] text-[#94A3B8] hover:text-white border border-[#283042] transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <button
          onClick={handleExportPNG}
          disabled={isExporting || isLoading}
          className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 bg-gorange hover:bg-[#FF6D24] text-black font-bold transition-all flex items-center gap-2 shadow-lg"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Meme PNG</span>
        </button>
      </div>
    </motion.div>
  );
};

export default RoastCard;
