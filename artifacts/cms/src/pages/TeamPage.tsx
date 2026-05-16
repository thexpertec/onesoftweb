import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Search, Save, X, ChevronDown, Star, Linkedin, Twitter } from "lucide-react";

const TEAM_MEMBERS = [
  { id: 1, name: "Bilal Hussain",    role: "Lead Backend Engineer",       dept: "Engineering", location: "Islamabad, PK", initials: "BH", color: "#1E4DA0", status: "active", joined: "Mar 2021" },
  { id: 2, name: "Fatima Riaz",      role: "Full-Stack Developer",         dept: "Engineering", location: "Islamabad, PK", initials: "FR", color: "#1E4DA0", status: "active", joined: "Jun 2021" },
  { id: 3, name: "Tariq Saleem",     role: "ERP Specialist",               dept: "Engineering", location: "Islamabad, PK", initials: "TS", color: "#1E4DA0", status: "active", joined: "Sep 2021" },
  { id: 4, name: "Nadia Khan",       role: "AI & Automation Engineer",     dept: "Engineering", location: "Islamabad, PK", initials: "NK", color: "#1E4DA0", status: "active", joined: "Jan 2022" },
  { id: 5, name: "Hassan Qureshi",   role: "DevOps & Infrastructure",      dept: "Engineering", location: "Islamabad, PK", initials: "HQ", color: "#1E4DA0", status: "active", joined: "Apr 2022" },
  { id: 6, name: "Mariam Yousaf",    role: "Frontend Developer",           dept: "Engineering", location: "Hull, UK",      initials: "MY", color: "#1E4DA0", status: "active", joined: "Jul 2022" },
  { id: 7, name: "James Whitfield",  role: "SEO Strategist",               dept: "Marketing",   location: "Hull, UK",      initials: "JW", color: "#1E4DA0", status: "active", joined: "Nov 2021" },
  { id: 8, name: "Priya Menon",      role: "Digital Marketing Manager",    dept: "Marketing",   location: "Hull, UK",      initials: "PM", color: "#1E4DA0", status: "active", joined: "Feb 2022" },
  { id: 9, name: "Khalid Al-Rashid", role: "Client Success Manager",       dept: "Business",    location: "Dubai, UAE",    initials: "KR", color: "#1E4DA0", status: "active", joined: "May 2022" },
  { id: 10, name: "Leila Abubakar",  role: "Business Development",         dept: "Business",    location: "Dubai, UAE",    initials: "LA", color: "#1E4DA0", status: "active", joined: "Sep 2022" },
  { id: 11, name: "Rania Hashim",    role: "Creative Director",            dept: "Design",      location: "Dubai, UAE",    initials: "RH", color: "#1E4DA0", status: "active", joined: "Dec 2021" },
  { id: 12, name: "Adam Thornton",   role: "Project Manager",              dept: "Business",    location: "Hull, UK",      initials: "AT", color: "#1E4DA0", status: "active", joined: "Mar 2023" },
];

const LEADERSHIP = [
  {
    id: 1, name: "Zain ul Abideen", role: "Founder & CEO", office: "Hull, UK", initials: "ZA", color: "#1E4DA0",
    bio: "Zain founded OneSoft with a single conviction: businesses everywhere deserve enterprise-grade software without enterprise-grade complexity. With a background in systems architecture and a decade of building software for clients across three continents, he leads the company's vision and strategic direction.",
    tags: ["Strategy", "Systems Architecture", "Business Development"],
    linkedin: "#", twitter: "#", status: "active",
  },
  {
    id: 2, name: "Aisha Mahmood", role: "Chief Technology Officer", office: "Islamabad, PK", initials: "AM", color: "#1E4DA0",
    bio: "Aisha oversees everything technical at OneSoft — from cloud infrastructure and ERP architecture to AI research and security. She has shipped software used by over two hundred organisations across education, healthcare, and retail, and leads a team of thirty-plus engineers.",
    tags: ["Cloud Infrastructure", "ERP Architecture", "AI & Automation"],
    linkedin: "#", twitter: "#", status: "active",
  },
  {
    id: 3, name: "Omar Farooq", role: "Chief Operating Officer", office: "Business Bay, Dubai", initials: "OF", color: "#1E4DA0",
    bio: "Omar ensures OneSoft delivers on every promise made to every client. He manages client success, delivery operations, and the company's processes across all three offices. Before OneSoft, he spent eight years in operations and programme management at a Big Four consultancy.",
    tags: ["Operations", "Client Success", "Delivery Management"],
    linkedin: "#", twitter: "#", status: "active",
  },
  {
    id: 4, name: "Sara Nawaz", role: "Head of Design", office: "Hull, UK", initials: "SN", color: "#1E4DA0",
    bio: "Sara leads product design and brand across OneSoft and every client project we touch. She brings a deep belief that good design is not decoration — it is how software communicates. She has designed digital products for clients ranging from NHS-linked clinics to Series-B startups.",
    tags: ["Product Design", "Brand Identity", "UX Research"],
    linkedin: "#", twitter: "#", status: "active",
  },
];

