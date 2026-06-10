"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Architecture", href: "#architecture" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Documentation", href: "#docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#" className="flex items-center gap-2.5 group">
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
        </a>

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

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#access"
            className="text-xs font-mono tracking-wider text-white/50 hover:text-white transition-colors duration-200 px-4 py-2"
          >
            Sign In
          </a>
          <a
            href="#access"
            className="relative text-xs font-mono tracking-wider px-4 py-2 rounded-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            <span className="relative text-white font-semibold">
              Request Access
            </span>
          </a>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-widest uppercase text-white/50 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#access"
                className="text-xs font-mono text-center py-2 rounded-md bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold mt-2"
              >
                Request Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
