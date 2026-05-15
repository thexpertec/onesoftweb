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
    color: "#1E4DA0",
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    desc: "Automatically extract, classify, and summarise data from invoices, medical records, admission forms, purchase orders, and contracts — without manual entry.",
    examples: ["Invoice auto-processing", "Patient record extraction", "Contract clause detection"],
    color: "#1E4DA0",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    desc: "Replace multi-step manual workflows with trigger-based automation pipelines. From lead follow-up emails to report generation — if it's repetitive, we automate it.",
    examples: ["Auto fee reminder sequences", "Inventory low-stock alerts", "Monthly report generation"],
    color: "#1E4DA0",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & Reporting",
    desc: "LLM-powered dashboards that don't just show numbers — they explain them. Ask questions in plain English and get instant insights from your business data.",
    examples: ["Sales trend forecasting", "Student performance prediction", "Demand planning for distributors"],
    color: "#1E4DA0",
  },
  {
    icon: Database,
    title: "RAG Knowledge Systems",
    desc: "Build private AI knowledge bases from your own documents, manuals, and policies. Staff can query them instantly — no hallucinations, always sourced from your data.",
    examples: ["Hospital policy assistant", "School curriculum Q&A", "Supplier catalogue search"],
    color: "#1E4DA0",
  },
  {
    icon: ScanLine,
    title: "OCR & Data Extraction",
    desc: "Convert scanned documents, handwritten forms, and image-based PDFs into structured digital data — automatically fed into your ERP or database.",
    examples: ["Handwritten fee slips", "Lab report scanning", "Delivery note digitisation"],
    color: "#1E4DA0",
  },
];

const useCases = [
  { sector: "Schools",     icon: "🎓", color: "#1E4DA0", task: "Auto-generate student progress reports from attendance, grades, and behaviour data — sent to parents every term." },
  { sector: "Hospitals",   icon: "🏥", color: "#1E4DA0", task: "AI triage assistant that collects patient symptoms via chat before the doctor visit, summarising them in the OPD record." },
  { sector: "Restaurants", icon: "🍽️", color: "#1E4DA0", task: "Demand forecasting that predicts daily covers from weather, local events, and historical data — cutting food waste by up to 30%." },
  { sector: "Distributors",icon: "📦", color: "#1E4DA0", task: "Auto-match incoming orders with available stock, generate pick lists, and notify drivers — zero manual dispatch coordination." },
  { sector: "E-commerce",  icon: "🛒", color: "#1E4DA0", task: "AI product description writer that generates SEO-optimised listings from images and specifications in seconds." },
  { sector: "Event Halls", icon: "💒", color: "#1E4DA0", task: "Intelligent booking assistant that checks availability, quotes packages, and sends contracts — all without human involvement." },
];

const stack = [
  "OpenAI GPT-4o", "Claude 3.5", "LangChain", "LlamaIndex",
  "Pinecone", "Supabase Vector", "Whisper STT", "n8n Workflows",
  "Make.com", "Zapier", "FastAPI", "Python",
];

export function AIAutomationSection() {
  return (
    <section id="ai-automation" className="py-28 relative overflow-hidden">
      {/* Subtle blue tint top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#1E4DA0" }} />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ border: "1.5px solid #1E4DA040", background: "#1E4DA012", color: "#1E4DA0" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI & Automation
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6" style={{ color: "#0f172a" }}>
            Put your business on{" "}
            <span style={{ color: "#1E4DA0" }}>autopilot</span>
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
              className="group relative rounded-2xl p-7 transition-all duration-300 overflow-hidden"
              style={{
                background: `${cap.color}0e`,
                border: `1.5px solid ${cap.color}45`,
                boxShadow: `0 2px 16px ${cap.color}12`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${cap.color}90, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cap.color}22`, border: `1.5px solid ${cap.color}55` }}
              >
                <cap.icon className="w-6 h-6" style={{ color: cap.color }} />
              </div>

              <h3 className="font-bold text-base mb-2.5" style={{ color: "#0f172a" }}>{cap.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{cap.desc}</p>

              {/* Examples */}
              <div className="space-y-1.5">
                {cap.examples.map(ex => (
                  <div key={ex} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: cap.color }} />
                    <span className="text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>{ex}</span>
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
            <div className="h-px flex-1 bg-slate-200" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3" style={{ color: "rgba(0,0,0,0.45)" }}>
              <Bot className="w-4 h-4" style={{ color: "#1E4DA0" }} />
              Real-world automation use cases
            </div>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.sector}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-xl border transition-all duration-300"
                style={{
                  background: `${uc.color}12`,
                  borderColor: `${uc.color}40`,
                  boxShadow: `0 2px 12px ${uc.color}10`,
                }}
                whileHover={{ y: -3, boxShadow: `0 12px 28px ${uc.color}22` }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${uc.color}20`, border: `1.5px solid ${uc.color}50` }}>
                  {uc.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: uc.color }}>{uc.sector}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>{uc.task}</p>
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
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.45)" }}>AI & automation tools we work with</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {stack.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200"
                style={{ border: "1px solid #e2e8f0", background: "#FFFFFF", color: "rgba(0,0,0,0.55)" }}
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
          style={{ background: "#ffffff", border: "1.5px solid #1E4DA030", boxShadow: "0 4px 24px #1E4DA010" }}
        >
          {/* Blue left accent panel */}
          <div className="absolute inset-y-0 left-0 w-1.5 rounded-l-3xl" style={{ background: "#1E4DA0" }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-10 py-12">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Zap className="w-4 h-4" style={{ color: "#1E4DA0" }} />
                <span className="text-sm font-semibold" style={{ color: "#1E4DA0" }}>Free AI Readiness Audit</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight" style={{ color: "#0f172a" }}>
                See exactly where AI can save<br className="hidden md:block" /> your business 10+ hours a week
              </h3>
              <p className="text-sm max-w-lg" style={{ color: "rgba(0,0,0,0.55)" }}>
                We'll audit your current workflows, identify the top 3 automation opportunities, and show you a concrete ROI estimate — all in a free 30-minute call.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
                style={{ background: "#1E4DA0", color: "#ffffff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1E4DA0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1E4DA0")}
              >
                <BrainCircuit className="w-4 h-4" />
                Book AI Audit
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{ border: "1.5px solid #1E4DA050", color: "#1E4DA0", background: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1E4DA010"; e.currentTarget.style.borderColor = "#1E4DA080"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#1E4DA050"; }}
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
