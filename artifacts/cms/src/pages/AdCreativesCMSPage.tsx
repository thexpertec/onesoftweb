import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import {
  Save, X, Plus, Edit2, Trash2, GripVertical, ChevronDown, ExternalLink,
  AlertCircle, CheckCircle2, Brush, Zap, Clock, Star, MessageSquare,
  Rocket, Users, TrendingUp, XCircle, BarChart3, Target, Eye, Play, Image,
  Layers, PenTool, Monitor, Smartphone, Video, Package, Building2,
  GraduationCap, Stethoscope, UtensilsCrossed, Heart, ShoppingCart, Bot,
  MousePointerClick, Palette, Megaphone, FileText,
} from "lucide-react";

/* ── Icon map ───────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertCircle, CheckCircle2, Brush, Zap, Clock, Star, MessageSquare,
  Rocket, Users, TrendingUp, BarChart3, Target, Eye, Play, Image, Layers,
  PenTool, Monitor, Smartphone, Video, Package, Building2, GraduationCap,
  Stethoscope, UtensilsCrossed, Heart, ShoppingCart, Bot,
  MousePointerClick, Palette, Megaphone, FileText,
};

const ICON_OPTIONS = [
  { v: "XCircle",          l: "Error / Problem"             },
  { v: "AlertCircle",      l: "Warning / Alert"             },
  { v: "CheckCircle2",     l: "Check / Success"             },
  { v: "Image",            l: "Static Ad / Image"           },
  { v: "Video",            l: "Video Ad / Reels"            },
  { v: "Play",             l: "Motion / Play"               },
  { v: "MousePointerClick",l: "CTA / Click"                 },
  { v: "Layers",           l: "A/B Variants / Layers"       },
  { v: "Palette",          l: "Brand / Colour"              },
  { v: "Monitor",          l: "Display / Banners"           },
  { v: "Smartphone",       l: "Mobile / App"                },
  { v: "FileText",         l: "Strategy / Copywriting"      },
  { v: "PenTool",          l: "Concept / Design"            },
  { v: "Brush",            l: "Creative / Illustration"     },
  { v: "Target",           l: "Targeting / Brief"           },
  { v: "BarChart3",        l: "Analytics / Testing"         },
  { v: "TrendingUp",       l: "Growth / CTR"                },
  { v: "Eye",              l: "Reach / Impressions"         },
  { v: "Clock",            l: "Turnaround / Speed"          },
  { v: "Megaphone",        l: "Campaign / Platform"         },
  { v: "Users",            l: "Audience / Campaigns"        },
  { v: "Star",             l: "Quality / Rating"            },
  { v: "Rocket",           l: "Launch / Scale"              },
  { v: "Zap",              l: "Performance / Speed"         },
  { v: "UtensilsCrossed",  l: "Restaurants & Food"          },
  { v: "Stethoscope",      l: "Healthcare & Clinics"        },
  { v: "GraduationCap",    l: "Education & Coaching"        },
  { v: "ShoppingCart",     l: "Retail & E-commerce"         },
  { v: "Building2",        l: "Property & Finance"          },
  { v: "Heart",            l: "Events & Hospitality"        },
  { v: "Package",          l: "Products & FMCG"             },
  { v: "Bot",              l: "SaaS & Tech"                 },
];

function IconEl({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const C = ICON_MAP[name] ?? Megaphone;
  return <C className={className} />;
}

/* ── Shared UI ──────────────────────────────────────────────── */
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
  const Icon = ICON_MAP[value] ?? Megaphone;
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

