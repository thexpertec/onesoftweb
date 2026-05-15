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
  Users, Heart, Clock, Shield, Package, RefreshCw, MessageSquare,
  Phone, Calendar, Rocket, Wrench, BarChart3, Search, Bot,
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

/* ─────────────────── Conversation Mockup ──────────────────── */
function ConversationMockup() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const bg     = isLight ? "#ffffff" : "#07111f";
  const sideBg = isLight ? "#F5F5F5" : "#0a0f1a";
  const divider= isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)";
  const t45    = isLight ? "rgba(15,23,42,0.45)" : "rgba(255,255,255,0.4)";
  const t70    = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.7)";

  const messages = [
    { from: "client", text: "We need a website for our restaurant — online menu, reservations, and a gallery." },
    { from: "agent",  text: "Perfect. Do you have a brand identity already, or would you like us to design that too?" },
    { from: "client", text: "We have a logo and colours. Just need the site built." },
    { from: "agent",  text: "Got it. We'll build on React + Tailwind — fast, SEO-ready, and easy to update yourself later." },
    { from: "client", text: "How long will it take?" },
    { from: "agent",  text: "7–10 working days from today. We'll share a live staging link for your review before go-live." },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: bg, border: `1px solid ${divider}`, boxShadow: "0 30px 60px rgba(0,0,0,0.14)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${divider}`, background: sideBg }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,77,160,0.15)", border: "1px solid rgba(30,77,160,0.30)" }}>
            <MessageSquare className="w-4.5 h-4.5" style={{ color: "#1E4DA0" }} />
          </div>
          <div>
            <p className="text-sm font-bold">Discovery Call</p>
            <p className="text-xs" style={{ color: t45 }}>OneSoft Web Team · Typically replies in minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs" style={{ color: t45 }}>Online now</span>
        </div>
      </div>

      {/* Messages */}
      <div className="px-5 py-5 space-y-3 min-h-[240px]">
        {messages.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.4 }}
            className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              style={m.from === "client"
                ? { background: "#1E4DA0", color: "#fff", borderBottomRightRadius: "6px" }
                : { background: isLight ? "#F5F5F5" : "rgba(255,255,255,0.07)", color: t70, borderBottomLeftRadius: "6px" }}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ borderTop: `1px solid ${divider}`, background: sideBg }}>
        <div className="flex-1 rounded-xl px-4 py-2.5 text-sm" style={{ background: isLight ? "#F5F5F5" : "rgba(255,255,255,0.06)", color: t45 }}>
          Tell us about your project…
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#1E4DA0" }}>
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Data ───────────────────────────────── */

const ACCENT = "#1E4DA0";

const techStack = [
  { icon: Code2,       color: "#1E4DA0", label: "React & Next.js",   desc: "Lightning-fast, SEO-optimised apps with server-side rendering." },
  { icon: Globe,       color: "#1E4DA0", label: "WordPress",          desc: "Easy CMS with WooCommerce for product catalogues & blogs." },
  { icon: ShoppingCart,color: "#1E4DA0", label: "Shopify / Ecomm",   desc: "Full-stack storefronts with payments, inventory & shipping." },
  { icon: Smartphone,  color: "#1E4DA0", label: "Mobile-First PWA",  desc: "App-like experiences that work offline and install to home screens." },
  { icon: Bot,         color: "#1E4DA0", label: "AI-Powered Sites",   desc: "Chat widgets, recommendation engines, and intelligent search built in." },
  { icon: Wrench,      color: ACCENT,    label: "Any Stack You Need", desc: "Vue, Nuxt, Laravel, Django — we work in whatever fits your project." },
];

const whatYouGet = [
  { icon: Palette,   color: "#1E4DA0", title: "Custom Design",          desc: "Every pixel designed around your brand. No templates, no off-the-shelf layouts." },
  { icon: Search,    color: "#1E4DA0", title: "SEO From Day One",        desc: "Structured data, meta tags, sitemaps, Core Web Vitals — ranked before you launch." },
  { icon: Smartphone,color: "#1E4DA0", title: "100% Mobile-Responsive",  desc: "Looks and performs perfectly on every screen size, tested on real devices." },
  { icon: Shield,    color: "#1E4DA0", title: "Secure & GDPR-Ready",     desc: "SSL, cookie consent, privacy policy, and security headers built in by default." },
  { icon: RefreshCw, color: "#1E4DA0", title: "Post-Launch Support",     desc: "30 days of free fixes after go-live, then optional monthly retainer packages." },
  { icon: BarChart3, color: "#1E4DA0", title: "Analytics & Reporting",   desc: "Google Analytics 4, Search Console, and a monthly traffic report included." },
];

