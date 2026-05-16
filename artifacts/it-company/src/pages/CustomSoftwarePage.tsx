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
  ArrowRight, CheckCircle2, Code2, Globe, Smartphone, Shield,
  BarChart3, Zap, Clock, Star, MessageSquare, Rocket, Users,
  TrendingUp, AlertCircle, XCircle, Wrench, Layers, Database,
  RefreshCw, Lock, Bot, Package, Building2, GraduationCap,
  Stethoscope, UtensilsCrossed, Heart, ShoppingCart, GitBranch,
  Monitor, Server, Cpu,
} from "lucide-react";

const BLUE = "#1E4DA0";

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
    title: "Off-the-shelf software that almost fits",
    desc: "Generic tools make you work around their limitations instead of for your goals. You end up paying for features you don't need and missing the ones you do.",
  },
  {
    icon: AlertCircle,
    title: "Manual processes eating hours every day",
    desc: "Copy-pasting between spreadsheets, chasing approvals on WhatsApp, re-entering the same data in three systems — all symptoms of software that was never built for your workflow.",
  },
  {
    icon: XCircle,
    title: "Disconnected tools that don't talk to each other",
    desc: "Your CRM doesn't sync with your inventory. Your invoicing doesn't update your accounts. Each integration gap means manual effort — and human error.",
  },
  {
    icon: AlertCircle,
    title: "Scaling breaks everything",
    desc: "A system that barely worked for 10 users falls apart at 100. Bespoke software is architected for your growth trajectory from day one — not patched to keep up.",
  },
];

const solutions = [
  { icon: Monitor,    color: BLUE, title: "Web Applications",         desc: "Browser-based tools your whole team can use with zero installation. Fast, secure, and accessible from anywhere." },
  { icon: Cpu,        color: BLUE, title: "Desktop Applications",     desc: "Powerful Windows, macOS, or cross-platform apps for workflows that need local processing or offline capability." },
  { icon: Smartphone, color: BLUE, title: "Mobile Apps",              desc: "iOS and Android apps — native or cross-platform — designed for real users on real devices in real conditions." },
  { icon: Server,     color: BLUE, title: "API & Backend Systems",    desc: "Robust REST or GraphQL APIs, webhooks, and microservices that power your products and connect your ecosystem." },
  { icon: Database,   color: BLUE, title: "Database Architecture",    desc: "Properly normalised schemas, performance-tuned queries, and reliable backups — built to scale alongside your data." },
  { icon: GitBranch,  color: BLUE, title: "System Integrations",      desc: "Connect your existing tools — CRM, ERP, payment gateways, logistics APIs — into one seamless data flow." },
  { icon: Bot,        color: BLUE, title: "AI & Automation Layers",   desc: "Embed intelligent features — smart search, predictive analytics, automated decisions — directly into your software." },
  { icon: RefreshCw,  color: BLUE, title: "Legacy Modernisation",     desc: "We migrate ageing systems to modern stacks without disrupting your operations — piece by piece, safely." },
];

const techStack = [
  { icon: Code2,    color: BLUE, label: "React & Next.js",     desc: "Frontend applications built for speed, accessibility, and SEO." },
  { icon: Server,   color: BLUE, label: "Node.js & Express",   desc: "Fast, event-driven backends that scale horizontally with ease." },
  { icon: Database, color: BLUE, label: "PostgreSQL & MySQL",  desc: "Relational databases designed for integrity, performance, and scale." },
  { icon: Globe,    color: BLUE, label: "Laravel & Django",    desc: "Battle-tested frameworks for rapid, secure web application development." },
  { icon: Monitor,  color: BLUE, label: ".NET & C#",           desc: "Enterprise-grade desktop and web applications for Windows environments." },
  { icon: Bot,      color: BLUE, label: "Python & AI/ML",      desc: "Data pipelines, machine learning models, and intelligent automation." },
];