function ItemRow({ icon, iconColor, primary, secondary, onEdit, onDelete }: {
  icon?: string; iconColor?: string; primary: string; secondary?: string;
  onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-all">
      <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0 cursor-grab" />
      {icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor ?? "#1E4DA0"}18`, border: `1px solid ${iconColor ?? "#1E4DA0"}30` }}>
          <IconEl name={icon} className="w-3.5 h-3.5" />
        </div>
      )}
      {!icon && iconColor && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
          style={{ background: `${iconColor}25`, borderColor: `${iconColor}40` }}>
          <Megaphone className="w-3.5 h-3.5" style={{ color: iconColor }} />
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
type AdPlatformItem = { id: number; label: string; sub: string; color: string };

function CardModal({ item, titleField, descField, hasIcon = true, onClose, onSave }: {
  item: CardItem | null;
  titleField: "title" | "label";
  descField?: "desc" | "detail";
  hasIcon?: boolean;
  onClose: () => void;
  onSave: (item: CardItem) => void;
}) {
  const [form, setForm] = useState<CardItem>(
    item ?? { id: 0, icon: "Image", title: "", label: "", desc: "", detail: "" }
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

function AdPlatformModal({ item, onClose, onSave }: {
  item: AdPlatformItem | null;
  onClose: () => void;
  onSave: (item: AdPlatformItem) => void;
}) {
  const [form, setForm] = useState<AdPlatformItem>(
    item ?? { id: 0, label: "", sub: "", color: "#1E4DA0" }
  );
  const set = (k: keyof AdPlatformItem) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Ad Platform</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Platform Name" value={form.label} onChange={set("label")} hint="e.g. Meta Ads, TikTok Ads" />
          <Field label="Sub-label / Format" value={form.sub} onChange={set("sub")} hint="e.g. Facebook & Instagram, Short-form video" />
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Brand Colour</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.color} onChange={e => set("color")(e.target.value)}
                className="w-12 h-10 rounded-lg border border-border cursor-pointer bg-background p-0.5" />
              <input value={form.color} onChange={e => set("color")(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono outline-none focus:border-primary/50 transition-all"
                placeholder="#1877f2" />
              <div className="w-10 h-10 rounded-xl border border-border shrink-0" style={{ background: form.color }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Accent colour used for the platform card on the live page</p>
          </div>
          {/* Live preview */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center"
            style={{ background: `${form.color}10`, borderColor: `${form.color}30` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${form.color}20`, border: `1px solid ${form.color}40` }}>
              <Megaphone className="w-4 h-4" style={{ color: form.color }} />
            </div>
            <p className="text-xs font-bold text-foreground">{form.label || "Platform Name"}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{form.sub || "Format sub-label"}</p>
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

