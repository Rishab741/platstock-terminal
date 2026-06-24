"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Product",
    q: "How is Platstock different from Bloomberg Terminal?",
    a: "Bloomberg is a $24,000/seat/year data aggregation platform. Platstock is a quantitative analytics terminal built specifically for boutique hedge funds — with Monte Carlo simulation, behavioral anomaly detection, and a cryptographic audit ledger that Bloomberg doesn't have at any price. We're not replacing Bloomberg's data feed; we're replacing Bloomberg's analytics and compliance layer at 5% of the cost.",
  },
  {
    category: "Product",
    q: "What portfolio management systems can Platstock integrate with?",
    a: "In private beta, Platstock accepts portfolio data via CSV upload and direct API connection. Our Bloomberg API bridge launches Q3 2026, followed by integrations with Advent Geneva, Black Diamond, and major prime broker custodial feeds. During onboarding, we work with each fund to map their existing data format.",
  },
  {
    category: "Product",
    q: "Does Platstock have a mobile app?",
    a: "Yes. The React Native companion app for iOS is currently in beta alongside the web terminal. It provides live portfolio snapshots, risk alerts, and behavioral anomaly notifications on the go. Android is planned for Q4 2026.",
  },
  {
    category: "Security",
    q: "How is my portfolio data stored and protected?",
    a: "Your data is encrypted at rest (AES-256) and in transit (TLS 1.3) on Supabase's SOC2-certified infrastructure. Every data record is cryptographically anchored in our hash-chained ledger — meaning no record can be altered without breaking the entire chain. You retain full data sovereignty: no data is used for model training, and you can export or delete all records at any time.",
  },
  {
    category: "Security",
    q: "What does 'Sovereign Data' actually mean?",
    a: "It means your fund's data never leaves your control. We don't sell, share, or aggregate your portfolio data across clients. You get a dedicated data namespace in our infrastructure, and our hash-chained ledger gives you a verifiable proof of data integrity that you can provide to auditors and regulators. Think of it as a cryptographic receipt for every data transaction.",
  },
  {
    category: "Security",
    q: "What compliance certifications does Platstock hold?",
    a: "We are currently undergoing SOC2 Type I audit with a target completion in Q3 2026. Our infrastructure is built on SOC2-certified providers (Supabase, Vercel). We support your firm's own compliance requirements with detailed audit logs, data residency controls, and a full export of your cryptographic audit trail.",
  },
  {
    category: "Technical",
    q: "What is the Monte Carlo engine actually calculating?",
    a: "Our Alpha Engine runs 10,000 simulation paths per request using a FastAPI Python microservice. For each path, it samples from a distribution of future returns calibrated to your portfolio's historical volatility and correlation structure. The output is a distribution of portfolio outcomes from which we derive VaR (Value at Risk), CVaR, Sharpe Ratio, and drawdown probability — all recalculated live as you adjust positions.",
  },
  {
    category: "Technical",
    q: "What is the Hash-Chained Ledger and why does it matter?",
    a: "Every record written to Platstock is hashed using SHA-256 and includes the hash of the previous record, creating a tamper-evident chain. Any modification to any historical record immediately invalidates all subsequent chain entries — making undetected alteration mathematically impossible. For funds facing regulatory scrutiny or internal compliance audits, this is a defensible, cryptographic proof of data integrity.",
  },
  {
    category: "Pricing",
    q: "Is there a long-term contract required?",
    a: "No. All plans are month-to-month or annual. Annual plans save 20% and lock in your pricing. There are no exit fees, and you can export all your data at any time. We earn your business every month.",
  },
  {
    category: "Pricing",
    q: "What happens during the 14-day free trial?",
    a: "You get full access to the Boutique Hedge Fund tier with your own data loaded. Our team is on standby for any questions. At the end of 14 days, you choose a plan or we part ways — no charge either way. We'd rather have 15 funds that love the product than 50 that tolerate it.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <section id="faq" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-6">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Everything You Need{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              to Know
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            Answers to the questions compliance teams, CIOs, and portfolio managers ask before signing on.
          </p>
        </motion.div>

        {/* FAQ by category */}
        <div className="space-y-10">
          {categories.map((category, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: ci * 0.1 + 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="text-[10px] font-mono tracking-[0.25em] text-white/25 uppercase mb-4">
                {category}
              </div>

              <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
                <Accordion>
                  {faqs
                    .filter((f) => f.category === category)
                    .map((faq, fi) => (
                      <AccordionItem
                        key={fi}
                        value={`${category}-${fi}`}
                        className="border-b border-white/[0.05] last:border-b-0 px-6"
                      >
                        <AccordionTrigger className="py-4 text-sm text-white/65 hover:text-white/90 hover:no-underline transition-colors duration-200 font-normal">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/40 text-sm leading-relaxed pb-5">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-white/25">
            Have a question not listed here?{" "}
            <a
              href="mailto:hello@platstock.io"
              className="text-violet-400/60 hover:text-violet-400 transition-colors duration-200"
            >
              Email us directly
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
