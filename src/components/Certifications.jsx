import { motion } from 'framer-motion';
import { BadgeCheck, Award } from 'lucide-react';
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
  },
  AWS: {
    border: 'hover:border-amber-400/50 hover:shadow-[0_0_26px_rgba(251,191,36,0.28)]',
    chip: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    square: 'border-amber-400/40 bg-amber-500/15 text-amber-300',
    header: 'text-amber-300',
  },
  Cisco: {
    border: 'hover:border-teal-400/50 hover:shadow-[0_0_26px_rgba(45,212,191,0.28)]',
    chip: 'border-teal-400/30 bg-teal-400/10 text-teal-300',
    square: 'border-teal-400/40 bg-teal-500/15 text-teal-300',
    header: 'text-teal-300',
  },
};

// Group certs by issuer, preserving data order.
const groups = certifications.reduce((acc, cert) => {
  (acc[cert.issuer] ??= []).push(cert);
  return acc;
}, {});

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
                    className={`card group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 ${style.border}`}
                  >
                    {/* Issuer-coloured icon square */}
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.square} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Award size={20} />
                    </span>

                    <div className="min-w-0">
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
  );
}
