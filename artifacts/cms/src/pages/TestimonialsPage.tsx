import { useState } from "react";
import { Layout, PageHeader, Badge, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, Star, GripVertical } from "lucide-react";

const INITIAL = [
  {
    id: 1,
    quote: "We were drowning in paper-based patient records and manual billing. OneSoft's Hospital ERP brought everything — OPD, pharmacy, lab — into one screen. Our billing errors dropped from dozens a day to almost zero in the first week.",
    author: "Dr. Adil Rehman",
    role: "Chief Medical Officer",
    company: "Al-Noor Hospital, Dubai",
    flag: "🇦🇪",
    product: "Hospital ERP",
    rating: 5,
    status: "published",
    page: "Home",
  },
  {
    id: 2,
    quote: "We run 4 branches of our school network on the same system now. Fee collection, attendance, results, timetabling — it's all automated. The admin team went from overworked to actually having time to focus on students.",
    author: "Mrs. Fatima Akhtar",
    role: "Principal & Director",
    company: "Beacon Public School, Lahore",
    flag: "🇵🇰",
    product: "School ERP",
    rating: 5,
    status: "published",
    page: "Home",
  },
  {
    id: 3,
    quote: "We distribute to over 200 retailers across the region. Before OneSoft, stock reconciliation alone took two people two days a month. Now it's a 10-minute report. The system paid for itself in the first quarter.",
    author: "Tom Ashworth",
    role: "Operations Director",
    company: "Northern Star Distribution, Toronto, Canada",
    flag: "🇨🇦",
    product: "Distributor ERP",
    rating: 5,
    status: "published",
    page: "Home",
  },
  {
    id: 4,
    quote: "The restaurant POS and kitchen display integration cut our order errors by 80%. Staff adapted in two days. Revenue is up because we're turning tables faster.",
    author: "Khalid Al-Mansouri",
    role: "Managing Director",
    company: "Al Diyafa Group, Dubai",
    flag: "🇦🇪",
    product: "Restaurant ERP",
    rating: 5,
    status: "draft",
    page: "Restaurant ERP",
  },
  {
    id: 5,
    quote: "OneSites built our e-commerce site in 9 days — responsive, fast, and integrated with our warehouse. Conversion rate improved immediately. Highly recommended.",
    author: "Priya Sharma",
    role: "Head of E-commerce",
    company: "Velvet Collective, London",
    flag: "🇬🇧",
    product: "OneSites / E-commerce",
    rating: 5,
    status: "draft",
    page: "OneSites",
  },
];

const PRODUCTS = [
  "Hospital ERP", "School ERP", "Accounting ERP", "Distributor ERP",
  "Restaurant ERP", "E-commerce ERP", "Shadi Hall ERP",
  "OneSites / Web Dev", "Custom Software", "AI & Automation",
  "SEO", "Social Media", "Ad Creatives", "General",
];

const PAGES = ["Home", "Hospital ERP", "School ERP", "Restaurant ERP", "OneSites", "Case Studies", "About"];

type Testimonial = typeof INITIAL[0];

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`w-4 h-4 ${n <= value ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} ${onChange ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={() => onChange?.(n)}
        />
      ))}
    </div>
  );
}

function EditModal({ item, onClose }: { item: Testimonial; onClose: () => void }) {
  const [form, setForm] = useState({ ...item });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold text-foreground">Edit Testimonial</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Quote */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Quote</label>
            <textarea value={form.quote} onChange={set("quote")} rows={5}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.quote.length} characters</p>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-2 gap-3">
            {[["Author Name", "author"], ["Role / Title", "role"]].map(([label, key]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
                <input value={(form as any)[key]} onChange={set(key)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Company</label>
              <input value={form.company} onChange={set("company")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Country Flag</label>
              <input value={form.flag} onChange={set("flag")} maxLength={4}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-2xl outline-none focus:border-primary/50 text-center" />
            </div>
          </div>

          {/* Product, Page, Status */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Related Product</label>
              <select value={form.product} onChange={set("product")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                {PRODUCTS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Show On Page</label>
              <select value={form.page} onChange={set("page")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                {PAGES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
              <select value={form.status} onChange={set("status")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">Star Rating</label>
            <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
          </div>

          {/* Author photo upload */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Author Photo</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-lg">
                {form.flag}
              </div>
              <Btn variant="secondary" size="sm">Upload Photo</Btn>
              <span className="text-xs text-muted-foreground">Recommended: 120×120px</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30 shrink-0">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Changes</Btn>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = items.filter(t => filter === "all" || t.status === filter);

  const deleteItem = (id: number) => setItems(its => its.filter(i => i.id !== id));

  return (
    <Layout>
      {editing && <EditModal item={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Testimonials" }]} />
        <PageHeader
          title="Testimonials"
          description={`${items.filter(t => t.status === "published").length} published · ${items.filter(t => t.status === "draft").length} draft`}
          action={
            <Btn onClick={() => setEditing({ id: Date.now(), quote: "", author: "", role: "", company: "", flag: "🌍", product: "General", rating: 5, status: "draft", page: "Home" })}>
              <Plus className="w-4 h-4" /> Add Testimonial
            </Btn>
          }
        />

        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-5">
          {["all", "published", "draft"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${filter === f ? "bg-primary text-white border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>
              {f === "all" ? `All (${items.length})` : `${f} (${items.filter(t => t.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Info banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 shrink-0">
            <span className="text-primary text-xs font-bold">i</span>
          </div>
          <p className="text-xs text-foreground leading-relaxed">
            Published testimonials appear on the corresponding site pages. The three "Home" testimonials display in order on the homepage. Drag to reorder (coming soon). Photo upload is connected to the Media Library.
          </p>
        </div>

        <div className="space-y-3">
          {filtered.map(t => (
            <div key={t.id} className="bg-card rounded-xl border border-border p-5 flex gap-4 group hover:border-primary/30 transition-all">
              {/* Drag handle */}
              <div className="flex items-start pt-1">
                <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab" />
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-lg shrink-0 mt-0.5">
                {t.flag}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <p className="text-sm font-bold text-foreground">{t.author}</p>
                  <span className="text-xs text-muted-foreground">·</span>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <span className="text-xs text-muted-foreground">·</span>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
                <StarRating value={t.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2 italic">"{t.quote}"</p>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <Badge color="blue">{t.product}</Badge>
                  <span className="text-[11px] text-muted-foreground">Shows on: <span className="font-medium text-foreground">{t.page}</span></span>
                  <Badge color={t.status === "published" ? "green" : "yellow"}>{t.status}</Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Btn variant="ghost" size="sm" onClick={() => setEditing(t)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                <Btn variant="ghost" size="sm" onClick={() => deleteItem(t.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Star className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No testimonials in this filter.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
