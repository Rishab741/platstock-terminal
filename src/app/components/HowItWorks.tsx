"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Users, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Apply for Access",
    description:
      "Submit your firm's details — AUM, strategy type, and primary use case. We review every application to ensure a great fit for both sides.",
    detail: "15-minute application · Reviewed within 48 hours",
    accent: "#06b6d4",
    accentDim: "rgba(6,182,212,0.08)",
  },
  {
    number: "02",
    icon: Users,
    title: "60-Minute Onboarding",
    description:
      "Our team personally walks you through the terminal, configures your risk models, and connects your portfolio data. No IT department required.",
    detail: "Live session · Custom model calibration included",
    accent: "#7c3aed",
    accentDim: "rgba(124,58,237,0.08)",
  },
  {
    number: "03",
    icon: Zap,
    title: "Go Live in 48 Hours",
    description:
      "Full terminal access with live Monte Carlo simulations, behavioral anomaly alerts, and your cryptographic audit ledger — live from day one.",
    detail: "Day one deployment · Ongoing support included",
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.08)",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[11px] font-mono tracking-widest text-cyan-400/70 mb-6">
            GETTING STARTED
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            From Application to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Live Analytics
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            No six-month Bloomberg implementation. No IT procurement nightmare. Three steps, 48 hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.666%+48px)] right-[calc(16.666%+48px)] h-px">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #7c3aed, #a78bfa)",
                opacity: 0.2,
              }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.15 + 0.2,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative group"
                >
                  {/* Step number indicator */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 shrink-0 z-10"
                      style={{
                        borderColor: `${step.accent}50`,
                        background: step.accentDim,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.accent }} />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${step.accent}15` }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{
                          delay: i * 0.3,
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <div
                      className="text-[10px] font-mono tracking-[0.3em]"
                      style={{ color: `${step.accent}60` }}
                    >
                      STEP {step.number}
                    </div>
                  </div>

                  {/* Card body */}
                  <div
                    className="rounded-xl border p-6 transition-all duration-300 group-hover:border-opacity-50"
                    style={{
                      borderColor: "rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.015)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 80% 60% at 20% 30%, ${step.accent}06, transparent)`,
                      }}
                    />

                    <h3 className="text-base font-semibold text-white/85 mb-3 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div
                      className="flex items-center gap-2 pt-3 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: step.accent }}
                      />
                      <span
                        className="text-[10px] font-mono tracking-wider"
                        style={{ color: `${step.accent}60` }}
                      >
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
          >
            <span>Ready to apply?</span>
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-medium"
            >
              Start your application →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
