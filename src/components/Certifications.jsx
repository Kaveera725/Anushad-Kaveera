import { motion } from 'framer-motion';
import { BadgeCheck, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { certifications } from '../data/portfolio';
import { fadeUp, scaleIn, stagger, viewportOnce } from '../lib/motion';

// Issuer → badge accent styling.
const issuerStyle = {
  'Linux Foundation': {
    border: 'hover:border-accent/50 hover:shadow-glow',
    chip: 'border-accent/30 bg-accent/10 text-accent',
    icon: 'text-accent',
  },
  AWS: {
    border: 'hover:border-amber-400/50 hover:shadow-[0_0_26px_rgba(251,191,36,0.28)]',
    chip: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    icon: 'text-amber-300',
  },
  Cisco: {
    border: 'hover:border-brand-purple/50 hover:shadow-glow-purple',
    chip: 'border-brand-purple/30 bg-brand-purple/10 text-brand-purple-soft',
    icon: 'text-brand-purple-soft',
  },
};

export default function Certifications() {
  return (
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

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((cert, i) => {
          const style = issuerStyle[cert.issuer] || issuerStyle['Linux Foundation'];
          return (
            <motion.div
              key={`${cert.title}-${i}`}
              variants={scaleIn}
              className={`card group flex items-start gap-4 p-5 transition-all duration-300 ${style.border}`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.chip} transition-transform duration-300 group-hover:scale-110`}
              >
                <Award size={20} className={style.icon} />
              </span>

              <div className="min-w-0">
                <div
                  className={`mb-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${style.chip}`}
                >
                  <BadgeCheck size={11} />
                  {cert.issuer}
                </div>
                <h3 className="text-sm font-semibold leading-snug text-slate-100">
                  {cert.title}
                </h3>
                {cert.code && (
                  <span className="mt-1 inline-block font-mono text-xs text-slate-500">
                    {cert.code}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Summary line */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10 text-center font-mono text-sm text-slate-500"
      >
        <span className="text-terminal-green">$</span> echo "
        {certifications.length} certifications and counting..."
      </motion.p>
    </section>
  );
}
