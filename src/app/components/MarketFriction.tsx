"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, CheckCircle2, Lock, Eye, Clock } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
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
    title: "Information Asymmetry",
    legacy: "Cost-prohibitive licensing locks elite quant tools behind $50K+/yr institutional paywalls, inaccessible to emerging funds.",
    platstock: "Full quantitative modeling suite at enterprise SaaS pricing. Monte Carlo, Sharpe, and VaR all included in the terminal.",
    legacyLabel: "Bloomberg / FactSet",
    platLabel: "Platstock Terminal",
  },
  {
    icon: Eye,
    title: "Audit Trail Opacity",
    legacy: "Standard relational databases offer zero cryptographic verification, leaving every trade record mutable, unverifiable, and legally exposed.",
    platstock: "Hash-chained sovereign ledger with Deno Edge behavioral profiling. Every transaction cryptographically anchored and immutable.",
    legacyLabel: "Opaque SQL Tables",
    platLabel: "Cryptographic Ledger",
  },
  {
    icon: Clock,
    title: "Retrospective Inaction",
    legacy: "Legacy tools display historical returns. They cannot model forward-looking scenarios or fire proactive risk alerts in real-time.",
    platstock: "Asynchronous FastAPI microservice runs 10,000 Monte Carlo paths on demand. Forward projections update live with every data tick.",
    legacyLabel: "Rear-View Analytics",
    platLabel: "Predictive Alpha Engine",
  },
];

export default function MarketFriction() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="friction"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 60px)`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-900/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-[11px] font-mono tracking-widest text-red-400/70 mb-6">
            SYSTEMIC CONSTRAINTS IDENTIFIED
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
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
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Three structural failures holding back the next generation of fund managers, and precisely how Platstock resolves each one.
          </p>
        </motion.div>

        <div className="space-y-6">
          {frictions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group grid lg:grid-cols-[auto_1fr_1fr] gap-0 rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
              >
                <div className="flex items-center justify-center px-8 py-6 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-black/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/40" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase max-w-[100px]">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/[0.04] bg-red-500/[0.02]">
                  <div className="flex items-center gap-2 mb-3">
                    <X className="w-3.5 h-3.5 text-red-500/70 flex-shrink-0" />
                    <span className="text-[10px] font-mono tracking-widest text-red-400/50 uppercase">
                      {item.legacyLabel}
                    </span>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.legacy}
                  </p>
                </div>

                <div className="p-6 bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.04] transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70 flex-shrink-0" />
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400/50 uppercase">
                      {item.platLabel}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.platstock}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