function ProcessStepModal({ item, onClose, onSave }: {
  item: { id: number; step: string; icon: string; title: string; detail: string } | null;
  onClose: () => void;
  onSave: (item: { id: number; step: string; icon: string; title: string; detail: string }) => void;
}) {
  const [form, setForm] = useState(item ?? { id: 0, step: "01", icon: "Target", title: "", detail: "" });
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
            <div className="col-span-2"><Field label="Step Title" value={form.title} onChange={set("title")} /></div>
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

/* ════════════════════════════════════════════════════════════
   SEED DATA
═════════════════════════════════════════════════════════════ */

const INIT_HERO = {
  badge: "Ad Creatives",
  headline: "Ads that stop the scroll and convert the click",
  subheadline: "OneSoft produces high-conversion ad creatives — static, video, and motion — for Meta, TikTok, Google, YouTube, and LinkedIn. Built to perform, not just look good.",
  ctaPrimary: "Get a Creative Brief",
  ctaSecondary: "Book a Free Strategy Call",
  trustItems: [
    { id: 1, icon: "TrendingUp", label: "2× avg. CTR improvement"  },
    { id: 2, icon: "Clock",      label: "48hr turnaround"          },
    { id: 3, icon: "Users",      label: "400+ campaigns produced"  },
    { id: 4, icon: "Eye",        label: "6 platforms covered"      },
  ],
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Most ad budgets are wasted on weak creatives",
  subheading: "Targeting and budget matter — but the creative is what determines whether someone stops, clicks, and buys. It's the most underfunded part of most ad strategies.",
  cards: [
    { id: 1, icon: "XCircle",     title: "Ad spend wasted on creatives that don't convert",    desc: "You can have the best targeting in the world — but if the creative doesn't stop the scroll in under two seconds, the money is gone. Most ads fail before they're ever seen." },
    { id: 2, icon: "AlertCircle", title: "Generic visuals that look like every other ad",       desc: "Stock photos, templated designs, and recycled formats have trained audiences to tune out. Your creative needs to feel fresh, native, and worth a second look every single time." },
    { id: 3, icon: "XCircle",     title: "No system for testing what actually works",           desc: "Without variants and A/B testing built into your creative workflow, you're guessing. Every campaign runs on hope instead of data — and performance never improves." },
    { id: 4, icon: "AlertCircle", title: "Creative output can't keep up with campaign demand",  desc: "Running ads across Meta, Google, TikTok, and YouTube means you need dozens of formats, sizes, and variants. Most in-house teams can't produce at that volume or quality." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "Creative that's built to perform — not just impress",
  subheading: "Every format, every platform, every funnel stage — we produce the volume and variety your campaigns actually need to scale.",
  cards: [
    { id: 1, icon: "Image",             title: "Static Ad Design",             desc: "High-conversion static creatives for Meta, Google Display, and LinkedIn — every size and placement." },
    { id: 2, icon: "Video",             title: "Video Ad Production",          desc: "Scroll-stopping video ads for Instagram, TikTok, YouTube, and Meta — scripted, shot, and edited." },
    { id: 3, icon: "Play",              title: "Motion Graphics & Reels",      desc: "Animated ads and branded Reels that feel native to the platform and designed to perform." },
    { id: 4, icon: "MousePointerClick", title: "Conversion-First Copywriting", desc: "Headlines, hooks, and CTAs written specifically to drive clicks — not just impressions." },
    { id: 5, icon: "Layers",            title: "A/B Creative Variants",        desc: "Multiple variants of every creative so you can test, learn, and scale only what works." },
    { id: 6, icon: "Palette",           title: "Brand-Consistent Design",      desc: "Every creative aligns with your brand identity — colour, typography, tone — across every platform." },
    { id: 7, icon: "Monitor",           title: "Google & Display Banners",     desc: "Full suites of HTML5-ready and static banners in all standard IAB sizes for Google Display Network." },
    { id: 8, icon: "FileText",          title: "Ad Creative Strategy",         desc: "We analyse your audience, funnel stage, and offer to brief creatives that align with your campaign goals." },
  ],
};

const INIT_PLATFORMS = {
  heading: "Platforms we produce for",
  subheading: "Native creative knowledge for every major ad platform — right dimensions, right specs, right feel.",
  items: [
    { id: 1, label: "Meta Ads",     sub: "Facebook & Instagram",    color: "#1877f2" },
    { id: 2, label: "TikTok Ads",   sub: "Short-form video",         color: "#010101" },
    { id: 3, label: "Google Ads",   sub: "Search & Display",         color: "#ea4335" },
    { id: 4, label: "YouTube Ads",  sub: "Pre-roll & bumper ads",    color: "#ff0000" },
    { id: 5, label: "LinkedIn Ads", sub: "B2B lead generation",      color: "#0077b5" },
    { id: 6, label: "Snapchat Ads", sub: "Story & Discover formats", color: "#fffc00" },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "Brief to live creative in 48 hours",
  subheading: "A fast, structured process that keeps campaigns moving — no endless revision loops, no missed deadlines.",
  steps: [
    { id: 1, step: "01", icon: "Target",    title: "Brief & Strategy",    detail: "We learn your offer, audience, funnel stage, and campaign objective. Every creative decision flows from this brief." },
    { id: 2, step: "02", icon: "PenTool",   title: "Concept & Copy",      detail: "We develop creative concepts and ad copy. You review and approve the direction before any design work begins." },
    { id: 3, step: "03", icon: "Brush",     title: "Design & Production", detail: "We produce all formats, sizes, and variants. Video, static, motion — delivered ready to upload directly to your ad account." },
    { id: 4, step: "04", icon: "BarChart3", title: "Test & Iterate",      detail: "We track creative performance, identify winners, and brief the next round of creatives based on real data." },
  ],
};

const INIT_STATS = [
  { id: 1, value: "2",   suffix: "×",          label: "Avg. CTR improvement"   },
  { id: 2, value: "400", suffix: "+",          label: "Campaigns produced"     },
  { id: 3, value: "6",   suffix: " platforms", label: "Covered natively"       },
  { id: 4, value: "48",  suffix: "hr",         label: "Avg. turnaround"        },
];

const INIT_INDUSTRIES = {
  heading: "We've created ads for every industry",
  subheading: "We understand what makes audiences in your sector stop, click, and convert.",
  items: [
    { id: 1, icon: "ShoppingCart",    label: "Retail & E-commerce"   },
    { id: 2, icon: "UtensilsCrossed", label: "Restaurants & Food"    },
    { id: 3, icon: "Stethoscope",     label: "Healthcare & Clinics"  },
    { id: 4, icon: "GraduationCap",   label: "Education & Coaching"  },
    { id: 5, icon: "Building2",       label: "Property & Finance"    },
    { id: 6, icon: "Heart",           label: "Events & Hospitality"  },
    { id: 7, icon: "Package",         label: "Products & FMCG"       },
    { id: 8, icon: "Bot",             label: "SaaS & Tech"           },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "Better creative. Better results.",
  items: [
    { id: 1, quote: "Our Meta Ads CTR doubled in the first month after switching to OneSoft creatives. The video ads they produce are genuinely better than anything an agency charged us 5× more for.",                           name: "Raza Khan",       role: "Head of Marketing",    company: "NovaBuild Properties"       },
    { id: 2, quote: "We went from spending £3,000 a month with nothing to show for it to a 4.2 ROAS within six weeks. The creative strategy they brought was the difference.",                                                   name: "Emma Clarke",     role: "E-commerce Director",  company: "Velvet & Co."               },
    { id: 3, quote: "They turned our product launch into a full creative campaign — static, video, stories, banners — everything matched perfectly and the results spoke for themselves.",                                        name: "Adnan Siddiqui",  role: "Founder",              company: "SnapPack Snack Foods"       },
  ],
};

const INIT_CTA = {
  badge: "Ready to create?",
  heading: "Stop wasting ad budget on creatives that no one remembers",
  subheading: "Send us your brief, your brand, and your budget — and we'll show you what performance-first creative looks like.",
  ctaPrimary: "Start My Creative Brief",
  email: "info@onesoft.org.uk",
};

/* ════════════════════════════════════════════════════════════
   TABS
═════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "hero",         label: "Hero"         },
  { id: "problem",      label: "Problem"      },
  { id: "solution",     label: "Solution"     },
  { id: "platforms",    label: "Platforms"    },
  { id: "process",      label: "Process"      },
  { id: "stats",        label: "Stats"        },
  { id: "industries",   label: "Industries"   },
  { id: "testimonials", label: "Testimonials" },
  { id: "cta",          label: "CTA"          },
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
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} hint="Pill label above the H1" />
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
            const entry = { id: item.id, icon: item.icon, label: item.label! };
            const idx = d.trustItems.findIndex(i => i.id === item.id);
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
          })} />
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
          <SectionHeader>Service Cards ({data.cards.length})</SectionHeader>
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
      {deleting && (
        <DeleteConfirm label={deleting.title}
          onConfirm={() => { setData(d => ({ ...d, cards: d.cards.filter(i => i.id !== deleting.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function PlatformsTab() {
  const [data, setData] = useState(INIT_PLATFORMS);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<AdPlatformItem | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<AdPlatformItem | null>(null);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <SectionHeader>Section Headers</SectionHeader>
        <Field label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} />
        <Field label="Section Subheading" value={data.subheading} onChange={v => setData(d => ({ ...d, subheading: v }))} multiline />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader>Ad Platform Cards ({data.items.length})</SectionHeader>
          <Btn size="sm" onClick={() => setEditing(null)}><Plus className="w-3.5 h-3.5" /> Add</Btn>
        </div>
        {/* Live grid preview */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
          {data.items.map(p => (
            <div key={p.id} className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center"
              style={{ background: `${p.color}10`, borderColor: `${p.color}30` }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${p.color}20`, border: `1px solid ${p.color}40` }}>
                <Megaphone className="w-3.5 h-3.5" style={{ color: p.color }} />
              </div>
              <p className="text-[10px] font-bold text-foreground leading-tight">{p.label}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{p.sub}</p>
            </div>
          ))}
        </div>
        {/* Editable list */}
        <div className="space-y-2">
          {data.items.map(p => (
            <ItemRow key={p.id} iconColor={p.color} primary={p.label} secondary={p.sub}
              onEdit={() => setEditing(p)} onDelete={() => setDeleting(p)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <AdPlatformModal item={editing}
          onClose={() => setEditing(undefined)}
          onSave={item => setData(d => {
            const idx = d.items.findIndex(i => i.id === item.id);
            if (idx >= 0) { const n = [...d.items]; n[idx] = item; return { ...d, items: n }; }
            return { ...d, items: [...d.items, item] };
          })}
        />
      )}
      {deleting && (
        <DeleteConfirm label={deleting.label}
          onConfirm={() => { setData(d => ({ ...d, items: d.items.filter(i => i.id !== deleting!.id) })); setDeleting(null); }}
          onClose={() => setDeleting(null)} />
      )}
    </div>
  );
}

function ProcessTab() {
  const [data, setData] = useState(INIT_PROCESS);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<typeof INIT_PROCESS["steps"][0] | null | undefined>(undefined);
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
          })} />
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
                <Field label="Suffix (e.g. +, %, ×, hr)" value={s.suffix} onChange={v => update(s.id, "suffix", v)} />
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
          })} />
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
            <ItemRow key={t.id} primary={`"${t.quote.slice(0, 65)}…"`} secondary={`${t.name} · ${t.role}, ${t.company}`}
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
          })} />
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
  platforms:    PlatformsTab,
  process:      ProcessTab,
  stats:        StatsTab,
  industries:   IndustriesTab,
  testimonials: TestimonialsTab,
  cta:          CTATab,
};

export default function AdCreativesCMSPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <Layout>
      <div className="px-6 pt-6 pb-2">
        <Breadcrumb items={[
          { label: "Products & Services", href: "/services" },
          { label: "Ad Creatives Page" },
        ]} />
        <PageHeader
          title="Ad Creatives Page Editor"
          subtitle="Edit every section of the /ad-creatives landing page"
          action={
            <a href="https://onesoft.org.uk/ad-creatives" target="_blank" rel="noopener noreferrer">
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
