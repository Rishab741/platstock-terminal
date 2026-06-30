"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const metrics = [
  { value: "3+", label: "Quant Models", sub: "Monte Carlo · Sharpe · VaR" },
  { value: "10,000", label: "Monte Carlo Paths", sub: "Per simulation request" },
  { value: "<50ms", label: "Alpha Engine Latency", sub: "P99 response time" },
  { value: "100%", label: "Data Sovereignty", sub: "You own your data" },
  { value: "4×", label: "Defensibility Layers", sub: "Quant · Ledger · AI · UI" },
  { value: "SOC2", label: "Audit-Ready", sub: "Type I in progress" },
];

const stack = [
  "Next.js 16",
  "FastAPI",
  "Supabase",
  "Deno Edge",
  "Python",
  "React Native",
  "PostgreSQL",
  "Monte Carlo",
];

export default function SocialProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-mono tracking-[0.25em] text-white/25 uppercase">
            Built for precision · Designed for institutional scale
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-[#030303] px-5 py-5 text-center hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors duration-300 font-tabular">
                {m.value}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-white/40 mt-1 uppercase">
                {m.label}
              </div>
              <div className="text-[9px] text-white/20 mt-0.5 hidden sm:block">
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="my-10 flex items-center gap-4">
          <Separator className="flex-1 bg-white/[0.05]" />
          <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase whitespace-nowrap">
            Sovereign stack
          </span>
          <Separator className="flex-1 bg-white/[0.05]" />
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {stack.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
              className="text-[11px] font-mono tracking-widest text-white/20 hover:text-white/50 transition-colors duration-200 cursor-default"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
