import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { 
  EditorialShell, 
  EditorialHeader, 
  EditorialButton,
  EditorialBadge
} from '../components/common/EditorialComponents';
import { useApp } from '../context/AppContext';
import { analyzeJobDescription, fetchJobAnalysisAI } from '../services/aiService';

export const JobAnalysisPage = () => {
  const { user, activeCareerProfile, addSkillsToRoadmap, saveJobAnalysis, backendAvailable } = useApp();
  const navigate = useNavigate();

  const defaultSample = `Senior Applied AI Engineer
Company: Apex Systems Labs
Location: Remote / Global

Role Overview:
We are seeking an Applied AI Engineer to architect, evaluate, and deploy production-grade LLM workflows, retrieval-augmented pipelines, and custom fine-tuning systems.

Key Responsibilities:
- Design end-to-end Machine Learning pipelines using Python, PyTorch, and vLLM.
- Build production RAG systems utilizing Vector Databases (Qdrant/Pinecone) and hybrid dense-sparse retrieval.
- Conduct rigorous statistical benchmarking, latency profiling, and regression evaluation across models.
- Build resilient microservices with FastAPI, Docker, and PostgreSQL.

Requirements:
- Strong foundation in Deep Learning, PyTorch, and Transformer architectures.
- Experience with Vector Databases, LLM fine-tuning, and prompt evaluations.
- Production proficiency in Python, SQL, Git workflows, and CI/CD pipelines.`;

  const [jobText, setJobText] = useState(defaultSample);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAnalyze = async () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);
    setAddedNotice(false);
    try {
      let res;
      if (backendAvailable) {
        res = await fetchJobAnalysisAI(jobText, user?.targetCareer || activeCareerProfile?.id || 'software-engineer');
      } else {
        res = await analyzeJobDescription(jobText, user?.skills || []);
      }
      setResult(res);
      saveJobAnalysis(res);
    } catch (err) {
      alert(err.message || 'Error analyzing job description.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddSkillsToRoadmap = async () => {
    if (result && result.missingSkills && result.missingSkills.length > 0) {
      await addSkillsToRoadmap(result.missingSkills);
      setAddedNotice(true);
      setTimeout(() => {
        navigate('/roadmap');
      }, 900);
    }
  };

  return (
    <AppLayout>
      <EditorialShell>
        
        {/* Editorial Header */}
        <EditorialHeader
          index="06"
          tag="JOB SPECIFICATION AUDITOR"
          title="Paste a Role. Measure the Gap."
          subtitle="Audit live job postings and vacancy specifications against your verified candidate profile to calculate empirical readiness and inject missing competencies."
        >
          <EditorialButton
            variant="secondary"
            size="sm"
            onClick={() => setJobText(defaultSample)}
          >
            LOAD SAMPLE SPEC
          </EditorialButton>
        </EditorialHeader>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Text Input (5 cols) */}
          <div className="lg:col-span-6 border border-[#1E232F] bg-[#0B0D12] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E232F] font-mono text-[11px] uppercase tracking-wider text-[#6B7688]">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-gorange" />
                  <span className="text-white font-bold">01 // JOB SPECIFICATION TEXT</span>
                </div>
                <span>{jobText.length} CHARS</span>
              </div>

              <textarea
                rows={16}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                className="w-full p-4 bg-[#07080D] border border-[#1E232F] text-white placeholder-[#4B5565] focus:outline-none focus:border-gorange text-xs font-mono leading-relaxed resize-none transition-colors"
                placeholder="Paste the complete job description, technical requirements, or job vacancy notice here..."
              />
            </div>

            <div className="pt-6 mt-6 border-t border-[#1E232F] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[11px] text-[#6B7688]">
                BENCHMARK TARGET: <span className="text-white">{activeCareerProfile?.title || 'Active Track'}</span>
              </span>
              <EditorialButton
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                isLoading={isAnalyzing}
                icon={Sparkles}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                ANALYZE ROLE MATCH
              </EditorialButton>
            </div>
          </div>

          {/* Right Column: Diagnostic Readout (6 cols) */}
          <div className="lg:col-span-6">
            {!result ? (
              <div className="border border-dashed border-[#1E232F] bg-[#0B0D12]/40 p-12 text-center flex flex-col items-center justify-center min-h-[480px]">
                <div className="font-mono text-xs text-gorange uppercase tracking-widest mb-3">
                  [ SPECIFICATION DIAGNOSTIC PENDING ]
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Awaiting Job Specification
                </h3>
                <p className="text-xs text-[#8F9AA9] max-w-sm leading-relaxed font-light">
                  Paste any live role description on the left and click "Analyze Role Match" to parse matching competencies, critical gaps, and compute your empirical readiness percentage.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Result Header Panel */}
                <div className="border border-[#1E232F] bg-[#0B0D12] p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#1E232F]">
                    <div>
                      <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-1">
                        SPECIFICATION DIAGNOSIS
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                        {result.jobTitle || 'Evaluated Position'}
                      </h3>
                      <p className="font-mono text-xs text-gorange mt-1">
                        {result.companyName || 'Institutional Employer'}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-1">
                        READINESS MATCH
                      </div>
                      <div className="font-display font-extrabold text-4xl sm:text-5xl text-white font-mono">
                        {result.readinessScore}%
                      </div>
                      <span className={`inline-block font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 mt-2 border ${
                        result.readinessScore >= 70
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                          : 'border-gorange/40 text-gorange bg-gorange/10'
                      }`}>
                        {result.readinessScore >= 70 ? 'STRONG ALIGNMENT' : 'CRITICAL GAPS PRESENT'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8F9AA9] mt-4 leading-relaxed font-light">
                    {result.summary}
                  </p>
                </div>

                {/* Comparative Breakdown Grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Matching Qualifications */}
                  <div className="border border-[#1E232F] bg-[#0B0D12] p-5">
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#6B7688] uppercase tracking-wider pb-3 mb-3 border-b border-[#1E232F]">
                      <span className="text-white font-bold">MATCHING ASSETS</span>
                      <span className="text-emerald-400 font-bold">{result.matchingSkills?.length || 0}</span>
                    </div>
                    <div className="space-y-2">
                      {(result.matchingSkills || []).map((sk) => (
                        <div key={sk} className="font-mono text-xs text-emerald-400 bg-[#07080D] border border-emerald-500/20 p-2.5 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />
                          <span className="truncate">{sk}</span>
                        </div>
                      ))}
                      {(!result.matchingSkills || result.matchingSkills.length === 0) && (
                        <p className="font-mono text-xs text-[#6B7688]">No matching skills detected in profile.</p>
                      )}
                    </div>
                  </div>

                  {/* Deficit / Missing Skills */}
                  <div className="border border-[#1E232F] bg-[#0B0D12] p-5">
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#6B7688] uppercase tracking-wider pb-3 mb-3 border-b border-[#1E232F]">
                      <span className="text-white font-bold">REQUIRED DEFICITS</span>
                      <span className="text-rose-400 font-bold">{result.missingSkills?.length || 0}</span>
                    </div>
                    <div className="space-y-2">
                      {(result.missingSkills || []).map((sk) => (
                        <div key={sk} className="font-mono text-xs text-rose-400 bg-[#07080D] border border-rose-500/20 p-2.5 flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                          <span className="truncate">{sk}</span>
                        </div>
                      ))}
                      {(!result.missingSkills || result.missingSkills.length === 0) && (
                        <p className="font-mono text-xs text-emerald-400">Zero critical deficits identified!</p>
                      )}
                    </div>
                  </div>

                </div>

                {/* Injection CTA */}
                {result.missingSkills && result.missingSkills.length > 0 && (
                  <div className="border border-gorange/40 bg-[#121622] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs text-gorange font-bold uppercase tracking-wider">
                        UPDATE CURRICULUM
                      </div>
                      <p className="text-xs text-[#8F9AA9] mt-1 font-light">
                        Inject {result.missingSkills.length} identified deficits directly into your personalized career roadmap.
                      </p>
                    </div>

                    <EditorialButton
                      variant="primary"
                      size="md"
                      onClick={handleAddSkillsToRoadmap}
                      icon={Plus}
                      iconPosition="left"
                      className="w-full sm:w-auto shrink-0"
                    >
                      {addedNotice ? '✓ INJECTED INTO ROADMAP' : 'INJECT GAPS TO ROADMAP'}
                    </EditorialButton>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>

      </EditorialShell>
    </AppLayout>
  );
};
