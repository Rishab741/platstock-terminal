"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Status = "complete" | "active" | "upcoming";

const milestones: {
  index: string;
  quarter: string;
  year: string;
  phase: string;
  status: Status;
  items: string[];
  color: string;
}[] = [
  {
    index: "01",
    quarter: "Q1",
    year: "2026",
    phase: "Design Partners",
    status: "complete",
    items: [
      "Core terminal architecture complete",
      "Alpha Engine v1 deployed",
      "Hash-chained ledger operational",
    ],
    color: "#C9A24B",
  },
  {
    index: "02",
    quarter: "Q2",
    year: "2026",
    phase: "Private Beta",
    status: "active",
    items: [
      "Monte Carlo engine scaling to 10K paths",
      "Deno Edge behavioral profiling launch",
      "React Native mobile companion beta",
      "SOC2 Type I audit initiation",
    ],
    color: "#C9A24B",
  },
  {
    index: "03",
    quarter: "Q3",
    year: "2026",
    phase: "Public Launch",
    status: "upcoming",
    items: [
      "Full public launch with onboarding pipeline",
      "Enterprise SaaS pricing tiers live",
      "Bloomberg API bridge integration",
      "15+ fund clients active",
    ],
    color: "#948C7C",
  },
  {
    index: "04",
    quarter: "Q4",
    year: "2026",
    phase: "Scale Operations",
    status: "upcoming",
    items: [
      "50+ family office & hedge fund clients",
      "Institutional-grade compliance suite",
      "AI behavioral model v3 production",
      "Global expansion: EMEA + APAC",
    ],
    color: "#948C7C",
  },
];

