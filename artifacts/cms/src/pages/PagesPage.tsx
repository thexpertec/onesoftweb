import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Edit2, ExternalLink, Save, X, Eye, Plus, Trash2 } from "lucide-react";

const PAGES = [
  {
    id: 1, title: "Home", slug: "/", type: "core", status: "live", lastUpdated: "12 May 2025",
    desc: "Main landing page — hero, products, services, testimonials, stats, FAQs, and CTA.",
  },
  {
    id: 2, title: "About (Why OneSoft)", slug: "/about", type: "core", status: "live", lastUpdated: "5 May 2025",
    desc: "Company overview, mission, values, timeline milestones, and team link.",
  },
  {
    id: 3, title: "OneSites — Custom Websites", slug: "/onethemes", type: "core", status: "live", lastUpdated: "2 May 2025",
    desc: "OneSites product page — website builder conversation mockup, templates, features, and pricing overview.",
  },
  {
    id: 4, title: "Contact", slug: "/contact", type: "core", status: "live", lastUpdated: "28 Apr 2025",
    desc: "Contact form, 3 global office locations, communication channels, and quick FAQ.",
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

const ABOUT_MILESTONES_INITIAL = [
  { id: 1, year: "2017", text: "OneSoft founded in Hull, UK, with a single focus: ERP software for businesses that were being let down by generic off-the-shelf tools." },
  { id: 2, year: "2019", text: "Launched our first dedicated School ERP, deployed to 12 schools in the first year. The feedback shaped every product that followed." },
  { id: 3, year: "2021", text: "Expanded into the UAE market and opened our Gulf office in Dubai, serving hospitality and distribution clients across the region." },
  { id: 4, year: "2022", text: "Pakistan operations launched from Islamabad — bringing dedicated development and support capacity to our growing international client base." },
  { id: 5, year: "2024", text: "OneSites launched as a standalone brand within OneSoft, delivering custom websites alongside our ERP suite for end-to-end digital transformation." },
  { id: 6, year: "2025", text: "500+ active clients across three countries, 40+ team members, and seven specialised ERP verticals — with more on the roadmap." },
];

const ONESITES_FEATURES_INITIAL = [
  { id: 1, label: "Conversation-style discovery process" },
  { id: 2, label: "Full custom design — no templates" },
  { id: 3, label: "Mobile-first responsive build" },
  { id: 4, label: "SEO-optimised from day one" },
  { id: 5, label: "Integrated with ERP systems" },
  { id: 6, label: "CMS / content editing included" },
];

type PageEntry = typeof PAGES[0];

function AboutModal({ onClose }: { onClose: () => void }) {
  const [milestones, setMilestones] = useState(ABOUT_MILESTONES_INITIAL);
  const [activeTab, setActiveTab] = useState<"content" | "milestones" | "seo">("content");
  const [hero, setHero] = useState({ headline: "Built to solve real problems.", subheadline: "OneSoft is a global software company delivering enterprise-grade ERP systems and custom websites." });

  const updateMilestone = (id: number, field: "year" | "text", val: string) =>
    setMilestones(ms => ms.map(m => m.id === id ? { ...m, [field]: val } : m));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold">Edit Page — About (Why OneSoft)</h2>
            <code className="text-xs text-primary">/about</code>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://onesoft.org.uk/about" target="_blank" rel="noopener noreferrer">
              <Btn variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /> Preview</Btn>
            </a>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-border shrink-0">
          {(["content", "milestones", "seo"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t === "milestones" ? "Company Timeline" : t === "seo" ? "SEO" : "Hero Content"}
            </button>
          ))}
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Hero Headline</label>
                <input value={hero.headline} onChange={e => setHero(h => ({ ...h, headline: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Hero Subheadline</label>
                <textarea value={hero.subheadline} onChange={e => setHero(h => ({ ...h, subheadline: e.target.value }))} rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="bg-muted/40 rounded-xl p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">About Page Sections</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {["Hero + CTA", "4 key stats (ERP deployments, countries, clients, team)", "Company values (6 cards)", "Company timeline — edit in Milestones tab", "Team preview grid", "Final CTA strip"].map(s => (
                    <li key={s} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-4">These milestones appear as a vertical timeline on the About page. Edit the year and description for each entry, or add/remove milestones.</p>
              {milestones.map((m, i) => (
                <div key={m.id} className="flex gap-3 group">
                  <div className="flex flex-col items-center gap-1 pt-2.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary border-2 border-primary/30" />
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-border" style={{ minHeight: "48px" }} />}
                  </div>
                  <div className="flex-1 flex gap-2 pb-3">
                    <input value={m.year} onChange={e => updateMilestone(m.id, "year", e.target.value)}
                      className="w-16 px-2 py-1.5 rounded-lg border border-border bg-background text-sm font-bold text-primary outline-none focus:border-primary/50 shrink-0 text-center" />
                    <textarea value={m.text} onChange={e => updateMilestone(m.id, "text", e.target.value)} rows={2}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
                    <button onClick={() => setMilestones(ms => ms.filter(x => x.id !== m.id))}
                      className="self-start mt-1 p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setMilestones(ms => [...ms, { id: Date.now(), year: String(new Date().getFullYear()), text: "" }])}
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 font-semibold px-3 py-2 rounded-lg hover:bg-primary/5 transition-all ml-5">
                <Plus className="w-3.5 h-3.5" /> Add milestone
              </button>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Meta Title</label>
                <input defaultValue="About OneSoft — Why We Build What We Build"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Meta Description</label>
                <textarea defaultValue="OneSoft is a global ERP and software company headquartered in Hull, UK with offices in Dubai and Islamabad. We build industry-specific software that actually works." rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
              </div>
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

function OnesitesModal({ onClose }: { onClose: () => void }) {
  const [features, setFeatures] = useState(ONESITES_FEATURES_INITIAL);
  const [hero, setHero] = useState({ headline: "Your business deserves a website that works as hard as you do.", sub: "OneSites builds conversion-optimised, custom-designed websites for businesses across the UK, UAE, and beyond." });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold">Edit Page — OneSites</h2>
            <code className="text-xs text-primary">/onethemes</code>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://onesoft.org.uk/onethemes" target="_blank" rel="noopener noreferrer">
              <Btn variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /> Preview</Btn>
            </a>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
        </div>
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Page overview */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary mb-1">OneSites Product Page</p>
            <p className="text-xs text-muted-foreground">This is the main landing page for the OneSites custom website product. It includes a conversation mockup, feature list, before/after templates, testimonials, and a CTA form.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Hero Headline</label>
            <textarea value={hero.headline} onChange={e => setHero(h => ({ ...h, headline: e.target.value }))} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Subheadline</label>
            <textarea value={hero.sub} onChange={e => setHero(h => ({ ...h, sub: e.target.value }))} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">Key Features Listed on Page</label>
            <div className="space-y-2">
              {features.map(f => (
                <div key={f.id} className="flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <input value={f.label} onChange={e => setFeatures(fs => fs.map(x => x.id === f.id ? { ...x, label: e.target.value } : x))}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
                  <button onClick={() => setFeatures(fs => fs.filter(x => x.id !== f.id))}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={() => setFeatures(fs => [...fs, { id: Date.now(), label: "" }])}
                className="flex items-center gap-2 text-xs text-primary font-semibold hover:text-primary/80 px-2 py-1 rounded-lg hover:bg-primary/5 transition-all mt-1">
                <Plus className="w-3.5 h-3.5" /> Add feature
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30 shrink-0">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}

function GenericEditModal({ page, onClose }: { page: PageEntry; onClose: () => void }) {
  const sampleContent = `## ${page.title}\n\nThis is the content area for the ${page.title} page.\n\nEdit the text, sections, and metadata for this page using the fields below.`;
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
  const [editing, setEditing] = useState<PageEntry | null>(null);
  const types = ["all", "core", "legal", "system"];
  const [activeType, setActiveType] = useState("all");
  const filtered = PAGES.filter(p => activeType === "all" || p.type === activeType);

  const renderModal = () => {
    if (!editing) return null;
    if (editing.slug === "/about") return <AboutModal onClose={() => setEditing(null)} />;
    if (editing.slug === "/onethemes") return <OnesitesModal onClose={() => setEditing(null)} />;
    return <GenericEditModal page={editing} onClose={() => setEditing(null)} />;
  };

  return (
    <Layout>
      {renderModal()}
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
                <div className="flex items-center gap-2.5 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold text-foreground">{p.title}</p>
                  <Badge color={p.type === "legal" ? "yellow" : p.type === "system" ? "default" : "blue"}>{p.type}</Badge>
                  <Badge color="green">{p.status}</Badge>
                  {(p.slug === "/about" || p.slug === "/onethemes") && (
                    <Badge color="blue">Rich editor</Badge>
                  )}
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
