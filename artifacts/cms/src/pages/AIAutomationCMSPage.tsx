import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, GripVertical } from "lucide-react";

const INITIAL_CAPABILITIES = [
  { id: 1, icon: "💬", title: "AI Chatbots & Virtual Assistants", desc: "Custom-trained chatbots that handle customer queries, route support tickets, and answer FAQs 24/7 — integrated directly into your website, WhatsApp, or ERP.", examples: ["School fee inquiry bot", "Hospital appointment assistant", "Restaurant order assistant"], status: "active" },
  { id: 2, icon: "📄", title: "Document Intelligence", desc: "Automatically extract, classify, and summarise data from invoices, medical records, admission forms, purchase orders, and contracts — without manual entry.", examples: ["Invoice auto-processing", "Patient record extraction", "Contract clause detection"], status: "active" },
  { id: 3, icon: "⚙️", title: "Business Process Automation", desc: "Replace multi-step manual workflows with trigger-based automation pipelines. From lead follow-up emails to report generation — if it's repetitive, we automate it.", examples: ["Auto fee reminder sequences", "Inventory low-stock alerts", "Monthly report generation"], status: "active" },
  { id: 4, icon: "📊", title: "Predictive Analytics & Reporting", desc: "LLM-powered dashboards that don't just show numbers — they explain them. Ask questions in plain English and get instant insights from your business data.", examples: ["Sales trend forecasting", "Student performance prediction", "Demand planning for distributors"], status: "active" },
  { id: 5, icon: "🗃️", title: "RAG Knowledge Systems", desc: "Build private AI knowledge bases from your own documents, manuals, and policies. Staff can query them instantly — no hallucinations, always sourced from your data.", examples: ["Hospital policy assistant", "School curriculum Q&A", "Supplier catalogue search"], status: "active" },
  { id: 6, icon: "🔍", title: "OCR & Data Extraction", desc: "Convert scanned documents, handwritten forms, and image-based PDFs into structured digital data — automatically fed into your ERP or database.", examples: ["Handwritten fee slips", "Lab report scanning", "Delivery note digitisation"], status: "active" },
];

const INITIAL_USE_CASES = [
  { id: 1, sector: "Schools", icon: "🎓", task: "Auto-generate student progress reports from attendance, grades, and behaviour data — sent to parents every term.", status: "active" },
  { id: 2, sector: "Hospitals", icon: "🏥", task: "AI triage assistant that collects patient symptoms via chat before the doctor visit, summarising them in the OPD record.", status: "active" },
  { id: 3, sector: "Restaurants", icon: "🍽️", task: "Demand forecasting that predicts daily covers from weather, local events, and historical data — cutting food waste by up to 30%.", status: "active" },
  { id: 4, sector: "Distributors", icon: "📦", task: "Auto-match incoming orders with available stock, generate pick lists, and notify drivers — zero manual dispatch coordination.", status: "active" },
  { id: 5, sector: "E-commerce", icon: "🛒", task: "AI product description writer that generates SEO-optimised listings from images and specifications in seconds.", status: "active" },
  { id: 6, sector: "Event Halls", icon: "💒", task: "Intelligent booking assistant that checks availability, quotes packages, and sends contracts — all without human involvement.", status: "active" },
];

const INITIAL_STACK = [
  "OpenAI GPT-4o", "Claude 3.5", "LangChain", "LlamaIndex",
  "Pinecone", "Supabase Vector", "Whisper STT", "n8n Workflows",
  "Make.com", "Zapier", "FastAPI", "Python",
];

type Capability = typeof INITIAL_CAPABILITIES[0];
type UseCase = typeof INITIAL_USE_CASES[0];

const TABS = ["capabilities", "use-cases", "tech-stack", "section-copy"] as const;
type TabType = typeof TABS[number];

