import { useEffect, useRef } from 'react';

/**
 * Subtle canvas particle field: tiny cyan dots drifting slowly upward that
 * gently repel from the cursor. Sits behind the hero terminal (pointer-events
 * are disabled so it never steals clicks). Honours prefers-reduced-motion.
 */
export default function ParticleField({ count = 50 }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles = [];
    let raf;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(Math.random() * 0.32 + 0.12),
        alpha: Math.random() * 0.08 + 0.1, // ~0.10–0.18
      }));

    const REPEL = 90;

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        // Repel from cursor
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < REPEL * REPEL) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (REPEL - dist) / REPEL;
          p.x += (dx / dist) * force * 2.4;
          p.y += (dy / dist) * force * 2.4;
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    const onResize = () => {
      resize();
      particles = seed();
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    particles = seed();
    step();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
