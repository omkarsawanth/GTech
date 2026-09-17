import React from 'react';
import { motion } from 'framer-motion';

/**
 * EditorialShell
 * Main architectural container providing consistent padding, grid background, and max-width bounds.
 */
export const EditorialShell = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 ${className}`}>
    {children}
  </div>
);

/**
 * EditorialHeader
 * Standardized page header with monospace index tag, large editorial headline, and right-aligned actions.
 */
export const EditorialHeader = ({
  index = '01',
  tag = 'COMMAND CENTER',
  title,
  subtitle,
  children,
  className = ''
}) => (
  <div className={`border-b border-[#1E232F] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}>
    <div className="max-w-3xl">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-gorange flex items-center gap-2 mb-3">
        <span>[ {tag} / {index} ]</span>
        <span className="h-px w-8 bg-gorange/40" />
      </div>
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.05]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#8F9AA9] mt-3 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
    {children && (
      <div className="flex items-center gap-3 flex-wrap shrink-0">
        {children}
      </div>
    )}
  </div>
);

/**
 * EditorialSection
 * Structured section divider with architectural borders and monospace label.
 */
export const EditorialSection = ({
  index,
  tag,
  title,
  subtitle,
  action,
  children,
  className = ''
}) => (
  <section className={`mb-12 ${className}`}>
    <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7688] mb-6 pb-3 border-b border-[#1E232F]">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 bg-gorange inline-block" />
        {index && <span className="text-white font-semibold">{index} /</span>}
        <span>{tag || title}</span>
      </div>
      {action && <div>{action}</div>}
    </div>
    {title && !tag && (
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
        {title}
      </h2>
    )}
    {subtitle && (
      <p className="text-sm text-[#8F9AA9] mb-6 font-light">
        {subtitle}
      </p>
    )}
    {children}
  </section>
);

/**
 * EditorialPanel
 * Flat, hairline-bordered container with dark obsidian background and no blur/glow blobs.
 */
export const EditorialPanel = ({
  children,
  className = '',
  highlight = false,
  onClick,
  ...props
}) => (
  <div
    onClick={onClick}
    className={`p-6 bg-[#0B0D12] border transition-colors ${
      highlight ? 'border-gorange/60 bg-[#0E1118]' : 'border-[#1E232F] hover:border-[#2B3242]'
    } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * EditorialMetric
 * Large numeric data display with monospace metadata. Replaces rounded KPI cards.
 */
export const EditorialMetric = ({
  label,
  value,
  detail,
  delta,
  deltaType = 'positive',
  className = ''
}) => (
  <div className={`p-5 bg-[#0B0D12] border border-[#1E232F] flex flex-col justify-between ${className}`}>
    <div className="font-mono text-[10px] text-[#6B7688] uppercase tracking-widest mb-3">
      {label}
    </div>
    <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight my-1">
      {value}
    </div>
    <div className="mt-3 pt-3 border-t border-[#1E232F]/80 flex items-center justify-between font-mono text-xs">
      <span className="text-[#8F9AA9] text-[11px]">{detail}</span>
      {delta && (
        <span className={deltaType === 'positive' ? 'text-gorange font-bold' : 'text-rose-400 font-bold'}>
          {delta}
        </span>
      )}
    </div>
  </div>
);

/**
 * EditorialRow
 * Data row with key-value alignment, subtle hover, and sharp hairline divider.
 */
export const EditorialRow = ({
  left,
  center,
  right,
  onClick,
  className = ''
}) => (
  <div
    onClick={onClick}
    className={`py-4 px-3 border-b border-[#1E232F] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
      onClick ? 'cursor-pointer hover:bg-[#10131A]' : ''
    } ${className}`}
  >
    <div className="flex items-center gap-3">
      {left}
    </div>
    {center && <div className="text-sm text-[#8F9AA9]">{center}</div>}
    <div className="flex items-center gap-4 font-mono text-xs">
      {right}
    </div>
  </div>
);

/**
 * EditorialButton
 * High-contrast, sharp control button (0-4px rounded). Replaces gradient-solar-btn.
 */
export const EditorialButton = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-bold transition-all select-none disabled:opacity-40 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gorange text-black hover:bg-[#FF6D24] shadow-md",
    white: "bg-white text-black hover:bg-gorange hover:text-black",
    secondary: "bg-[#141822] text-[#E4E7EC] border border-[#2B3242] hover:border-white hover:text-white",
    outline: "bg-transparent text-white border border-[#2B3242] hover:border-gorange hover:text-gorange",
    danger: "bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-900/60",
    ghost: "bg-transparent text-[#8F9AA9] hover:text-white hover:bg-[#121620]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px] gap-1.5",
    md: "px-5 py-2.5 text-xs gap-2",
    lg: "px-8 py-3.5 text-xs tracking-widest gap-2.5"
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin rounded-full" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5" />}
        </>
      )}
    </button>
  );
};

/**
 * EditorialProgress
 * Dual-tone precision horizontal progress bar without glow effects.
 */
export const EditorialProgress = ({
  current = 0,
  target = 100,
  label,
  showValues = true,
  height = 'h-1.5',
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((current / (target || 1)) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValues) && (
        <div className="flex justify-between items-center mb-1.5 font-mono text-[11px]">
          <span className="text-[#8F9AA9] uppercase tracking-wider">{label}</span>
          {showValues && (
            <span className="text-white font-bold">
              {current}% <span className="text-[#566173]">/ {target}%</span>
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#141822] overflow-hidden ${height} border border-[#1E232F]`}>
        <div
          className="h-full bg-gorange transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

/**
 * EditorialBadge
 * Monospace, crisp tag with sharp geometric outline.
 */
export const EditorialBadge = ({
  children,
  variant = 'default', // 'default' | 'orange' | 'green' | 'red' | 'neutral'
  className = ''
}) => {
  const variants = {
    default: "bg-[#10131A] text-[#8F9AA9] border-[#1E232F]",
    orange: "bg-gorange/10 text-gorange border-gorange/30 font-bold",
    green: "bg-emerald-950/30 text-emerald-300 border-emerald-800/40 font-bold",
    red: "bg-rose-950/30 text-rose-300 border-rose-800/40 font-bold",
    neutral: "bg-[#161B24] text-white border-[#2B3242]"
  };

  return (
    <span className={`inline-flex items-center font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

/**
 * EditorialDivider
 * Hairline divider with optional monospace center coordinate.
 */
export const EditorialDivider = ({ text, className = '' }) => (
  <div className={`relative flex items-center justify-center my-8 ${className}`}>
    <div className="w-full border-t border-[#1E232F]" />
    {text && (
      <span className="absolute px-3 bg-[#060709] font-mono text-[10px] uppercase tracking-widest text-[#566173]">
        {text}
      </span>
    )}
  </div>
);
