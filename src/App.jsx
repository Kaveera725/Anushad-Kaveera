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

import Navbar from './components/Navbar';
import DevOpsBackground from './components/DevOpsBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-base text-slate-300 selection:bg-accent/25">
      {/* Animated DevOps "code rain" — sits furthest back */}
      <DevOpsBackground />

      {/* Global ambient background glow — layered over the rain to soften it */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-accent/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-brand-purple/5 blur-[140px]" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
