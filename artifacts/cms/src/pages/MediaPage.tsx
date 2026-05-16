import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import { Upload, Search, Grid, List, Trash2, Copy, ExternalLink, Image, FileText, Film } from "lucide-react";

const MEDIA = [
  { id: 1, name: "onesoft-logo.png", type: "image", size: "12 KB", dims: "320×80", used: 8, date: "10 May 2025", thumb: "#1E4DA0" },
  { id: 2, name: "hero-dashboard.jpg", type: "image", size: "340 KB", dims: "1280×720", used: 2, date: "8 May 2025", thumb: "#0891b2" },
  { id: 3, name: "team-photo-hull.jpg", type: "image", size: "890 KB", dims: "1920×1080", used: 1, date: "5 May 2025", thumb: "#16a34a" },
  { id: 4, name: "erp-dashboard-screenshot.png", type: "image", size: "215 KB", dims: "1440×900", used: 5, date: "2 May 2025", thumb: "#7c3aed" },
  { id: 5, name: "school-erp-screenshot.png", type: "image", size: "198 KB", dims: "1440×900", used: 3, date: "28 Apr 2025", thumb: "#f97316" },
  { id: 6, name: "hospital-erp-ui.png", type: "image", size: "231 KB", dims: "1440×900", used: 2, date: "25 Apr 2025", thumb: "#ec4899" },
  { id: 7, name: "onesoft-overview.pdf", type: "document", size: "1.2 MB", dims: "—", used: 0, date: "20 Apr 2025", thumb: "#64748b" },
  { id: 8, name: "sla-template.pdf", type: "document", size: "240 KB", dims: "—", used: 1, date: "15 Apr 2025", thumb: "#64748b" },
  { id: 9, name: "dubai-office.jpg", type: "image", size: "560 KB", dims: "1920×1280", used: 2, date: "10 Apr 2025", thumb: "#0891b2" },
  { id: 10, name: "islamabad-office.jpg", type: "image", size: "480 KB", dims: "1920×1280", used: 2, date: "10 Apr 2025", thumb: "#16a34a" },
  { id: 11, name: "intro-video.mp4", type: "video", size: "18.4 MB", dims: "1920×1080", used: 1, date: "5 Apr 2025", thumb: "#1E4DA0" },
  { id: 12, name: "case-study-alnoor.jpg", type: "image", size: "320 KB", dims: "1200×675", used: 4, date: "1 Apr 2025", thumb: "#7c3aed" },
];

const typeIcon = { image: Image, document: FileText, video: Film };
const typeColor = { image: "#1E4DA0", document: "#64748b", video: "#7c3aed" };

export default function MediaPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);

  const filtered = MEDIA.filter(m => {
    const matchS = !search || m.name.toLowerCase().includes(search.toLowerCase());
    const matchF = filter === "all" || m.type === filter;
    return matchS && matchF;
  });

  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const totalSize = MEDIA.reduce((acc, m) => {
    const n = parseFloat(m.size); const u = m.size.includes("MB") ? 1024 : 1;
    return acc + n * u;
  }, 0);

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Media Library" }]} />
        <PageHeader title="Media Library"
          description={`${MEDIA.length} files · ${(totalSize / 1024).toFixed(1)} MB total`}
          action={
            <Btn>
              <Upload className="w-4 h-4" /> Upload Files
            </Btn>
          }
        />

        {/* Upload drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); }}
          className={`rounded-xl border-2 border-dashed p-8 text-center mb-5 transition-all cursor-pointer ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Drop files here to upload</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, PDF, MP4 up to 50 MB</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
          </div>
          <div className="flex gap-1.5">
            {["all", "image", "document", "video"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${filter === f ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <Btn variant={view === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setView("grid")}><Grid className="w-4 h-4" /></Btn>
            <Btn variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")}><List className="w-4 h-4" /></Btn>
          </div>
          {selected.length > 0 && (
            <Btn variant="danger" size="sm"><Trash2 className="w-3.5 h-3.5" /> Delete ({selected.length})</Btn>
          )}
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map(m => {
              const Icon = typeIcon[m.type as keyof typeof typeIcon] || Image;
              return (
                <div key={m.id}
                  onClick={() => toggleSelect(m.id)}
                  className={`rounded-xl border overflow-hidden cursor-pointer transition-all group ${selected.includes(m.id) ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"}`}>
                  <div className="aspect-square flex items-center justify-center"
                    style={{ background: `${m.thumb}20` }}>
                    <Icon className="w-8 h-8 opacity-60" style={{ color: m.thumb }} />
                  </div>
                  <div className="p-2 bg-card border-t border-border">
                    <p className="text-[11px] font-medium text-foreground truncate">{m.name}</p>
                    <p className="text-[10px] text-muted-foreground">{m.size}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  {["", "Name", "Type", "Size", "Dimensions", "Used in", "Date", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {filtered.map(m => {
                  const Icon = typeIcon[m.type as keyof typeof typeIcon] || Image;
                  return (
                    <tr key={m.id} className={`hover:bg-muted/30 transition-colors cursor-pointer ${selected.includes(m.id) ? "bg-primary/5" : ""}`}
                      onClick={() => toggleSelect(m.id)}>
                      <td className="px-4 py-3">
                        <input type="checkbox" readOnly checked={selected.includes(m.id)}
                          className="rounded border-border" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${m.thumb}20` }}>
                            <Icon className="w-4 h-4" style={{ color: m.thumb }} />
                          </div>
                          <p className="font-medium text-foreground">{m.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">{m.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.size}</td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{m.dims}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.used} page{m.used !== 1 ? "s" : ""}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Btn variant="ghost" size="sm"><Copy className="w-3.5 h-3.5" /></Btn>
                          <Btn variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {MEDIA.length} files</p>
      </div>
    </Layout>
  );
}
