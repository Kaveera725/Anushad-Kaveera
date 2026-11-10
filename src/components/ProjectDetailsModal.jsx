import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Images,
  Cpu,
  Layers,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Brain,
  Bot,
  Sparkles,
  Workflow,
  Database,
  Server,
  ArrowRight,
  Code2,
  Users,
} from 'lucide-react';
import { getProjectScreenshots, getScreenshotCount } from '../data/projectScreenshots';

export default function ProjectDetailsModal({ isOpen, project, onClose, onOpenGallery }) {
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement;
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const screenshots = getProjectScreenshots(project.id || project.title);
  const screenshotCount = getScreenshotCount(project.id || project.title);
  const details = project.details;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Project Case Study: ${project.title}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
        ref={modalRef}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-base-DEFAULT/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col w-full max-w-5xl max-h-[92vh] card overflow-hidden border-white/10 bg-base-100/95 shadow-2xl shadow-accent/15 z-10"
        >
          {/* Top Neon Accent Line */}
          <span className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-accent via-brand-purple to-accent" />

          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-base-200/90 shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-4">
              {/* Terminal traffic lights */}
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] text-accent font-medium">
                    {project.category || 'Case Study'}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {project.year}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-display font-bold text-slate-100 truncate">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {screenshotCount > 0 && onOpenGallery && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenGallery(project);
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent transition-all duration-200 hover:bg-accent/25 hover:border-accent hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Images size={13} />
                  <span>Screenshots ({screenshotCount})</span>
                </button>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub"
                  className="p-2 rounded-lg text-slate-400 hover:text-accent hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Github size={18} />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-9 space-y-8 scrollbar-thin scrollbar-thumb-accent/30 hover:scrollbar-thumb-accent/50">
            {/* Tagline / Overview Header */}
            {details?.tagline && (
              <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-accent/[0.04] p-5 sm:p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
                <div className="flex items-start gap-3">
                  <div className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-accent/40 text-accent">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-slate-100 mb-1">
                      Platform Overview
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                      {details.tagline}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Problem & Solution Grid */}
            {details?.problem && details?.solution && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* The Problem */}
                <div className="card relative overflow-hidden p-5 sm:p-6 border-red-500/20 bg-red-950/10">
                  <div className="flex items-center gap-2.5 mb-3 text-red-400 font-mono text-xs font-semibold uppercase tracking-wider">
                    <AlertCircle size={16} />
                    <span>The Problem</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {details.problem}
                  </p>
                </div>

                {/* The Solution */}
                <div className="card relative overflow-hidden p-5 sm:p-6 border-accent/30 bg-accent/[0.03]">
                  <div className="flex items-center gap-2.5 mb-3 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={16} />
                    <span>The Solution</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {details.solution}
                  </p>
                </div>
              </div>
            )}

            {/* My Role */}
            {details?.myRole && (
              <div className="card p-5 sm:p-6 border-white/10 bg-base-200/60">
                <div className="flex items-center gap-2.5 mb-2.5 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
                  <Code2 size={16} />
                  <span>My Role & Architecture Responsibilities</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                  {details.myRole}
                </p>
              </div>
            )}

            {/* Key Features */}
            {details?.keyFeatures && details.keyFeatures.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Workflow size={18} className="text-accent" />
                  <h3 className="font-display text-lg font-bold text-slate-100">
                    Key Features & Technical Architecture
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="glass rounded-xl border border-white/10 bg-base-200/50 p-4 sm:p-5 transition-all duration-200 hover:border-accent/40"
                    >
                      <div className="flex items-center gap-2 mb-2 font-display text-sm font-semibold text-slate-100">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono text-[11px] text-accent">
                          {i + 1}
                        </span>
                        <span>{feat.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-400 pl-7">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshot Preview Showcase (if screenshots available) */}
            {screenshotCount > 0 && (
              <div className="rounded-xl border border-white/10 bg-base-200/40 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Images size={18} className="text-accent" />
                    <h3 className="font-display text-lg font-bold text-slate-100">
                      Screenshots & Application Previews ({screenshotCount} in Order)
                    </h3>
                  </div>

                  {onOpenGallery && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenGallery(project, 0);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent transition-all hover:bg-accent/25 hover:border-accent hover:shadow-glow"
                    >
                      <span>Open Full Lightbox (1–{screenshotCount})</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {screenshots.map((shot, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onClose();
                        if (onOpenGallery) onOpenGallery(project, idx);
                      }}
                      className="group cursor-pointer relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-base-300 transition-all duration-200 hover:border-accent hover:scale-[1.02] hover:shadow-glass-glow"
                    >
                      {/* Step Number Badge */}
                      <span className="absolute top-1.5 left-1.5 z-10 rounded bg-base-DEFAULT/90 border border-accent/50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-accent shadow-glow backdrop-blur-sm">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>

                      <img
                        src={shot.thumbnail || shot.src}
                        alt={shot.alt || shot.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-base-DEFAULT/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                        <span className="font-mono text-[10px] text-accent px-2 py-1 rounded bg-base-100/90 border border-accent/40 shadow-glow">
                          View #{idx + 1}
                        </span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-base-DEFAULT/90 px-2 py-1 border-t border-white/5">
                        <p className="font-mono text-[10px] text-slate-300 truncate">
                          {shot.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Breakdown */}
            {details?.techStack && details.techStack.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={18} className="text-accent" />
                  <h3 className="font-display text-lg font-bold text-slate-100">
                    Comprehensive Tech Stack
                  </h3>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-base-200/50">
                  <div className="divide-y divide-white/5">
                    {details.techStack.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-3.5 sm:p-4 text-xs sm:text-sm hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="font-mono font-semibold text-accent flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{item.area}</span>
                        </div>
                        <div className="sm:col-span-2 text-slate-300 font-mono text-xs leading-relaxed">
                          {item.tools}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Challenges & Architectural Learnings */}
            {details?.challenges && details.challenges.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={18} className="text-accent" />
                  <h3 className="font-display text-lg font-bold text-slate-100">
                    Engineering Challenges & Solutions
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.challenges.map((chal, idx) => (
                    <div
                      key={idx}
                      className="card p-4 sm:p-5 border-white/10 bg-base-200/60"
                    >
                      <h4 className="font-display text-sm font-semibold text-slate-100 mb-2 flex items-center gap-2">
                        <span className="text-accent font-mono text-xs">0{idx + 1}.</span>
                        <span>{chal.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
                        {chal.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bullets Fallback if no extended details */}
            {!details && (
              <div className="card p-6 border-white/10 bg-base-200/60">
                <h3 className="font-display text-base font-bold text-slate-100 mb-3">
                  Project Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="font-mono text-accent">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags footer */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-base-300/80 px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 border-t border-white/10 bg-base-200/90 shrink-0">
            <div className="flex items-center gap-2">
              {screenshotCount > 0 && onOpenGallery && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenGallery(project);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 font-mono text-xs text-accent transition-all duration-200 hover:bg-accent/25 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Images size={14} />
                  <span>View All {screenshotCount} Screenshots</span>
                </button>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-base-300/70 px-4 py-2 font-mono text-xs text-slate-300 transition-all hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Github size={14} />
                  <span>GitHub Repo</span>
                  <ExternalLink size={11} className="ml-0.5 text-slate-400" />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 font-mono text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

