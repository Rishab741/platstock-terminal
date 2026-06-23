"use client";

import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer id="access" className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/15 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-cyan-400/15 rounded-md blur-sm" />
                <div className="relative flex items-center justify-center w-8 h-8 rounded-md border border-cyan-400/30 bg-black/60">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-semibold tracking-[0.12em] uppercase text-white/80">
                Platstock
              </span>
              <span className="text-[10px] font-mono text-cyan-400/50 tracking-widest border border-cyan-400/15 rounded px-1.5 py-0.5">
                TERMINAL
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-sm">
              Democratizing institutional-grade quantitative analytics. Built for boutique hedge funds and family offices navigating the next era of capital markets.
            </p>
            <div className="flex gap-3">
              <Button
                variant="gradient"
                size="lg"
                className="gap-2 px-5 h-10"
                onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
              >
                Request Access
                <ArrowRight className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: "Product",
                links: ["Terminal", "Alpha Engine", "Sovereign Data", "Mobile App", "API Docs"],
              },
              {
                title: "Company",
                links: ["About", "Design Partners", "Press Kit", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Security", "Compliance", "SOC2"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-[10px] font-mono tracking-widest text-white/25 uppercase mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/stay-tuned"
                        className="text-xs text-white/35 hover:text-white/60 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-white/20">
            © 2026 Platstock Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: "SOC2 READY", color: "text-emerald-400/50 border-emerald-500/20" },
              { label: "256-BIT", color: "text-cyan-400/50 border-cyan-500/20" },
              { label: "SOVEREIGN", color: "text-violet-400/50 border-violet-500/20" },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`text-[9px] font-mono tracking-widest px-2 py-1 rounded border ${badge.color}`}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
