"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Shield, Lock, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ borderTop: "1px solid #1B2334" }}>

      <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12">
        <div className="max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] px-3 py-1.5"
              style={{
                fontFamily: "var(--font-mono)",
                border: "1px solid rgba(201,162,75,0.25)",
                color: "#C9A24B",
                background: "rgba(201,162,75,0.05)",
                borderRadius: "2px",
              }}
            >
              <motion.span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#C9A24B" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              PRIVATE BETA · LIMITED TO 15 FUNDS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3.6rem)",
              lineHeight: 1.06,
              color: "#F4EFE4",
              marginBottom: "1.5rem",
            }}
          >
            The Terminal{" "}
            <span style={{ fontStyle: "italic", color: "#C9A24B" }}>
              Legacy Platforms Can&apos;t Build.
            </span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] max-w-lg leading-relaxed mb-12"
            style={{ color: "#948C7C" }}
          >
            Join the first 15 boutique hedge funds and family offices with access to Platstock&apos;s institutional-grade quantitative terminal.
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-6"
          >
            <button
              className="group inline-flex items-center gap-2 px-6 py-3 text-[13.5px] font-medium cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "#C9A24B", color: "#0A0E17", borderRadius: "3px" }}
              onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Email waitlist form */}
            <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
              {state === "done" ? (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 text-[12px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(201,162,75,0.3)",
                    color: "#C9A24B",
                    background: "rgba(201,162,75,0.06)",
                    borderRadius: "2px",
                  }}
                >
                  ✓ You&apos;re on the waitlist
                </div>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[46px] min-w-[200px] font-mono text-sm"
                    style={{
                      background: "#121826",
                      border: "1px solid #1B2334",
                      color: "#F4EFE4",
                      borderRadius: "2px",
                    }}
                    disabled={state === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={state === "loading" || !email}
                    className="h-[46px] px-5 text-[12px] cursor-pointer transition-colors duration-200 disabled:opacity-40"
                    style={{
                      fontFamily: "var(--font-mono)",
                      border: "1px solid #1B2334",
                      color: "#948C7C",
                      background: "transparent",
                      borderRadius: "2px",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => { if (!e.currentTarget.disabled) { e.currentTarget.style.borderColor = "rgba(201,162,75,0.4)"; e.currentTarget.style.color = "#C9A24B"; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1B2334"; e.currentTarget.style.color = "#948C7C"; }}
                  >
                    {state === "loading" ? "Joining..." : "Join Waitlist"}
                  </button>
                </>
              )}
            </form>
          </motion.div>

          {state === "error" && (
            <p className="text-[12px] mb-6" style={{ fontFamily: "var(--font-mono)", color: "rgba(193,97,63,0.7)" }}>
              Something went wrong. Try again or{" "}
              <a href="mailto:hello@platstock.io" style={{ color: "#C9A24B" }} className="underline">
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
            className="flex items-center gap-8 mt-12"
          >
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: "rgba(148,140,124,0.35)" }} />
                  <span
                    className="text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.35)" }}
                  >
                    {t.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
