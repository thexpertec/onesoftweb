import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Phone, Mail, User, MessageSquare, Building2, ChevronDown } from "lucide-react";

const INTERESTS = [
  "School ERP",
  "Hospital ERP",
  "E-commerce ERP",
  "Restaurant ERP",
  "Shadi Hall ERP",
  "Distributor ERP",
  "PowerThemes – Website",
  "Custom Development",
  "General Enquiry",
];

const BENEFITS = [
  "Free system demo tailored to your business",
  "Dedicated onboarding & training included",
  "Go live in as little as 2 weeks",
  "UK-based support team available 24 / 7",
];

export function CTAFormSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#060b16]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/12 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-14 items-start max-w-6xl mx-auto">

          {/* LEFT — pitch */}
          <motion.div
            className="flex-1 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
              Book a Free Demo
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Let's Build Something<br />
              <span className="text-primary">Powerful Together</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Fill out the quick form and one of our specialists will walk you through a live demo of the exact ERP module you need — no generic pitches, just your solution.
            </p>

            <ul className="space-y-4 mb-10">
              {BENEFITS.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-white/80 text-sm"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {b}
                </motion.li>
              ))}
            </ul>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-3">
              <a href="mailto:hello@powertech.co.uk" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-white/[0.04] text-white/60 hover:text-white hover:border-primary/40 text-sm transition-all">
                <Mail className="w-4 h-4 text-primary" /> hello@powertech.co.uk
              </a>
              <a href="tel:+441234567890" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 bg-white/[0.04] text-white/60 hover:text-white hover:border-primary/40 text-sm transition-all">
                <Phone className="w-4 h-4 text-primary" /> +44 1234 567 890
              </a>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Received!</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Our team will reach out within 24 hours to schedule your personalised demo.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", interest:"", message:"" }); }}
                    className="text-primary text-sm underline underline-offset-4 hover:text-primary/80"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handle} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Quick Enquiry Form</h3>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="Phone (optional)"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="Work Email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  {/* Interest select */}
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                    <select
                      required
                      value={form.interest}
                      onChange={set("interest")}
                      className="w-full appearance-none pl-10 pr-10 py-3 rounded-lg border border-white/10 bg-white/[0.05] text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all cursor-pointer"
                      style={{ color: form.interest ? "white" : "rgb(100 116 139)" }}
                    >
                      <option value="" disabled style={{ backgroundColor: "#0f1929", color: "#94a3b8" }}>
                        Interested In…
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
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your business and what you need…"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/[0.05] text-white placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {loading ? "Sending…" : "Book My Free Demo"}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    We never share your data. By submitting you agree to our Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
