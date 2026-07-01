import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, Star, FolderGit2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { projects } from '../data/portfolio';
import { fadeUp, viewportOnce } from '../lib/motion';

const FILTERS = ['All', 'Cloud & IaC', 'Containers', 'Full-Stack', 'Networking'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 border-y border-white/5 bg-base-100/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          command="git log --oneline projects/"
          title="Projects"
          subtitle="Selected work across cloud, containers, CI/CD, and infrastructure."
        />

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200 ${
                  active
                    ? 'border-accent/60 bg-accent/10 text-accent shadow-glow'
                    : 'border-white/10 bg-base-300/40 text-slate-400 hover:border-accent/30 hover:text-accent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card group relative flex flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-accent/40 hover:shadow-glow-md md:p-7"
              >
                {/* Gradient top accent bar */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent to-brand-purple opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Accent corner glow on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Header */}
                <div className="relative mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                      <FolderGit2 size={18} />
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                        <Star size={11} className="fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-white/10 bg-base-300/70 px-2 py-1 font-mono text-xs text-accent">
                      {project.year}
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                      className="text-slate-400 transition-colors hover:text-accent"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative mb-3 flex items-start gap-1 text-lg font-bold leading-snug text-slate-50 transition-colors group-hover:text-accent">
                  {project.title}
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 -translate-x-1 translate-y-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </h3>

                {/* Bullets */}
                <ul className="relative mb-5 space-y-2">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="relative mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-base-300/60 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors group-hover:border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View details — fades in on hover */}
                <div className="relative mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  View Details
                  <ArrowUpRight size={13} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
