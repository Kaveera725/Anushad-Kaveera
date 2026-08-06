// ============================================================
//  Anushad Kaveera — DevOps Engineer · Portfolio
//
//  SETUP (run once):
//    npm create vite@latest . -- --template react   # (skip if cloning this repo)
//    npm install
//    npm install framer-motion lucide-react react-scroll react-type-animation
//    npm install -D tailwindcss postcss autoprefixer
//    npx tailwindcss init -p                          # (config already included)
//
//  RUN:
//    npm run dev        # local dev server
//    npm run build      # production build → /dist
//    npm run preview    # preview the production build
//
//  CV: drop your file in /public as "Anushad-Kaveera-CV.pdf" to wire the
//      "Download CV" button (path configured in src/data/portfolio.js).
// ============================================================

import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import DevOpsBackground from './components/DevOpsBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DevOpsPipeline from './components/DevOpsPipeline';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative min-h-screen overflow-x-hidden bg-base text-slate-300 selection:bg-accent/25"
    >
      {/* Custom cursor — dot + trailing ring (fine pointers only) */}
      <CustomCursor />

      {/* Animated DevOps "code rain" — sits furthest back */}
      <DevOpsBackground />

      {/* Ambient gradient orbs — fixed, slow-drifting glow */}
      <div className="ambient-orb ambient-orb--1" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--2" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--3" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <DevOpsPipeline />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </motion.div>
  );
}
