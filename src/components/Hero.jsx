import { useEffect, useRef, useState, Fragment, lazy, Suspense } from 'react';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  FolderGit2,
  Download,
  ChevronDown,
  MapPin,
  Globe as GlobeIcon,
  Zap,
  Lock,
  GraduationCap,
} from 'lucide-react';
import { personal, terminalLines, heroStats, education } from '../data/portfolio';
import ParticleField from './ParticleField';
import CountUp from './CountUp';

// The globe pulls in three.js + react-three-fiber — lazy-load it so it
// splits into its own chunk and never blocks the hero's first paint.
const GlobeScene = lazy(() => import('./three/GlobeScene'));

/* ---------- Hero stats bar --------------------------------------- */
function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8"
    >
      {heroStats.map((stat, i) => (
        <Fragment key={stat.label}>
          {i > 0 && <span className="hidden h-10 w-px bg-white/10 sm:block" />}
          <div>
            <div className="font-mono text-2xl font-bold text-accent text-glow sm:text-3xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</div>
          </div>
        </Fragment>
      ))}
    </motion.div>
  );
}

/* ---------- Blinking / pulsing terminal cursor ------------------- */
function Cursor({ done = false }) {
  return (
    <span
      className={`ml-0.5 inline-block h-[1.05em] w-[8px] translate-y-[2px] rounded-[1px] bg-terminal-green align-middle ${
        done ? 'animate-pulse-glow' : 'animate-blink'
      }`}
    />
  );
}

