import { useState } from "react";
import { Layout, PageHeader, Btn } from "@/components/Layout";
import { Plus, Edit2, Trash2, Search, Save, X, ChevronDown, Code2 } from "lucide-react";

const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Cloud", "Design", "Tools", "CMS", "Payments"];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#61DAFB", Backend:  "#339933", Database: "#4169E1",
  DevOps:   "#326CE5", Cloud:    "#0080FF", Design:   "#F24E1E",
  Tools:    "#F05032", CMS:      "#21759B", Payments: "#635BFF",
};

const INITIAL_TECH = [
  { id:  1, name: "React",        color: "#61DAFB", category: "Frontend", row: "1", status: "active" },
  { id:  2, name: "TypeScript",   color: "#3178C6", category: "Frontend", row: "1", status: "active" },
  { id:  3, name: "Node.js",      color: "#339933", category: "Backend",  row: "1", status: "active" },
  { id:  4, name: "Python",       color: "#3776AB", category: "Backend",  row: "1", status: "active" },
  { id:  5, name: "PostgreSQL",   color: "#4169E1", category: "Database", row: "1", status: "active" },
  { id:  6, name: "Redis",        color: "#DC382D", category: "Database", row: "1", status: "active" },
  { id:  7, name: "Docker",       color: "#2496ED", category: "DevOps",   row: "1", status: "active" },
  { id:  8, name: "Cloud",        color: "#0080FF", category: "Cloud",    row: "1", status: "active" },
  { id:  9, name: "Next.js",      color: "#aaaaaa", category: "Frontend", row: "1", status: "active" },
  { id: 10, name: "Go",           color: "#00ADD8", category: "Backend",  row: "1", status: "active" },
  { id: 11, name: "Laravel",      color: "#FF2D20", category: "Backend",  row: "2", status: "active" },
  { id: 12, name: "PHP",          color: "#777BB4", category: "Backend",  row: "2", status: "active" },
  { id: 13, name: "MongoDB",      color: "#47A248", category: "Database", row: "2", status: "active" },
  { id: 14, name: "GraphQL",      color: "#E10098", category: "Backend",  row: "2", status: "active" },
  { id: 15, name: "Tailwind",     color: "#1E4DA0", category: "Frontend", row: "2", status: "active" },
  { id: 16, name: "Git",          color: "#F05032", category: "Tools",    row: "2", status: "active" },
  { id: 17, name: "Linux",        color: "#FCC624", category: "DevOps",   row: "2", status: "active" },
  { id: 18, name: "Kubernetes",   color: "#326CE5", category: "DevOps",   row: "2", status: "active" },
  { id: 19, name: "Nginx",        color: "#009639", category: "DevOps",   row: "2", status: "active" },
  { id: 20, name: "MySQL",        color: "#4479A1", category: "Database", row: "2", status: "active" },
  { id: 21, name: "WordPress",    color: "#21759B", category: "CMS",      row: "3", status: "active" },
  { id: 22, name: "Stripe",       color: "#635BFF", category: "Payments", row: "3", status: "active" },
  { id: 23, name: "Firebase",     color: "#FFCA28", category: "Cloud",    row: "3", status: "active" },
  { id: 24, name: "Google Cloud", color: "#4285F4", category: "Cloud",    row: "3", status: "active" },
  { id: 25, name: "Terraform",    color: "#7B42BC", category: "DevOps",   row: "3", status: "active" },
  { id: 26, name: "Bootstrap",    color: "#7952B3", category: "Frontend", row: "3", status: "active" },
  { id: 27, name: "Figma",        color: "#F24E1E", category: "Design",   row: "3", status: "active" },
  { id: 28, name: "Vercel",       color: "#888888", category: "DevOps",   row: "3", status: "active" },
  { id: 29, name: "Cloudflare",   color: "#F38020", category: "Cloud",    row: "3", status: "active" },
  { id: 30, name: "GitHub",       color: "#888888", category: "Tools",    row: "3", status: "active" },
];

type TechItem = typeof INITIAL_TECH[0];

