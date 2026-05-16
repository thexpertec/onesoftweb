import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import {
  Save, X, Plus, Edit2, Trash2, GripVertical, ChevronDown,
  ExternalLink, AlertCircle, CheckCircle2, Bot, Zap, Clock,
  MessageSquare, Rocket, Users, TrendingUp, XCircle, Shield,
  BarChart3, RefreshCw, Database, Cpu, GitBranch, Search,
  Package, Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  Heart, ShoppingCart, Layers, FileText, Mail, Lock, Star,
  BrainCircuit, Workflow,
} from "lucide-react";

/* ── Icon map ───────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertCircle, CheckCircle2, Bot, Zap, Clock, MessageSquare,
  Rocket, Users, TrendingUp, Shield, BarChart3, RefreshCw, Database,
  Cpu, GitBranch, Search, Package, Building2, GraduationCap,
  Stethoscope, UtensilsCrossed, Heart, ShoppingCart, Layers, FileText,
  Mail, Lock, Star, BrainCircuit, Workflow,
};

const ICON_OPTIONS = [
  { v: "XCircle",         l: "Error / Problem"              },
  { v: "AlertCircle",     l: "Warning / Alert"              },
  { v: "CheckCircle2",    l: "Check / Success"              },
  { v: "Bot",             l: "AI / Chatbot"                 },
  { v: "BrainCircuit",    l: "AI Brain / LLM"               },
  { v: "Workflow",        l: "Workflow / Automation"        },
  { v: "MessageSquare",   l: "Chat / Requirements"          },
  { v: "Search",          l: "Search / Audit"               },
  { v: "Layers",          l: "Architecture / RAG"           },
  { v: "Database",        l: "Database / Vector DB"         },
  { v: "Cpu",             l: "Processing / FastAPI"         },
  { v: "GitBranch",       l: "Integration / Webhook"        },
  { v: "RefreshCw",       l: "Scheduled / Event Jobs"       },
  { v: "Mail",            l: "Email / Outreach"             },
  { v: "FileText",        l: "Document Processing"          },
  { v: "BarChart3",       l: "Analytics / Predictive"       },
  { v: "Shield",          l: "On-Premise / Security"        },
  { v: "Zap",             l: "Speed / Performance"          },
  { v: "Rocket",          l: "Launch / Deploy"              },
  { v: "Clock",           l: "Time / Speed"                 },
  { v: "TrendingUp",      l: "Growth / Results"             },
  { v: "Lock",            l: "Privacy / Data Security"      },
  { v: "Users",           l: "Team / Clients"               },
  { v: "Star",            l: "Quality / Rating"             },
  { v: "Package",         l: "Distribution / Logistics"     },
  { v: "Stethoscope",     l: "Healthcare & Clinics"         },
  { v: "GraduationCap",   l: "Education & Training"         },
  { v: "ShoppingCart",    l: "Retail & E-commerce"          },
  { v: "Building2",       l: "Finance & Enterprise"         },
  { v: "UtensilsCrossed", l: "Restaurants & Food"           },
  { v: "Heart",           l: "Events & Hospitality"         },
  { v: "FileText",        l: "Legal & Professional"         },
];

function IconEl({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const C = ICON_MAP[name] ?? Bot;
  return <C className={className} />;
}

/* ── Shared components ──────────────────────────────────────── */
function Field({ label, value, onChange, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; hint?: string;
}) {
  const cls = "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={cls} />}
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Icon = ICON_MAP[value] ?? Bot;
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon</label>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="relative flex-1">
          <select value={value} onChange={e => onChange(e.target.value)}
            className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
            {ICON_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{children}</h3>;
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-border">
      {saved && <span className="text-xs text-green-600 font-semibold">Saved ✓</span>}
      <Btn onClick={onSave}><Save className="w-4 h-4" /> Save Section</Btn>
    </div>
  );
}

function ItemRow({ icon, primary, secondary, onEdit, onDelete }: {
  icon?: string; primary: string; secondary?: string; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-all">
      <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0 cursor-grab" />
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <IconEl name={icon} className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{primary}</p>
        {secondary && <p className="text-xs text-muted-foreground truncate mt-0.5">{secondary}</p>}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
        <button onClick={onEdit} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center">
          <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button onClick={onDelete} className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center">
          <Trash2 className="w-3.5 h-3.5 text-red-500/70" />
        </button>
      </div>
    </div>
  );
}

