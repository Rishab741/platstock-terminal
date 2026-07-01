"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  // On homepage the hero has its own nav, so start hidden.
  // On other pages (e.g. /pricing) show immediately.
  const [hidden, setHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const prevY = useRef(0);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setHidden(false);
      setScrolled(true);
    }
  }, []);

  useEffect(() => {
    const isHome = window.location.pathname === "/";
    const onScroll = () => {
      const y = window.scrollY;

      if (isHome && y < 80) {
        setHidden(true);
      } else if (y > prevY.current + 8) {
        setHidden(true);
      } else if (y < prevY.current - 8) {
        setHidden(false);
      }

      prevY.current = y;
      setScrolled(y > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300"
      style={
        scrolled
          ? {
              background: "rgba(10,14,23,0.92)",
              borderBottom: "1px solid #1B2334",
              backdropFilter: "blur(16px)",
            }
          : undefined
      }
    >
      <div className="max-w-[1240px] mx-auto px-8 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="text-[18px] text-[#F4EFE4] tracking-tight hover:text-[#E8D3A0] transition-colors"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
        >
          Platstock
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] tracking-[0.12em] uppercase text-[#948C7C] hover:text-[#F4EFE4] transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
            className="inline-flex items-center gap-1.5 text-[12px] text-[#E8D3A0]/70 hover:text-[#C9A24B] transition-colors duration-200 border border-[#1B2334] hover:border-[#C9A24B]/50 px-4 py-2"
            style={{ fontFamily: "var(--font-mono)", borderRadius: "3px" }}
          >
            Request access
          </button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden text-[#948C7C] hover:text-[#F4EFE4] hover:bg-[#1B2334]/50"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-l border-[#1B2334] w-72 p-0"
            style={{ background: "#121826" }}
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1B2334]">
              <span
                className="text-[17px] text-[#F4EFE4]"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Platstock
              </span>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#948C7C] hover:text-[#F4EFE4] hover:bg-[#1B2334]/50"
                    aria-label="Close menu"
                  />
                }
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </SheetClose>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-3 py-4">
              {navLinks.map((link) => (
                <SheetClose key={link.label} render={<a href={link.href} />}>
                  <span
                    className="flex items-center px-3 py-3 text-[11px] tracking-[0.18em] uppercase text-[#948C7C] hover:text-[#F4EFE4] hover:bg-[#1B2334]/40 transition-all duration-200 cursor-pointer"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-5 pb-6 mt-2">
              <SheetClose
                render={
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
                    className="w-full text-[12px] py-3 border border-[#1B2334] hover:border-[#C9A24B]/50 text-[#E8D3A0]/70 hover:text-[#C9A24B] transition-all duration-200"
                    style={{ fontFamily: "var(--font-mono)", borderRadius: "3px" }}
                  />
                }
              >
                Request access
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
