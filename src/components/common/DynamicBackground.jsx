import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Dynamic Background Component
 * Creates animated gradient orbs that respond to mouse movement
 */
export const DynamicBackground = ({ 
  children, 
  orbs = 4, 
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: (e.clientX / window.innerWidth - 0.5) * 40, y: (e.clientY / window.innerHeight - 0.5) * 40 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Dynamic Solar Flare / Sunset Cyber Mesh Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary Sunset Coral Glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25"
          style={{
            top: '5%',
            right: '10%',
            background: 'radial-gradient(circle, #FF3366 0%, #FF8A00 50%, transparent 70%)',
          }}
          animate={{
            x: [coords.x * -1.2, coords.x * -1.2 + 25, coords.x * -1.2],
            y: [coords.y * -1.2, coords.y * -1.2 - 20, coords.y * -1.2],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary Ultra Violet Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
          style={{
            top: '40%',
            left: '-5%',
            background: 'radial-gradient(circle, #8B5CF6 0%, #C026D3 50%, transparent 70%)',
          }}
          animate={{
            x: [coords.x * 1.5, coords.x * 1.5 - 30, coords.x * 1.5],
            y: [coords.y * 1.5, coords.y * 1.5 + 25, coords.y * 1.5],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Warm Solar Amber Center Flare */}
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full blur-[90px] opacity-20"
          style={{
            bottom: '10%',
            right: '25%',
            background: 'radial-gradient(circle, #FF8A00 0%, #FF3366 60%, transparent 75%)',
          }}
          animate={{
            scale: [0.95, 1.1, 0.95],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cyber Neon Accent Ray */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#FF336618,transparent)] pointer-events-none" 
        />
      </div>
      
      {/* Cyber Hex / Dot Matrix Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 pointer-events-none z-0" 
      />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

/**
 * Interactive Button with 3D Hover Effect
 */
export const InteractiveButton = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  ...props 
}) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    setRotateX(y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg",
    secondary: "bg-slate-800/90 text-slate-100 border border-slate-700",
  };

  return (
    <button
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform-gpu ${variants[variant]} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Animated Counter Component
 */
export const AnimatedCounter = ({ 
  value, 
  duration = 2, 
  prefix = '',
  suffix = '',
  className = '',
  format = 'integer'
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      
      const start = 0;
      const end = typeof value === 'number' ? value : parseInt(value) || 0;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easedProgress);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [value, duration]);

  const formatValue = (val) => {
    if (format === 'comma') {
      return val.toString().replace(/\B(?=\d{3}(?!\d))/g, ',');
    }
    return val;
  };

  return (
    <span className={className}>
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
};