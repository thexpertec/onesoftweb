import { useRef, useEffect } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, BarChart3, Zap, Clock, Star,
  Search, Rocket, Users, TrendingUp, AlertCircle,
  XCircle, Shield, Globe, FileText, Link2, Code2,
  Target, Layers, RefreshCw, Eye, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  Heart, ShoppingCart, Bot, MapPin, PenTool, Cpu,
} from "lucide-react";

const BLUE  = "#1E4DA0";
const GREEN = "#16a34a";

/* ── Count-up ─────────────────────────────────────────────── */
function CountUp({ to, suffix = "", prefix = "", duration = 2 }:
  { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration, ease: "easeOut",
      onUpdate(v) { if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [inView]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ── Data ─────────────────────────────────────────────────── */

const problems = [
  {
    icon: XCircle,
    title: "You're invisible on Google where your customers search",
    desc: "93% of online experiences begin with a search engine. If your business isn't on page one for the terms your customers use, you simply don't exist to them — no matter how good you are.",
  },
  {
    icon: AlertCircle,
    title: "Your competitors are ranking and taking your traffic",
    desc: "Every day you're not ranking, a competitor is. Organic search traffic compounds over time — the longer you wait, the bigger the gap becomes and the harder it is to close.",
  },
  {
    icon: XCircle,
    title: "Technical issues are silently killing your rankings",
    desc: "Slow load times, crawl errors, duplicate content, broken links, and missing schema markup are all signals that tell Google your site isn't worth ranking — even if your content is excellent.",
  },
  {
    icon: AlertCircle,
    title: "Previous SEO work left no lasting results",
    desc: "Cheap link schemes, keyword stuffing, and black-hat tactics may produce short-term spikes but result in penalties that take months to recover from. Real SEO is slower — and permanent.",
  },
];

const solutions = [
  { icon: Cpu,      color: BLUE, title: "Technical SEO Audit",        desc: "Full crawl analysis, Core Web Vitals, indexation issues, site architecture, and structured data — fixed at the root." },
  { icon: PenTool,  color: BLUE, title: "On-Page Optimisation",       desc: "Title tags, meta descriptions, heading hierarchy, internal linking, and keyword mapping across every key page." },
  { icon: FileText, color: BLUE, title: "SEO Content Strategy",       desc: "Keyword research and content briefs designed to capture intent at every stage — awareness, consideration, and decision." },
  { icon: Link2,    color: BLUE, title: "Link Building",               desc: "White-hat, editorial backlinks from authoritative, relevant websites — the kind that move rankings and stay." },
  { icon: MapPin,   color: BLUE, title: "Local SEO",                  desc: "Google Business Profile optimisation, local citations, and review strategy to dominate your city-level search results." },
  { icon: Globe,    color: BLUE, title: "International SEO",          desc: "Hreflang implementation, geo-targeted content, and multi-region strategy for businesses with global audiences." },
  { icon: BarChart3,color: BLUE, title: "Monthly Reporting",          desc: "Rankings, organic traffic, click-through rates, and conversions — clear monthly reports you can actually understand." },
  { icon: RefreshCw,color: BLUE, title: "Ongoing Optimisation",       desc: "SEO isn't a one-time project. We monitor, adapt, and expand as algorithms update and competition shifts." },
];

const pillars = [
  { icon: Cpu,      color: BLUE, label: "Technical",  desc: "Site speed, crawlability, Core Web Vitals, schema markup, and indexation health." },
  { icon: PenTool,  color: BLUE, label: "On-Page",    desc: "Keyword mapping, content structure, internal links, and meta optimisation on every page." },
  { icon: Link2,    color: BLUE, label: "Off-Page",   desc: "Authority-building through editorial backlinks, citations, and brand mentions." },
  { icon: FileText, color: BLUE, label: "Content",    desc: "Intent-matched content that answers real questions and earns natural rankings over time." },
];

const process = [
  { step: "01", icon: Search,    title: "Audit & Research",      detail: "We audit your current site health, keyword landscape, and competitor rankings. You get a full picture of where you stand and what it will take to win." },
  { step: "02", icon: Target,    title: "Strategy & Roadmap",    detail: "We build a prioritised 90-day roadmap — technical fixes first, then on-page, then content and links — so every action is sequenced for maximum impact." },
  { step: "03", icon: Layers,    title: "Implementation",        detail: "We make all technical changes directly, produce optimised content, and execute the link-building plan with full transparency on every placement." },
  { step: "04", icon: BarChart3, title: "Track & Report",        detail: "Monthly reporting on ranking movements, organic traffic, and conversions. We adjust strategy every month based on what the data tells us." },
];

const stats = [
  { prefix: "",  to: 340, suffix: "%", label: "Avg. organic traffic increase" },
  { prefix: "",  to: 6,   suffix: " months", label: "To first page results" },
  { prefix: "",  to: 180, suffix: "+", label: "Clients ranked" },
  { prefix: "",  to: 0,   suffix: " penalties", label: "From our methods" },
];

const testimonials = [
  {
    quote: "We were on page 4 for every keyword that mattered. Eight months later we hold positions 1–3 for our top 12 terms. Organic leads have tripled.",
    name: "Samir Osman", role: "Managing Director", co: "ProFit Gym Equipment UK",
  },
  {
    quote: "The technical audit alone uncovered 47 issues we had no idea about. After fixing them our indexation rate went from 62% to 98% in six weeks.",
    name: "Priya Joshi", role: "Head of Digital", co: "Greenfield Education Group",
  },
  {
    quote: "Competing against national brands as a local business felt impossible. OneSoft got us ranking number one in our city for every core service within five months.",
    name: "Tariq Bilal", role: "Owner", co: "Premier Dental Care, Leeds",
  },
];

const industries = [
  { icon: ShoppingCart,    label: "Retail & E-commerce" },
  { icon: Stethoscope,     label: "Healthcare & Clinics" },
  { icon: GraduationCap,   label: "Education & Training" },
  { icon: UtensilsCrossed, label: "Restaurants & Food" },
  { icon: Building2,       label: "Legal & Professional" },
  { icon: Heart,           label: "Events & Hospitality" },
  { icon: Package,         label: "Products & B2B" },
  { icon: Bot,             label: "SaaS & Tech" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function SEOPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ══════════════════════════════════════════════════════
          ATTENTION — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-32 lg:pb-14 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: `radial-gradient(circle, ${GREEN}, transparent 70%)` }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Search className="w-3 h-3" /> SEO Optimisation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Rank higher. Get found.{" "}
              <span style={{ color: BLUE }}>Grow without paying for every click.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              OneSoft delivers technical, on-page, and off-page SEO that builds lasting organic visibility — so your ideal customers find you first, every time they search.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                Get a Free SEO Audit <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                style={{ borderColor: divider, color: headingColor }}
                onClick={openCTAModal}>
                Book a Strategy Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap items-center justify-center gap-5 mt-10">
              {[
                { icon: TrendingUp, label: "340% avg. traffic increase" },
                { icon: Clock,      label: "First page in 6 months" },
                { icon: Users,      label: "180+ clients ranked" },
                { icon: Shield,     label: "Zero penalty methods" },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-2">
                  <t.icon className="w-4 h-4" style={{ color: BLUE }} />
                  <span className="text-sm font-medium" style={{ color: t45 }}>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.25)", color: "#dc2626" }}>
              <AlertCircle className="w-3 h-3" /> The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>
              If you're not on page one, you're not in the game
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              75% of users never scroll past the first page of search results. The top three results alone capture over 50% of all clicks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {problems.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.20)" }}>
                  <p.icon className="w-4.5 h-4.5" style={{ color: "#dc2626" }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1.5" style={{ color: headingColor }}>{p.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: t70 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SOLUTION — What We Do
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <CheckCircle2 className="w-3 h-3" /> The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>
              Full-spectrum SEO — technical, content, and authority
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              We cover every factor Google uses to rank sites — from millisecond load times to the quality of sites linking to yours.
            </p>
          </motion.div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
            {pillars.map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-2xl text-center"
                style={{ background: sectionBg, border: `1px solid ${BLUE}30` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                  <p.icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <p className="text-sm font-black mb-1" style={{ color: headingColor }}>{p.label}</p>
                <p className="text-xs leading-tight" style={{ color: t70 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="p-5 rounded-2xl"
                style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                  <s.icon className="w-4.5 h-4.5" style={{ color: BLUE }} />
                </div>
                <p className="text-sm font-bold mb-1.5" style={{ color: headingColor }}>{s.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: t70 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Rocket className="w-3 h-3" /> How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>
              A methodical approach that compounds over time
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              SEO done right is a compounding asset — every month builds on the last. Here's how we structure the work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {process.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                    <p.icon className="w-5 h-5" style={{ color: BLUE }} />
                  </div>
                  <span className="text-3xl font-black tabular-nums" style={{ color: `${BLUE}25` }}>{p.step}</span>
                </div>
                <p className="text-base font-black mb-2" style={{ color: headingColor }}>{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: t70 }}>{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROOF — Stats + Industries + Testimonials
      ══════════════════════════════════════════════════════ */}

      {/* Stats */}
      <section className="py-10 lg:py-14" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}>
                <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: BLUE }}>
                  <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </p>
                <p className="text-sm font-medium" style={{ color: t45 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: headingColor }}>
              We rank businesses in every sector
            </h2>
            <p className="text-sm" style={{ color: t45 }}>We understand the competitive SEO landscape in your industry — and what it takes to outrank the incumbents.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div key={ind.label}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
                  <ind.icon className="w-4 h-4" style={{ color: BLUE }} />
                </div>
                <p className="text-xs font-semibold leading-tight" style={{ color: headingColor }}>{ind.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Star className="w-3 h-3" /> Client Results
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>
              Rankings that last. Traffic that converts.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: BLUE }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: t70 }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${divider}` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: BLUE }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: headingColor }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: t45 }}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Final
      ══════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: BLUE }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
              <Zap className="w-3 h-3" /> Ready to rank?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Let's find out why you're not<br />ranking — and fix it for good
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Free SEO audit. We'll analyse your site, your keywords, and your competitors — then show you exactly what's holding you back and how to fix it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Get My Free SEO Audit <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <a href="mailto:info@onesoft.org.uk"
                className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold text-white/85 hover:text-white transition-colors">
                info@onesoft.org.uk
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  );
}
