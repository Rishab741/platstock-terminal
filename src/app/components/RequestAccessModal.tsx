"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";

const aumRanges = [
  "< $10M",
  "$10M – $50M",
  "$50M – $250M",
  "$250M – $1B",
  "> $1B",
];

const roles = [
  "Portfolio Manager",
  "Quantitative Analyst",
  "Chief Investment Officer",
  "Family Office Principal",
  "Fund Operations",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  aum: string;
  interest: string;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  aum: "",
  interest: "",
};

export default function RequestAccessModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-access-modal", handler);
    return () => window.removeEventListener("open-access-modal", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!open) setTimeout(() => { setSubmitted(false); setForm(empty); }, 400);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-200 font-mono";

  const label = "block text-[10px] font-mono tracking-widest text-white/35 uppercase mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: 16, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(145deg, rgba(10,6,20,0.98), rgba(5,3,10,0.99))",
                boxShadow: "0 0 0 1px rgba(124,58,237,0.15), 0 40px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg border border-cyan-400/25 bg-cyan-400/8 flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white tracking-tight">
                        Request Terminal Access
                      </h2>
                      <p className="text-[11px] text-white/35 font-mono mt-0.5">
                        PRIVATE BETA
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-lg border border-white/[0.07] bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/15 transition-all duration-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      className="py-10 flex flex-col items-center text-center gap-4"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl" />
                        <CheckCircle2 className="relative w-12 h-12 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          Application Received
                        </h3>
                        <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                          We review each request personally. Expect a response from our team within 24 hours.
                        </p>
                      </div>
                      <div className="text-[10px] font-mono text-white/20 tracking-widest border border-white/[0.06] rounded-full px-3 py-1.5">
                        REF # {Math.random().toString(36).slice(2, 10).toUpperCase()}
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="mt-2 text-xs text-white/30 hover:text-white/50 transition-colors font-mono"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={label}>Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Alex Chen"
                            className={field}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={label}>Work Email</label>
                          <input
                            required
                            type="email"
                            placeholder="alex@alphafund.com"
                            className={field}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={label}>Firm / Company</label>
                        <input
                          required
                          type="text"
                          placeholder="Alpha Capital Partners"
                          className={field}
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={label}>Your Role</label>
                          <select
                            required
                            className={`${field} appearance-none cursor-pointer`}
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0a0a14]">Select role</option>
                            {roles.map((r) => (
                              <option key={r} value={r} className="bg-[#0a0a14]">{r}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label}>AUM Range</label>
                          <select
                            required
                            className={`${field} appearance-none cursor-pointer`}
                            value={form.aum}
                            onChange={(e) => setForm({ ...form, aum: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0a0a14]">Select range</option>
                            {aumRanges.map((r) => (
                              <option key={r} value={r} className="bg-[#0a0a14]">{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={label}>Primary Use Case</label>
                        <textarea
                          rows={3}
                          placeholder="Describe your portfolio analytics needs — what quantitative workflows are you looking to solve?"
                          className={`${field} resize-none leading-relaxed`}
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        />
                      </div>

                      {error && (
                        <p className="text-[11px] text-red-400/80 font-mono text-center -mb-1">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full py-3 rounded-lg overflow-hidden text-sm font-semibold tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 transition-opacity duration-300 group-hover:opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2 text-white">
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            <>
                              Submit Application
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </span>
                      </button>

                      <p className="text-[10px] text-center text-white/20 font-mono">
                        Each application is personally reviewed · No spam, ever
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
