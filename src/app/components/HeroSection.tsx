"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Shield, Zap, BarChart3, Lock } from "lucide-react";

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.14,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Terminal data (demo — no fabricated user metrics) ── */
const terminalLines = [
  { type: "cmd",     text: "$ platstock init --mode=institutional" },
  { type: "out",     text: "Establishing secure connection..." },
  { type: "success", text: "✓ Authenticated  [TLS 1.3 · AES-256 · verified]" },
  { type: "cmd",     text: "$ analyze --portfolio=demo --paths=10000" },
  { type: "out",     text: "Running 10,000 Monte Carlo paths..." },
  { type: "success", text: "✓ Analysis complete  [<50ms]" },
  { type: "data",    text: "Risk: OPTIMAL  |  Alerts: NONE  |  Chain: INTACT" },
  { type: "out",     text: "Scanning for behavioral anomalies..." },
  { type: "success", text: "✓ All positions within risk parameters" },
  { type: "cmd",     text: "$ generate --report=institutional_brief" },
];

const terminalMetrics = [
  { label: "SIM. PATHS",  value: "10,000",  qualifier: "per request",  live: false },
  { label: "ENGINE",      value: "<50ms",   qualifier: "avg latency",   live: false },
  { label: "CHAIN",       value: "SHA-256", qualifier: "protocol",      live: false },
  { label: "STATUS",      value: "LIVE",    qualifier: "connected",     live: true  },
];

