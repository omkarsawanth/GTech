import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Sparkles } from 'lucide-react';

export const ProtectedRoute = ({ children, publicOnly = false }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col justify-center items-center text-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 animate-pulse">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Authenticating GTech Session...</h3>
        <p className="text-xs text-slate-400 mt-1">Connecting security protocols</p>
      </div>
    );
  }

  // If page is for public unauthenticated users (login/signup) and user IS logged in -> redirect to dashboard
  if (publicOnly && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If page is protected and user is NOT logged in -> redirect to login
  if (!publicOnly && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
