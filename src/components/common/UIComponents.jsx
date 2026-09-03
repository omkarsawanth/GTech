import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none transform-gpu";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 border border-purple-500/30 hover:scale-[1.01] active:scale-[0.99]",
    secondary: "bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/60 shadow-sm hover:scale-[1.01] active:scale-[0.99]",
    outline: "bg-transparent border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 hover:text-white",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
    glow: "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-lg shadow-purple-500/20 border border-purple-400/40 hover:scale-[1.01]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4 py-2.5 text-sm font-semibold gap-2",
    lg: "px-6 py-3.5 text-base font-bold gap-2.5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

export const Card = ({ children, className = '', hover = true, glow = false, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-200 ${
        hover ? 'hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-950/20 hover:-translate-y-0.5' : ''
      } ${glow ? 'border-purple-500/40 shadow-md shadow-purple-500/10' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'purple', size = 'md', className = '' }) => {
  const variants = {
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    red: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm font-semibold"
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export const ProgressBar = ({ progress = 0, color = 'purple', height = 'h-2', showText = false, label = '' }) => {
  const colorGradients = {
    purple: "from-purple-600 to-indigo-500",
    cyan: "from-cyan-500 to-blue-500",
    emerald: "from-emerald-500 to-teal-400",
    rose: "from-rose-500 to-pink-500",
    amber: "from-amber-500 to-orange-500"
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {(showText || label) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-slate-300">
          <span>{label}</span>
          <span className="text-slate-400">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50 ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients[color] || colorGradients.purple} transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'purple' }) => {
  const colorBorders = {
    purple: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    rose: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  };

  return (
    <Card hover className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${colorBorders[color]} transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trendValue && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs">
          <span className={trend === 'up' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
            {trendValue}
          </span>
          <span className="text-slate-400">vs benchmark target</span>
        </div>
      )}
    </Card>
  );
};
