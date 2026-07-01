"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

type CellValue = "yes" | "no" | "partial" | string;

const capabilities: {
  category: string;
  feature: string;
  platstock: CellValue;
  bloomberg: CellValue;
  factset: CellValue;
  spreadsheet: CellValue;
}[] = [
  { category: "Quantitative Modeling", feature: "Monte Carlo Portfolio Simulation", platstock: "yes", bloomberg: "yes", factset: "partial", spreadsheet: "no" },
  { category: "Quantitative Modeling", feature: "Live Sharpe / VaR Calculation", platstock: "yes", bloomberg: "yes", factset: "yes", spreadsheet: "partial" },
  { category: "Quantitative Modeling", feature: "Decoupled FastAPI Execution", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "no" },
  { category: "Data Integrity", feature: "Cryptographic Hash-Chained Ledger", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "no" },
  { category: "Data Integrity", feature: "Immutable Audit Trail", platstock: "yes", bloomberg: "partial", factset: "partial", spreadsheet: "no" },
  { category: "Data Integrity", feature: "Verifiable Record Provenance", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "no" },
  { category: "AI & Behavioral Analytics", feature: "AI-Native Human Behavioral Profiling", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "no" },
  { category: "AI & Behavioral Analytics", feature: "Deno Edge Behavioral Anomaly Detection", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "no" },
  { category: "AI & Behavioral Analytics", feature: "Proactive Risk Alerts", platstock: "yes", bloomberg: "partial", factset: "partial", spreadsheet: "no" },
  { category: "Infrastructure", feature: "Enterprise SaaS Pricing", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "yes" },
  { category: "Infrastructure", feature: "Mobile Companion (React Native)", platstock: "yes", bloomberg: "partial", factset: "no", spreadsheet: "no" },
  { category: "Infrastructure", feature: "Sovereign Data Control", platstock: "yes", bloomberg: "no", factset: "no", spreadsheet: "partial" },
];

function IconSprite() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <symbol id="cm-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
      </symbol>
      <symbol id="cm-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
      </symbol>
      <symbol id="cm-minus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8" />
      </symbol>
    </svg>
  );
}

function Cell({ value, isHighlight }: { value: CellValue; isHighlight?: boolean }) {
  if (value === "yes")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4" aria-hidden="true" style={{ color: isHighlight ? "#C9A24B" : "#10b981" }}>
          <use href="#cm-check" />
        </svg>
      </div>
    );
  if (value === "no")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4" aria-hidden="true" style={{ color: "rgba(148,140,124,0.25)" }}>
          <use href="#cm-x" />
        </svg>
      </div>
    );
  if (value === "partial")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4" aria-hidden="true" style={{ color: "rgba(201,162,75,0.5)" }}>
          <use href="#cm-minus" />
        </svg>
      </div>
    );
  return <span className="text-xs font-mono" style={{ color: "#948C7C" }}>{value}</span>;
}

const columns = [
  { key: "platstock", label: "Platstock", highlight: true },
  { key: "bloomberg", label: "Bloomberg" },
  { key: "factset", label: "FactSet" },
  { key: "spreadsheet", label: "Spreadsheet" },
];

export default function ComparisonMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [...new Set(capabilities.map((c) => c.category))];

  return (
    <>
      <IconSprite />
      <section id="capabilities" ref={ref} className="relative py-32 overflow-hidden">

        <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-16"
          >
            <div
              className="inline-block border text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 mb-7"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "#1B2334",
                color: "#948C7C",
                borderRadius: "2px",
              }}
            >
              Defensibility Matrix
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
              Built for{" "}
              <span style={{ fontStyle: "italic", color: "#C9A24B" }}>Elite Funds</span>
            </h2>
            <p className="text-[14px] leading-relaxed max-w-lg" style={{ color: "#948C7C" }}>
              A transparent capability comparison across every dimension that matters to boutique hedge funds and family offices.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="overflow-hidden"
            style={{ border: "1px solid #1B2334", borderRadius: "2px" }}
          >
            <Table>
              <TableHeader>
                <TableRow
                  className="hover:bg-transparent"
                  style={{ borderBottom: "1px solid #1B2334", background: "#121826" }}
                >
                  <TableHead
                    className="px-6 py-4 text-[10px] tracking-widest uppercase w-[40%]"
                    style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                  >
                    Capability
                  </TableHead>
                  {columns.map((col) => (
                    <TableHead key={col.key} className="px-4 py-4 text-center">
                      {col.highlight ? (
                        <span
                          className="inline-block px-2.5 py-1 text-[10px] tracking-widest"
                          style={{
                            fontFamily: "var(--font-mono)",
                            border: "1px solid rgba(201,162,75,0.35)",
                            color: "#C9A24B",
                            background: "rgba(201,162,75,0.07)",
                            borderRadius: "2px",
                          }}
                        >
                          {col.label} ★
                        </span>
                      ) : (
                        <span
                          className="text-[11px]"
                          style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                        >
                          {col.label}
                        </span>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((cat) => {
                  const rows = capabilities.filter((c) => c.category === cat);
                  return rows.map((row, rIdx) => (
                    <motion.tr
                      key={row.feature}
                      custom={rIdx + 2}
                      variants={fadeInUp}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="group transition-colors duration-150"
                      style={{ borderBottom: "1px solid #1B2334" }}
                    >
                      <TableCell className="px-6 py-3.5">
                        {rIdx === 0 && (
                          <div
                            className="text-[9px] tracking-widest uppercase mb-1"
                            style={{ fontFamily: "var(--font-mono)", color: "rgba(201,162,75,0.45)" }}
                          >
                            {cat}
                          </div>
                        )}
                        <span
                          className="text-xs"
                          style={{ color: "#948C7C" }}
                        >
                          {row.feature}
                        </span>
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className="px-4 py-3.5 text-center"
                          style={col.highlight ? { background: "rgba(201,162,75,0.04)" } : undefined}
                        >
                          <Cell
                            value={row[col.key as keyof typeof row] as CellValue}
                            isHighlight={col.highlight}
                          />
                        </TableCell>
                      ))}
                    </motion.tr>
                  ));
                })}
              </TableBody>
            </Table>

            <div
              className="px-6 py-4 flex flex-wrap gap-5"
              style={{ borderTop: "1px solid #1B2334", background: "#121826" }}
            >
              {[
                { id: "cm-check", label: "Fully Supported", color: "#10b981" },
                { id: "cm-minus", label: "Partial / Add-on Cost", color: "rgba(201,162,75,0.55)" },
                { id: "cm-x", label: "Not Available", color: "rgba(148,140,124,0.25)" },
              ].map(({ id, label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" aria-hidden="true" style={{ color }}>
                    <use href={`#${id}`} />
                  </svg>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
