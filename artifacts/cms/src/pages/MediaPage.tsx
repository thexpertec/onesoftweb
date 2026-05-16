import { useState, useEffect, useRef } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import {
  Upload, Search, Grid, List, Trash2, Copy,
  Image, FileText, Film, CheckCircle2, Loader2,
  Zap, X, TrendingDown, FileImage,
} from "lucide-react";

/* ── Media data ──────────────────────────────────────────── */
interface MediaItem {
  id: number;
  name: string;
  type: "image" | "document" | "video";
  size: string;           // display string e.g. "340 KB"
  sizeKB: number;         // numeric KB for calculations
  dims: string;
  used: number;
  date: string;
  thumb: string;
  webp?: boolean;         // has been converted
  savedKB?: number;       // KB saved by conversion
}

const INITIAL_MEDIA: MediaItem[] = [
  { id: 1,  name: "onesoft-logo.png",           type: "image",    size: "12 KB",   sizeKB: 12,    dims: "320×80",    used: 8, date: "10 May 2025", thumb: "#1E4DA0" },
  { id: 2,  name: "hero-dashboard.jpg",          type: "image",    size: "340 KB",  sizeKB: 340,   dims: "1280×720",  used: 2, date: "8 May 2025",  thumb: "#0891b2" },
  { id: 3,  name: "team-photo-hull.jpg",         type: "image",    size: "890 KB",  sizeKB: 890,   dims: "1920×1080", used: 1, date: "5 May 2025",  thumb: "#16a34a" },
  { id: 4,  name: "erp-dashboard-screenshot.png",type: "image",    size: "215 KB",  sizeKB: 215,   dims: "1440×900",  used: 5, date: "2 May 2025",  thumb: "#7c3aed" },
  { id: 5,  name: "school-erp-screenshot.png",   type: "image",    size: "198 KB",  sizeKB: 198,   dims: "1440×900",  used: 3, date: "28 Apr 2025", thumb: "#f97316" },
  { id: 6,  name: "hospital-erp-ui.png",         type: "image",    size: "231 KB",  sizeKB: 231,   dims: "1440×900",  used: 2, date: "25 Apr 2025", thumb: "#ec4899" },
  { id: 7,  name: "onesoft-overview.pdf",        type: "document", size: "1.2 MB",  sizeKB: 1229,  dims: "—",         used: 0, date: "20 Apr 2025", thumb: "#64748b" },
  { id: 8,  name: "sla-template.pdf",            type: "document", size: "240 KB",  sizeKB: 240,   dims: "—",         used: 1, date: "15 Apr 2025", thumb: "#64748b" },
  { id: 9,  name: "dubai-office.jpg",            type: "image",    size: "560 KB",  sizeKB: 560,   dims: "1920×1280", used: 2, date: "10 Apr 2025", thumb: "#0891b2" },
  { id: 10, name: "islamabad-office.jpg",        type: "image",    size: "480 KB",  sizeKB: 480,   dims: "1920×1280", used: 2, date: "10 Apr 2025", thumb: "#16a34a" },
  { id: 11, name: "intro-video.mp4",             type: "video",    size: "18.4 MB", sizeKB: 18841, dims: "1920×1080", used: 1, date: "5 Apr 2025",  thumb: "#1E4DA0" },
  { id: 12, name: "case-study-alnoor.jpg",       type: "image",    size: "320 KB",  sizeKB: 320,   dims: "1200×675",  used: 4, date: "1 Apr 2025",  thumb: "#7c3aed" },
];

/* WebP saving rate per format */
function savingsRate(name: string) {
  if (name.endsWith(".png")) return 0.42; // PNGs compress ~42%
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return 0.31;
  return 0;
}

function toWebpName(name: string) {
  return name.replace(/\.(png|jpg|jpeg)$/i, ".webp");
}

