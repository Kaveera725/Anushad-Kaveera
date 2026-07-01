import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { navLinks } from '../data/portfolio';

const SCROLL_OFFSET = -72; // height of the fixed navbar

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Page scroll progress → smoothed 0–1 for the top progress bar.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          ? 'border-b border-white/10 bg-base/80 shadow-glow backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Scroll progress bar — fills left→right as the page scrolls */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent via-accent to-brand-purple shadow-glow"
      />

      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          to="hero"
          smooth
          duration={500}
          className="group flex cursor-pointer items-center gap-2"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-base-200 text-accent shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Terminal size={18} />
          </span>
          <span className="font-mono text-xl font-bold tracking-tight text-accent text-glow">
            AK
            <span className="animate-blink text-terminal-green">_</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                {...linkProps}
                className="relative cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 after:absolute after:bottom-1 after:left-4 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-accent"
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
              className="ml-2 cursor-pointer rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-base hover:shadow-glow-md"
            >
              Let's talk
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 transition-colors hover:border-accent/50 hover:text-accent md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-white/10 bg-base-100/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
