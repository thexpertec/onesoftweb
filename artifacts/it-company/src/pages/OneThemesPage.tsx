import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FeatureMarqueeSection } from "@/components/FeatureMarqueeSection";
import { CustomSolutionsSection } from "@/components/CustomSolutionsSection";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, ChevronRight, Star, Globe, Palette, Zap, Layers,
  ShoppingCart, Stethoscope, GraduationCap, UtensilsCrossed, Building2,
  CheckCircle2, Sparkles, Lock, Smartphone, Monitor, Code2, TrendingUp,
  Users, Download, Heart, Clock, Shield, ImagePlay, Package, RefreshCw,
} from "lucide-react";

/* ─────────────────── count-up ───────────────────────────── */
function CountUp({ to, suffix = "", decimals = 0, duration = 2 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const ctrl = motionAnimate(0, to, { duration, ease: "easeOut", onUpdate(v) { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; } });
    return () => ctrl.stop();
  }, [isInView]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─────────────────── Template Preview Mockup ──────────────────── */
function TemplateMockup() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Restaurant", "Clinic", "Boutique", "Agency"];
  const previews = [
    {
      name: "Savour — Restaurant",
      color: "#ea580c",
      accent: "#fff7ed",
      nav: ["Menu", "Reservations", "Gallery", "Contact"],
      hero: { headline: "Fine Dining, Reimagined", sub: "Book your table tonight" },
      tags: ["POS-Ready", "Online Orders", "Gallery"],
    },
    {
      name: "MediCare — Clinic",
      color: "#0891b2",
      accent: "#f0f9ff",
      nav: ["Services", "Doctors", "Appointments", "Blog"],
      hero: { headline: "Your Health, Our Priority", sub: "Book an appointment now" },
      tags: ["Appointment Booking", "Doctor Profiles", "Blog"],
    },
    {
      name: "Luxe — Boutique",
      color: "#7c3aed",
      accent: "#faf5ff",
      nav: ["Shop", "Collections", "About", "Contact"],
      hero: { headline: "Wear Your Story", sub: "Explore the new collection" },
      tags: ["WooCommerce", "Wishlist", "Size Guide"],
    },
    {
      name: "Pixel — Agency",
      color: "#1a69c4",
      accent: "#eff6ff",
      nav: ["Work", "Services", "Team", "Contact"],
      hero: { headline: "We Build Digital Excellence", sub: "View our portfolio" },
      tags: ["Portfolio Grid", "Case Studies", "Team Cards"],
    },
  ];
  const p = previews[activeTab];

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0a1120" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3">
          <div className="rounded-md px-3 py-1 text-[10px] flex items-center gap-2" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
            <Globe className="w-2.5 h-2.5" />
            onethemes.io/preview/{tabs[activeTab].toLowerCase()}
          </div>
        </div>
        <div className="flex gap-1">
          {[Monitor, Smartphone].map((Icon, i) => (
            <div key={i} className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Icon className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 px-3 py-2" style={{ background: "#080f1e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)}
            className="px-3 py-1 rounded-md text-[10px] font-semibold transition-all"
            style={activeTab === i
              ? { background: p.color, color: "#fff" }
              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Simulated website */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="p-0" style={{ background: p.accent, minHeight: "260px" }}>
        {/* Simulated nav */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${p.color}20`, background: "#fff" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded" style={{ background: p.color }} />
            <span className="text-[10px] font-black" style={{ color: p.color }}>{p.name.split("—")[0].trim()}</span>
          </div>
          <div className="flex gap-3">
            {p.nav.map(n => <span key={n} className="text-[8px] font-semibold" style={{ color: "#374151" }}>{n}</span>)}
          </div>
          <div className="rounded-md px-2 py-1 text-[8px] font-bold" style={{ background: p.color, color: "#fff" }}>Book Now</div>
        </div>

        {/* Hero area */}
        <div className="px-5 py-6" style={{ background: `linear-gradient(135deg, ${p.color}12, ${p.color}04)` }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="inline-block text-[7px] font-bold px-2 py-0.5 rounded-full mb-2" style={{ background: `${p.color}18`, color: p.color }}>Premium Template</div>
              <h3 className="text-[18px] font-black leading-tight mb-1.5" style={{ color: "#111827" }}>{p.hero.headline}</h3>
              <p className="text-[9px] mb-3" style={{ color: "#6b7280" }}>{p.hero.sub}</p>
              <div className="flex gap-2">
                <div className="rounded-md px-3 py-1.5 text-[8px] font-bold" style={{ background: p.color, color: "#fff" }}>Get Started</div>
                <div className="rounded-md px-3 py-1.5 text-[8px] font-bold border" style={{ borderColor: p.color, color: p.color }}>Preview</div>
              </div>
            </div>
            {/* Simulated image block */}
            <div className="shrink-0 w-28 h-20 rounded-xl flex items-center justify-center" style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
              <div className="space-y-1.5 w-20">
                <div className="h-2 rounded-full" style={{ background: `${p.color}50` }} />
                <div className="h-1.5 rounded-full w-16" style={{ background: `${p.color}30` }} />
                <div className="h-1.5 rounded-full w-12" style={{ background: `${p.color}20` }} />
                <div className="grid grid-cols-3 gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-5 rounded" style={{ background: `${p.color}${20 + i * 10}` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tag row */}
        <div className="flex gap-2 px-5 py-2.5" style={{ background: "#fff", borderTop: `1px solid ${p.color}15` }}>
          <span className="text-[7.5px] font-semibold" style={{ color: "#9ca3af" }}>Includes:</span>
          {p.tags.map(tag => (
            <span key={tag} className="text-[7.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${p.color}12`, color: p.color }}>{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Footer strip */}
      <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#070e1c", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>Live preview</span>
        </div>
        <span className="text-[9px] font-semibold" style={{ color: p.color }}>OneThemes — {p.name}</span>
      </div>
    </div>
  );
}

/* ─────────────────── Data ───────────────────────────────── */

const ACCENT = "#f59e0b";

const categories = [
  { icon: UtensilsCrossed, color: "#ea580c", title: "Restaurant & Food", count: "18 templates", pts: ["POS-ready layout", "Online menu & ordering", "Reservation forms", "Gallery & events pages"] },
  { icon: Stethoscope,     color: "#0891b2", title: "Healthcare & Clinics", count: "14 templates", pts: ["Appointment booking", "Doctor profile pages", "Service listings", "Patient testimonials"] },
  { icon: ShoppingCart,    color: "#7c3aed", title: "Retail & E-commerce", count: "22 templates", pts: ["WooCommerce-ready", "Product showcase", "Wishlist & cart", "Seasonal promotion banners"] },
  { icon: GraduationCap,   color: "#1a69c4", title: "Education & Coaching", count: "16 templates", pts: ["Course listings", "Tutor profiles", "Enrolment forms", "Student testimonials"] },
  { icon: Building2,       color: "#10b981", title: "Corporate & Agency", count: "20 templates", pts: ["Portfolio grids", "Case study pages", "Team sections", "Contact & lead forms"] },
  { icon: Heart,           color: "#db2777", title: "Events & Hospitality", count: "12 templates", pts: ["Booking calendar", "Venue gallery", "Package pricing", "Vendor listings"] },
];

const features = [
  { icon: Zap,        color: "#f59e0b", title: "One-Click Deploy",    desc: "Templates ship with CI/CD-ready configs. Push to Vercel, Netlify, or cPanel in under 5 minutes." },
  { icon: Smartphone, color: "#10b981", title: "100% Mobile-First",   desc: "Every layout is designed and tested on mobile before desktop. Google PageSpeed 90+ guaranteed." },
  { icon: Code2,      color: "#1a69c4", title: "Clean, Editable Code",desc: "Built on React + Tailwind or WordPress + ACF. No bloated page builders. No lock-in." },
  { icon: Layers,     color: "#7c3aed", title: "Multi-Page Bundles",  desc: "Every template includes Home, About, Services, Contact, Blog, and an inner-page starter kit." },
  { icon: RefreshCw,  color: "#0891b2", title: "Free Lifetime Updates",desc: "Buy once, update forever. We push design improvements and security patches every quarter." },
  { icon: Shield,     color: "#ea580c", title: "GDPR & SEO Ready",    desc: "Cookie consent, structured data, sitemap, meta tags, and robots.txt included out of the box." },
];

const flow = [
  { step: "01", icon: Palette,    color: "#f59e0b", title: "Browse & Pick", detail: "Filter 100+ templates by industry, page count, or stack. Live preview every template before you buy." },
  { step: "02", icon: Code2,      color: "#10b981", title: "Customise",     detail: "Edit colours, fonts, content, and layout. Full source code delivered — no drag-and-drop restrictions." },
  { step: "03", icon: Globe,      color: "#1a69c4", title: "Launch",        detail: "Deploy to your hosting in minutes. We offer optional white-glove setup for an additional fee." },
];

const testimonials = [
  { quote: "We launched our restaurant website in 4 days using the Savour template. Reservations went up 60% in the first month.", name: "Khalid Mansour",   role: "Owner", co: "Casa Bella Restaurant", color: "#ea580c" },
  { quote: "The clinic template saved us weeks of design work. Our appointment bookings tripled after going live with OneThemes.", name: "Dr. Priya Sharma",  role: "Director", co: "HealthFirst Clinic", color: "#0891b2" },
  { quote: "Clean code, great design, zero headaches. We've used 3 templates across different client projects. Worth every penny.", name: "James Okafor",     role: "Founder", co: "Pixel & Oak Agency", color: "#7c3aed" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function OneThemesPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"                  : "#070e1c";
  const sectionBg    = isLight ? "#f1f5f9"                  : "#04091a";
  const tableBg      = isLight ? "#ffffff"                  : "#07111f";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)"         : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"       : "rgba(255,255,255,0.45)";
  const t50          = isLight ? "rgba(15,23,42,0.55)"      : "rgba(255,255,255,0.5)";
  const t55          = isLight ? "rgba(15,23,42,0.6)"       : "rgba(255,255,255,0.55)";
  const t60          = isLight ? "rgba(15,23,42,0.65)"      : "rgba(255,255,255,0.6)";
  const t65          = isLight ? "rgba(15,23,42,0.7)"       : "rgba(255,255,255,0.65)";
  const t85          = isLight ? "rgba(15,23,42,0.9)"       : "rgba(255,255,255,0.85)";
  const pageColor    = isLight ? "#0f172a"                  : "#fff";
  const secBtnBg     = isLight ? "rgba(0,0,0,0.05)"         : "rgba(255,255,255,0.06)";
  const secBtnBorder = isLight ? "rgba(0,0,0,0.15)"         : "rgba(255,255,255,0.12)";
  const secBtnColor  = isLight ? "rgba(15,23,42,0.85)"      : "rgba(255,255,255,0.85)";

  return (
    <div style={{ background: pageBg, color: pageColor }} className="min-h-screen overflow-hidden">
      <Navigation />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <div className="relative pt-32 pb-6 md:pt-40 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,158,11,0.15), transparent)" }} />
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full"
            style={{ background: "rgba(245,158,11,0.10)", filter: "blur(90px)" }}
            animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full"
            style={{ background: "rgba(245,158,11,0.07)", filter: "blur(110px)" }}
            animate={{ y: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </div>

        <div className="container mx-auto px-4">
          {/* breadcrumb */}
          <motion.div className="flex items-center gap-2 text-sm mb-8" style={{ color: t45 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="hover:underline transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: t50 }}>Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: ACCENT, fontWeight: 600 }}>OneThemes</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
                <Palette className="w-3.5 h-3.5" />Premium Website Templates for SMEs
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Your website,{" "}
              <span style={{ color: ACCENT }}>live this week.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              100+ professionally designed, fully coded templates across every industry — restaurants, clinics, schools, retail, agencies, and more. Buy once, own forever. No subscriptions, no page-builder bloat.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: ACCENT, border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("OneThemes")}>
                Browse Templates <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{ background: secBtnBg, border: `1px solid ${secBtnBorder}`, color: secBtnColor }}
                onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}>
                View Categories
              </button>
            </motion.div>
          </div>

          {/* Template preview mockup */}
          <motion.div className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <TemplateMockup />
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-10 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 100,  suf: "+",  label: "Templates Available",    Icon: Layers,     color: ACCENT },
              { to: 3200, suf: "+",  label: "Websites Launched",      Icon: Globe,      color: "#10b981" },
              { to: 98,   suf: "%",  label: "Client Satisfaction",    Icon: Heart,      color: "#db2777" },
              { to: 5,    suf: "min",label: "Average Deploy Time",    Icon: Zap,        color: "#1a69c4" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  <s.Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-1">
                  <CountUp to={s.to} suffix={s.suf} />
                </h3>
                <p style={{ color: t45 }} className="text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(245,158,11,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
              <Sparkles className="w-3.5 h-3.5" />Simple 3-Step Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">From browser to live — in hours.</h2>
            <p style={{ color: t55 }} className="text-lg">
              No agencies, no waiting lists, no mystery. Pick a template, customise the content, and ship it yourself — or let our team do it for you.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {flow.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{ background: `${f.color}0d`, border: `1px solid ${f.color}25` }}>
                <div className="absolute top-3 right-4 text-[42px] font-black leading-none select-none pointer-events-none"
                  style={{ color: t85 }}>{f.step}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}35` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p style={{ color: t50 }} className="text-sm leading-relaxed">{f.detail}</p>
                {i < flow.length - 1 && (
                  <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
                    style={{ background: pageBg, border: `1px solid ${f.color}40` }}>
                    <ArrowRight className="w-2.5 h-2.5" style={{ color: f.color }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TEMPLATE CATEGORIES ═════════════════════════════════ */}
      <div id="categories" className="py-16" style={{ background: isLight ? "#ffffff" : sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
              <Package className="w-3.5 h-3.5" />6 Industry Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Every industry.<br />Every business size.</h2>
            <p style={{ color: t50 }} className="text-lg">
              Templates designed around real business workflows — not generic lorem ipsum layouts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div key={cat.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: isLight ? `${cat.color}12` : `${cat.color}0d`,
                  border: `1.5px solid ${isLight ? cat.color + "40" : cat.color + "25"}`,
                  boxShadow: isLight ? `0 2px 16px ${cat.color}12` : "none",
                }}
                whileHover={{ y: -5, boxShadow: `0 24px 48px ${cat.color}25` }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: isLight ? `${cat.color}25` : `${cat.color}20`, border: `1.5px solid ${isLight ? cat.color + "60" : cat.color + "40"}` }}>
                    <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${cat.color}15`, color: cat.color }}>{cat.count}</span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: isLight ? "#0f172a" : undefined }}>{cat.title}</h3>
                <ul className="space-y-2 mt-3">
                  {cat.pts.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                        style={{ background: isLight ? `${cat.color}20` : `${cat.color}18`, border: `1px solid ${cat.color}40` }}>
                        <CheckCircle2 className="w-2.5 h-2.5" style={{ color: cat.color }} />
                      </div>
                      <span className="text-xs leading-relaxed" style={{ color: isLight ? "#475569" : t55 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FEATURES DEEP-DIVE ══════════════════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(245,158,11,0.06), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left: feature list */}
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
                <Zap className="w-3.5 h-3.5" />What Every Template Includes
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Built to launch.<br />Built to last.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                No half-finished templates. Every OneThemes purchase comes with the full feature set — no upsells, no premium add-ons.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: isLight ? `${feat.color}0c` : `${feat.color}0a`, border: `1px solid ${feat.color}20` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${feat.color}20`, border: `1px solid ${feat.color}35` }}>
                      <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{feat.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: t45 }}>{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button size="lg" className="h-13 px-8 text-base font-semibold mt-10"
                style={{ background: ACCENT, border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("OneThemes")}>
                Get a Template Today <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* Right: preview card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.15)" }}>
                      <Palette className="w-4 h-4" style={{ color: ACCENT }} />
                    </div>
                    <span className="font-bold text-sm">OneThemes — Template Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs" style={{ color: t45 }}>Available Now</span>
                  </div>
                </div>

                {/* Pricing tiers */}
                <div className="p-5 space-y-3">
                  {[
                    { name: "Starter",    price: "$49",  desc: "Single site licence, 1-year updates", color: ACCENT,   hot: false },
                    { name: "Business",   price: "$89",  desc: "3 sites, lifetime updates, priority support", color: "#10b981", hot: true  },
                    { name: "Agency",     price: "$149", desc: "Unlimited sites, white-label, reseller rights", color: "#7c3aed", hot: false },
                  ].map((tier, i) => (
                    <div key={i} className="rounded-xl p-4 flex items-center gap-3"
                      style={{ background: isLight ? `${tier.color}08` : `${tier.color}0a`, border: `1.5px solid ${tier.hot ? tier.color + "50" : tier.color + "20"}` }}>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold">{tier.name}</p>
                          {tier.hot && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: tier.color, color: "#fff" }}>POPULAR</span>}
                        </div>
                        <p className="text-xs" style={{ color: t45 }}>{tier.desc}</p>
                      </div>
                      <div className="ml-auto text-right shrink-0">
                        <p className="text-xl font-black" style={{ color: tier.color }}>{tier.price}</p>
                        <p className="text-[10px]" style={{ color: t45 }}>one-time</p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.20)" }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: t65 }}>Every purchase includes</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["Full source code", "Design assets", "Documentation", "Community access"].map(item => (
                        <div key={item} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: ACCENT }} />
                          <span className="text-[11px]" style={{ color: t55 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: ACCENT, color: "#fff" }}
                    onClick={() => openCTAModal("OneThemes")}>
                    Browse All Templates <ArrowRight className="inline ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-16" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
              <Star className="w-3.5 h-3.5 fill-current" />What Clients Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Real websites. Real results.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)", border: `1px solid ${t.color}25` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: t.color }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: t65 }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}35` }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: t45 }}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CTA ═════════════════════════════════════════════════ */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(245,158,11,0.10), transparent)" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: ACCENT }}>
              <Lock className="w-3.5 h-3.5" />One-time purchase · No subscriptions
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Stop renting a website.<br />
              <span style={{ color: ACCENT }}>Own one.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 3,200+ businesses that launched on OneThemes. Every template ships with clean code you own outright — no monthly fees, no lock-in.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: ACCENT, border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("OneThemes")}>
                Get Your Template <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Used by businesses in 40+ countries</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("OneThemes")} />
      <FeatureMarqueeSection
        accentColor={ACCENT}
        heading="Everything in OneThemes"
        subheading="100+ templates built around real industries — every page, every feature, ready to launch."
        row1={[
          { icon: "🍽️", label: "Restaurant Layout",     color: "#ea580c" },
          { icon: "🏥", label: "Clinic & Hospital",      color: "#0891b2" },
          { icon: "🛒", label: "E-commerce Ready",       color: "#7c3aed" },
          { icon: "🎓", label: "Education & Coaching",   color: "#1a69c4" },
          { icon: "💒", label: "Events & Weddings",      color: "#db2777" },
          { icon: "🏢", label: "Corporate & Agency",     color: "#10b981" },
          { icon: "📱", label: "Mobile-First Design",    color: ACCENT    },
          { icon: "⚡", label: "One-Click Deploy",       color: "#f97316" },
          { icon: "🎨", label: "Figma Source Files",     color: "#6366f1" },
          { icon: "🔒", label: "GDPR-Compliant",         color: "#14b8a6" },
          { icon: "🌍", label: "Multi-Language Ready",   color: "#a855f7" },
          { icon: "📊", label: "Google Analytics Setup", color: "#ef4444" },
        ]}
        row2={[
          { icon: "🖼️", label: "Full Page Layouts",     color: "#ea580c" },
          { icon: "🗂️", label: "Inner Page Templates",  color: "#0891b2" },
          { icon: "📝", label: "Contact & Lead Forms",   color: "#7c3aed" },
          { icon: "🧭", label: "Sticky Navigation",      color: "#1a69c4" },
          { icon: "💬", label: "Testimonial Blocks",     color: "#db2777" },
          { icon: "🏆", label: "Portfolio Grids",        color: "#10b981" },
          { icon: "🔔", label: "Cookie Consent",         color: ACCENT    },
          { icon: "🗺️", label: "Google Maps Embed",     color: "#f97316" },
          { icon: "🧩", label: "Reusable Components",    color: "#6366f1" },
          { icon: "☁️", label: "Cloud Hosting Guide",    color: "#14b8a6" },
          { icon: "🔄", label: "Lifetime Updates",       color: "#a855f7" },
          { icon: "📦", label: "Starter Content Pack",   color: "#ef4444" },
        ]}
        row3={[
          { icon: "⚙️", label: "Easy Customisation",    color: "#ea580c" },
          { icon: "🧾", label: "Invoice Page",           color: "#0891b2" },
          { icon: "📅", label: "Booking Calendar",       color: "#7c3aed" },
          { icon: "🎥", label: "Video Hero Support",     color: "#1a69c4" },
          { icon: "🔗", label: "Social Media Links",     color: "#db2777" },
          { icon: "🖨️", label: "Print-Ready Styles",    color: "#10b981" },
          { icon: "🌙", label: "Dark Mode Option",       color: ACCENT    },
          { icon: "🔍", label: "SEO Meta Tags",          color: "#f97316" },
          { icon: "💳", label: "Payment Page Template",  color: "#6366f1" },
          { icon: "📣", label: "Promo Banner Blocks",    color: "#14b8a6" },
          { icon: "🧑‍💻", label: "Clean React/WP Code",  color: "#a855f7" },
          { icon: "🛡️", label: "Security Best Practices",color: "#ef4444" },
        ]}
      />
      <CustomSolutionsSection accentColor={ACCENT} productName="OneThemes" />
      <Footer />
    </div>
  );
}
