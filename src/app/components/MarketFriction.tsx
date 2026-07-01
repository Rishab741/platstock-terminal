"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, CheckCircle2, Lock, Eye, Clock } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
            Systemic Constraints
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                className="mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  lineHeight: 1.1,
                  color: "#F4EFE4",
                }}
              >
                The Legacy Paradigm{" "}
                <span style={{ fontStyle: "italic", color: "#C9A24B" }}>
                  Is Broken
                </span>
              </h2>
              <p className="text-[14px] leading-relaxed max-w-md" style={{ color: "#948C7C" }}>
                Three structural failures holding back the next generation of fund managers — and precisely how Platstock resolves each one.
              </p>
            </div>

            {/* Summary strip */}
            <div className="flex items-center gap-px shrink-0 overflow-hidden" style={{ border: "1px solid #1B2334", borderRadius: "2px" }}>
              {[
                { value: "3", label: "Failures Solved" },
                { value: "1", label: "Platform" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="px-5 py-3 text-center"
                  style={{
                    background: "#121826",
                    borderRight: i === 0 ? "1px solid #1B2334" : "none",
                  }}
                >
                  <div
                    className="text-lg"
                    style={{ fontFamily: "var(--font-mono)", color: "#E8D3A0" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[9px] tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Friction cards ── */}
        <div className="space-y-px">
          {frictions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="overflow-hidden"
                style={{ border: "1px solid #1B2334" }}
              >
                <div className="grid lg:grid-cols-[64px_1fr_1fr]">

                  {/* ── Index column ── */}
                  <div
                    className="flex flex-col items-center justify-center px-4 py-6 border-b lg:border-b-0 lg:border-r"
                    style={{ background: "#121826", borderColor: "#1B2334" }}
                  >
                    <Icon className="w-4 h-4 mb-2" style={{ color: "#948C7C" }} />
                    <span
                      className="text-[9px] tracking-widest"
                      style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.4)" }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* ── Legacy column ── */}
                  <div
                    className="p-6 border-b lg:border-b-0 lg:border-r"
                    style={{ background: "rgba(193,97,63,0.025)", borderColor: "#1B2334" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="flex items-center justify-center w-5 h-5"
                        style={{
                          border: "1px solid rgba(193,97,63,0.3)",
                          background: "rgba(193,97,63,0.08)",
                          borderRadius: "2px",
                        }}
                      >
                        <X className="w-2.5 h-2.5" style={{ color: "rgba(193,97,63,0.7)" }} />
                      </div>
                      <span
                        className="text-[9px] tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-mono)", color: "rgba(193,97,63,0.45)" }}
                      >
                        {item.legacy.tag}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium leading-snug mb-2" style={{ color: "rgba(244,239,228,0.5)" }}>
                      {item.legacy.headline}
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "#948C7C" }}>
                      {item.legacy.body}
                    </p>
                  </div>

                  {/* ── Platstock column ── */}
                  <div
                    className="p-6"
                    style={{ background: "rgba(201,162,75,0.025)" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="flex items-center justify-center w-5 h-5"
                        style={{
                          border: "1px solid rgba(201,162,75,0.3)",
                          background: "rgba(201,162,75,0.08)",
                          borderRadius: "2px",
                        }}
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "#C9A24B" }} />
                      </div>
                      <span
                        className="text-[9px] tracking-widest uppercase"
                        style={{ fontFamily: "var(--font-mono)", color: "rgba(201,162,75,0.55)" }}
                      >
                        {item.platstock.tag}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium leading-snug mb-2" style={{ color: "#F4EFE4" }}>
                      {item.platstock.headline}
                    </p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "#948C7C" }}>
                      {item.platstock.body}
                    </p>
                  </div>

                </div>

                {/* ── Bottom label strip ── */}
                <div
                  className="px-6 py-2 flex items-center gap-3"
                  style={{ background: "#121826", borderTop: "1px solid #1B2334" }}
                >
                  <span
                    className="text-[9px] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.35)" }}
                  >
                    {item.title}
                  </span>
                  <div className="h-px flex-1" style={{ background: "#1B2334" }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
