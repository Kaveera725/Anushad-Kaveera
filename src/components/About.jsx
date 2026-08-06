import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Rocket, FolderGit2, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import CountUp from './CountUp';
import { about, personal, experience, education } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

const job = experience[0];
const uni = education[0];

/* Shared bento cell shell */
function Cell({ className = '', children }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glass-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const [deployStat, projectStat, certStat] = about.stats;

  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="01"
        command="cat about.md"
        title="About Me"
        subtitle="Bridging development and operations — one automated pipeline at a time."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-4 md:grid-cols-12"
      >
        {/* Cell 1 — bio (8 cols) */}
        <Cell className="md:col-span-8">
          <p className="mb-4 font-mono text-xs text-accent">
            <span className="text-terminal-green">$</span> whoami --verbose
          </p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-base leading-relaxed text-slate-300 last:mb-0">
              {p}
            </p>
          ))}
          <div className="mt-5 flex flex-wrap gap-2">
            {['Cloud Infrastructure', 'Automation', 'Reliability Engineering'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </Cell>

        {/* Cell 2 — avatar (4 cols) */}
        <Cell className="flex items-center justify-center md:col-span-4">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-accent/20 blur-2xl" />
            <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-accent/40 shadow-glow-lg">
              <div className="absolute inset-2 z-10 animate-spin-slow rounded-full border border-dashed border-accent/25 pointer-events-none" />
              <img
                src="/my_profile.jpeg"
                alt={personal.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="glass absolute bottom-1 right-1 flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs text-terminal-green shadow-glow-green">
              <span className="h-2 w-2 rounded-full bg-terminal-green" />
              online
            </span>
          </div>
        </Cell>

        {/* Cell 3 — location (4 cols) */}
        <Cell className="md:col-span-4">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
            <MapPin size={19} />
          </span>
          <div className="text-xs uppercase tracking-wider text-slate-500">Location</div>
          <div className="mt-1 font-display font-semibold text-slate-100">{personal.location}</div>
          <div className="mt-1 font-mono text-xs text-slate-500">UTC+5:30 · IST</div>
        </Cell>

        {/* Cell 4 — currently at (4 cols) */}
        <Cell className="md:col-span-4">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-terminal-green/30 bg-terminal-green/10 text-terminal-green">
            <Briefcase size={19} />
          </span>
          <div className="text-xs uppercase tracking-wider text-slate-500">Currently at</div>
          <div className="mt-1 font-display font-semibold text-slate-100">{job.company}</div>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
            </span>
            {job.role}
          </div>
        </Cell>

        {/* Cell 5 — education (4 cols) */}
        <Cell className="md:col-span-4">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-purple/30 bg-brand-purple/10 text-brand-purple-soft">
            <GraduationCap size={19} />
          </span>
          <div className="text-xs uppercase tracking-wider text-slate-500">Education</div>
          <div className="mt-1 font-display font-semibold leading-snug text-slate-100">
            {uni.qualification}
          </div>
          <div className="mt-1 text-sm text-slate-400">{uni.institution} · {uni.period}</div>
        </Cell>

        {/* Cell 6 — headline stat (6 cols) */}
        <Cell className="md:col-span-6">
          <Rocket size={20} className="mb-3 text-accent/70 transition-colors group-hover:text-accent" />
          <div className="font-display text-5xl font-bold text-accent text-glow">
            <CountUp to={deployStat.value} suffix={deployStat.suffix} />
          </div>
          <div className="mt-2 text-sm text-slate-400">{deployStat.label}</div>
        </Cell>

        {/* Cell 7 — twin stats (6 cols) */}
        <Cell className="md:col-span-6">
          <div className="grid h-full grid-cols-2 items-center gap-4">
            <div>
              <FolderGit2
                size={20}
                className="mb-3 text-accent/70 transition-colors group-hover:text-accent"
              />
              <div className="font-display text-4xl font-bold text-slate-50">
                <CountUp to={projectStat.value} suffix={projectStat.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-400">{projectStat.label}</div>
            </div>
            <div>
              <Award
                size={20}
                className="mb-3 text-brand-purple-soft/70 transition-colors group-hover:text-brand-purple-soft"
              />
              <div className="font-display text-4xl font-bold text-slate-50">
                <CountUp to={certStat.value} suffix={certStat.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-400">{certStat.label}</div>
            </div>
          </div>
        </Cell>

        {/* Cell 8 — motto marquee banner (12 cols) */}
        <Cell className="md:col-span-12 !p-0">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-center whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mx-8 font-mono text-sm text-accent/80">
                  <span className="text-terminal-green">$</span> echo &quot;{personal.motto}&quot;
                </span>
              ))}
            </div>
            <div
              className="animate-marquee flex min-w-full shrink-0 items-center whitespace-nowrap"
              aria-hidden="true"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mx-8 font-mono text-sm text-accent/80">
                  <span className="text-terminal-green">$</span> echo &quot;{personal.motto}&quot;
                </span>
              ))}
            </div>
          </div>
        </Cell>
      </motion.div>
    </section>
  );
}
