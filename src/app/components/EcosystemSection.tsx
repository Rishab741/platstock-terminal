"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Layout, ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const pillars = [
  {
    id: "alpha",
    number: "01",
    icon: Cpu,
    title: "Alpha Engine",
    subtitle: "Predictive Intelligence",
    accent: "#C9A24B",
    accentDim: "rgba(201,162,75,0.06)",
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
    accent: "#E8D3A0",
    accentDim: "rgba(232,211,160,0.05)",
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
    accent: "#C1613F",
    accentDim: "rgba(193,97,63,0.06)",
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
      {[0.25, 0.5, 0.75].map((pct) => (
        <div
          key={pct}
          className="absolute inset-x-0 pointer-events-none"
          style={{ bottom: `${pct * 100}%`, borderTop: `1px dashed ${accent}22` }}
        />
      ))}
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="relative flex-1 overflow-hidden"
          style={{ background: `${accent}14`, borderRadius: "1px" }}
          initial={{ height: 0 }}
          animate={{ height: `${h * 100}%` }}
          transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${accent}60, ${accent}20)` }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ delay: i * 0.1, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: accent }} />
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
            className="relative flex flex-col items-center justify-center px-2.5 py-1.5 gap-0.5"
            style={{
              border: `1px solid ${accent}30`,
              background: `${accent}07`,
              borderRadius: "2px",
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: n * 0.08 + 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="text-[7px] font-mono leading-none" style={{ color: "rgba(148,140,124,0.4)" }}>BLOCK</span>
            <span className="text-[9px] font-mono font-semibold leading-none" style={{ color: `${accent}90`, fontFamily: "var(--font-mono)" }}>
              #{hash}
            </span>
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
              style={{ background: n === nodes.length - 1 ? accent : `${accent}45` }}
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
                  style={{ background: `${accent}45` }}
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
      <motion.div
        className="overflow-hidden shrink-0"
        style={{
          border: `1px solid ${accent}28`,
          background: `${accent}05`,
          width: 76,
          height: 52,
          borderRadius: "2px",
        }}
        initial={{ x: -12, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div
          className="h-2.5 flex items-center px-1.5 gap-1"
          style={{ borderBottom: `1px solid ${accent}18`, background: `${accent}10` }}
        >
          {[0, 1, 2].map((d) => (
            <div key={d} className="w-1 h-1 rounded-full" style={{ background: `${accent}${40 + d * 10}` }} />
          ))}
        </div>
        <div className="flex gap-1 p-1.5 h-full">
          <div className="w-5 shrink-0" style={{ background: `${accent}16`, borderRadius: "1px" }} />
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-1.5 w-3/4" style={{ background: `${accent}28`, borderRadius: "1px" }} />
            <div className="h-1 w-1/2" style={{ background: `${accent}16`, borderRadius: "1px" }} />
            <div className="flex-1 mt-0.5" style={{ background: `${accent}10`, borderRadius: "1px" }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-1 pb-2"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="w-3 h-3" style={{ color: `${accent}55` }} />
        <div className="text-[7px]" style={{ fontFamily: "var(--font-mono)", color: `${accent}40` }}>LIVE</div>
      </motion.div>

      <motion.div
        className="overflow-hidden shrink-0"
        style={{
          border: `1px solid ${accent}28`,
          background: `${accent}05`,
          width: 30,
          height: 52,
          borderRadius: "2px",
        }}
        initial={{ x: 12, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div
          className="h-2 flex items-center justify-center"
          style={{ borderBottom: `1px solid ${accent}18`, background: `${accent}10` }}
        >
          <div className="w-3 h-0.5 rounded-full" style={{ background: `${accent}35` }} />
        </div>
        <div className="flex flex-col gap-1 p-1 h-full">
          <div className="h-1.5 w-full" style={{ background: `${accent}26`, borderRadius: "1px" }} />
          <div className="h-1 w-2/3" style={{ background: `${accent}16`, borderRadius: "1px" }} />
          <div className="flex-1" style={{ background: `${accent}10`, borderRadius: "1px" }} />
          <div className="h-2 w-full" style={{ background: `${accent}20`, borderRadius: "1px" }} />
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
      className="relative overflow-hidden cursor-default transition-all duration-300 group"
      style={{
        border: `1px solid ${isActive ? `${pillar.accent}35` : "#1B2334"}`,
        background: isActive ? pillar.accentDim : "#121826",
        borderRadius: "2px",
      }}
      onMouseEnter={() => onHover(pillar.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
    >
      {/* Radial cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, ${pillar.accent}0e, transparent 70%)`,
        }}
      />

      {/* Top accent line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: pillar.accent }}
        animate={{ opacity: isActive ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6 space-y-5">

        {/* ── Header ── */}
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{
              border: `1px solid ${pillar.accent}25`,
              background: `${pillar.accent}0a`,
              borderRadius: "2px",
            }}
          >
            <Icon className="w-4 h-4" style={{ color: pillar.accent }} />
          </div>
          <div>
            <div
              className="text-[9px] tracking-[0.2em] mb-0.5 uppercase"
              style={{ fontFamily: "var(--font-mono)", color: `${pillar.accent}55` }}
            >
              {pillar.number} · {pillar.subtitle}
            </div>
            <h3 className="text-[14px] font-medium leading-none" style={{ color: "#F4EFE4" }}>
              {pillar.title}
            </h3>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-[12.5px] leading-relaxed" style={{ color: "#948C7C" }}>
          {pillar.description}
        </p>

        {/* ── Animated visual ── */}
        <div
          className="p-3"
          style={{
            border: `1px solid ${pillar.accent}10`,
            background: "rgba(10,14,23,0.5)",
            borderRadius: "2px",
          }}
        >
          {pillar.visual === "alpha" && <AlphaVisual accent={pillar.accent} />}
          {pillar.visual === "chain" && <ChainVisual accent={pillar.accent} />}
          {pillar.visual === "ui"    && <UIVisual    accent={pillar.accent} />}
        </div>

        {/* ── Business outcomes ── */}
        <div
          className="p-3.5 space-y-2.5"
          style={{
            border: `1px solid ${pillar.accent}12`,
            background: `${pillar.accent}04`,
            borderRadius: "2px",
          }}
        >
          {pillar.outcomes.map((outcome, j) => (
            <div key={j} className="flex items-start gap-2.5">
              <div
                className="w-px h-3 mt-1 shrink-0"
                style={{ background: pillar.accent }}
              />
              <span className="text-[11.5px] leading-snug" style={{ color: "rgba(244,239,228,0.55)" }}>
                {outcome}
              </span>
            </div>
          ))}
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-3 gap-px overflow-hidden" style={{ border: "1px solid #1B2334", borderRadius: "2px" }}>
          {pillar.metrics.map((m, mi) => (
            <div
              key={m.label}
              className="px-2 py-2.5 text-center"
              style={{
                background: "#0A0E17",
                borderRight: mi < pillar.metrics.length - 1 ? "1px solid #1B2334" : "none",
              }}
            >
              <div
                className="text-xs font-semibold"
                style={{ fontFamily: "var(--font-mono)", color: pillar.accent }}
              >
                {m.value}
              </div>
              <div
                className="text-[8.5px] mt-0.5 tracking-wide"
                style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-wider px-2 py-0.5"
              style={{
                fontFamily: "var(--font-mono)",
                border: `1px solid ${pillar.accent}20`,
                color: `${pillar.accent}60`,
                background: `${pillar.accent}06`,
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1B2334, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1B2334, transparent)" }}
      />

      <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div
            className="inline-block border text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 mb-7"
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: "#1B2334",
              color: "#948C7C",
              borderRadius: "2px",
            }}
          >
            Intelligent Infrastructure
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              lineHeight: 1.1,
              color: "#F4EFE4",
            }}
          >
            Three Systems.{" "}
            <span style={{ fontStyle: "italic", color: "#C9A24B" }}>One Platform.</span>
          </h2>
          <p className="text-[14px] leading-relaxed max-w-lg" style={{ color: "#948C7C" }}>
            Purpose-built layers working in concert — institutional-grade analytics without institutional-grade complexity.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-4"
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
