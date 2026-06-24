import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../lib/motion';

/**
 * Consistent section heading with a mono index tag and a glowing underline.
 *
 * @param {string} index    e.g. "02"
 * @param {string} title    e.g. "About Me"
 * @param {string} command  monospace command shown above the title, e.g. "cat about.md"
 * @param {string} subtitle optional supporting line
 */
export default function SectionHeading({ index, title, command, subtitle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mb-12 md:mb-16"
    >
      {command && (
        <p className="mb-3 font-mono text-sm text-accent">
          <span className="text-terminal-green">$</span> {command}
        </p>
      )}

      <div className="flex items-baseline gap-3">
        {index && <span className="font-mono text-lg text-accent/70">{index}.</span>}
        <h2 className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
      </div>

      <div className="mt-4 h-px w-24 bg-gradient-to-r from-accent to-transparent shadow-glow" />

      {subtitle && <p className="mt-5 max-w-2xl text-slate-400">{subtitle}</p>}
    </motion.div>
  );
}