/* ---------- Animated terminal window ----------------------------- */
function TerminalWindow() {
  const [active, setActive] = useState(0);
  const allDone = active >= terminalLines.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card relative z-10 w-full max-w-2xl overflow-hidden shadow-glass-glow"
    >
      {/* Title bar with macOS-style buttons */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] bg-base-300/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <div className="ml-3 flex items-center gap-2 text-xs text-slate-500">
          <TerminalIcon size={13} />
          <span className="font-mono">anushad@devops: ~</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm md:px-6 md:py-7">
        {terminalLines.map((line, i) => {
          if (i > active) return null;
          const isActive = i === active;
          const isLast = i === terminalLines.length - 1;
          const showCursor = isActive || (allDone && isLast);

          return (
            <div key={i} className="flex items-start gap-2 break-words">
              <span
                className={`select-none ${
                  line.type === 'cmd' ? 'text-terminal-green' : 'text-accent'
                }`}
              >
                {line.prefix}
              </span>
              <span className="flex-1 whitespace-pre-wrap">
                {isActive ? (
                  <TypeAnimation
                    key={i}
                    sequence={[line.text, line.pause ?? 350, () => setActive((x) => x + 1)]}
                    speed={line.type === 'cmd' ? 60 : 78}
                    cursor={false}
                    wrapper="span"
                    className={line.textClass}
                  />
                ) : (
                  <span className={line.textClass}>{line.text}</span>
                )}
                {showCursor && <Cursor done={allDone && isLast} />}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ---------- WebGL support probe ----------------------------------- */
const hasWebGL = () =>
  typeof window !== 'undefined' && !!window.WebGLRenderingContext;

/* ---------- Static SVG fallback (no WebGL) ------------------------- */
function GlobeFallback() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="globe-fb" cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#16345c" />
          <stop offset="100%" stopColor="#0d1b2a" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="72" fill="url(#globe-fb)" stroke="rgba(0,212,255,0.35)" />
      {/* Longitude / latitude lines */}
      <ellipse cx="100" cy="100" rx="72" ry="26" fill="none" stroke="rgba(0,212,255,0.18)" />
      <ellipse cx="100" cy="100" rx="72" ry="52" fill="none" stroke="rgba(0,212,255,0.12)" />
      <ellipse cx="100" cy="100" rx="26" ry="72" fill="none" stroke="rgba(0,212,255,0.18)" />
      <ellipse cx="100" cy="100" rx="52" ry="72" fill="none" stroke="rgba(0,212,255,0.12)" />
      <line x1="28" y1="100" x2="172" y2="100" stroke="rgba(0,212,255,0.18)" />
      {/* Region dots */}
      <circle cx="128" cy="112" r="3.5" fill="#22c55e" />
      <circle cx="142" cy="78" r="3" fill="#00d4ff" />
      <circle cx="66" cy="72" r="3" fill="#f59e0b" />
      <circle cx="96" cy="58" r="3" fill="#7c3aed" />
      <circle cx="72" cy="132" r="3" fill="#00d4ff" />
    </svg>
  );
}

/* ---------- Pulsing loader shown while the three.js chunk loads ---- */
function GlobeLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full border border-accent/30 bg-accent/10 blur-sm" />
    </div>
  );
}

/* ---------- Hero right column — cinematic 3D deployment globe ------ */
function GlobeShowcase() {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const webgl = hasWebGL();

  // Only mount the WebGL canvas once the hero is actually on screen.
  useEffect(() => {
    if (!webgl || !containerRef.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShouldLoad(true);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [webgl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Globe container */}
      <div
        ref={containerRef}
        className="relative h-[260px] w-full overflow-hidden rounded-[20px] sm:h-[300px] lg:h-[420px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      >
        {webgl ? (
          shouldLoad && (
            <Suspense fallback={<GlobeLoader />}>
              <GlobeScene className="h-full w-full" />
            </Suspense>
          )
        ) : (
          <GlobeFallback />
        )}
      </div>

      {/* Caption — mini-stats row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <GlobeIcon size={13} className="text-accent" /> 12 Cloud Regions
        </span>
        <span className="text-slate-700">·</span>
        <span className="flex items-center gap-1.5">
          <Zap size={13} className="text-terminal-green" /> 99.9% Uptime
        </span>
        <span className="text-slate-700">·</span>
        <span className="flex items-center gap-1.5">
          <Lock size={13} className="text-brand-purple-soft" /> Zero Downtime Deploy
        </span>
      </div>
    </motion.div>
  );
}

/* ---------- Hero ------------------------------------------------- */
export default function Hero() {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-1/3 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute right-1/4 top-2/3 h-[360px] w-[360px] rounded-full bg-brand-purple/10 blur-[120px]" />

      {/* Drifting particle field */}
      <ParticleField count={60} />

      {/* Foreground content — 55 / 45 split on desktop */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[11fr_9fr]">
        {/* ---- Left column ---- */}
        <div className="flex flex-col items-start text-left">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
              </span>
              Available for DevOps opportunities
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to="education"
                smooth
                duration={500}
                offset={-72}
                className="glass group inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand-purple/40 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:shadow-glow"
              >
                <GraduationCap size={14} className="text-accent transition-transform group-hover:scale-110" />
                <span>
                  <strong className="font-semibold text-white">BSc in Computer Science</strong>
                  <span className="mx-1 text-slate-500">·</span>
                  <span className="text-slate-300">Univ. of Colombo (UCSC)</span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Name + gradient title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-[56px]"
          >
            {personal.name}
            <span className="text-gradient mt-1 block">{personal.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-xl text-base text-slate-400 sm:text-lg"
          >
            Bridging development and operations — one automated pipeline at a time.
          </motion.p>

          <div className="mt-8 w-full">
            <TerminalWindow />
          </div>

          {/* Location + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-2 text-sm text-slate-400"
          >
            <MapPin size={15} className="text-accent" />
            {personal.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row"
          >
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-72}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-accent bg-transparent px-6 py-3 font-semibold text-accent transition-all duration-300 hover:bg-accent/10 hover:shadow-glow-md sm:w-auto"
            >
              <FolderGit2 size={18} className="transition-transform group-hover:scale-110" />
              View My Projects
            </Link>

            <a
              href={personal.cv}
              download
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-[#020817] shadow-glow transition-all duration-300 hover:bg-accent-soft hover:shadow-glow-lg sm:w-auto"
            >
              <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
          </motion.div>

          {/* Animated stats bar */}
          <HeroStats />
        </div>

        {/* ---- Right column — cinematic 3D deployment globe ---- */}
        <div className="flex justify-center">
          <GlobeShowcase />
        </div>
      </div>

      {/* Scroll cue — fades out once the user scrolls past 100px */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolledPast ? 0 : 1 }}
        transition={{ duration: 0.4, delay: scrolledPast ? 0 : 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={500} offset={-72} className="cursor-pointer">
          <ChevronDown size={26} className="animate-bounce text-accent/70" />
        </Link>
      </motion.div>
    </section>
  );
}
