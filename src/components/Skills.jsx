import { motion } from 'framer-motion';
import {
  Terminal,
  Server,
  SquareTerminal,
  FileSearch,
  Globe,
  Network,
  Code,
  Lock,
  Cloud,
  Layers,
  Boxes,
  Container,
  Hexagon,
  Workflow,
  GitBranch,
  Cog,
  CloudCog,
  Activity,
  Flame,
  LineChart,
  Database,
  Leaf,
  ShieldCheck,
  Scale,
  Share2,
  Github,
  Code2,
  Braces,
  FileCode2,
  FileCode,
  Coffee,
  Binary,
  Cpu,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skillCategories } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

// String keys from data → lucide components.
const iconMap = {
  Terminal,
  Server,
  SquareTerminal,
  FileSearch,
  Globe,
  Network,
  Code,
  Lock,
  Cloud,
  Layers,
  Boxes,
  Container,
  Hexagon,
  Workflow,
  GitBranch,
  Cog,
  CloudCog,
  Activity,
  Flame,
  LineChart,
  Database,
  Leaf,
  ShieldCheck,
  Scale,
  Share2,
  Github,
  Code2,
  Braces,
  FileCode2,
  FileCode,
  Coffee,
  Binary,
};

const Icon = ({ name, ...props }) => {
  const Cmp = iconMap[name] || Cpu;
  return <Cmp {...props} />;
};

const accentStyles = {
  cyan: {
    ring: 'group-hover:border-accent/50 group-hover:shadow-glow',
    iconWrap: 'border-accent/30 bg-accent/10 text-accent',
    dot: 'text-accent',
  },
  purple: {
    ring: 'group-hover:border-brand-purple/50 group-hover:shadow-glow-purple',
    iconWrap: 'border-brand-purple/30 bg-brand-purple/10 text-brand-purple-soft',
    dot: 'text-brand-purple-soft',
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-y border-white/5 bg-base-100/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          command="ls -la ~/skills"
          title="Tech Stack & Skills"
          subtitle="The tools I reach for to build, ship, observe, and secure systems."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat) => {
            const styles = accentStyles[cat.accent] || accentStyles.cyan;
            return (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                className={`card group p-6 transition-all duration-200 hover:-translate-y-1 ${styles.ring}`}
              >
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${styles.iconWrap} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon name={cat.icon} size={20} />
                  </span>
                  <h3 className="font-semibold text-slate-100">{cat.name}</h3>
                </div>

                {/* Skill chips */}
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-base-300/60 px-2.5 py-1.5 text-xs text-slate-300 transition-colors duration-200 hover:border-white/20 hover:text-slate-100"
                    >
                      <Icon name={item.icon} size={13} className={styles.dot} />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
