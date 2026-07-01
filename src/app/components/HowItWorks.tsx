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
    accent: "#C9A24B",
  },
  {
    number: "02",
    icon: Users,
    title: "60-Minute Onboarding",
    description:
      "Our team personally walks you through the terminal, configures your risk models, and connects your portfolio data. No IT department required.",
    detail: "Live session · Custom model calibration included",
    accent: "#E8D3A0",
  },
  {
    number: "03",
    icon: Zap,
    title: "Go Live in 48 Hours",
    description:
      "Full terminal access with live Monte Carlo simulations, behavioral anomaly alerts, and your cryptographic audit ledger — live from day one.",
    detail: "Day one deployment · Ongoing support included",
    accent: "#C1613F",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #1B2334, transparent)" }}
      />

      <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div
            className="inline-block border text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 mb-7"
            style={{ fontFamily: "var(--font-mono)", borderColor: "#1B2334", color: "#948C7C", borderRadius: "2px" }}
          >
            Getting Started
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              lineHeight: 1.1,
              color: "#F4EFE4",
            }}
          >
            From Application to{" "}
            <span style={{ fontStyle: "italic", color: "#C9A24B" }}>Live Analytics</span>
          </h2>
          <p className="text-[14px] max-w-lg leading-relaxed" style={{ color: "#948C7C" }}>
            No six-month legacy platform implementation. No IT procurement nightmare. Three steps, 48 hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-9 h-9 shrink-0"
                    style={{
                      border: `1px solid ${step.accent}45`,
                      background: `${step.accent}0a`,
                      borderRadius: "2px",
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: step.accent }} />
                  </div>
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: "var(--font-mono)", color: `${step.accent}70` }}
                  >
                    Step {step.number}
                  </span>
                </div>

                {/* Card body */}
                <div
                  className="flex-1 p-6"
                  style={{ border: "1px solid #1B2334", background: "#121826", borderRadius: "2px" }}
                >
                  <h3 className="text-[15px] font-medium mb-3 leading-snug" style={{ color: "#F4EFE4" }}>
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-5" style={{ color: "#948C7C" }}>
                    {step.description}
                  </p>
                  <div
                    className="flex items-center gap-2 pt-4"
                    style={{ borderTop: "1px solid #1B2334" }}
                  >
                    <div className="w-px h-3 shrink-0" style={{ background: step.accent }} />
                    <span
                      className="text-[10px] tracking-wider"
                      style={{ fontFamily: "var(--font-mono)", color: `${step.accent}55` }}
                    >
                      {step.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <button
            className="inline-flex items-center gap-2 text-[13px] cursor-pointer transition-colors duration-200 border-b pb-0.5"
            style={{ color: "#948C7C", borderColor: "rgba(148,140,124,0.3)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A24B"; e.currentTarget.style.borderColor = "rgba(201,162,75,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#948C7C"; e.currentTarget.style.borderColor = "rgba(148,140,124,0.3)"; }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
          >
            Ready to apply? Start your application →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
