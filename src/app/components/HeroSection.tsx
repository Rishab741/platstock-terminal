"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Shield, Zap, BarChart3 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const terminalLines = [
  { type: "cmd", text: "$ platstock init --mode=sovereign" },
  { type: "out", text: "Connecting to Alpha Engine..." },
  { type: "success", text: "✓ Monte Carlo engine [ONLINE]" },
  { type: "cmd", text: "$ fetch --portfolio=HEDGE_ALPHA_01" },
  { type: "out", text: "Calculating Sharpe ratios..." },
  { type: "data", text: "SR: 2.847  |  β: 0.312  |  α: 14.2%" },
  { type: "out", text: "Running behavioral profiling..." },
  { type: "success", text: "✓ Ledger hash verified [CHAIN #4821]" },
  { type: "data", text: "AUM: $847.3M  |  VaR(95%): -2.1%" },
  { type: "cmd", text: "$ run --simulation=10000" },
];

const metrics = [
  { label: "AUM TRACKED", value: "$2.4B+", delta: "+12.3%" },
  { label: "SHARPE RATIO", value: "2.847", delta: "+0.12" },
  { label: "PORTFOLIOS", value: "1,240", delta: "+89" },
  { label: "ALPHA SIGNAL", value: "14.2%", delta: "+2.1%" },
];

function TerminalMockup() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [metricIdx, setMetricIdx] = useState(0);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 800 : 300 + Math.random() * 200
      );
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIdx((i) => (i + 1) % metrics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case "cmd":
        return "text-cyan-400";
      case "success":
        return "text-emerald-400";
      case "data":
        return "text-violet-300";
      default:
        return "text-white/50";
    }
  };

  return (
    <div className="relative float-anim">
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-2xl blur-2xl" />
      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black/70 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="flex-1 text-center text-[10px] font-mono text-white/30 tracking-widest">
            PLATSTOCK TERMINAL · v2.1.4
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-pulse" />
            <span className="text-[9px] font-mono text-emerald-400/60">LIVE</span>
          </div>
        </div>

        <div className="p-4 font-mono text-xs space-y-1.5 min-h-[260px]">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${getLineColor(line.type)}`}
            >
              {line.type === "data" && (
                <span className="text-white/20 select-none">│</span>
              )}
              <span className="font-tabular">{line.text}</span>
              {i === visibleLines - 1 && visibleLines < terminalLines.length && (
                <span className="inline-block w-1.5 h-3.5 bg-cyan-400/80 animate-pulse ml-0.5" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] grid grid-cols-4 divide-x divide-white/[0.06]">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className={`px-3 py-2 text-center transition-colors duration-500 ${
                metricIdx === i ? "bg-cyan-500/5" : ""
              }`}
            >
              <div className="text-[9px] font-mono text-white/30 tracking-widest mb-0.5">
                {m.label}
              </div>
              <div className="text-sm font-mono font-semibold text-white/90 font-tabular number-flicker">
                {m.value}
              </div>
              <div className="text-[9px] font-mono text-emerald-400">
                {m.delta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadialGlow({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(76,29,149,0.18), transparent 70%)`,
      }}
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(76,29,149,0.25) 0%, transparent 60%)",
      }}
    >
      <RadialGlow x={mouse.x} y={mouse.y} />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-20 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[11px] font-mono tracking-widest text-cyan-400/80"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 glow-pulse" />
              AI-NATIVE CAPITAL TERMINAL
              <ChevronRight className="w-3 h-3 opacity-50" />
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight"
            >
              <span className="text-white">Democratizing</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the Wall Street
              </span>
              <br />
              <span className="text-white">Edge.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-base text-white/50 leading-relaxed max-w-lg"
            >
              An AI-Native B2B Capital Tracking & Portfolio Analytics Terminal
              productizing elite quantitative modeling and secure sovereign
              infrastructure built for boutique hedge funds and family offices.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.10] bg-transparent text-sm font-semibold text-white/65 tracking-wide hover:border-violet-500/40 hover:bg-violet-500/[0.05] hover:text-white hover:shadow-[0_0_22px_rgba(124,58,237,0.14)] transition-all duration-300"
              >
                Request Terminal Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <a
                href="#architecture"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.07] bg-transparent text-sm font-medium text-white/40 hover:border-white/[0.15] hover:text-white/70 transition-all duration-300"
              >
                View Architecture
                <ChevronRight className="w-4 h-4 text-white/25 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-6 pt-2"
            >
              {[
                { icon: Shield, label: "Hash-Chained Ledger" },
                { icon: Zap, label: "Monte Carlo Engine" },
                { icon: BarChart3, label: "Live Alpha Profiling" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] text-white/30"
                >
                  <Icon className="w-3 h-3 text-cyan-400/60" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <TerminalMockup />
          </motion.div>
        </div>

        <motion.div
          custom={5}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]"
        >
          {[
            { label: "Simulation Paths", value: "10K+", sub: "Monte Carlo Engine" },
            {
              label: "Quant Models",
              value: "3",
              sub: "Monte Carlo · Sharpe · VaR",
            },
            { label: "Infrastructure", value: "SOC2", sub: "Architecture Ready" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-black/40 px-6 py-5 text-center hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-2xl font-bold font-mono text-white font-tabular">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-white/30 mt-1 uppercase">
                {stat.label}
              </div>
              <div className="text-[9px] text-white/20 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
