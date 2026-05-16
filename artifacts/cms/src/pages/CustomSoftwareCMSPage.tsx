import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import {
  Save, X, Plus, Edit2, Trash2, GripVertical, ChevronDown,
  ExternalLink, AlertCircle, CheckCircle2, Code2, Globe,
  Smartphone, Zap, Shield, RefreshCw, BarChart3, MessageSquare,
  Rocket, XCircle, UtensilsCrossed, Stethoscope, GraduationCap,
  Building2, Heart, Package, Star, Clock, Users, TrendingUp,
  Lock, Layers, Bot, Monitor, Server, Database, GitBranch, Cpu,
} from "lucide-react";

/* ── Icon helpers ───────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertCircle, CheckCircle2, Smartphone, Zap, Shield,
  RefreshCw, BarChart3, Bot, Code2, Globe, MessageSquare, Rocket,
  UtensilsCrossed, Stethoscope, GraduationCap, Building2, Heart,
  Package, Star, Clock, Users, TrendingUp, Lock, Layers,
  Monitor, Server, Database, GitBranch, Cpu,
};

const ICON_OPTIONS = [
  { v: "XCircle",         l: "Error / Problem"          },
  { v: "AlertCircle",     l: "Warning / Alert"          },
  { v: "CheckCircle2",    l: "Check / Success"          },
  { v: "Monitor",         l: "Web / Desktop App"        },
  { v: "Cpu",             l: "Desktop / Processing"     },
  { v: "Smartphone",      l: "Mobile App"               },
  { v: "Server",          l: "Server / API"             },
  { v: "Database",        l: "Database"                 },
  { v: "GitBranch",       l: "Integration / Git"        },
  { v: "Bot",             l: "AI / Automation"          },
  { v: "RefreshCw",       l: "Legacy / Updates"         },
  { v: "Code2",           l: "Code / React"             },
  { v: "Globe",           l: "Web Framework"            },
  { v: "Layers",          l: "Architecture / Stack"     },
  { v: "Zap",             l: "Speed / Performance"      },
  { v: "Shield",          l: "Security"                 },
  { v: "BarChart3",       l: "Analytics / Reports"      },
  { v: "MessageSquare",   l: "Requirements / Chat"      },
  { v: "Rocket",          l: "Launch / Deploy"          },
  { v: "UtensilsCrossed", l: "Restaurants & Cafes"      },
  { v: "Stethoscope",     l: "Clinics & Healthcare"     },
  { v: "GraduationCap",   l: "Schools & Education"      },
  { v: "Building2",       l: "Corporate / Agency"       },
  { v: "Heart",           l: "Events & Hospitality"     },
  { v: "Package",         l: "Distribution / Logistics" },
  { v: "Star",            l: "Rating / Quality"         },
  { v: "Clock",           l: "Time / Turnaround"        },
  { v: "Users",           l: "Team / Clients"           },
  { v: "TrendingUp",      l: "Growth / Marketing"       },
  { v: "Lock",            l: "Privacy / Source Code"    },
];

function IconEl({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const C = ICON_MAP[name] ?? Zap;
  return <C className={className} />;
}

/* ── Shared field components ────────────────────────────────── */
function Field({ label, value, onChange, multiline = false, hint, mono = false }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; hint?: string; mono?: boolean;
}) {
  const cls = `w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all resize-none ${mono ? "font-mono" : ""}`;
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
  const Icon = ICON_MAP[value] ?? Zap;
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

type AnyItem = { id: number; [key: string]: any };

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

/* ── Tab config ─────────────────────────────────────────────── */
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
   SECTION SEED DATA
═════════════════════════════════════════════════════════════ */

const INIT_HERO = {
  badge: "Custom Software Development",
  headline: "Software built exactly for how you work — not the other way around",
  subheadline: "OneSoft engineers bespoke web apps, desktop systems, mobile apps, and APIs — purpose-built for your processes, your team, and your growth.",
  ctaPrimary: "Discuss Your Project",
  ctaSecondary: "Book a Free Discovery Call",
  trustItems: [
    { id: 1, icon: "MessageSquare", label: "Weekly sprint demos"        },
    { id: 2, icon: "Star",          label: "98% on-time delivery"        },
    { id: 3, icon: "Users",         label: "150+ systems built"          },
    { id: 4, icon: "Lock",          label: "Full source code handover"   },
  ],
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Generic software is costing you more than you think",
  subheading: "Every workaround, manual process, and disconnected tool is a hidden tax on your team's time and your company's growth.",
  cards: [
    { id: 1, icon: "XCircle",     title: "Off-the-shelf software that almost fits",         desc: "Generic tools make you work around their limitations instead of for your goals. You end up paying for features you don't need and missing the ones you do." },
    { id: 2, icon: "AlertCircle", title: "Manual processes eating hours every day",          desc: "Copy-pasting between spreadsheets, chasing approvals on WhatsApp, re-entering the same data in three systems — all symptoms of software that was never built for your workflow." },
    { id: 3, icon: "XCircle",     title: "Disconnected tools that don't talk to each other", desc: "Your CRM doesn't sync with your inventory. Your invoicing doesn't update your accounts. Each integration gap means manual effort — and human error." },
    { id: 4, icon: "AlertCircle", title: "Scaling breaks everything",                        desc: "A system that barely worked for 10 users falls apart at 100. Bespoke software is architected for your growth trajectory from day one — not patched to keep up." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "Every type of software your business needs",
  subheading: "From a simple internal tool to a complex multi-tenant platform — we scope it, architect it, and deliver it.",
  cards: [
    { id: 1, icon: "Monitor",   title: "Web Applications",       desc: "Browser-based tools your whole team can use with zero installation. Fast, secure, and accessible from anywhere." },
    { id: 2, icon: "Cpu",       title: "Desktop Applications",   desc: "Powerful Windows, macOS, or cross-platform apps for workflows that need local processing or offline capability." },
    { id: 3, icon: "Smartphone",title: "Mobile Apps",            desc: "iOS and Android apps — native or cross-platform — designed for real users on real devices in real conditions." },
    { id: 4, icon: "Server",    title: "API & Backend Systems",  desc: "Robust REST or GraphQL APIs, webhooks, and microservices that power your products and connect your ecosystem." },
    { id: 5, icon: "Database",  title: "Database Architecture",  desc: "Properly normalised schemas, performance-tuned queries, and reliable backups — built to scale alongside your data." },
    { id: 6, icon: "GitBranch", title: "System Integrations",    desc: "Connect your existing tools — CRM, ERP, payment gateways, logistics APIs — into one seamless data flow." },
    { id: 7, icon: "Bot",       title: "AI & Automation Layers", desc: "Embed intelligent features — smart search, predictive analytics, automated decisions — directly into your software." },
    { id: 8, icon: "RefreshCw", title: "Legacy Modernisation",   desc: "We migrate ageing systems to modern stacks without disrupting your operations — piece by piece, safely." },
  ],
};

const INIT_TECH = {
  heading: "Technologies we build with",
  subheading: "We choose the right stack for your project — not the one that's easiest for us to build.",
  items: [
    { id: 1, icon: "Code2",    label: "React & Next.js",   desc: "Frontend applications built for speed, accessibility, and SEO." },
    { id: 2, icon: "Server",   label: "Node.js & Express", desc: "Fast, event-driven backends that scale horizontally with ease." },
    { id: 3, icon: "Database", label: "PostgreSQL & MySQL", desc: "Relational databases designed for integrity, performance, and scale." },
    { id: 4, icon: "Globe",    label: "Laravel & Django",  desc: "Battle-tested frameworks for rapid, secure web application development." },
    { id: 5, icon: "Monitor",  label: ".NET & C#",         desc: "Enterprise-grade desktop and web applications for Windows environments." },
    { id: 6, icon: "Bot",      label: "Python & AI/ML",    desc: "Data pipelines, machine learning models, and intelligent automation." },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "A process built around transparency",
  subheading: "You'll see progress every week — not just a final reveal months later.",
  steps: [
    { id: 1, step: "01", icon: "MessageSquare", title: "Requirements", detail: "We dig deep into your workflow — what you do today, what breaks, and what success looks like. No assumptions, just listening." },
    { id: 2, step: "02", icon: "Layers",        title: "Architecture",  detail: "We map your system: data models, integrations, user roles, and tech stack. You approve the blueprint before a line of code is written." },
    { id: 3, step: "03", icon: "Code2",         title: "Development",  detail: "Iterative sprints with weekly demos on a live staging environment. You see real progress every week, not just a final reveal." },
    { id: 4, step: "04", icon: "Rocket",        title: "Deploy & Own", detail: "Full deployment to your infrastructure or our managed cloud. Source code handover, documentation, and staff training included." },
  ],
};

const INIT_STATS = [
  { id: 1, value: "150", suffix: "+", label: "Custom Systems Built" },
  { id: 2, value: "98",  suffix: "%", label: "On-Time Delivery"     },
  { id: 3, value: "7",   suffix: "+", label: "Years of Experience"  },
  { id: 4, value: "500", suffix: "+", label: "Happy Clients"        },
];

const INIT_INDUSTRIES = {
  heading: "Built for every industry",
  subheading: "We've engineered custom software across sectors — we understand your domain before we start.",
  items: [
    { id: 1, icon: "Package",         label: "Distributors & Logistics" },
    { id: 2, icon: "Stethoscope",     label: "Healthcare & Clinics"     },
    { id: 3, icon: "GraduationCap",   label: "Education & Training"     },
    { id: 4, icon: "Monitor",         label: "Retail & E-commerce"      },
    { id: 5, icon: "Building2",       label: "Corporates & Enterprises" },
    { id: 6, icon: "UtensilsCrossed", label: "Restaurants & Food"       },
    { id: 7, icon: "Heart",           label: "Events & Hospitality"     },
    { id: 8, icon: "Bot",             label: "SaaS & Tech Startups"     },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "Real results from real clients",
  items: [
    { id: 1, quote: "OneSoft replaced our entire paper-based stock management system with a web app in 6 weeks. Our team saved 3 hours daily from day one.",           name: "Tariq Hussain",    role: "Operations Director", company: "Al-Noor Distributors"        },
    { id: 2, quote: "We had three separate tools that never synced. OneSoft built us a single platform that replaced all three. Support has been exceptional.",        name: "Sarah Mitchell",   role: "CEO",                 company: "ClearPath Logistics"          },
    { id: 3, quote: "The custom student portal they built reduced admin workload by 40%. Parents, students, and teachers all have exactly what they need.",            name: "Mr. Adeel Farooq", role: "Principal",           company: "Beacon Academy, Birmingham"  },
  ],
};

const INIT_CTA = {
  badge: "Ready to start?",
  heading: "Stop working around software. Let's build software that works for you.",
  subheading: "Tell us what you need. We'll scope it, price it honestly, and show you a plan — no strings attached.",
  ctaPrimary: "Start the Conversation",
  email: "info@onesoft.org.uk",
};

/* ════════════════════════════════════════════════════════════
   MODALS
═════════════════════════════════════════════════════════════ */
type CardItem = { id: number; icon: string; title?: string; label?: string; desc?: string; detail?: string; step?: string };

function CardModal({ item, titleField, descField, hasIcon = true, extraFields, onClose, onSave }: {
  item: CardItem | null;
  titleField: "title" | "label";
  descField?: "desc" | "detail";
  hasIcon?: boolean;
  extraFields?: React.ReactNode;
  onClose: () => void;
  onSave: (item: CardItem) => void;
}) {
  const [form, setForm] = useState<CardItem>(
    item ?? { id: 0, icon: "Zap", title: "", label: "", desc: "", detail: "" }
  );
  const set = (k: keyof CardItem) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">{item?.id ? "Edit" : "Add"} Item</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {hasIcon && <IconSelect value={form.icon} onChange={set("icon")} />}
          <Field label={titleField === "title" ? "Title" : "Label"} value={form[titleField] ?? ""} onChange={set(titleField)} />
          {descField && <Field label={descField === "desc" ? "Description" : "Detail"} value={form[descField] ?? ""} onChange={set(descField)} multiline />}
          {extraFields}
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
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">Remove</button>
        </div>
      </div>
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

/* ════════════════════════════════════════════════════════════
   TAB CONTENT
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
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} hint="Small pill shown above the headline" />
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
            if (idx >= 0) { const n = [...d.trustItems]; n[idx] = { id: item.id, icon: item.icon, label: item.label! }; return { ...d, trustItems: n }; }
            return { ...d, trustItems: [...d.trustItems, { id: item.id, icon: item.icon, label: item.label! }] };
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
        <CardModal item={editing} titleField="title" descField="detail" hasIcon
          extraFields={
            <Field label="Step Number (e.g. 01)"
              value={editing?.step ?? ""}
              onChange={v => {}}
            />
          }
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.steps.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.steps]; n[idx] = item as any; return { ...d, steps: n }; }
            return { ...d, steps: [...d.steps, item as any] };
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
                <Field label="Suffix (e.g. + or %)" value={s.suffix} onChange={v => update(s.id, "suffix", v)} />
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
          <h2 className="text-base font-bold text-foreground">{item?.id ? "Edit" : "Add"} Testimonial</h2>
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

export default function CustomSoftwareCMSPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <Layout>
      <div className="px-6 pt-6 pb-2">
        <Breadcrumb items={[
          { label: "Products & Services", href: "/services" },
          { label: "Custom Software Page" },
        ]} />
        <PageHeader
          title="Custom Software Page Editor"
          subtitle="Edit every section of the /custom-software landing page"
          action={
            <a href="https://onesoft.org.uk/custom-software" target="_blank" rel="noopener noreferrer">
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
