import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import {
  Mail, Phone, MapPin, Send, User, MessageSquare,
  Building2, ChevronDown, CheckCircle2, Clock,
  MessageCircle, Linkedin, Twitter, Youtube,
  ArrowRight,
} from "lucide-react";

const BLUE = "#1E4DA0";

const INTERESTS = [
  "Accounting & Bookkeeping ERP",
  "School ERP",
  "Hospital ERP",
  "E-commerce ERP",
  "Restaurant ERP",
  "Shadi Hall ERP",
  "Distributor ERP",
  "Website Development",
  "Custom Software Development",
  "AI & Automation",
  "SEO Optimisation",
  "Social Media Marketing",
  "Ad Creatives",
  "General Enquiry",
  "Partnership / Reseller",
  "Careers",
];

const offices = [
  {
    flag: "🇬🇧",
    city: "Hull",
    country: "United Kingdom",
    role: "Headquarters",
    address: "Hull, East Yorkshire, United Kingdom",
    phone: "+44 7984 273482",
    email: "info@onesoft.org.uk",
    hours: "Mon–Fri 09:00–17:00 GMT/BST",
  },
  {
    flag: "🇦🇪",
    city: "Dubai",
    country: "United Arab Emirates",
    role: "Middle East Office",
    address: "Business Bay, Dubai, UAE",
    phone: "+971 4 000 0000",
    email: "dubai@onesoft.org.uk",
    hours: "Sun–Thu 09:00–18:00 GST",
  },
  {
    flag: "🇵🇰",
    city: "Islamabad",
    country: "Pakistan",
    role: "Engineering Office",
    address: "G9 Markaz, Islamabad, Pakistan",
    phone: "+92 51 000 0000",
    email: "pk@onesoft.org.uk",
    hours: "Mon–Fri 09:00–18:00 PKT",
  },
];

const channels = [
  {
    icon: Mail,
    color: BLUE,
    label: "Email us",
    value: "info@onesoft.org.uk",
    sub: "We reply within one business day",
    href: "mailto:info@onesoft.org.uk",
  },
  {
    icon: Phone,
    color: "#16a34a",
    label: "Call us (UK)",
    value: "+44 7984 273482",
    sub: "Mon–Fri 09:00–17:00 GMT",
    href: "tel:+447984273482",
  },
  {
    icon: MessageCircle,
    color: "#7c3aed",
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    sub: "Typically replies within an hour",
    href: "https://wa.me/447984273482",
  },
  {
    icon: Linkedin,
    color: "#0a66c2",
    label: "LinkedIn",
    value: "OneSoft Ltd",
    sub: "Follow us for updates and insights",
    href: "#",
  },
];

const faqs = [
  {
    q: "How quickly can I get a demo?",
    a: "We typically schedule demos within 24–48 hours of your enquiry. Fill in the form and choose a time that works for you — we'll come prepared with a demo tailored to your business.",
  },
  {
    q: "Do you work with businesses outside the UK?",
    a: "Yes. We have clients across the UK, UAE, Pakistan, Canada, and beyond. Our Dubai and Islamabad offices serve clients across the Middle East and South Asia. Distance is not a barrier — we deliver and support remotely.",
  },
  {
    q: "How long does an ERP implementation take?",
    a: "Most of our ERP implementations go live within 2–4 weeks for standard configurations. More complex or heavily customised systems typically take 6–10 weeks. We'll give you a realistic timeline during your discovery call.",
  },
  {
    q: "What happens after I submit the form?",
    a: "A member of our team will review your enquiry and respond within one business day. For demo requests, we'll follow up to book a time. For general enquiries, we'll respond directly by email.",
  },
  {
    q: "Can I get support for an existing OneSoft system?",
    a: "Yes. If you're an existing client, please contact your dedicated account manager directly or email info@onesoft.org.uk with your company name and a description of the issue. For SLA clients, please reference your ticket priority.",
  },
  {
    q: "Do you offer white-label or reseller partnerships?",
    a: "Yes — we work with agencies and technology resellers who want to offer OneSoft products under their own brand. Select 'Partnership / Reseller' in the form and we'll share details of our partner programme.",
  },
];

