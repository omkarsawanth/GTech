import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Plus, 
  X, 
  GraduationCap, 
  BookOpen, 
  Wrench, 
  Sparkles,
  Code2,
  Briefcase
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const ProfileSetupPage = () => {
  const { user: appUser, updateUserProfile } = useApp();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(authUser?.displayName || appUser?.name || '');
  const [degree, setDegree] = useState(appUser?.degree || '');
  const [major, setMajor] = useState(appUser?.major || '');
  const [experienceLevel, setExperienceLevel] = useState(appUser?.experienceLevel || 'Entry-Level / Student');
  const [skills, setSkills] = useState(appUser?.skills?.length ? appUser.skills : ['Python', 'Java', 'SQL', 'Git']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const quickSkillPresets = [
    'Python', 'Java', 'SQL', 'Git', 'HTML', 'JavaScript', 
    'C++', 'React', 'TypeScript', 'Data Structures', 'Statistics', 'R', 'Linux', 'AWS', 'Docker'
  ];

  const handleAddSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills([...skills, trimmed]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      degree,
      major,
      experienceLevel,
      skills
    });
    navigate('/career-selection');
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm font-mono">
              01
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Build Your GTech Profile</h1>
              <p className="text-xs text-slate-400">Tell GTech about your academic background, experience level & current skills</p>
            </div>
          </div>
          <Badge variant="purple" size="sm" className="font-display">Step 1 of 3</Badge>
        </div>

        {/* Form Progress Bar */}
        <div className="mb-6">
          <ProgressBar progress={33} color="purple" height="h-2" />
        </div>

        {/* Conversational Onboarding Alternative Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-solar-coral/15 via-solar-amber/10 to-transparent border border-solar-coral/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-solar-coral/20 text-rose-300">
              <Sparkles className="w-5 h-5 text-solar-amber animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-display">Prefer a quick chat-style setup?</h4>
              <p className="text-[11px] text-slate-300">Talk to the AI Career Navigator in a 2-minute conversation instead of filling out a form.</p>
            </div>
          </div>
          <Button
            variant="solar"
            size="sm"
            type="button"
            onClick={() => navigate('/onboarding')}
            className="shrink-0 text-xs font-bold"
          >
            Start Chat ➔
          </Button>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                placeholder="Alex Johnson"
              />
            </div>

            {/* Degree & Major */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-400" /> Degree Level
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  <option value="Bachelor of Science">Bachelor of Science (B.S.)</option>
                  <option value="Bachelor of Arts">Bachelor of Arts (B.A.)</option>
                  <option value="Master of Science">Master of Science (M.S.)</option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bootcamp / Self-Taught">Self-Taught / Bootcamp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> Major / Field of Study
                </label>
                <input
                  type="text"
                  required
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="Computer Science, Information Systems, Data Science"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-400" /> Current Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
              >
                <option value="Student / Beginner">Student / Learning Foundations</option>
                <option value="Entry-Level / Graduate">Entry-Level / Recent Graduate</option>
                <option value="Junior Engineer (1-2 Yrs)">Junior Engineer (1-2 Years Experience)</option>
                <option value="Career Switcher">Career Switcher (Non-tech to Tech)</option>
              </select>
            </div>

            {/* Skills Tag Management */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-amber-400" /> Current Skills & Programming Languages
              </label>

              {/* Tag Display */}
              <div className="flex flex-wrap gap-2 mb-3 p-3 min-h-[56px] rounded-xl bg-slate-950 border border-slate-800">
                {skills.length === 0 && (
                  <span className="text-xs text-slate-500 italic py-1">No skills added yet. Select quick add suggestions below.</span>
                )}
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Custom Skill Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkillInput);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
                  placeholder="Type a skill and press Enter (e.g. PyTorch, Docker, TypeScript)"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddSkill(newSkillInput)}
                  icon={Plus}
                >
                  Add
                </Button>
              </div>

              {/* Quick Add Presets */}
              <div>
                <p className="text-[11px] text-slate-400 mb-2 font-medium">Quick Add Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickSkillPresets.map((preset) => {
                    const isAdded = skills.some(s => s.toLowerCase() === preset.toLowerCase());
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => !isAdded && handleAddSkill(preset)}
                        disabled={isAdded}
                        className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                          isAdded
                            ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                            : 'bg-slate-900/90 hover:bg-purple-900/40 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40'
                        }`}
                      >
                        + {preset}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button
                variant="glow"
                size="lg"
                type="submit"
                className="font-display"
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue to Career Selection →
              </Button>
            </div>

          </form>
        </Card>

      </div>
    </div>
  );
};
