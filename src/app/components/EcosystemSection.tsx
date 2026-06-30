"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Layout, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const pillars = [
  {
    id: "alpha",
    number: "01",
    icon: Cpu,
    title: "Alpha Engine",
    subtitle: "Predictive Intelligence",
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.09)",
    tags: ["FastAPI", "Python", "Monte Carlo", "Async"],
    description:
      "Run 10,000 forward-looking simulations per request. See exactly how your portfolio holds up before the market moves — not after.",
    outcomes: [
      "Forward-looking risk scenarios, not historical averages",
      "Execution decoupled from UI — zero latency at full load",
      "Wall Street modeling depth at enterprise SaaS pricing",
    ],
    metrics: [
      { label: "Sim. Paths", value: "10K+" },
      { label: "Latency",    value: "<50ms" },
      { label: "Models",     value: "3 Live" },
    ],
    visual: "alpha",
  },
  {
    id: "sovereign",
    number: "02",
    icon: Database,
    title: "Sovereign Data",
    subtitle: "Cryptographic Trust",
    accent: "#7c3aed",
    accentDim: "rgba(124,58,237,0.09)",
    tags: ["Postgres", "Supabase", "Deno Edge", "Hash Chain"],
    description:
      "Every position change is permanently sealed and linked to the previous record. Your audit trail is litigation-proof, regulator-ready, and tamper-impossible.",
    outcomes: [
      "Every record cryptographically sealed at the moment of write",
      "Regulator-ready trail — zero SQL tampering risk",
      "Behavioral anomalies surfaced before they become events",
    ],
    metrics: [
      { label: "Chain Depth", value: "#4,821" },
      { label: "Integrity",   value: "100%" },
      { label: "Audit",       value: "Real-time" },
    ],
    visual: "chain",
  },
  {
    id: "ui",
    number: "03",
    icon: Layout,
    title: "Unified Terminal",
    subtitle: "Cross-Platform Power",
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.09)",
    tags: ["Next.js", "React Native", "Expo", "Tailwind"],
    description:
      "Your full portfolio terminal on your desk and in your pocket. One login, real-time sync, institutional analytics on every screen you own.",
    outcomes: [
      "Full analytical depth on web and iOS — one unified login",
      "Portfolio state syncs live across all devices instantly",
      "Sub-1.2s load time — institutional UX at startup speed",
    ],
    metrics: [
      { label: "Platforms", value: "Web + iOS" },
      { label: "FCP",       value: "<1.2s" },
      { label: "Sync",      value: "Live" },
    ],
    visual: "ui",
  },
];

/* ─── Animated Visuals ──────────────────────────────── */

