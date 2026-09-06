import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Dynamic Background Component
 * Creates animated gradient orbs that respond to mouse movement
 */
export const DynamicBackground = ({ 
  children, 
  orbs = 3, 
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      {/* Animated Gradient Orbs */}
      {[...Array(orbs)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none opacity-30"
          style={{
            width: Math.random() * 400 + 200 + 'px',
            height: Math.random() * 400 + 200 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? 'hsl(270, 100%, 60%)' : 
              i % 3 === 1 ? 'hsl(200, 100%, 60%)' : 
              'hsl(300, 100%, 60%)'
            }, transparent 70%)`,
            filter: 'blur(50px)',
            transform: `translate3d(${mouseX.current / 50 - 200 + i * 100}px, ${mouseY.current / 50 - 100 + i * 50}px, 0)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      
      {children}
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