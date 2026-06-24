import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Star, FolderGit2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { projects } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

export default function Projects() {
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

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="card group relative flex flex-col overflow-hidden p-6 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow-md md:p-7"
            >
              {/* Accent corner glow on hover */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Header */}
              <div className="relative mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <FolderGit2 size={18} />
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-2.5 py-0.5 font-mono text-[11px] text-brand-purple-soft">
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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
