import React, { useEffect, useRef, useState } from 'react';

/**
 * CyberCursor — Precision cyber reticle with magnetic inertia follower ring.
 * Inspired by interactive creative agency sites and calibrated for Kalpa's Solar Flare aesthetic.
 * Automatically disabled on touch screens and outside the viewport.
 */
export const CyberCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Position state tracking using refs for zero React re-render overhead during motion
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-interactive="true"]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Inertia physics loop for the trailing ring
    const loop = () => {
      // Lerp ring towards mouse target
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gorange rounded-full shadow-[0_0_8px_#FF5500] will-change-transform"
      />

      {/* Outer Magnetic Inertia Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out will-change-transform flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 border-solar-coral/80 bg-solar-coral/10 shadow-[0_0_20px_rgba(255,51,102,0.4)] scale-110'
            : isClicking
            ? 'w-6 h-6 border-gorange bg-gorange/25 scale-90'
            : 'w-8 h-8 border-gorange/40 bg-transparent'
        }`}
      >
        {/* Subtle crosshair notches when hovering */}
        {isHovered && (
          <>
            <div className="absolute top-0 w-1 h-1 bg-solar-coral rounded-full shadow-[0_0_4px_#FF3366]" />
            <div className="absolute bottom-0 w-1 h-1 bg-solar-coral rounded-full shadow-[0_0_4px_#FF3366]" />
            <div className="absolute left-0 w-1 h-1 bg-solar-coral rounded-full shadow-[0_0_4px_#FF3366]" />
            <div className="absolute right-0 w-1 h-1 bg-solar-coral rounded-full shadow-[0_0_4px_#FF3366]" />
          </>
        )}
      </div>
    </div>
  );
};
