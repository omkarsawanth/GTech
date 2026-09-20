import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Plus, 
  Check, 
  FolderGit2, 
  ArrowRight,
  FileCheck2,
  Layers
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton,
  EditorialBadge
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';
import { generateProjects, fetchProjectsAI } from '../services/aiService';

export const ProjectGeneratorPage = () => {
  const { analysisResult, addSkillsToRoadmap, user, activeCareerProfile, backendAvailable } = useApp();
  const navigate = useNavigate();

  const careerId = user?.targetCareer || activeCareerProfile?.id || 'software-engineer';
  const careerTitle = activeCareerProfile?.title || 'Software Engineer';
  const evidenceType = activeCareerProfile?.evidenceType || 'Production Deliverables & Casework';

  const criticalSkills = (analysisResult?.criticalGaps || []).map(g => g.skill);
  const missingSkillList = criticalSkills.length > 0 
    ? criticalSkills 
    : (activeCareerProfile?.requiredSkills?.slice(0, 4).map(s => s.name) || ['Core Discipline', 'Applied Frameworks', 'System Design']);

  const [projects, setProjects] = useState([]);
  const [addedSkills, setAddedSkills] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      setIsLoading(true);
      try {
        if (backendAvailable) {
          const res = await fetchProjectsAI(careerId, user?.skills || [], missingSkillList, user?.experienceLevel || 'Entry-Level');
          setProjects(res?.projects || res || []);
        } else {
          const projs = generateProjects(missingSkillList, careerId);
          setProjects(projs);
        }
      } catch (err) {
        console.warn('Backend project generation failed, falling back to universal generator:', err);
        const projs = generateProjects(missingSkillList, careerId);
        setProjects(projs);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectsData();
  }, [backendAvailable, careerId]);

  const handleAddProject = async (projTitle, skillsPracticed) => {
    const targetSkill = skillsPracticed?.[0] || 'Core Skill';
    await addSkillsToRoadmap(targetSkill);
    setAddedSkills(prev => ({ ...prev, [projTitle]: true }));
    setTimeout(() => {
      navigate('/roadmap');
    }, 900);
  };

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Editorial Header */}
        <EditorialHeader
          index="07"
          tag="EVIDENCE & ARTIFACT GENERATOR"
          title={`Tangible Evidence for ${careerTitle}.`}
          subtitle={`Hiring managers evaluate verifiable proof over credentials. Construct these domain-specific deliverables to close your diagnostic skill gaps.`}
        >
          <EditorialButton
            variant="secondary"
            size="sm"
            onClick={() => navigate('/roadmap')}
            icon={ArrowRight}
            iconPosition="right"
          >
            VIEW ACTIVE ROADMAP
          </EditorialButton>
        </EditorialHeader>

        {/* Evidence Specification Banner */}
        <div className="border border-[#1E232F] bg-[#0B0D12] p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 border border-gorange/40 bg-gorange/10 text-gorange shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest">
                  INSTITUTIONAL EVIDENCE BENCHMARK
                </div>
                <div className="font-display font-bold text-lg text-white mt-0.5">
                  {evidenceType}
                </div>
                {activeCareerProfile?.requiredEvidence && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeCareerProfile.requiredEvidence.map((ev, i) => (
                      <span key={i} className="font-mono text-[11px] text-[#8F9AA9] bg-[#07080D] border border-[#1E232F] px-2.5 py-1">
                        • {ev}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="font-mono text-xs text-[#8F9AA9] border-t md:border-t-0 md:border-l border-[#1E232F] pt-3 md:pt-0 md:pl-6 shrink-0">
              TARGET GAPS ADDRESSED: <span className="text-gorange font-bold">{missingSkillList.length}</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((proj, idx) => {
            const isAdded = addedSkills[proj.title];
            return (
              <div 
                key={idx} 
                className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-8 flex flex-col justify-between hover:border-[#2E3748] transition-colors"
              >
                <div>
                  
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E232F] font-mono text-[11px]">
                    <span className="text-gorange font-bold uppercase tracking-wider">
                      ARTIFACT // {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-3 text-[#8F9AA9]">
                      <span className="uppercase">{proj.difficulty || 'Intermediate'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gorange" />
                        {proj.estimatedTime || '8-12 Hours'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 leading-snug tracking-tight">
                    {proj.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#8F9AA9] leading-relaxed font-light mb-6">
                    {proj.description}
                  </p>

                  {/* Skills Practiced */}
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest block mb-2">
                      TARGET COMPETENCIES VERIFIED:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(proj.skillsPracticed || []).map((sk) => (
                        <span 
                          key={sk} 
                          className="font-mono text-xs px-2.5 py-1 bg-[#07080D] text-white border border-[#1E232F]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-[#1E232F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <span className="font-mono text-xs text-gorange uppercase tracking-wider font-semibold">
                    {proj.impact || 'High Industry Relevance'}
                  </span>

                  <EditorialButton
                    variant={isAdded ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleAddProject(proj.title, proj.skillsPracticed)}
                    icon={isAdded ? Check : Plus}
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    {isAdded ? 'INJECTED TO ROADMAP' : 'INJECT TO ROADMAP'}
                  </EditorialButton>
                </div>

              </div>
            );
          })}
        </div>

      </EditorialShell>
    </AppLayout>
  );
};
