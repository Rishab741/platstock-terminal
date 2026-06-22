"use client";

import { useState, useEffect, useRef } from "react";
import { validateEmail } from "@/lib/validation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, CheckCircle2, Zap } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function AmbientCursor() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.07), transparent 70%)`,
      }}
    />
  );
}

function TerminalBadge() {
  const [tick, setTick] = useState(0);
  const lines = [
    { type: "cmd", text: "$ platstock init --mode=sovereign" },
    { type: "ok",  text: "✓ Alpha Engine [ONLINE]" },
    { type: "dat", text: "SR: 2.847  |  α: 14.2%  |  VaR: -2.1%" },
    { type: "cmd", text: "$ run --simulation=10000" },
    { type: "ok",  text: "✓ Monte Carlo paths computed" },
  ];

  useEffect(() => {
    if (tick < lines.length) {
      const t = setTimeout(() => setTick((v) => v + 1), tick === 0 ? 600 : 350);
      return () => clearTimeout(t);
    }
  }, [tick, lines.length]);

  const color = (type: string) => {
    if (type === "cmd") return "text-cyan-400";
    if (type === "ok") return "text-emerald-400";
    return "text-violet-300";
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-white/[0.07] bg-black/60 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <span className="flex-1 text-center text-[9px] font-mono text-white/25 tracking-widest">
          PLATSTOCK · v2.1.4
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] font-mono text-emerald-400/50">LIVE</span>
        </div>
      </div>
      <div className="p-4 space-y-1.5 font-mono text-[11px] min-h-[110px]">
        {lines.slice(0, tick).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={color(l.type)}
          >
            {l.text}
            {i === tick - 1 && tick < lines.length && (
              <span className="inline-block w-1.5 h-3 bg-cyan-400/70 animate-pulse ml-1 align-middle" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function StayTunedPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Something went wrong. Please try again.");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    const emailError = validateEmail(trimmed);
    if (emailError) {
      setErrorMsg(emailError);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.status === 429) {
        setErrorMsg("Too many requests. Please wait a moment.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Please check your connection.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white flex flex-col">
      <AmbientCursor />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/7 blur-[140px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6"
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-cyan-400/15 rounded-md blur-sm" />
            <div className="relative flex items-center justify-center w-8 h-8 rounded-md border border-cyan-400/30 bg-black/60">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white/80">
            Platstock
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50 tracking-widest border border-cyan-400/15 rounded px-1.5 py-0.5">
            TERMINAL
          </span>
        </Link>

        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/30">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          PRIVATE BETA
        </div>
      </motion.header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 md:px-12 py-12 max-w-7xl mx-auto w-full">

        {/* Left: copy + form */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start gap-7"
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[11px] font-mono tracking-widest text-cyan-400/80"
            >
              <Zap className="w-3 h-3" />
              SOMETHING EXTRAORDINARY IS BEING BUILT
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
            >
              <span
                style={{
                  background: "linear-gradient(160deg, #ffffff 30%, rgba(255,255,255,0.45) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Next-Generation
              </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Financial Tracking.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={fadeInUp}
              className="text-base text-white/45 leading-relaxed max-w-md"
            >
              We are hardening the infrastructure behind an AI-native capital
              terminal built for boutique hedge funds and family offices. Be the
              first to know when private beta opens.
            </motion.p>

            {/* Form */}
            <motion.div custom={3} variants={fadeInUp} className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2.5 text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 py-3.5 px-5 rounded-xl text-sm font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    You are on the priority list. We will be in touch.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex items-center p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl focus-within:border-cyan-500/30 focus-within:bg-white/[0.05] transition-all duration-300"
                    style={{
                      boxShadow: "0 0 0 1px rgba(124,58,237,0.08), 0 8px 32px rgba(0,0,0,0.4)",
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="email"
                      required
                      disabled={status === "submitting"}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-4 py-2.5 text-sm text-white/80 placeholder:text-white/25 outline-none font-mono disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0 overflow-hidden disabled:opacity-60 transition-all duration-200 active:scale-[0.97]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-md opacity-0 hover:opacity-60 transition-opacity duration-300" />
                      {status === "submitting" ? (
                        <div className="relative h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span className="relative flex items-center gap-1.5">
                          Notify Me
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {status === "error" && (
                <p className="text-[11px] font-mono text-red-400/70 mt-2 ml-1">
                  {errorMsg}
                </p>
              )}

              {status !== "success" && (
                <p className="text-[10px] font-mono text-white/20 mt-3 ml-1">
                  No spam. Unsubscribe at any time.
                </p>
              )}
            </motion.div>

            {/* Tech tags */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              className="flex flex-wrap gap-2"
            >
              {["FastAPI", "Monte Carlo", "Hash-Chained Ledger", "Deno Edge", "React Native"].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-2.5 py-1 rounded-full border border-white/[0.07] text-white/30 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: terminal mockup */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex-shrink-0 w-full max-w-sm hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-violet-600/15 to-cyan-500/15 rounded-3xl blur-2xl" />
            <div className="relative">
              <TerminalBadge />

              {/* Stat cards below terminal */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[
                  { label: "SIMULATION", value: "10K+", sub: "Paths" },
                  { label: "MODELS", value: "3", sub: "Active" },
                  { label: "LATENCY", value: "<50ms", sub: "API" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-center"
                  >
                    <div className="text-sm font-bold font-mono text-white/80">{s.value}</div>
                    <div className="text-[9px] font-mono tracking-widest text-white/25 mt-0.5 uppercase">{s.label}</div>
                    <div className="text-[9px] text-white/15 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-6 border-t border-white/[0.05] text-[11px] font-mono text-white/20 gap-3"
      >
        <div>© 2026 Platstock Technologies Inc. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <Link href="/" className="hover:text-white/50 transition-colors">Back to Site</Link>
          <Link href="/stay-tuned" className="hover:text-white/50 transition-colors">Privacy</Link>
          <Link href="/stay-tuned" className="hover:text-white/50 transition-colors">Contact</Link>
        </div>
      </motion.footer>
    </div>
  );
}
