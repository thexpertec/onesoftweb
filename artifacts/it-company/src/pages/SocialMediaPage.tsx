import { useRef, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, Megaphone, Zap, Clock, Star,
  MessageSquare, Rocket, Users, TrendingUp, AlertCircle,
  XCircle, BarChart3, Search, Lock, Heart, Eye,
  Camera, Video, PenTool, Calendar, Globe, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  ShoppingCart, Bot, Repeat2, Target, ThumbsUp,
} from "lucide-react";

const BLUE = "#1E4DA0";
const ROSE = "#e11d48";

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
    title: "Posting consistently but seeing zero growth",
    desc: "Random posts without a strategy are noise. Without a content calendar tied to your audience's behaviour and platform algorithms, you're invisible to the people who matter.",
  },
  {
    icon: AlertCircle,
    title: "Content that looks unprofessional",
    desc: "Blurry graphics, inconsistent fonts, and low-effort captions signal to potential customers that your business doesn't take itself seriously — before they ever visit your website.",
  },
  {
    icon: XCircle,
    title: "Followers that never become customers",
    desc: "Vanity metrics — likes, followers — don't pay bills. Without a proper funnel from awareness to enquiry, social media is just entertainment with no return on investment.",
  },
  {
    icon: AlertCircle,
    title: "No time to manage it properly",
    desc: "Running a business and running a content operation at the same time is unsustainable. Most business owners either burn out or go quiet — both damage your brand.",
  },
];

const solutions = [
  { icon: PenTool,    color: BLUE, title: "Content Strategy",         desc: "A monthly content plan aligned to your goals, audience, and platform — every post has a purpose." },
  { icon: Camera,     color: BLUE, title: "Graphic & Visual Design",  desc: "On-brand static posts, carousels, story templates, and cover art designed to stop the scroll." },
  { icon: Video,      color: BLUE, title: "Video & Reels Production", desc: "Short-form video content for Instagram Reels, TikTok, and YouTube Shorts — scripted, edited, captioned." },
  { icon: Calendar,   color: BLUE, title: "Content Scheduling",       desc: "Posts go out at peak engagement times across all your platforms — no manual effort from you." },
  { icon: MessageSquare, color: BLUE, title: "Community Management",  desc: "We respond to comments, DMs, and mentions in your brand voice — keeping your audience engaged." },
  { icon: Target,     color: BLUE, title: "Paid Social Campaigns",    desc: "Meta Ads, TikTok Ads, and LinkedIn Ads — targeted campaigns built to drive leads, not just clicks." },
  { icon: BarChart3,  color: BLUE, title: "Monthly Analytics Report", desc: "Clear monthly reporting on reach, engagement, follower growth, and link clicks — no vanity metrics." },
  { icon: Repeat2,    color: BLUE, title: "Hashtag & SEO Research",   desc: "Platform-specific keyword and hashtag research to maximise discoverability on every channel." },
];

const platforms = [
  { label: "Instagram",  color: "#e1306c", desc: "Feed posts, Reels, Stories & DM campaigns" },
  { label: "Facebook",   color: "#1877f2", desc: "Page management, groups & paid reach" },
  { label: "TikTok",     color: "#010101", desc: "Short-form video & trending audio content" },
  { label: "LinkedIn",   color: "#0077b5", desc: "B2B thought leadership & lead generation" },
  { label: "X (Twitter)",color: "#000000", desc: "Real-time engagement & brand voice" },
  { label: "YouTube",    color: "#ff0000", desc: "Shorts, long-form video & channel growth" },
];

const process = [
  { step: "01", icon: Search,       title: "Audit & Strategy",   detail: "We analyse your current presence, competitors, and audience. Then build a 90-day strategy with clear growth targets." },
  { step: "02", icon: PenTool,      title: "Brand Toolkit",      detail: "We establish your visual identity for social — templates, colour palette, tone of voice, and content pillars." },
  { step: "03", icon: Calendar,     title: "Create & Schedule",  detail: "Monthly content production and scheduling. You review and approve before anything goes live." },
  { step: "04", icon: BarChart3,    title: "Analyse & Optimise", detail: "Monthly performance review. We double down on what works and refine what doesn't — continuously improving results." },
];

