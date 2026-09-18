import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, Star, FolderGit2, Terminal, Images } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ScreenshotGallery from './ScreenshotGallery';
import { projects } from '../data/portfolio';
import { hasScreenshots, getScreenshotCount } from '../data/projectScreenshots';
import { fadeUp, viewportOnce } from '../lib/motion';

const FILTERS = ['All', 'Cloud & IaC', 'Containers', 'Full-Stack', 'Networking', 'Machine Learning (ML)'];

const featuredProjects = projects.filter((p) => p.featured);
const gridProjects = projects.filter((p) => !p.featured);

/* Decorative terminal-style mockup panel for featured cards */
function ProjectMockup({ project, onOpenGallery, hasImages, screenshotCount }) {
  return (
    <div
      onClick={hasImages ? () => onOpenGallery(project) : undefined}
      className={`glass group/mockup relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-xl ${
        hasImages ? 'cursor-pointer' : ''
      }`}
    >
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-purple/15 blur-3xl" />

      {/* Mini terminal chrome */}
      <div className="card relative w-[85%] overflow-hidden transition-transform duration-300 group-hover/mockup:scale-[1.02]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-base-300/60 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
          <span className="ml-2 flex items-center gap-1 font-mono text-[10px] text-slate-500">
            <Terminal size={10} />
            {project.year}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 p-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-accent/25 bg-accent/5 px-2 py-1 font-mono text-[10px] text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Click overlay hint if has images */}
      {hasImages && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-DEFAULT/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/mockup:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-base-100/90 px-4 py-2 font-mono text-xs text-accent shadow-glow">
            <Images size={14} />
            <span>View {screenshotCount} Screenshots</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* Full-width featured card — image side alternates left/right */
function FeaturedCard({ project, flipped, onOpenGallery }) {
  const hasImages = hasScreenshots(project.id || project.title);
  const screenshotCount = getScreenshotCount(project.id || project.title);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="card group relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-accent/40 hover:shadow-glass-glow"
    >
      {/* Gradient top border */}
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-accent to-brand-purple" />

      <div
        className={`grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-8 ${
          flipped ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <ProjectMockup
          project={project}
          onOpenGallery={onOpenGallery}
          hasImages={hasImages}
          screenshotCount={screenshotCount}
        />

        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
                <Star size={11} className="fill-current" />
                Featured
              </span>

              {hasImages && (
                <button
                  type="button"
                  onClick={() => onOpenGallery(project)}
                  aria-label={`View screenshots for ${project.title}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent transition-all duration-200 hover:bg-accent/25 hover:border-accent hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Images size={12} />
                  <span>Screenshots ({screenshotCount})</span>
                </button>
              )}
            </div>

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

          <h3 className="mb-3 flex items-start gap-1 font-display text-xl font-bold leading-snug text-slate-50 transition-colors group-hover:text-accent md:text-2xl">
            {project.title}
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 -translate-x-1 translate-y-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />
          </h3>

          <ul className="mb-5 space-y-2">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                <span className="mt-px select-none font-mono text-accent">▸</span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-base-300/60 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors group-hover:border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {hasImages && (
              <button
                type="button"
                onClick={() => onOpenGallery(project)}
                className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent transition-all duration-200 hover:bg-accent/25 hover:border-accent hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Images size={13} />
                <span>View Screenshots</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* Compact grid card */
function GridCard({ project, onOpenGallery }) {
  const hasImages = hasScreenshots(project.id || project.title);
  const screenshotCount = getScreenshotCount(project.id || project.title);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-glass-glow"
    >
      {/* Gradient accent bar */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent to-brand-purple opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Corner glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-accent/30 text-accent transition-transform duration-300 group-hover:scale-110">
            <FolderGit2 size={18} />
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
              <Star size={11} className="fill-current" />
              Featured
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasImages && (
            <button
              type="button"
              onClick={() => onOpenGallery(project)}
              aria-label={`View screenshots for ${project.title}`}
              className="inline-flex items-center gap-1 rounded-md border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[11px] text-accent transition-all duration-200 hover:bg-accent/25 hover:border-accent hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <Images size={11} />
              <span>{screenshotCount}</span>
            </button>
          )}
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
      <h3 className="relative mb-3 flex items-start gap-1 font-display text-lg font-bold leading-snug text-slate-50 transition-colors group-hover:text-accent">
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
            <span className="mt-px select-none font-mono text-accent">▸</span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech tags & action button */}
      <div className="relative mt-auto flex flex-col gap-3 pt-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-base-300/60 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors group-hover:border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasImages && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenGallery(project)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 py-2 px-3 font-mono text-xs text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <Images size={13} />
              <span>View Screenshots ({screenshotCount})</span>
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [activeGalleryProject, setActiveGalleryProject] = useState(null);

  const showFeatured = filter === 'All';
  // "All" → featured showcased on top, the rest in the grid.
  // A specific filter → every matching project in the grid.
  const visible = showFeatured
    ? gridProjects
    : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 border-y border-white/5 bg-base-100/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
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
                    ? 'border-accent/60 bg-accent/15 text-accent shadow-glow'
                    : 'glass text-slate-400 hover:border-accent/30 hover:text-accent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* Featured showcase — full-width, alternating sides */}
        <AnimatePresence>
          {showFeatured && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
              className="mb-6 space-y-6"
            >
              {featuredProjects.map((project, i) => (
                <FeaturedCard
                  key={project.title}
                  project={project}
                  flipped={i % 2 === 1}
                  onOpenGallery={setActiveGalleryProject}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <GridCard
                key={project.title}
                project={project}
                onOpenGallery={setActiveGalleryProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Screenshot Gallery Modal */}
      <ScreenshotGallery
        isOpen={Boolean(activeGalleryProject)}
        project={activeGalleryProject}
        onClose={() => setActiveGalleryProject(null)}
      />
    </section>
  );
}

