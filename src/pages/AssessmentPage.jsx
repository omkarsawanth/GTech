import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton, 
  EditorialBadge 
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';

export const AssessmentPage = () => {
  const { assessment, saveAssessment, activeCareerProfile } = useApp();
  const navigate = useNavigate();

  // Dynamically derive assessment questions from the active career specification
  const targetTitle = activeCareerProfile?.title || 'Software Engineer';
  const skillsList = activeCareerProfile?.requiredSkills || [];

  const dynamicQuestions = skillsList.length > 0
    ? skillsList.map((skill, idx) => ({
        id: `q_skill_${idx}`,
        category: `${skill.category || 'Core Discipline'} // ${skill.importance || 'High'} Priority`,
        skillName: skill.name,
        question: `How would you evaluate your capability in ${skill.name}?`,
        description: `Target benchmark for ${targetTitle}: ${skill.requiredLevel}% proficiency level.`,
        benchmark: skill.requiredLevel,
        options: [
          { label: 'Beginner', desc: 'Novice. Conceptual understanding with limited or no practical execution.' },
          { label: 'Basic', desc: 'Foundational. Can complete elementary tasks under guidance and reference documentation.' },
          { label: 'Intermediate', desc: 'Autonomous. Comfortably build and troubleshoot production deliverables independently.' },
          { label: 'Advanced', desc: 'Authority. Architect systems, establish standards, and optimize complex workflows.' }
        ]
      }))
    : [
        {
          id: 'q_skill_0',
          category: 'Core Discipline // Critical Priority',
          skillName: 'Core Competency',
          question: `How would you rate your foundations in ${targetTitle}?`,
          description: `Baseline foundational knowledge required for industry readiness.`,
          benchmark: 80,
          options: [
            { label: 'Beginner', desc: 'Learning terminology and basic syntax/principles.' },
            { label: 'Basic', desc: 'Can execute structured assignments and basic workflows.' },
            { label: 'Intermediate', desc: 'Autonomous practitioner building reliable solutions.' },
            { label: 'Advanced', desc: 'Industry veteran capable of mentoring and system architecture.' }
          ]
        }
      ];

  // Append evidence & rigor criteria
  const fullQuestions = [
    ...dynamicQuestions,
    {
      id: 'q_evidence',
      category: 'Work Evidence // Portfolio Artifacts',
      skillName: 'Practical Evidence',
      question: `What depth of verified casework or portfolio evidence do you have?`,
      description: `Target proof format: ${activeCareerProfile?.evidenceType || 'Production artifacts and technical documentation'}.`,
      benchmark: 85,
      options: [
        { label: 'Beginner', desc: 'No tangible portfolio items, public casework, or lab reports yet.' },
        { label: 'Basic', desc: 'Classroom problem sets, guided tutorial clones, or initial drafts.' },
        { label: 'Intermediate', desc: 'Multiple standalone projects, client deliverables, or public repos.' },
        { label: 'Advanced', desc: 'Comprehensive track record with documented institutional or business impact.' }
      ]
    },
    {
      id: 'q_execution',
      category: 'Professional Rigor // Execution Standards',
      skillName: 'Industry Standards',
      question: `How experienced are you with domain workflows and stakeholder deadlines?`,
      description: 'Covers cross-functional collaboration, documentation quality, and meeting hard constraints.',
      benchmark: 75,
      options: [
        { label: 'Beginner', desc: 'Primarily solo academic or casual experimentation.' },
        { label: 'Basic', desc: 'Participated in group deliverables with standard review processes.' },
        { label: 'Intermediate', desc: 'Routinely coordinate with teams, handle revisions, and deliver to spec.' },
        { label: 'Advanced', desc: 'Set quality standards, review peer work, and lead stakeholder strategy.' }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(assessment?.answers || {});

  const currentQ = fullQuestions[currentIndex] || fullQuestions[0];
  const currentAnswer = answers[currentQ.id] || 'Basic';
  const progressPercent = Math.round(((currentIndex + 1) / fullQuestions.length) * 100);

  const handleOptionSelect = (optionLabel) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionLabel
    }));
  };

  const handleNext = () => {
    if (currentIndex < fullQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveAssessment(answers);
      navigate('/ai-analysis');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <AppLayout>
      <EditorialShell className="max-w-4xl">
        
        {/* Editorial Header */}
        <EditorialHeader
          index="04"
          tag="COMPETENCY AUDIT"
          title={`Evaluating Readiness for ${targetTitle}.`}
          subtitle={`Answer ${fullQuestions.length} rigorous diagnostic criteria to establish your empirical skill gap and roadmap.`}
        >
          <div className="font-mono text-xs text-[#8F9AA9] border border-[#1E232F] bg-[#0B0D12] px-3.5 py-2">
            CRITERION <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(fullQuestions.length).padStart(2, '0')}
          </div>
        </EditorialHeader>

        {/* Progress Line */}
        <div className="mb-10">
          <div className="flex justify-between font-mono text-[11px] text-[#6B7688] uppercase tracking-widest mb-2">
            <span>DIAGNOSTIC COMPLETION</span>
            <span className="text-gorange font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-[#1E232F]">
            <div 
              className="h-full bg-gorange transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Panel */}
        <div className="border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-10 mb-8">
          
          {/* Metadata pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E232F]">
            <div className="font-mono text-xs text-gorange uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gorange inline-block" />
              <span>{currentQ.category}</span>
            </div>
            <div className="font-mono text-[11px] text-[#6B7688] uppercase">
              BENCHMARK: <span className="text-white font-semibold">{currentQ.benchmark}%</span>
            </div>
          </div>

          {/* Question Title & Subtext */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              {currentQ.question}
            </h2>
            <p className="text-sm text-[#8F9AA9] mt-2 font-light leading-relaxed">
              {currentQ.description}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-10">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.label;
              return (
                <div
                  key={opt.label}
                  onClick={() => handleOptionSelect(opt.label)}
                  className={`cursor-pointer p-4 sm:p-5 border transition-all text-left flex items-start gap-4 ${
                    isSelected
                      ? 'border-gorange bg-[#121622] text-white'
                      : 'border-[#1E232F] bg-[#07080D] hover:border-[#384152] text-[#8F9AA9]'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected 
                      ? 'border-gorange bg-gorange text-black' 
                      : 'border-[#384152] bg-[#0B0D12]'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isSelected ? 'text-gorange' : 'text-white'}`}>
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#8F9AA9] mt-1 font-light leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#1E232F]">
            <EditorialButton
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              icon={ArrowLeft}
              iconPosition="left"
            >
              PREVIOUS
            </EditorialButton>

            <EditorialButton
              variant="primary"
              size="md"
              onClick={handleNext}
              icon={currentIndex === fullQuestions.length - 1 ? Sparkles : ArrowRight}
              iconPosition="right"
            >
              {currentIndex === fullQuestions.length - 1 ? 'CALCULATE READINESS' : 'NEXT CRITERION'}
            </EditorialButton>
          </div>

        </div>

      </EditorialShell>
    </AppLayout>
  );
};
