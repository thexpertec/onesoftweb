import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import { useLocation } from "wouter";
import {
  Save, X, Plus, Edit2, Trash2, GripVertical, ChevronDown,
  ExternalLink, AlertCircle, CheckCircle2, Code2, Globe,
  ShoppingCart, Smartphone, Wrench, Bot, Palette, Search,
  Zap, Shield, RefreshCw, BarChart3, MessageSquare, Rocket,
  XCircle, UtensilsCrossed, Stethoscope, GraduationCap,
  Building2, Heart, Package, Star, Clock, Users, TrendingUp,
  MonitorSmartphone, ArrowRight, Home, Lock, Mail, Layers,
} from "lucide-react";

/* ── Icon helpers ───────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertCircle, CheckCircle2, Palette, Search, Smartphone,
  Zap, Shield, RefreshCw, BarChart3, Bot, Code2, Globe, ShoppingCart,
  Wrench, MessageSquare, Rocket, UtensilsCrossed, Stethoscope,
  GraduationCap, Building2, Heart, Package, Star, Clock, Users,
  TrendingUp, MonitorSmartphone, Lock, Mail, Layers, Home, ArrowRight, Plus,
};

const ICON_OPTIONS = [
  { v: "XCircle",          l: "Error / Problem"       },
  { v: "AlertCircle",      l: "Warning / Alert"       },
  { v: "CheckCircle2",     l: "Check / Success"       },
  { v: "Palette",          l: "Design / Creative"     },
  { v: "Search",           l: "Search / SEO"          },
  { v: "Smartphone",       l: "Mobile"                },
  { v: "Zap",              l: "Speed / Performance"   },
  { v: "Shield",           l: "Security"              },
  { v: "RefreshCw",        l: "Support / Updates"     },
  { v: "BarChart3",        l: "Analytics / Reports"   },
  { v: "Bot",              l: "AI / Automation"       },
  { v: "Code2",            l: "Code / React"          },
  { v: "Globe",            l: "WordPress / Web"       },
  { v: "ShoppingCart",     l: "E-commerce / Shopify"  },
  { v: "Wrench",           l: "Tools / Custom Stack"  },
  { v: "MessageSquare",    l: "Discovery / Chat"      },
  { v: "Rocket",           l: "Launch / Deploy"       },
  { v: "UtensilsCrossed",  l: "Restaurants & Cafes"   },
  { v: "Stethoscope",      l: "Clinics & Healthcare"  },
  { v: "GraduationCap",    l: "Schools & Education"   },
  { v: "Building2",        l: "Corporate / Agency"    },
  { v: "Heart",            l: "Events & Hospitality"  },
  { v: "Package",          l: "Distribution / Logistics"},
  { v: "Star",             l: "Rating / Quality"      },
  { v: "Clock",            l: "Time / Turnaround"     },
  { v: "Users",            l: "Team / Clients"        },
  { v: "TrendingUp",       l: "Growth / Marketing"    },
  { v: "MonitorSmartphone",l: "Multi-device"          },
  { v: "Lock",             l: "Privacy / GDPR"        },
  { v: "Mail",             l: "Email / Contact"       },
  { v: "Layers",           l: "Multi-layer / Stack"   },
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

/* ── Generic CRUD card list ─────────────────────────────────── */
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

/* ── Tab IDs ─────────────────────────────────────────────────── */
const TABS = [
  { id: "hero",         label: "Hero"          },
  { id: "problem",      label: "Problem"       },
  { id: "solution",     label: "Solution"      },
  { id: "tech",         label: "Technologies"  },
  { id: "process",      label: "Process"       },
  { id: "stats",        label: "Stats"         },
  { id: "industries",   label: "Industries"    },
  { id: "testimonials", label: "Testimonials"  },
  { id: "cta",          label: "CTA"           },
];

/* ════════════════════════════════════════════════════════════
   SECTION DATA
═════════════════════════════════════════════════════════════ */