/* ── Modals ─────────────────────────────────────────────────── */
type CardItem = { id: number; icon: string; title?: string; label?: string; desc?: string; detail?: string };

function CardModal({ item, titleField, descField, hasIcon = true, onClose, onSave }: {
  item: CardItem | null;
  titleField: "title" | "label";
  descField?: "desc" | "detail";
  hasIcon?: boolean;
  onClose: () => void;
  onSave: (item: CardItem) => void;
}) {
  const [form, setForm] = useState<CardItem>(
    item ?? { id: 0, icon: "Bot", title: "", label: "", desc: "", detail: "" }
  );
  const set = (k: keyof CardItem) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Item</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {hasIcon && <IconSelect value={form.icon} onChange={set("icon")} />}
          <Field label={titleField === "title" ? "Title" : "Label"} value={form[titleField] ?? ""} onChange={set(titleField)} />
          {descField && <Field label={descField === "desc" ? "Description" : "Detail"} value={form[descField] ?? ""} onChange={set(descField)} multiline />}
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">Cancel</button>
          <button onClick={() => { onSave({ ...form, id: form.id || Date.now() }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ label, onConfirm, onClose }: { label: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-base font-bold mb-1">Remove this item?</h3>
        <p className="text-sm text-muted-foreground mb-5">"{label}" will be removed from the section.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Remove</button>
        </div>
      </div>
    </div>
  );
}

function TestimonialModal({ item, onClose, onSave }: {
  item: { id: number; quote: string; name: string; role: string; company: string } | null;
  onClose: () => void;
  onSave: (item: { id: number; quote: string; name: string; role: string; company: string }) => void;
}) {
  const [form, setForm] = useState(item ?? { id: 0, quote: "", name: "", role: "", company: "" });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Testimonial</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Quote" value={form.quote} onChange={set("quote")} multiline />
          <Field label="Name" value={form.name} onChange={set("name")} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role / Position" value={form.role} onChange={set("role")} />
            <Field label="Company" value={form.company} onChange={set("company")} />
          </div>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">Cancel</button>
          <button onClick={() => { onSave({ ...form, id: form.id || Date.now() }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SEED DATA
═════════════════════════════════════════════════════════════ */

const INIT_HERO = {
  badge: "AI Automation",
  headline: "Put the repetitive work on autopilot — free your team to do what matters",
  subheadline: "OneSoft builds AI chatbots, automation pipelines, and intelligent workflows that run 24/7 — so your team focuses on decisions, not data entry.",
  ctaPrimary: "Automate My Business",
  ctaSecondary: "Book a Free Audit Call",
  trustItems: [
    { id: 1, icon: "Clock",      label: "Avg. 70% task reduction"   },
    { id: 2, icon: "Bot",        label: "24/7 AI availability"       },
    { id: 3, icon: "TrendingUp", label: "3× faster response times"  },
    { id: 4, icon: "Lock",       label: "Your data stays yours"      },
  ],
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Your team is doing work that AI should be doing",
  subheading: "Every hour spent on tasks a machine can handle is an hour not spent on strategy, relationships, and growth.",
  cards: [
    { id: 1, icon: "XCircle",     title: "Repetitive tasks burning your team's time",        desc: "Data entry, report generation, order confirmations, follow-up emails — your team is doing work a machine could handle, leaving no time for decisions that actually require a human." },
    { id: 2, icon: "AlertCircle", title: "Leads and enquiries falling through the cracks",    desc: "Without instant, intelligent responses at every touchpoint, warm leads go cold. A customer who doesn't get a reply in minutes often moves on to a competitor who does." },
    { id: 3, icon: "XCircle",     title: "Decisions made on gut feeling, not data",           desc: "Your systems hold enormous amounts of data — but none of it gets synthesised into actionable insight automatically. So decisions are delayed, missed, or made on yesterday's numbers." },
    { id: 4, icon: "AlertCircle", title: "Scaling the business means scaling headcount",      desc: "Every new customer adds proportional admin. Without automation, growth means hiring more people to do more of the same manual work — a ceiling that doesn't have to exist." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "AI that works inside your business — not alongside it",
  subheading: "We don't sell off-the-shelf AI tools. We build automation that understands your data, speaks your language, and integrates with the systems you already use.",
  cards: [
    { id: 1, icon: "MessageSquare", title: "AI Chatbots & Assistants",         desc: "Conversational agents for your website, WhatsApp, and internal tools — trained on your data, available 24/7." },
    { id: 2, icon: "Workflow",       title: "Business Process Automation",      desc: "Map, digitise, and automate multi-step workflows across departments — approvals, notifications, escalations." },
    { id: 3, icon: "BrainCircuit",   title: "RAG & Knowledge Pipelines",        desc: "Connect your documents, PDFs, and databases to an LLM so staff get instant, accurate answers from your own knowledge base." },
    { id: 4, icon: "BarChart3",      title: "Predictive Analytics",             desc: "Demand forecasting, churn prediction, and sales projections — machine learning models built on your historical data." },
    { id: 5, icon: "Mail",           title: "Automated Outreach & Follow-up",   desc: "Trigger personalised emails, SMS, and WhatsApp messages based on user behaviour, events, or time-based rules." },
    { id: 6, icon: "FileText",       title: "Intelligent Document Processing",  desc: "Extract, classify, and route data from invoices, forms, and contracts automatically — no manual keying." },
    { id: 7, icon: "GitBranch",      title: "System Integration & Webhooks",    desc: "Connect your CRM, ERP, helpdesk, and third-party APIs so data flows automatically between every tool you use." },
    { id: 8, icon: "RefreshCw",      title: "Scheduled & Event-Driven Jobs",    desc: "Nightly reports, real-time alerts, and triggered actions — your systems working in the background while your team sleeps." },
  ],
};

const INIT_TECH = {
  heading: "Technologies we build with",
  subheading: "Best-in-class AI infrastructure — chosen for performance, reliability, and data security.",
  items: [
    { id: 1, icon: "BrainCircuit", label: "OpenAI & GPT-4o",           desc: "Cutting-edge language models for chat, summarisation, extraction, and generation." },
    { id: 2, icon: "Layers",       label: "LangChain & LlamaIndex",     desc: "Orchestration frameworks for building RAG pipelines and multi-step AI agents." },
    { id: 3, icon: "Database",     label: "Vector Databases",           desc: "Pinecone, Weaviate, and pgvector for semantic search and knowledge retrieval at scale." },
    { id: 4, icon: "Cpu",          label: "Python & FastAPI",           desc: "High-performance AI backends with clean REST APIs your existing systems can call." },
    { id: 5, icon: "Workflow",     label: "n8n & Make (Zapier-class)",  desc: "Visual workflow automation for connecting apps without bespoke code where appropriate." },
    { id: 6, icon: "Shield",       label: "On-Premise Deployment",      desc: "All models and pipelines can run fully on your infrastructure — your data never leaves your control." },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "From audit to live automation in weeks",
  subheading: "We start by understanding your processes — then engineer AI that fits around your existing operations.",
  steps: [
    { id: 1, step: "01", icon: "Search",       title: "Audit",              detail: "We map your current workflows, identify repetitive processes, and quantify how much time each costs your team each week." },
    { id: 2, step: "02", icon: "Layers",       title: "Design",             detail: "We select the right AI approach — chatbot, pipeline, model, or integration — and show you the architecture before we build." },
    { id: 3, step: "03", icon: "BrainCircuit", title: "Build & Train",      detail: "We engineer the solution, train it on your data, and test it rigorously against real-world edge cases in a staging environment." },
    { id: 4, step: "04", icon: "Rocket",       title: "Deploy & Monitor",   detail: "Go-live with full dashboards so you see exactly what the AI is doing, how often, and what it's saving you." },
  ],
};

const INIT_STATS = [
  { id: 1, value: "70",  suffix: "%",  label: "Avg. manual task reduction" },
  { id: 2, value: "24",  suffix: "/7", label: "AI availability"            },
  { id: 3, value: "3",   suffix: "×",  label: "Faster response times"      },
  { id: 4, value: "500", suffix: "+",  label: "Clients automated"          },
];

const INIT_INDUSTRIES = {
  heading: "AI we've deployed across every sector",
  subheading: "We understand your industry's data, compliance requirements, and operational patterns before we automate anything.",
  items: [
    { id: 1, icon: "Package",         label: "Distributors & Logistics" },
    { id: 2, icon: "Stethoscope",     label: "Healthcare & Clinics"     },
    { id: 3, icon: "GraduationCap",   label: "Education & Training"     },
    { id: 4, icon: "ShoppingCart",    label: "Retail & E-commerce"      },
    { id: 5, icon: "Building2",       label: "Finance & Enterprise"     },
    { id: 6, icon: "UtensilsCrossed", label: "Restaurants & Food"       },
    { id: 7, icon: "Heart",           label: "Events & Hospitality"     },
    { id: 8, icon: "FileText",        label: "Legal & Professional"     },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "AI that delivers measurable results",
  items: [
    { id: 1, quote: "OneSoft built us a WhatsApp chatbot for order tracking and customer queries. It now handles 80% of our support tickets with no human involvement.",                         name: "Omar Farooqi",    role: "Head of Operations", company: "FastTrack Distributors"          },
    { id: 2, quote: "The RAG system they built means our staff can ask questions about our 400-page policy manual and get accurate answers instantly. Game-changer.",                          name: "Claire Donovan",  role: "HR Director",        company: "Meridian Financial Services"     },
    { id: 3, quote: "Automated invoice processing cut our accounts payable workload by 65%. What took two days a week now happens overnight with zero errors.",                                name: "Yusuf Malik",     role: "CFO",                company: "Crescent Wholesale Group"        },
  ],
};

const INIT_CTA = {
  badge: "Ready to automate?",
  heading: "Let's audit your workflows and find your automation wins",
  subheading: "Free 30-minute audit call. We'll identify the three processes costing your team the most time — and show you exactly how to automate them.",
  ctaPrimary: "Book a Free Audit Call",
  email: "info@onesoft.org.uk",
};

/* ════════════════════════════════════════════════════════════
   TAB DEFINITIONS
═════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "hero",         label: "Hero"          },
  { id: "problem",      label: "Problem"       },
  { id: "solution",     label: "Solution"      },
  { id: "tech",         label: "Tech Stack"    },
  { id: "process",      label: "Process"       },
  { id: "stats",        label: "Stats"         },
  { id: "industries",   label: "Industries"    },
  { id: "testimonials", label: "Testimonials"  },
  { id: "cta",          label: "CTA"           },
];

/* ════════════════════════════════════════════════════════════
   TAB COMPONENTS
═════════════════════════════════════════════════════════════ */

function HeroTab() {
  const [data, setData] = useState(INIT_HERO);
  const [saved, setSaved] = useState(false);
  const [editingTrust, setEditingTrust] = useState<any>(undefined);
  const [deletingTrust, setDeletingTrust] = useState<any>(null);
  const set = (k: keyof typeof INIT_HERO) => (v: string) => setData(d => ({ ...d, [k]: v }));
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Badge & Headlines</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} hint="Pill shown above the H1 — uses violet styling on the live page" />
        <Field label="Main Headline (H1)" value={data.headline} onChange={set("headline")} multiline />
        <Field label="Sub-headline" value={data.subheadline} onChange={set("subheadline")} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Button" value={data.ctaPrimary} onChange={set("ctaPrimary")} />
          <Field label="Secondary CTA Button" value={data.ctaSecondary} onChange={set("ctaSecondary")} />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Trust Bar Items</SectionHeader>
          <Btn size="sm" onClick={() => setEditingTrust(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.trustItems.map(item => (
            <ItemRow key={item.id} icon={item.icon} primary={item.label}
              onEdit={() => setEditingTrust(item)} onDelete={() => setDeletingTrust(item)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editingTrust !== undefined && (
        <CardModal
          item={editingTrust ? { ...editingTrust, title: editingTrust.label } : null}
          titleField="label" hasIcon
          onClose={() => setEditingTrust(undefined)}
          onSave={item => setData(d => {
            const idx = d.trustItems.findIndex(i => i.id === item.id);
            const entry = { id: item.id, icon: item.icon, label: item.label! };
            if (idx >= 0) { const n = [...d.trustItems]; n[idx] = entry; return { ...d, trustItems: n }; }
            return { ...d, trustItems: [...d.trustItems, entry] };
          })}
        />
      )}
      {deletingTrust && (
        <DeleteConfirm label={deletingTrust.label}
          onConfirm={() => { setData(d => ({ ...d, trustItems: d.trustItems.filter(i => i.id !== deletingTrust.id) })); setDeletingTrust(null); }}
          onClose={() => setDeletingTrust(null)} />
      )}
    </div>
  );
}

function ProblemTab() {
  const [data, setData] = useState(INIT_PROBLEM);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={v => setData(d => ({ ...d, badge: v }))} />
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} multiline />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Problem Cards ({data.cards.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.cards.map(c => (
            <ItemRow key={c.id} icon={c.icon} primary={c.title} secondary={c.desc}
              onEdit={() => setEditing(c)} onDelete={() => setDeleting(c)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <CardModal item={editing} titleField="title" descField="desc" hasIcon
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.cards.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.cards]; n[idx] = item as any; return { ...d, cards: n }; }
            return { ...d, cards: [...d.cards, item as any] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.title}
          onConfirm={() => { setData(d => ({ ...d, cards: d.cards.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function SolutionTab() {
  const [data, setData] = useState(INIT_SOLUTION);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={v => setData(d => ({ ...d, badge: v }))} />
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} multiline />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Solution Cards ({data.cards.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.cards.map(c => (
            <ItemRow key={c.id} icon={c.icon} primary={c.title} secondary={c.desc}
              onEdit={() => setEditing(c)} onDelete={() => setDeleting(c)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <CardModal item={editing} titleField="title" descField="desc" hasIcon
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.cards.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.cards]; n[idx] = item as any; return { ...d, cards: n }; }
            return { ...d, cards: [...d.cards, item as any] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.title}
          onConfirm={() => { setData(d => ({ ...d, cards: d.cards.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function TechTab() {
  const [data, setData] = useState(INIT_TECH);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Technology Items ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.items.map(t => (
            <ItemRow key={t.id} icon={t.icon} primary={t.label} secondary={t.desc}
              onEdit={() => setEditing(t)} onDelete={() => setDeleting(t)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <CardModal item={editing} titleField="label" descField="desc" hasIcon
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.items.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.items]; n[idx] = item as any; return { ...d, items: n }; }
            return { ...d, items: [...d.items, item as any] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.label}
          onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function ProcessTab() {
  const [data, setData] = useState(INIT_PROCESS);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={v => setData(d => ({ ...d, badge: v }))} />
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} multiline />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Process Steps ({data.steps.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.steps.map(s => (
            <ItemRow key={s.id} icon={s.icon} primary={`${s.step} · ${s.title}`} secondary={s.detail}
              onEdit={() => setEditing(s)} onDelete={() => setDeleting(s)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <ProcessStepModal item={editing}
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.steps.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.steps]; n[idx] = item; return { ...d, steps: n }; }
            return { ...d, steps: [...d.steps, item] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.title}
          onConfirm={() => { setData(d => ({ ...d, steps: d.steps.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function ProcessStepModal({ item, onClose, onSave }: {
  item: typeof INIT_PROCESS["steps"][0] | null;
  onClose: () => void;
  onSave: (item: typeof INIT_PROCESS["steps"][0]) => void;
}) {
  const [form, setForm] = useState(item ?? { id: 0, step: "01", icon: "Rocket", title: "", detail: "" });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Process Step</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <IconSelect value={form.icon} onChange={set("icon")} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Step No." value={form.step} onChange={set("step")} hint="e.g. 01" />
            <div className="col-span-2">
              <Field label="Step Title" value={form.title} onChange={set("title")} />
            </div>
          </div>
          <Field label="Detail" value={form.detail} onChange={set("detail")} multiline />
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">Cancel</button>
          <button onClick={() => { onSave({ ...form, id: form.id || Date.now() }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsTab() {
  const [items, setItems] = useState(INIT_STATS);
  const [saved, setSaved] = useState(false);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  function update(id: number, key: string, val: string) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s));
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader>Count-up Statistics</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(s => (
            <div key={s.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Value" value={s.value} onChange={v => update(s.id, "value", v)} />
                <Field label="Suffix (e.g. %, /7, ×)" value={s.suffix} onChange={v => update(s.id, "suffix", v)} />
              </div>
              <Field label="Label" value={s.label} onChange={v => update(s.id, "label", v)} />
              <div className="pt-2 border-t border-border text-center">
                <span className="text-2xl font-black text-primary">{s.value}{s.suffix}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

function IndustriesTab() {
  const [data, setData] = useState(INIT_INDUSTRIES);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Industry Tiles ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {data.items.map(ind => (
            <div key={ind.id} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-background text-center">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <IconEl name={ind.icon} className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[11px] font-semibold text-foreground leading-tight">{ind.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {data.items.map(ind => (
            <ItemRow key={ind.id} icon={ind.icon} primary={ind.label}
              onEdit={() => setEditing(ind)} onDelete={() => setDeleting(ind)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <CardModal item={editing} titleField="label" hasIcon
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.items.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.items]; n[idx] = item as any; return { ...d, items: n }; }
            return { ...d, items: [...d.items, item as any] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.label}
          onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function TestimonialsTab() {
  const [data, setData] = useState(INIT_TESTIMONIALS);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<{ id: number; quote: string; name: string; role: string; company: string } | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={v => setData(d => ({ ...d, badge: v }))} />
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Testimonials ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.items.map(t => (
            <ItemRow key={t.id} primary={`"${t.quote.slice(0, 60)}…"`} secondary={`${t.name} · ${t.role}, ${t.company}`}
              onEdit={() => setEditing(t)} onDelete={() => setDeleting(t)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <TestimonialModal item={editing}
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.items.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.items]; n[idx] = item; return { ...d, items: n }; }
            return { ...d, items: [...d.items, item] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.name}
          onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function CTATab() {
  const [data, setData] = useState(INIT_CTA);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof typeof INIT_CTA) => (v: string) => setData(d => ({ ...d, [k]: v }));
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Call to Action Section</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} />
        <Field label="Headline" value={data.heading} onChange={set("heading")} multiline />
        <Field label="Sub-headline" value={data.subheading} onChange={set("subheading")} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Button" value={data.ctaPrimary} onChange={set("ctaPrimary")} />
          <Field label="Email Address" value={data.email} onChange={set("email")} />
        </div>
      </div>

      {/* Live preview */}
      <div className="rounded-2xl p-6 text-center" style={{ background: "#1E4DA0" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">{data.badge}</p>
        <h2 className="text-lg font-black text-white mb-2 leading-snug">{data.heading}</h2>
        <p className="text-xs text-white/70 mb-4 max-w-xs mx-auto">{data.subheading}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="px-4 py-1.5 rounded-xl bg-white text-[#1E4DA0] text-xs font-bold">{data.ctaPrimary}</span>
          <span className="text-xs text-white/70">{data.email}</span>
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
═════════════════════════════════════════════════════════════ */
const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  hero:         HeroTab,
  problem:      ProblemTab,
  solution:     SolutionTab,
  tech:         TechTab,
  process:      ProcessTab,
  stats:        StatsTab,
  industries:   IndustriesTab,
  testimonials: TestimonialsTab,
  cta:          CTATab,
};

export default function AIAutomationServiceCMSPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <Layout>
      <div className="px-6 pt-6 pb-2">
        <Breadcrumb items={[
          { label: "Products & Services", href: "/services" },
          { label: "AI & Automation Page" },
        ]} />
        <PageHeader
          title="AI & Automation Page Editor"
          subtitle="Edit every section of the /ai-automation landing page"
          action={
            <a href="https://onesoft.org.uk/ai-automation" target="_blank" rel="noopener noreferrer">
              <Btn variant="outline" size="sm"><ExternalLink className="w-3.5 h-3.5" /> Preview Live</Btn>
            </a>
          }
        />
      </div>

      {/* Tab bar */}
      <div className="px-6 border-b border-border">
        <div className="flex gap-1 overflow-x-auto pb-0 no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6 max-w-3xl">
        <ActiveTab />
      </div>
    </Layout>
  );
}
