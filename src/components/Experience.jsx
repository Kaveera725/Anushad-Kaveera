import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experience } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

// Highlights quantified metrics (e.g. "40%", "3x") so numbers pop visually.
function highlightMetrics(text) {
  return text.split(/(\d+(?:\.\d+)?%|\d+x\b)/gi).map((part, i) =>
    /^\d+(?:\.\d+)?%$|^\d+x$/i.test(part) ? (
      <span key={i} className="metric-glow">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function Experience() {
  const timelineRef = useRef(null);

  // The gradient line "draws" downward as the section scrolls into view.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        command="systemctl status experience"
        title="Experience"
        subtitle="Where I'm putting DevOps into practice."
      />

      <div ref={timelineRef} className="relative">
        {/* Vertical timeline line — cyan→purple gradient, drawn on scroll */}
        <div className="absolute bottom-0 left-4 top-2 w-[2px] bg-white/5 md:left-5" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-4 top-2 w-[2px] origin-top bg-gradient-to-b from-accent to-brand-purple shadow-glow md:left-5"
        />

        <div className="space-y-12">
          {experience.map((job, idx) => (
            <motion.div
              key={`${job.company}-${idx}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="relative pl-12 md:pl-16"
            >
              {/* Node — cyan circle, white core, pulsing ring */}
              <span className="absolute left-4 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-5">
                <span className="node-pulse absolute inline-flex h-4 w-4 rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>

              <div className="card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glass-glow md:p-8">
                {/* Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-50">{job.role}</h3>
                    <div className="mt-1 flex items-center gap-2 font-mono text-accent">
                      <Briefcase size={15} />
                      {job.company}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    <span className="inline-flex items-center gap-2">
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                        {job.period}
                      </span>
                      {job.current && (
                        <span className="rounded-full border border-terminal-green/30 bg-terminal-green/10 px-2 py-0.5 font-mono text-[11px] text-terminal-green">
                          active
                        </span>
                      )}
                    </span>
                    <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-slate-400">
                      <MapPin size={13} className="text-accent/70" />
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Bullets — cyan "▸" markers */}
                <motion.ul
                  variants={stagger}
                  className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
                >
                  {job.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                    >
                      <span className="mt-px select-none font-mono text-accent">▸</span>
                      <span>{highlightMetrics(bullet)}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Tech tags — purple pills */}
                {job.tags && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-purple/40 bg-[rgba(124,58,237,0.15)] px-3 py-1 font-mono text-[11px] text-brand-purple-soft transition-colors duration-200 hover:bg-[rgba(124,58,237,0.3)] hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
