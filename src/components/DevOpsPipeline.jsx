import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../lib/motion';
import SectionHeading from './SectionHeading';

/* ══════════════════════════════════════════════════════════════
   COLOR PALETTE — matches the portfolio accent system
   --accent   : #00d4ff  (cyan)
   --accent-2 : #7c3aed  (purple)
   CI lane uses cyan family, CD lane uses purple family
   ══════════════════════════════════════════════════════════════ */
const C = {
  cyan:       '#00d4ff',
  cyanDim:    'rgba(0,212,255,0.55)',
  cyanFaint:  'rgba(0,212,255,0.08)',
  cyanBorder: 'rgba(0,212,255,0.22)',
  cyanBg:     'rgba(0,212,255,0.06)',
  purple:     '#7c3aed',
  purpleSoft: '#a78bfa',
  purpleDim:  'rgba(124,58,237,0.55)',
  purpleFaint:'rgba(124,58,237,0.08)',
  purpleBorder:'rgba(124,58,237,0.22)',
  purpleBg:   'rgba(124,58,237,0.06)',
  bg:         'rgba(15,23,42,0.65)',
  bgDark:     'rgba(2,8,23,0.85)',
  glass:      'rgba(15,23,42,0.6)',
  border:     'rgba(255,255,255,0.07)',
  text:       '#e2e8f0',
  textMuted:  '#64748b',
  textDim:    '#94a3b8',
};

/* ─── SVG Icons ──────────────────────────────────────────────── */
const Icons = {
  Developer: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="14" r="7"/>
      <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"/>
      <polyline points="15,26 10,32 15,38" strokeWidth="2.2"/>
      <polyline points="33,26 38,32 33,38" strokeWidth="2.2"/>
    </svg>
  ),
  VersionControl: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="13" height="11" rx="2"/>
      <rect x="30" y="7" width="13" height="11" rx="2"/>
      <rect x="17" y="29" width="14" height="11" rx="2"/>
      <line x1="11" y1="18" x2="11" y2="24"/>
      <line x1="37" y1="18" x2="37" y2="24"/>
      <line x1="11" y1="24" x2="37" y2="24"/>
      <line x1="24" y1="24" x2="24" y2="29"/>
    </svg>
  ),
  Compile: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14,15 7,24 14,33"/>
      <polyline points="34,15 41,24 34,33"/>
      <line x1="21" y1="9" x2="27" y2="39"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="20" width="38" height="16" rx="3"/>
      <rect x="9" y="13" width="7" height="7" rx="1"/>
      <rect x="18" y="13" width="7" height="7" rx="1"/>
      <rect x="27" y="13" width="7" height="7" rx="1"/>
      <rect x="18" y="6" width="7" height="7" rx="1"/>
      <line x1="36" y1="20" x2="43" y2="17"/>
      <circle cx="43" cy="15" r="2" fill="currentColor" strokeWidth="0"/>
    </svg>
  ),
  UnitTest: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="34" height="34" rx="3"/>
      <polyline points="15,24 21,30 33,17" strokeWidth="2.5"/>
      <line x1="15" y1="15" x2="24" y2="15"/>
    </svg>
  ),
  UITest: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="38" height="26" rx="3"/>
      <line x1="5" y1="17" x2="43" y2="17"/>
      <circle cx="34" cy="13" r="1.8"/>
      <circle cx="40" cy="13" r="1.8"/>
      <rect x="11" y="22" width="11" height="9" rx="1.5"/>
      <rect x="26" y="22" width="11" height="9" rx="1.5"/>
    </svg>
  ),
  Helm: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 5L42 15v18L24 43 6 33V15z"/>
      <line x1="24" y1="5" x2="24" y2="43"/>
      <line x1="6" y1="15" x2="42" y2="15"/>
      <line x1="15" y1="10" x2="33" y2="21"/>
      <line x1="33" y1="10" x2="15" y2="21"/>
    </svg>
  ),
  OpsTeam: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="14" r="5"/>
      <circle cx="32" cy="14" r="5"/>
      <path d="M6 38c0-6.627 4.477-12 10-12"/>
      <path d="M42 38c0-6.627-4.477-12-10-12"/>
      <path d="M24 28c-3.866 0-7 4.029-7 9"/>
      <path d="M24 28c3.866 0 7 4.029 7 9"/>
    </svg>
  ),
  Testing: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="16" strokeDasharray="5 2.5"/>
      <path d="M17 24l5 5 9-10" strokeWidth="2.5"/>
    </svg>
  ),
  Release: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="18" r="8"/>
      <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"/>
      <polyline points="19,12 24,7 29,12" strokeWidth="2.5"/>
      <line x1="24" y1="7" x2="24" y2="19"/>
    </svg>
  ),
};

