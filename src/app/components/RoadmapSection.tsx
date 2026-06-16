"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Circle, Loader } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

type MilestoneStatus = "complete" | "active" | "upcoming";

const milestones: {
  quarter: string;
  phase: string;
  status: MilestoneStatus;
  items: string[];
  color: string;
}[] = [
  {
    quarter: "Q1 2026",
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
    quarter: "Q2 2026",
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
    quarter: "Q3 2026",
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
    quarter: "Q4 2026",
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

function StatusIcon({ status }: { status: MilestoneStatus }) {
  if (status === "complete")
    return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  if (status === "active")
    return (
      <Loader className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
    );
  return <Circle className="w-5 h-5 text-white/20" />;
}

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roadmap" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-mono tracking-widest text-violet-400/70 mb-6">
            INSTITUTIONAL SCALE & ROADMAP
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                The Precision{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Rollout
                </span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                From design partners to global scale, a systematic progression from sovereign infrastructure to enterprise SaaS dominance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Simulation Paths",
                  value: "10K+",
                  sub: "Monte Carlo Engine",
                  color: "#7c3aed",
                },
                {
                  label: "Revenue Model",
                  value: "SaaS",
                  sub: "High-margin Enterprise",
                  color: "#06b6d4",
                },
                {
                  label: "Target Market",
                  value: "HF + FO",
                  sub: "Hedge Funds & Family Offices",
                  color: "#a78bfa",
                },
                {
                  label: "Defensibility Layers",
                  value: "4x",
                  sub: "Compounding Tech Moat",
                  color: "#10b981",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i + 1}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.10] transition-colors duration-300"
                >
                  <div
                    className="text-2xl font-bold font-mono font-tabular"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-mono tracking-widest text-white/30 mt-1 uppercase">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-white/20 mt-0.5">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[calc(50%-0.5px)] lg:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/40 via-cyan-400/30 via-violet-500/20 to-transparent" />

          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                custom={i + 2}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative grid lg:grid-cols-[240px_1fr] gap-0 group"
              >
                <div className="flex lg:justify-end items-start pt-8 pr-0 lg:pr-8 pb-4 gap-4 lg:gap-0">
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: milestone.color }}
                    >
                      {milestone.quarter}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                      {milestone.phase}
                    </span>
                    <div
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full border mt-1 ${
                        milestone.status === "complete"
                          ? "border-emerald-500/30 text-emerald-400/60 bg-emerald-500/5"
                          : milestone.status === "active"
                          ? "border-cyan-500/30 text-cyan-400/60 bg-cyan-500/5"
                          : "border-white/10 text-white/20"
                      }`}
                    >
                      {milestone.status === "complete"
                        ? "COMPLETE"
                        : milestone.status === "active"
                        ? "IN PROGRESS"
                        : "UPCOMING"}
                    </div>
                  </div>
                </div>

                <div className="relative flex gap-4 pl-8 lg:pl-0 pt-0 lg:pt-8 pb-10">
                  <div className="absolute left-0 lg:-left-[calc(0.5px)] top-8 lg:top-[2.25rem] flex items-center justify-center lg:-translate-x-1/2">
                    <div
                      className="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor:
                          milestone.status === "upcoming"
                            ? "rgba(255,255,255,0.1)"
                            : milestone.color,
                        background:
                          milestone.status === "upcoming"
                            ? "rgba(0,0,0,0.8)"
                            : `${milestone.color}15`,
                      }}
                    >
                      <StatusIcon status={milestone.status} />
                    </div>
                    {milestone.status !== "upcoming" && (
                      <div
                        className="absolute w-8 h-8 rounded-full opacity-20 blur-md"
                        style={{ background: milestone.color }}
                      />
                    )}
                  </div>

                  <div className="ml-6 lg:ml-6 flex-1 pb-2">
                    <div
                      className="rounded-xl border p-5 transition-all duration-300 group-hover:border-opacity-40"
                      style={{
                        borderColor:
                          milestone.status === "upcoming"
                            ? "rgba(255,255,255,0.05)"
                            : `${milestone.color}25`,
                        background:
                          milestone.status === "active"
                            ? `${milestone.color}05`
                            : "rgba(255,255,255,0.015)",
                      }}
                    >
                      <ul className="space-y-2.5">
                        {milestone.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <div
                              className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{
                                background:
                                  milestone.status === "upcoming"
                                    ? "rgba(255,255,255,0.2)"
                                    : milestone.color,
                              }}
                            />
                            <span
                              className={`text-xs leading-relaxed ${
                                milestone.status === "upcoming"
                                  ? "text-white/30"
                                  : milestone.status === "active"
                                  ? "text-white/60"
                                  : "text-white/50"
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