const flow = [
  { step: "01", icon: MessageSquare, color: "#1E4DA0", title: "Discover",  detail: "We start with a free 30-minute call. Tell us your goals, audience, and tech preferences — no brief required." },
  { step: "02", icon: Palette,       color: "#1E4DA0", title: "Design",    detail: "We produce mockups in Figma first. You approve the look and feel before a single line of code is written." },
  { step: "03", icon: Code2,         color: "#1E4DA0", title: "Build",     detail: "Development on your chosen stack with weekly progress check-ins. A live staging link throughout." },
  { step: "04", icon: Rocket,        color: "#1E4DA0", title: "Launch",    detail: "We handle hosting setup, domain config, and go-live. Then hand you the keys with full documentation." },
];

const industries = [
  { icon: UtensilsCrossed, color: "#1E4DA0", label: "Restaurants & Cafes" },
  { icon: Stethoscope,     color: "#1E4DA0", label: "Clinics & Healthcare" },
  { icon: GraduationCap,   color: "#1E4DA0", label: "Schools & Coaching" },
  { icon: ShoppingCart,    color: "#1E4DA0", label: "Retail & E-commerce" },
  { icon: Building2,       color: "#1E4DA0", label: "Corporates & Agencies" },
  { icon: Heart,           color: "#1E4DA0", label: "Events & Hospitality" },
  { icon: Package,         color: ACCENT,    label: "Distributors & Logistics" },
  { icon: Bot,             color: "#1E4DA0", label: "SaaS & Tech Startups" },
];

