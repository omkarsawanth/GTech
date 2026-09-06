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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-coral/50 disabled:opacity-50 disabled:cursor-not-allowed select-none transform-gpu relative overflow-hidden";
  
  const variants = {
    primary: "gradient-solar-btn text-white font-semibold hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-dark-800/90 hover:bg-dark-750 text-slate-100 border border-slate-700/60 shadow-sm hover:border-solar-coral/40 hover:scale-[1.01] active:scale-[0.99]",
    outline: "bg-dark-900/60 border border-solar-coral/40 text-rose-300 hover:bg-solar-coral/10 hover:border-solar-coral hover:text-white shadow-sm",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-dark-800/60",
    glow: "gradient-solar-btn text-white shadow-lg hover:scale-[1.02]",
    solar: "gradient-solar-btn text-white font-bold tracking-wide hover:scale-[1.02]",
    violet: "gradient-violet-btn text-white font-semibold hover:scale-[1.02]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4.5 py-2.5 text-sm font-semibold gap-2",
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

export const Card = ({ children, className = '', hover = true, glow = false, solar = false, ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'hover:border-solar-coral/40 hover:shadow-xl hover:shadow-rose-950/30 hover:-translate-y-1' : ''
      } ${glow ? 'border-solar-coral/40 shadow-lg shadow-rose-950/30' : ''} ${solar ? 'glass-panel-solar' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'coral', size = 'md', className = '' }) => {
  const variants = {
    coral: "bg-solar-coral/15 text-rose-300 border-solar-coral/30 shadow-[0_0_10px_rgba(255,51,102,0.15)]",
    amber: "bg-solar-amber/15 text-amber-300 border-solar-amber/30 shadow-[0_0_10px_rgba(255,138,0,0.15)]",
    violet: "bg-solar-violet/15 text-purple-300 border-solar-violet/30 shadow-[0_0_10px_rgba(139,92,246,0.15)]",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    red: "bg-rose-500/15 text-rose-300 border-rose-500/30",
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

export const ProgressBar = ({ progress = 0, color = 'coral', height = 'h-2', showText = false, label = '' }) => {
  const colorGradients = {
    coral: "from-solar-coral to-solar-amber shadow-[0_0_12px_rgba(255,51,102,0.4)]",
    amber: "from-solar-amber to-amber-300 shadow-[0_0_12px_rgba(255,138,0,0.4)]",
    violet: "from-solar-violet to-solar-purple shadow-[0_0_12px_rgba(139,92,246,0.4)]",
    purple: "from-solar-coral to-solar-violet shadow-[0_0_12px_rgba(255,51,102,0.4)]",
    cyan: "from-cyan-400 to-solar-violet",
    emerald: "from-emerald-400 to-teal-300",
    rose: "from-solar-coral to-solar-rose",
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {(showText || label) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-slate-300">
          <span>{label}</span>
          <span className="text-rose-300 font-mono font-bold">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-dark-950 rounded-full overflow-hidden p-0.5 border border-white/5 ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients[color] || colorGradients.coral} transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'coral' }) => {
  const colorBorders = {
    coral: "border-solar-coral/30 text-rose-300 bg-solar-coral/10 shadow-[0_0_15px_rgba(255,51,102,0.15)]",
    amber: "border-solar-amber/30 text-amber-300 bg-solar-amber/10 shadow-[0_0_15px_rgba(255,138,0,0.15)]",
    violet: "border-solar-violet/30 text-purple-300 bg-solar-violet/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    purple: "border-solar-coral/30 text-rose-300 bg-solar-coral/10",
    cyan: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10",
    emerald: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    rose: "border-solar-coral/30 text-rose-300 bg-solar-coral/10",
  };

  return (
    <Card hover className="relative overflow-hidden group border-solar-coral/15 hover:border-solar-coral/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight font-display">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl border ${colorBorders[color] || colorBorders.coral} transition-transform duration-200 group-hover:scale-110`}>
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
