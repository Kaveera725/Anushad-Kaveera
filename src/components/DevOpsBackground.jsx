import { useEffect, useRef } from 'react';

/**
 * Site-wide animated DevOps "code rain" background.
 *
 * A lightweight, canvas-based Matrix-style rain built from terminal /
 * DevOps glyphs (braces, pipes, git & shell symbols, 0/1, kubectl-ish
 * letters). Sits behind all content as a fixed, non-interactive layer.
 *
 * Performance & a11y:
 *  - Honours `prefers-reduced-motion` (renders nothing / no animation).
 *  - Pauses the rAF loop when the tab is hidden.
 *  - Larger glyphs → fewer columns on small screens.
 *  - Caps the device-pixel-ratio at 2 to avoid huge canvases on retina.
 */
export default function DevOpsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Terminal / DevOps flavoured charset — symbols you'd see in a shell,
    // a Dockerfile, a k8s manifest, or a git log.
    const glyphs =
      '01{}[]()<>$#~/\\|;:=+-*&%!?_kubectldockerterraformgitnpxyamlssh⎈→λ'.split('');

    const BASE = '#020817'; // page background — used to paint the fade trail
    const DIM = 'rgba(0, 212, 255, 0.55)'; // cyan accent, dim
    const LEAD = '#22c55e'; // terminal-green leading glyph

    let width = 0;
    let height = 0;
    let fontSize = 16;
    let columns = 0;
    let drops = [];
    let dpr = 1;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      // Bigger glyphs on phones → fewer columns → cheaper to draw.
      fontSize = width < 640 ? 20 : 15;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / fontSize);
      // Stagger each column's starting row so the rain doesn't fall in a line.
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / fontSize)
      );

      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, width, height);
    };

    const draw = () => {
      // Translucent overwrite leaves fading trails behind each glyph.
      ctx.fillStyle = 'rgba(2, 8, 23, 0.10)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading glyph glows green; the trail is dim cyan.
        ctx.fillStyle = Math.random() > 0.94 ? LEAD : DIM;
        ctx.fillText(char, x, y);

        // Reset the column to the top once it falls off-screen (with jitter).
        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.floor((Math.random() * -20) - 1);
        }
        drops[i]++;
      }
    };

    let rafId = 0;
    let last = 0;
    const STEP = 70; // ms between frames → a calm, readable rain (~14fps)

    const loop = (t) => {
      rafId = requestAnimationFrame(loop);
      if (t - last < STEP) return;
      last = t;
      draw();
    };

    const start = () => {
      if (!rafId) {
        last = 0;
        rafId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // Debounced resize so rapid drags don't thrash the canvas.
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 150);
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    setup();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.22]"
    />
  );
}
