import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { CareerSelectionPage } from './pages/CareerSelectionPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AIAnalysisTransitionPage } from './pages/AIAnalysisTransitionPage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { JobAnalysisPage } from './pages/JobAnalysisPage';
import { ProjectGeneratorPage } from './pages/ProjectGeneratorPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
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

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