function fmtKB(kb: number) {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${Math.round(kb)} KB`;
}

const typeIcon = { image: Image, document: FileText, video: Film };

/* ── Conversion progress panel ───────────────────────────── */
type ConvState = "idle" | "converting" | "done";
interface ConvRow { id: number; name: string; status: "waiting" | "converting" | "done" }

function WebpPanel({
  items,
  onClose,
  onComplete,
}: {
  items: MediaItem[];
  onClose: () => void;
  onComplete: (ids: number[]) => void;
}) {
  const eligible = items.filter(m => m.type === "image" && !m.webp && savingsRate(m.name) > 0);
  const [rows, setRows] = useState<ConvRow[]>(
    eligible.map(m => ({ id: m.id, name: m.name, status: "waiting" }))
  );
  const [phase, setPhase] = useState<ConvState>("idle");
  const [currentIdx, setCurrentIdx] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSavedKB = eligible.reduce((acc, m) => acc + Math.round(m.sizeKB * savingsRate(m.name)), 0);

  function startConversion() {
    setPhase("converting");
    convertNext(0);
  }

  function convertNext(idx: number) {
    if (idx >= eligible.length) {
      setPhase("done");
      setCurrentIdx(-1);
      onComplete(eligible.map(m => m.id));
      return;
    }
    setCurrentIdx(idx);
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, status: "converting" } : r));
    timerRef.current = setTimeout(() => {
      setRows(prev => prev.map((r, i) => i === idx ? { ...r, status: "done" } : r));
      convertNext(idx + 1);
    }, 380 + Math.random() * 220);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const doneCount = rows.filter(r => r.status === "done").length;
  const progress = eligible.length > 0 ? (doneCount / eligible.length) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileImage className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Convert to WebP</p>
              <p className="text-[11px] text-muted-foreground">{eligible.length} images eligible</p>
            </div>
          </div>
          {phase !== "converting" && (
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Savings estimate */}
        {phase !== "done" && (
          <div className="mx-5 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15">
            <TrendingDown className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-foreground">
              Estimated savings: <span className="font-bold text-primary">{fmtKB(totalSavedKB)}</span>
              <span className="text-muted-foreground ml-1">across {eligible.length} images</span>
            </p>
          </div>
        )}

        {/* Progress bar */}
        {phase === "converting" && (
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Converting…</span>
              <span className="text-xs font-bold text-primary">{doneCount}/{eligible.length}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Done summary */}
        {phase === "done" && (
          <div className="mx-5 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-800">All images converted</p>
              <p className="text-xs text-green-700 mt-0.5">
                Saved <span className="font-bold">{fmtKB(totalSavedKB)}</span> — {eligible.length} files now in WebP format
              </p>
            </div>
          </div>
        )}

        {/* File list */}
        <div className="px-5 py-3 max-h-64 overflow-y-auto space-y-1 mt-2">
          {rows.map((row, i) => {
            const item = eligible.find(m => m.id === row.id)!;
            const saved = Math.round(item.sizeKB * savingsRate(item.name));
            return (
              <div
                key={row.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  row.status === "converting" ? "bg-primary/5" : "hover:bg-muted/30"
                }`}
              >
                {/* Status icon */}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {row.status === "waiting"    && <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/30" />}
                  {row.status === "converting" && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                  {row.status === "done"       && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate transition-all ${
                    row.status === "done" ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground"
                  }`}>{row.name}</p>
                  {row.status === "done" && (
                    <p className="text-[10px] text-green-600 font-medium">{toWebpName(row.name)}</p>
                  )}
                </div>
                {/* Sizes */}
                <div className="text-right shrink-0">
                  {row.status === "done" ? (
                    <div>
                      <p className="text-[10px] font-bold text-green-600">{fmtKB(item.sizeKB - saved)}</p>
                      <p className="text-[10px] text-green-500">−{fmtKB(saved)}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-border flex gap-3">
          {phase === "idle" && (
            <>
              <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
              <Btn variant="primary" onClick={startConversion} className="flex-1" disabled={eligible.length === 0}>
                <Zap className="w-3.5 h-3.5" /> Convert {eligible.length} Images
              </Btn>
            </>
          )}
          {phase === "converting" && (
            <Btn variant="secondary" className="flex-1" disabled>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Converting…
            </Btn>
          )}
          {phase === "done" && (
            <Btn variant="primary" onClick={onClose} className="flex-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Done
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [filter, setFilter]     = useState("all");
  const [selected, setSelected] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const [webpOpen, setWebpOpen] = useState(false);

  const filtered = media.filter(m => {
    const matchS = !search || m.name.toLowerCase().includes(search.toLowerCase());
    const matchF = filter === "all" || m.type === filter;
    return matchS && matchF;
  });

  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const toConvertCount = media.filter(
    m => m.type === "image" && !m.webp && savingsRate(m.name) > 0
  ).length;

  const handleConvertComplete = (ids: number[]) => {
    setMedia(prev =>
      prev.map(m => {
        if (!ids.includes(m.id)) return m;
        const rate = savingsRate(m.name);
        const savedKB = Math.round(m.sizeKB * rate);
        const newKB   = m.sizeKB - savedKB;
        return {
          ...m,
          webp: true,
          savedKB,
          name: toWebpName(m.name),
          sizeKB: newKB,
          size: fmtKB(newKB),
        };
      })
    );
  };

  const totalSizeKB = media.reduce((acc, m) => acc + m.sizeKB, 0);
  const totalSavedKB = media.reduce((acc, m) => acc + (m.savedKB ?? 0), 0);

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <PageHeader
          title="Media Library"
          description={`${media.length} files · ${fmtKB(totalSizeKB)} total${totalSavedKB > 0 ? ` · saved ${fmtKB(totalSavedKB)} via WebP` : ""}`}
          action={
            <div className="flex gap-2">
              {toConvertCount > 0 && (
                <button
                  onClick={() => setWebpOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold transition-all group"
                >
                  <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Convert to WebP
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
                    {toConvertCount}
                  </span>
                </button>
              )}
              {toConvertCount === 0 && totalSavedKB > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> All images in WebP
                </div>
              )}
              <Btn>
                <Upload className="w-4 h-4" /> Upload
              </Btn>
            </div>
          }
        />

        {/* Upload drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); }}
          className={`rounded-xl border-2 border-dashed p-8 text-center mb-5 transition-all cursor-pointer ${
            dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"
          }`}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Drop files here to upload</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, GIF, PDF, MP4 up to 50 MB</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "image", "document", "video"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                  filter === f
                    ? "bg-primary text-white border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <Btn variant={view === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setView("grid")}><Grid className="w-4 h-4" /></Btn>
            <Btn variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")}><List className="w-4 h-4" /></Btn>
          </div>
          {selected.length > 0 && (
            <Btn variant="danger" size="sm">
              <Trash2 className="w-3.5 h-3.5" /> Delete ({selected.length})
            </Btn>
          )}
        </div>

        {/* Grid view */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map(m => {
              const Icon = typeIcon[m.type];
              return (
                <div
                  key={m.id}
                  onClick={() => toggleSelect(m.id)}
                  className={`rounded-xl border overflow-hidden cursor-pointer transition-all group ${
                    selected.includes(m.id)
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="aspect-square flex items-center justify-center relative" style={{ background: `${m.thumb}20` }}>
                    <Icon className="w-8 h-8 opacity-60" style={{ color: m.thumb }} />
                    {m.webp && (
                      <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-500 text-white">
                        WebP
                      </span>
                    )}
                  </div>
                  <div className="p-2 bg-card border-t border-border">
                    <p className="text-[11px] font-medium text-foreground truncate">{m.name}</p>
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[10px] text-muted-foreground">{m.size}</p>
                      {m.savedKB && (
                        <p className="text-[9px] font-bold text-green-600">−{fmtKB(m.savedKB)}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List view */
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
                  const Icon = typeIcon[m.type];
                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-muted/30 transition-colors cursor-pointer ${selected.includes(m.id) ? "bg-primary/5" : ""}`}
                      onClick={() => toggleSelect(m.id)}
                    >
                      <td className="px-4 py-3">
                        <input type="checkbox" readOnly checked={selected.includes(m.id)} className="rounded border-border" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative" style={{ background: `${m.thumb}20` }}>
                            <Icon className="w-4 h-4" style={{ color: m.thumb }} />
                            {m.webp && (
                              <span className="absolute -top-1 -right-1 text-[8px] font-bold px-1 py-px rounded-full bg-green-500 text-white leading-none">
                                W
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{m.name}</p>
                            {m.webp && <p className="text-[10px] text-green-600 font-medium">WebP · converted</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">{m.type}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-muted-foreground">{m.size}</p>
                          {m.savedKB && (
                            <p className="text-[10px] text-green-600 font-semibold">−{fmtKB(m.savedKB)}</p>
                          )}
                        </div>
                      </td>
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

        <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {media.length} files</p>
      </div>

      {/* WebP conversion modal */}
      {webpOpen && (
        <WebpPanel
          items={media}
          onClose={() => setWebpOpen(false)}
          onComplete={ids => { handleConvertComplete(ids); }}
        />
      )}
    </Layout>
  );
}