const process = [
  { step: "01", icon: MessageSquare, title: "Requirements",  detail: "We dig deep into your workflow — what you do today, what breaks, and what success looks like. No assumptions, just listening." },
  { step: "02", icon: Layers,        title: "Architecture",  detail: "We map your system: data models, integrations, user roles, and tech stack. You approve the blueprint before a line of code is written." },
  { step: "03", icon: Code2,         title: "Development",   detail: "Iterative sprints with weekly demos on a live staging environment. You see real progress every week, not just a final reveal." },
  { step: "04", icon: Rocket,        title: "Deploy & Own",  detail: "Full deployment to your infrastructure or our managed cloud. Source code handover, documentation, and staff training included." },
];

const stats = [
  { prefix: "", to: 150, suffix: "+", label: "Custom Systems Built" },
  { prefix: "", to: 98,  suffix: "%", label: "On-Time Delivery" },
  { prefix: "", to: 7,   suffix: "+", label: "Years of Experience" },
  { prefix: "", to: 500, suffix: "+", label: "Happy Clients" },
];

const testimonials = [
  {
    quote: "OneSoft replaced our entire paper-based stock management system with a web app in 6 weeks. Our team saved 3 hours daily from day one.",
    name: "Tariq Hussain", role: "Operations Director", co: "Al-Noor Distributors",
  },
  {
    quote: "We had three separate tools that never synced. OneSoft built us a single platform that replaced all three. Support has been exceptional.",
    name: "Sarah Mitchell", role: "CEO", co: "ClearPath Logistics",
  },
  {
    quote: "The custom student portal they built reduced admin workload by 40%. Parents, students, and teachers all have exactly what they need.",
    name: "Mr. Adeel Farooq", role: "Principal", co: "Beacon Academy, Birmingham",
  },
];

const industries = [
  { icon: Package,         label: "Distributors & Logistics" },
  { icon: Stethoscope,     label: "Healthcare & Clinics" },
  { icon: GraduationCap,   label: "Education & Training" },
  { icon: ShoppingCart,    label: "Retail & E-commerce" },
  { icon: Building2,       label: "Corporates & Enterprises" },
  { icon: UtensilsCrossed, label: "Restaurants & Food" },
  { icon: Heart,           label: "Events & Hospitality" },
  { icon: Bot,             label: "SaaS & Tech Startups" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function CustomSoftwarePage() {
  useSEO(PAGE_SEO.customSoftware);
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
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Code2 className="w-3 h-3" /> Custom Software Development
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Software built exactly{" "}
              <span style={{ color: BLUE }}>for how you work</span>
              {" "}— not the other way around
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              OneSoft engineers bespoke web apps, desktop systems, mobile apps, and APIs — purpose-built for your processes, your team, and your growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                Discuss Your Project <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                style={{ borderColor: divider, color: headingColor }}
                onClick={openCTAModal}>
                Book a Free Discovery Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap items-center justify-center gap-5 mt-10">
              {[
                { icon: Clock,      label: "Weekly sprint demos" },
                { icon: Star,       label: "98% on-time delivery" },
                { icon: Users,      label: "150+ systems built" },
                { icon: Lock,       label: "Full source code handover" },
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
              Generic software is costing you more than you think
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Every workaround, manual process, and disconnected tool is a hidden tax on your team's time and your company's growth.
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
          SOLUTION — What We Build
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
              Every type of software your business needs
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              From a simple internal tool to a complex multi-tenant platform — we scope it, architect it, and deliver it.
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

          {/* Tech Stack */}
          <motion.div className="text-center mb-8"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h3 className="text-xl font-black mb-2" style={{ color: headingColor }}>Technologies we build with</h3>
            <p className="text-sm" style={{ color: t45 }}>We choose the right stack for your project — not the one that's easiest for us to build.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {techStack.map((t, i) => (
              <motion.div key={t.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                  <t.icon className="w-4 h-4" style={{ color: BLUE }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: headingColor }}>{t.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: t70 }}>{t.desc}</p>
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
              A process built around transparency
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              You'll see progress every week — not just a final reveal months later.
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
              Built for every industry
            </h2>
            <p className="text-sm" style={{ color: t45 }}>We've engineered custom software across sectors — we understand your domain before we start.</p>
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
              Real systems. Real impact.
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
              <Zap className="w-3 h-3" /> Ready to start?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Stop working around software.<br />Let's build software that works for you.
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us what you need. We'll scope it, price it honestly, and show you a plan — no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Start the Conversation <ArrowRight className="w-4 h-4 ml-1" />
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
