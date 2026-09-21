import React, { useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { cyberAudio } from '../../utils/cyberAudio';

/**
 * ParticleButton — KokonutUI & Refero inspired interactive particle button
 * Powered by Framer Motion (spring physics & kinetic sparkles).
 */
export const ParticleButton = ({
  children,
  onClick,
  variant = 'solar', // 'solar' | 'outline' | 'glass' | 'white'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  className = '',
  sparkles = true,
  disabled = false,
  ...props
}) => {
  const containerRef = useRef(null);

  const spawnParticles = (e) => {
    if (!sparkles || disabled) return;
    const btn = containerRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

    const particleCount = 16;
    const colors = ['#FF5500', '#FF3366', '#FF8A00', '#8B5CF6', '#06B6D4'];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.className = 'absolute pointer-events-none rounded-full z-50';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 8px ${color}`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      btn.appendChild(p);

      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
      const dist = Math.random() * 45 + 25;
      const destX = Math.cos(angle) * dist;
      const destY = Math.sin(angle) * dist;

      animate(
        p,
        {
          x: destX,
          y: destY,
          opacity: [1, 0],
          scale: [1, 0.2],
        },
        {
          duration: (Math.random() * 400 + 350) / 1000,
          ease: [0.16, 1, 0.3, 1],
          onComplete: () => {
            if (p.parentNode) p.parentNode.removeChild(p);
          },
        }
      );
    }
  };

  const handleClick = (e) => {
    if (disabled) return;
    cyberAudio.playClick();
    spawnParticles(e);
    if (onClick) onClick(e);
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    cyberAudio.playHover();
  };

  const variantStyles = {
    solar: 'bg-gradient-to-r from-gorange via-solar-coral to-solar-amber text-white border border-white/20 shadow-lg shadow-gorange/25 hover:shadow-gorange/50',
    outline: 'bg-[#0B0D12] text-gorange border border-gorange/50 hover:border-gorange hover:bg-gorange/10 shadow-md shadow-black/60',
    glass: 'bg-[#0E121B]/90 backdrop-blur-md text-[#E4E7EC] border border-[#1E232F] hover:border-gorange/60 hover:text-white',
    white: 'bg-white text-gray-950 font-bold border border-white hover:bg-[#F3F4F6] shadow-xl shadow-black/60 hover:shadow-gorange/20',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono tracking-wider',
    md: 'px-4 py-2.5 text-xs font-mono font-bold tracking-wider',
    lg: 'px-6 py-3.5 text-sm font-display font-bold tracking-wide',
  };

  return (
    <motion.button
      ref={containerRef}
      whileHover={!disabled ? { scale: 1.025, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      data-interactive="true"
      className={`relative overflow-hidden cursor-pointer uppercase transition-colors flex items-center justify-center gap-2 group ${variantStyles[variant] || variantStyles.solar} ${sizeStyles[size] || sizeStyles.md} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {/* Dynamic Specular Shimmer Beam */}
      <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {Icon && iconPosition === 'left' && (
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
      )}

      <span className="relative z-10">{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
    </motion.button>
  );
};

export default ParticleButton;
