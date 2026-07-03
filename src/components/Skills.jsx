import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Server,
  SquareTerminal,
  FileSearch,
  Globe,
  Network,
  Code,
  Lock,
  Cloud,
  Layers,
  Boxes,
  Container,
  Hexagon,
  Workflow,
  GitBranch,
  Cog,
  CloudCog,
  Activity,
  Flame,
  LineChart,
  Database,
  Leaf,
  ShieldCheck,
  Scale,
  Share2,
  Github,
  Code2,
  Braces,
  FileCode2,
  FileCode,
  Coffee,
  Binary,
  Cpu,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skillCategories } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

// 3D pipeline graph pulls in three.js — lazy + IntersectionObserver gated
// so it only loads once the user scrolls near it.
const NetworkGraph3D = lazy(() => import('./three/NetworkGraph3D'));

/* ---------- Live DevOps pipeline — 3D network graph --------------- */
function PipelineGraph() {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const webgl = typeof window !== 'undefined' && !!window.WebGLRenderingContext;

  useEffect(() => {
    if (!webgl || !ref.current) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [webgl]);

  if (!webgl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className="mt-14"
    >
      <p className="font-mono text-sm text-accent">
        <span className="text-terminal-green">$</span> docker ps --all
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-slate-100">
        Live DevOps Pipeline
      </h3>

      <div
        ref={ref}
        className="card mt-6 h-[320px] w-full overflow-hidden border-accent/20 hover:border-accent/40"
      >
        {shouldLoad && (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-24 w-24 animate-pulse rounded-full border border-accent/30 bg-accent/10 blur-sm" />
              </div>
            }
          >
            <NetworkGraph3D className="h-full w-full" />
          </Suspense>
        )}
      </div>
    </motion.div>
  );
}

// String keys from data → lucide components.
const iconMap = {
  Terminal,
  Server,
  SquareTerminal,
  FileSearch,
  Globe,
  Network,
  Code,
  Lock,
  Cloud,
  Layers,
  Boxes,
  Container,
  Hexagon,
  Workflow,
  GitBranch,
  Cog,
  CloudCog,
  Activity,
  Flame,
  LineChart,
  Database,
  Leaf,
  ShieldCheck,
  Scale,
  Share2,
  Github,
  Code2,
  Braces,
  FileCode2,
  FileCode,
  Coffee,
  Binary,
};

const Icon = ({ name, ...props }) => {
  const Cmp = iconMap[name] || Cpu;
  return <Cmp {...props} />;
};

const accentStyles = {
  cyan: {
    ring: 'hover:border-accent/50 hover:shadow-glass-glow',
    iconWrap: 'border-accent/30 bg-accent/10 text-accent',
    dot: 'text-accent',
  },
  purple: {
    ring: 'hover:border-brand-purple/50 hover:shadow-glow-purple',
    iconWrap: 'border-brand-purple/30 bg-brand-purple/10 text-brand-purple-soft',
    dot: 'text-brand-purple-soft',
  },
};

// Presentational proficiency per category → hover progress bar width.
// Expert = 90%, Proficient = 75%.
const EXPERT = new Set([
  'Linux & Scripting',
  'Web Servers',
  'Containers',
  'CI / CD',
  'Version Control',
]);
const proficiencyOf = (name) => (EXPERT.has(name) ? 90 : 75);

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-y border-white/5 bg-base-100/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          command="ls -la ~/skills"
          title="Tech Stack & Skills"
          subtitle="The tools I reach for to build, ship, observe, and secure systems."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat) => {
            const styles = accentStyles[cat.accent] || accentStyles.cyan;
            return (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                className={`card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 ${styles.ring}`}
              >
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`glass flex h-10 w-10 items-center justify-center rounded-lg border ${styles.iconWrap} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon name={cat.icon} size={20} />
                  </span>
                  <h3 className="font-display font-semibold text-slate-100">{cat.name}</h3>
                </div>

                {/* Skill badges */}
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs text-slate-300 transition-colors duration-200 hover:bg-[rgba(0,212,255,0.2)] hover:text-slate-50"
                    >
                      <Icon name={item.icon} size={13} className={styles.dot} />
                      {item.name}
                    </li>
                  ))}
                </ul>

                {/* Proficiency bar — draws in along the bottom on hover */}
                <div className="absolute inset-x-0 bottom-0 h-[3px]">
                  <div
                    className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-brand-purple shadow-glow transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ width: `${proficiencyOf(cat.name)}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Live 3D CI/CD pipeline network */}
        <PipelineGraph />
      </div>
    </section>
  );
}
