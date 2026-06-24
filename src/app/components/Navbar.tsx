"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-md blur-sm group-hover:bg-cyan-400/40 transition-all duration-300" />
            <div className="relative flex items-center justify-center w-7 h-7 rounded-md border border-cyan-400/40 bg-black/40">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/90">
            Platstock
          </span>
          <span className="hidden sm:block text-[10px] font-mono text-cyan-400/60 tracking-widest border border-cyan-400/20 rounded px-1.5 py-0.5">
            TERMINAL
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-white/40 hover:text-cyan-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-access-modal"))}
            className="relative text-xs font-mono tracking-wider px-4 py-2 rounded-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            <span className="relative text-white font-semibold">Request Access</span>
          </button>
        </div>

        {/* Mobile Menu — shadcn Sheet */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden text-white/60 hover:text-white hover:bg-white/5"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="bg-black/95 backdrop-blur-xl border-l border-white/[0.06] w-72 p-0"
          >
            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded border border-cyan-400/30 bg-black/40">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                  Platstock
                </span>
              </div>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/40 hover:text-white hover:bg-white/5"
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
                  <span className="flex items-center px-3 py-2.5 rounded-lg text-xs tracking-widest uppercase text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200 font-mono cursor-pointer">
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
                    className="relative w-full text-xs font-mono tracking-wider py-2.5 rounded-md overflow-hidden group"
                  />
                }
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500" />
                <span className="relative text-white font-semibold">Request Access</span>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
