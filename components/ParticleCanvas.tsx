'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let scrollY = 0;
    let hidden = false;

    const particles: Particle[] = [];
    const COUNT = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 0.8 + Math.random() * 0.7,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxOffset = scrollY * 0.2;

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y + parallaxOffset, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.07)';
        ctx.fill();
      });
    };

    const update = () => {
      if (!prefersReduced) {
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += canvas.width;
          if (p.x > canvas.width) p.x -= canvas.width;
          if (p.y < 0) p.y += canvas.height;
          if (p.y > canvas.height) p.y -= canvas.height;
        });
      }
      draw();
    };

    const loop = () => {
      if (!hidden) update();
      rafId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onVisibility = () => {
      hidden = document.hidden;
    };

    resize();
    init();

    if (prefersReduced) {
      draw();
    } else {
      loop();
    }

    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
