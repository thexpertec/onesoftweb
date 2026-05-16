import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, GripVertical, MessageSquare, ChevronDown } from "lucide-react";

const INITIAL_FAQS = [
  { id: 1, question: "What exactly does OneSoft offer?", answer: "We build two categories of software: industry-specific ERP systems (for schools, hospitals, restaurants, shadi halls, e-commerce, wholesalers, and distributors) and custom websites for any business under our OneSites brand. Every solution is custom-engineered — not off-the-shelf — so it fits your exact workflows and scales as your business grows.", category: "General", page: "Home", status: "published", order: 1 },
  { id: 2, question: "Do I need technical expertise to work with you?", answer: "Not at all. Our team handles every technical detail from architecture to deployment. We translate your business requirements into software, train your team, and provide ongoing support. You simply describe how your business works — we build the rest.", category: "General", page: "Home", status: "published", order: 2 },
  { id: 3, question: "Which types of businesses benefit most from your ERP?", answer: "Any business managing multiple departments, large volumes of transactions, or complex inventory. Our strongest verticals are schools and colleges, hospitals and clinics, restaurants and cafes, shadi halls and event venues, e-commerce stores, and wholesale/distribution businesses.", category: "ERP", page: "Home", status: "published", order: 3 },
  { id: 4, question: "How long does an ERP implementation take?", answer: "A standard ERP deployment takes 4–12 weeks depending on the complexity of your workflows and the number of modules. We use an agile delivery model — core features go live first, then we add modules iteratively so your team starts seeing value immediately.", category: "ERP", page: "Home", status: "published", order: 4 },
  { id: 5, question: "Can the ERP be fully customized for our workflows?", answer: "Yes — customization is the foundation of how we work. We start with a business audit, map your exact processes, and build around them. Every module — from billing to reporting to role-based access — is configured to match how your team actually operates.", category: "ERP", page: "Home", status: "published", order: 5 },
  { id: 6, question: "What happens after the system goes live?", answer: "We provide a structured handover, full team training, and a dedicated support period. After that, our clients access ongoing support through our SLA packages — covering bug fixes, security updates, feature additions, and 24/7 monitoring for mission-critical systems.", category: "General", page: "Home", status: "published", order: 6 },
  { id: 7, question: "Is our business data secure on your systems?", answer: "Security is built into everything we deliver. We use end-to-end encryption, role-based access control, automated database backups, and optional on-premise deployment for clients who require data sovereignty. We comply with standard data protection frameworks.", category: "General", page: "Home", status: "published", order: 7 },
  { id: 8, question: "Do you work with businesses outside Pakistan?", answer: "Yes. We have active offices in Islamabad, Hull (UK), and Dubai (UAE), and have delivered projects across 40+ countries. Our team operates across time zones to ensure responsive communication regardless of where you are based.", category: "General", page: "Home", status: "published", order: 8 },
  { id: 9, question: "How much does a website cost with OneSites?", answer: "OneSites pricing depends on the scope, pages, and any custom integrations required. We provide a detailed quote after a free discovery call — there are no hidden charges or retainer lock-ins. Most small business sites start from £1,500.", category: "Web / OneSites", page: "OneSites", status: "draft", order: 1 },
  { id: 10, question: "What digital marketing services do you offer?", answer: "We offer SEO, social media management, paid ads (Meta and Google), and ad creative production. Services can be taken individually or as a bundled digital growth package with a dedicated account manager.", category: "Marketing", page: "Contact", status: "draft", order: 1 },
];

const CATEGORIES = ["All", "General", "ERP", "Web / OneSites", "Marketing"];
const PAGES = ["Home", "Contact", "OneSites", "About", "Careers"];

type FAQ = typeof INITIAL_FAQS[0];

function EditModal({ faq, onClose }: { faq: FAQ; onClose: () => void }) {
  const [form, setForm] = useState({ ...faq });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold text-foreground">{faq.id === 0 ? "New FAQ" : "Edit FAQ"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Question</label>
            <input value={form.question} onChange={set("question")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Answer</label>
            <textarea value={form.answer} onChange={set("answer")} rows={6}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.answer.length} characters</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
              <div className="relative">
                <select value={form.category} onChange={set("category")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Show On Page</label>
              <div className="relative">
                <select value={form.page} onChange={set("page")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                  {PAGES.map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <div className="relative">
                <select value={form.status} onChange={set("status")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
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

export default function FAQsPage() {
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [cat, setCat] = useState("All");
  const [pageFil, setPageFil] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const allPages = ["All", ...PAGES];
  const filtered = faqs.filter(f => {
    const matchC = cat === "All" || f.category === cat;
    const matchP = pageFil === "All" || f.page === pageFil;
    return matchC && matchP;
  });

  return (
    <Layout>
      {editing && <EditModal faq={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "FAQs" }]} />
        <PageHeader
          title="FAQs"
          description={`${faqs.filter(f => f.status === "published").length} published across ${[...new Set(faqs.filter(f => f.status === "published").map(f => f.page))].length} pages`}
          action={
            <Btn onClick={() => setEditing({ id: 0, question: "", answer: "", category: "General", page: "Home", status: "draft", order: 1 })}>
              <Plus className="w-4 h-4" /> Add FAQ
            </Btn>
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground px-1">Category</p>
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${cat === c ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground px-1">Page</p>
            <div className="flex gap-1.5 flex-wrap">
              {allPages.map(p => (
                <button key={p} onClick={() => setPageFil(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${pageFil === p ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ list (accordion preview) */}
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <div key={faq.id}
              className={`bg-card rounded-xl border overflow-hidden transition-all ${faq.status === "draft" ? "border-border/50 opacity-70" : "border-border"}`}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab shrink-0" />
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">
                  {faq.order}
                </span>
                <button
                  onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  className="flex-1 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question || <span className="text-muted-foreground italic">No question set</span>}
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge color="default">{faq.category}</Badge>
                  <span className="text-[11px] text-muted-foreground hidden sm:block">→ {faq.page}</span>
                  <Badge color={faq.status === "published" ? "green" : "yellow"}>{faq.status}</Badge>
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(faq)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                  <Btn variant="ghost" size="sm" onClick={() => setFaqs(fs => fs.filter(f => f.id !== faq.id))}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Btn>
                </div>
              </div>
              {expanded === faq.id && (
                <div className="px-4 pb-4 pl-[72px] border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No FAQs match this filter.</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">{filtered.length} of {faqs.length} FAQs shown</p>
      </div>
    </Layout>
  );
}