/* ─── Stage definitions ──────────────────────────────────────── */
const CI_STAGES = [
  { id: 'dev',     label: 'Developers',       sublabel: 'Code Push',       Icon: Icons.Developer,      tool: 'Git / GitHub' },
  { id: 'vcs',     label: 'Version Control',  sublabel: 'Branch Merge',    Icon: Icons.VersionControl,  tool: 'GitHub / GitLab' },
  { id: 'compile', label: 'Compile',          sublabel: 'Source → Binary', Icon: Icons.Compile,         tool: 'Maven / Gradle' },
  { id: 'build',   label: 'Build Image',      sublabel: 'Docker Build',    Icon: Icons.Docker,          tool: 'Docker / Buildah' },
  { id: 'utest',   label: 'Unit Testing',     sublabel: 'Auto Test',       Icon: Icons.UnitTest,        tool: 'JUnit / pytest' },
  { id: 'uitest',  label: 'UI Testing',       sublabel: 'E2E / Selenium',  Icon: Icons.UITest,          tool: 'Selenium / Cypress' },
];

const CD_STAGES = [
  { id: 'pkg',     label: 'Package',          sublabel: 'Helm Chart',      Icon: Icons.Helm,            tool: 'Helm / Ansible' },
  { id: 'ops',     label: 'Ops Review',       sublabel: 'Approve',         Icon: Icons.OpsTeam,         tool: 'Jira / Confluence' },
  { id: 'staging', label: 'Staging Test',     sublabel: 'Integration QA',  Icon: Icons.Testing,         tool: 'K8s Staging' },
  { id: 'prod',    label: 'Production',       sublabel: 'General Avail.',   Icon: Icons.Release,         tool: 'Kubernetes Prod' },
];

const ALL_STAGES = [...CI_STAGES, ...CD_STAGES];

/* ─── Animated Arrow ─────────────────────────────────────────── */
function AnimatedArrow({ color, delay = 0, dimColor }) {
  return (
    <div style={{ width: 48, flexShrink: 0 }}>
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" style={{ overflow: 'visible' }}>
        {/* Track */}
        <line x1="2" y1="9" x2="38" y2="9" stroke={color} strokeWidth="1.2" strokeOpacity="0.3"/>
        {/* Arrowhead */}
        <polyline points="33,4 44,9 33,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.75"/>
        {/* Travelling dot */}
        <circle r="2.2" fill={color} fillOpacity="0.95">
          <animateMotion dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" path="M 4 9 L 40 9"/>
        </circle>
      </svg>
    </div>
  );
}

/* ─── Vertical bridge connector ──────────────────────────────── */
function VerticalBridge() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 52, padding: '0 52px 0 0', background: 'rgba(0,0,0,0.15)', borderTop: '1px dashed rgba(255,255,255,0.05)', borderBottom: '1px dashed rgba(255,255,255,0.05)' }}>
      <svg width="20" height="52" viewBox="0 0 20 52" fill="none" style={{ display: 'block' }}>
        {/* gradient line */}
        <defs>
          <linearGradient id="vbridge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
        <line x1="10" y1="2" x2="10" y2="44" stroke="url(#vbridge)" strokeWidth="1.5" strokeOpacity="0.4"/>
        <polyline points="4,36 10,48 16,36" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.8"/>
        {/* gradient travelling dot */}
        <circle r="2.5">
          <animate attributeName="fill" values="#00d4ff;#7c3aed;#00d4ff" dur="1.8s" repeatCount="indefinite"/>
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M 10 4 L 10 44"/>
        </circle>
      </svg>
    </div>
  );
}

