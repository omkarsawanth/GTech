import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  RefreshCw, 
  Check, 
  X, 
  Plus, 
  Save,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton,
  EditorialBadge
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';
import { ALL_CAREERS, CAREER_CATEGORIES } from '../data/careersData';

export const ProfileSettingsPage = () => {
  const { user, updateUserProfile, activeCareerProfile } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [major, setMajor] = useState(user?.major || '');
  const [targetCareer, setTargetCareer] = useState(user?.targetCareer || 'software-engineer');
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      degree,
      major,
      targetCareer,
      skills
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AppLayout>
      <EditorialShell className="max-w-4xl">
        
        {/* Editorial Header */}
        <EditorialHeader
          index="09"
          tag="DOSSIER CONFIGURATION"
          title="Account & Profile Preferences."
          subtitle="Manage your academic credentials, target career discipline, and verified competency inventory."
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <EditorialButton
              variant="outline"
              size="sm"
              onClick={() => navigate('/onboarding?redo=true')}
              icon={MessageSquare}
              iconPosition="left"
            >
              REDO ONBOARDING CHAT
            </EditorialButton>
            <EditorialButton
              variant="secondary"
              size="sm"
              onClick={() => navigate('/assessment')}
              icon={RefreshCw}
              iconPosition="left"
            >
              RETAKE ASSESSMENT
            </EditorialButton>
          </div>
        </EditorialHeader>

        {/* Form Container */}
        <form onSubmit={handleSave} className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-10 space-y-8 mb-16">
          
          {/* Section 1: Identity */}
          <div>
            <div className="font-mono text-xs text-gorange uppercase tracking-wider pb-3 mb-4 border-b border-[#1E232F]">
              01 // CANDIDATE IDENTITY
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
                placeholder="Candidate name"
                required
              />
            </div>
          </div>

          {/* Section 2: Academic Background */}
          <div>
            <div className="font-mono text-xs text-gorange uppercase tracking-wider pb-3 mb-4 border-b border-[#1E232F]">
              02 // ACADEMIC PROFILE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                  DEGREE LEVEL
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
                  placeholder="e.g. B.S. Computer Science"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                  FIELD OF FOCUS / MAJOR
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
                  placeholder="e.g. Distributed Computing"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Target Career Discipline */}
          <div>
            <div className="font-mono text-xs text-gorange uppercase tracking-wider pb-3 mb-4 border-b border-[#1E232F]">
              03 // TARGET CAREER PATH
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-[#6B7688] tracking-widest mb-2">
                ACTIVE BENCHMARK DISCIPLINE
              </label>
              <select
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="w-full p-3.5 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange transition-colors"
              >
                {CAREER_CATEGORIES.map((category) => (
                  <optgroup key={category.id} label={`${category.code} // ${category.name.toUpperCase()}`}>
                    {category.careers.map((career) => (
                      <option key={career.id} value={career.id}>
                        {career.title} ({category.name})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="font-mono text-[11px] text-[#6B7688] mt-2">
                Current selection: <span className="text-white font-bold">{activeCareerProfile?.title}</span> • Changing target recalculates readiness and milestones.
              </p>
            </div>
          </div>

          {/* Section 4: Skills Management */}
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F]">
              <div className="font-mono text-xs text-gorange uppercase tracking-wider">
                04 // VERIFIED COMPETENCIES ({skills.length})
              </div>
              <span className="font-mono text-[10px] text-[#6B7688]">PRESS ENTER TO ADD</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
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
                placeholder="Enter skill or methodology name..."
                className="flex-1 p-3 bg-[#07080D] border border-[#1E232F] text-white font-mono text-xs focus:outline-none focus:border-gorange"
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

            {/* Skills chips */}
            <div className="p-4 bg-[#07080D] border border-[#1E232F] min-h-[70px] flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs bg-[#121622] text-white border border-[#2B3242] px-3 py-1 flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#6B7688] hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="font-mono text-xs text-[#6B7688] italic self-center">
                  No competencies registered. Add skills above.
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#1E232F] flex items-center justify-between">
            {savedSuccess ? (
              <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 stroke-[3]" /> PREFERENCES SAVED & RECALIBRATED
              </span>
            ) : (
              <span className="font-mono text-xs text-[#6B7688]">
                Changes immediately re-run benchmark calculations.
              </span>
            )}

            <EditorialButton
              variant="primary"
              size="md"
              type="submit"
              icon={Save}
              iconPosition="left"
            >
              SAVE SETTINGS
            </EditorialButton>
          </div>

        </form>

        {/* Conversational Recalibration Section */}
        <div className="border border-[#1E232F] bg-[#07090D] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
          <div className="space-y-1.5 max-w-xl">
            <div className="font-mono text-xs text-gorange uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONVERSATIONAL PROFILE CALIBRATION</span>
            </div>
            <p className="font-mono text-xs text-[#8F9AA9] leading-relaxed">
              Want to switch career tracks or re-align with our AI Career Navigator? Retake the 5-question conversational interview to re-synthesize your competencies, target role, and daily roadmap.
            </p>
          </div>

          <EditorialButton
            variant="outline"
            size="sm"
            onClick={() => navigate('/onboarding?redo=true')}
            icon={MessageSquare}
            iconPosition="left"
            className="shrink-0"
          >
            REDO MY PROFILE
          </EditorialButton>
        </div>

      </EditorialShell>
    </AppLayout>
  );
};
