import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { GraduationCap, ArrowRight, Sparkles, Building2, Calendar, MapPin } from 'lucide-react';
import { education } from '../data/portfolio';
import { fadeUp, viewportOnce } from '../lib/motion';

export default function EducationHighlight() {
  const primary = education[0];
  if (!primary) return null;

  return (
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8 -mt-6 mb-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="group relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-r from-base-200/90 via-base-200/70 to-brand-purple/15 p-5 shadow-glass-glow backdrop-blur-xl transition-all duration-300 hover:border-accent hover:shadow-glow-md sm:p-6"
      >
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-brand-purple/20 blur-2xl" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          {/* Left: Icon + Main Credential */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent shadow-glow transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
              <GraduationCap size={28} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent">
                  <Sparkles size={12} /> Academic Profile
                </span>
                <span className="rounded-full border border-terminal-green/30 bg-terminal-green/10 px-2 py-0.5 font-mono text-[11px] text-terminal-green">
                  {primary.status}
                </span>
              </div>

              <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                {primary.qualification}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-bold text-white shadow-glow">
                  <Building2 size={14} className="text-accent" /> {primary.institution}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar size={13} /> {primary.period}
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin size={13} /> {primary.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick link */}
          <div className="flex w-full shrink-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
            <Link
              to="education"
              smooth
              duration={500}
              offset={-72}
              className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-xs font-semibold text-accent backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-[#020817] hover:shadow-glow sm:w-auto"
            >
              <span>View Education Details</span>
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
