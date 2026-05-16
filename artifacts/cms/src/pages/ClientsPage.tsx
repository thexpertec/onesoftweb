import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb, Badge } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, Search, Globe } from "lucide-react";

const ROW1 = [
  { id: 1, domain: "nandos.co.uk",       name: "Nando's",          sector: "Restaurant",   flag: "🇬🇧", row: 1, status: "active" },
  { id: 2, domain: "greggs.co.uk",       name: "Greggs",            sector: "Bakery",       flag: "🇬🇧", row: 1, status: "active" },
  { id: 3, domain: "fiveguys.com",       name: "Five Guys",         sector: "Restaurant",   flag: "🇺🇸", row: 1, status: "active" },
  { id: 4, domain: "wingstop.com",       name: "Wingstop",          sector: "Restaurant",   flag: "🇺🇸", row: 1, status: "active" },
  { id: 5, domain: "timhortons.com",     name: "Tim Hortons",       sector: "Café",         flag: "🇨🇦", row: 1, status: "active" },
  { id: 6, domain: "pret.com",           name: "Pret A Manger",     sector: "Café",         flag: "🇬🇧", row: 1, status: "active" },
  { id: 7, domain: "subway.com",         name: "Subway",            sector: "Restaurant",   flag: "🌍",  row: 1, status: "active" },
  { id: 8, domain: "apollohospitals.com",name: "Apollo Hospitals",  sector: "Healthcare",   flag: "🇮🇳", row: 1, status: "active" },
  { id: 9, domain: "kumon.com",          name: "Kumon",             sector: "Education",    flag: "🌍",  row: 1, status: "active" },
  { id: 10, domain: "berlitz.com",       name: "Berlitz",           sector: "Education",    flag: "🌍",  row: 1, status: "active" },
  { id: 11, domain: "spar.com",          name: "SPAR",              sector: "Retail",       flag: "🌍",  row: 1, status: "active" },
  { id: 12, domain: "bestwestern.com",   name: "Best Western",      sector: "Hospitality",  flag: "🌍",  row: 1, status: "active" },
  { id: 13, domain: "papajohns.com",     name: "Papa John's",       sector: "Restaurant",   flag: "🇺🇸", row: 1, status: "active" },
  { id: 14, domain: "dunkin.com",        name: "Dunkin'",           sector: "Café",         flag: "🇺🇸", row: 1, status: "active" },
  { id: 15, domain: "morrisons.com",     name: "Morrisons",         sector: "Supermarket",  flag: "🇬🇧", row: 1, status: "active" },
  { id: 16, domain: "costcutter.com",    name: "Costcutter",        sector: "Retail",       flag: "🇬🇧", row: 1, status: "active" },
];

const ROW2 = [
  { id: 17, domain: "chipotle.com",          name: "Chipotle",          sector: "Restaurant",   flag: "🇺🇸", row: 2, status: "active" },
  { id: 18, domain: "shakeshack.com",        name: "Shake Shack",       sector: "Restaurant",   flag: "🇺🇸", row: 2, status: "active" },
  { id: 19, domain: "caffenero.com",         name: "Caffè Nero",        sector: "Café",         flag: "🇬🇧", row: 2, status: "active" },
  { id: 20, domain: "costacoffee.com",       name: "Costa Coffee",      sector: "Café",         flag: "🇬🇧", row: 2, status: "active" },
  { id: 21, domain: "lidl.com",              name: "Lidl",              sector: "Retail",       flag: "🌍",  row: 2, status: "active" },
  { id: 22, domain: "aldi.co.uk",            name: "Aldi",              sector: "Retail",       flag: "🌍",  row: 2, status: "active" },
  { id: 23, domain: "fortishealthcare.com",  name: "Fortis Healthcare", sector: "Healthcare",   flag: "🇮🇳", row: 2, status: "active" },
  { id: 24, domain: "metropolislab.com",     name: "Metropolis Labs",   sector: "Diagnostics",  flag: "🇮🇳", row: 2, status: "active" },
  { id: 25, domain: "sysco.com",             name: "Sysco",             sector: "Distribution", flag: "🇺🇸", row: 2, status: "active" },
  { id: 26, domain: "ihg.com",               name: "IHG Hotels",        sector: "Hospitality",  flag: "🌍",  row: 2, status: "active" },
  { id: 27, domain: "radissonhotels.com",    name: "Radisson Hotels",   sector: "Hospitality",  flag: "🌍",  row: 2, status: "active" },
  { id: 28, domain: "poundland.co.uk",       name: "Poundland",         sector: "Retail",       flag: "🇬🇧", row: 2, status: "active" },
  { id: 29, domain: "boots.com",             name: "Boots",             sector: "Pharmacy",     flag: "🇬🇧", row: 2, status: "active" },
  { id: 30, domain: "specsavers.com",        name: "Specsavers",        sector: "Healthcare",   flag: "🇬🇧", row: 2, status: "active" },
  { id: 31, domain: "bupa.com",              name: "Bupa",              sector: "Healthcare",   flag: "🇬🇧", row: 2, status: "active" },
  { id: 32, domain: "gsk.com",               name: "GSK",               sector: "Pharma",       flag: "🇬🇧", row: 2, status: "active" },
];

