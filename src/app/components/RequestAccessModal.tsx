"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

const selectCls =
  "h-9 w-full min-w-0 border border-input bg-transparent px-2.5 py-1 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 appearance-none cursor-pointer font-mono";

export default function RequestAccessModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState<string | null>(null);

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
      const data = await res.json();
      setRefCode(data.refCode ?? "");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: 12, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto overflow-hidden shadow-2xl"
              style={{
                background: "#121826",
                boxShadow: "0 0 0 1px #1B2334, 0 40px 80px rgba(0,0,0,0.6)",
                borderRadius: "3px",
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A24B, transparent)" }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-28 rounded-full blur-2xl pointer-events-none" style={{ background: "rgba(201,162,75,0.06)" }} />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <h2
                        className="text-[17px] tracking-tight"
                        style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#F4EFE4" }}
                      >
                        Request Terminal Access
                      </h2>
                      <p
                        className="text-[10px] mt-0.5 tracking-[0.2em] uppercase"
                        style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                      >
                        Private Beta
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </Button>
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
                        <div className="absolute inset-0 blur-xl rounded-full" style={{ background: "rgba(201,162,75,0.2)" }} />
                        <CheckCircle2 className="relative w-12 h-12" style={{ color: "#C9A24B" }} />
                      </div>
                      <div>
                        <h3
                          className="text-[18px] mb-1"
                          style={{ fontFamily: "var(--font-display)", color: "#F4EFE4" }}
                        >
                          Application Received
                        </h3>
                        <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: "#948C7C" }}>
                          We review each request personally. Expect a response within 48 hours.
                        </p>
                      </div>
                      <div
                        className="text-[10px] tracking-widest px-3 py-1.5"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "#C9A24B",
                          border: "1px solid rgba(201,162,75,0.3)",
                          background: "rgba(201,162,75,0.06)",
                          borderRadius: "2px",
                        }}
                      >
                        REF # {refCode}
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
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
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                            Full Name
                          </Label>
                          <Input
                            required
                            type="text"
                            placeholder="Full name"
                            className="h-9 font-mono text-sm"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                            Work Email
                          </Label>
                          <Input
                            required
                            type="email"
                            placeholder="Work email"
                            className="h-9 font-mono text-sm"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                          Firm / Company
                        </Label>
                        <Input
                          required
                          type="text"
                          placeholder="Firm or company name"
                          className="h-9 font-mono text-sm"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                            Your Role
                          </Label>
                          <select
                            required
                            className={selectCls}
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                          >
                            <option value="" disabled className="bg-[#0a0a14]">Select role</option>
                            {roles.map((r) => (
                              <option key={r} value={r} className="bg-[#0a0a14]">{r}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                            AUM Range
                          </Label>
                          <select
                            required
                            className={selectCls}
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

                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                          Primary Use Case
                        </Label>
                        <Textarea
                          rows={3}
                          placeholder="Describe your portfolio analytics needs and quantitative workflows you want to solve."
                          className="font-mono text-sm resize-none leading-relaxed"
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        />
                      </div>

                      {error && (
                        <p className="text-[11px] text-destructive font-mono text-center">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 text-[13px] font-medium tracking-wide flex items-center justify-center gap-2 transition-opacity duration-200 disabled:opacity-60 cursor-pointer"
                        style={{ background: "#C9A24B", color: "#0A0E17", borderRadius: "3px" }}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting…
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Submit Application
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </span>
                        )}
                      </button>

                      <p
                        className="text-[10px] text-center tracking-wide"
                        style={{ fontFamily: "var(--font-mono)", color: "#948C7C" }}
                      >
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
