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
  ArrowRight, CheckCircle2, Bot, Zap, Clock, Star,
  MessageSquare, Rocket, Users, TrendingUp, AlertCircle,
  XCircle, Shield, BarChart3, RefreshCw, Database,
  BrainCircuit, Cpu, GitBranch, Search, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  Heart, ShoppingCart, Workflow, Layers, FileText,
  Mail, Phone, Lock,
} from "lucide-react";

const BLUE   = "#1E4DA0";
const VIOLET = "#7c3aed";

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
    title: "Repetitive tasks burning your team's time",
    desc: "Data entry, report generation, order confirmations, follow-up emails — your team is doing work a machine could handle, leaving no time for decisions that actually require a human.",
  },
  {
    icon: AlertCircle,
    title: "Leads and enquiries falling through the cracks",
    desc: "Without instant, intelligent responses at every touchpoint, warm leads go cold. A customer who doesn't get a reply in minutes often moves on to a competitor who does.",
  },
  {
    icon: XCircle,
    title: "Decisions made on gut feeling, not data",
    desc: "Your systems hold enormous amounts of data — but none of it gets synthesised into actionable insight automatically. So decisions are delayed, missed, or made on yesterday's numbers.",
  },
  {
    icon: AlertCircle,
    title: "Scaling the business means scaling headcount",
    desc: "Every new customer adds proportional admin. Without automation, growth means hiring more people to do more of the same manual work — a ceiling that doesn't have to exist.",
  },
];

const solutions = [
  { icon: MessageSquare, color: BLUE, title: "AI Chatbots & Assistants",     desc: "Conversational agents for your website, WhatsApp, and internal tools — trained on your data, available 24/7." },
  { icon: Workflow,      color: BLUE, title: "Business Process Automation",  desc: "Map, digitise, and automate multi-step workflows across departments — approvals, notifications, escalations." },
  { icon: BrainCircuit,  color: BLUE, title: "RAG & Knowledge Pipelines",    desc: "Connect your documents, PDFs, and databases to an LLM so staff get instant, accurate answers from your own knowledge base." },
  { icon: BarChart3,     color: BLUE, title: "Predictive Analytics",         desc: "Demand forecasting, churn prediction, and sales projections — machine learning models built on your historical data." },
  { icon: Mail,          color: BLUE, title: "Automated Outreach & Follow-up", desc: "Trigger personalised emails, SMS, and WhatsApp messages based on user behaviour, events, or time-based rules." },
  { icon: Search,        color: BLUE, title: "Intelligent Document Processing", desc: "Extract, classify, and route data from invoices, forms, and contracts automatically — no manual keying." },
  { icon: GitBranch,     color: BLUE, title: "System Integration & Webhooks", desc: "Connect your CRM, ERP, helpdesk, and third-party APIs so data flows automatically between every tool you use." },
  { icon: RefreshCw,     color: BLUE, title: "Scheduled & Event-Driven Jobs", desc: "Nightly reports, real-time alerts, and triggered actions — your systems working in the background while your team sleeps." },
];

const techStack = [
  { icon: BrainCircuit, color: BLUE,   label: "OpenAI & GPT-4o",        desc: "Cutting-edge language models for chat, summarisation, extraction, and generation." },
  { icon: Layers,       color: BLUE,   label: "LangChain & LlamaIndex",  desc: "Orchestration frameworks for building RAG pipelines and multi-step AI agents." },
  { icon: Database,     color: BLUE,   label: "Vector Databases",        desc: "Pinecone, Weaviate, and pgvector for semantic search and knowledge retrieval at scale." },
  { icon: Cpu,          color: BLUE,   label: "Python & FastAPI",        desc: "High-performance AI backends with clean REST APIs your existing systems can call." },
  { icon: Workflow,     color: BLUE,   label: "n8n & Make (Zapier-class)", desc: "Visual workflow automation for connecting apps without bespoke code where appropriate." },
  { icon: Shield,       color: BLUE,   label: "On-Premise Deployment",   desc: "All models and pipelines can run fully on your infrastructure — your data never leaves your control." },
];

