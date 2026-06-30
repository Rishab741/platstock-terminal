"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
  {
    category: "Quantitative Modeling",
    feature: "Monte Carlo Portfolio Simulation",
    platstock: "yes",
    bloomberg: "yes",
    factset: "partial",
    spreadsheet: "no",
  },
  {
    category: "Quantitative Modeling",
    feature: "Live Sharpe / VaR Calculation",
    platstock: "yes",
    bloomberg: "yes",
    factset: "yes",
    spreadsheet: "partial",
  },
  {
    category: "Quantitative Modeling",
    feature: "Decoupled FastAPI Execution",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "Data Integrity",
    feature: "Cryptographic Hash-Chained Ledger",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "Data Integrity",
    feature: "Immutable Audit Trail",
    platstock: "yes",
    bloomberg: "partial",
    factset: "partial",
    spreadsheet: "no",
  },
  {
    category: "Data Integrity",
    feature: "Verifiable Record Provenance",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "AI & Behavioral Analytics",
    feature: "AI-Native Human Behavioral Profiling",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "AI & Behavioral Analytics",
    feature: "Deno Edge Behavioral Anomaly Detection",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "AI & Behavioral Analytics",
    feature: "Proactive Risk Alerts",
    platstock: "yes",
    bloomberg: "partial",
    factset: "partial",
    spreadsheet: "no",
  },
  {
    category: "Infrastructure",
    feature: "Enterprise SaaS Pricing",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "yes",
  },
  {
    category: "Infrastructure",
    feature: "Mobile Companion (React Native)",
    platstock: "yes",
    bloomberg: "partial",
    factset: "no",
    spreadsheet: "no",
  },
  {
    category: "Infrastructure",
    feature: "Sovereign Data Control",
    platstock: "yes",
    bloomberg: "no",
    factset: "no",
    spreadsheet: "partial",
  },
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

function Cell({ value }: { value: CellValue }) {
  if (value === "yes")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4 text-emerald-400" aria-hidden="true"><use href="#cm-check" /></svg>
      </div>
    );
  if (value === "no")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4 text-white/15" aria-hidden="true"><use href="#cm-x" /></svg>
      </div>
    );
  if (value === "partial")
    return (
      <div className="flex justify-center">
        <svg className="w-4 h-4 text-yellow-500/50" aria-hidden="true"><use href="#cm-minus" /></svg>
      </div>
    );
  return <span className="text-xs text-muted-foreground font-mono">{value}</span>;
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
      <section
        id="capabilities"
        ref={ref}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[11px] font-mono tracking-widest text-cyan-400/70 mb-6">
              DEFENSIBILITY MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white heading-section mb-4">
              Built for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Elite Funds
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              A transparent capability comparison across every dimension that matters to boutique hedge funds and family offices.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="rounded-xl border border-white/[0.07] overflow-hidden bg-card/30 card-inset-glow"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-[10px] font-mono tracking-widest text-muted-foreground uppercase w-[40%]">
                    Capability
                  </TableHead>
                  {columns.map((col) => (
                    <TableHead key={col.key} className="px-4 py-4 text-center">
                      {col.highlight ? (
                        <Badge
                          variant="outline"
                          className="gap-1.5 border-cyan-500/30 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-cyan-300 font-mono tracking-wider h-auto py-1 px-2.5"
                        >
                          {col.label}
                          <span className="text-[8px] px-1 py-0.5 rounded bg-cyan-500/20 text-cyan-400">★</span>
                        </Badge>
                      ) : (
                        <span className="text-xs font-mono text-muted-foreground">{col.label}</span>
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
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150 group"
                    >
                      <TableCell className="px-6 py-3.5">
                        {rIdx === 0 && (
                          <div className="text-[9px] font-mono tracking-widest text-violet-400/50 uppercase mb-1">
                            {cat}
                          </div>
                        )}
                        <span className="text-xs text-white/55 group-hover:text-white/70 transition-colors whitespace-normal">
                          {row.feature}
                        </span>
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className={`px-4 py-3.5 text-center ${
                            col.highlight
                              ? "bg-gradient-to-r from-violet-600/[0.04] to-cyan-500/[0.04]"
                              : ""
                          }`}
                        >
                          <Cell value={row[col.key as keyof typeof row] as CellValue} />
                        </TableCell>
                      ))}
                    </motion.tr>
                  ));
                })}
              </TableBody>
            </Table>

            <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex flex-wrap gap-4">
              {[
                { id: "cm-check", label: "Fully Supported", color: "text-emerald-400" },
                { id: "cm-minus", label: "Partial / Add-on Cost", color: "text-yellow-500/60" },
                { id: "cm-x", label: "Not Available", color: "text-white/20" },
              ].map(({ id, label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg className={`w-3.5 h-3.5 ${color}`} aria-hidden="true"><use href={`#${id}`} /></svg>
                  <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
