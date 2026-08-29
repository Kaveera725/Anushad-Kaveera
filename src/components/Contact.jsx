import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, Paperclip, X, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { personal } from '../data/portfolio';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

// Each contact channel gets its own accent colour (icon circle + hover glow).
const contactCards = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    circle: 'border-accent/40 bg-accent/10 text-accent',
    hover: 'hover:border-accent/50 hover:shadow-[0_0_26px_rgba(0,212,255,0.25)]',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personal.phone,
    href: personal.phoneHref,
    circle: 'border-terminal-green/40 bg-terminal-green/10 text-terminal-green',
    hover: 'hover:border-terminal-green/50 hover:shadow-[0_0_26px_rgba(34,197,94,0.25)]',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/anushad-kaveera',
    href: personal.linkedin,
    external: true,
    circle: 'border-sky-400/40 bg-sky-400/10 text-sky-400',
    hover: 'hover:border-sky-400/50 hover:shadow-[0_0_26px_rgba(56,189,248,0.25)]',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@Kaveera725',
    href: personal.github,
    external: true,
    circle: 'border-brand-purple/40 bg-brand-purple/10 text-brand-purple-soft',
    hover: 'hover:border-brand-purple/50 hover:shadow-glow-purple',
  },
];

const inputBase =
  'peer w-full rounded-lg border border-white/10 bg-base-300/60 px-4 pb-3 pt-5 text-sm text-slate-100 placeholder-transparent transition-all duration-300 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:shadow-glow';

const floatLabel =
  'pointer-events-none absolute left-4 top-1.5 text-[11px] font-medium text-accent transition-all duration-200 ' +
  'peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 ' +
  'peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-accent';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const fileRef = useRef(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => setFile(e.target.files[0] ?? null);

  const clearFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          attachment_note: file ? `[File selected: ${file.name}]` : '',
          to_email: personal.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      clearFile();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8">
      <SectionHeading
        index="07"
        command="./contact.sh --connect"
        title="Get In Touch"
        subtitle="Have an opportunity, a question, or just want to talk infrastructure? My inbox is open."
      />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="glass -mt-6 mb-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
        </span>
        <span className="text-accent">Currently available for DevOps roles</span>
      </motion.div>

      {/* Darker glass shell around the whole section */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0a0f1e]/70 p-5 shadow-glass backdrop-blur-[16px] sm:p-8 md:p-10">
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
                  className={`card group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 ${c.hover}`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${c.circle} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-slate-500">{c.label}</div>
                    <div className="truncate text-sm font-medium text-slate-200 group-hover:text-slate-50">
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
                Open to DevOps & Cloud Engineering opportunities — based in {personal.location}
              </p>
            </motion.div>
          </motion.div>

          {/* Right — form with floating labels */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="card flex flex-col gap-5 p-6 md:p-8"
          >
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputBase}
              />
              <label htmlFor="name" className={floatLabel}>
                Name
              </label>
            </div>

            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputBase}
              />
              <label htmlFor="email" className={floatLabel}>
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity..."
                className={`${inputBase} resize-none`}
              />
              <label htmlFor="message" className={floatLabel}>
                Message
              </label>
            </div>

            {/* File attachment */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Attach File <span className="text-slate-500">(optional)</span>
              </label>
              <input
                ref={fileRef}
                type="file"
                onChange={handleFile}
                className="hidden"
                id="file-upload"
              />
              {file ? (
                <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
                  <Paperclip size={15} className="shrink-0 text-accent" />
                  <span className="flex-1 truncate text-sm text-slate-300">{file.name}</span>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-slate-500 transition-colors hover:text-red-400"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-slate-400 transition-all duration-200 hover:border-accent/50 hover:text-accent"
                >
                  <Paperclip size={15} />
                  Click to attach a file
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              style={
                status === 'sent'
                  ? undefined
                  : { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }
              }
              className={`btn-shimmer group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed ${
                status === 'sent'
                  ? 'bg-terminal-green text-[#020817] shadow-glow-green'
                  : 'shadow-glow hover:shadow-glow-lg disabled:opacity-70'
              }`}
            >
              {status === 'sending' ? (
                <Loader2 size={17} className="animate-spin" />
              ) : status === 'sent' ? (
                <CheckCircle2 size={17} />
              ) : (
                <Send size={17} className="transition-transform group-hover:translate-x-0.5" />
              )}
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent ✓' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-terminal-green"
              >
                <CheckCircle2 size={16} />
                Message sent! I'll get back to you soon.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle size={16} />
                Something went wrong. Please try emailing me directly at {personal.email}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
