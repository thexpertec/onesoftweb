import { useRef, useEffect } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, Brush, Zap, Clock, Star,
  MessageSquare, Rocket, Users, TrendingUp, AlertCircle,
  XCircle, BarChart3, Target, Eye, Play, Image,
  Layers, PenTool, Monitor, Smartphone, Video,
  Package, Building2, GraduationCap, Stethoscope,
  UtensilsCrossed, Heart, ShoppingCart, Bot,
  MousePointerClick, Palette, Megaphone, FileText,
} from "lucide-react";

const BLUE   = "#1E4DA0";
const ORANGE = "#ea580c";

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
    title: "Ad spend wasted on creatives that don't convert",
    desc: "You can have the best targeting in the world — but if the creative doesn't stop the scroll in under two seconds, the money is gone. Most ads fail before they're ever seen.",
  },
  {
    icon: AlertCircle,
    title: "Generic visuals that look like every other ad",
    desc: "Stock photos, templated designs, and recycled formats have trained audiences to tune out. Your creative needs to feel fresh, native, and worth a second look every single time.",
  },
  {
    icon: XCircle,
    title: "No system for testing what actually works",
    desc: "Without variants and A/B testing built into your creative workflow, you're guessing. Every campaign runs on hope instead of data — and performance never improves.",
  },
  {
    icon: AlertCircle,
    title: "Creative output can't keep up with campaign demand",
    desc: "Running ads across Meta, Google, TikTok, and YouTube means you need dozens of formats, sizes, and variants. Most in-house teams can't produce at that volume or quality.",
  },
];

const solutions = [
  { icon: Image,             color: BLUE, title: "Static Ad Design",          desc: "High-conversion static creatives for Meta, Google Display, and LinkedIn — every size and placement." },
  { icon: Video,             color: BLUE, title: "Video Ad Production",        desc: "Scroll-stopping video ads for Instagram, TikTok, YouTube, and Meta — scripted, shot, and edited." },
  { icon: Play,              color: BLUE, title: "Motion Graphics & Reels",    desc: "Animated ads and branded Reels that feel native to the platform and designed to perform." },
  { icon: MousePointerClick, color: BLUE, title: "Conversion-First Copywriting", desc: "Headlines, hooks, and CTAs written specifically to drive clicks — not just impressions." },
  { icon: Layers,            color: BLUE, title: "A/B Creative Variants",      desc: "Multiple variants of every creative so you can test, learn, and scale only what works." },
  { icon: Palette,           color: BLUE, title: "Brand-Consistent Design",    desc: "Every creative aligns with your brand identity — colour, typography, tone — across every platform." },
  { icon: Monitor,           color: BLUE, title: "Google & Display Banners",   desc: "Full suites of HTML5-ready and static banners in all standard IAB sizes for Google Display Network." },
  { icon: FileText,          color: BLUE, title: "Ad Creative Strategy",       desc: "We analyse your audience, funnel stage, and offer to brief creatives that align with your campaign goals." },
];

const platforms = [
  { label: "Meta Ads",     sub: "Facebook & Instagram",   color: "#1877f2" },
  { label: "TikTok Ads",   sub: "Short-form video",        color: "#010101" },
  { label: "Google Ads",   sub: "Search & Display",        color: "#ea4335" },
  { label: "YouTube Ads",  sub: "Pre-roll & bumper ads",   color: "#ff0000" },
  { label: "LinkedIn Ads", sub: "B2B lead generation",     color: "#0077b5" },
  { label: "Snapchat Ads", sub: "Story & Discover formats",color: "#fffc00" },
];

const process = [
  { step: "01", icon: Target,    title: "Brief & Strategy",    detail: "We learn your offer, audience, funnel stage, and campaign objective. Every creative decision flows from this brief." },
  { step: "02", icon: PenTool,   title: "Concept & Copy",      detail: "We develop creative concepts and ad copy. You review and approve the direction before any design work begins." },
  { step: "03", icon: Brush,     title: "Design & Production", detail: "We produce all formats, sizes, and variants. Video, static, motion — delivered ready to upload directly to your ad account." },
  { step: "04", icon: BarChart3, title: "Test & Iterate",      detail: "We track creative performance, identify winners, and brief the next round of creatives based on real data." },
];

