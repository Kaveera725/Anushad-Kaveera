import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { personal } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personal.phone,
    href: personal.phoneHref,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/anushad-kaveera',
    href: personal.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@Kaveera725',
    href: personal.github,
    external: true,
  },
];

const inputBase =
  'w-full rounded-lg border border-white/10 bg-base-300/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:shadow-glow';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend required: open the visitor's mail client with a prefilled message.
    // To use a service instead, swap this for an EmailJS / Formspree call.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        command="./contact.sh --connect"
        title="Get In Touch"
        subtitle="Have an opportunity, a question, or just want to talk infrastructure? My inbox is open."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left — contact cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {contactCards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                variants={fadeUp}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="card group flex items-center gap-4 p-5 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-slate-500">{c.label}</div>
                  <div className="truncate text-sm font-medium text-slate-200 group-hover:text-accent">
                    {c.value}
                  </div>
                </div>
              </motion.a>
            );
          })}

          <motion.div
            variants={fadeUp}
            className="card flex flex-col justify-center gap-2 p-5 sm:col-span-2"
          >
            <p className="font-mono text-sm text-slate-400">
              <span className="text-terminal-green">$</span> echo $STATUS
            </p>
            <p className="flex items-center gap-2 font-mono text-sm text-terminal-green">
              <span className="h-2 w-2 rounded-full bg-terminal-green shadow-glow-green" />
              Open to internships & DevOps roles — based in {personal.location}
            </p>
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="card flex flex-col gap-5 p-6 md:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`${inputBase} pl-10`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${inputBase} pl-10`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </label>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-3.5 top-4 text-slate-500" />
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity..."
                className={`${inputBase} resize-none pl-10`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-base shadow-glow transition-all duration-300 hover:bg-accent-soft hover:shadow-glow-lg"
          >
            <Send size={17} className="transition-transform group-hover:translate-x-0.5" />
            Send Message
          </button>

          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-terminal-green"
            >
              <CheckCircle2 size={16} />
              Opening your email client — thanks for reaching out!
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
