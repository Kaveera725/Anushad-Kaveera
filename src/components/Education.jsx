import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar, Sparkles, Building2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { education } from '../data/portfolio';
import { fadeUp, viewportOnce } from '../lib/motion';

export default function Education() {
  const [ucsc, secondary] = education;

  return (
    <section id="education" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="04"
        command="cat /etc/profile.d/education.json"
        title="Education"
        subtitle="Academic background and foundational qualifications in Computer Science."
      />

      <div className="space-y-6">
        {/* Primary Featured Card: University of Colombo (UCSC) */}
        {ucsc && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-base-200/90 via-base-200/60 to-brand-purple/10 p-7 shadow-glass-glow backdrop-blur-xl transition-all duration-300 hover:border-accent/70 hover:shadow-glow-lg sm:p-8"
          >
            {/* Subtle decorative background gradient */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:bg-accent/20" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-purple/15 blur-3xl" />

            {/* Top meta row: Badge + Period + Location */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 font-mono text-xs font-semibold text-accent shadow-glow">
                  <Sparkles size={13} className="text-accent" />
                  Primary Qualification
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-terminal-green/30 bg-terminal-green/10 px-3 py-1 font-mono text-xs font-medium text-terminal-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-terminal-green animate-pulse" />
                  {ucsc.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1">
                  <Calendar size={13} className="text-accent" />
                  {ucsc.period}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1">
                  <MapPin size={13} className="text-brand-purple-soft" />
                  {ucsc.location}
                </span>
              </div>
            </div>

            {/* Degree Title & Institution */}
            <div className="relative z-10 mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent/50 bg-accent/15 text-accent shadow-glow-lg transition-transform duration-300 group-hover:scale-105">
                <GraduationCap size={36} />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {ucsc.qualification}
                </h3>
                <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 text-base font-bold text-white shadow-glow sm:text-lg">
                  <Building2 size={20} className="shrink-0 text-accent" />
                  <span className="text-slate-50 font-bold tracking-wide">{ucsc.institution}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Card: Saralankara National College */}
        {secondary && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-base-200/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-purple/40 hover:shadow-glass-glow sm:p-7"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-purple/30 bg-brand-purple/10 text-brand-purple-soft">
                  <Award size={24} />
                </div>
                <div>
                  <div className="font-mono text-xs text-brand-purple-soft">{secondary.degreeType}</div>
                  <h4 className="font-display text-lg font-bold text-slate-100 sm:text-xl">
                    {secondary.qualification}
                  </h4>
                  <div className="mt-0.5 text-sm font-medium text-slate-400">{secondary.institution}</div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1 font-mono text-xs text-slate-400 sm:items-end">
                <span className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1">
                  {secondary.period}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin size={12} /> {secondary.location}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
