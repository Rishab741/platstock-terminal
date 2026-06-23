"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    color: "#10b981",
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
    color: "#06b6d4",
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
    color: "#7c3aed",
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
    color: "#a78bfa",
  },
];

function ProgressRail({ inView }: { inView: boolean }) {
  return (
    <div className="flex gap-1.5 mt-8">
      {milestones.map((m, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1.5">
          <div className="relative h-0.5 bg-white/[0.06] overflow-hidden rounded-full">
            {m.status === "complete" && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: m.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            {m.status === "active" && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}50)` }}
                initial={{ width: 0 }}
                animate={inView ? { width: "52%" } : {}}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] font-mono tracking-widest"
              style={{ color: m.status === "upcoming" ? "rgba(255,255,255,0.18)" : m.color }}
            >
              {m.quarter} {m.year}
            </span>
            <span
              className="text-[9px] font-mono tracking-widest"
              style={{ color: m.status === "upcoming" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)" }}
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-7">
            INSTITUTIONAL SCALE & ROADMAP
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                The Precision{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rollout
                </span>
              </h2>
              <p className="text-white/35 text-sm mt-3 max-w-md leading-relaxed">
                From design partners to global scale, a systematic progression from sovereign infrastructure to enterprise SaaS dominance.
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0 pb-0.5">
              {[
                { value: "10K+", label: "Monte Carlo Paths" },
                { value: "3", label: "Quant Models" },
                { value: "4×", label: "Defensibility Layers" },
              ].map((s) => (
                <div key={s.label} className="text-right">
                  <div className="text-lg font-bold font-mono text-white/70">{s.value}</div>
                  <div className="text-[9px] font-mono tracking-widest text-white/25 uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <ProgressRail inView={inView} />
        </motion.div>

        {/* Milestones */}
        <div className="border-t border-white/[0.07]">
          {milestones.map((m, i) => {
            const isUpcoming = m.status === "upcoming";
            const isActive = m.status === "active";
            const isComplete = m.status === "complete";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14 + 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-b border-white/[0.05] group"
              >
                {/* Left accent line */}
                {isComplete && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: `linear-gradient(to bottom, transparent, ${m.color}50, transparent)` }}
                  />
                )}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: `linear-gradient(to bottom, transparent, ${m.color}, transparent)` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Subtle row hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${m.color}04, transparent)` }}
                />

                <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 py-10 pl-5">

                  {/* Left: index + meta */}
                  <div className="relative overflow-hidden">
                    {/* Ghost index number */}
                    <div
                      className="absolute -top-6 -left-1 text-[96px] font-black font-mono leading-none pointer-events-none select-none"
                      style={{
                        color: isUpcoming ? "rgba(255,255,255,0.015)" : `${m.color}09`,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {m.index}
                    </div>

                    <div className="relative z-10 flex flex-col gap-1.5 pt-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[11px] font-mono tracking-[0.22em] font-bold"
                          style={{ color: isUpcoming ? "rgba(255,255,255,0.2)" : m.color }}
                        >
                          {m.quarter} {m.year}
                        </span>
                        <div
                          className="h-px flex-1 max-w-[40px]"
                          style={{ background: isUpcoming ? "rgba(255,255,255,0.08)" : `${m.color}40` }}
                        />
                      </div>

                      <h3
                        className="text-[22px] font-bold tracking-tight leading-tight"
                        style={{ color: isUpcoming ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.88)" }}
                      >
                        {m.phase}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1">
                        {isComplete && (
                          <Badge
                            variant="outline"
                            className="h-auto py-0.5 px-2 text-[9px] font-mono tracking-widest border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          >
                            ✓ COMPLETE
                          </Badge>
                        )}
                        {isActive && (
                          <Badge
                            variant="outline"
                            className="h-auto py-0.5 px-2 text-[9px] font-mono tracking-widest gap-1.5"
                            style={{ borderColor: `${m.color}40`, color: m.color, background: `${m.color}10` }}
                          >
                            <motion.span
                              className="inline-block w-1 h-1 rounded-full"
                              style={{ background: m.color }}
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                            />
                            IN PROGRESS
                          </Badge>
                        )}
                        {isUpcoming && (
                          <Badge
                            variant="outline"
                            className="h-auto py-0.5 px-2 text-[9px] font-mono tracking-widest border-white/10 bg-white/5 text-white/25"
                          >
                            UPCOMING
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: items grid */}
                  <div className={`grid sm:grid-cols-2 gap-x-10 gap-y-3.5 content-center ${isUpcoming ? "opacity-25" : ""}`}>
                    {m.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.14 + j * 0.07 + 0.45, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-px h-4 mt-0.5 shrink-0 rounded-full"
                          style={{
                            background: isUpcoming
                              ? "rgba(255,255,255,0.25)"
                              : isActive
                              ? m.color
                              : `${m.color}80`,
                          }}
                        />
                        <span
                          className="text-[13px] leading-snug"
                          style={{
                            color: isComplete
                              ? "rgba(255,255,255,0.50)"
                              : isActive
                              ? "rgba(255,255,255,0.65)"
                              : "rgba(255,255,255,0.55)",
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
