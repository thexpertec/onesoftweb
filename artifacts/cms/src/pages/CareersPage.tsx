import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import { Plus, Search, Edit2, Trash2, Save, X, ChevronDown } from "lucide-react";

const jobs = [
  { id: 1, title: "Senior React Developer", dept: "Engineering", type: "Full-time", location: "Islamabad, PK · Remote", level: "Senior", status: "open", posted: "1 May 2025", applicants: 14 },
  { id: 2, title: "Backend Engineer (Node.js / PHP)", dept: "Engineering", type: "Full-time", location: "Islamabad, PK · Remote", level: "Mid–Senior", status: "open", posted: "1 May 2025", applicants: 9 },
  { id: 3, title: "AI / ML Engineer", dept: "Engineering", type: "Full-time", location: "Islamabad, PK · Remote", level: "Senior", status: "open", posted: "1 May 2025", applicants: 6 },
  { id: 4, title: "DevOps & Infrastructure Engineer", dept: "Engineering", type: "Full-time", location: "Islamabad, PK · Remote", level: "Mid–Senior", status: "open", posted: "1 May 2025", applicants: 5 },
  { id: 5, title: "UI/UX Designer", dept: "Design", type: "Full-time", location: "Hull, UK · Remote", level: "Mid–Senior", status: "open", posted: "28 Apr 2025", applicants: 11 },
  { id: 6, title: "Brand & Visual Designer", dept: "Design", type: "Full-time", location: "Hull, UK · Remote", level: "Mid", status: "open", posted: "28 Apr 2025", applicants: 7 },
  { id: 7, title: "SEO Specialist", dept: "Digital Marketing", type: "Full-time", location: "Hull, UK · Remote", level: "Mid", status: "open", posted: "25 Apr 2025", applicants: 8 },
  { id: 8, title: "Paid Media Manager", dept: "Digital Marketing", type: "Full-time", location: "Hull, UK · Remote", level: "Mid–Senior", status: "open", posted: "25 Apr 2025", applicants: 10 },
  { id: 9, title: "Business Development Manager", dept: "Business", type: "Full-time", location: "Dubai, UAE", level: "Senior", status: "open", posted: "20 Apr 2025", applicants: 4 },
  { id: 10, title: "Client Success Manager", dept: "Business", type: "Full-time", location: "Dubai, UAE · Hull, UK", level: "Mid", status: "open", posted: "20 Apr 2025", applicants: 3 },
];

const depts = ["All", "Engineering", "Design", "Digital Marketing", "Business"];

function EditModal({ job, onClose }: { job: typeof jobs[0]; onClose: () => void }) {
  const [form, setForm] = useState({ ...job });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">Edit Job Listing</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Job Title</label>
            <input value={form.title} onChange={set("title")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["Department", "dept", depts.filter(d => d !== "All")], ["Level", "level", ["Junior", "Mid", "Mid–Senior", "Senior", "Lead"]], ["Type", "type", ["Full-time", "Part-time", "Contract"]], ["Status", "status", ["open", "closed", "paused"]]].map(([label, key, opts]) => (
              <div key={key as string}>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label as string}</label>
                <div className="relative">
                  <select value={(form as any)[key as string]} onChange={set(key as string)}
                    className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                    {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Location</label>
            <input value={form.location} onChange={set("location")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
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

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [editing, setEditing] = useState<typeof jobs[0] | null>(null);

  const filtered = jobs.filter(j => {
    const matchS = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchD = dept === "All" || j.dept === dept;
    return matchS && matchD;
  });

  const totalApplicants = jobs.reduce((n, j) => n + j.applicants, 0);

  return (
    <Layout>
      {editing && <EditModal job={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Careers" }]} />
        <PageHeader title="Careers" description={`${jobs.filter(j => j.status === "open").length} open roles · ${totalApplicants} total applicants`}
          action={<Btn><Plus className="w-4 h-4" /> Post a Role</Btn>} />

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="flex gap-1.5">
            {depts.map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${dept === d ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <Table headers={["Role", "Department", "Location", "Level", "Applicants", "Status", ""]}>
          {filtered.map(j => (
            <tr key={j.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3"><p className="text-sm font-semibold text-foreground">{j.title}</p><p className="text-xs text-muted-foreground">{j.type} · Posted {j.posted}</p></td>
              <td className="px-4 py-3"><Badge color="blue">{j.dept}</Badge></td>
              <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{j.location}</span></td>
              <td className="px-4 py-3"><span className="text-sm text-foreground">{j.level}</span></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, j.applicants * 7)}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{j.applicants}</span>
                </div>
              </td>
              <td className="px-4 py-3"><Badge color={j.status === "open" ? "green" : j.status === "paused" ? "yellow" : "red"}>{j.status}</Badge></td>
              <td className="px-4 py-3">
                <div className="flex gap-1 justify-end">
                  <Btn variant="ghost" size="sm" onClick={() => setEditing(j)}><Edit2 className="w-3.5 h-3.5" /></Btn>
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