const process = [
  { step: "01", icon: Search,        title: "Audit",      detail: "We map your current workflows, identify repetitive processes, and quantify how much time each costs your team each week." },
  { step: "02", icon: Layers,        title: "Design",      detail: "We select the right AI approach — chatbot, pipeline, model, or integration — and show you the architecture before we build." },
  { step: "03", icon: BrainCircuit,  title: "Build & Train", detail: "We engineer the solution, train it on your data, and test it rigorously against real-world edge cases in a staging environment." },
  { step: "04", icon: Rocket,        title: "Deploy & Monitor", detail: "Go-live with full dashboards so you see exactly what the AI is doing, how often, and what it's saving you." },
];

const stats = [
  { prefix: "",  to: 70,  suffix: "%",  label: "Avg. manual task reduction" },
  { prefix: "",  to: 24,  suffix: "/7", label: "AI availability" },
  { prefix: "",  to: 3,   suffix: "×",  label: "Faster response times" },
  { prefix: "",  to: 500, suffix: "+",  label: "Clients automated" },
];

const testimonials = [
  {
    quote: "OneSoft built us a WhatsApp chatbot for order tracking and customer queries. It now handles 80% of our support tickets with no human involvement.",
    name: "Omar Farooqi", role: "Head of Operations", co: "FastTrack Distributors",
  },
  {
    quote: "The RAG system they built means our staff can ask questions about our 400-page policy manual and get accurate answers instantly. Game-changer.",
    name: "Claire Donovan", role: "HR Director", co: "Meridian Financial Services",
  },
  {
    quote: "Automated invoice processing cut our accounts payable workload by 65%. What took two days a week now happens overnight with zero errors.",
    name: "Yusuf Malik", role: "CFO", co: "Crescent Wholesale Group",
  },
];

const industries = [
  { icon: Package,         label: "Distributors & Logistics" },
  { icon: Stethoscope,     label: "Healthcare & Clinics" },
  { icon: GraduationCap,   label: "Education & Training" },
  { icon: ShoppingCart,    label: "Retail & E-commerce" },
  { icon: Building2,       label: "Finance & Enterprise" },
  { icon: UtensilsCrossed, label: "Restaurants & Food" },
  { icon: Heart,           label: "Events & Hospitality" },
  { icon: FileText,        label: "Legal & Professional" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function AIAutomationPage() {
  useSEO(PAGE_SEO.aiAutomation);
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
            style={{ background: `radial-gradient(circle, ${VIOLET}, transparent 70%)` }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.30)", color: VIOLET }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                AI Automation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Put the repetitive work{" "}
              <span style={{ color: BLUE }}>on autopilot</span>
              {" "}— free your team to do what matters
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              OneSoft builds AI chatbots, automation pipelines, and intelligent workflows that run 24/7 — so your team focuses on decisions, not data entry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                Automate My Business <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                style={{ borderColor: divider, color: headingColor }}
                onClick={openCTAModal}>
                Book a Free Audit Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-wrap items-center justify-center gap-5 mt-10">
              {[
                { icon: Clock,      label: "Avg. 70% task reduction" },
                { icon: Bot,        label: "24/7 AI availability" },
                { icon: TrendingUp, label: "3× faster response times" },
                { icon: Lock,       label: "Your data stays yours" },
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
              Your team is doing work that AI should be doing
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              Every hour spent on tasks a machine can handle is an hour not spent on strategy, relationships, and growth.
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
              AI that works inside your business — not alongside it
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              We don't sell off-the-shelf AI tools. We build automation that understands your data, speaks your language, and integrates with the systems you already use.
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
            <p className="text-sm" style={{ color: t45 }}>Best-in-class AI infrastructure — chosen for performance, reliability, and data security.</p>
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
              From audit to live automation in weeks
            </h2>
            <p className="text-base leading-relaxed" style={{ color: t70 }}>
              We start by understanding your processes — then engineer AI that fits around your existing operations.
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
              AI we've deployed across every sector
            </h2>
            <p className="text-sm" style={{ color: t45 }}>We understand your industry's data, compliance requirements, and operational patterns before we automate anything.</p>
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
              AI that delivers measurable results
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
              <Zap className="w-3 h-3" /> Ready to automate?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Let's audit your workflows<br />and find your automation wins
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Free 30-minute audit call. We'll identify the three processes costing your team the most time — and show you exactly how to automate them.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Book My Free Audit <ArrowRight className="w-4 h-4 ml-1" />
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
