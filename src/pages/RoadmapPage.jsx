import React from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Code2, 
  Sparkles, 
  ExternalLink,
  Lock,
  Play,
  Share2
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card, Badge, ProgressBar, Button } from '../components/common/UIComponents';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TaskCard } from '../components/common/TaskCard';
import { ShareProgressModal } from '../components/common/ShareProgressModal';

export const RoadmapPage = () => {
  const { roadmap, toggleRoadmapStep, activeCareerProfile, dailyTasks, markTaskComplete, currentStreak, user, analysisResult } = useApp();
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const allTasks = roadmap?.tasks || (dailyTasks?.activeTasks || []).concat(dailyTasks?.previewTasks || []) || [];

  const completedStepsCount = roadmap.filter(r => r.status === 'Completed').length;
  const totalStepsCount = roadmap.length;
  const overallRoadmapPercent = Math.round((completedStepsCount / (totalStepsCount || 1)) * 100);

  return (
    <AppLayout>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1 font-mono">
            <Compass className="w-3.5 h-3.5" /> AI-Generated Vertical Learning Timeline
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Your Path to {activeCareerProfile?.title || 'AI Engineer'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Chronological step-by-step master plan with verified projects & learning resources.
          </p>
        </div>

        {/* Overall Roadmap Progress Card */}
        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 min-w-[240px]">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-lg font-mono">
            {overallRoadmapPercent}%
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Roadmap Progress</div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">
              {completedStepsCount} of {totalStepsCount} Phases Done
            </div>
            <div className="w-28 bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallRoadmapPercent}%` }}
              />
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => setIsShareModalOpen(true)}
          className="text-xs font-display hover:border-solar-coral/50 shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5 text-solar-coral" />
          Share Progress
        </Button>
      </div>

      {/* VERTICAL TIMELINE ROADMAP CONTAINER */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10 my-6">
        
        {roadmap.map((step, index) => {
          const isCompleted = step.status === 'Completed';
          const isInProgress = step.status === 'In Progress';
          const isLocked = step.status === 'Locked';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group"
            >
              
              {/* Timeline Stage Marker Dot */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : isInProgress
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  step.stageNumber
                )}
              </div>

              {/* Stage Card */}
              <Card hover className={`p-6 sm:p-8 transition-all duration-300 ${
                isInProgress ? 'border-purple-500/40 shadow-xl shadow-purple-950/30 bg-slate-900/90' : isLocked ? 'opacity-85' : ''
              }`}>
                
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">Phase {step.stageNumber}</span>
                    <Badge variant={isCompleted ? 'green' : isInProgress ? 'purple' : 'slate'} size="md">
                      {step.status}
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {step.duration}
                    </span>
                  </div>

                  {/* Completion Toggle Button */}
                  <Button
                    variant={isCompleted ? 'outline' : isInProgress ? 'glow' : 'secondary'}
                    size="sm"
                    onClick={() => toggleRoadmapStep(step.id)}
                    icon={isCompleted ? CheckCircle2 : isInProgress ? Play : Lock}
                  >
                    {isCompleted ? 'Mark Incomplete' : isInProgress ? 'Mark Phase Complete' : 'Unlock Phase'}
                  </Button>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {step.skills?.map((sk) => (
                    <span key={sk} className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-purple-300 border border-slate-800 font-medium">
                      #{sk}
                    </span>
                  ))}
                </div>

                {/* Grid for Resources & Milestone Project */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                  
                  {/* Resources Box */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                      <BookOpen className="w-4 h-4 text-purple-400" /> Recommended Resources
                    </h4>
                    <ul className="space-y-2">
                      {step.resources?.map((res, rIdx) => (
                        <li key={rIdx}>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center justify-between group/link"
                          >
                            <span className="truncate group-hover/link:underline">{res.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500 group-hover/link:text-purple-300 shrink-0 ml-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hands-On Project Box */}
                  {step.project && (
                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                          <Code2 className="w-4 h-4 text-cyan-400" /> Milestone Project
                        </h4>
                        <Badge variant="cyan" size="sm">Portfolio Milestone</Badge>
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1 font-display">{step.project.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.project.description}</p>
                    </div>
                  )}

                </div>

                {/* Task Progress Dots */}
                {allTasks.filter(t => t.milestoneId === step.id).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Daily Tasks</span>
                      <span className="text-xs text-slate-500">
                        {allTasks.filter(t => t.milestoneId === step.id && t.status === 'completed').length} / {allTasks.filter(t => t.milestoneId === step.id).length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {allTasks.filter(t => t.milestoneId === step.id).map(task => (
                        <div
                          key={task.id}
                          title={task.title}
                          className={`w-3 h-3 rounded-full transition-all ${
                            task.status === 'completed'
                              ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30'
                              : task.status === 'unlocked'
                              ? 'bg-solar-coral animate-pulse shadow-sm shadow-rose-500/30'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </Card>
            </motion.div>
          );
        })}

      </div>

      {/* Add Custom Skill CTA */}
      <div className="mt-12 text-center p-8 rounded-2xl glass-panel border border-slate-800">
        <h3 className="text-xl font-display font-bold text-white">Need to add specific skills to your roadmap?</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Parse a job posting or select missing skills from the AI Project Generator to dynamically expand your roadmap.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Button variant="secondary" size="md" onClick={() => navigate('/job-analysis')}>
            Parse Job Description
          </Button>
          <Button variant="glow" size="md" onClick={() => navigate('/projects')} className="font-display">
            Explore AI Projects
          </Button>
        </div>
      </div>

      {/* Share Progress Modal */}
      <ShareProgressModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        careerTitle={activeCareerProfile?.title || 'AI Engineer'}
        readinessScore={analysisResult?.readinessScore || 72}
        currentStreak={currentStreak || 1}
        skillsCount={analysisResult?.skillsMasteredCount || 12}
        totalSkills={analysisResult?.totalSkillsCount || 20}
        userName={user?.displayName || user?.name || 'Student'}
      />

    </AppLayout>
  );
};
