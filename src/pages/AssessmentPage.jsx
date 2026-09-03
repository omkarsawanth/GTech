import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  BarChart3, 
  Database, 
  GitBranch, 
  HelpCircle 
} from 'lucide-react';
import { Button, Card, ProgressBar, Badge } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';

export const AssessmentPage = () => {
  const { assessment, saveAssessment, activeCareerProfile } = useApp();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(assessment.answers || {
    q_python: 'Intermediate',
    q_ml: 'Beginner',
    q_stats: 'Basic',
    q_sql: 'Intermediate',
    q_git: 'Intermediate',
    q_math: 'Basic',
    q_dl: 'Beginner',
    q_problem: 'Intermediate',
    q_soft: 'Intermediate',
    q_data: 'Basic'
  });

  const questions = [
    {
      id: 'q_python',
      category: 'Programming & Logic',
      icon: Code2,
      question: 'How comfortable are you with Python programming & data structures?',
      description: 'Covers loops, dictionaries, OOP principles, decorators, and list comprehensions.',
      options: [
        { label: 'Beginner', desc: 'I am learning basic syntax and print statements.' },
        { label: 'Basic', desc: 'I can write simple scripts, functions, and loops.' },
        { label: 'Intermediate', desc: 'I comfortably write OOP code, use custom modules, and write clean algorithms.' },
        { label: 'Advanced', desc: 'I write high-performance Python, async code, custom packages, and memory optimizations.' }
      ]
    },
    {
      id: 'q_ml',
      category: 'Machine Learning',
      icon: BrainCircuit,
      question: 'What is your current depth of experience with Machine Learning algorithms?',
      description: 'Covers linear/logistic regression, decision trees, cross-validation, and Scikit-Learn.',
      options: [
        { label: 'Beginner', desc: 'I have heard of ML concepts but never trained a model.' },
        { label: 'Basic', desc: 'I have fit basic models using Scikit-Learn following online tutorials.' },
        { label: 'Intermediate', desc: 'I tune hyperparameters, handle class imbalance, evaluate cross-validation, and perform feature engineering.' },
        { label: 'Advanced', desc: 'I design custom ensemble models, build MLOps pipelines, and optimize loss functions in production.' }
      ]
    },
    {
      id: 'q_stats',
      category: 'Statistics & Math',
      icon: BarChart3,
      question: 'How well do you understand Statistical Inference & Probability distributions?',
      description: 'Covers mean/variance, standard deviations, t-tests, p-values, and Bayes theorem.',
      options: [
        { label: 'Beginner', desc: 'Basic arithmetic and high school statistics.' },
        { label: 'Basic', desc: 'Understand standard normal distributions, mean, median, and variance.' },
        { label: 'Intermediate', desc: 'Comfortable conducting hypothesis testing, A/B tests, and computing p-values.' },
        { label: 'Advanced', desc: 'Proficient in Bayesian inference, multivariate probability models, and stochastic processes.' }
      ]
    },
    {
      id: 'q_data',
      category: 'Data Wrangling',
      icon: BarChart3,
      question: 'How experienced are you with NumPy & Pandas data manipulation?',
      description: 'Covers DataFrames, vector operations, groupby aggregations, and missing value handling.',
      options: [
        { label: 'Beginner', desc: 'Never used Pandas or NumPy arrays.' },
        { label: 'Basic', desc: 'Can read CSVs and filter rows using simple Pandas boolean indexing.' },
        { label: 'Intermediate', desc: 'Comfortable with pivot tables, multi-index joins, lambda functions, and vectorization.' },
        { label: 'Advanced', desc: 'Expert in memory optimization, Dask parallelization, and complex data pipeline engineering.' }
      ]
    },
    {
      id: 'q_dl',
      category: 'Deep Learning',
      icon: BrainCircuit,
      question: 'What is your experience level with PyTorch or TensorFlow frameworks?',
      description: 'Covers neural network layers, backpropagation, CNNs, Transformers, and GPU training.',
      options: [
        { label: 'Beginner', desc: 'No experience with neural networks.' },
        { label: 'Basic', desc: 'Understand basic forward pass concept and simple feed-forward neural nets.' },
        { label: 'Intermediate', desc: 'Can construct CNNs / RNNs in PyTorch and debug gradient flow.' },
        { label: 'Advanced', desc: 'Train custom Transformer architectures, fine-tune LLMs, and optimize CUDA kernels.' }
      ]
    },
    {
      id: 'q_sql',
      category: 'Database & SQL',
      icon: Database,
      question: 'How proficient are you at writing SQL queries for relational databases?',
      description: 'Covers SELECT statements, JOINs, aggregate functions, GROUP BY, and window functions.',
      options: [
        { label: 'Beginner', desc: 'Can write simple SELECT * FROM table queries.' },
        { label: 'Basic', desc: 'Use WHERE clauses, INNER JOINs, and simple GROUP BY statements.' },
        { label: 'Intermediate', desc: 'Write complex CTEs, window functions (ROW_NUMBER/RANK), and indexing optimizations.' },
        { label: 'Advanced', desc: 'Architect database schemas, optimize execution plans, and write complex stored procedures.' }
      ]
    },
    {
      id: 'q_git',
      category: 'DevOps & Version Control',
      icon: GitBranch,
      question: 'How comfortable are you with Git version control & GitHub workflows?',
      description: 'Covers commit, branch, merge, pull requests, rebase, and merge conflict resolution.',
      options: [
        { label: 'Beginner', desc: 'Never used Git or GitHub.' },
        { label: 'Basic', desc: 'Can git add, git commit, and git push to main.' },
        { label: 'Intermediate', desc: 'Use feature branches, handle pull request reviews, and resolve merge conflicts.' },
        { label: 'Advanced', desc: 'Master interactive rebasing, git bisect, and automated CI/CD GitHub Actions pipelines.' }
      ]
    },
    {
      id: 'q_math',
      category: 'Linear Algebra & Calculus',
      icon: HelpCircle,
      question: 'What is your baseline knowledge of Linear Algebra & Vector Calculus?',
      description: 'Covers matrix multiplication, eigenvectors, eigenvalues, matrix decompositions, and partial derivatives.',
      options: [
        { label: 'Beginner', desc: 'High school math foundation.' },
        { label: 'Basic', desc: 'Understand vector dot products and simple matrix addition.' },
        { label: 'Intermediate', desc: 'Understand matrix transformations, SVD, and gradient descent calculus.' },
        { label: 'Advanced', desc: 'Rigorous multivariable calculus, optimization theory, and tensor math.' }
      ]
    },
    {
      id: 'q_problem',
      category: 'Algorithms & Problem Solving',
      icon: Code2,
      question: 'How do you approach Data Structures & Algorithmic Problem Solving?',
      description: 'Covers time complexity (Big-O), arrays, trees, dynamic programming, and LeetCode problems.',
      options: [
        { label: 'Beginner', desc: 'I code by trial and error without considering Big-O complexity.' },
        { label: 'Basic', desc: 'Familiar with arrays and basic sorting algorithms.' },
        { label: 'Intermediate', desc: 'Understand hash maps, trees, recursion, and Big-O efficiency tradeoffs.' },
        { label: 'Advanced', desc: 'Solve hard LeetCode dynamic programming and graph optimization algorithms effortlessly.' }
      ]
    },
    {
      id: 'q_soft',
      category: 'Communication & Soft Skills',
      icon: Sparkles,
      question: 'How effective are you at communicating technical findings to stakeholders?',
      description: 'Covers technical presentation, writing documentation, and collaborating in team environments.',
      options: [
        { label: 'Beginner', desc: 'Prefer working alone without presenting work.' },
        { label: 'Basic', desc: 'Can explain code to peers when asked.' },
        { label: 'Intermediate', desc: 'Translate technical model results into clean summaries and slides for team leads.' },
        { label: 'Advanced', desc: 'Regularly present executive tech briefings, lead cross-functional workshops, and mentor engineers.' }
      ]
    }
  ];

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ.id] || 'Basic';
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleOptionSelect = (optionLabel) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionLabel
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save and trigger AI analysis animation page
      saveAssessment(answers);
      navigate('/ai-analysis');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const IconComponent = currentQ.icon;

  return (
    <div className="min-h-screen bg-[#07090E] px-4 py-12 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Step Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">
              Skill Evaluation — {activeCareerProfile?.title || 'Target Role'}
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              Question {currentIndex + 1} of {questions.length}
            </h1>
          </div>
          <Badge variant="cyan" size="lg" className="font-mono font-bold">
            {progressPercent}% Complete
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar progress={progressPercent} color="purple" height="h-2.5" />
        </div>

        {/* Question Card */}
        <Card className="p-8">
          
          {/* Category Pill */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {currentQ.category}
            </span>
          </div>

          {/* Question Title & Subtext */}
          <h2 className="text-xl font-bold text-white leading-snug mb-2">
            {currentQ.question}
          </h2>
          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            {currentQ.description}
          </p>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.label;
              return (
                <div
                  key={opt.label}
                  onClick={() => handleOptionSelect(opt.label)}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-200 border flex items-start gap-3 ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-500 text-white shadow-lg shadow-purple-950/40'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? 'border-purple-400 bg-purple-600 text-white' : 'border-slate-600 bg-slate-900'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2">
                      {opt.label}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back & Next Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              icon={ArrowLeft}
            >
              Previous
            </Button>

            <Button
              variant="glow"
              size="md"
              onClick={handleNext}
              icon={currentIndex === questions.length - 1 ? Sparkles : ArrowRight}
              iconPosition="right"
            >
              {currentIndex === questions.length - 1 ? 'Analyze My Skills' : 'Next Question'}
            </Button>
          </div>

        </Card>

      </div>
    </div>
  );
};
