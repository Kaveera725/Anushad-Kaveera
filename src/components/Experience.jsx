import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarClock, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experience } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        command="systemctl status experience"
        title="Experience"
        subtitle="Where I'm putting DevOps into practice."
      />

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-5" />

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
              {/* Node */}
              <span className="absolute left-4 top-2 flex h-3 w-3 -translate-x-1/2 md:left-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent shadow-glow" />
              </span>

              <div className="card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow md:p-8">
                {/* Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-50">{job.role}</h3>
                    <div className="mt-1 flex items-center gap-2 font-mono text-accent">
                      <Briefcase size={15} />
                      {job.company}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-slate-400 md:items-end">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock size={14} className="text-accent/70" />
                      {job.period}
                      {job.current && (
                        <span className="ml-1 rounded-full bg-terminal-green/10 px-2 py-0.5 font-mono text-[11px] text-terminal-green">
                          active
                        </span>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-accent/70" />
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
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
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-terminal-green"
                      />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
