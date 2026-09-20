import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * AnimeCounter — Precision numeric counter powered by Anime.js
 * Interpolates smoothly from previous value to target value with exponential easing.
 */
export const AnimeCounter = ({
  value = 0,
  duration = 1200,
  prefix = '',
  suffix = '',
  padZero = false,
  className = '',
}) => {
  const nodeRef = useRef(null);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const targetNode = nodeRef.current;
    if (!targetNode) return;

    const startVal = prevValueRef.current;
    const targetVal = Number(value) || 0;
    const counterObj = { val: startVal };

    const anim = animate(counterObj, {
      val: targetVal,
      duration: duration,
      ease: 'outExpo',
      onUpdate: () => {
        if (!targetNode) return;
        const rounded = Math.round(counterObj.val);
        const formatted = padZero && rounded < 10 && rounded >= 0 ? `0${rounded}` : rounded;
        targetNode.textContent = `${prefix}${formatted}${suffix}`;
      },
      onComplete: () => {
        prevValueRef.current = targetVal;
      }
    });

    return () => {
      if (anim && anim.pause) anim.pause();
    };
  }, [value, duration, prefix, suffix, padZero]);

  const initialRounded = Math.round(Number(value) || 0);
  const initialText = padZero && initialRounded < 10 && initialRounded >= 0 ? `0${initialRounded}` : initialRounded;

  return (
    <span ref={nodeRef} className={`tabular-nums ${className}`}>
      {prefix}{initialText}{suffix}
    </span>
  );
};

export default AnimeCounter;
