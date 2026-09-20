import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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
import { joinSquadAPI } from '../services/aiService';

const VIBE_EMOJIS = ['🔥', '💡', '🚀', '🎯', '👀'];

const QUESTIONS = [
  {
    id: 'targetCareer',
    botText: "Welcome to Kalpa. I'm your AI Career Navigator. Which professional discipline or target role are you aiming to master?",
    options: [
      { label: 'Software Engineer', value: 'software-engineer', badge: 'Technology' },
      { label: 'AI & Inference Engineer', value: 'ai-engineer', badge: 'Intelligence' },
      { label: 'Financial Analyst', value: 'financial-analyst', badge: 'Finance' },
      { label: 'Product & UX Designer', value: 'product-designer', badge: 'Design' },
      { label: 'Clinical Operations Lead', value: 'clinical-operations-lead', badge: 'Healthcare' },
      { label: 'Corporate Legal Analyst', value: 'corporate-legal-analyst', badge: 'Law' },
      { label: 'Robotics & Automation', value: 'robotics-engineer', badge: 'Engineering' },
      { label: 'Architectural Designer', value: 'architectural-designer', badge: 'Architecture' },
    ],
    type: 'single',
  },
  {
    id: 'experienceLevel',
    botText: "Understood. How would you classify your current professional experience in this domain?",
    options: [
      { label: 'Student / Academic Foundations', value: 'College Student' },
      { label: 'Self-Directed / Practicing', value: 'Self-Taught' },
      { label: 'Junior Practitioner (0-2 yrs)', value: 'Junior Developer' },
      { label: 'Career Transitioner', value: 'Career Switcher' },
    ],
    type: 'single',
  },
  {
    id: 'skills',
    botText: "Which of these foundational competencies do you already possess? (Select all that apply)",
    options: [
      { label: 'Programming & Logic', value: 'Programming' },
      { label: 'Quantitative & Financial Modeling', value: 'Financial Modeling' },
      { label: 'System & Architecture Design', value: 'System Design' },
      { label: 'User Research & Prototyping', value: 'User Research' },
      { label: 'Data Analysis & SQL', value: 'SQL' },
      { label: 'Statistical Methods', value: 'Statistics' },
      { label: 'Regulatory & Compliance', value: 'Compliance' },
      { label: 'Version Control & Git', value: 'Git' },
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
  const squadInviteCode = searchParams.get('squadInviteCode') || searchParams.get('squad');
  const isRedo = searchParams.get('redo') === 'true';

  const { user, updateUserProfile } = useApp();
  const { user: authUser } = useAuth();

  // Guard: if user has already completed onboarding/profile, redirect to /dashboard
  // UNLESS explicitly initiated via ?redo=true (e.g. from Settings) OR has a squad invite code.
  useEffect(() => {
    const hasCompletedProfile = Boolean(
      user?.onboarded || 
      (Array.isArray(user?.skills) && user.skills.length > 0) || 
      user?.weeklyHours || 
      user?.learningStyle ||
      (user?.degree && user?.degree.trim() !== '')
    );

    if (hasCompletedProfile && !isRedo) {
      if (squadInviteCode) {
        console.info('[OnboardingChatPage] Existing profile detected with squad invite code. Auto-joining squad...');
        joinSquadAPI(squadInviteCode.trim())
          .then(() => {
            navigate('/squad', { replace: true, state: { joinedViaInvite: true } });
          })
          .catch((err) => {
            console.warn('[OnboardingChatPage] Auto squad join error:', err);
            navigate('/squad', { replace: true, state: { joinError: err.message } });
          });
      } else {
        console.info('[OnboardingChatPage] Existing completed profile detected; redirecting to /dashboard. Use ?redo=true to recalibrate.');
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isRedo, squadInviteCode, navigate]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState(() => {
    const initial = [];
    if (squadInviteCode) {
      initial.push({
        sender: 'bot',
        text: `🛡️ SQUAD INVITATION DETECTED! You have been recruited with squad passcode [${squadInviteCode.toUpperCase()}]. Complete your 5-question profile setup to lock in your squad seat automatically!`,
        isChallengeIntro: true,
      });
    } else if (refUser) {
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
      setTimeout(async () => {
        setIsTyping(false);
        
        let squadJoinedNote = '';
        if (squadInviteCode) {
          try {
            await joinSquadAPI(squadInviteCode.trim());
            squadJoinedNote = ' 🛡️ You have been automatically added to your squad room!';
          } catch (err) {
            console.warn('Auto squad join error:', err.message);
          }
        }

        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `Perfect! 🚀 I've synthesized your custom career trajectory for ${currentAnswers.targetCareer}.${squadJoinedNote} Your Day 1 Roadmap Starter is ready! Share your commitment card below or head straight into your analysis.`,
            isFinal: true,
          }
        ]);

        // Save to AppContext & backend with explicit onboarded flag
        updateUserProfile({
          ...currentAnswers,
          onboarded: true,
        });
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
          <Link to="/" className="group flex items-baseline gap-1.5">
            <span className="font-display font-black text-xl text-white tracking-tight flex items-center">
              KALPA<span className="text-gorange text-xl">.</span>
            </span>
          </Link>
          <div className="border-l border-slate-800 pl-3">
            <h1 className="text-xs sm:text-sm font-display font-bold text-white flex items-center gap-2">
              AI Career Advisor
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-solar-coral/20 text-rose-300">
                Gemini 3.6 Flash
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Step {Math.min(currentStepIndex + 1, 5)} of 5</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isRedo && (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-mono text-gorange hover:text-white transition-colors"
            >
              Cancel Recalibration
            </button>
          )}
          <button 
            onClick={() => navigate('/profile')} 
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Use Classic Form ➔
          </button>
        </div>
      </header>

      {/* Recalibration Notice Banner if ?redo=true */}
      {isRedo && (
        <div className="py-2.5 px-6 bg-[#160E0A] border-b border-gorange/40 text-gorange text-xs font-mono flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gorange shrink-0 animate-pulse" />
            <span className="font-semibold tracking-wide">
              RECALIBRATION MODE ACTIVE // Completing this interview will update your target discipline and regenerate your roadmap.
            </span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-[11px] underline text-[#8F9AA9] hover:text-white transition-colors shrink-0 ml-4"
          >
            Return to Dashboard
          </button>
        </div>
      )}

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
                      Calibrate & Enter Dashboard ➔
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
