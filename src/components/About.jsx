import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Cloud, GitBranch } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { about, personal } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

/* Counts up to `to` once scrolled into view. */
function CountUp({ to, suffix = '', duration = 1500 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const progress = Math.min((t - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const statIcons = [Cpu, GitBranch, Cloud];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="01"
        command="cat about.md"
        title="About Me"
        subtitle="Bridging development and operations — one automated pipeline at a time."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* Avatar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-accent/20 blur-2xl" />
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-2 border-accent/40 bg-base-200 shadow-glow-lg">
              <div className="absolute inset-3 rounded-full border border-dashed border-accent/20 animate-spin-slow" />
              <span className="font-mono text-7xl font-bold text-accent text-glow">AK</span>
            </div>
            {/* Orbiting status dot */}
            <span className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-terminal-green/40 bg-base px-3 py-1 font-mono text-xs text-terminal-green shadow-glow-green">
              <span className="h-2 w-2 rounded-full bg-terminal-green" />
              online
            </span>
          </div>
        </motion.div>

        {/* Bio + stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="mb-5 text-base leading-relaxed text-slate-300 md:text-lg"
            >
              {p}
            </motion.p>
          ))}

          <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
            {['Cloud Infrastructure', 'Automation', 'Reliability Engineering'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Quick-stat cards */}
          <motion.div
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {about.stats.map((stat, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="card group p-5 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
                >
                  <Icon
                    size={20}
                    className="mb-3 text-accent/70 transition-colors group-hover:text-accent"
                  />
                  <div className="font-mono text-3xl font-bold text-slate-50 group-hover:text-glow">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
