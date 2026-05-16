import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, GripVertical } from "lucide-react";

const DEV_SERVICES_INITIAL = [
  { id: 1, icon: "🌐", title: "Website Development", desc: "Bespoke business websites — from corporate brochures to full content platforms — built for speed, SEO, and conversion.", tags: ["React", "Next.js", "WordPress", "Webflow"], group: "Software & Development", status: "active" },
  { id: 2, icon: "🛍️", title: "Shopify Stores", desc: "End-to-end Shopify builds including custom themes, app integrations, payment setup, and multi-currency storefronts.", tags: ["Shopify Plus", "Liquid", "Custom Apps", "Multi-currency"], group: "Software & Development", status: "active" },
  { id: 3, icon: "🔌", title: "API Development", desc: "RESTful and GraphQL APIs engineered for reliability — with auth, rate limiting, versioning, and full documentation.", tags: ["REST", "GraphQL", "Node.js", "Swagger"], group: "Software & Development", status: "active" },
  { id: 4, icon: "💻", title: "Custom Software", desc: "Purpose-built desktop and web applications that replace spreadsheets and manual processes with precision automation.", tags: ["Python", "TypeScript", "Electron", "PostgreSQL"], group: "Software & Development", status: "active" },
  { id: 5, icon: "👥", title: "CRM Systems", desc: "Custom CRM solutions that track leads, manage client relationships, automate follow-ups, and give your sales team clarity.", tags: ["Pipeline", "Lead Scoring", "Automations", "Reports"], group: "Software & Development", status: "active" },
  { id: 6, icon: "🏢", title: "ERP Systems", desc: "Industry-specific ERP for schools, hospitals, restaurants, distributors, shadi halls, and e-commerce operations.", tags: ["School", "Hospital", "Restaurant", "Distributor"], group: "Software & Development", status: "active" },
  { id: 7, icon: "🔧", title: "Custom Development", desc: "Have something specific in mind? We take on unique, complex builds that off-the-shelf tools simply can't handle.", tags: ["Scoping", "Architecture", "Build", "Deploy"], group: "Software & Development", status: "active" },
  { id: 8, icon: "🤖", title: "AI Integration & Automation", desc: "LLM-powered features, document intelligence, chatbots, and workflow automation baked into your existing systems.", tags: ["OpenAI", "LangChain", "RAG", "Automation"], group: "Software & Development", status: "active" },
];

const MARKETING_SERVICES_INITIAL = [
  { id: 9, icon: "📣", title: "Social Media Marketing", desc: "Strategy, content creation, scheduling, and community management across Instagram, Facebook, LinkedIn, and TikTok.", tags: ["Instagram", "LinkedIn", "TikTok", "Meta Ads"], group: "Digital Marketing", status: "active" },
  { id: 10, icon: "🔍", title: "SEO", desc: "Technical SEO audits, keyword strategy, on-page optimisation, and link building that actually moves rankings.", tags: ["On-page", "Technical", "Backlinks", "Local SEO"], group: "Digital Marketing", status: "active" },
  { id: 11, icon: "🎨", title: "Ad Creatives", desc: "High-converting static and video ad creatives for Google, Meta, TikTok, and programmatic — designed to stop the scroll.", tags: ["Google Ads", "Meta Ads", "Video", "A/B Testing"], group: "Digital Marketing", status: "active" },
];

const ALL_INITIAL = [...DEV_SERVICES_INITIAL, ...MARKETING_SERVICES_INITIAL];
const GROUPS = ["Software & Development", "Digital Marketing"];

type Service = typeof ALL_INITIAL[0];

function EditModal({ svc, onClose }: { svc: Service; onClose: () => void }) {
  const [form, setForm] = useState({ ...svc, tagsStr: svc.tags.join(", ") });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold">{svc.id === 0 ? "New Service" : `Edit — ${svc.title}`}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon (emoji)</label>
              <input value={form.icon} onChange={set("icon")} maxLength={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-2xl text-center outline-none focus:border-primary/50" />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Service Title</label>
              <input value={form.title} onChange={set("title")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.desc} onChange={set("desc")} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.desc.length} characters</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tags (comma separated)</label>
            <input value={form.tagsStr} onChange={set("tagsStr")} placeholder="React, Next.js, WordPress"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Group</label>
              <select value={form.group} onChange={set("group")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                {GROUPS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <select value={form.status} onChange={set("status")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30 shrink-0">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Service</Btn>
        </div>
      </div>
    </div>
  );
}

export default function HomepageServicesPage() {
  const [services, setServices] = useState(ALL_INITIAL);
  const [editing, setEditing] = useState<Service | null>(null);
  const [groupFilter, setGroupFilter] = useState("All");

  const filtered = groupFilter === "All" ? services : services.filter(s => s.group === groupFilter);
  const grouped = GROUPS.map(g => ({ group: g, items: filtered.filter(s => s.group === g) }));

  return (
    <Layout>
      {editing && <EditModal svc={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Homepage Services" }]} />
        <PageHeader
          title="Homepage Services Grid"
          description={`${services.filter(s => s.status === "active").length} active services across ${GROUPS.length} groups — shown in the full-spectrum services section on the homepage`}
          action={
            <Btn onClick={() => setEditing({ id: 0, icon: "🔧", title: "", desc: "", tags: [], group: "Software & Development", status: "active" })}>
              <Plus className="w-4 h-4" /> Add Service
            </Btn>
          }
        />

        {/* Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
          <span className="text-amber-600 text-sm shrink-0">ℹ️</span>
          <p className="text-xs text-amber-800 leading-relaxed">
            This section manages the <strong>"Full-Spectrum Digital Services"</strong> grid on the homepage (11 service cards). This is separate from the 6 service landing pages managed under "Services". These cards link to a contact enquiry, not individual pages.
          </p>
        </div>

        {/* Group filter */}
        <div className="flex gap-1.5 mb-6">
          {["All", ...GROUPS].map(g => (
            <button key={g} onClick={() => setGroupFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${groupFilter === g ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
              {g === "All" ? `All (${services.length})` : `${g} (${services.filter(s => s.group === g).length})`}
            </button>
          ))}
        </div>

        {/* Grouped list */}
        {grouped.map(({ group, items }) => items.length > 0 && (
          <div key={group} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">{group}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-2">
              {items.map(svc => (
                <div key={svc.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 group hover:border-primary/30 transition-all">
                  <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab mt-1 shrink-0" />
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-xl shrink-0">{svc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-bold text-foreground">{svc.title}</p>
                      <Badge color={svc.status === "active" ? "green" : "yellow"}>{svc.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{svc.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {svc.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Btn variant="ghost" size="sm" onClick={() => setEditing(svc)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setServices(ss => ss.filter(s => s.id !== svc.id))}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
