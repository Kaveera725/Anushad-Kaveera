import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, User, MessageSquare, Paperclip, X, AlertCircle, Loader2 } from 'lucide-react';
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
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const fileRef = useRef(null);
  const formRef = useRef(null);

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
        index="06"
        command="./contact.sh --connect"
        title="Get In Touch"
        subtitle="Have an opportunity, a question, or just want to talk infrastructure? My inbox is open."
      />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="-mt-6 mb-10 inline-flex items-center gap-2 rounded-full border border-terminal-green/30 bg-terminal-green/5 px-4 py-1.5 text-sm font-medium"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
        </span>
        <span className="text-accent">Currently available for DevOps roles</span>
      </motion.div>

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
            className={`btn-shimmer group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 font-semibold text-base transition-all duration-300 disabled:cursor-not-allowed ${
              status === 'sent'
                ? 'bg-terminal-green text-base shadow-glow-green'
                : 'bg-accent shadow-glow hover:bg-accent-soft hover:shadow-glow-lg disabled:opacity-70'
            }`}
          >
            {status === 'sending' ? (
              <Loader2 size={17} className="animate-spin" />
            ) : status === 'sent' ? (
              <CheckCircle2 size={17} />
            ) : (
              <Send size={17} className="transition-transform group-hover:translate-x-0.5" />
            )}
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent! ✓' : 'Send Message'}
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
    </section>
  );
}
