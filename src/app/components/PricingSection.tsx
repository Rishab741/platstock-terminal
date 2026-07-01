"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Minus, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "emerging",
    name: "Emerging Fund",
    tagline: "Bootstrap your quant edge",
    monthly: 499,
    annual: 399,
    aum: "Up to $100M AUM",
    seats: "3 user seats",
    accent: "#948C7C",
    featured: false,
    features: [
      { label: "Core Terminal Access", included: true },
      { label: "Monte Carlo Engine (5K paths)", included: true },
      { label: "Live Sharpe & VaR Calculation", included: true },
      { label: "Hash-Chained Audit Ledger", included: true },
      { label: "Email Support", included: true },
      { label: "Deno Edge Behavioral Profiling", included: false },
      { label: "React Native Mobile Companion", included: false },
      { label: "Bloomberg API Bridge", included: false },
    ],
  },
  {
    id: "boutique",
    name: "Boutique Hedge Fund",
    tagline: "The full institutional stack",
    monthly: 1499,
    annual: 1199,
    aum: "Up to $1B AUM",
    seats: "20 user seats",
    accent: "#C9A24B",
    featured: true,
    features: [
      { label: "Core Terminal Access", included: true },
      { label: "Monte Carlo Engine (10K paths)", included: true },
      { label: "Live Sharpe & VaR Calculation", included: true },
      { label: "Hash-Chained Audit Ledger", included: true },
      { label: "Priority Support + Onboarding Call", included: true },
      { label: "Deno Edge Behavioral Profiling", included: true },
      { label: "React Native Mobile Companion", included: true },
      { label: "Bloomberg API Bridge", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Family Office / Enterprise",
    tagline: "Unlimited scale, white-glove service",
    monthly: null,
    annual: null,
    aum: "Unlimited AUM",
    seats: "Unlimited seats",
    accent: "#E8D3A0",
    featured: false,
    features: [
      { label: "Core Terminal Access", included: true },
      { label: "Monte Carlo Engine (100K paths)", included: true },
      { label: "Live Sharpe & VaR Calculation", included: true },
      { label: "Hash-Chained Audit Ledger", included: true },
      { label: "Dedicated Account Team", included: true },
      { label: "Deno Edge Behavioral Profiling", included: true },
      { label: "React Native Mobile Companion", included: true },
      { label: "Bloomberg API Bridge", included: true },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">

      <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div
            className="inline-block border text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 mb-7"
            style={{ fontFamily: "var(--font-mono)", borderColor: "#1B2334", color: "#948C7C", borderRadius: "2px" }}
          >
            Transparent Pricing
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
            Institutional Access,{" "}
            <span style={{ fontStyle: "italic", color: "#C9A24B" }}>SaaS Economics</span>
          </h2>
          <p className="text-[14px] max-w-lg mx-auto leading-relaxed mb-10" style={{ color: "#948C7C" }}>
            Legacy trading terminals charge $24,000+ per seat per year. Platstock gives you more for a fraction of that.
          </p>

          {/* Billing toggle */}
          <div
            className="inline-flex items-center gap-0 overflow-hidden"
            style={{ border: "1px solid #1B2334", borderRadius: "2px" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2 text-[11px] tracking-widest transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: !annual ? "#1B2334" : "transparent",
                color: !annual ? "#F4EFE4" : "#948C7C",
                borderRight: "1px solid #1B2334",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2.5 px-5 py-2 text-[11px] tracking-widest transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: annual ? "#1B2334" : "transparent",
                color: annual ? "#F4EFE4" : "#948C7C",
              }}
            >
              Annual
              <span
                className="text-[9px] px-1.5 py-0.5 tracking-wider"
                style={{
                  border: "1px solid rgba(201,162,75,0.3)",
                  color: "#C9A24B",
                  background: "rgba(201,162,75,0.08)",
                  borderRadius: "1px",
                }}
              >
                SAVE 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative overflow-hidden flex flex-col"
              style={{
                border: plan.featured ? "1px solid rgba(201,162,75,0.4)" : "1px solid #1B2334",
                background: plan.featured ? "rgba(201,162,75,0.03)" : "#121826",
                borderRadius: "2px",
              }}
            >
              {/* Featured top line */}
              {plan.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #C9A24B, transparent)" }}
                />
              )}

              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-block text-[8px] tracking-[0.2em] px-3 py-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      border: "1px solid rgba(201,162,75,0.35)",
                      borderTop: "none",
                      color: "#C9A24B",
                      background: "rgba(201,162,75,0.08)",
                    }}
                  >
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="relative p-7 flex flex-col flex-1 pt-8">
                {/* Plan header */}
                <div className="mb-6">
                  <div
                    className="text-[9px] tracking-[0.2em] mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: `${plan.accent}80` }}
                  >
                    {plan.aum} · {plan.seats}
                  </div>
                  <h3
                    className="text-[18px] mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "#F4EFE4" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-[12px]" style={{ color: "#948C7C" }}>{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7" style={{ borderBottom: "1px solid #1B2334" }}>
                  {plan.monthly !== null ? (
                    <div className="flex items-end gap-2">
                      <motion.span
                        key={annual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold"
                        style={{ fontFamily: "var(--font-mono)", color: "#E8D3A0" }}
                      >
                        ${annual ? plan.annual : plan.monthly}
                      </motion.span>
                      <span className="text-sm mb-1" style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}>
                        /month
                      </span>
                    </div>
                  ) : (
                    <div
                      className="text-4xl"
                      style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#F4EFE4" }}
                    >
                      Custom
                    </div>
                  )}
                  {annual && plan.annual !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] mt-1"
                      style={{ fontFamily: "var(--font-mono)", color: "rgba(201,162,75,0.55)" }}
                    >
                      Billed ${(plan.annual! * 12).toLocaleString()}/year · You save ${((plan.monthly! - plan.annual!) * 12).toLocaleString()}/yr
                    </motion.p>
                  )}
                  {!annual && plan.monthly && (
                    <p className="text-[10px] mt-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.4)" }}>
                      Billed monthly · Cancel anytime
                    </p>
                  )}
                  {plan.monthly === null && (
                    <p className="text-[10px] mt-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.4)" }}>
                      Tailored to your fund's needs
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: plan.accent }} />
                      ) : (
                        <Minus className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(148,140,124,0.25)" }} />
                      )}
                      <span
                        className="text-[12px] leading-snug"
                        style={{ color: f.included ? "rgba(244,239,228,0.55)" : "rgba(148,140,124,0.3)" }}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.featured ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 text-[13px] font-medium cursor-pointer transition-opacity duration-200 hover:opacity-90"
                    style={{ background: "#C9A24B", color: "#0A0E17", borderRadius: "2px" }}
                    onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                  >
                    Request Access <ArrowRight className="w-4 h-4" />
                  </button>
                ) : plan.monthly === null ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 text-[13px] cursor-pointer transition-colors duration-200"
                    style={{
                      border: "1px solid #1B2334",
                      color: "#948C7C",
                      background: "transparent",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,162,75,0.4)"; e.currentTarget.style.color = "#C9A24B"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1B2334"; e.currentTarget.style.color = "#948C7C"; }}
                    onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                  >
                    Contact Sales <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 text-[13px] cursor-pointer transition-colors duration-200"
                    style={{
                      border: "1px solid #1B2334",
                      color: "#948C7C",
                      background: "transparent",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,162,75,0.4)"; e.currentTarget.style.color = "#C9A24B"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1B2334"; e.currentTarget.style.color = "#948C7C"; }}
                    onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-[11px] mt-8"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.35)" }}
        >
          All plans include a 14-day free trial · No credit card required to apply · SOC2 audit-ready infrastructure
        </motion.p>
      </div>
    </section>
  );
}
