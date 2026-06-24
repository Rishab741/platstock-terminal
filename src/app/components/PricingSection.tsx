"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Minus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "emerging",
    name: "Emerging Fund",
    tagline: "Bootstrap your quant edge",
    monthly: 499,
    annual: 399,
    aum: "Up to $100M AUM",
    seats: "3 user seats",
    accent: "#06b6d4",
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
    accent: "#7c3aed",
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
    accent: "#a78bfa",
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

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-6">
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Institutional Access,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SaaS Economics
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed mb-8">
            Bloomberg costs $24,000 per seat per year. Platstock gives you more for a fraction of that.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full border border-white/[0.07] bg-white/[0.02]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                !annual
                  ? "bg-white/10 text-white"
                  : "text-white/35 hover:text-white/55"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                annual
                  ? "bg-white/10 text-white"
                  : "text-white/35 hover:text-white/55"
              }`}
            >
              Annual
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono tracking-wider">
                SAVE 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12 + 0.2,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative rounded-xl border overflow-hidden flex flex-col ${
                plan.featured
                  ? "border-violet-500/40 bg-violet-950/20"
                  : "border-white/[0.06] bg-white/[0.015]"
              }`}
            >
              {/* Featured glow */}
              {plan.featured && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-600/8 to-transparent pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                </>
              )}

              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <Badge
                    variant="outline"
                    className="rounded-b-lg rounded-t-none border-t-0 border-violet-500/50 bg-violet-600/30 text-violet-300 text-[9px] font-mono tracking-widest px-3 h-auto py-1"
                  >
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="relative p-7 flex flex-col flex-1">
                {/* Plan header */}
                <div className="mb-6">
                  <div
                    className="text-[10px] font-mono tracking-[0.2em] mb-2"
                    style={{ color: `${plan.accent}70` }}
                  >
                    {plan.aum} · {plan.seats}
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-white/35">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-white/[0.06]">
                  {plan.monthly !== null ? (
                    <div className="flex items-end gap-2">
                      <motion.span
                        key={annual ? "annual" : "monthly"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold font-mono text-white"
                      >
                        ${annual ? plan.annual : plan.monthly}
                      </motion.span>
                      <span className="text-sm text-white/30 mb-1 font-mono">
                        /month
                      </span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-white">Custom</div>
                  )}
                  {annual && plan.annual !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-mono text-emerald-400/60 mt-1"
                    >
                      Billed ${(plan.annual! * 12).toLocaleString()}/year · You save $
                      {((plan.monthly! - plan.annual!) * 12).toLocaleString()}/yr
                    </motion.p>
                  )}
                  {!annual && plan.monthly && (
                    <p className="text-[10px] font-mono text-white/20 mt-1">
                      Billed monthly · Cancel anytime
                    </p>
                  )}
                  {plan.monthly === null && (
                    <p className="text-[10px] font-mono text-white/20 mt-1">
                      Tailored to your fund's needs
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      {f.included ? (
                        <Check
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: plan.accent }}
                        />
                      ) : (
                        <Minus className="w-3.5 h-3.5 shrink-0 text-white/15" />
                      )}
                      <span
                        className={`text-xs leading-snug ${
                          f.included ? "text-white/55" : "text-white/20"
                        }`}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.featured ? (
                  <Button
                    variant="gradient"
                    className="w-full gap-2"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("open-access-modal"))
                    }
                  >
                    Request Access
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : plan.monthly === null ? (
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("open-access-modal"))
                    }
                  >
                    Contact Sales
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("open-access-modal"))
                    }
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
          className="text-center text-[11px] font-mono text-white/20 mt-8"
        >
          All plans include a 14-day free trial · No credit card required to apply · SOC2 audit-ready infrastructure
        </motion.p>
      </div>
    </section>
  );
}
