"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Menu } from "lucide-react";
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
  const [hidden, setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevY    = useRef(0);
  const entered  = useRef(false); // true after first scroll fires

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      entered.current = true;

      if (y < 60) {
        setHidden(false);
      } else if (y > prevY.current + 8) {
        setHidden(true);  // scrolling down → hide
      } else if (y < prevY.current - 8) {
        setHidden(false); // scrolling up → reveal
      }

      prevY.current = y;
      setScrolled(y > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{
        type: "tween",
        duration: entered.current ? 0.3 : 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/55 border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-cyan-400/15 rounded-md blur-sm group-hover:bg-cyan-400/30 transition-all duration-300" />
            <div className="relative flex items-center justify-center w-7 h-7 rounded-md border border-cyan-400/30 bg-black/40">
              <Terminal className="w-3.5 h-3.5 text-cyan-400/80" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/80">
            Platstock
          </span>
          <span className="hidden sm:block text-[10px] font-mono text-white/25 tracking-widest border border-white/[0.08] rounded px-1.5 py-0.5">
            TERMINAL
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-white/35 hover:text-white/75 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
            className="text-xs font-mono tracking-wider px-4 py-2 rounded-md border border-white/[0.10] bg-transparent text-white/60 hover:border-violet-500/50 hover:[background:linear-gradient(135deg,rgba(124,58,237,0.22),rgba(6,182,212,0.14))] hover:text-white hover:shadow-[0_0_16px_rgba(124,58,237,0.20)] transition-all duration-300"
          >
            Request Access
          </button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden text-white/50 hover:text-white hover:bg-white/5"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="bg-black/95 backdrop-blur-xl border-l border-white/[0.05] w-72 p-0"
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded border border-white/[0.12] bg-black/40">
                  <Terminal className="w-3 h-3 text-cyan-400/70" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/60">
                  Platstock
                </span>
              </div>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/35 hover:text-white hover:bg-white/5"
                    aria-label="Close menu"
                  />
                }
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </SheetClose>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => (
                <SheetClose key={link.label} render={<a href={link.href} />}>
                  <span className="flex items-center px-3 py-2.5 rounded-lg text-xs tracking-widest uppercase text-white/35 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-200 font-mono cursor-pointer">
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
                    className="w-full text-xs font-mono tracking-wider py-2.5 rounded-md border border-white/[0.10] bg-transparent text-white/60 hover:border-violet-500/50 hover:[background:linear-gradient(135deg,rgba(124,58,237,0.22),rgba(6,182,212,0.14))] hover:text-white hover:shadow-[0_0_14px_rgba(124,58,237,0.18)] transition-all duration-300"
                  />
                }
              >
                Request Access
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