/* ─── Terminal Mockup ────────────────────────────────── */
function TerminalMockup() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const t = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 700 : 280 + Math.random() * 180,
      );
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  useEffect(() => {
    const id = setInterval(() => setActiveMetric((i) => (i + 1) % terminalMetrics.length), 2200);
    return () => clearInterval(id);
  }, []);

  const lineColor = (type: string) => {
    switch (type) {
      case "cmd":     return "text-cyan-400";
      case "success": return "text-emerald-400";
      case "data":    return "text-violet-300";
      default:        return "text-white/45";
    }
  };

  return (
    <div className="relative float-anim gpu-layer">
      {/* Atmospheric glow behind terminal */}
      <div className="absolute -inset-10 bg-gradient-to-br from-violet-600/14 via-transparent to-cyan-500/8 rounded-3xl blur-3xl" />

      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ boxShadow: "var(--shadow-terminal), 0 0 0 1px rgba(124,58,237,0.08) inset" }}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="flex-1 text-center text-[9.5px] font-mono text-white/25 tracking-[0.2em] uppercase">
            Platstock Terminal  ·  Demo
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-pulse" />
            <span className="text-[8.5px] font-mono text-emerald-400/55 tracking-wider">LIVE</span>
          </div>
        </div>

        {/* ── Output lines ── */}
        <div
          className="p-4 font-mono text-[11.5px] space-y-[5px] min-h-[252px]"
          style={{ background: "rgba(0,0,0,0.55)" }}
        >
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`flex gap-2 leading-relaxed ${lineColor(line.type)}`}
            >
              {line.type === "data" && (
                <span className="text-white/15 select-none shrink-0">│</span>
              )}
              <span className="font-tabular">{line.text}</span>
              {i === visibleLines - 1 && visibleLines < terminalLines.length && (
                <span className="inline-block w-[7px] h-[13px] bg-cyan-400/75 animate-pulse ml-0.5 rounded-[1px]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Metrics bar ── */}
        <div
          className="border-t border-white/[0.06] grid grid-cols-4 divide-x divide-white/[0.06]"
          style={{ background: "rgba(0,0,0,0.60)" }}
        >
          {terminalMetrics.map((m, i) => (
            <div
              key={m.label}
              className="px-3 py-2.5 text-center transition-colors duration-500 relative"
              style={{ background: activeMetric === i ? "rgba(6,182,212,0.06)" : undefined }}
            >
              {activeMetric === i && (
                <motion.div
                  layoutId="metric-indicator"
                  className="absolute inset-x-0 top-0 h-px bg-cyan-400/40"
                />
              )}
              <div className="text-[8px] font-mono text-white/25 tracking-widest mb-0.5 uppercase">
                {m.label}
              </div>
              <div className="text-[13px] font-mono font-semibold font-tabular leading-none text-white/85">
                {m.live ? (
                  <span className="flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {m.value}
                  </span>
                ) : m.value}
              </div>
              <div className="text-[8.5px] font-mono mt-0.5 text-white/28">
                {m.qualifier}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mouse-tracking radial glow ─────────────────────── */
function CursorGlow({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(700px circle at ${x}px ${y}px, rgba(100,40,220,0.10), transparent 65%)`,
        transition: "background 0.1s ease",
      }}
    />
  );
}

/* ─── Hero Section ───────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 600, y: 400 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* ── Background layers ── */}

      {/* Top radial atmosphere — stronger violet sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 55% at 50% -10%, rgba(109,40,217,0.32) 0%, rgba(76,29,149,0.12) 42%, transparent 65%)",
        }}
      />

      {/* Precision grid — tighter, edge-masked */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.38) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.38) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          opacity: 0.024,
          maskImage: "radial-gradient(ellipse 75% 65% at 55% 35%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 55% 35%, black 35%, transparent 100%)",
        }}
      />

      {/* Architectural accent lines — replaces generic blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-[48%] w-px h-[52%]"
          style={{ background: "linear-gradient(180deg, rgba(6,182,212,0.14) 0%, transparent 100%)" }}
        />
        <div
          className="absolute top-0 right-[26%] w-px h-[38%]"
          style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.22) 0%, transparent 100%)" }}
        />
        <div
          className="absolute top-0 right-[26%] w-3 h-3 -translate-x-1/2 rounded-full border border-violet-500/20"
          style={{ background: "rgba(124,58,237,0.08)" }}
        />
      </div>

      {/* Bottom section fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />

      {/* Mouse-tracking glow */}
      <CursorGlow x={mouse.x} y={mouse.y} />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 flex-1 flex flex-col justify-center">

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div>

            {/* Eyebrow badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-violet-500/22 bg-violet-500/6 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 glow-pulse" />
                <span className="text-[10.5px] font-mono tracking-[0.18em] text-white/42 uppercase group-hover:text-white/60 transition-colors duration-200">
                  Private Beta · Design Partner Program
                </span>
                <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors duration-200" />
              </button>
            </motion.div>

            {/* Headline — editorial scale */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="heading-display font-bold mb-7"
            >
              <span className="block text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.25rem] text-white/62 leading-[1.02] tracking-tight">
                Democratizing
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.25rem] leading-[1.02] mt-1.5"
                style={{
                  background: "linear-gradient(118deg, #8b5cf6 0%, #6d28d9 30%, #0e7490 72%, #22d3ee 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the Wall Street
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.25rem] text-white leading-[1.02] mt-1.5">
                Edge.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[15px] text-white/48 leading-[1.78] max-w-[490px] mb-8"
            >
              Real-time portfolio analytics, Monte Carlo risk modeling, and
              cryptographic audit trails — purpose-built for boutique hedge
              funds and family offices ready to compete at institutional scale.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mb-5"
            >
              {/* Primary */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #0891b2 100%)",
                  boxShadow: "0 0 0 1px rgba(124,58,237,0.35), 0 4px 24px rgba(109,40,217,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 1px rgba(124,58,237,0.55), 0 4px 32px rgba(109,40,217,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 1px rgba(124,58,237,0.35), 0 4px 24px rgba(109,40,217,0.35)";
                }}
              >
                <span className="relative z-10">Request Terminal Access</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Secondary */}
              <a
                href="#architecture"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/[0.09] text-sm font-medium text-white/45 hover:text-white/75 hover:border-white/[0.18] hover:bg-white/[0.03] transition-all duration-300"
              >
                See How It Works
                <ChevronRight className="w-4 h-4 text-white/22 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
              </a>
            </motion.div>

            {/* Honest status line */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[11px] text-white/22 font-mono tracking-wide mb-8"
            >
              Early access open · No credit card required
            </motion.p>

            {/* Capability trust strip */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5"
            >
              {[
                { icon: Shield,    label: "Cryptographic Audit Trail" },
                { icon: Zap,       label: "10K Monte Carlo Paths" },
                { icon: BarChart3, label: "Live Alpha Intelligence" },
                { icon: Lock,      label: "SOC2 Architecture" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-[18px] h-[18px] rounded-md border border-cyan-500/15 bg-cyan-500/6 flex items-center justify-center shrink-0">
                    <Icon className="w-2.5 h-2.5 text-cyan-400/55" />
                  </div>
                  <span className="text-[11px] font-mono text-white/30 leading-none">{label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── Right column: Terminal ── */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <TerminalMockup />
          </motion.div>
        </div>

        {/* ── Bottom spec strip — product capabilities only ── */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.06] card-inset-glow"
        >
          {[
            { value: "10K+",  label: "Simulation Paths", sub: "Per request, on demand" },
            { value: "<50ms", label: "Engine Latency",   sub: "Full simulation runtime" },
            { value: "100%",  label: "Audit Integrity",  sub: "Hash-chain verified" },
            { value: "SOC2",  label: "Security Ready",   sub: "Architecture compliant" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="relative group px-6 py-5 text-center transition-colors duration-200 hover:bg-white/[0.022] border-r border-white/[0.04] last:border-r-0"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              {/* Hover top accent */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(6,182,212,0.45), transparent)",
                }}
              />
              <div className="text-[22px] font-bold font-mono text-white/88 font-tabular leading-none">
                {stat.value}
              </div>
              <div className="text-[9.5px] font-mono tracking-widest text-white/28 mt-1.5 uppercase">
                {stat.label}
              </div>
              <div className="text-[9px] text-white/18 mt-0.5 font-mono">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
