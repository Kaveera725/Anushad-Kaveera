import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  FolderGit2,
  Download,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { personal, terminalLines, heroStats } from '../data/portfolio';
import ParticleField from './ParticleField';
import CountUp from './CountUp';

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

/* ---------- Glowing profile ring --------------------------------- */
function ProfileRing() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Hexagonal grid backdrop */}
      <div className="hex-bg absolute -inset-24" aria-hidden="true" />

      {/* Ambient glow behind the circle */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/15 blur-[80px]" aria-hidden="true" />

      <div className="relative h-64 w-64 sm:h-72 sm:w-72">
        {/* Outer dashed ring — one full rotation every 20s */}
        <div className="absolute -inset-6 animate-spin-slower rounded-full border-2 border-dashed border-accent/40" />

        {/* Inner solid glowing ring + photo */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[3px] border-accent bg-base-200 shadow-glow-lg">
          {/* Initials fallback sits behind the photo */}
          <span className="absolute font-display text-6xl font-bold text-accent/60">AK</span>
          <img
            src="/my_profile.jpeg"
            alt={personal.name}
            className="relative h-full w-full rounded-full object-cover"
          />
        </div>

        {/* Online badge */}
        <span className="glass absolute -bottom-1 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs text-terminal-green shadow-glow-green">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
          </span>
          online
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

      {/* Foreground content — 60 / 40 split on desktop */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[3fr_2fr]">
        {/* ---- Left column ---- */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
            </span>
            Available for DevOps opportunities
          </motion.div>

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

        {/* ---- Right column — glowing profile ring ---- */}
        <div className="hidden justify-center lg:flex">
          <ProfileRing />
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
