import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { GraduationCap, Mail, Linkedin, Github, ArrowUp, Heart } from 'lucide-react';
import { personal, education } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

const socials = [
  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn', external: true },
  { icon: Github, href: personal.github, label: 'GitHub', external: true },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-base-100/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        {/* Education */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap size={22} className="text-accent" />
            <h3 className="font-mono text-lg font-semibold text-slate-100">Education</h3>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {education.map((edu) => (
              <motion.div
                key={edu.institution}
                variants={fadeUp}
              >
                <Link
                  to="education"
                  smooth
                  duration={500}
                  offset={-72}
                  className="card block cursor-pointer p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glass-glow"
                >
                  <div className="mb-1 font-mono text-xs text-accent">{edu.period}</div>
                  <h4 className="font-semibold text-slate-100">{edu.institution}</h4>
                  <p className="mt-1 text-sm text-slate-400">{edu.qualification}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-accent text-glow">
              <span className="font-mono text-sm">&gt;_</span>
              AK<span className="animate-blink font-mono text-terminal-green">_</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              {personal.name} — {personal.title}. {personal.motto}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent hover:shadow-glow"
              >
                <Icon size={18} />
              </a>
            ))}
            <Link
              to="hero"
              smooth
              duration={500}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 text-center text-xs text-slate-600 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built with <Heart size={12} className="text-accent" /> using React, Vite &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
