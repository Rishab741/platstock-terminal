"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Lock, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const trust = [
  { icon: Shield, label: "SOC2 Audit-Ready" },
  { icon: Lock, label: "256-Bit Encryption" },
  { icon: Layers, label: "Sovereign Data" },
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "loading" || state === "done") return;
    setState("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 75%)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Top separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-[11px] font-mono tracking-widest text-violet-400/70 mb-8"
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          PRIVATE BETA · LIMITED TO 15 FUNDS
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6"
        >
          The Terminal Your{" "}
          <br className="hidden sm:block" />
          <span
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bloomberg Doesn&apos;t Have.
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-white/35 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Join the first 15 boutique hedge funds and family offices with access to Platstock&apos;s institutional-grade quantitative terminal.
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.32, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6"
        >
          <Button
            variant="gradient"
            size="lg"
            className="gap-2 px-8 h-12 text-sm w-full sm:w-auto"
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
          >
            Request Access
            <ArrowRight className="w-4 h-4" />
          </Button>

          <span className="text-white/20 text-xs font-mono hidden sm:block">or</span>

          {/* Email waitlist form */}
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            {state === "done" ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-mono">
                ✓ You&apos;re on the waitlist
              </div>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/25 focus:border-violet-500/40 focus:ring-violet-500/20 min-w-[200px]"
                  disabled={state === "loading"}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="h-12 px-5 border-white/[0.12] text-white/50 hover:text-white hover:border-white/25 whitespace-nowrap"
                  disabled={state === "loading" || !email}
                >
                  {state === "loading" ? "Joining..." : "Join Waitlist"}
                </Button>
              </>
            )}
          </form>
        </motion.div>

        {state === "error" && (
          <p className="text-xs text-red-400/60 font-mono mb-6">
            Something went wrong. Try again or{" "}
            <a href="mailto:hello@platstock.io" className="underline">
              email us directly
            </a>
            .
          </p>
        )}

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          {trust.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-white/20" />
                <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">
                  {t.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