const ALL_CLIENTS = [...ROW1, ...ROW2];

const SECTORS = ["All", "Restaurant", "Café", "Healthcare", "Education", "Retail", "Hospitality", "Distribution", "Pharmacy", "Pharma", "Diagnostics", "Supermarket", "Bakery"];

type Client = typeof ALL_CLIENTS[0];

function EditModal({ client, onClose }: { client: Client; onClose: () => void }) {
  const [form, setForm] = useState({ ...client });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{client.id === 0 ? "Add Client Logo" : "Edit Client Logo"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {/* Logo preview */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl border border-border">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm border border-border">
              <img src={`https://logo.clearbit.com/${form.domain}`} alt={form.name}
                className="w-10 h-10 object-contain"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div>
              <p className="text-sm font-bold">{form.name || "Company name"}</p>
              <p className="text-xs text-muted-foreground">{form.domain || "domain.com"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Company Name</label>
              <input value={form.name} onChange={set("name")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Domain (for logo)</label>
              <input value={form.domain} onChange={set("domain")} placeholder="company.com"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Sector</label>
              <input value={form.sector} onChange={set("sector")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Flag</label>
              <input value={form.flag} onChange={set("flag")} maxLength={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-2xl text-center outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Marquee Row</label>
              <select value={form.row} onChange={set("row")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                <option value={1}>Row 1 (→)</option>
                <option value={2}>Row 2 (←)</option>
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

export default function ClientsPage() {
  const [clients, setClients] = useState(ALL_CLIENTS);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [row, setRow] = useState<number | "all">("all");

  const filtered = clients.filter(c => {
    const matchS = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.domain.toLowerCase().includes(search.toLowerCase());
    const matchSec = sector === "All" || c.sector === sector;
    const matchR = row === "all" || c.row === row;
    return matchS && matchSec && matchR;
  });

  const deleteClient = (id: number) => setClients(cs => cs.filter(c => c.id !== id));

  const row1Count = clients.filter(c => c.row === 1).length;
  const row2Count = clients.filter(c => c.row === 2).length;

  return (
    <Layout>
      {editing && <EditModal client={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Clients & Logos" }]} />
        <PageHeader
          title="Clients & Logos"
          description={`${clients.length} logos · Row 1: ${row1Count} · Row 2: ${row2Count}`}
          action={
            <Btn onClick={() => setEditing({ id: 0, domain: "", name: "", sector: "Restaurant", flag: "🌍", row: 1, status: "active" })}>
              <Plus className="w-4 h-4" /> Add Client
            </Btn>
          }
        />

        {/* Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
          <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-foreground leading-relaxed">
            These logos appear in the scrolling marquee on the homepage (the "Trusted by Growing Businesses Worldwide" section). Logos are loaded automatically from the Clearbit Logo API using each company's domain. Row 1 scrolls left-to-right, Row 2 scrolls right-to-left.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="flex gap-1.5">
            {(["all", 1, 2] as const).map(r => (
              <button key={r} onClick={() => setRow(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${row === r ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                {r === "all" ? "All rows" : `Row ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* Row breakdown */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[1, 2].map(r => (
            <div key={r} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-foreground">Marquee Row {r} {r === 1 ? "(→)" : "(←)"}</p>
                <span className="text-lg">{clients.filter(c => c.row === r).length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {clients.filter(c => c.row === r).slice(0, 8).map(c => (
                  <span key={c.id} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{c.name}</span>
                ))}
                {clients.filter(c => c.row === r).length > 8 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">+{clients.filter(c => c.row === r).length - 8} more</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Client grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 group hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-sm border border-border shrink-0">
                <img src={`https://logo.clearbit.com/${c.domain}`} alt={c.name}
                  className="w-9 h-9 object-contain"
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    t.parentElement!.innerHTML = `<div style="background:#1E4DA0;color:white;font-size:11px;font-weight:900;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px">${c.name.slice(0,2).toUpperCase()}</div>`;
                  }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-foreground truncate">{c.name}</p>
                  <span className="text-base leading-none">{c.flag}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.sector} · Row {c.row}</p>
                <code className="text-[10px] text-primary">{c.domain}</code>
              </div>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Btn variant="ghost" size="sm" onClick={() => setEditing(c)}><Edit2 className="w-3 h-3" /></Btn>
                <Btn variant="ghost" size="sm" onClick={() => deleteClient(c.id)}><Trash2 className="w-3 h-3 text-destructive" /></Btn>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">{filtered.length} of {clients.length} clients shown</p>
      </div>
    </Layout>
  );
}