/* ─── Stage Card ─────────────────────────────────────────────── */
function StageCard({ stage, index, isActive, onClick, animDelay, color, borderColor, bgColor, bgActive, borderActive }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: animDelay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      title={`${stage.label} — ${stage.tool}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        width: 96,
        padding: '12px 6px 10px',
        borderRadius: 12,
        border: isActive ? `1px solid ${borderActive}` : `1px solid ${borderColor}`,
        background: isActive ? bgActive : bgColor,
        cursor: 'pointer',
        textAlign: 'center',
        flexShrink: 0,
        transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
        transform: isActive ? 'translateY(-4px)' : 'none',
        boxShadow: isActive
          ? `0 12px 32px ${color}22, 0 0 0 1px ${color}30, inset 0 1px 0 rgba(255,255,255,0.06)`
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {/* Step number */}
      <span style={{
        position: 'absolute', top: 5, left: 7,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8, color: `${color}55`, lineHeight: 1, letterSpacing: '0.04em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon wrapper */}
      <div style={{
        width: 34, height: 34,
        color: isActive ? color : `${color}90`,
        filter: isActive ? `drop-shadow(0 0 8px ${color}70)` : 'none',
        transition: 'all 0.22s',
      }}>
        <stage.Icon />
      </div>

      {/* Name */}
      <p style={{
        margin: 0,
        fontSize: 10, fontWeight: 700,
        color: isActive ? '#f1f5f9' : C.textDim,
        lineHeight: 1.3, letterSpacing: '0.01em',
      }}>
        {stage.label}
      </p>

      {/* Sublabel */}
      <p style={{
        margin: 0, fontSize: 8,
        color: `${color}60`,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.02em',
      }}>
        {stage.sublabel}
      </p>

      {/* Tool chip — shown only when active */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            fontSize: 7.5, fontFamily: "'JetBrains Mono', monospace",
            color, background: `${color}14`,
            border: `1px solid ${color}30`,
            borderRadius: 4, padding: '2px 5px',
            whiteSpace: 'nowrap', marginTop: 1,
          }}
        >
          {stage.tool}
        </motion.span>
      )}

      {/* Active pulse ring */}
      {isActive && (
        <span style={{
          position: 'absolute', inset: -5, borderRadius: 16,
          border: `1px solid ${color}50`,
          animation: 'pipelineRing 1.8s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </motion.button>
  );
}

/* ─── Lane component ─────────────────────────────────────────── */
function Lane({ label, badge, stages, activeStage, onStageClick, indexOffset, animBase, color, borderColor, bgColor, bgActive, borderActive, dimColor }) {
  return (
    <div style={{ padding: '18px 20px 22px' }}>
      {/* Lane header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}30)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, color: `${color}60`,
            border: `1px solid ${color}25`,
            borderRadius: 4, padding: '2px 7px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{badge}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color,
            textShadow: `0 0 16px ${color}50`,
          }}>{label}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, color: `${color}60`,
            border: `1px solid ${color}25`,
            borderRadius: 4, padding: '2px 7px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{badge}</span>
        </div>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}30, transparent)` }} />
      </div>

      {/* Stages row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'nowrap', overflowX: 'auto', gap: 0,
        paddingBottom: 2,
      }}>
        {stages.map((stage, i) => (
          <div key={stage.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <StageCard
              stage={stage}
              index={i + indexOffset}
              isActive={activeStage === stage.id}
              onClick={() => onStageClick(stage.id)}
              animDelay={animBase + i * 0.08}
              color={color}
              borderColor={borderColor}
              bgColor={bgColor}
              bgActive={bgActive}
              borderActive={borderActive}
            />
            {i < stages.length - 1 && (
              <AnimatedArrow color={color} dimColor={dimColor} delay={animBase + i * 0.12} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Detail panel ───────────────────────────────────────────── */
function DetailPanel({ stageId }) {
  const stage = ALL_STAGES.find(s => s.id === stageId);
  if (!stage) return null;
  const isCI = CI_STAGES.some(s => s.id === stageId);
  const color = isCI ? C.cyan : C.purpleSoft;
  return (
    <motion.div
      key={stageId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        border: `1px solid ${color}30`,
        background: C.glass,
        backdropFilter: 'blur(16px)',
        borderRadius: 12,
        padding: '10px 18px',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 20px ${color}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <div style={{
        width: 28, height: 28, color,
        flexShrink: 0, filter: `drop-shadow(0 0 5px ${color}50)`,
      }}>
        <stage.Icon />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{stage.label}</p>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: C.textMuted }}>{stage.sublabel}</p>
        <p style={{ margin: '3px 0 0', fontSize: 11, fontFamily: 'monospace', color }}>⚙ {stage.tool}</p>
      </div>
    </motion.div>
  );
}

