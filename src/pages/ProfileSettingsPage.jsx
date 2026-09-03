import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Wrench, 
  RefreshCw, 
  Save, 
  X, 
  Plus, 
  CheckCircle2 
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';

export const ProfileSettingsPage = () => {
  const { user, updateUserProfile, analysisResult, CAREER_PROFILES } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [major, setMajor] = useState(user?.major || '');
  const [targetCareer, setTargetCareer] = useState(user?.targetCareer || 'ai-engineer');
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
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5" /> Account & Profile Preferences
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Profile & Career Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update your academic details, target career track, and current skill set.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => navigate('/assessment')}
          icon={RefreshCw}
        >
          Retake Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>

              {/* Degree & Major */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Degree
                  </label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Major / Field of Study
                  </label>
                  <input
                    type="text"
                    required
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
              </div>

              {/* Target Career Track */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Target Career Track
                </label>
                <select
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
                >
                  {Object.values(CAREER_PROFILES).map((career) => (
                    <option key={career.id} value={career.id}>
                      {career.title} ({career.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-amber-400" /> Current Skills & Technologies
                </label>

                <div className="flex flex-wrap gap-2 mb-3 p-3 min-h-[52px] rounded-xl bg-slate-950 border border-slate-800">
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

                <div className="flex gap-2">
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
                    placeholder="Add a new skill (e.g. PyTorch)"
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
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Changes save instantly to LocalStorage</span>
                )}

                <Button variant="glow" size="md" type="submit" icon={Save}>
                  Save Changes
                </Button>
              </div>

            </form>
          </Card>
        </div>

        {/* Right 1 Col: Overall Career Summary Stats */}
        <div className="space-y-6">
          <Card className="p-6 border-purple-500/30">
            <h3 className="text-lg font-bold text-white mb-4">Career Metrics Summary</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Career Readiness</span>
                  <div className="text-2xl font-bold text-white font-mono mt-0.5">
                    {analysisResult?.readinessScore || 62}%
                  </div>
                </div>
                <Badge variant="purple" size="sm">Active Benchmark</Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Skills Mastered</span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">
                    {analysisResult?.skillsMasteredCount || 8} / {analysisResult?.totalSkillsCount || 15}
                  </div>
                </div>
                <Badge variant="green" size="sm">Verified</Badge>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Roadmap Completion</span>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mt-0.5">
                    {analysisResult?.roadmapProgress || 28}%
                  </div>
                </div>
                <Badge variant="cyan" size="sm">Stage 2 Active</Badge>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/assessment')}
                className="w-full"
                icon={RefreshCw}
              >
                Retake Full Assessment
              </Button>
            </div>
          </Card>
        </div>

      </div>

    </AppLayout>
  );
};
