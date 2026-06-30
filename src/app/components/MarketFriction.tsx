"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, CheckCircle2, Lock, Eye, Clock } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const frictions = [
  {
    icon: Lock,
    label: "01",
    title: "Information Asymmetry",
    legacy: {
      tag: "Bloomberg / FactSet",
      headline: "Locked behind $50K+/yr institutional paywalls",
      body: "Elite quant tools have always been the exclusive province of the largest funds. Emerging managers are priced out before they can even compete.",
    },
    platstock: {
      tag: "Platstock Terminal",
      headline: "Full modeling suite at enterprise SaaS pricing",
      body: "Monte Carlo, Sharpe ratio, and VaR — every model included. The same analytical depth, accessible to any fund with the ambition to use it.",
    },
  },
  {
    icon: Eye,
    label: "02",
    title: "Audit Trail Opacity",
    legacy: {
      tag: "Opaque SQL Tables",
      headline: "Zero cryptographic verification on every record",
      body: "Standard databases are inherently mutable. Any trade record can be altered, deleted, or overwritten — and there is no way to prove otherwise.",
    },
    platstock: {
      tag: "Cryptographic Ledger",
      headline: "Every transaction permanently sealed and chained",
      body: "Hash-chained sovereign ledger with edge behavioral profiling. Each record is cryptographically anchored to the previous — immutable by design.",
    },
  },
  {
    icon: Clock,
    label: "03",
    title: "Retrospective Inaction",
    legacy: {
      tag: "Rear-View Analytics",
      headline: "Tools that explain losses, not prevent them",
      body: "Legacy platforms surface historical returns with precision. What they cannot do is model forward risk or fire an alert before the position moves against you.",
    },
    platstock: {
      tag: "Predictive Alpha Engine",
      headline: "10,000 scenarios per request, updating live",
      body: "Asynchronous simulation engine runs forward projections on demand. Know what your portfolio looks like under stress before the market reveals it.",
    },
  },
];

export default function MarketFriction() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="friction" ref={ref} className="relative py-32 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-900/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-[11px] font-mono tracking-widest text-red-400/70 mb-6">
            SYSTEMIC CONSTRAINTS
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white heading-section mb-3">
                The Legacy Paradigm{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Is Broken
                </span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                Three structural failures holding back the next generation of fund managers — and precisely how Platstock resolves each one.
              </p>
            </div>
            {/* Summary pill */}
            <div className="flex items-center gap-3 shrink-0 pb-0.5">
              {[
                { value: "3", label: "Failures Solved" },
                { value: "1", label: "Platform" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-4 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-center"
                >
                  <div className="text-lg font-bold font-mono text-white/75">{s.value}</div>
                  <div className="text-[9px] font-mono tracking-widest text-white/25 uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Friction cards ── */}
        <div className="space-y-4">
          {frictions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.10] transition-all duration-300 card-inset-glow"
              >
                <div className="grid lg:grid-cols-[72px_1fr_1fr]">

                  {/* ── Index column ── */}
                  <div
                    className="flex flex-col items-center justify-center px-4 py-6 border-b lg:border-b-0 lg:border-r border-white/[0.05]"
                    style={{ background: "rgba(255,255,255,0.015)" }}
                  >
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] bg-black/30 flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-white/35" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-white/20">{item.label}</span>
                  </div>

                  {/* ── Legacy column ── */}
                  <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/[0.04]" style={{ background: "rgba(239,68,68,0.018)" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20">
                        <X className="w-2.5 h-2.5 text-red-500/70" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-red-400/45 uppercase">{item.legacy.tag}</span>
                    </div>
                    <p className="text-sm font-medium text-white/55 leading-snug mb-2">
                      {item.legacy.headline}
                    </p>
                    <p className="text-xs text-white/30 leading-relaxed">
                      {item.legacy.body}
                    </p>
                  </div>

                  {/* ── Platstock column ── */}
                  <div
                    className="p-6 transition-colors duration-300"
                    style={{ background: "rgba(16,185,129,0.018)" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400/80" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-emerald-400/50 uppercase">{item.platstock.tag}</span>
                    </div>
                    <p className="text-sm font-medium text-white/75 leading-snug mb-2">
                      {item.platstock.headline}
                    </p>
                    <p className="text-xs text-white/45 leading-relaxed">
                      {item.platstock.body}
                    </p>
                  </div>

                </div>

                {/* ── Bottom label strip ── */}
                <div
                  className="px-6 py-2.5 border-t border-white/[0.04] flex items-center gap-3"
                  style={{ background: "rgba(255,255,255,0.008)" }}
                >
                  <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">{item.title}</span>
                  <div className="h-px flex-1 bg-white/[0.04]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