const stats = [
  { prefix: "",  to: 2,   suffix: "×",  label: "Avg. CTR improvement" },
  { prefix: "",  to: 400, suffix: "+",  label: "Campaigns produced" },
  { prefix: "",  to: 6,   suffix: " platforms", label: "Covered natively" },
  { prefix: "",  to: 48,  suffix: "hr", label: "Avg. turnaround" },
];

const testimonials = [
  {
    quote: "Our Meta Ads CTR doubled in the first month after switching to OneSoft creatives. The video ads they produce are genuinely better than anything an agency charged us 5× more for.",
    name: "Raza Khan", role: "Head of Marketing", co: "NovaBuild Properties",
  },
  {
    quote: "We went from spending £3,000 a month with nothing to show for it to a 4.2 ROAS within six weeks. The creative strategy they brought was the difference.",
    name: "Emma Clarke", role: "E-commerce Director", co: "Velvet & Co.",
  },
  {
    quote: "They turned our product launch into a full creative campaign — static, video, stories, banners — everything matched perfectly and the results spoke for themselves.",
    name: "Adnan Siddiqui", role: "Founder", co: "SnapPack Snack Foods",
  },
];

const industries = [
  { icon: ShoppingCart,    label: "Retail & E-commerce" },
  { icon: UtensilsCrossed, label: "Restaurants & Food" },
  { icon: Stethoscope,     label: "Healthcare & Clinics" },
  { icon: GraduationCap,   label: "Education & Coaching" },
  { icon: Building2,       label: "Property & Finance" },
  { icon: Heart,           label: "Events & Hospitality" },
  { icon: Package,         label: "Products & FMCG" },
  { icon: Bot,             label: "SaaS & Tech" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function AdCreativesPage() {
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
            style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 70%)` }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Brush className="w-3 h-3" /> Ad Creatives
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Ads that{" "}
              <span style={{ color: BLUE }}>stop the scroll</span>
              {" "}and convert the click
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              OneSoft produces high-conversion ad creatives — static, video, and motion — for Meta, TikTok, Google, YouTube, and LinkedIn. Built to perform, not just look good.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                Get a Creative Brief <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                style={{ borderColor: divider, color: headingColor }}
                onClick={openCTAModal}>
                Book a Free Strategy Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap items-center justify-center gap-5 mt-10">
              {[
                { icon: TrendingUp,        label: "2× avg. CTR improvement" },
                { icon: Clock,             label: "48hr turnaround" },
                { icon: Users,             label: "400+ campaigns produced" },
                { icon: Eye,               label: "6 platforms covered" },
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
              Most ad budgets are wasted on weak creatives
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Targeting and budget matter — but the creative is what determines whether someone stops, clicks, and buys. It's the most underfunded part of most ad strategies.
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
          SOLUTION — What We Produce
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
              Creative that's built to perform — not just impress
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Every format, every platform, every funnel stage — we produce the volume and variety your campaigns actually need to scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* Platforms */}
          <motion.div className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h3 className="text-xl font-black mb-2" style={{ color: headingColor }}>Platforms we produce for</h3>
            <p className="text-sm" style={{ color: t45 }}>Native creative knowledge for every major ad platform — right dimensions, right specs, right feel.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {platforms.map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${p.color}18`, border: `1px solid ${p.color}35` }}>
                  <Megaphone className="w-4 h-4" style={{ color: p.color === "#fffc00" ? "#ca8a04" : p.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: headingColor }}>{p.label}</p>
                  <p className="text-[10px] leading-tight mt-0.5" style={{ color: t45 }}>{p.sub}</p>
                </div>
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
              Brief to live creative in 48 hours
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              A fast, structured process that keeps campaigns moving — no endless revision loops, no missed deadlines.
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
              We've created ads for every industry
            </h2>
            <p className="text-sm" style={{ color: t45 }}>We understand what makes audiences in your sector stop, click, and convert.</p>
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
              Better creative. Better results.
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
              <Zap className="w-3 h-3" /> Ready to create?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Stop wasting ad budget on creatives<br />that no one remembers
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Send us your brief, your brand, and your budget — and we'll show you what performance-first creative looks like.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Start My Creative Brief <ArrowRight className="w-4 h-4 ml-1" />
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