const TEAM_DEPTS = ["All", "Engineering", "Marketing", "Design", "Business"];

type Member = typeof TEAM_MEMBERS[0];
type Leader = typeof LEADERSHIP[0];
type TabType = "team" | "leadership";

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const [form, setForm] = useState({ ...member });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{member.id === 0 ? "Add Team Member" : "Edit Team Member"}</h2>
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
                  {TEAM_DEPTS.filter(d => d !== "All").map(d => <option key={d}>{d}</option>)}
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Join Date</label>
              <input value={form.joined} onChange={set("joined")} placeholder="Jan 2024"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
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
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save</Btn>
        </div>
      </div>
    </div>
  );
}

function LeaderModal({ leader, onClose }: { leader: Leader; onClose: () => void }) {
  const [form, setForm] = useState({ ...leader, tagsStr: leader.tags.join(", ") });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold">{leader.id === 0 ? "Add Leadership Profile" : `Edit — ${leader.name}`}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Name</label>
              <input value={form.name} onChange={set("name")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Title / Role</label>
              <input value={form.role} onChange={set("role")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Office / Location</label>
              <input value={form.office} onChange={set("office")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Initials</label>
              <input value={form.initials} onChange={set("initials")} maxLength={2}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 uppercase font-bold" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full Bio</label>
            <textarea value={form.bio} onChange={set("bio")} rows={5}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.bio.length} characters · aim for 2–3 sentences</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Expertise Tags (comma separated)</label>
            <input value={form.tagsStr} onChange={set("tagsStr")} placeholder="Strategy, Systems Architecture, Business Development"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">LinkedIn URL</label>
              <input value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Twitter / X URL</label>
              <input value={form.twitter} onChange={set("twitter")} placeholder="https://x.com/..."
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 font-mono" />
            </div>
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
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Profile</Btn>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<TabType>("team");
  const [members, setMembers] = useState(TEAM_MEMBERS);
  const [leadership, setLeadership] = useState(LEADERSHIP);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);

  const filtered = members.filter(m => {
    const matchS = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchD = dept === "All" || m.dept === dept;
    return matchS && matchD;
  });

  return (
    <Layout>
      {editingMember && <MemberModal member={editingMember} onClose={() => setEditingMember(null)} />}
      {editingLeader && <LeaderModal leader={editingLeader} onClose={() => setEditingLeader(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Team" }]} />
        <PageHeader
          title="Team"
          description={`${members.length} team members · ${leadership.length} leadership profiles`}
          action={
            activeTab === "team"
              ? <Btn onClick={() => setEditingMember({ id: 0, name: "", role: "", dept: "Engineering", location: "", initials: "", color: "#1E4DA0", status: "active", joined: "" })}><Plus className="w-4 h-4" /> Add Member</Btn>
              : <Btn onClick={() => setEditingLeader({ id: 0, name: "", role: "", office: "", initials: "", color: "#1E4DA0", bio: "", tags: [], linkedin: "#", twitter: "#", status: "active" })}><Plus className="w-4 h-4" /> Add Leader</Btn>
          }
        />

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          <button onClick={() => setActiveTab("team")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "team" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Team Members ({members.length})
          </button>
          <button onClick={() => setActiveTab("leadership")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "leadership" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Leadership ({leadership.length})
          </button>
        </div>

        {/* Team Members tab */}
        {activeTab === "team" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {TEAM_DEPTS.map(d => (
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
                    <Btn variant="ghost" size="sm" onClick={() => setEditingMember(m)}><Edit2 className="w-3 h-3" /></Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setMembers(ms => ms.filter(x => x.id !== m.id))}><Trash2 className="w-3 h-3 text-destructive" /></Btn>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{filtered.length} of {members.length} members shown</p>
          </div>
        )}

        {/* Leadership tab */}
        {activeTab === "leadership" && (
          <div>
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs text-primary/80">These 4 profiles appear on the <strong>Our Team</strong> page as the featured leadership section — with full bios, expertise tags, and social links.</p>
            </div>
            <div className="space-y-4">
              {leadership.map(l => (
                <div key={l.id} className="bg-card rounded-xl border border-border p-5 group hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black text-white shrink-0"
                      style={{ background: l.color }}>{l.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-foreground">{l.name}</p>
                          <p className="text-xs text-primary font-semibold">{l.role}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{l.office}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Btn variant="ghost" size="sm" onClick={() => setEditingLeader(l)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                          <Btn variant="ghost" size="sm" onClick={() => setLeadership(ls => ls.filter(x => x.id !== l.id))}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-3 line-clamp-2">{l.bio}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {l.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Linkedin className="w-3 h-3" />
                          <span className="font-mono truncate max-w-32">{l.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Twitter className="w-3 h-3" />
                          <span className="font-mono truncate max-w-32">{l.twitter}</span>
                        </div>
                        <Badge color={l.status === "active" ? "green" : "default"}>{l.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
