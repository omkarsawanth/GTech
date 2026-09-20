/**
 * cyberConfetti.js — High-performance canvas-based celebration particle burst
 * Colors strictly match the Kalpa Solar Flare palette (orange, coral, amber, violet, cyan).
 */

export const triggerCyberConfetti = ({
  particleCount = 55,
  origin = { x: 0.5, y: 0.5 },
  spread = 70,
  speed = 10,
} = {}) => {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    '#FF5500', // gorange
    '#FF3366', // solar-coral
    '#FF8A00', // solar-amber
    '#8B5CF6', // solar-violet
    '#06B6D4', // solar-cyan
    '#F59E0B', // solar-gold
  ];

  const particles = [];
  const startX = origin.x * width;
  const startY = origin.y * height;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI / 180) * (-90 + (Math.random() - 0.5) * spread * 2);
    const velocity = (Math.random() * 0.6 + 0.7) * speed;
    const size = Math.random() * 6 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.4 ? 'rect' : 'diamond';

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      gravity: 0.32,
      drag: 0.965,
      size,
      color,
      shape,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      decay: Math.random() * 0.015 + 0.012,
    });
  }

  let animationFrameId;

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.opacity <= 0) continue;

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, p.opacity - p.decay);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        // Diamond
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, 0);
        ctx.lineTo(0, p.size / 2);
        ctx.lineTo(-p.size / 2, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
      activeCount++;
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  };

  animationFrameId = requestAnimationFrame(render);
};
