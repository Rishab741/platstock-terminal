"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="access" className="relative overflow-hidden" style={{ borderTop: "1px solid #1B2334" }}>

      <div className="relative max-w-[1240px] mx-auto px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">

          {/* Left — brand + CTA */}
          <div className="space-y-7">
            <a
              href="/"
              className="inline-block text-[20px] tracking-tight hover:text-[#E8D3A0] transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "#F4EFE4",
              }}
            >
              Platstock
            </a>
            <p className="text-[14px] leading-relaxed max-w-sm" style={{ color: "#948C7C" }}>
              Democratizing institutional-grade quantitative analytics. Built for boutique hedge funds and family offices navigating the next era of capital markets.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
              className="group inline-flex items-center gap-2 px-6 py-3 text-[13.5px] font-medium transition-all duration-300 cursor-pointer"
              style={{ background: "#C9A24B", color: "#0A0E17", borderRadius: "3px" }}
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right — link columns */}
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
                <div
                  className="text-[9px] tracking-[0.22em] uppercase mb-5"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.4)" }}
                >
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/stay-tuned"
                        className="text-[13px] transition-colors duration-200"
                        style={{ color: "#948C7C" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#F4EFE4")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#948C7C")}
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

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #1B2334" }}
        >
          <div
            className="text-[11px] tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(148,140,124,0.3)" }}
          >
            © 2026 Platstock Institutional. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: "SOC2 READY" },
              { label: "SHA-256" },
              { label: "SOVEREIGN" },
            ].map(({ label }) => (
              <span
                key={label}
                className="text-[9px] tracking-widest px-2 py-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  border: "1px solid #1B2334",
                  color: "rgba(148,140,124,0.4)",
                  borderRadius: "2px",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
