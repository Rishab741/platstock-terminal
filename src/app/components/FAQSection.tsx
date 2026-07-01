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
    q: "How is Platstock different from legacy trading terminals?",
    a: "Legacy trading terminals charge $24,000+/seat/year and are designed for the largest buy-side institutions. Platstock is purpose-built for boutique hedge funds — with Monte Carlo simulation, behavioral anomaly detection, and a cryptographic audit ledger that legacy platforms don't offer at any price point. We complement your existing data subscriptions by replacing the analytics and compliance layer at a fraction of the cost.",
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
          className="mb-16"
        >
          <div
            className="inline-block border text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 mb-7"
            style={{ fontFamily: "var(--font-mono)", borderColor: "#1B2334", color: "#948C7C", borderRadius: "2px" }}
          >
            Frequently Asked Questions
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
            Everything You Need{" "}
            <span style={{ fontStyle: "italic", color: "#C9A24B" }}>to Know</span>
          </h2>
          <p className="text-[14px] max-w-lg leading-relaxed" style={{ color: "#948C7C" }}>
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
              transition={{ delay: ci * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="text-[9px] tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.4)" }}
              >
                {category}
              </div>

              <div
                className="overflow-hidden"
                style={{ border: "1px solid #1B2334", background: "#121826", borderRadius: "2px" }}
              >
                <Accordion>
                  {faqs
                    .filter((f) => f.category === category)
                    .map((faq, fi) => (
                      <AccordionItem
                        key={fi}
                        value={`${category}-${fi}`}
                        className="px-6 last:border-b-0"
                        style={{ borderBottom: "1px solid #1B2334" }}
                      >
                        <AccordionTrigger
                          className="py-4 text-[13px] hover:no-underline transition-colors duration-200 font-normal"
                          style={{ color: "rgba(244,239,228,0.65)" }}
                        >
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent
                          className="text-[13px] leading-relaxed pb-5"
                          style={{ color: "#948C7C" }}
                        >
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
          className="mt-14"
        >
          <p className="text-[13px]" style={{ color: "rgba(148,140,124,0.45)" }}>
            Have a question not listed here?{" "}
            <a
              href="mailto:hello@platstock.io"
              className="transition-colors duration-200"
              style={{ color: "#C9A24B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8D3A0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C9A24B")}
            >
              Email us directly
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