function AlphaVisual({ accent }: { accent: string }) {
  const bars = [0.38, 0.62, 0.50, 0.88, 0.72, 0.95, 0.55, 0.78, 0.65, 0.84];
  return (
    <div className="relative h-20 flex items-end gap-1 px-1">
      {/* Baseline grid lines */}
      {[0.25, 0.5, 0.75].map((pct) => (
        <div
          key={pct}
          className="absolute inset-x-0 pointer-events-none"
          style={{
            bottom: `${pct * 100}%`,
            borderTop: `1px dashed ${accent}18`,
          }}
        />
      ))}
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="relative flex-1 rounded-sm overflow-hidden"
          style={{ background: `${accent}18` }}
          initial={{ height: 0 }}
          animate={{ height: `${h * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${accent}70, ${accent}25)` }}
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ delay: i * 0.1, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Top cap highlight */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-full"
            style={{ background: accent }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ChainVisual({ accent }: { accent: string }) {
  const nodes = [4817, 4818, 4819, 4820, 4821];
  return (
    <div className="flex items-center justify-center py-3">
      {nodes.map((hash, n) => (
        <div key={n} className="flex items-center">
          <motion.div
            className="relative flex flex-col items-center justify-center rounded-lg border px-2.5 py-1.5 gap-0.5"
            style={{ borderColor: `${accent}35`, background: `${accent}07` }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: n * 0.08 + 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="text-[7px] font-mono text-white/20 leading-none">BLOCK</span>
            <span className="text-[9px] font-mono font-semibold leading-none" style={{ color: `${accent}90` }}>
              #{hash}
            </span>
            {/* Pulse dot top-right */}
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
              style={{ background: n === nodes.length - 1 ? accent : `${accent}50` }}
              animate={{ opacity: n === nodes.length - 1 ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {n < nodes.length - 1 && (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: n * 0.08 + 0.4 }}
            >
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d}
                  className="w-1 h-px mx-0.5 rounded-full"
                  style={{ background: `${accent}50` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ delay: d * 0.15 + n * 0.1, duration: 1.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

function UIVisual({ accent }: { accent: string }) {
  return (
    <div className="flex items-end justify-center gap-4 py-1 h-20">
      {/* Desktop frame */}
      <motion.div
        className="rounded border overflow-hidden shrink-0"
        style={{ borderColor: `${accent}30`, background: `${accent}05`, width: 76, height: 52 }}
        initial={{ x: -12, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        {/* Top bar */}
        <div className="h-2.5 border-b flex items-center px-1.5 gap-1" style={{ borderColor: `${accent}20`, background: `${accent}10` }}>
          {[0, 1, 2].map((d) => (
            <div key={d} className="w-1 h-1 rounded-full" style={{ background: `${accent}${40 + d * 10}` }} />
          ))}
        </div>
        {/* Content */}
        <div className="flex gap-1 p-1.5 h-full">
          <div className="rounded-sm w-5 shrink-0" style={{ background: `${accent}18` }} />
          <div className="flex-1 flex flex-col gap-1">
            <div className="rounded-sm h-1.5 w-3/4" style={{ background: `${accent}30` }} />
            <div className="rounded-sm h-1 w-1/2" style={{ background: `${accent}18` }} />
            <div className="rounded-sm flex-1 mt-0.5" style={{ background: `${accent}10` }} />
          </div>
        </div>
      </motion.div>

      {/* Sync indicator */}
      <motion.div
        className="flex flex-col items-center gap-1 pb-2"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="w-3 h-3" style={{ color: `${accent}60` }} />
        <div className="text-[7px] font-mono" style={{ color: `${accent}40` }}>LIVE</div>
      </motion.div>

      {/* Mobile frame */}
      <motion.div
        className="rounded border overflow-hidden shrink-0"
        style={{ borderColor: `${accent}30`, background: `${accent}05`, width: 30, height: 52 }}
        initial={{ x: 12, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="h-2 flex items-center justify-center border-b" style={{ borderColor: `${accent}20`, background: `${accent}10` }}>
          <div className="w-3 h-0.5 rounded-full" style={{ background: `${accent}40` }} />
        </div>
        <div className="flex flex-col gap-1 p-1 h-full">
          <div className="rounded-sm h-1.5 w-full" style={{ background: `${accent}28` }} />
          <div className="rounded-sm h-1 w-2/3" style={{ background: `${accent}18` }} />
          <div className="rounded-sm flex-1" style={{ background: `${accent}10` }} />
          <div className="rounded-sm h-2 w-full" style={{ background: `${accent}22` }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Pillar Card ────────────────────────────────────── */

function PillarCard({
  pillar,
  index,
  isActive,
  onHover,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const Icon = pillar.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={fadeInUp}
      className="relative rounded-xl border overflow-hidden cursor-default transition-all duration-300 group card-inset-glow"
      style={{
        borderColor: isActive ? `${pillar.accent}38` : "rgba(255,255,255,0.06)",
        background: isActive ? pillar.accentDim : "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={() => onHover(pillar.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
    >
      {/* Radial cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(380px circle at ${mouse.x}px ${mouse.y}px, ${pillar.accent}12, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}50, transparent)` }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6 space-y-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg border flex items-center justify-center shrink-0"
              style={{ borderColor: `${pillar.accent}28`, background: `${pillar.accent}0e` }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: pillar.accent }} />
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.2em] mb-0.5" style={{ color: `${pillar.accent}55` }}>
                {pillar.number} · {pillar.subtitle.toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-white/90 leading-none">{pillar.title}</h3>
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-[12.5px] text-white/50 leading-relaxed">
          {pillar.description}
        </p>

        {/* ── Animated visual ── */}
        <div
          className="rounded-lg border p-3"
          style={{ borderColor: `${pillar.accent}12`, background: "rgba(0,0,0,0.28)" }}
        >
          {pillar.visual === "alpha" && <AlphaVisual accent={pillar.accent} />}
          {pillar.visual === "chain" && <ChainVisual accent={pillar.accent} />}
          {pillar.visual === "ui"    && <UIVisual    accent={pillar.accent} />}
        </div>

        {/* ── Business outcomes (replaces formulas) ── */}
        <div
          className="rounded-lg border p-3.5 space-y-2.5"
          style={{ borderColor: `${pillar.accent}14`, background: `${pillar.accent}05` }}
        >
          {pillar.outcomes.map((outcome, j) => (
            <div key={j} className="flex items-start gap-2.5">
              <div
                className="w-1 h-1 rounded-full mt-[6px] shrink-0"
                style={{ background: pillar.accent }}
              />
              <span className="text-[11.5px] text-white/58 leading-snug">{outcome}</span>
            </div>
          ))}
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-3 gap-2">
          {pillar.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border px-2 py-2 text-center"
              style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}
            >
              <div className="text-xs font-mono font-semibold font-tabular" style={{ color: pillar.accent }}>
                {m.value}
              </div>
              <div className="text-[8.5px] text-white/25 mt-0.5 font-mono tracking-wide">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5">
          {pillar.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[9px] font-mono tracking-wider h-auto py-0.5 px-2 rounded-full"
              style={{
                borderColor: `${pillar.accent}22`,
                color: `${pillar.accent}65`,
                background: `${pillar.accent}07`,
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────── */

export default function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="architecture" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-violet-500/35 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-6">
            INTELLIGENT INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white heading-section mb-4">
            Three Systems.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One Platform.
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Purpose-built layers working in concert — institutional-grade analytics without institutional-grade complexity.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={i + 1}
              isActive={activeId === pillar.id}
              onHover={setActiveId}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
