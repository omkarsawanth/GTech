import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SearchCode, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  FileText, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, ProgressBar, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { analyzeJobDescription, fetchJobAnalysisAI } from '../services/aiService';

export const JobAnalysisPage = () => {
  const { user, addSkillsToRoadmap, saveJobAnalysis, backendAvailable } = useApp();
  const navigate = useNavigate();

  const samplePosting = `Senior AI & Machine Learning Engineer
Company: Apex Innovations AI
Location: Remote (US / Global)

About the Role:
We are searching for a high-performing AI Engineer to architect, build, and deploy production-grade LLM applications and machine learning models. 

Key Responsibilities:
- Design and implement end-to-end Machine Learning pipelines using Python, PyTorch, and Scikit-Learn.
- Build production RAG (Retrieval-Augmented Generation) systems utilizing Vector Databases and Large Language Models (LLMs).
- Conduct rigorous statistical analysis, feature engineering, and hypothesis testing on multi-terabyte datasets.
- Optimize database queries with SQL and manage containerized deployments using Docker and AWS.

Qualifications:
- Bachelor's or Master's degree in Computer Science, AI, or Quantitative discipline.
- Proficient in Python, SQL, Git version control, and RESTful API architecture.
- Deep expertise in Deep Learning frameworks (PyTorch or TensorFlow), Statistics, and MLOps.`;

  const [jobText, setJobText] = useState(samplePosting);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAddedNotice(false);
    try {
      let res;
      if (backendAvailable) {
        res = await fetchJobAnalysisAI(jobText, user?.targetCareer || 'ai-engineer');
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
      }, 1000);
    }
  };

  return (
    <AppLayout>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <SearchCode className="w-3.5 h-3.5" /> AI Job Description Parser
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            How ready are you for this job?
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Paste any live job posting to calculate match score %, identify missing requirements, and update your roadmap.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setJobText(samplePosting)}
        >
          Load Sample AI Job Posting
        </Button>
      </div>

      {/* INPUT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Left: Textarea input */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" /> Paste Job Description Text
            </label>
            <textarea
              rows={14}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs font-mono leading-relaxed resize-none"
              placeholder="Paste job posting duties, requirements, and tech stack here..."
            />
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
            <Button
              variant="glow"
              size="lg"
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
              icon={Sparkles}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Analyze Job Readiness
            </Button>
          </div>
        </Card>

        {/* Right: Results Display */}
        <div className="space-y-6">
          {!result ? (
            <Card className="p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <SearchCode className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Ready for Job Analysis</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Click "Analyze Job Readiness" to calculate match score %, extracted skills, and gap impact.
              </p>
            </Card>
          ) : (
            <>
              {/* Job Readiness Score Banner */}
              <Card className="p-6 border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">JOB READINESS MATCH</span>
                    <h3 className="text-2xl font-extrabold text-white mt-0.5">{result.jobTitle}</h3>
                    <p className="text-xs text-cyan-300 mt-1">{result.companyName}</p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-white font-mono">{result.readinessScore}%</div>
                    <Badge variant={result.readinessScore >= 70 ? 'green' : 'amber'} size="sm" className="mt-1">
                      {result.readinessScore >= 70 ? 'Strong Match' : 'Gap Action Required'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {result.summary}
                </div>
              </Card>

              {/* Skills Matching Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Skills You Have */}
                <Card className="p-5 border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">Skills You Have</h4>
                  </div>
                  <div className="space-y-1.5">
                    {result.matchingSkills.map((sk) => (
                      <div key={sk} className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold">{sk}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Missing Skills */}
                <Card className="p-5 border-rose-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <h4 className="text-sm font-bold text-white">Missing Skills</h4>
                  </div>
                  <div className="space-y-1.5">
                    {result.missingSkills.map((sk) => (
                      <div key={sk} className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="font-semibold">{sk}</span>
                      </div>
                    ))}
                  </div>
                </Card>

              </div>

              {/* Dynamic Roadmap Addition CTA Button */}
              {result.missingSkills.length > 0 && (
                <div className="pt-2">
                  <Button
                    variant="glow"
                    size="lg"
                    onClick={handleAddSkillsToRoadmap}
                    className="w-full"
                    icon={Plus}
                  >
                    {addedNotice ? '✓ Skills Injected into Roadmap!' : 'Add these skills to my roadmap'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

    </AppLayout>
  );
};
