import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, Award, X, ZoomIn, ImageOff } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { certifications } from '../data/portfolio';
import { fadeUp, scaleIn, stagger, viewportOnce } from '../lib/motion';

// Issuer → badge accent styling. Linux Foundation = blue, AWS = orange, Cisco = teal.
const issuerStyle = {
  'Linux Foundation': {
    border: 'hover:border-sky-400/50 hover:shadow-[0_0_26px_rgba(56,189,248,0.28)]',
    chip: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
    square: 'border-sky-400/40 bg-sky-500/15 text-sky-300',
    header: 'text-sky-300',
    glow: 'rgba(56,189,248,0.15)',
  },
  AWS: {
    border: 'hover:border-amber-400/50 hover:shadow-[0_0_26px_rgba(251,191,36,0.28)]',
    chip: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    square: 'border-amber-400/40 bg-amber-500/15 text-amber-300',
    header: 'text-amber-300',
    glow: 'rgba(251,191,36,0.15)',
  },
  Cisco: {
    border: 'hover:border-teal-400/50 hover:shadow-[0_0_26px_rgba(45,212,191,0.28)]',
    chip: 'border-teal-400/30 bg-teal-400/10 text-teal-300',
    square: 'border-teal-400/40 bg-teal-500/15 text-teal-300',
    header: 'text-teal-300',
    glow: 'rgba(45,212,191,0.15)',
  },
};

// Group certs by issuer, preserving data order.
const groups = certifications.reduce((acc, cert) => {
  (acc[cert.issuer] ??= []).push(cert);
  return acc;
}, {});

/* ─── Certificate Modal Lightbox ─── */
function CertModal({ cert, onClose }) {
  const style = issuerStyle[cert.issuer] || issuerStyle['Linux Foundation'];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    // Prevent body scroll while modal open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(5,8,18,0.85)', backdropFilter: 'blur(12px)' }}
      >
        {/* Modal panel — stop propagation so clicking image doesn't close */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 32 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0d1120] shadow-2xl overflow-hidden"
        >
          {/* Coloured top bar */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${style.glow.replace('0.15', '0.9')}, transparent)` }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-white/[0.07]">
            <div className="min-w-0">
              <p className={`font-mono text-xs font-semibold mb-0.5 ${style.header}`}>
                {cert.issuer}{cert.code ? ` · ${cert.code}` : ''}
              </p>
              <h3 className="text-base font-bold text-slate-100 leading-snug">{cert.title}</h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close certificate"
              className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-slate-100"
            >
              <X size={16} />
            </button>
          </div>

          {/* Certificate image */}
          <div className="p-4 sm:p-6">
            {cert.image ? (
              <img
                src={cert.image}
                alt={`${cert.title} certificate`}
                className="w-full rounded-xl border border-white/[0.07] shadow-lg object-contain"
                style={{ maxHeight: '65vh' }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
                <ImageOff size={40} className="opacity-40" />
                <p className="font-mono text-sm">Certificate image not available</p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <p className="pb-4 text-center font-mono text-[11px] text-slate-600">
            Press <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">Esc</kbd> or click outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <section
        id="certifications"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8"
      >
        <SectionHeading
          index="05"
          command="ls ~/certifications --badges"
          title="Certifications"
          subtitle="Continuous learning across Kubernetes, DevOps, SRE, cloud, and security."
        />

        <div className="space-y-12">
          {Object.entries(groups).map(([issuer, certs]) => {
            const style = issuerStyle[issuer] || issuerStyle['Linux Foundation'];
            return (
              <motion.div
                key={issuer}
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                {/* Group header */}
                <motion.h3
                  variants={fadeUp}
                  className={`mb-5 flex items-center gap-2 font-mono text-sm font-semibold ${style.header}`}
                >
                  <BadgeCheck size={16} />
                  {issuer}
                  <span className="text-slate-500">({certs.length})</span>
                  <span className="ml-2 h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </motion.h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {certs.map((cert, i) => (
                    <motion.div
                      key={`${cert.title}-${i}`}
                      variants={scaleIn}
                      onClick={() => setSelected(cert)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${cert.title} certificate`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(cert); }}
                      className={`card group relative flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none ${style.border} ${cert.image ? '' : 'opacity-70'}`}
                    >
                      {/* Issuer-coloured icon square */}
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.square} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Award size={20} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold leading-snug text-slate-100">
                          {cert.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`font-mono text-[11px] ${style.header}`}>
                            {cert.issuer}
                          </span>
                          {cert.code && (
                            <span className="font-mono text-[11px] text-slate-500">
                              · {cert.code}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View hint icon */}
                      {cert.image && (
                        <ZoomIn
                          size={14}
                          className="shrink-0 text-slate-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-slate-400"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 text-center font-mono text-sm text-slate-500"
        >
          <span className="text-terminal-green">$</span> echo "
          {certifications.length} certifications and counting..."
        </motion.p>
      </section>

      {/* Modal portal — rendered outside section so it overlays everything */}
      {selected && <CertModal cert={selected} onClose={close} />}
    </>
  );
}
