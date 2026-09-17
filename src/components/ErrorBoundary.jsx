import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#07090E] flex flex-col justify-center items-center text-center p-6">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Something Went Wrong</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-md">
            An unexpected error occurred while rendering this view. Reloading will restore your session.
          </p>
          {this.state.error?.message && (
            <div className="mt-4 p-3 bg-[#0B0D12] border border-[#1E232F] text-left max-w-md w-full font-mono text-xs text-red-400/80 overflow-x-auto">
              {this.state.error.message}
            </div>
          )}
          <button
            onClick={this.handleReload}
            className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#FF3366] to-[#FF8A00] text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-[#FF3366]/20 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
