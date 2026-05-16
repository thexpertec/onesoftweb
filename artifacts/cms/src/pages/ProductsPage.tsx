import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import { Edit2, ExternalLink, Search, Plus, X, Save, ChevronDown } from "lucide-react";

const products = [
  { id: 1, name: "Accounting & Bookkeeping ERP", slug: "/accounting", category: "Finance", status: "active", lastUpdated: "10 May 2025", description: "Complete double-entry accounting, invoicing, payroll, and financial reporting for businesses of all sizes." },
  { id: 2, name: "School ERP", slug: "/school", category: "Education", status: "active", lastUpdated: "8 May 2025", description: "Student management, attendance, fee collection, timetabling, and parent portal for schools." },
  { id: 3, name: "Hospital ERP", slug: "/hospital", category: "Healthcare", status: "active", lastUpdated: "5 May 2025", description: "Patient management, appointment scheduling, billing, inventory, and clinical records." },
  { id: 4, name: "E-commerce ERP", slug: "/ecommerce", category: "Retail", status: "active", lastUpdated: "3 May 2025", description: "Order management, inventory, multi-channel sales, returns, and customer portal." },
  { id: 5, name: "Restaurant ERP", slug: "/restaurant", category: "Hospitality", status: "active", lastUpdated: "1 May 2025", description: "Table management, recipe costing, kitchen display, daily reconciliation, and staff scheduling." },
  { id: 6, name: "Shadi Hall ERP", slug: "/shadi-hall", category: "Events", status: "active", lastUpdated: "28 Apr 2025", description: "Venue booking, event packages, advance payments, catering management, and guest tracking." },
  { id: 7, name: "Distributor ERP", slug: "/distributor", category: "Distribution", status: "active", lastUpdated: "25 Apr 2025", description: "Route management, multi-warehouse inventory, purchase orders, and sales agent tracking." },
  { id: 8, name: "Pharmacy ERP", slug: "/pharmacy", category: "Healthcare", status: "coming_soon", lastUpdated: "—", description: "Drug inventory, prescription management, expiry tracking, and supplier orders." },
  { id: 9, name: "Hotel & Hospitality ERP", slug: "/hotel", category: "Hospitality", status: "coming_soon", lastUpdated: "—", description: "Room booking, housekeeping, restaurant integration, billing, and guest CRM." },
  { id: 10, name: "Real Estate ERP", slug: "/real-estate", category: "Real Estate", status: "coming_soon", lastUpdated: "—", description: "Property listings, lead tracking, tenancy management, rent collection, and maintenance." },
  { id: 11, name: "Gym & Fitness ERP", slug: "/gym", category: "Fitness", status: "coming_soon", lastUpdated: "—", description: "Member management, class scheduling, subscription billing, and attendance tracking." },
  { id: 12, name: "Garments / Textile ERP", slug: "/garments", category: "Manufacturing", status: "coming_soon", lastUpdated: "—", description: "Production planning, fabric inventory, order management, and export documentation." },
];

function EditModal({ product, onClose }: { product: typeof products[0]; onClose: () => void }) {
  const [form, setForm] = useState({ ...product });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Edit Product</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Product Name</label>
            <input value={form.name} onChange={set("name")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
              <input value={form.category} onChange={set("category")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <div className="relative">
                <select value={form.status} onChange={set("status")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  <option value="active">Active</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="draft">Draft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.description} onChange={set("description")} rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Page Slug</label>
            <input value={form.slug} onChange={set("slug")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all font-mono" />
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

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<typeof products[0] | null>(null);

  const filtered = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      {editing && <EditModal product={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "ERP Products" }]} />
        <PageHeader
          title="ERP Products"
          description={`${products.filter(p => p.status === "active").length} active · ${products.filter(p => p.status === "coming_soon").length} coming soon`}
          action={<Btn><Plus className="w-4 h-4" /> New Product</Btn>}
        />

        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
        </div>

        <Table headers={["Product", "Category", "Slug", "Last Updated", "Status", ""]}>
          {filtered.map(p => (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.description}</p>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-primary bg-primary/8 px-1.5 py-0.5 rounded">{p.slug}</code>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-muted-foreground">{p.lastUpdated}</span>
              </td>
              <td className="px-4 py-3">
                <Badge color={p.status === "active" ? "green" : p.status === "coming_soon" ? "yellow" : "default"}>
                  {p.status === "coming_soon" ? "Coming Soon" : p.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(p)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                  <a href={`https://onesoft.org.uk${p.slug}`} target="_blank" rel="noopener noreferrer">
                    <Btn variant="ghost" size="sm"><ExternalLink className="w-3.5 h-3.5" /></Btn>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </Layout>
  );
}