const testimonials = [
  { quote: "OneSoft built our restaurant website in 8 days. Online reservations went from zero to 200+ bookings in the first month. Exceptional work.", name: "Khalid Mansour",   role: "Owner",    co: "Casa Bella Restaurant", color: "#1E4DA0" },
  { quote: "We asked for a clinic website with an appointment system. They delivered something better than we imagined — on time and on budget.", name: "Dr. Priya Sharma",  role: "Director", co: "HealthFirst Clinic",   color: "#1E4DA0" },
  { quote: "The discovery call was 20 minutes. The site was live in 9 days. No agency has ever moved this fast without cutting corners.", name: "James Okafor",     role: "Founder",  co: "Pixel & Oak Agency",   color: "#1E4DA0" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function OneThemesPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"                  : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"                  : "#04091a";
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
      <div className="relative pt-24 pb-8 md:pt-28 md:pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30,77,160,0.13), transparent)" }} />
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full"
            style={{ background: "rgba(30,77,160,0.09)", filter: "blur(90px)" }}
            animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full"
            style={{ background: "rgba(30,77,160,0.06)", filter: "blur(110px)" }}
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
            <span style={{ color: ACCENT, fontWeight: 600 }}>OneSites — Custom Website Development</span>
          </motion.div>

          {/* two-column hero */}
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                  style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
                  <Palette className="w-3.5 h-3.5" />OneSites — Custom Website Development
                </span>
              </motion.div>

              <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
                Your website,{" "}
                <span style={{ color: ACCENT }}>built for you.</span>
              </motion.h1>

              <motion.p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: t60 }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                Not a template. Not a website builder. A bespoke website built from scratch on the tech stack that suits your business — React, WordPress, Shopify, or anything else. Start with a free discovery call.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                  style={{ background: ACCENT, border: "none", color: "#ffffff" }}
                  onClick={() => openCTAModal("OneSites — Custom Website")}>
                  Discuss Your Website <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <button className="h-14 px-8 text-base rounded-lg font-medium transition-all duration-200"
                  style={{ background: secBtnBg, border: `1px solid ${secBtnBorder}`, color: secBtnColor }}
                  onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}>
                  See Our Process
                </button>
              </motion.div>

              {/* Trust pills */}
              <motion.div className="flex flex-wrap gap-3 mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                {["Free discovery call", "Any tech stack", "7–14 day delivery", "30-day support included"].map(item => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", border: `1px solid ${dividerColor}`, color: t65 }}>
                    <CheckCircle2 className="w-3 h-3" style={{ color: ACCENT }} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: chat mockup */}
            <motion.div className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.3 }}>
              <ConversationMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-10 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 320,  suf: "+",   label: "Websites Delivered",      Icon: Globe,      color: ACCENT },
              { to: 98,   suf: "%",   label: "On-Time Delivery Rate",   Icon: Clock,      color: "#1E4DA0" },
              { to: 40,   suf: "+",   label: "Industries Served",       Icon: Building2,  color: "#1E4DA0" },
              { to: 7,    suf: " days",label: "Average Delivery Time",  Icon: Zap,        color: "#1E4DA0" },
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

      {/* ═══ PROCESS ═════════════════════════════════════════════ */}
      <div id="process" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(30,77,160,0.06), transparent)" }} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
              <Sparkles className="w-3.5 h-3.5" />How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">From conversation to live site.</h2>
            <p style={{ color: t55 }} className="text-lg">
              No lengthy briefs. No surprise invoices. A clear four-step process from first call to launch day.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
                    style={{ background: pageBg, border: `1px solid ${f.color}40` }}>
                    <ArrowRight className="w-2.5 h-2.5" style={{ color: f.color }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TECH STACK ══════════════════════════════════════════ */}
      <div className="py-16" style={{ background: isLight ? "#ffffff" : sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
              <Code2 className="w-3.5 h-3.5" />Any Technology, Your Choice
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">We build on whatever<br />works best for you.</h2>
            <p style={{ color: t50 }} className="text-lg">
              We don't push a single stack. We recommend the right tool for your budget, goals, and team — then build it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {techStack.map((tech, i) => (
              <motion.div key={tech.label}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: isLight ? `${tech.color}10` : `${tech.color}0d`,
                  border: `1.5px solid ${isLight ? tech.color + "35" : tech.color + "22"}`,
                }}
                whileHover={{ y: -5, boxShadow: `0 24px 48px ${tech.color}22` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: isLight ? `${tech.color}22` : `${tech.color}20`, border: `1.5px solid ${isLight ? tech.color + "55" : tech.color + "38"}` }}>
                  <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: isLight ? "#0f172a" : undefined }}>{tech.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: isLight ? "rgba(0,0,0,0.55)" : t50 }}>{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ WHAT YOU GET + CTA CARD ═════════════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(30,77,160,0.05), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-16">

            {/* Left: what you get */}
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
                <CheckCircle2 className="w-3.5 h-3.5" />What's Included
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Everything you need.<br />Nothing you don't.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                Every website we build comes with the full package — no upsells, no hidden extras, no "premium add-on" surprises.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whatYouGet.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: isLight ? `${item.color}0a` : `${item.color}08`, border: `1px solid ${item.color}20` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}35` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: t45 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: quick-start card */}
            <motion.div className="flex-1 w-full max-w-md lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.10)" }}>
                <div className="px-6 pt-6 pb-5" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,77,160,0.15)", border: "1px solid rgba(30,77,160,0.30)" }}>
                      <Phone className="w-4 h-4" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Start with a free call</p>
                      <p className="text-xs" style={{ color: t45 }}>No obligation, no salesperson</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: t55 }}>
                    Tell us what you need in 30 minutes. We'll come back with a scope, timeline, and fixed-price quote — usually within 24 hours.
                  </p>
                </div>

                <div className="px-6 py-5 space-y-3">
                  {[
                    { icon: Calendar, label: "Book a 30-min discovery call", color: ACCENT },
                    { icon: MessageSquare, label: "Or chat with us via WhatsApp", color: "#1E4DA0" },
                    { icon: Globe, label: "Or fill in a quick project brief", color: "#1E4DA0" },
                  ].map((opt, i) => (
                    <button key={i}
                      onClick={() => openCTAModal("OneThemes — Custom Website")}
                      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:opacity-80"
                      style={{ background: isLight ? `${opt.color}08` : `${opt.color}0a`, border: `1px solid ${opt.color}25` }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${opt.color}20`, border: `1px solid ${opt.color}35` }}>
                        <opt.icon className="w-4 h-4" style={{ color: opt.color }} />
                      </div>
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0" style={{ color: opt.color }} />
                    </button>
                  ))}
                </div>

                <div className="mx-6 mb-5 rounded-xl p-4" style={{ background: "rgba(30,77,160,0.08)", border: "1px solid rgba(30,77,160,0.20)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: t65 }}>Every project includes</p>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                    {["Figma mockups first", "Fixed-price quote", "Staging preview link", "Full source code handover", "30-day free fixes", "Hosting setup help"].map(item => (
                      <div key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: ACCENT }} />
                        <span className="text-[11px]" style={{ color: t55 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button className="w-full py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: ACCENT, color: "#fff" }}
                    onClick={() => openCTAModal("OneSites — Custom Website")}>
                    Get a Free Quote Today <ArrowRight className="inline ml-1.5 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ INDUSTRIES ══════════════════════════════════════════ */}
      <div className="py-16" style={{ background: isLight ? "#ffffff" : sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
              <Building2 className="w-3.5 h-3.5" />Industries We Serve
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Whatever your business does,<br />we've built it before.</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div key={ind.label}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl"
                style={{ background: isLight ? `${ind.color}10` : `${ind.color}0d`, border: `1.5px solid ${ind.color}30` }}>
                <ind.icon className="w-4 h-4" style={{ color: ind.color }} />
                <span className="text-sm font-semibold" style={{ color: isLight ? "#0f172a" : undefined }}>{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-16" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
              <Star className="w-3.5 h-3.5 fill-current" />Client Results
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

      {/* ═══ FINAL CTA ═══════════════════════════════════════════ */}
      <div className="py-8 md:py-10 lg:py-[60px] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(30,77,160,0.09), transparent)" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: ACCENT }}>
              <Lock className="w-3.5 h-3.5" />Free call · Fixed price · Full ownership
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Tell us what you need.<br />
              <span style={{ color: ACCENT }}>We'll build it.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              320+ websites delivered. 40+ industries served. One free call to get started — no commitment, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: ACCENT, border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("OneSites — Custom Website")}>
                Book a Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Clients in 40+ countries</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("OneSites — Custom Website")} />
      <FeatureMarqueeSection
        accentColor={ACCENT}
        heading="What We Build For You"
        subheading="Every website is built from scratch — no templates, no shortcuts. Here's what goes into every project."
        row1={[
          { icon: "🎨", label: "Custom UI Design",         color: ACCENT    },
          { icon: "⚛️", label: "React & Next.js",          color: "#1E4DA0" },
          { icon: "🛍️", label: "WooCommerce Stores",      color: "#1E4DA0" },
          { icon: "📱", label: "Mobile-Responsive",        color: "#1E4DA0" },
          { icon: "🔍", label: "SEO Optimised",            color: "#1E4DA0" },
          { icon: "🔒", label: "SSL & Security Headers",   color: "#1E4DA0" },
          { icon: "⚡", label: "Core Web Vitals",          color: "#1E4DA0" },
          { icon: "🤖", label: "AI Chat Integration",      color: "#1E4DA0" },
          { icon: "📊", label: "Google Analytics 4",       color: "#1E4DA0" },
          { icon: "🗺️", label: "Google Maps Embed",       color: "#1E4DA0" },
          { icon: "📝", label: "Lead Capture Forms",       color: "#1E4DA0" },
          { icon: "🌍", label: "Multi-Language Support",   color: "#1E4DA0" },
        ]}
        row2={[
          { icon: "🖼️", label: "Figma Mockups First",     color: ACCENT    },
          { icon: "🏗️", label: "WordPress / Headless",    color: "#1E4DA0" },
          { icon: "🛒", label: "Shopify Storefronts",     color: "#1E4DA0" },
          { icon: "🧩", label: "Reusable Components",     color: "#1E4DA0" },
          { icon: "📄", label: "CMS Integration",         color: "#1E4DA0" },
          { icon: "🔗", label: "3rd-Party API Hooks",     color: "#1E4DA0" },
          { icon: "📅", label: "Booking Systems",         color: "#1E4DA0" },
          { icon: "💳", label: "Payment Gateways",        color: "#1E4DA0" },
          { icon: "🔔", label: "Push Notifications",      color: "#1E4DA0" },
          { icon: "🧾", label: "Invoicing Pages",         color: "#1E4DA0" },
          { icon: "☁️", label: "Cloud Deployment",        color: "#1E4DA0" },
          { icon: "🛡️", label: "GDPR Cookie Consent",    color: "#1E4DA0" },
        ]}
        row3={[
          { icon: "📸", label: "Image Optimisation",      color: ACCENT    },
          { icon: "🎥", label: "Video Hero Sections",     color: "#1E4DA0" },
          { icon: "🏆", label: "Portfolio Grids",         color: "#1E4DA0" },
          { icon: "💬", label: "Testimonial Blocks",      color: "#1E4DA0" },
          { icon: "📣", label: "Promo Banners",           color: "#1E4DA0" },
          { icon: "🔄", label: "30-Day Post-Launch Fix",  color: "#1E4DA0" },
          { icon: "📦", label: "Full Source Handover",    color: "#1E4DA0" },
          { icon: "🧑‍💻", label: "Clean, Documented Code", color: "#1E4DA0" },
          { icon: "🌙", label: "Dark Mode Option",        color: "#1E4DA0" },
          { icon: "📋", label: "Sitemap & Robots.txt",   color: "#1E4DA0" },
          { icon: "🔑", label: "Admin Panel Access",      color: "#1E4DA0" },
          { icon: "📬", label: "Email / SMTP Setup",      color: "#1E4DA0" },
        ]}
      />
      <CustomSolutionsSection accentColor={ACCENT} productName="OneSites" />
      <Footer />
    </div>
  );
}
