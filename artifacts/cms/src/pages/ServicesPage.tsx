import { useState } from "react";
import { Link } from "wouter";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Edit2, ExternalLink, Save, X, ChevronDown, LayoutDashboard } from "lucide-react";

const PAGE_EDITORS: Record<string, string> = {
  "/web-development":  "/web-development",
  "/custom-software":  "/custom-software",
  "/ai-automation":    "/ai-automation-svc",
};

const services = [
  {
    id: 1, name: "Web Development", slug: "/web-development", icon: "💻",
    status: "active", lastUpdated: "2 May 2025",
    tagline: "Modern, fast, conversion-ready websites for businesses that need results.",
    features: ["Custom Vite + React builds", "Mobile-first design", "CMS integration", "Performance optimisation"],
  },
  {
    id: 2, name: "Custom Software Development", slug: "/custom-software", icon: "🛠",
    status: "active", lastUpdated: "28 Apr 2025",
    tagline: "Purpose-built software that fits your exact process — not the other way around.",
    features: ["Requirement scoping", "Full-stack development", "System integrations", "Ongoing support"],
  },
  {
    id: 3, name: "AI & Automation", slug: "/ai-automation", icon: "🤖",
    status: "active", lastUpdated: "25 Apr 2025",
    tagline: "Automate the work that slows your team down. Intelligently.",
    features: ["Process automation", "Document AI", "LLM integrations", "Workflow orchestration"],
  },
  {
    id: 4, name: "Social Media Marketing", slug: "/social-media", icon: "📲",
    status: "active", lastUpdated: "20 Apr 2025",
    tagline: "Content strategy, community management, and paid social that drives real results.",
    features: ["Content strategy", "Post production", "Community management", "Performance reporting"],
  },
  {
    id: 5, name: "Ad Creatives", slug: "/ad-creatives", icon: "🎨",
    status: "active", lastUpdated: "15 Apr 2025",
    tagline: "Scroll-stopping creative for Meta, Google, TikTok, and beyond.",
    features: ["Static graphics", "Motion design", "Video ads", "A/B test variants"],
  },
  {
    id: 6, name: "SEO Optimisation", slug: "/seo", icon: "📈",
    status: "active", lastUpdated: "10 Apr 2025",
    tagline: "Get found by the people who are actively searching for what you offer.",
    features: ["Technical audits", "Content strategy", "Link building", "Local SEO"],
  },
];

function EditModal({ svc, onClose }: { svc: typeof services[0]; onClose: () => void }) {
  const [form, setForm] = useState({ ...svc });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Edit Service — {svc.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Service Name</label>
            <input value={form.name} onChange={set("name")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tagline</label>
            <input value={form.tagline} onChange={set("tagline")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Slug</label>
              <input value={form.slug} onChange={set("slug")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <div className="relative">
                <select value={form.status} onChange={set("status")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Key Features (one per line)</label>
            <textarea value={form.features.join("\n")} onChange={e => setForm(f => ({ ...f, features: e.target.value.split("\n") }))} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all resize-none" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border bg-muted/30">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [editing, setEditing] = useState<typeof services[0] | null>(null);
  return (
    <Layout>
      {editing && <EditModal svc={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Services" }]} />
        <PageHeader title="Services" description="All six OneSoft service pages." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-card rounded-xl border border-border p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{s.name}</p>
                    <code className="text-[11px] text-primary">{s.slug}</code>
                  </div>
                </div>
                <Badge color="green">{s.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.features.map(f => (
                  <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{f}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-[11px] text-muted-foreground">Updated {s.lastUpdated}</span>
                <div className="flex gap-1">
                  {PAGE_EDITORS[s.slug] && (
                    <Link href={PAGE_EDITORS[s.slug]}>
                      <Btn variant="ghost" size="sm">
                        <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[11px] text-primary font-semibold ml-1">Full Editor</span>
                      </Btn>
                    </Link>
                  )}
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(s)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                  <a href={`https://onesoft.org.uk${s.slug}`} target="_blank" rel="noopener noreferrer">
                    <Btn variant="ghost" size="sm"><ExternalLink className="w-3.5 h-3.5" /></Btn>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
