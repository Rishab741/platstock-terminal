"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Type system
   Fraunces  — display serif, soft/humanist, carries the "art"
   Inter     — body, quiet workhorse
   Plex Mono — ledger figures, the product's data voice
   ───────────────────────────────────────────────────────── */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ─────────────────────────────────────────────────────────
   Palette (token reference, used inline throughout)
   --ink-950   #0A0E17   page
   --ink-900   #121826   panels
   --ink-800   #1B2334   hairlines
   --gold-400  #C9A24B   primary accent (brass)
   --gold-200  #E8D3A0   accent, light
   --ivory-100 #F4EFE4   primary text
   --warm-500  #948C7C   secondary text
   --ember-500 #C1613F   single rare highlight
   ───────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.11, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* Ledger data — every figure traces back to the product, nothing invented */
const ledger = [
  { n: "01", label: "Simulated paths", value: "10,000", unit: "per request" },
  { n: "02", label: "Engine latency", value: "<50ms", unit: "avg response" },
  { n: "03", label: "Ledger integrity", value: "SHA-256", unit: "hash-chained" },
  { n: "04", label: "Architecture", value: "SOC 2", unit: "compliant design" },
];

function PossibilityField() {
  const faintPaths = [
    "M70,300 C250,285 500,140 648,88",
    "M70,300 C250,288 500,165 648,120",
    "M70,300 C250,291 500,192 648,152",
    "M70,300 C250,295 500,236 648,210",
    "M70,300 C250,297 500,256 648,236",
    "M70,300 C250,299 500,274 648,263",
    "M70,300 C250,300 500,287 648,284",
    "M70,300 C250,300 500,300 648,300",
    "M70,300 C250,301 500,316 648,327",
    "M70,300 C250,303 500,332 648,352",
    "M70,300 C250,306 500,358 648,390",
    "M70,300 C250,309 500,380 648,425",
    "M70,300 C250,312 500,408 648,442",
  ];
  const emphasisPath = "M70,300 C250,293 500,218 648,183";
  const bandOuter = "M70,300 C250,288 500,165 648,120 L648,352 C500,332 250,303 70,300 Z";
  const bandInner = "M70,300 C250,293 500,218 648,183 L648,284 C500,287 250,300 70,300 Z";

  const yLabels = [
    { y: 88,  label: "+40%" },
    { y: 141, label: "+30%" },
    { y: 194, label: "+20%" },
    { y: 247, label: "+10%" },
    { y: 300, label: "  0%" },
    { y: 353, label: "−10%" },
    { y: 406, label: "−20%" },
    { y: 459, label: "−30%" },
  ];
  const xLabels = [
    { x: 70,  label: "Today"  },
    { x: 237, label: "Q3 '26" },
    { x: 404, label: "Q4 '26" },
    { x: 571, label: "Q1 '27" },
    { x: 648, label: "Q2 '27" },
  ];
  const footerMetrics = [
    { label: "PATHS",      value: "10,000" },
    { label: "CONFIDENCE", value: "80%"    },
    { label: "SHARPE",     value: "1.84"   },
    { label: "CVaR 95%",   value: "−8.4%"  },
  ];

  return (
    <div className="w-full" style={{ borderRadius: "2px", overflow: "hidden" }}>

      {/* Terminal header */}
      <div style={{
        background: "#0C1420", border: "1px solid #1B2334", borderBottom: "none",
        padding: "9px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["#1B2334", "#1B2334", "rgba(201,162,75,0.3)"] as string[]).map((bg, i) => (
              <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: bg }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#948C7C", letterSpacing: "0.16em" }}>
            ALPHA ENGINE · MONTE CARLO SIMULATION
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <motion.span
            className="inline-block"
            style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A24B" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(148,140,124,0.5)", letterSpacing: "0.14em" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Chart */}
      <svg
        viewBox="0 0 680 492" fill="none"
        style={{ display: "block", width: "100%", background: "#0A0E17", border: "1px solid #1B2334", borderTop: "none", borderBottom: "none" }}
        role="img"
        aria-label="Monte Carlo simulation: 10,000 portfolio paths"
      >
        {/* Horizontal grid */}
        {[88, 141, 194, 247, 353, 406, 459].map((y) => (
          <line key={y} x1="58" y1={y} x2="654" y2={y} stroke="#1B2334" strokeWidth="0.5" />
        ))}
        {/* Vertical quarter marks */}
        {[237, 404, 571].map((x) => (
          <line key={x} x1={x} y1="44" x2={x} y2="464" stroke="#1B2334" strokeWidth="0.5" strokeDasharray="2 5" />
        ))}
        {/* Axes */}
        <line x1="58" y1="44"  x2="58"  y2="464" stroke="#1B2334" strokeWidth="0.75" />
        <line x1="58" y1="464" x2="654" y2="464" stroke="#1B2334" strokeWidth="0.75" />
        {/* Zero line */}
        <line x1="58" y1="300" x2="654" y2="300" stroke="rgba(148,140,124,0.15)" strokeWidth="0.8" />

        {/* Y-axis labels + ticks */}
        {yLabels.map(({ y, label }) => (
          <g key={y}>
            <text x="4" y={y + 4} fill="#948C7C" fillOpacity="0.4" style={{ font: "9px var(--font-mono)" }}>{label}</text>
            <line x1="54" y1={y} x2="58" y2={y} stroke="#1B2334" strokeWidth="0.8" />
          </g>
        ))}
        {/* X-axis labels + ticks */}
        {xLabels.map(({ x, label }) => (
          <g key={x}>
            <text x={x} y="480" fill="#948C7C" fillOpacity="0.4" style={{ font: "9px var(--font-mono)" }} textAnchor="middle">{label}</text>
            <line x1={x} y1="464" x2={x} y2="469" stroke="#1B2334" strokeWidth="0.8" />
          </g>
        ))}

        {/* Confidence bands */}
        <path d={bandOuter} fill="rgba(201,162,75,0.025)" />
        <path d={bandInner} fill="rgba(201,162,75,0.05)" />

        {/* Right-edge range bracket */}
        <line x1="652" y1="120" x2="652" y2="352" stroke="rgba(201,162,75,0.15)" strokeWidth="0.75" />
        <line x1="649" y1="120" x2="656" y2="120" stroke="rgba(201,162,75,0.2)"  strokeWidth="0.75" />
        <line x1="649" y1="352" x2="656" y2="352" stroke="rgba(193,97,63,0.2)"   strokeWidth="0.75" />

        {/* 80% band label */}
        <motion.text x="390" y="112" fill="#C9A24B" style={{ font: "7.5px var(--font-mono)", letterSpacing: "0.12em" }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.28 }} transition={{ delay: 2.8, duration: 0.8 }}>
          80% CONFIDENCE BAND
        </motion.text>

        {/* Faint paths */}
        {faintPaths.map((d, i) => (
          <motion.path key={i} d={d} fill="none"
            stroke={i >= 8 ? "#C1613F" : "#948C7C"}
            strokeOpacity={i >= 8 ? 0.2 : 0.22}
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: i >= 8 ? 0.2 : 0.22 }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Optimal path */}
        <motion.path d={emphasisPath} stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Origin */}
        <circle cx="70" cy="300" r="2.5" fill="#E8D3A0" />
        <circle cx="70" cy="300" r="8" stroke="#E8D3A0" strokeOpacity="0.2" strokeWidth="0.75" fill="none" />
        <text x="70" y="315" fill="#948C7C" fillOpacity="0.45" style={{ font: "8px var(--font-mono)" }} textAnchor="middle">TODAY</text>

        {/* Optimal endpoint */}
        <motion.circle cx="648" cy="183" r="3" fill="#C9A24B"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.5 }} />
        <motion.circle cx="648" cy="183" r="8" stroke="#C9A24B" strokeOpacity="0.2" strokeWidth="0.75" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 0.5 }} />

        {/* Crosshair at endpoint */}
        <motion.line x1="648" y1="44" x2="648" y2="183" stroke="#C9A24B" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.5 }} />
        <motion.line x1="58" y1="183" x2="648" y2="183" stroke="#C9A24B" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.5 }} />

        {/* Annotation: Optimal */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.5 }}>
          <rect x="490" y="153" width="108" height="22" fill="#121826" stroke="rgba(201,162,75,0.3)" strokeWidth="0.75" />
          <text x="498" y="168" fill="#C9A24B" style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.03em" }}>OPT +22.4%</text>
        </motion.g>

        {/* Annotation: VaR */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.5 }}>
          <rect x="480" y="358" width="100" height="22" fill="#121826" stroke="rgba(193,97,63,0.25)" strokeWidth="0.75" />
          <text x="488" y="373" fill="rgba(193,97,63,0.75)" style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.03em" }}>VaR −8.4%</text>
        </motion.g>

        {/* Annotation: Sharpe */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.5 }}>
          <rect x="96" y="56" width="104" height="22" fill="#121826" stroke="rgba(201,162,75,0.2)" strokeWidth="0.75" />
          <text x="104" y="71" fill="#948C7C" style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.03em" }}>SHARPE 1.84</text>
        </motion.g>
      </svg>

      {/* Footer metrics */}
      <div style={{
        background: "#0C1420", border: "1px solid #1B2334", borderTop: "none",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      }}>
        {footerMetrics.map(({ label, value }, i) => (
          <div key={label} style={{ padding: "11px 0", textAlign: "center", borderRight: i < 3 ? "1px solid #1B2334" : "none" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "7.5px", color: "#948C7C", opacity: 0.5, letterSpacing: "0.16em", marginBottom: "3px" }}>
              {label}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#E8D3A0" }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} relative min-h-[100svh] overflow-hidden`}
      style={{ background: "#0A0E17", fontFamily: "var(--font-body)" }}
    >
      {/* Ambient wash that follows the cursor, warm not neon */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(560px circle at ${mouse.x}% ${mouse.y}%, rgba(201,162,75,0.06), transparent 70%)`,
        }}
      />
      {/* Faint star-field texture, hand-placed not systematic */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #948C7C 100%, transparent), radial-gradient(1px 1px at 78% 24%, #948C7C 100%, transparent), radial-gradient(1px 1px at 34% 62%, #948C7C 100%, transparent), radial-gradient(1px 1px at 88% 68%, #948C7C 100%, transparent), radial-gradient(1px 1px at 60% 12%, #948C7C 100%, transparent), radial-gradient(1px 1px at 22% 84%, #948C7C 100%, transparent)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 max-w-[1240px] mx-auto px-8 lg:px-12 py-7 flex items-center justify-between">
        <span
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          className="text-[19px] text-[#F4EFE4] tracking-tight"
        >
          Platstock
        </span>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
          className="inline-flex items-center gap-1.5 text-[13px] text-[#E8D3A0]/80 hover:text-[#E8D3A0] transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Request access <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-8 lg:px-12 pt-8 pb-20 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {/* Left — the thesis */}
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[11px] tracking-[0.22em] uppercase text-[#948C7C] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Private beta — design partner program
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#F4EFE4] mb-7"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2.6rem, 4.2vw, 4rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
            }}
          >
            Every fund manages risk.
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#C9A24B" }}>
              Few can see it clearly.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[15.5px] leading-[1.85] text-[#948C7C] max-w-[440px] mb-10"
          >
            Platstock runs ten thousand simulated futures for every portfolio you hold,
            then writes what it finds into a ledger no one can quietly edit. It's the
            instrument boutique funds and family offices use to navigate by, not just
            report from.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-6 mb-14"
          >
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
              className="group inline-flex items-center gap-2 px-6 py-3 text-[13.5px] font-medium transition-all duration-300 cursor-pointer"
              style={{ background: "#C9A24B", color: "#0A0E17", borderRadius: "3px" }}
            >
              Request terminal access
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a
              href="#architecture"
              className="text-[13.5px] text-[#F4EFE4]/60 hover:text-[#F4EFE4] transition-colors border-b border-[#948C7C]/30 hover:border-[#E8D3A0]/60 pb-0.5"
            >
              Read how the engine works
            </a>
          </motion.div>

          {/* Ledger strip — replaces the generic stat-card grid */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <div className="h-px bg-gradient-to-r from-[#1B2334] via-[#1B2334] to-transparent mb-1" />
            {ledger.map((row) => (
              <div
                key={row.n}
                className="flex items-baseline gap-4 py-3 border-b border-[#1B2334] group"
              >
                <span
                  className="text-[10px] text-[#948C7C]/50 w-5 shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {row.n}
                </span>
                <span className="text-[13px] text-[#948C7C] flex-1">{row.label}</span>
                <span
                  className="text-[14px] text-[#E8D3A0] group-hover:text-[#F4EFE4] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {row.value}
                </span>
                <span className="text-[10.5px] text-[#948C7C]/45 hidden sm:inline">{row.unit}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — the signature illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative"
        >
          <PossibilityField />
        </motion.div>
      </div>

      {/* Footer hairline */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-8 lg:px-12 pb-8 flex items-center justify-between text-[11px] text-[#948C7C]/40" style={{ fontFamily: "var(--font-mono)" }}>
        <span>© 2026 Platstock Institutional</span>
        <span>Early access open · No credit card required</span>
      </div>
    </section>
  );
}