/* ── FAQ row ──────────────────────────────────────────────── */
function FAQRow({ q, a, divider, cardBg, t70, t45, headingColor }:
  { q: string; a: string; divider: string; cardBg: string; t70: string; t45: string; headingColor: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${divider}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left">
        <span className="text-sm font-bold leading-snug" style={{ color: headingColor }}>{q}</span>
        <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 transition-transform"
          style={{ color: t45, transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: t70 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ContactPage() {
  useSEO(PAGE_SEO.contact);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const inputBg      = isLight ? "#F5F5F5"             : "rgba(255,255,255,0.04)";
  const inputBorder  = isLight ? "rgba(0,0,0,0.12)"   : "rgba(255,255,255,0.10)";
  const inputText    = isLight ? "#0f172a"             : "#ffffff";
  const inputPh      = isLight ? "rgba(15,23,42,0.4)"  : "rgba(255,255,255,0.35)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  const inputClass = `w-full py-3 px-4 rounded-xl text-sm outline-none transition-all`;
  const inputStyle = {
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputText,
  };

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <MessageCircle className="w-3 h-3" /> Contact Us
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5"
              style={{ color: headingColor }}>
              Let's talk about<br />
              <span style={{ color: BLUE }}>your business</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: t70 }}>
              Whether you want a demo, have a question about a specific product, or just want to explore what's possible — we'd love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT CHANNELS
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10" style={{ background: sectionBg, borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((c, i) => (
              <motion.a key={c.label} href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-2xl group transition-all"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}28` }}>
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: t45 }}>{c.label}</p>
                  <p className="text-sm font-black truncate" style={{ color: headingColor }}>{c.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: t45 }}>{c.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FORM + OFFICES
      ══════════════════════════════════════════════ */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* ── Contact form ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <h2 className="text-2xl font-black mb-2" style={{ color: headingColor }}>Send us a message</h2>
              <p className="text-sm mb-6" style={{ color: t70 }}>We respond to all enquiries within one business day.</p>

              <div className="rounded-2xl p-6 md:p-8" style={{ background: cardBg, border: `1px solid ${divider}` }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-14 text-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: `${BLUE}18` }}>
                      <CheckCircle2 className="w-8 h-8" style={{ color: BLUE }} />
                    </div>
                    <h3 className="text-xl font-black" style={{ color: headingColor }}>Message received!</h3>
                    <p className="text-sm max-w-xs leading-relaxed" style={{ color: t70 }}>
                      Our team will get back to you within one business day.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", company:"", interest:"", message:"" }); }}
                      className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
                      style={{ color: BLUE }}>
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handle} className="space-y-4">
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
                        <input type="text" required placeholder="Full Name" value={form.name} onChange={set("name")}
                          className={`${inputClass} pl-10`} style={inputStyle} />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
                        <input type="text" placeholder="Company (optional)" value={form.company} onChange={set("company")}
                          className={`${inputClass} pl-10`} style={inputStyle} />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
                        <input type="email" required placeholder="Email Address" value={form.email} onChange={set("email")}
                          className={`${inputClass} pl-10`} style={inputStyle} />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
                        <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set("phone")}
                          className={`${inputClass} pl-10`} style={inputStyle} />
                      </div>
                    </div>

                    {/* Interest */}
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10" style={{ color: t45 }} />
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10" style={{ color: t45 }} />
                      <select required value={form.interest} onChange={set("interest")}
                        className={`${inputClass} pl-10 pr-10 appearance-none cursor-pointer`}
                        style={{ ...inputStyle, color: form.interest ? inputText : inputPh }}>
                        <option value="" disabled style={{ background: isLight ? "#fff" : "#0f1929" }}>
                          What can we help with?
                        </option>
                        {INTERESTS.map(opt => (
                          <option key={opt} value={opt} style={{ background: isLight ? "#fff" : "#0f1929", color: inputText }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
                      <textarea rows={5} placeholder="Tell us about your business and what you're looking for…"
                        value={form.message} onChange={set("message")}
                        className={`${inputClass} pl-10 resize-none`} style={inputStyle} />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-70"
                      style={{ background: BLUE }}>
                      {loading
                        ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <Send className="w-4 h-4" />}
                      {loading ? "Sending…" : "Send Message"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>

                    <p className="text-[11px] text-center" style={{ color: t45 }}>
                      We never share your data. By submitting you agree to our{" "}
                      <a href="/privacy-policy" className="underline underline-offset-2" style={{ color: BLUE }}>
                        Privacy Policy
                      </a>.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Right column: offices + social ── */}
            <motion.div className="space-y-6"
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>

              <div>
                <h2 className="text-2xl font-black mb-2" style={{ color: headingColor }}>Our offices</h2>
                <p className="text-sm mb-6" style={{ color: t70 }}>Three offices. One team. Available across time zones.</p>
              </div>

              {offices.map((o, i) => (
                <motion.div key={o.city}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 rounded-2xl"
                  style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-0.5 shrink-0">{o.flag}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-base font-black" style={{ color: headingColor }}>{o.city}</p>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${BLUE}15`, color: BLUE, border: `1px solid ${BLUE}28` }}>
                          {o.role}
                        </span>
                      </div>
                      <p className="text-xs mb-3" style={{ color: t45 }}>{o.country}</p>
                      <div className="space-y-1.5">
                        {[
                          { icon: MapPin, val: o.address },
                          { icon: Phone,  val: o.phone   },
                          { icon: Mail,   val: o.email   },
                          { icon: Clock,  val: o.hours   },
                        ].map(item => (
                          <div key={item.val} className="flex items-center gap-2">
                            <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                            <p className="text-xs" style={{ color: t70 }}>{item.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social */}
              <div className="p-5 rounded-2xl" style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <p className="text-sm font-black mb-4" style={{ color: headingColor }}>Follow OneSoft</p>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn", href: "#", color: "#0a66c2" },
                    { icon: Twitter,  label: "X / Twitter", href: "#", color: headingColor },
                    { icon: Youtube,  label: "YouTube", href: "#", color: "#dc2626" },
                  ].map(s => (
                    <a key={s.label} href={s.href} aria-label={s.label}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: sectionBg, border: `1px solid ${divider}`, color: s.color }}>
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQs
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              Common questions
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Quick answers before you reach out.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <FAQRow {...faq} divider={divider} cardBg={cardBg} t70={t70} t45={t45} headingColor={headingColor} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
