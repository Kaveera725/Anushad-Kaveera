import { useState } from 'react';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import {
  Container,
  LifeBuoy,
  Cloud,
  Github,
  Workflow,
  Server,
  Terminal as TerminalIcon,
  FolderGit2,
  Download,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { personal, terminalLines } from '../data/portfolio';

/* ---------- Orbiting background tech icons ----------------------- */
const orbiters = [
  { Icon: Container, color: '#00d4ff', radius: 150, duration: 26, reverse: false, label: 'Docker' },
  { Icon: LifeBuoy, color: '#7c3aed', radius: 215, duration: 34, reverse: true, label: 'Kubernetes' },
  { Icon: Cloud, color: '#f59e0b', radius: 285, duration: 42, reverse: false, label: 'AWS' },
  { Icon: Github, color: '#e2e8f0', radius: 180, duration: 30, reverse: true, label: 'GitHub' },
  { Icon: Workflow, color: '#22c55e', radius: 250, duration: 38, reverse: false, label: 'CI/CD' },
  { Icon: Server, color: '#38e0ff', radius: 320, duration: 48, reverse: true, label: 'Linux' },
];

function OrbitField() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
      <div className="relative h-0 w-0">
        {orbiters.map(({ Icon, color, radius, duration, reverse, label }) => (
          <div
            key={label}
            className={`orbit-item ${reverse ? 'reverse' : ''}`}
            style={{ '--orbit-radius': `${radius}px`, animationDuration: `${duration}s` }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-base-200/70 backdrop-blur-sm"
              style={{ boxShadow: `0 0 22px ${color}33` }}
              title={label}
            >
              <Icon size={22} style={{ color }} className="animate-float" />
            </div>
          </div>
        ))}
      </div>
    </div>
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-base-200/80 shadow-glow-lg backdrop-blur-md"
    >
      {/* Title bar with macOS-style buttons */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-base-300/80 px-4 py-3">
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

/* ---------- Hero ------------------------------------------------- */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-20 pt-28 sm:px-8"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute right-1/4 top-2/3 h-[360px] w-[360px] rounded-full bg-brand-purple/10 blur-[120px]" />

      <OrbitField />

      {/* Foreground content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* SEO / a11y heading (visually represented by the terminal below) */}
        <h1 className="sr-only">
          {personal.name} — {personal.title}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
          </span>
          Available for DevOps opportunities
        </motion.div>

        <TerminalWindow />

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
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
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
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-base shadow-glow transition-all duration-300 hover:bg-accent-soft hover:shadow-glow-lg sm:w-auto"
          >
            <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={500} offset={-72} className="cursor-pointer">
          <ChevronDown size={26} className="animate-bounce text-accent/70" />
        </Link>
      </motion.div>
    </section>
  );
}
