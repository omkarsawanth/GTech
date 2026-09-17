import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronRight, CheckCircle2, Target, Sparkles, Compass } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialPanel, 
  EditorialButton, 
  EditorialBadge 
} from '../components/common/EditorialComponents';
import { CAREER_CATEGORIES, getCareerById } from '../data/careersData';
import { useApp } from '../context/AppContext';

export const CareerSelectionPage = () => {
  const { user, updateUserProfile } = useApp();
  const navigate = useNavigate();

  // Selected state
  const [selectedCareerId, setSelectedCareerId] = useState(user?.targetCareer || 'software-engineer');
  const [expandedDomainId, setExpandedDomainId] = useState(() => {
    const active = getCareerById(user?.targetCareer);
    return active?.domain || 'technology';
  });

  const selectedCareer = getCareerById(selectedCareerId);

  const handleSelectCareer = (careerId) => {
    setSelectedCareerId(careerId);
  };

  const handleConfirmCareer = () => {
    updateUserProfile({ targetCareer: selectedCareerId });
    navigate('/dashboard');
  };

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Header */}
        <EditorialHeader
          index="02"
          tag="DIRECTORY"
          title="UNIVERSAL CAREER DIRECTORY."
          subtitle="Explore verified standards across 15 professional disciplines. Select a target track to calibrate your competency gap matrix."
        >
          <EditorialButton
            variant="primary"
            size="md"
            onClick={handleConfirmCareer}
            icon={ArrowRight}
          >
            Confirm Target Track
          </EditorialButton>
        </EditorialHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: 15-Domain Editorial Directory List */}
          <div className="lg:col-span-6 space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B7688] mb-4 pb-2 border-b border-[#1E232F] flex items-center justify-between">
              <span>SELECT DISCIPLINE</span>
              <span>15 SECTORS</span>
            </div>

            {CAREER_CATEGORIES.map((domain) => {
              const isExpanded = expandedDomainId === domain.id;
              const hasActiveCareer = domain.careers.some(c => c.id === selectedCareerId);

              return (
                <div key={domain.id} className="border border-[#1E232F] bg-[#080A0E] overflow-hidden">
                  
                  {/* Domain Row Accordion Header */}
                  <button
                    onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                    className={`w-full p-4.5 text-left flex items-center justify-between transition-colors ${
                      isExpanded ? 'bg-[#0E121A] border-b border-[#1E232F]' : 'hover:bg-[#0B0D12]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${hasActiveCareer ? 'text-gorange' : 'text-[#566173]'}`}>
                        {domain.code}
                      </span>
                      <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                        {domain.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-[#6B7688]">
                      <span className="hidden sm:inline text-[11px]">{domain.careers.length} TRACKS</span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded Domain Careers */}
                  {isExpanded && (
                    <div className="p-3 bg-[#060709] space-y-2">
                      {domain.careers.map((career) => {
                        const isSelected = selectedCareerId === career.id;

                        return (
                          <div
                            key={career.id}
                            onClick={() => handleSelectCareer(career.id)}
                            className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#10131A] border-gorange text-white'
                                : 'bg-[#090C10] border-[#1E232F] text-[#8F9AA9] hover:border-[#2B3242] hover:text-white'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-sm sm:text-base text-white">
                                  {career.title}
                                </span>
                                {isSelected && (
                                  <span className="px-1.5 py-0.5 bg-gorange text-black font-mono text-[9px] font-bold uppercase">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="font-mono text-[11px] text-[#6B7688] mt-1">
                                {career.salary} • {career.experienceReq}
                              </div>
                            </div>

                            <div className="text-right font-mono text-xs shrink-0 pl-4">
                              <span className="text-gorange font-bold text-[11px]">{career.demand}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Right: Selected Career Specification Dossier */}
          <div className="lg:col-span-6">
            <div className="sticky top-24 p-8 bg-[#0B0D12] border border-[#1E232F]">
              <div className="font-mono text-[10px] text-gorange uppercase tracking-widest mb-2">
                [ ROLE SPECIFICATION AUDIT ]
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {selectedCareer.title}
              </h2>

              <div className="mt-3 font-mono text-xs text-[#8F9AA9] flex flex-wrap items-center gap-3 pb-6 border-b border-[#1E232F]">
                <span>COMPENSATION: <strong className="text-white">{selectedCareer.salary}</strong></span>
                <span>•</span>
                <span>DEMAND: <strong className="text-gorange">{selectedCareer.demand}</strong></span>
              </div>

              {/* Manifesto */}
              <div className="my-6">
                <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-1.5">
                  ROLE OVERVIEW &amp; STANDARDS
                </div>
                <p className="text-base text-[#C8CFDB] font-light leading-relaxed">
                  "{selectedCareer.manifesto || selectedCareer.description}"
                </p>
              </div>

              {/* Verified Competencies */}
              <div className="my-6">
                <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>CORE SKILLS &amp; BENCHMARK</span>
                  <span>INDUSTRY REQ</span>
                </div>
                
                <div className="space-y-2">
                  {selectedCareer.skills.map((s, idx) => (
                    <div key={s.name} className="py-2 px-3 bg-[#08090E] border border-[#161B24] flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#566173]">0{idx + 1}</span>
                        <span className="text-white font-medium">{s.name}</span>
                      </div>
                      <span className="text-gorange font-bold">{s.required}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Evidence Artifact */}
              <div className="my-6 pt-6 border-t border-[#1E232F]">
                <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-1.5">
                  VERIFIABLE EVIDENCE REQUIREMENT
                </div>
                <div className="p-3 bg-[#0E121A] border border-[#1E232F] font-mono text-xs text-white">
                  {selectedCareer.evidenceType}
                </div>
              </div>

              {/* Certifications or Knowledge */}
              {selectedCareer.certifications?.length > 0 && (
                <div className="my-6 pt-4 border-t border-[#1E232F]/80">
                  <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-2">
                    RECOGNIZED CREDENTIALS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareer.certifications.map((c) => (
                      <span key={c} className="px-2 py-1 bg-[#121620] border border-[#202736] text-[#B0BAC8] font-mono text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation CTA */}
              <div className="mt-8 pt-6 border-t border-[#1E232F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#7F8B9D]">
                  TARGET ROLE: <strong className="text-white">{selectedCareer.title}</strong>
                </span>

                <EditorialButton
                  variant="primary"
                  size="md"
                  onClick={handleConfirmCareer}
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  Set as Active Target
                </EditorialButton>
              </div>

            </div>
          </div>

        </div>

      </EditorialShell>
    </AppLayout>
  );
};
