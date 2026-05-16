import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Edit2, ExternalLink, Save, X, Eye } from "lucide-react";

const PAGES = [
  {
    id: 1, title: "Home", slug: "/", type: "core", status: "live", lastUpdated: "12 May 2025",
    desc: "Main landing page with hero, products showcase, services, testimonials, and CTA.",
  },
  {
    id: 2, title: "About (Why OneSoft)", slug: "/about", type: "core", status: "live", lastUpdated: "5 May 2025",
    desc: "Company overview, mission, values, and differentiators.",
  },
  {
    id: 3, title: "OneSites", slug: "/onethemes", type: "core", status: "live", lastUpdated: "2 May 2025",
    desc: "Custom website building service landing page.",
  },
  {
    id: 4, title: "Contact", slug: "/contact", type: "core", status: "live", lastUpdated: "28 Apr 2025",
    desc: "Contact form, office locations, channels, and FAQ.",
  },
  {
    id: 5, title: "Privacy Policy", slug: "/privacy-policy", type: "legal", status: "live", lastUpdated: "1 Apr 2025",
    desc: "Full GDPR-compliant privacy policy.",
  },
  {
    id: 6, title: "Terms of Service", slug: "/terms-of-service", type: "legal", status: "live", lastUpdated: "1 Apr 2025",
    desc: "Platform terms of service.",
  },
  {
    id: 7, title: "SLA Agreement", slug: "/sla", type: "legal", status: "live", lastUpdated: "1 Apr 2025",
    desc: "Service level agreement for hosted product clients.",
  },
  {
    id: 8, title: "Cookie Policy", slug: "/cookie-policy", type: "legal", status: "live", lastUpdated: "1 Apr 2025",
    desc: "Cookie usage and consent policy.",
  },
  {
    id: 9, title: "404 / Not Found", slug: "/404", type: "system", status: "live", lastUpdated: "15 Mar 2025",
    desc: "Not found fallback page.",
  },
];

function EditModal({ page, onClose }: { page: typeof PAGES[0]; onClose: () => void }) {
  const sampleContent = `## ${page.title}\n\nThis is the content area for the ${page.title} page.\n\nEdit the text, sections, and metadata for this page using the fields below. For layout changes, a developer deployment is required.`;
  const [content, setContent] = useState(sampleContent);
  const [title, setTitle] = useState(page.title);
  const [meta, setMeta] = useState(`${page.title} — OneSoft`);
  const [desc, setDesc] = useState(page.desc);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold">Edit Page — {page.title}</h2>
            <code className="text-xs text-primary">{page.slug}</code>
          </div>
          <div className="flex items-center gap-2">
            <a href={`https://onesoft.org.uk${page.slug}`} target="_blank" rel="noopener noreferrer">
              <Btn variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /> Preview</Btn>
            </a>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">SEO Title</label>
              <input value={meta} onChange={e => setMeta(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Meta Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            <p className="text-[11px] text-muted-foreground mt-1">{desc.length}/160 chars</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Content (Markdown)</label>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="px-3 py-2 bg-muted/40 border-b border-border flex gap-2">
                {["B", "I", "H2", "—", "Link", "List"].map(b => (
                  <button key={b} className="text-xs px-2 py-0.5 rounded bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
                    {b}
                  </button>
                ))}
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={12}
                className="w-full p-3 text-sm bg-background outline-none resize-none font-mono" />
            </div>
          </div>
          {page.type === "legal" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2.5">
              <p className="text-xs font-semibold text-yellow-800">Legal page — review by compliance required before publishing changes.</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30 shrink-0">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}

export default function PagesPage() {
  const [editing, setEditing] = useState<typeof PAGES[0] | null>(null);
  const types = ["all", "core", "legal", "system"];
  const [activeType, setActiveType] = useState("all");
  const filtered = PAGES.filter(p => activeType === "all" || p.type === activeType);

  return (
    <Layout>
      {editing && <EditModal page={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Pages" }]} />
        <PageHeader title="Pages" description="Manage static and legal page content." />
        <div className="flex gap-1.5 mb-5">
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${activeType === t ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map(p => (
            <div key={p.id} className="bg-card rounded-xl border border-border px-5 py-4 flex items-center gap-4 hover:border-primary/30 transition-all group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-0.5">
                  <p className="text-sm font-bold text-foreground">{p.title}</p>
                  <Badge color={p.type === "legal" ? "yellow" : p.type === "system" ? "default" : "blue"}>{p.type}</Badge>
                  <Badge color="green">{p.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
                <code className="text-[11px] text-primary mt-1 block">{p.slug}</code>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-muted-foreground">{p.lastUpdated}</p>
                <div className="flex gap-1 mt-1.5 justify-end">
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(p)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                  <a href={`https://onesoft.org.uk${p.slug}`} target="_blank" rel="noopener noreferrer">
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