function TechInitials({ name, color }: { name: string; color: string }) {
  const isLight = color.toLowerCase() === "#ffffff" || color.toLowerCase() === "#aaaaaa" || color.toLowerCase() === "#888888" || color.toLowerCase() === "#fcc624";
  return (
    <div
      className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-black border border-white/10"
      style={{ background: color, color: isLight ? "#000" : "#fff" }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function EditModal({ item, onClose, onSave }: {
  item: TechItem | null;
  onClose: () => void;
  onSave: (item: TechItem) => void;
}) {
  const [form, setForm] = useState<TechItem>(
    item ?? { id: 0, name: "", color: "#1E4DA0", category: "Frontend", row: "1", status: "active" }
  );
  const set = (k: keyof TechItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const isLight = ["#ffffff", "#aaaaaa", "#888888", "#fcc624"].includes(form.color.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">{item ? "Edit Technology" : "Add Technology"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
            <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xs font-black border border-white/10"
              style={{ background: form.color, color: isLight ? "#000" : "#fff" }}>
              {(form.name || "??").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{form.name || "Technology name"}</p>
              <p className="text-xs text-muted-foreground">{form.category} · Row {form.row}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Technology Name</label>
            <input value={form.name} onChange={set("name")} placeholder="e.g. React"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Brand Colour</label>
            <div className="flex items-center gap-2">
              <input type="color" value={form.color} onChange={set("color")}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
              <input value={form.color} onChange={set("color")} placeholder="#000000"
                className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono outline-none focus:border-primary/50 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Category</label>
              <div className="relative">
                <select value={form.category} onChange={set("category")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Marquee Row</label>
              <div className="relative">
                <select value={form.row} onChange={set("row")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  <option value="1">Row 1</option>
                  <option value="2">Row 2</option>
                  <option value="3">Row 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">Visibility</label>
            <div className="flex gap-2">
              {(["active", "hidden"] as const).map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${form.status === s ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  {s === "active" ? "Visible" : "Hidden"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">
            Cancel
          </button>
          <button onClick={() => { onSave({ ...form, id: form.id || Date.now() }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Remove "{name}"?</h3>
        <p className="text-sm text-muted-foreground mb-5">It will be removed from the homepage technology marquee.</p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TechStackPage() {
  const [items, setItems] = useState(INITIAL_TECH);
  const [search, setSearch] = useState("");
  const [rowFilter, setRowFilter] = useState("all");
  const [editing, setEditing] = useState<TechItem | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<TechItem | null>(null);

  const filtered = items.filter(item => {
    const matchSearch = !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchRow = rowFilter === "all" || item.row === rowFilter;
    return matchSearch && matchRow;
  });

  function handleSave(item: TechItem) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = item; return next; }
      return [...prev, item];
    });
  }

  const activeCount   = items.filter(i => i.status === "active").length;
  const categories    = [...new Set(items.map(i => i.category))].sort();
  const rowTabs = [
    { key: "all", label: "All",   count: items.length },
    { key: "1",   label: "Row 1", count: items.filter(i => i.row === "1").length },
    { key: "2",   label: "Row 2", count: items.filter(i => i.row === "2").length },
    { key: "3",   label: "Row 3", count: items.filter(i => i.row === "3").length },
  ];

  return (
    <Layout>
      <PageHeader
        title="Tech Stack"
        description="Manage the technology logos displayed in the homepage marquee — three scrolling rows of your stack."
        action={<Btn onClick={() => setEditing(null)}><Plus className="w-4 h-4" />Add Technology</Btn>}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Technologies", value: items.length },
          { label: "Visible",            value: activeCount },
          { label: "Hidden",             value: items.length - activeCount },
          { label: "Categories",         value: categories.length },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + grid */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center gap-4 px-5 py-4 border-b border-border flex-wrap">
          <div className="flex gap-1 bg-muted/40 rounded-xl p-1">
            {rowTabs.map(tab => (
              <button key={tab.key} onClick={() => setRowFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${rowFilter === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {tab.label}
                <span className="ml-1.5 text-muted-foreground font-normal">{tab.count}</span>
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-44 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search technologies…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(item => (
            <div key={item.id}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                item.status === "hidden"
                  ? "border-dashed border-border/60 bg-muted/10 opacity-55"
                  : "border-border bg-background hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <TechInitials name={item.name} color={item.color} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-[11px] px-1.5 py-0.5 rounded-md font-medium"
                    style={{ background: `${CATEGORY_COLORS[item.category] || "#888"}18`, color: CATEGORY_COLORS[item.category] || "#888" }}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground">Row {item.row}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                <button onClick={() => setEditing(item)}
                  className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-all">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => setDeleting(item)}
                  className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center transition-all">
                  <Trash2 className="w-3.5 h-3.5 text-red-500/70" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 py-14 text-center">
              <Code2 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No technologies match your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="text-sm font-bold text-foreground mb-4">Category Breakdown</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const total  = items.filter(i => i.category === cat).length;
            const active = items.filter(i => i.category === cat && i.status === "active").length;
            return (
              <div key={cat} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] || "#888" }} />
                <span className="text-xs font-semibold text-foreground">{cat}</span>
                <span className="text-xs text-muted-foreground">{active}/{total}</span>
              </div>
            );
          })}
        </div>
      </div>

      {editing !== undefined && (
        <EditModal item={editing} onClose={() => setEditing(undefined)} onSave={handleSave} />
      )}
      {deleting && (
        <DeleteModal
          name={deleting.name}
          onConfirm={() => { setItems(p => p.filter(i => i.id !== deleting.id)); setDeleting(null); }}
          onClose={() => setDeleting(null)}
        />
      )}
    </Layout>
  );
}
