import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Plus, 
  X, 
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Wrench
} from 'lucide-react';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton,
  EditorialBadge
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const ProfileSetupPage = () => {
  const { user: appUser, updateUserProfile } = useApp();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(authUser?.displayName || appUser?.name || '');
  const [degree, setDegree] = useState(appUser?.degree || '');
  const [major, setMajor] = useState(appUser?.major || '');
  const [experienceLevel, setExperienceLevel] = useState(appUser?.experienceLevel || 'Entry-Level Foundations (0-1 Yrs)');
  const [skills, setSkills] = useState(appUser?.skills?.length ? appUser.skills : ['Quantitative Analysis', 'Data Modeling', 'Technical Writing']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const quickPresets = [
    'Python', 'Financial Modeling', 'System Design', 'Figma & UX', 
    'SQL Databases', 'Statistical Analysis', 'Market Research', 'Operations Planning',
    'Contract Review', 'Clinical Documentation', 'Machine Learning', 'Git Workflows'
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
    <div className="min-h-screen bg-[#07080D] text-white flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-2xl">
        
        {/* Step Indicator Tag */}
        <div className="font-mono text-xs text-gorange uppercase tracking-[0.2em] flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F]">
          <span>[ STEP 01 / 03 // CANDIDATE CALIBRATION ]</span>
          <span className="text-[#6B7688]">FOUNDATIONAL DOSSIER</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2">
          Establish Your Candidate Dossier.
        </h1>
        <p className="text-sm text-[#8F9AA9] font-light mb-8">
          Enter your current academic grounding, domain experience, and acquired competencies to benchmark against industry specifications.
        </p>

        {/* Conversational Setup Shortcut */}
        <div className="border border-[#1E232F] bg-[#0B0D12] p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-gorange/40 bg-gorange/10 text-gorange shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-xs text-white font-bold uppercase">
                Prefer an interactive interview?
              </div>
              <div className="text-xs text-[#8F9AA9] font-light">
                Conduct a 2-minute diagnostic exchange with the AI Career Navigator.
              </div>
            </div>
          </div>

          <EditorialButton
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => navigate('/onboarding')}
            className="shrink-0"
          >
            INTERACTIVE SETUP →
          </EditorialButton>
        </div>

        {/* Main Form Container */}
        <form onSubmit={handleSubmit} className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-8 space-y-6">
          
          {/* Field 1: Candidate Name */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
              01 // CANDIDATE FULL NAME
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
            />
          </div>

          {/* Field 2 & 3: Degree & Major */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                02 // ACADEMIC DEGREE LEVEL
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.S. or B.A. Candidate"
                className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                03 // FIELD OF STUDY / MAJOR
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. Computer Science / Finance"
                className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
              />
            </div>
          </div>

          {/* Field 4: Experience Level */}
          <div>
            <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
              04 // DOMAIN EXPERIENCE LEVEL
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
            >
              <option value="Entry-Level Foundations (0-1 Yrs)">Entry-Level Foundations (0-1 Yrs)</option>
              <option value="Junior Practitioner (1-2 Yrs)">Junior Practitioner (1-2 Yrs)</option>
              <option value="Mid-Level Specialist (3-5 Yrs)">Mid-Level Specialist (3-5 Yrs)</option>
              <option value="Career Transitioner / Cross-Disciplinary">Career Transitioner / Cross-Disciplinary</option>
            </select>
          </div>

          {/* Field 5: Competencies List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[10px] uppercase text-[#6B7688] tracking-widest">
                05 // VERIFIED SKILLS & CAPABILITIES ({skills.length})
              </label>
              <span className="font-mono text-[10px] text-[#6B7688]">PRESS ENTER TO ADD</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
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
                placeholder="Add a skill or methodology (e.g. Financial Modeling, PyTorch)..."
                className="flex-1 p-3 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
              />
              <EditorialButton
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleAddSkill(newSkillInput)}
                icon={Plus}
                iconPosition="left"
              >
                ADD
              </EditorialButton>
            </div>

            {/* Quick Presets */}
            <div className="mb-4">
              <span className="font-mono text-[10px] text-[#6B7688] uppercase tracking-wider block mb-1.5">
                FREQUENT SKILLS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAddSkill(preset)}
                    className="font-mono text-[11px] text-[#8F9AA9] bg-[#07080D] border border-[#1E232F] px-2 py-0.5 hover:border-gorange hover:text-white transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Skills Chips */}
            <div className="p-3 bg-[#07080D] border border-[#1E232F] min-h-[60px] flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs bg-[#121622] text-white border border-[#2B3242] px-2.5 py-1 flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#6B7688] hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="font-mono text-xs text-[#6B7688] italic self-center">
                  No skills listed yet. Select from presets or type above.
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#1E232F] flex items-center justify-between">
            <span className="font-mono text-xs text-[#6B7688]">
              NEXT: SELECT CAREER DISCIPLINE
            </span>

            <EditorialButton
              variant="primary"
              size="md"
              type="submit"
              icon={ArrowRight}
              iconPosition="right"
            >
              PROCEED TO DISCIPLINE
            </EditorialButton>
          </div>

        </form>

      </div>
    </div>
  );
};
