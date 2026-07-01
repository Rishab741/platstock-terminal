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

/* ─────────────────────────────────────────────────────────
   Signature illustration — "the possibility field"
   One origin point (today), many hand-charted futures fanning
   outward — the visual language of a Monte Carlo simulation
   redrawn as a navigator's chart rather than a dashboard.
   ───────────────────────────────────────────────────────── */
function PossibilityField() {
  const paths = [
    "M40,430 C160,410 260,300 420,260 C560,225 640,150 700,70",
    "M40,430 C170,420 280,340 400,310 C540,275 630,220 700,150",
    "M40,430 C165,425 270,370 390,355 C530,335 620,300 700,250",
    "M40,430 C160,432 260,410 380,405 C520,398 610,380 700,345",
    "M40,430 C160,434 265,432 385,432 C520,432 610,428 700,420",
    "M40,430 C165,436 270,450 385,458 C520,468 610,478 700,490",
    "M40,430 C165,440 270,465 385,485 C520,508 605,535 700,565",
    "M40,430 C160,448 250,500 380,540 C510,580 605,610 700,650",
  ];
  const emphasis = "M40,430 C165,420 270,355 390,335 C530,310 620,270 700,220";

  return (
    <svg viewBox="0 0 740 700" fill="none" className="w-full h-auto max-h-[560px]" role="img" aria-label="Illustration of many simulated portfolio paths fanning out from a single point, like a hand-charted map of possible futures">
      <circle cx="40" cy="430" r="3.5" fill="#E8D3A0" />
      <circle cx="40" cy="430" r="9" stroke="#E8D3A0" strokeOpacity="0.35" />
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#948C7C"
          strokeOpacity={0.28}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.28 }}
          transition={{ duration: 1.8, delay: 0.5 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.path
        d={emphasis}
        stroke="#C9A24B"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.95 }}
        transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="700"
        cy="220"
        r="4"
        fill="#C9A24B"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      />
      <motion.text
        x="640"
        y="200"
        fill="#E8D3A0"
        style={{ font: "500 11px var(--font-mono)", letterSpacing: "0.04em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        realized path
      </motion.text>
      <text x="18" y="455" fill="#948C7C" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.04em" }} opacity="0.7">
        today
      </text>
    </svg>
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
      <div className="relative z-10 max-w-[1240px] mx-auto px-8 lg:px-12 pt-8 pb-20 grid lg:grid-cols-[1fr_0.95fr] gap-16 items-center">
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
          <p
            className="text-center text-[10.5px] text-[#948C7C]/55 mt-2 tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            10,000 simulated futures, one realized path — replotted every session
          </p>
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