const stats = [
  { prefix: "",  to: 3,   suffix: "×",  label: "Avg. engagement increase" },
  { prefix: "",  to: 200, suffix: "+",  label: "Brands managed" },
  { prefix: "",  to: 6,   suffix: " platforms", label: "We cover" },
  { prefix: "",  to: 90,  suffix: "%",  label: "Client retention rate" },
];

const testimonials = [
  {
    quote: "In three months our Instagram went from 800 followers to 6,200. More importantly, we're getting 15–20 genuine enquiries a week directly from social.",
    name: "Aisha Noor", role: "Owner", co: "Bloom Bridal Studio, Manchester",
  },
  {
    quote: "We handed over our LinkedIn completely. They now post three times a week, our connection requests are up 400%, and we've closed two B2B deals through it.",
    name: "Daniel Mbeki", role: "Managing Director", co: "Apex Consulting Group",
  },
  {
    quote: "The Reels they produce for our restaurant are genuinely cinematic. We've had people come in specifically because they saw us on TikTok.",
    name: "Layla Hassan", role: "Co-Founder", co: "The Olive Table, Birmingham",
  },
];

const industries = [
  { icon: UtensilsCrossed, label: "Restaurants & Cafes" },
  { icon: Stethoscope,     label: "Clinics & Wellness" },
  { icon: GraduationCap,   label: "Education & Coaching" },
  { icon: ShoppingCart,    label: "Retail & E-commerce" },
  { icon: Building2,       label: "Corporates & B2B" },
  { icon: Heart,           label: "Events & Hospitality" },
  { icon: Package,         label: "Products & Brands" },
  { icon: Bot,             label: "SaaS & Tech" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function SocialMediaPage() {
  useSEO(PAGE_SEO.socialMedia);
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
            style={{ background: `radial-gradient(circle, ${ROSE}, transparent 70%)` }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Megaphone className="w-3 h-3" /> Social Media Marketing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Turn your social media into a{" "}
              <span style={{ color: BLUE }}>lead generation machine</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              OneSoft manages your Instagram, TikTok, LinkedIn, and more — with strategy, content, and community management that actually drives enquiries and sales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                Grow My Social Media <ArrowRight className="w-4 h-4 ml-1" />
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
                { icon: TrendingUp,  label: "3× avg. engagement increase" },
                { icon: Eye,         label: "200+ brands managed" },
                { icon: Globe,       label: "6 platforms covered" },
                { icon: ThumbsUp,    label: "90% client retention" },
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
              Social media without a strategy is just noise
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Most businesses are present on social media. Very few are actually using it to grow. The difference is strategy, consistency, and quality.
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
              Full-service social media management — done for you
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Strategy, content, design, scheduling, community management, and reporting. Everything handled — nothing left to chance.
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
            <h3 className="text-xl font-black mb-2" style={{ color: headingColor }}>Platforms we manage</h3>
            <p className="text-sm" style={{ color: t45 }}>Native expertise on every major platform — we know what works where.</p>
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
                  <Megaphone className="w-4 h-4" style={{ color: p.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: headingColor }}>{p.label}</p>
                  <p className="text-[10px] leading-tight mt-0.5" style={{ color: t45 }}>{p.desc}</p>
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
              From zero presence to consistent growth
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              A clear onboarding process that gets you live, on-brand, and growing — in your first month.
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
              We've grown brands across every sector
            </h2>
            <p className="text-sm" style={{ color: t45 }}>We understand what audiences in your industry respond to — and what they ignore.</p>
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
              Real growth. Real enquiries.
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
              <Zap className="w-3 h-3" /> Ready to grow?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Let's build a social presence<br />your competitors will envy
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Free strategy call. We'll audit your current presence and show you exactly where the growth opportunities are — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Book My Free Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
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
