import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolio';

const SCROLL_OFFSET = -72; // height of the fixed navbar

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Page scroll progress → smoothed 0–1 for the top progress bar.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: SCROLL_OFFSET,
    activeClass: 'nav-active',
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.08] bg-base/70 backdrop-blur-[16px] shadow-glass'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Scroll progress bar — fills left→right as the page scrolls */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent via-accent to-brand-purple shadow-glow"
      />

      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo — ">_" terminal prefix + AK in Space Grotesk */}
        <Link
          to="hero"
          smooth
          duration={500}
          className="group flex cursor-pointer items-center gap-2"
          aria-label="Back to top"
        >
          <span className="flex h-9 items-center justify-center rounded-lg border border-accent/40 bg-base-200/70 px-2.5 font-mono text-sm font-bold text-accent shadow-glow backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            &gt;_
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-accent text-glow">
            AK
            <span className="animate-blink font-mono text-terminal-green">_</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                {...linkProps}
                className="link-underline relative mx-3 cursor-pointer py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="contact"
              smooth
              duration={500}
              offset={SCROLL_OFFSET}
              className="ml-4 cursor-pointer rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:text-[#020817] hover:shadow-glow-md"
            >
              Let's talk
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="z-[70] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 transition-colors hover:border-accent/50 hover:text-accent md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — glassmorphism drawer sliding in from the right */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-base/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass fixed right-0 top-0 z-50 flex h-screen w-72 flex-col gap-1 rounded-l-2xl px-5 pb-8 pt-24 shadow-glass md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.id}
                      {...linkProps}
                      onClick={() => setOpen(false)}
                      className="block cursor-pointer rounded-lg px-4 py-3 font-mono text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-accent"
                    >
                      <span className="text-terminal-green">~/</span>
                      {link.label.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="contact"
                smooth
                duration={500}
                offset={SCROLL_OFFSET}
                onClick={() => setOpen(false)}
                className="mt-6 cursor-pointer rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-[#020817]"
              >
                Let's talk
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
