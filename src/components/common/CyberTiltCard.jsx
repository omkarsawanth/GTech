import React, { useRef, useState } from 'react';
import { cyberAudio } from '../../utils/cyberAudio';

/**
 * CyberTiltCard — High-end 3D perspective card with dynamic specular glare
 * and cyber HUD corner markers. Matches Solar Flare aesthetic.
 */
export const CyberTiltCard = ({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
  corners = false,
  borderBeam = false,
  soundOnHover = false,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    }
  };

  const handleMouseEnter = () => {
    if (soundOnHover) {
      cyberAudio.playHover();
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Specular Glare Sheen */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 85, 0, 0.22), rgba(255, 51, 102, 0.12), transparent 75%)`,
          }}
        />
      )}

      {/* Cyber Corner HUD Reticles */}
      {corners && (
        <>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-gorange pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-gorange pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-gorange pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-gorange pointer-events-none z-20" />
        </>
      )}

      {/* Optional Neon Border Beam */}
      {borderBeam && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-gorange/40 via-solar-coral/30 to-solar-violet/40 rounded-none pointer-events-none opacity-50 z-0" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
