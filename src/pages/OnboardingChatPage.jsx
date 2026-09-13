import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  BrainCircuit, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Code2, 
  BookOpen,
  Compass,
  Swords,
  Share2
} from 'lucide-react';
import { Button, Badge } from '../components/common/UIComponents';
import { ShareProgressModal } from '../components/common/ShareProgressModal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const VIBE_EMOJIS = ['🔥', '💡', '🚀', '🎯', '👀'];

const QUESTIONS = [
  {
    id: 'targetCareer',
    botText: "Hey there! 👋 Welcome to GTech. I'm your AI Career Navigator. What tech role are you aiming to land?",
    options: [
      { label: 'AI Engineer', value: 'ai-engineer', badge: 'Trending' },
      { label: 'Full Stack Developer', value: 'fullstack-developer', badge: 'High Demand' },
      { label: 'Data Scientist', value: 'data-scientist', badge: 'Top Salary' },
      { label: 'ML Engineer', value: 'ml-engineer', badge: 'Advanced' },
      { label: 'Software Engineer', value: 'software-engineer', badge: 'Core' },
      { label: 'Cloud Engineer', value: 'cloud-engineer', badge: 'Infrastructure' },
      { label: 'Cybersecurity', value: 'cybersecurity-engineer', badge: 'Security' },
    ],
    type: 'single',
  },
  {
    id: 'experienceLevel',
    botText: "Great choice! How would you describe your current software or tech experience?",
    options: [
      { label: 'Student / College Degree', value: 'College Student' },
      { label: 'Self-Taught / Bootcamp', value: 'Self-Taught' },
      { label: 'Junior Developer (0-1 yrs)', value: 'Junior Developer' },
      { label: 'Career Switcher', value: 'Career Switcher' },
    ],
    type: 'single',
  },
  {
    id: 'skills',
    botText: "Got it! Which of these skills do you already have some experience with? (Select all that apply)",
    options: [
      { label: 'Python', value: 'Python' },
      { label: 'JavaScript / TypeScript', value: 'JavaScript' },
      { label: 'React.js', value: 'React' },
      { label: 'SQL', value: 'SQL' },
      { label: 'Git & GitHub', value: 'Git' },
      { label: 'Machine Learning Basics', value: 'Machine Learning' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Data Structures', value: 'Data Structures' },
      { label: 'Docker / Cloud', value: 'Docker' },
    ],
    type: 'multi',
  },
  {
    id: 'weeklyHours',
    botText: "Consistency is everything. How many hours per week can you realistically dedicate to your learning roadmap?",
    options: [
      { label: '5-10 Hours / week (Casual)', value: '5-10 hours' },
      { label: '10-20 Hours / week (Recommended)', value: '10-20 hours' },
      { label: '20+ Hours / week (Full Sprint)', value: '20+ hours' },
    ],
    type: 'single',
  },
  {
    id: 'learningStyle',
    botText: "Last question! How do you learn best so I can curate the right daily tasks for you?",
    options: [
      { label: 'Hands-on Projects & Building', value: 'projects' },
      { label: 'Interactive Tutorials & Guides', value: 'interactive' },
      { label: 'Deep Video Courses & Docs', value: 'video-docs' },
      { label: 'Fast-paced Challenges & Quizzes', value: 'challenges' },
    ],
    type: 'single',
  }
];

export const OnboardingChatPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refUser = searchParams.get('ref');
  const refRank = searchParams.get('rank');

  const { user, updateUserProfile } = useApp();
  const { user: authUser } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState(() => {
    const initial = [];
    if (refUser) {
      initial.push({
        sender: 'bot',
        text: `🥊 CHALLENGE ACCEPTED! Your peer @${refUser} (Rank #${refRank || '3'} on the global leaderboard) challenged you to beat their score! Let's get your custom roadmap locked in.`,
        isChallengeIntro: true,
      });
    }
    initial.push({
      sender: 'bot',
      text: QUESTIONS[0].botText,
      options: QUESTIONS[0].options,
      type: QUESTIONS[0].type,
    });
    return initial;
  });

  const [reactions, setReactions] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isStarterModalOpen, setIsStarterModalOpen] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [answers, setAnswers] = useState({
    name: authUser?.displayName || user?.name || 'Student',
    targetCareer: 'ai-engineer',
    experienceLevel: 'Entry-Level',
    skills: [],
    weeklyHours: '10-20 hours',
    learningStyle: 'projects',
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleReaction = (msgIdx, emoji) => {
    setReactions(prev => ({
      ...prev,
      [msgIdx]: prev[msgIdx] === emoji ? null : emoji
    }));
  };

  const handleSingleSelect = (option) => {
    const question = QUESTIONS[currentStepIndex];
    const newAnswers = { ...answers, [question.id]: option.value };
    setAnswers(newAnswers);

    // Append user message
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: option.label }
    ]);

    advanceToNextStep(newAnswers, currentStepIndex + 1);
  };

  const handleMultiToggle = (val) => {
    setSelectedMulti(prev => 
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const submitMultiSelect = () => {
    const question = QUESTIONS[currentStepIndex];
    const newSkills = selectedMulti.length > 0 ? selectedMulti : ['Python', 'Git'];
    const newAnswers = { ...answers, skills: newSkills };
    setAnswers(newAnswers);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: newSkills.join(', ') }
    ]);

    advanceToNextStep(newAnswers, currentStepIndex + 1);
  };

  const advanceToNextStep = (currentAnswers, nextIndex) => {
    if (nextIndex < QUESTIONS.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentStepIndex(nextIndex);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: QUESTIONS[nextIndex].botText,
            options: QUESTIONS[nextIndex].options,
            type: QUESTIONS[nextIndex].type,
          }
        ]);
        setSelectedMulti([]);
      }, 700);
    } else {
      // Completed all questions
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `Perfect! 🚀 I've synthesized your custom career trajectory for ${currentAnswers.targetCareer}. Your Day 1 Roadmap Starter is ready! Share your commitment card below or head straight into your analysis.`,
            isFinal: true,
          }
        ]);

        // Save to AppContext & backend
        updateUserProfile(currentAnswers);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Solar Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-solar-coral/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-solar-violet/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Bar */}
      <header className="py-4 px-6 border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-solar-coral to-solar-amber flex items-center justify-center font-display font-extrabold text-white text-sm shadow-md shadow-rose-950/40">
            G
          </span>
          <div>
            <h1 className="text-sm font-display font-bold text-white flex items-center gap-2">
              AI Career Advisor
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-solar-coral/20 text-rose-300">
                Gemini 3.6 Flash
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Step {Math.min(currentStepIndex + 1, 5)} of 5</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/profile')} 
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Use Classic Form ➔
        </button>
      </header>

      {/* Chat Messages Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 overflow-y-auto space-y-6 z-10">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-solar-coral/20 text-rose-300 border border-solar-coral/30 flex items-center justify-center shrink-0 shadow-lg shadow-rose-950/20">
                <BrainCircuit className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4.5 ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-solar-coral to-solar-amber text-white font-medium shadow-lg shadow-rose-950/30'
                : 'bg-dark-900/90 border border-slate-800 text-slate-200 shadow-xl'
            }`}>
              <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>

              {/* Bot Vibe Check Quick Reaction Pills */}
              {msg.sender === 'bot' && !msg.options && (
                <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">Vibe:</span>
                  {VIBE_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(index, emoji)}
                      className={`text-xs px-2 py-0.5 rounded-full transition-all transform hover:scale-125 ${
                        reactions[index] === emoji
                          ? 'bg-solar-coral/30 border border-solar-coral scale-110 shadow-sm'
                          : 'bg-dark-950/60 hover:bg-dark-950 text-slate-400'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* Options Chips inside Bot Message */}
              {msg.options && index === messages.length - 1 && !isTyping && (
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  {msg.type === 'single' ? (
                    <div className="flex flex-wrap gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSingleSelect(opt)}
                          className="px-4 py-2 rounded-xl text-xs font-display font-semibold bg-dark-950/80 border border-slate-700/80 hover:border-solar-coral hover:bg-solar-coral/10 hover:text-white text-slate-300 transition-all flex items-center gap-2 group"
                        >
                          <span>{opt.label}</span>
                          {opt.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-solar-coral/20 text-rose-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-1 group-hover:text-solar-coral transition-all" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {msg.options.map((opt) => {
                          const isChecked = selectedMulti.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleMultiToggle(opt.value)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                                isChecked
                                  ? 'bg-solar-coral/20 border-solar-coral text-white shadow-[0_0_10px_rgba(255,51,102,0.3)]'
                                  : 'bg-dark-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {opt.label} {isChecked && '✓'}
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        variant="solar"
                        size="sm"
                        onClick={submitMultiSelect}
                        className="font-display font-bold"
                      >
                        Continue with selected ({selectedMulti.length})
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {msg.isFinal && (
                <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-rose-300 font-mono">
                    <Sparkles className="w-4 h-4 animate-spin text-solar-amber" />
                    <span>Your roadmap trajectory is locked in!</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant="solar"
                      size="sm"
                      onClick={() => setIsStarterModalOpen(true)}
                      className="text-xs font-display font-bold shadow-lg shadow-rose-950/40"
                    >
                      <Share2 className="w-3.5 h-3.5 mr-1.5" />
                      Preview Day 1 Starter Card 🎨
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/ai-analysis')}
                      className="text-xs"
                    >
                      Enter Dashboard ➔
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3.5 items-center text-slate-400 text-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-solar-coral/20 text-rose-300 border border-solar-coral/30 flex items-center justify-center shrink-0">
              <BrainCircuit className="w-4 h-4 animate-pulse" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-dark-900 border border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-solar-coral animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-solar-amber animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-solar-violet animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Bottom Progress Pill */}
      <footer className="py-4 px-6 border-t border-slate-800/80 bg-dark-950/60 text-center text-xs text-slate-500 z-20">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span>Targeting: <strong className="text-white">{answers.targetCareer}</strong></span>
          <span>100% Free & Open-Source</span>
        </div>
      </footer>

      {/* Share Progress Modal for Day 1 Starter */}
      <ShareProgressModal
        isOpen={isStarterModalOpen}
        onClose={() => setIsStarterModalOpen(false)}
        careerTitle={answers.targetCareer.replace(/-/g, ' ').toUpperCase()}
        readinessScore={42}
        currentStreak={1}
        skillsCount={answers.skills?.length || 3}
        totalSkills={15}
        userName={answers.name}
        initialTemplate="stats"
      />
    </div>
  );
};