const INIT_HERO = {
  badge: "Website Development",
  headline: "Your website should win customers — not just exist online",
  subheadline: "OneSoft builds custom, high-performance websites from scratch — designed to rank, convert, and represent your brand at its best.",
  ctaPrimary: "Get a Free Quote",
  ctaSecondary: "Book a Discovery Call",
  trustItems: [
    { id: 1, icon: "Clock",      label: "Avg. 9-day launch"    },
    { id: 2, icon: "Star",       label: "98% on-time delivery" },
    { id: 3, icon: "Users",      label: "500+ clients served"  },
    { id: 4, icon: "TrendingUp", label: "SEO from day one"     },
  ],
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Most business websites are actively hurting sales",
  subheading: "A slow, generic, or invisible website doesn't just fail to attract customers — it actively pushes them to your competitors.",
  cards: [
    { id: 1, icon: "XCircle",     title: "Template sites that look like everyone else",    desc: "Wix and Squarespace give you a cookie-cutter layout your competitors already have. Nothing about your brand, your product, or your customers." },
    { id: 2, icon: "AlertCircle", title: "Slow load times killing conversions",             desc: "A 1-second delay costs up to 7% of conversions. Bloated themes, unoptimised images, and shared hosting quietly bleed revenue every day." },
    { id: 3, icon: "XCircle",     title: "Zero visibility on Google",                      desc: "A beautiful site that nobody finds is a liability. Most agencies build first and think about SEO later — by which point the damage is already done." },
    { id: 4, icon: "AlertCircle", title: "No clear path from visitor to customer",          desc: "Without intentional UX, trust signals, and calls to action, visitors bounce. Your site should be your best salesperson — not a digital brochure." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "Everything that makes a website actually work",
  subheading: "We don't just build websites — we build business assets that rank, convert, and grow with you.",
  cards: [
    { id: 1, icon: "Palette",    title: "100% Custom Design",        desc: "Every page is designed around your brand identity, audience, and goals. No templates, no recycled layouts — ever." },
    { id: 2, icon: "Search",     title: "SEO Built In From Day One",  desc: "Schema markup, Core Web Vitals, meta architecture, and sitemaps baked in before a single page goes live." },
    { id: 3, icon: "Smartphone", title: "Mobile-First, Always",       desc: "Designed and tested on real devices. Flawless across every screen — not just desktop-first with a responsive toggle." },
    { id: 4, icon: "Zap",        title: "Performance-Engineered",     desc: "Lazy loading, CDN delivery, image optimisation, and sub-second TTFB. We obsess over Lighthouse scores so you rank." },
    { id: 5, icon: "Shield",     title: "Secure & GDPR-Ready",        desc: "SSL, cookie consent, security headers, and privacy policy included. Your users' data is protected from launch." },
    { id: 6, icon: "RefreshCw",  title: "30-Day Post-Launch Support",  desc: "We don't disappear after go-live. One month of free fixes, then flexible retainer packages to keep you growing." },
    { id: 7, icon: "BarChart3",  title: "Analytics & Reporting",      desc: "GA4, Google Search Console, and monthly performance summaries so you always know what's working." },
    { id: 8, icon: "Bot",        title: "AI Features on Request",     desc: "Chat widgets, intelligent search, recommendation engines — layer AI on top when you're ready to scale." },
  ],
};

const INIT_TECH = {
  heading: "Technologies we build with",
  subheading: "We choose the right tool for your project — not the one that's easiest for us.",
  items: [
    { id: 1, icon: "Code2",        label: "React & Next.js",   desc: "Lightning-fast, SEO-optimised apps with server-side rendering and static generation." },
    { id: 2, icon: "Globe",        label: "WordPress",          desc: "Easy CMS with WooCommerce for blogs, catalogues, and content-heavy sites." },
    { id: 3, icon: "ShoppingCart", label: "Shopify",            desc: "Full-stack storefronts with payments, inventory, discount rules, and shipping built in." },
    { id: 4, icon: "Smartphone",   label: "Mobile-First PWA",   desc: "App-like experiences that install to home screens and work perfectly offline." },
    { id: 5, icon: "Bot",          label: "AI-Enhanced Sites",  desc: "Chatbots, recommendation layers, and intelligent search — we integrate what makes sense for your users." },
    { id: 6, icon: "Wrench",       label: "Any Stack You Need", desc: "Vue, Nuxt, Laravel, Django — we work in whatever fits your project and long-term team." },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "From first call to live site in days",
  subheading: "A clear, four-step process with no guesswork — you always know what happens next.",
  steps: [
    { id: 1, step: "01", icon: "MessageSquare", title: "Discover", detail: "A free 30-minute call. Tell us your goals, audience, and any tech preferences. No brief needed — we ask the right questions." },
    { id: 2, step: "02", icon: "Palette",       title: "Design",   detail: "Mockups in Figma. You approve every screen before any code is written. We iterate until it feels exactly right." },
    { id: 3, step: "03", icon: "Code2",         title: "Build",    detail: "Development with weekly check-ins and a live staging link throughout. You watch it come to life in real time." },
    { id: 4, step: "04", icon: "Rocket",        title: "Launch",   detail: "We configure hosting, domain, and go-live. Then hand you the keys with full documentation and a recorded walkthrough." },
  ],
};

const INIT_STATS = [
  { id: 1, value: "320", suffix: "+",    label: "Websites Delivered" },
  { id: 2, value: "98",  suffix: "%",    label: "On-Time Delivery"   },
  { id: 3, value: "9",   suffix: " days",label: "Avg. Time to Launch"},
  { id: 4, value: "500", suffix: "+",    label: "Happy Clients"      },
];

const INIT_INDUSTRIES = {
  heading: "We build for every industry",
  subheading: "Whatever your sector, we've built for it before — and we understand what your customers expect.",
  items: [
    { id: 1, icon: "UtensilsCrossed", label: "Restaurants & Cafes"      },
    { id: 2, icon: "Stethoscope",     label: "Clinics & Healthcare"      },
    { id: 3, icon: "GraduationCap",   label: "Schools & Coaching"        },
    { id: 4, icon: "ShoppingCart",    label: "Retail & E-commerce"       },
    { id: 5, icon: "Building2",       label: "Corporates & Agencies"     },
    { id: 6, icon: "Heart",           label: "Events & Hospitality"      },
    { id: 7, icon: "Package",         label: "Distributors & Logistics"  },
    { id: 8, icon: "Bot",             label: "SaaS & Tech Startups"      },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "Real results from real clients",
  items: [
    { id: 1, quote: "OneSoft built our restaurant website in 8 days. Online reservations went from zero to 200+ bookings in the first month. Exceptional work.", name: "Khalid Mansour",   role: "Owner",    company: "Casa Bella Restaurant" },
    { id: 2, quote: "We asked for a clinic website with an appointment system. They delivered something better than we imagined — on time and on budget.",         name: "Dr. Priya Sharma",role: "Director", company: "HealthFirst Clinic"    },
    { id: 3, quote: "The discovery call was 20 minutes. The site was live in 9 days. No agency has ever moved this fast without cutting corners.",                  name: "James Okafor",    role: "Founder",  company: "Pixel & Oak Agency"   },
  ],
};

const INIT_CTA = {
  badge: "Ready to start?",
  heading: "Let's build a website that works as hard as you do",
  subheading: "Free discovery call. No brief needed. Just tell us what you're building — and we'll take it from there.",
  ctaPrimary: "Book a Free Discovery Call",
  email: "info@onesoft.org.uk",
};

/* ════════════════════════════════════════════════════════════
   GENERIC MODAL (icon + title + desc pattern)
═════════════════════════════════════════════════════════════ */
type CardItem = { id: number; icon: string; title?: string; label?: string; desc?: string; detail?: string };

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

/* Generic delete confirm */
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

/* Generic item row */
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
   TAB CONTENT COMPONENTS
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
          titleField="label" hasIcon={true}
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
          })} />
      )}
      {deleting && <DeleteConfirm label={deleting.title}
        onConfirm={() => { setData(d => ({ ...d, cards: d.cards.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
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
          <SectionHeader>Deliverable Cards ({data.cards.length})</SectionHeader>
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
          })} />
      )}
      {deleting && <DeleteConfirm label={deleting.title}
        onConfirm={() => { setData(d => ({ ...d, cards: d.cards.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
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
        <Field label="Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Technology Cards ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.items.map(c => (
            <ItemRow key={c.id} icon={c.icon} primary={c.label} secondary={c.desc}
              onEdit={() => setEditing(c)} onDelete={() => setDeleting(c)} />
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
          })} />
      )}
      {deleting && <DeleteConfirm label={deleting.label}
        onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
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
            <ItemRow key={s.id} icon={s.icon} primary={`${s.step} — ${s.title}`} secondary={s.detail}
              onEdit={() => setEditing(s)} onDelete={() => setDeleting(s)} />
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <CardModal item={editing} titleField="title" descField="detail" hasIcon
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.steps.findIndex(i => i.id === item.id);
            const full = { ...item, step: editing?.step || `0${d.steps.length + 1}` };
            if (idx >= 0) { const n = [...d.steps]; n[idx] = full as any; return { ...d, steps: n }; }
            return { ...d, steps: [...d.steps, full as any] };
          })}
          extraFields={
            <Field label="Step Number (e.g. 01)" value={(editing as any)?.step ?? ""} onChange={v => setEditing((e: any) => ({ ...e, step: v }))} mono />
          }
        />
      )}
      {deleting && <DeleteConfirm label={deleting.title}
        onConfirm={() => { setData(d => ({ ...d, steps: d.steps.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
    </div>
  );
}

function StatsTab() {
  const [stats, setStats] = useState(INIT_STATS);
  const [saved, setSaved] = useState(false);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  function update(id: number, k: string, v: string) {
    setStats(s => s.map(i => i.id === id ? { ...i, [k]: v } : i));
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader>Statistics — Count-Up Numbers</SectionHeader>
        <p className="text-xs text-muted-foreground mb-4">These animate as count-up numbers on the live page.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xl font-black text-primary">{s.value}{s.suffix}</div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Value</label>
                  <input value={s.value} onChange={e => update(s.id, "value", e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-border bg-card text-sm font-mono outline-none focus:border-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Suffix</label>
                  <input value={s.suffix} onChange={e => update(s.id, "suffix", e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-border bg-card text-sm font-mono outline-none focus:border-primary/50 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Label</label>
                <input value={s.label} onChange={e => update(s.id, "label", e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
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
        <Field label="Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Industries ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {data.items.map(item => (
            <div key={item.id} className="group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-all text-center">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <IconEl name={item.icon} className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[11px] font-semibold text-foreground leading-tight">{item.label}</p>
              <div className="absolute top-1.5 right-1.5 hidden group-hover:flex gap-0.5">
                <button onClick={() => setEditing(item)} className="w-5 h-5 rounded hover:bg-muted flex items-center justify-center">
                  <Edit2 className="w-3 h-3 text-muted-foreground" />
                </button>
                <button onClick={() => setDeleting(item)} className="w-5 h-5 rounded hover:bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="w-3 h-3 text-red-500/70" />
                </button>
              </div>
            </div>
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
          })} />
      )}
      {deleting && <DeleteConfirm label={deleting.label}
        onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
    </div>
  );
}

function TestimonialsTab() {
  const [data, setData] = useState(INIT_TESTIMONIALS);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<any>(undefined);
  const [deleting, setDeleting] = useState<any>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  type T = typeof INIT_TESTIMONIALS.items[0];
  function TestimonialModal({ item, onClose, onSave }: { item: T | null; onClose: () => void; onSave: (t: T) => void }) {
    const [form, setForm] = useState<T>(item ?? { id: 0, quote: "", name: "", role: "", company: "" });
    const set = (k: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Testimonial</h2>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Quote</label>
              <textarea value={form.quote} onChange={set("quote")} rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Name</label>
                <input value={form.name} onChange={set("name")}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Role / Title</label>
                <input value={form.role} onChange={set("role")}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Company</label>
              <input value={form.company} onChange={set("company")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
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

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Badge Text" value={data.badge} onChange={v => setData(d => ({ ...d, badge: v }))} />
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <SectionHeader>Testimonials ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        <div className="space-y-2">
          {data.items.map(t => (
            <div key={t.id} className="group flex gap-3 px-4 py-3.5 rounded-xl border border-border bg-background hover:border-primary/30 transition-all">
              <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-0.5 cursor-grab" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">"{t.quote}"</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-foreground">{t.name}</span>
                  <span className="text-[11px] text-muted-foreground">— {t.role}, {t.company}</span>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                <button onClick={() => setEditing(t)} className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => setDeleting(t)} className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-red-500/70" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <TestimonialModal item={editing} onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.items.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.items]; n[idx] = item; return { ...d, items: n }; }
            return { ...d, items: [...d.items, item] };
          })} />
      )}
      {deleting && <DeleteConfirm label={deleting.name}
        onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
        onClose={() => setDeleting(null)} />}
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
        <SectionHeader>Final CTA Section</SectionHeader>
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-2">
          <p className="text-xs text-primary font-semibold">This section appears at the bottom of the page with a solid blue background.</p>
        </div>
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} />
        <Field label="Headline" value={data.heading} onChange={set("heading")} multiline />
        <Field label="Sub-headline" value={data.subheading} onChange={set("subheading")} multiline />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA Button" value={data.ctaPrimary} onChange={set("ctaPrimary")} />
          <Field label="Email Address" value={data.email} onChange={set("email")} mono />
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
═════════════════════════════════════════════════════════════ */
export default function WebDevCMSPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [, navigate] = useLocation();

  const TAB_CONTENT: Record<string, React.ReactNode> = {
    hero:         <HeroTab />,
    problem:      <ProblemTab />,
    solution:     <SolutionTab />,
    tech:         <TechTab />,
    process:      <ProcessTab />,
    stats:        <StatsTab />,
    industries:   <IndustriesTab />,
    testimonials: <TestimonialsTab />,
    cta:          <CTATab />,
  };

  return (
    <Layout>
      <Breadcrumb items={[
        { label: "Dashboard", href: "/" },
        { label: "Services",  href: "/services" },
        { label: "Web Development" },
      ]} />

      <PageHeader
        title="Web Development"
        description="Full page editor for onesoft.org.uk/web-development — all 9 sections."
        action={
          <a href="https://onesoft.org.uk/web-development" target="_blank" rel="noopener noreferrer">
            <Btn variant="secondary"><ExternalLink className="w-4 h-4" /> View Live Page</Btn>
          </a>
        }
      />

      {/* Section count badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "9 Sections",    color: "bg-primary/10 text-primary border-primary/20" },
          { label: "4 Problem cards",color: "bg-red-500/10 text-red-600 border-red-500/20" },
          { label: "8 Deliverables",color: "bg-green-500/10 text-green-700 border-green-500/20" },
          { label: "6 Tech items",  color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
          { label: "4 Stats",       color: "bg-purple-500/10 text-purple-700 border-purple-500/20" },
          { label: "8 Industries",  color: "bg-orange-500/10 text-orange-700 border-orange-500/20" },
          { label: "3 Testimonials",color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
        ].map(b => (
          <span key={b.label} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${b.color}`}>{b.label}</span>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-muted/40 border border-border rounded-2xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab, i) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${activeTab === tab.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
              {i + 1}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div>{TAB_CONTENT[activeTab]}</div>
    </Layout>
  );
}