/* ─── Metrics ─────────────────────────────────────────────────── */
const METRICS = [
  { label: 'Pipeline Runs / day', value: '48',     unit: 'runs', color: C.cyan },
  { label: 'CI Success Rate',     value: '99.2',   unit: '%',    color: '#38bdf8' },
  { label: 'Avg Build Time',      value: '3m 47s', unit: '',     color: C.purpleSoft },
  { label: 'Mean Lead Time',      value: '22',     unit: 'min',  color: '#c4b5fd' },
];

/* ─── Main Component ─────────────────────────────────────────── */
export default function DevOpsPipeline() {
  const [activeStage, setActiveStage]       = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const ref = useRef(null);

  // Auto-cycle highlight until user clicks
  useEffect(() => {
    if (userInteracted) return;
    const ids = ALL_STAGES.map(s => s.id);
    let i = 0;
    const t = setInterval(() => {
      setActiveStage(ids[i % ids.length]);
      i++;
    }, 1800);
    return () => clearInterval(t);
  }, [userInteracted]);

  function handleClick(id) {
    setUserInteracted(true);
    setActiveStage(prev => (prev === id ? null : id));
  }

  return (
    <section id="pipeline" className="relative scroll-mt-20 py-24 border-y border-white/5 bg-base-100/40">

      {/* Ambient bg — reuses site orb style */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-20" />
        {/* Cyan glow top-left */}
        <div style={{
          position: 'absolute', top: -120, left: -80,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        {/* Purple glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: -100, right: -60,
          width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        {/* Top hairline */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(124,58,237,0.3), transparent)',
        }} />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          index="04.5"
          command="cat .github/workflows/ci-cd.yml"
          title="CI / CD Pipeline"
          subtitle="End-to-end automation — from code commit to production release."
        />

        {/* Live status pill */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            PIPELINE RUNNING
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            Click any stage card to inspect &nbsp;·&nbsp; Highlights auto-cycle
          </span>
        </motion.div>

        {/* ── Pipeline diagram ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'rgba(15,23,42,0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* CI — cyan */}
          <Lane
            label="Continuous Integration"
            badge="Build Pipeline"
            stages={CI_STAGES}
            activeStage={activeStage}
            onStageClick={handleClick}
            indexOffset={0}
            animBase={0.1}
            color={C.cyan}
            borderColor={C.cyanBorder}
            bgColor={C.cyanFaint}
            bgActive="rgba(0,212,255,0.10)"
            borderActive="rgba(0,212,255,0.5)"
            dimColor="rgba(0,212,255,0.35)"
          />

          {/* Gradient bridge */}
          <VerticalBridge />

          {/* CD — purple */}
          <Lane
            label="Continuous Delivery"
            badge="Release Pipeline"
            stages={CD_STAGES}
            activeStage={activeStage}
            onStageClick={handleClick}
            indexOffset={CI_STAGES.length}
            animBase={0.45}
            color={C.purpleSoft}
            borderColor={C.purpleBorder}
            bgColor={C.purpleFaint}
            bgActive="rgba(124,58,237,0.10)"
            borderActive="rgba(167,139,250,0.5)"
            dimColor="rgba(124,58,237,0.35)"
          />
        </motion.div>

        {/* Detail panel */}
        <div style={{ marginTop: 18, minHeight: 58 }}>
          {activeStage && <DetailPanel stageId={activeStage} />}
        </div>

        {/* ── Metrics row ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {METRICS.map(m => (
            <div key={m.label} className="card relative overflow-hidden p-4 hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-2xl" style={{ background: m.color }} />
              <p className="font-mono text-[10px] text-slate-500 mb-1 tracking-wide uppercase">{m.label}</p>
              <p className="font-display text-[1.6rem] font-bold leading-none" style={{ color: m.color }}>
                {m.value}
                {m.unit && <span className="text-xs ml-1 font-normal text-slate-400">{m.unit}</span>}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pipelineRing {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
