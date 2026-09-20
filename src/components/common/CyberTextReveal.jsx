import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * CyberTextReveal — Kinetic typography stagger reveal powered by Anime.js
 * Slices text into animated spans with 3D translation, opacity, and spring-like easing.
 */
export const CyberTextReveal = ({
  text = '',
  delay = 150,
  duration = 850,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-gorange via-solar-coral to-solar-amber',
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = root.querySelectorAll('.cyber-reveal-word');
    if (!words.length) return;

    const anim = animate(words, {
      translateY: [24, 0],
      opacity: [0, 1],
      rotateX: [35, 0],
      duration: duration,
      delay: stagger(45, { start: delay }),
      ease: 'outExpo',
    });

    return () => {
      if (anim && anim.pause) anim.pause();
    };
  }, [text, delay, duration]);

  const words = text.split(' ');

  return (
    <span ref={rootRef} className={`inline-block ${className}`} style={{ perspective: '600px' }}>
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHighlighted = highlightWords.some(hw => hw.toLowerCase() === clean);

        return (
          <span
            key={i}
            className={`cyber-reveal-word inline-block will-change-transform mr-[0.25em] ${
              isHighlighted ? highlightClassName : ''
            }`}
            style={{ opacity: 0, transform: 'translateY(24px) rotateX(35deg)' }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default CyberTextReveal;
