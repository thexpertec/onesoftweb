import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Search, Save, X, ChevronDown } from "lucide-react";

const members = [
  { id: 1, name: "Omar Farooq", role: "Head of ERP Solutions", dept: "Engineering", location: "Islamabad", initials: "OF", color: "#1E4DA0", status: "active", joined: "Jan 2021" },
  { id: 2, name: "Bilal Qureshi", role: "CTO", dept: "Engineering", location: "Islamabad", initials: "BQ", color: "#0891b2", status: "active", joined: "Mar 2020" },
  { id: 3, name: "Sarah Mitchell", role: "CEO", dept: "Leadership", location: "Hull, UK", initials: "SM", color: "#7c3aed", status: "active", joined: "Jan 2020" },
  { id: 4, name: "Zain Ahmed", role: "AI Solutions Lead", dept: "Engineering", location: "Islamabad", initials: "ZA", color: "#7c3aed", status: "active", joined: "Jun 2022" },
  { id: 5, name: "Hamza Siddiqui", role: "Lead Web Developer", dept: "Engineering", location: "Islamabad", initials: "HS", color: "#16a34a", status: "active", joined: "Sep 2022" },
  { id: 6, name: "Aisha Malik", role: "Head of SEO", dept: "Marketing", location: "Hull, UK", initials: "AM", color: "#0891b2", status: "active", joined: "Feb 2022" },
  { id: 7, name: "Fatima Khan", role: "Social Media Lead", dept: "Marketing", location: "Hull, UK", initials: "FK", color: "#ec4899", status: "active", joined: "Apr 2022" },
  { id: 8, name: "Tariq Hassan", role: "Account Manager", dept: "Business", location: "Dubai, UAE", initials: "TH", color: "#f97316", status: "active", joined: "Nov 2021" },
  { id: 9, name: "Layla Al-Rashid", role: "Business Development", dept: "Business", location: "Dubai, UAE", initials: "LR", color: "#16a34a", status: "active", joined: "Mar 2023" },
  { id: 10, name: "James Cooper", role: "Head of Design", dept: "Design", location: "Hull, UK", initials: "JC", color: "#1E4DA0", status: "active", joined: "Jul 2021" },
  { id: 11, name: "Ayesha Noor", role: "Brand Designer", dept: "Design", location: "Islamabad", initials: "AN", color: "#ec4899", status: "active", joined: "Jan 2023" },
  { id: 12, name: "Raza Khan", role: "DevOps Engineer", dept: "Engineering", location: "Islamabad", initials: "RK", color: "#0891b2", status: "active", joined: "Aug 2023" },
];

const depts = ["All", "Engineering", "Marketing", "Design", "Business", "Leadership"];

function EditModal({ member, onClose }: { member: typeof members[0]; onClose: () => void }) {
  const [form, setForm] = useState({ ...member });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">Edit Team Member</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-3">
          {[["Full Name", "name"], ["Role / Title", "role"], ["Location", "location"]].map(([label, key]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
              <input value={(form as any)[key]} onChange={set(key)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Department</label>
              <div className="relative">
                <select value={form.dept} onChange={set("dept")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                  {depts.filter(d => d !== "All").map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Initials</label>
              <input value={form.initials} onChange={set("initials")} maxLength={2}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 uppercase font-bold" />
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

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [editing, setEditing] = useState<typeof members[0] | null>(null);

  const filtered = members.filter(m => {
    const matchS = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchD = dept === "All" || m.dept === dept;
    return matchS && matchD;
  });

  return (
    <Layout>
      {editing && <EditModal member={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Team" }]} />
        <PageHeader title="Team" description={`${members.length} members across 3 offices`}
          action={<Btn><Plus className="w-4 h-4" /> Add Member</Btn>} />

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {depts.map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${dept === d ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => (
            <div key={m.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 group hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                style={{ background: m.color }}>{m.initials}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge color="default">{m.dept}</Badge>
                  <span className="text-[11px] text-muted-foreground">{m.location}</span>
                </div>
              </div>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Btn variant="ghost" size="sm" onClick={() => setEditing(m)}><Edit2 className="w-3 h-3" /></Btn>
                <Btn variant="ghost" size="sm"><Trash2 className="w-3 h-3 text-destructive" /></Btn>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">{filtered.length} of {members.length} members shown</p>
      </div>
    </Layout>
  );
}
