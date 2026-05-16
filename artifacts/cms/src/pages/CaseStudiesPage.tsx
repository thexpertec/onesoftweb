import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import { Plus, Search, Edit2, Trash2, ExternalLink, Save, X, ChevronDown } from "lucide-react";

const studies = [
  { id: 1, title: "Al-Noor Academy — 45% Admin Reduction in 8 Weeks", category: "ERP", client: "Al-Noor Academy", industry: "Education", result: "45% admin time saved", status: "published", date: "15 Apr 2025" },
  { id: 2, title: "GreenLeaf Organics — E-commerce ERP Goes Live in 12 Days", category: "ERP", client: "GreenLeaf Organics", industry: "Retail", result: "12-day go-live", status: "published", date: "2 Apr 2025" },
  { id: 3, title: "Raza Distributor Network — Real-Time Stock Across 5 Warehouses", category: "ERP", client: "Raza Distributors", industry: "Distribution", result: "5 warehouses unified", status: "published", date: "20 Mar 2025" },
  { id: 4, title: "Noor Medical Centre — Hospital ERP Reduces Billing Errors by 92%", category: "ERP", client: "Noor Medical Centre", industry: "Healthcare", result: "92% error reduction", status: "published", date: "8 Mar 2025" },
  { id: 5, title: "SpiceRoute Restaurants — SEO Traffic Up 280% in 6 Months", category: "Digital Marketing", client: "SpiceRoute", industry: "Food & Beverage", result: "+280% organic traffic", status: "published", date: "22 Feb 2025" },
  { id: 6, title: "LuxeWear London — Meta Ads Drive £180K Revenue in Q4", category: "Digital Marketing", client: "LuxeWear London", industry: "Fashion", result: "£180K attributed revenue", status: "published", date: "10 Feb 2025" },
  { id: 7, title: "BuildSmart Technologies — Custom ERP Replaces 6 Legacy Systems", category: "Software & AI", client: "BuildSmart Technologies", industry: "Construction", result: "6 systems → 1", status: "published", date: "28 Jan 2025" },
  { id: 8, title: "PakPharma Chain — AI Automates Procurement Across 12 Branches", category: "Software & AI", client: "PakPharma", industry: "Pharmacy", result: "12 branches automated", status: "published", date: "14 Jan 2025" },
  { id: 9, title: "FitLife Gym Network — Membership Management Overhaul", category: "ERP", client: "FitLife Gym", industry: "Fitness", result: "Draft in progress", status: "draft", date: "—" },
];

function EditModal({ study, onClose }: { study: typeof studies[0]; onClose: () => void }) {
  const [form, setForm] = useState({ ...study });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Edit Case Study</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {[["Title", "title"], ["Client Name", "client"], ["Industry", "industry"], ["Key Result", "result"]].map(([label, key]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
              <input value={(form as any)[key]} onChange={set(key)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
              <div className="relative">
                <select value={form.category} onChange={set("category")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  {["ERP", "Digital Marketing", "Software & AI"].map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <div className="relative">
                <select value={form.status} onChange={set("status")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  <option value="published">Published</option><option value="draft">Draft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
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

export default function CaseStudiesPage() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<typeof studies[0] | null>(null);
  const filtered = studies.filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.client.toLowerCase().includes(search.toLowerCase()));
  return (
    <Layout>
      {editing && <EditModal study={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Case Studies" }]} />
        <PageHeader title="Case Studies" description={`${studies.filter(s => s.status === "published").length} published · ${studies.filter(s => s.status === "draft").length} draft`}
          action={<Btn><Plus className="w-4 h-4" /> New Case Study</Btn>} />
        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search case studies…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
        </div>
        <Table headers={["Title", "Client", "Category", "Key Result", "Date", "Status", ""]}>
          {filtered.map(s => (
            <tr key={s.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3"><p className="text-sm font-semibold text-foreground line-clamp-1 max-w-xs">{s.title}</p></td>
              <td className="px-4 py-3"><span className="text-sm text-foreground">{s.client}</span></td>
              <td className="px-4 py-3"><Badge color={s.category === "ERP" ? "blue" : s.category === "Digital Marketing" ? "green" : "yellow"}>{s.category}</Badge></td>
              <td className="px-4 py-3"><span className="text-xs font-semibold text-foreground">{s.result}</span></td>
              <td className="px-4 py-3"><span className="text-sm text-muted-foreground">{s.date}</span></td>
              <td className="px-4 py-3"><Badge color={s.status === "published" ? "green" : "yellow"}>{s.status}</Badge></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(s)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                  <Btn variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Layout>
  );
}
