import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, Send, Phone, Mail, User,
  MessageSquare, Building2, ChevronDown, Zap,
} from "lucide-react";
import { useCTAModal } from "@/context/CTAModalContext";

const INTERESTS = [
  "Accounting & Bookkeeping ERP",
  "School ERP",
  "Hospital ERP",
  "E-commerce ERP",
  "Restaurant ERP",
  "Shadi Hall ERP",
  "Distributor ERP",
  "Pharmacy ERP",
  "Hotel & Hospitality ERP",
  "Real Estate ERP",
  "Gym & Fitness ERP",
  "Garments / Textile ERP",
  "Transport & Logistics ERP",
  "OneSites – Custom Website",
  "Custom Development",
  "AI & Automation",
  "General Enquiry",
];

const EMPTY = { name: "", email: "", phone: "", interest: "", message: "" };

export function CTAModal() {
  const { state, closeCTAModal } = useCTAModal();
  const { open, interest: preInterest } = state;

  const [form, setForm] = useState({ ...EMPTY, interest: preInterest });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, interest: preInterest });
      setSubmitted(false);
      setLoading(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, preInterest]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCTAModal(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCTAModal]);

  const set = (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeCTAModal();
  };

  const inputCls =
    "w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: "rgba(4,8,20,0.85)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1526] shadow-2xl shadow-black/70 overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-primary" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-base leading-tight">Book a Free Demo</h2>
                  <p className="text-white/45 text-xs">Response within 24 hours · No commitment</p>
                </div>
              </div>
              <button
                onClick={closeCTAModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Request Received!</h3>
                    <p className="text-white/55 text-sm max-w-xs">
                      Our team will reach out within 24 hours to schedule your personalised demo.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ ...EMPTY, interest: preInterest }); }}
                      className="px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white text-sm transition-all"
                    >
                      Submit another
                    </button>
                    <button
                      onClick={closeCTAModal}
                      className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handle} className="space-y-3.5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Full Name"
                        className={inputCls}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="Phone (optional)"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="Work Email"
                      className={inputCls}
                    />
                  </div>

                  {/* Interest */}
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none z-10" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none z-10" />
                    <select
                      required
                      value={form.interest}
                      onChange={set("interest")}
                      className="w-full appearance-none pl-9 pr-9 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all cursor-pointer"
                      style={{ color: form.interest ? "white" : "rgb(100 116 139)" }}
                    >
                      <option value="" disabled style={{ backgroundColor: "#0f1929", color: "#94a3b8" }}>
                        What are you interested in?
                      </option>
                      {INTERESTS.map(opt => (
                        <option key={opt} value={opt} style={{ backgroundColor: "#0f1929", color: "white" }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your business…"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                    style={{ color: "#ffffff" }}
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {loading ? "Sending…" : "Book My Free Demo"}
                  </button>

                  <p className="text-[10px] text-white/30 text-center">
                    We never share your data. Response within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
