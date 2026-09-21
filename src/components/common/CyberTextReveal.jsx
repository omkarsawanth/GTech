import React from 'react';
import { motion } from 'framer-motion';

/**
 * CyberTextReveal — Kinetic typography stagger reveal powered by Framer Motion
 * Slices text into animated spans with 3D translation, opacity, and spring/easeOutExpo easing.
 */
export const CyberTextReveal = ({
  text = '',
  delay = 150,
  duration = 850,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-transparent bg-clip-text bg-gradient-to-r from-gorange via-solar-coral to-solar-amber',
}) => {
  const words = text ? text.split(' ') : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay / 1000,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotateX: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: duration / 1000,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ perspective: '600px' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHighlighted = highlightWords.some(hw => hw.toLowerCase() === clean);

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className={`cyber-reveal-word inline-block will-change-transform mr-[0.25em] ${
              isHighlighted ? highlightClassName : ''
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export default CyberTextReveal;