function CapabilityModal({ cap, onClose }: { cap: Capability; onClose: () => void }) {
  const [form, setForm] = useState({ ...cap, examplesStr: cap.examples.join("\n") });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold">{cap.id === 0 ? "New Capability" : "Edit Capability"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon</label>
              <input value={form.icon} onChange={set("icon")} maxLength={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-2xl text-center outline-none focus:border-primary/50" />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Title</label>
              <input value={form.title} onChange={set("title")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.desc} onChange={set("desc")} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Examples (one per line)</label>
            <textarea value={form.examplesStr} onChange={set("examplesStr")} rows={3} placeholder="Example use case 1&#10;Example use case 2&#10;Example use case 3"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none font-mono" />
            <p className="text-[11px] text-muted-foreground mt-1">These appear as checkmark list items below the description.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
            <select value={form.status} onChange={set("status")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30 shrink-0">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save</Btn>
        </div>
      </div>
    </div>
  );
}

function UseCaseModal({ uc, onClose }: { uc: UseCase; onClose: () => void }) {
  const [form, setForm] = useState({ ...uc });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{uc.id === 0 ? "New Use Case" : "Edit Use Case"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon</label>
              <input value={form.icon} onChange={set("icon")} maxLength={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-2xl text-center outline-none focus:border-primary/50" />
            </div>
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Industry / Sector</label>
              <input value={form.sector} onChange={set("sector")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Automation Description</label>
            <textarea value={form.task} onChange={set("task")} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save</Btn>
        </div>
      </div>
    </div>
  );
}

export default function AIAutomationCMSPage() {
  const [activeTab, setActiveTab] = useState<TabType>("capabilities");
  const [capabilities, setCapabilities] = useState(INITIAL_CAPABILITIES);
  const [useCases, setUseCases] = useState(INITIAL_USE_CASES);
  const [techStack, setTechStack] = useState(INITIAL_STACK);
  const [newTool, setNewTool] = useState("");
  const [editingCap, setEditingCap] = useState<Capability | null>(null);
  const [editingUC, setEditingUC] = useState<UseCase | null>(null);
  const [sectionCopy, setSectionCopy] = useState({
    headline: "Put your business on autopilot",
    subheadline: "We build AI systems that replace manual, repetitive work with intelligent automation — saving your team hours every day and eliminating human error at scale.",
    ctaLabel: "Book AI Audit",
    ctaSubLabel: "Free AI Readiness Audit",
    ctaDesc: "We'll audit your current workflows, identify the top 3 automation opportunities, and show you a concrete ROI estimate — all in a free 30-minute call.",
  });

  const tabLabels: Record<TabType, string> = {
    "capabilities": `Capabilities (${capabilities.length})`,
    "use-cases": `Use Cases (${useCases.length})`,
    "tech-stack": `Tech Stack (${techStack.length})`,
    "section-copy": "Section Copy",
  };

  return (
    <Layout>
      {editingCap && <CapabilityModal cap={editingCap} onClose={() => setEditingCap(null)} />}
      {editingUC && <UseCaseModal uc={editingUC} onClose={() => setEditingUC(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "AI & Automation Section" }]} />
        <PageHeader
          title="AI & Automation Section"
          description="Manages the full AI & Automation section on the homepage — capabilities, industry use cases, and tech stack"
        />

        {/* Tab bar */}
        <div className="flex border-b border-border mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tabLabels[t]}
            </button>
          ))}
        </div>

        {/* Capabilities tab */}
        {activeTab === "capabilities" && (
          <div>
            <div className="flex justify-end mb-4">
              <Btn onClick={() => setEditingCap({ id: 0, icon: "🤖", title: "", desc: "", examples: [], status: "active" })}>
                <Plus className="w-4 h-4" /> Add Capability
              </Btn>
            </div>
            <div className="space-y-3">
              {capabilities.map(cap => (
                <div key={cap.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 group hover:border-primary/30 transition-all">
                  <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab mt-1 shrink-0" />
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-xl shrink-0">{cap.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-foreground">{cap.title}</p>
                      <Badge color={cap.status === "active" ? "green" : "default"}>{cap.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.examples.map(ex => (
                        <span key={ex} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">✓ {ex}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Btn variant="ghost" size="sm" onClick={() => setEditingCap(cap)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setCapabilities(cs => cs.filter(c => c.id !== cap.id))}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases tab */}
        {activeTab === "use-cases" && (
          <div>
            <div className="flex justify-end mb-4">
              <Btn onClick={() => setEditingUC({ id: 0, sector: "", icon: "🏢", task: "", status: "active" })}>
                <Plus className="w-4 h-4" /> Add Use Case
              </Btn>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCases.map(uc => (
                <div key={uc.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xl shrink-0">{uc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{uc.sector}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{uc.task}</p>
                  </div>
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Btn variant="ghost" size="sm" onClick={() => setEditingUC(uc)}><Edit2 className="w-3 h-3" /></Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setUseCases(us => us.filter(u => u.id !== uc.id))}>
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack tab */}
        {activeTab === "tech-stack" && (
          <div>
            <p className="text-xs text-muted-foreground mb-4">These appear as pill badges in the "AI & automation tools we work with" strip at the bottom of the AI section.</p>
            <div className="flex flex-wrap gap-2 mb-5 p-4 bg-muted/30 rounded-xl border border-border">
              {techStack.map(tool => (
                <div key={tool} className="flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-foreground group">
                  {tool}
                  <button onClick={() => setTechStack(ts => ts.filter(t => t !== tool))}
                    className="ml-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newTool} onChange={e => setNewTool(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && newTool.trim()) { setTechStack(ts => [...ts, newTool.trim()]); setNewTool(""); }}}
                placeholder="Add new tool (press Enter)"
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
              <Btn onClick={() => { if (newTool.trim()) { setTechStack(ts => [...ts, newTool.trim()]); setNewTool(""); }}}>
                <Plus className="w-4 h-4" /> Add
              </Btn>
            </div>
          </div>
        )}

        {/* Section Copy tab */}
        {activeTab === "section-copy" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Section Headline</label>
              <input value={sectionCopy.headline} onChange={e => setSectionCopy(s => ({ ...s, headline: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Section Subheadline</label>
              <textarea value={sectionCopy.subheadline} onChange={e => setSectionCopy(s => ({ ...s, subheadline: e.target.value }))} rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-bold text-muted-foreground mb-3">Bottom CTA Panel</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CTA Badge Label</label>
                    <input value={sectionCopy.ctaSubLabel} onChange={e => setSectionCopy(s => ({ ...s, ctaSubLabel: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CTA Button Label</label>
                    <input value={sectionCopy.ctaLabel} onChange={e => setSectionCopy(s => ({ ...s, ctaLabel: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CTA Description</label>
                  <textarea value={sectionCopy.ctaDesc} onChange={e => setSectionCopy(s => ({ ...s, ctaDesc: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Btn><Save className="w-4 h-4" /> Save Copy</Btn>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
