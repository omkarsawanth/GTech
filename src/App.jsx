import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy-loaded page components for dynamic route-based code splitting
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ProfileSetupPage = lazy(() => import('./pages/ProfileSetupPage').then(m => ({ default: m.ProfileSetupPage })));
const CareerSelectionPage = lazy(() => import('./pages/CareerSelectionPage').then(m => ({ default: m.CareerSelectionPage })));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage').then(m => ({ default: m.AssessmentPage })));
const AIAnalysisTransitionPage = lazy(() => import('./pages/AIAnalysisTransitionPage').then(m => ({ default: m.AIAnalysisTransitionPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const SkillGapPage = lazy(() => import('./pages/SkillGapPage').then(m => ({ default: m.SkillGapPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const JobAnalysisPage = lazy(() => import('./pages/JobAnalysisPage').then(m => ({ default: m.JobAnalysisPage })));
const ProjectGeneratorPage = lazy(() => import('./pages/ProjectGeneratorPage').then(m => ({ default: m.ProjectGeneratorPage })));
const ProfileSettingsPage = lazy(() => import('./pages/ProfileSettingsPage').then(m => ({ default: m.ProfileSettingsPage })));
const OnboardingChatPage = lazy(() => import('./pages/OnboardingChatPage').then(m => ({ default: m.OnboardingChatPage })));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));

const PageLoader = () => (
  <div className="min-h-screen bg-[#07080D] flex flex-col items-center justify-center p-6 text-center">
    <div className="w-8 h-8 border border-[#1E232F] border-t-gorange animate-spin mb-4" />
    <div className="font-mono text-[11px] uppercase tracking-widest text-[#8F9AA9]">
      SYSTEM INITIALIZING // LOADING MODULE...
    </div>
  </div>
);

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              
              <Route path="/login" element={
                <ProtectedRoute publicOnly>
                  <LoginPage />
                </ProtectedRoute>
              } />
              
              <Route path="/signup" element={
                <ProtectedRoute publicOnly>
                  <SignupPage />
                </ProtectedRoute>
              } />

              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileSetupPage />
                </ProtectedRoute>
              } />
              
              <Route path="/career-selection" element={
                <ProtectedRoute>
                  <CareerSelectionPage />
                </ProtectedRoute>
              } />

              <Route path="/assessment" element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              } />

              <Route path="/ai-analysis" element={
                <ProtectedRoute>
                  <AIAnalysisTransitionPage />
                </ProtectedRoute>
              } />

              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />

              <Route path="/skill-gap" element={
                <ProtectedRoute>
                  <SkillGapPage />
                </ProtectedRoute>
              } />

              <Route path="/roadmap" element={
                <ProtectedRoute>
                  <RoadmapPage />
                </ProtectedRoute>
              } />

              <Route path="/job-analysis" element={
                <ProtectedRoute>
                  <JobAnalysisPage />
                </ProtectedRoute>
              } />

              <Route path="/projects" element={
                <ProtectedRoute>
                  <ProjectGeneratorPage />
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <ProfileSettingsPage />
                </ProtectedRoute>
              } />

              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <OnboardingChatPage />
                </ProtectedRoute>
              } />

              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
