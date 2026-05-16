import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import {
  Save, X, Plus, Edit2, Trash2, GripVertical, ChevronDown,
  ExternalLink, AlertCircle, CheckCircle2, Megaphone, Zap,
  Clock, Star, MessageSquare, Rocket, Users, TrendingUp,
  XCircle, BarChart3, Search, Lock, Heart, Eye,
  Camera, Video, PenTool, Calendar, Globe, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  ShoppingCart, Bot, Repeat2, Target, ThumbsUp,
} from "lucide-react";

/* ── Icon map ───────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertCircle, CheckCircle2, Megaphone, Zap, Clock, Star,
  MessageSquare, Rocket, Users, TrendingUp, BarChart3, Search, Lock,
  Heart, Eye, Camera, Video, PenTool, Calendar, Globe, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed, ShoppingCart,
  Bot, Repeat2, Target, ThumbsUp,
};

const ICON_OPTIONS = [
  { v: "XCircle",         l: "Error / Problem"            },
  { v: "AlertCircle",     l: "Warning / Alert"            },
  { v: "CheckCircle2",    l: "Check / Success"            },
  { v: "Megaphone",       l: "Social / Campaign"          },
  { v: "PenTool",         l: "Content Strategy / Design"  },
  { v: "Camera",          l: "Photography / Visuals"      },
  { v: "Video",           l: "Video / Reels"              },
  { v: "Calendar",        l: "Scheduling"                 },
  { v: "MessageSquare",   l: "Community / Chat"           },
  { v: "Target",          l: "Paid Ads / Targeting"       },
  { v: "BarChart3",       l: "Analytics / Reports"        },
  { v: "Repeat2",         l: "Hashtag / SEO Research"     },
  { v: "Search",          l: "Audit / Research"           },
  { v: "TrendingUp",      l: "Growth / Results"           },
  { v: "Eye",             l: "Reach / Impressions"        },
  { v: "ThumbsUp",        l: "Engagement / Likes"         },
  { v: "Globe",           l: "Platforms / Reach"          },
  { v: "Clock",           l: "Turnaround / Consistency"   },
  { v: "Lock",            l: "Privacy / Trust"            },
  { v: "Users",           l: "Team / Community"           },
  { v: "Star",            l: "Quality / Rating"           },
  { v: "Rocket",          l: "Launch / Growth"            },
  { v: "Zap",             l: "Speed / Performance"        },
  { v: "UtensilsCrossed", l: "Restaurants & Cafes"        },
  { v: "Stethoscope",     l: "Clinics & Wellness"         },
  { v: "GraduationCap",   l: "Education & Coaching"       },
  { v: "ShoppingCart",    l: "Retail & E-commerce"        },
  { v: "Building2",       l: "Corporates & B2B"           },
  { v: "Heart",           l: "Events & Hospitality"       },
  { v: "Package",         l: "Products & Brands"          },
  { v: "Bot",             l: "SaaS & Tech"                },
];

function IconEl({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const C = ICON_MAP[name] ?? Megaphone;
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
          <IconEl name={icon} className="w-3.5 h-3.5" style={{ color: iconColor ?? "#1E4DA0" }} />
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
type PlatformItem = { id: number; label: string; color: string; desc: string };

function CardModal({ item, titleField, descField, hasIcon = true, onClose, onSave }: {
  item: CardItem | null;
  titleField: "title" | "label";
  descField?: "desc" | "detail";
  hasIcon?: boolean;
  onClose: () => void;
  onSave: (item: CardItem) => void;
}) {
  const [form, setForm] = useState<CardItem>(
    item ?? { id: 0, icon: "Megaphone", title: "", label: "", desc: "", detail: "" }
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

function PlatformModal({ item, onClose, onSave }: {
  item: PlatformItem | null;
  onClose: () => void;
  onSave: (item: PlatformItem) => void;
}) {
  const [form, setForm] = useState<PlatformItem>(
    item ?? { id: 0, label: "", color: "#1E4DA0", desc: "" }
  );
  const set = (k: keyof PlatformItem) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{item?.id ? "Edit" : "Add"} Platform</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Platform Name" value={form.label} onChange={set("label")} hint="e.g. Instagram, TikTok, LinkedIn" />
          <Field label="Description" value={form.desc} onChange={set("desc")} multiline hint="Short description of what you do on this platform" />
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Brand Colour</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.color} onChange={e => set("color")(e.target.value)}
                className="w-12 h-10 rounded-lg border border-border cursor-pointer bg-background p-0.5" />
              <input value={form.color} onChange={e => set("color")(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono outline-none focus:border-primary/50 transition-all"
                placeholder="#e1306c" />
              <div className="w-10 h-10 rounded-xl border border-border shrink-0"
                style={{ background: form.color }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Used for the platform card accent colour on the live page</p>
          </div>
          {/* Live preview */}
          <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border"
            style={{ background: `${form.color}10`, borderColor: `${form.color}30` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `${form.color}20`, border: `1px solid ${form.color}40` }}>
              <Megaphone className="w-4 h-4" style={{ color: form.color }} />
            </div>
            <p className="text-xs font-bold text-foreground">{form.label || "Platform Name"}</p>
            <p className="text-[10px] text-muted-foreground text-center leading-tight">{form.desc || "Platform description"}</p>
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
  const [form, setForm] = useState(item ?? { id: 0, step: "01", icon: "Search", title: "", detail: "" });
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
  badge: "Social Media Marketing",
  headline: "Turn your social media into a lead generation machine",
  subheadline: "OneSoft manages your Instagram, TikTok, LinkedIn, and more — with strategy, content, and community management that actually drives enquiries and sales.",
  ctaPrimary: "Grow My Social Media",
  ctaSecondary: "Book a Free Strategy Call",
  trustItems: [
    { id: 1, icon: "TrendingUp", label: "3× avg. engagement increase" },
    { id: 2, icon: "Eye",        label: "200+ brands managed"         },
    { id: 3, icon: "Globe",      label: "6 platforms covered"         },
    { id: 4, icon: "ThumbsUp",   label: "90% client retention"        },
  ],
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Social media without a strategy is just noise",
  subheading: "Most businesses are present on social media. Very few are actually using it to grow. The difference is strategy, consistency, and quality.",
  cards: [
    { id: 1, icon: "XCircle",     title: "Posting consistently but seeing zero growth",    desc: "Random posts without a strategy are noise. Without a content calendar tied to your audience's behaviour and platform algorithms, you're invisible to the people who matter." },
    { id: 2, icon: "AlertCircle", title: "Content that looks unprofessional",               desc: "Blurry graphics, inconsistent fonts, and low-effort captions signal to potential customers that your business doesn't take itself seriously — before they ever visit your website." },
    { id: 3, icon: "XCircle",     title: "Followers that never become customers",           desc: "Vanity metrics — likes, followers — don't pay bills. Without a proper funnel from awareness to enquiry, social media is just entertainment with no return on investment." },
    { id: 4, icon: "AlertCircle", title: "No time to manage it properly",                   desc: "Running a business and running a content operation at the same time is unsustainable. Most business owners either burn out or go quiet — both damage your brand." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "Full-service social media management — done for you",
  subheading: "Strategy, content, design, scheduling, community management, and reporting. Everything handled — nothing left to chance.",
  cards: [
    { id: 1, icon: "PenTool",      title: "Content Strategy",          desc: "A monthly content plan aligned to your goals, audience, and platform — every post has a purpose." },
    { id: 2, icon: "Camera",       title: "Graphic & Visual Design",   desc: "On-brand static posts, carousels, story templates, and cover art designed to stop the scroll." },
    { id: 3, icon: "Video",        title: "Video & Reels Production",  desc: "Short-form video content for Instagram Reels, TikTok, and YouTube Shorts — scripted, edited, captioned." },
    { id: 4, icon: "Calendar",     title: "Content Scheduling",        desc: "Posts go out at peak engagement times across all your platforms — no manual effort from you." },
    { id: 5, icon: "MessageSquare",title: "Community Management",      desc: "We respond to comments, DMs, and mentions in your brand voice — keeping your audience engaged." },
    { id: 6, icon: "Target",       title: "Paid Social Campaigns",     desc: "Meta Ads, TikTok Ads, and LinkedIn Ads — targeted campaigns built to drive leads, not just clicks." },
    { id: 7, icon: "BarChart3",    title: "Monthly Analytics Report",  desc: "Clear monthly reporting on reach, engagement, follower growth, and link clicks — no vanity metrics." },
    { id: 8, icon: "Repeat2",      title: "Hashtag & SEO Research",    desc: "Platform-specific keyword and hashtag research to maximise discoverability on every channel." },
  ],
};

const INIT_PLATFORMS = {
  heading: "Platforms we manage",
  subheading: "Native expertise on every major platform — we know what works where.",
  items: [
    { id: 1, label: "Instagram",   color: "#e1306c", desc: "Feed posts, Reels, Stories & DM campaigns" },
    { id: 2, label: "Facebook",    color: "#1877f2", desc: "Page management, groups & paid reach"       },
    { id: 3, label: "TikTok",      color: "#010101", desc: "Short-form video & trending audio content"  },
    { id: 4, label: "LinkedIn",    color: "#0077b5", desc: "B2B thought leadership & lead generation"   },
    { id: 5, label: "X (Twitter)", color: "#000000", desc: "Real-time engagement & brand voice"         },
    { id: 6, label: "YouTube",     color: "#ff0000", desc: "Shorts, long-form video & channel growth"   },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "From zero presence to consistent growth",
  subheading: "A clear onboarding process that gets you live, on-brand, and growing — in your first month.",
  steps: [
    { id: 1, step: "01", icon: "Search",    title: "Audit & Strategy",    detail: "We analyse your current presence, competitors, and audience. Then build a 90-day strategy with clear growth targets." },
    { id: 2, step: "02", icon: "PenTool",   title: "Brand Toolkit",       detail: "We establish your visual identity for social — templates, colour palette, tone of voice, and content pillars." },
    { id: 3, step: "03", icon: "Calendar",  title: "Create & Schedule",   detail: "Monthly content production and scheduling. You review and approve before anything goes live." },
    { id: 4, step: "04", icon: "BarChart3", title: "Analyse & Optimise",  detail: "Monthly performance review. We double down on what works and refine what doesn't — continuously improving results." },
  ],
};

const INIT_STATS = [
  { id: 1, value: "3",   suffix: "×",         label: "Avg. engagement increase" },
  { id: 2, value: "200", suffix: "+",         label: "Brands managed"           },
  { id: 3, value: "6",   suffix: " platforms",label: "We cover"                 },
  { id: 4, value: "90",  suffix: "%",         label: "Client retention rate"    },
];

const INIT_INDUSTRIES = {
  heading: "We've grown brands across every sector",
  subheading: "We understand what audiences in your industry respond to — and what they ignore.",
  items: [
    { id: 1, icon: "UtensilsCrossed", label: "Restaurants & Cafes"   },
    { id: 2, icon: "Stethoscope",     label: "Clinics & Wellness"    },
    { id: 3, icon: "GraduationCap",   label: "Education & Coaching"  },
    { id: 4, icon: "ShoppingCart",    label: "Retail & E-commerce"   },
    { id: 5, icon: "Building2",       label: "Corporates & B2B"      },
    { id: 6, icon: "Heart",           label: "Events & Hospitality"  },
    { id: 7, icon: "Package",         label: "Products & Brands"     },
    { id: 8, icon: "Bot",             label: "SaaS & Tech"           },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "Real growth. Real enquiries.",
  items: [
    { id: 1, quote: "In three months our Instagram went from 800 followers to 6,200. More importantly, we're getting 15–20 genuine enquiries a week directly from social.",                          name: "Aisha Noor",    role: "Owner",            company: "Bloom Bridal Studio, Manchester"  },
    { id: 2, quote: "We handed over our LinkedIn completely. They now post three times a week, our connection requests are up 400%, and we've closed two B2B deals through it.",                   name: "Daniel Mbeki",  role: "Managing Director",company: "Apex Consulting Group"            },
    { id: 3, quote: "The Reels they produce for our restaurant are genuinely cinematic. We've had people come in specifically because they saw us on TikTok.",                                      name: "Layla Hassan",  role: "Co-Founder",       company: "The Olive Table, Birmingham"      },
  ],
};

const INIT_CTA = {
  badge: "Ready to grow?",
  heading: "Let's build a social presence your competitors will envy",
  subheading: "Free strategy call. We'll audit your current presence and show you exactly where the growth opportunities are — no obligation.",
  ctaPrimary: "Book My Free Strategy Call",
  email: "info@onesoft.org.uk",
};

/* ════════════════════════════════════════════════════════════
   TABS
═════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "hero",         label: "Hero"          },
  { id: "problem",      label: "Problem"       },
  { id: "solution",     label: "Solution"      },
  { id: "platforms",    label: "Platforms"     },
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
        <Field label="Badge Text" value={data.badge} onChange={set("badge")} hint="Pill shown above the H1" />
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
  const [editing, setEditing] = useState<PlatformItem | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<PlatformItem | null>(null);
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
          <SectionHeader>Platform Cards ({data.items.length})</SectionHeader>
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
            </div>
          ))}
        </div>
        {/* List view for edit/delete */}
        <div className="space-y-2">
          {data.items.map(p => (
            <ItemRow key={p.id} iconColor={p.color} primary={p.label} secondary={p.desc}
              onEdit={() => setEditing(p)} onDelete={() => setDeleting(p)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />

      {editing !== undefined && (
        <PlatformModal item={editing}
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
                <Field label="Suffix (e.g. +, %, ×)" value={s.suffix} onChange={v => update(s.id, "suffix", v)} />
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

export default function SocialMediaCMSPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <Layout>
      <div className="px-6 pt-6 pb-2">
        <Breadcrumb items={[
          { label: "Products & Services", href: "/services" },
          { label: "Social Media Page" },
        ]} />
        <PageHeader
          title="Social Media Page Editor"
          subtitle="Edit every section of the /social-media landing page"
          action={
            <a href="https://onesoft.org.uk/social-media" target="_blank" rel="noopener noreferrer">
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