function ProgressRail({ inView }: { inView: boolean }) {
  return (
    <div className="flex gap-1 mt-8">
      {milestones.map((m, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1.5">
          <div className="relative h-px overflow-hidden" style={{ background: "#1B2334" }}>
            {m.status === "complete" && (
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: "#C9A24B" }}
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            {m.status === "active" && (
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: "linear-gradient(90deg, #C9A24B, rgba(201,162,75,0.35))" }}
                initial={{ width: 0 }}
                animate={inView ? { width: "52%" } : {}}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: m.status === "upcoming" ? "rgba(148,140,124,0.3)" : "#C9A24B",
              }}
            >
              {m.quarter} {m.year}
            </span>
            <span
              className="text-[9px] tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: m.status === "upcoming" ? "rgba(148,140,124,0.2)" : "rgba(148,140,124,0.5)",
              }}
            >
              {m.status === "complete" ? "DONE" : m.status === "active" ? "LIVE" : "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roadmap" ref={ref} className="relative py-32 overflow-hidden">
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
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: "#1B2334",
              color: "#948C7C",
              borderRadius: "2px",
            }}
          >
            Institutional Scale &amp; Roadmap
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  lineHeight: 1.1,
                  color: "#F4EFE4",
                }}
              >
                The Precision{" "}
                <span style={{ fontStyle: "italic", color: "#C9A24B" }}>Rollout</span>
              </h2>
              <p className="text-[14px] mt-3 max-w-md leading-relaxed" style={{ color: "#948C7C" }}>
                From design partners to global scale, a systematic progression from sovereign infrastructure to enterprise SaaS dominance.
              </p>
            </div>

            <div className="flex items-center gap-px overflow-hidden shrink-0" style={{ border: "1px solid #1B2334", borderRadius: "2px" }}>
              {[
                { value: "10K+", label: "Monte Carlo Paths" },
                { value: "3", label: "Quant Models" },
                { value: "4×", label: "Defensibility Layers" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="px-5 py-3 text-right"
                  style={{
                    background: "#121826",
                    borderRight: i < 2 ? "1px solid #1B2334" : "none",
                  }}
                >
                  <div
                    className="text-base"
                    style={{ fontFamily: "var(--font-mono)", color: "#E8D3A0" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[9px] tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ProgressRail inView={inView} />
        </motion.div>

        {/* Milestones */}
        <div style={{ borderTop: "1px solid #1B2334" }}>
          {milestones.map((m, i) => {
            const isUpcoming = m.status === "upcoming";
            const isActive   = m.status === "active";
            const isComplete = m.status === "complete";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14 + 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
                style={{ borderBottom: "1px solid #1B2334" }}
              >
                {/* Left accent line */}
                {(isComplete || isActive) && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{
                      background: isActive
                        ? "linear-gradient(to bottom, transparent, #C9A24B, transparent)"
                        : "linear-gradient(to bottom, transparent, rgba(201,162,75,0.4), transparent)",
                    }}
                    animate={isActive ? { opacity: [0.6, 1, 0.6] } : {}}
                    transition={isActive ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
                  />
                )}

                <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 py-10 pl-5">

                  {/* Left: index + meta */}
                  <div className="relative overflow-hidden">
                    <div
                      className="absolute -top-6 -left-1 text-[96px] font-black leading-none pointer-events-none select-none"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: isUpcoming ? "rgba(27,35,52,0.5)" : "rgba(201,162,75,0.06)",
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {m.index}
                    </div>

                    <div className="relative z-10 flex flex-col gap-1.5 pt-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[11px] tracking-[0.22em] font-bold"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: isUpcoming ? "rgba(148,140,124,0.3)" : "#C9A24B",
                          }}
                        >
                          {m.quarter} {m.year}
                        </span>
                        <div
                          className="h-px flex-1 max-w-[40px]"
                          style={{
                            background: isUpcoming ? "#1B2334" : "rgba(201,162,75,0.35)",
                          }}
                        />
                      </div>

                      <h3
                        className="text-[22px] font-medium tracking-tight leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: isUpcoming ? "rgba(148,140,124,0.3)" : "#F4EFE4",
                        }}
                      >
                        {m.phase}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1">
                        {isComplete && (
                          <span
                            className="text-[9px] tracking-widest px-2 py-0.5"
                            style={{
                              fontFamily: "var(--font-mono)",
                              border: "1px solid rgba(201,162,75,0.3)",
                              color: "#C9A24B",
                              background: "rgba(201,162,75,0.07)",
                              borderRadius: "2px",
                            }}
                          >
                            ✓ COMPLETE
                          </span>
                        )}
                        {isActive && (
                          <span
                            className="inline-flex items-center gap-1.5 text-[9px] tracking-widest px-2 py-0.5"
                            style={{
                              fontFamily: "var(--font-mono)",
                              border: "1px solid rgba(201,162,75,0.35)",
                              color: "#C9A24B",
                              background: "rgba(201,162,75,0.08)",
                              borderRadius: "2px",
                            }}
                          >
                            <motion.span
                              className="inline-block w-1 h-1 rounded-full"
                              style={{ background: "#C9A24B" }}
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                            />
                            IN PROGRESS
                          </span>
                        )}
                        {isUpcoming && (
                          <span
                            className="text-[9px] tracking-widest px-2 py-0.5"
                            style={{
                              fontFamily: "var(--font-mono)",
                              border: "1px solid #1B2334",
                              color: "rgba(148,140,124,0.3)",
                              borderRadius: "2px",
                            }}
                          >
                            UPCOMING
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: items grid */}
                  <div
                    className={`grid sm:grid-cols-2 gap-x-10 gap-y-3.5 content-center ${isUpcoming ? "opacity-20" : ""}`}
                  >
                    {m.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.14 + j * 0.07 + 0.45, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-px h-4 mt-0.5 shrink-0"
                          style={{
                            background: isUpcoming
                              ? "#1B2334"
                              : isActive
                              ? "#C9A24B"
                              : "rgba(201,162,75,0.5)",
                          }}
                        />
                        <span
                          className="text-[13px] leading-snug"
                          style={{
                            color: isComplete
                              ? "rgba(244,239,228,0.45)"
                              : isActive
                              ? "rgba(244,239,228,0.65)"
                              : "rgba(148,140,124,0.55)",
                          }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
