import { motion } from "framer-motion";
import {
  BrainCircuit,
  MessageSquareText,
  FileSearch,
  Workflow,
  BarChart3,
  Bot,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Database,
  ScanLine,
} from "lucide-react";

const capabilities = [
  {
    icon: MessageSquareText,
    title: "AI Chatbots & Virtual Assistants",
    desc: "Custom-trained chatbots that handle customer queries, route support tickets, and answer FAQs 24/7 — integrated directly into your website, WhatsApp, or ERP.",
    examples: ["School fee inquiry bot", "Hospital appointment assistant", "Restaurant order assistant"],
    color: "#2563eb",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    desc: "Automatically extract, classify, and summarise data from invoices, medical records, admission forms, purchase orders, and contracts — without manual entry.",
    examples: ["Invoice auto-processing", "Patient record extraction", "Contract clause detection"],
    color: "#7c3aed",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    desc: "Replace multi-step manual workflows with trigger-based automation pipelines. From lead follow-up emails to report generation — if it's repetitive, we automate it.",
    examples: ["Auto fee reminder sequences", "Inventory low-stock alerts", "Monthly report generation"],
    color: "#0891b2",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & Reporting",
    desc: "LLM-powered dashboards that don't just show numbers — they explain them. Ask questions in plain English and get instant insights from your business data.",
    examples: ["Sales trend forecasting", "Student performance prediction", "Demand planning for distributors"],
    color: "#16a34a",
  },
  {
    icon: Database,
    title: "RAG Knowledge Systems",
    desc: "Build private AI knowledge bases from your own documents, manuals, and policies. Staff can query them instantly — no hallucinations, always sourced from your data.",
    examples: ["Hospital policy assistant", "School curriculum Q&A", "Supplier catalogue search"],
    color: "#ea580c",
  },
  {
    icon: ScanLine,
    title: "OCR & Data Extraction",
    desc: "Convert scanned documents, handwritten forms, and image-based PDFs into structured digital data — automatically fed into your ERP or database.",
    examples: ["Handwritten fee slips", "Lab report scanning", "Delivery note digitisation"],
    color: "#db2777",
  },
];

const useCases = [
  { sector: "Schools", icon: "🎓", task: "Auto-generate student progress reports from attendance, grades, and behaviour data — sent to parents every term." },
  { sector: "Hospitals", icon: "🏥", task: "AI triage assistant that collects patient symptoms via chat before the doctor visit, summarising them in the OPD record." },
  { sector: "Restaurants", icon: "🍽️", task: "Demand forecasting that predicts daily covers from weather, local events, and historical data — cutting food waste by up to 30%." },
  { sector: "Distributors", icon: "📦", task: "Auto-match incoming orders with available stock, generate pick lists, and notify drivers — zero manual dispatch coordination." },
  { sector: "E-commerce", icon: "🛒", task: "AI product description writer that generates SEO-optimised listings from images and specifications in seconds." },
  { sector: "Event Halls", icon: "💒", task: "Intelligent booking assistant that checks availability, quotes packages, and sends contracts — all without human involvement." },
];

const stack = [
  "OpenAI GPT-4o", "Claude 3.5", "LangChain", "LlamaIndex",
  "Pinecone", "Supabase Vector", "Whisper STT", "n8n Workflows",
  "Make.com", "Zapier", "FastAPI", "Python",
];

export function AIAutomationSection() {
  return (
    <section id="ai-automation" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#030711]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/25 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Floating orbs */}
      <motion.div
        className="absolute top-24 right-[10%] w-80 h-80 bg-violet-600/10 rounded-full blur-[90px] pointer-events-none"
        animate={{ y: [0, -20, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-[5%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI & Automation
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Put your business on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              autopilot
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We build AI systems that replace manual, repetitive work with intelligent automation — saving your team hours every day and eliminating human error at scale.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/18 p-7 transition-all duration-300 overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${cap.color}80, transparent)` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 20%, ${cap.color}0d 0%, transparent 60%)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cap.color}18`, border: `1px solid ${cap.color}35` }}
              >
                <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
              </div>

              <h3 className="text-white font-bold text-base mb-2.5">{cap.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{cap.desc}</p>

              {/* Examples */}
              <div className="space-y-1.5">
                {cap.examples.map(ex => (
                  <div key={ex} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: cap.color }} />
                    <span className="text-xs text-white/55">{ex}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry use cases */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-white/8" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 px-3">
              <Bot className="w-4 h-4 text-violet-400" />
              Real-world automation use cases
            </div>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.sector}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/25 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl shrink-0">
                  {uc.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 block mb-1">{uc.sector}</span>
                  <p className="text-sm text-white/65 leading-relaxed">{uc.task}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack strip */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/30 mb-5">AI & automation tools we work with</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {stack.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* CTA bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 via-blue-900/30 to-violet-900/40" />
          <div className="absolute inset-0 border border-violet-500/20 rounded-3xl" />
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-10 py-12">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Zap className="w-5 h-5 text-violet-400" />
                <span className="text-violet-400 text-sm font-semibold">Free AI Readiness Audit</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                See exactly where AI can save<br className="hidden md:block" /> your business 10+ hours a week
              </h3>
              <p className="text-white/60 text-sm max-w-lg">
                We'll audit your current workflows, identify the top 3 automation opportunities, and show you a concrete ROI estimate — all in a free 30-minute call.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
              >
                <BrainCircuit className="w-4 h-4" />
                Book AI Audit
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200"
              >
                View Case Studies <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
