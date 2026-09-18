import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';
import { getProjectScreenshots } from '../data/projectScreenshots';

export default function ScreenshotGallery({ isOpen, project, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartXRef = useRef(null);
  const modalRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Retrieve screenshots for this project
  const screenshots = project ? getProjectScreenshots(project.id || project.title) : [];
  const total = screenshots.length;
  const currentImage = screenshots[currentIndex];

  // Save reference to active element when opened to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement;
      setCurrentIndex(initialIndex || 0);
      setIsLoaded(false);
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
    }
  }, [isOpen, initialIndex, project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Navigate next / prev
  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback((idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setIsLoaded(false);
    setCurrentIndex(idx);
  }, [currentIndex]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Tab') {
        // Focus trap inside modal
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const activeThumb = thumbnailsRef.current.children[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold of 45px
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || !project) return null;

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Screenshot gallery for ${project.title}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
        ref={modalRef}
      >
        {/* Backdrop with cyber blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-base-DEFAULT/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col w-full max-w-5xl max-h-[92vh] card overflow-hidden border-white/10 bg-base-100/95 shadow-2xl shadow-accent/10 z-10"
        >
          {/* Neon top gradient line */}
          <span className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-accent via-brand-purple to-accent" />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-base-200/80">
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className="glass flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-accent/30 text-accent">
                <ImageIcon size={16} />
              </div>
              <div className="truncate">
                <h2 className="text-base sm:text-lg font-display font-semibold text-slate-100 truncate">
                  {project.title}
                </h2>
                <p className="font-mono text-xs text-slate-400 truncate">
                  {currentImage?.title || 'Screenshot Preview'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {total > 0 && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent">
                  {currentIndex + 1} / {total}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close screenshot gallery"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Stage View */}
          {total === 0 ? (
            /* Graceful Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl border-accent/20 text-accent/60 mb-4">
                <ImageIcon size={32} />
              </div>
              <h3 className="text-lg font-display font-medium text-slate-200 mb-2">
                No screenshots added yet
              </h3>
              <p className="max-w-md text-sm text-slate-400 mb-6 leading-relaxed">
                Screenshots for <span className="text-accent font-semibold">{project.title}</span> will appear here once uploaded to the project folder.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-accent/40 bg-accent/15 px-5 py-2 font-mono text-xs text-accent hover:bg-accent/25 hover:shadow-glow transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden bg-base-DEFAULT/60 min-h-[300px] sm:min-h-[420px] max-h-[64vh] select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Background ambient glow matching current active */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 blur-3xl">
                <div className="h-64 w-64 rounded-full bg-accent/20" />
                <div className="h-64 w-64 rounded-full bg-brand-purple/20 -ml-24" />
              </div>

              {/* Prev Button */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-2 sm:left-4 z-20 glass flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-white/10 text-slate-200 hover:text-accent hover:border-accent/40 hover:shadow-glow transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Main Image Display */}
              <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6">
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent shadow-glow" />
                  </div>
                )}

                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col items-center justify-center max-w-full max-h-full"
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      loading="lazy"
                      onLoad={() => setIsLoaded(true)}
                      className={`max-h-[52vh] sm:max-h-[58vh] max-w-full rounded-lg object-contain shadow-2xl transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next screenshot"
                  className="absolute right-2 sm:right-4 z-20 glass flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-white/10 text-slate-200 hover:text-accent hover:border-accent/40 hover:shadow-glow transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Fullscreen external view link (opens image in raw tab) */}
              <a
                href={currentImage.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full resolution image in new tab"
                className="absolute right-4 bottom-4 z-20 hidden sm:flex items-center gap-1.5 rounded-md border border-white/10 bg-base-200/80 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-accent hover:border-accent/30 transition-all backdrop-blur-sm"
              >
                <Maximize2 size={12} />
                <span>Full Res</span>
              </a>
            </div>
          )}

          {/* Caption & Metadata Bar (if available) */}
          {total > 0 && currentImage?.caption && (
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/5 bg-base-200/40 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentImage.caption}
              </p>
            </div>
          )}

          {/* Thumbnail Strip (if multiple images) */}
          {total > 1 && (
            <div className="border-t border-white/10 bg-base-200/70 p-3 sm:p-4">
              <div
                ref={thumbnailsRef}
                className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-accent/40 hover:scrollbar-thumb-accent"
              >
                {screenshots.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={img.filename || idx}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}: ${img.title}`}
                      className={`group relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-md border transition-all duration-200 focus:outline-none ${
                        isActive
                          ? 'border-accent ring-2 ring-accent/50 scale-105 shadow-glow'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-accent/40'
                      }`}
                    >
                      <img
                        src={img.thumbnail || img.src}
                        alt={`Thumbnail ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-base-DEFAULT/80 text-[9px] font-mono text-center text-slate-300 py-0.5">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile swipe indicator hint */}
          {total > 1 && (
            <div className="sm:hidden px-4 py-1.5 bg-base-300/40 text-center border-t border-white/5">
              <span className="font-mono text-[10px] text-slate-500">
                Swipe left/right or tap arrows to navigate
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
