import React, { useEffect, useRef } from 'react';

/**
 * CyberParticles — Kinetic ambient Solar Flare embers & data glyphs.
 * Runs on an isolated high-performance canvas with zero React re-render overhead.
 */
export const CyberParticles = ({
  density = 28,
  speed = 0.5,
  className = 'absolute inset-0 pointer-events-none z-0',
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Solar palette colors
    const colors = [
      'rgba(255, 85, 0, ',   // gorange
      'rgba(255, 51, 102, ',  // solar-coral
      'rgba(255, 138, 0, ',  // solar-amber
      'rgba(139, 92, 246, ', // solar-violet
    ];

    const runes = ['✦', '⚡', '01', 'λ', '⌬', '◈', '◆', '⬡', '+'];

    // Initialize particles
    const particles = Array.from({ length: density }, () => {
      const isRune = Math.random() > 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isRune ? Math.random() * 8 + 8 : Math.random() * 2.5 + 1.2,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.4 * speed,
        speedY: -(Math.random() * 0.5 + 0.25) * speed,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI,
        isRune,
        rune: runes[Math.floor(Math.random() * runes.length)],
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle pulsing brightness
        p.pulseVal += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.12;

        // Mouse proximity gentle repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Wrap edges smoothly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw particle
        ctx.save();
        if (p.isRune) {
          ctx.font = `${p.size}px monospace`;
          ctx.fillStyle = `${p.colorBase}${Math.max(0, p.alpha * 0.8)})`;
          ctx.shadowColor = `${p.colorBase}0.8)`;
          ctx.shadowBlur = 6;
          ctx.fillText(p.rune, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorBase}${Math.max(0, p.alpha)})`;
          ctx.shadowColor = `${p.colorBase}0.9)`;
          ctx.shadowBlur = p.size * 3;
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

  return <canvas ref={canvasRef} className={className} />;
};
