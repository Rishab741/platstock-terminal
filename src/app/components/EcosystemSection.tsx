"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Layout, ChevronRight } from "lucide-react";

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
    title: "The Alpha Engine",
    subtitle: "Quantitative Execution Layer",
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.12)",
    tags: ["FastAPI", "Python", "Monte Carlo", "Async"],
    description:
      "Asynchronous FastAPI microservice executes 10,000 Monte Carlo simulation paths per request. Decoupled from the UI layer for zero-latency portfolio analytics.",
    formula: "SR = (Rp − Rf) / σp",
    formulaSub: "Sharpe Ratio · Live calculation",
    metrics: [
      { label: "Simulations", value: "10,000" },
      { label: "Latency", value: "<50ms" },
      { label: "Models", value: "3 Active" },
    ],
    visual: "alpha",
  },
  {
    id: "sovereign",
    number: "02",
    icon: Database,
    title: "Sovereign Data",
    subtitle: "Cryptographic Infrastructure",
    accent: "#7c3aed",
    accentDim: "rgba(124,58,237,0.12)",
    tags: ["Postgres", "Supabase", "Deno Edge", "Hash Chain"],
    description:
      "Postgres + Supabase foundation with a server-side Hash-Chained Ledger. Every record is cryptographically anchored to the previous. Deno Edge functions profile behavioral anomalies in real-time.",
    formula: "H(n) = SHA256(H(n-1) ∥ Tn)",
    formulaSub: "Hash Chain · Immutable audit trail",
    metrics: [
      { label: "Chain Length", value: "#4,821" },
      { label: "Integrity", value: "100%" },
      { label: "Audit", value: "Real-time" },
    ],
    visual: "chain",
  },
  {
    id: "ui",
    number: "03",
    icon: Layout,
    title: "Unified UI Layer",
    subtitle: "Cross-Platform Terminal",
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.12)",
    tags: ["Next.js", "React Native", "Expo", "Tailwind"],
    description:
      "Next.js analytical desktop terminals pair with a React Native / Expo mobile companion. One data layer, two form factors delivering institutional-grade UX on every screen.",
    formula: "Desktop ↔ Mobile",
    formulaSub: "Seamless state sync across platforms",
    metrics: [
      { label: "Platforms", value: "Web + iOS" },
      { label: "FCP", value: "<1.2s" },
      { label: "Sync", value: "Live" },
    ],
    visual: "ui",
  },
];

function AlphaVisual({ accent }: { accent: string }) {
  const bars = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.45, 0.75, 0.6, 0.85];
  return (
    <div className="h-24 flex items-end gap-1 px-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          style={{ background: `${accent}30` }}
          initial={{ height: 0 }}
          animate={{ height: `${h * 100}%` }}
          transition={{
            delay: i * 0.05,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <motion.div
            className="w-full rounded-sm"
            style={{
              height: "100%",
              background: `linear-gradient(to top, ${accent}60, ${accent}20)`,
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ChainVisual({ accent }: { accent: string }) {
  const nodes = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="flex items-center justify-center gap-0 py-4">
      {nodes.map((n) => (
        <div key={n} className="flex items-center">
          <motion.div
            className="relative w-12 h-8 rounded border flex items-center justify-center"
            style={{
              borderColor: `${accent}40`,
              background: `${accent}08`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: n * 0.1 + 0.3 }}
          >
            <span className="text-[8px] font-mono" style={{ color: `${accent}80` }}>
              #{4817 + n}
            </span>
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{ background: accent }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ delay: n * 0.2, duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          {n < nodes.length - 1 && (
            <div
              className="chain-line h-px"
              style={{
                width: "16px",
                background: `linear-gradient(90deg, ${accent}60, ${accent}20)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function UIVisual({ accent }: { accent: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <motion.div
        className="rounded border p-2"
        style={{ borderColor: `${accent}30`, background: `${accent}05` }}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-16 h-10 flex flex-col gap-1">
          <div className="h-1.5 rounded-sm w-full" style={{ background: `${accent}40` }} />
          <div className="flex gap-1 flex-1">
            <div className="w-5 rounded-sm" style={{ background: `${accent}20` }} />
            <div className="flex-1 rounded-sm" style={{ background: `${accent}10` }} />
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ color: `${accent}60` }}
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.div>
      <motion.div
        className="rounded border p-2"
        style={{ borderColor: `${accent}30`, background: `${accent}05` }}
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-8 h-14 flex flex-col gap-1">
          <div className="h-1 rounded-sm" style={{ background: `${accent}40`, width: "60%" }} />
          <div className="flex-1 rounded-sm" style={{ background: `${accent}10` }} />
          <div className="h-1.5 rounded-sm w-full" style={{ background: `${accent}30` }} />
        </div>
      </motion.div>
    </div>
  );
}

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
    if (rect) {
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={fadeInUp}
      className="relative rounded-xl border overflow-hidden cursor-default transition-all duration-300 group"
      style={{
        borderColor: isActive
          ? `${pillar.accent}40`
          : "rgba(255,255,255,0.06)",
        background: isActive ? pillar.accentDim : "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={() => onHover(pillar.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, ${pillar.accent}15, transparent 70%)`,
        }}
      />

      <div className="relative p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg border flex items-center justify-center"
              style={{
                borderColor: `${pillar.accent}30`,
                background: `${pillar.accent}10`,
              }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: pillar.accent }} />
            </div>
            <div>
              <div
                className="text-xs font-mono tracking-widest"
                style={{ color: `${pillar.accent}60` }}
              >
                {pillar.number} / LAYER
              </div>
              <h3 className="text-sm font-semibold text-white/90">
                {pillar.title}
              </h3>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border p-3"
          style={{
            borderColor: `${pillar.accent}15`,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {pillar.visual === "alpha" && <AlphaVisual accent={pillar.accent} />}
          {pillar.visual === "chain" && <ChainVisual accent={pillar.accent} />}
          {pillar.visual === "ui" && <UIVisual accent={pillar.accent} />}
        </div>

        <div
          className="rounded-lg border p-3 font-mono"
          style={{
            borderColor: `${pillar.accent}20`,
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="text-sm font-semibold"
            style={{ color: pillar.accent }}
          >
            {pillar.formula}
          </div>
          <div className="text-[10px] text-white/30 mt-0.5">
            {pillar.formulaSub}
          </div>
        </div>

        <p className="text-xs text-white/45 leading-relaxed">
          {pillar.description}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {pillar.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border px-2 py-2 text-center"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="text-xs font-mono font-semibold font-tabular"
                style={{ color: pillar.accent }}
              >
                {m.value}
              </div>
              <div className="text-[9px] text-white/25 mt-0.5 font-mono">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full border tracking-wider"
              style={{
                borderColor: `${pillar.accent}25`,
                color: `${pillar.accent}70`,
                background: `${pillar.accent}08`,
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

export default function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="architecture" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-6">
            THREE-TIER ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            The Interactive{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ecosystem
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Three precision-engineered layers that work in concert to deliver institutional-grade analytics at startup velocity.
          </p>
        </motion.div>

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
