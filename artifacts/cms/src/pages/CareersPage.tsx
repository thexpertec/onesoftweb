import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import { Plus, Search, Edit2, Trash2, Save, X, ChevronDown, GripVertical } from "lucide-react";

const JOBS = [
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

const DEPTS = ["All", "Engineering", "Design", "Digital Marketing", "Business"];

const INITIAL_PERKS = [
  { id: 1, icon: "💻", title: "Remote-friendly", desc: "Work from anywhere within your office timezone. We judge by output, not hours at a desk.", status: "active" },
  { id: 2, icon: "🎓", title: "Learning budget", desc: "£1,000 / year per person for courses, books, conferences, or certifications — no justification needed.", status: "active" },
  { id: 3, icon: "📈", title: "Real ownership", desc: "You own your work end to end. No endless handoffs, no layers of approval for decisions that should be yours.", status: "active" },
  { id: 4, icon: "❤️", title: "Health coverage", desc: "Private health insurance for UK-based team members. Healthcare allowance for Dubai and Islamabad offices.", status: "active" },
  { id: 5, icon: "☕", title: "Flexible hours", desc: "Core hours 10–4 in your timezone. Outside of that, structure your day in the way that works best for you.", status: "active" },
  { id: 6, icon: "🌐", title: "Global team", desc: "Work with colleagues across the UK, UAE, and Pakistan. Annual in-person team gathering at one of our offices.", status: "active" },
  { id: 7, icon: "🚀", title: "Growth path", desc: "Clear seniority progression and a six-month review cycle. No one gets stuck if they're performing.", status: "active" },
  { id: 8, icon: "🛡️", title: "Transparent pay", desc: "Salary bands are shared before interviews. No negotiation games — you'll know exactly where you stand.", status: "active" },
];

type Job = typeof JOBS[0];
type Perk = typeof INITIAL_PERKS[0];
type TabType = "jobs" | "perks";

function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ ...job });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{job.id === 0 ? "Post a Role" : "Edit Job Listing"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Job Title</label>
            <input value={form.title} onChange={set("title")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["Department", "dept", DEPTS.filter(d => d !== "All")], ["Level", "level", ["Junior", "Mid", "Mid–Senior", "Senior", "Lead"]], ["Type", "type", ["Full-time", "Part-time", "Contract"]], ["Status", "status", ["open", "closed", "paused"]]].map(([label, key, opts]) => (
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

function PerkModal({ perk, onClose }: { perk: Perk; onClose: () => void }) {
  const [form, setForm] = useState({ ...perk });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{perk.id === 0 ? "Add Perk" : "Edit Perk"}</h2>
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
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Perk Title</label>
              <input value={form.title} onChange={set("title")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.desc} onChange={set("desc")} rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.desc.length} characters</p>
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
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Perk</Btn>
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [jobs, setJobs] = useState(JOBS);
  const [perks, setPerks] = useState(INITIAL_PERKS);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingPerk, setEditingPerk] = useState<Perk | null>(null);

  const filtered = jobs.filter(j => {
    const matchS = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchD = dept === "All" || j.dept === dept;
    return matchS && matchD;
  });

  const totalApplicants = jobs.reduce((n, j) => n + j.applicants, 0);

  return (
    <Layout>
      {editingJob && <JobModal job={editingJob} onClose={() => setEditingJob(null)} />}
      {editingPerk && <PerkModal perk={editingPerk} onClose={() => setEditingPerk(null)} />}
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Careers" }]} />
        <PageHeader
          title="Careers"
          description={`${jobs.filter(j => j.status === "open").length} open roles · ${totalApplicants} total applicants · ${perks.length} company perks`}
          action={
            activeTab === "jobs"
              ? <Btn onClick={() => setEditingJob({ id: 0, title: "", dept: "Engineering", type: "Full-time", location: "", level: "Mid", status: "open", posted: "Today", applicants: 0 })}><Plus className="w-4 h-4" /> Post a Role</Btn>
              : <Btn onClick={() => setEditingPerk({ id: 0, icon: "✨", title: "", desc: "", status: "active" })}><Plus className="w-4 h-4" /> Add Perk</Btn>
          }
        />

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          <button onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "jobs" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Job Listings ({jobs.length})
          </button>
          <button onClick={() => setActiveTab("perks")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "perks" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Company Perks ({perks.length})
          </button>
        </div>

        {/* Jobs tab */}
        {activeTab === "jobs" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
              </div>
              <div className="flex gap-1.5">
                {DEPTS.map(d => (
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
                      <Btn variant="ghost" size="sm" onClick={() => setEditingJob(j)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                      <Btn variant="ghost" size="sm" onClick={() => setJobs(js => js.filter(x => x.id !== j.id))}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}

        {/* Perks tab */}
        {activeTab === "perks" && (
          <div>
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs text-primary/80">These {perks.length} perks appear in the "Why join us" section on the <strong>Careers page</strong> — shown as an 8-card grid below the hero.</p>
            </div>
            <div className="space-y-2">
              {perks.map(p => (
                <div key={p.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 group hover:border-primary/30 transition-all">
                  <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab mt-1 shrink-0" />
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-xl shrink-0">{p.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-foreground">{p.title}</p>
                      <Badge color={p.status === "active" ? "green" : "default"}>{p.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <Btn variant="ghost" size="sm" onClick={() => setEditingPerk(p)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setPerks(ps => ps.filter(x => x.id !== p.id))}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{perks.filter(p => p.status === "active").length} active perks · drag to reorder (coming soon)</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
