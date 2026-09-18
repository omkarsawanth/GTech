import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  BrainCircuit, 
  User, 
  Bot, 
  Loader2, 
  ArrowRight,
  HelpCircle 
} from 'lucide-react';
import { Button } from './UIComponents';
import { askCareerMentorAI } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const MentorChatModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'mentor',
      text: `Hello ${user?.displayName?.split(' ')[0] || 'there'}! I'm your Kalpa AI Career Mentor. I have full context on your target career, current skills, and learning roadmap. What would you like guidance on today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "What should I learn this week?",
    "How do I prepare for technical interviews?",
    "Which project should I build next?",
    "How can I close my biggest skill gap faster?"
  ];

  const handleSend = async (questionText = input) => {
    const q = (questionText || '').trim();
    if (!q || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setIsLoading(true);

    try {
      const res = await askCareerMentorAI(q);
      setMessages(prev => [...prev, { sender: 'mentor', text: res.answer }]);
    } catch (err) {
      console.error('[MentorChatModal] Error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'mentor',
          text: err.message || "I'm having trouble connecting to the Kalpa backend AI service right now. Please ensure the server is running on port 5000 with your GEMINI_API_KEY configured."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-2xl bg-dark-900 border border-solar-coral/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] relative"
        >
          {/* Header */}
          <div className="p-4 px-6 bg-dark-950 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-solar-coral via-solar-amber to-solar-violet p-0.5 shadow-md shadow-rose-950/40">
                <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center text-solar-coral">
                  <BrainCircuit className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  AI Career Mentor <span className="text-[10px] px-2 py-0.5 rounded-full bg-solar-coral/20 text-rose-300 font-mono">Gemini 3.6 Flash</span>
                </h3>
                <p className="text-xs text-slate-400">Context-aware personalized career advisor</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'mentor' && (
                  <div className="w-7 h-7 rounded-lg bg-solar-coral/20 border border-solar-coral/30 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'gradient-solar-btn text-white rounded-tr-none shadow-md'
                      : 'bg-dark-850 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-solar-amber/20 border border-solar-amber/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-solar-coral/20 border border-solar-coral/30 flex items-center justify-center text-rose-300 shrink-0">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-dark-850 border border-slate-800 rounded-2xl rounded-tl-none p-3 text-xs text-rose-200 animate-pulse">
                  Reasoning with your live Kalpa career profile...
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-2 border-t border-slate-800/60 bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-slate-500 uppercase font-semibold shrink-0">Quick Ask:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 px-6 bg-slate-900 border-t border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your mentor anything about your tech career roadmap..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="glow"
              size="sm"
              disabled={isLoading || !input.trim()}
              icon={Send}
            >
              Send
            </Button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
