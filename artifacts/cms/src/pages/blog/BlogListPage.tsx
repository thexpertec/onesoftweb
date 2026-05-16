import { useState } from "react";
import { Link } from "wouter";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import {
  Plus, Search, Edit2, Trash2, Eye,
  Tag, Hash, AlignLeft, Palette, Check,
  X, GripVertical, BarChart2,
} from "lucide-react";
import {
  INITIAL_CATEGORIES, COLOR_PALETTE,
  type BlogCategory,
} from "@/data/blogCategories";

/* ── Posts data ──────────────────────────────────────────── */
const POSTS = [
  { id: 1,  title: "The Real ROI of ERP Software: What Businesses Actually Save",         categoryId: "erp",       author: "Omar Farooq",     date: "12 May 2025", status: "published", views: 1240 },
  { id: 2,  title: "SEO in 2025: What Actually Moves the Needle",                          categoryId: "marketing", author: "Aisha Malik",     date: "5 May 2025",  status: "published", views: 893 },
  { id: 3,  title: "AI Automation in Business: Moving Beyond the Hype to Actual Results",  categoryId: "ai",        author: "Zain Ahmed",      date: "28 Apr 2025", status: "published", views: 1105 },
  { id: 4,  title: "Custom Software vs Off-the-Shelf: An Honest Guide",                    categoryId: "custom",    author: "Bilal Qureshi",   date: "21 Apr 2025", status: "published", views: 672 },
  { id: 5,  title: "Building a Social Media Strategy That Actually Generates Business",     categoryId: "marketing", author: "Fatima Khan",     date: "14 Apr 2025", status: "published", views: 541 },
  { id: 6,  title: "How Page Speed Directly Affects Your Conversion Rate",                  categoryId: "custom",    author: "Hamza Siddiqui",  date: "7 Apr 2025",  status: "published", views: 489 },
  { id: 7,  title: "How Al-Noor Academy Cut Administrative Workload by 45% in 8 Weeks",    categoryId: "erp",       author: "Omar Farooq",     date: "31 Mar 2025", status: "published", views: 780 },
  { id: 8,  title: "Ad Creative That Converts: What We've Learned from 400+ Campaigns",    categoryId: "marketing", author: "Fatima Khan",     date: "24 Mar 2025", status: "published", views: 612 },
  { id: 9,  title: "What Is an ERP System and Does Your Business Actually Need One?",       categoryId: "erp",       author: "Omar Farooq",     date: "17 Mar 2025", status: "published", views: 934 },
  { id: 10, title: "Cloud ERP vs On-Premise in 2025: What Actually Matters",               categoryId: "erp",       author: "Omar Farooq",     date: "—",           status: "draft",     views: 0 },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

/* ── Category form modal ─────────────────────────────────── */
function CategoryModal({
  initial,
  usedNames,
  onSave,
  onClose,
}: {
  initial?: BlogCategory;
  usedNames: string[];
  onSave: (cat: BlogCategory) => void;
  onClose: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<BlogCategory>(
    initial ?? {
      id: crypto.randomUUID().slice(0, 8),
      name: "",
      slug: "",
      description: "",
      color: COLOR_PALETTE[0],
      postCount: 0,
    }
  );
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [error, setError] = useState("");

  const set = (k: keyof BlogCategory) => (v: string) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleName = (v: string) => {
    setForm(f => ({
      ...f,
      name: v,
      slug: slugTouched ? f.slug : slugify(v),
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { setError("Name is required."); return; }
    const conflict = usedNames
      .filter(n => !isEdit || n !== initial?.name)
      .some(n => n.toLowerCase() === form.name.trim().toLowerCase());
    if (conflict) { setError("A category with this name already exists."); return; }
    onSave({ ...form, name: form.name.trim(), slug: form.slug || slugify(form.name) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-sm font-black text-foreground">
            {isEdit ? "Edit Category" : "New Category"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
              Category Name <span className="text-destructive">*</span>
            </label>
            <input
              value={form.name}
              onChange={e => handleName(e.target.value)}
              placeholder="e.g. ERP & Business Software"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3 h-3" /> Slug
            </label>
            <div className="flex items-center gap-0 rounded-lg border border-border overflow-hidden focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
              <span className="px-3 py-2.5 bg-muted text-xs text-muted-foreground border-r border-border shrink-0">/blog/</span>
              <input
                value={form.slug}
                onChange={e => { setSlugTouched(true); set("slug")(e.target.value); }}
                placeholder="category-slug"
                className="flex-1 px-3 py-2.5 bg-background text-sm outline-none font-mono"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="w-3 h-3" /> Description
            </label>
            <textarea
              value={form.description}
              onChange={e => set("description")(e.target.value)}
              rows={3}
              placeholder="Brief description of what this category covers…"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all resize-none"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Palette className="w-3 h-3" /> Colour
            </label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTE.map(c => (
                <button
                  key={c}
                  onClick={() => set("color")(c)}
                  className="w-7 h-7 rounded-full transition-all flex items-center justify-center ring-2 ring-offset-2 ring-offset-card"
                  style={{
                    background: c,
                    ringColor: form.color === c ? c : "transparent",
                  }}
                  title={c}
                >
                  {form.color === c && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* Preview pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Preview:</span>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: form.color }}
            >
              <Tag className="w-3 h-3" />
              {form.name || "Category Name"}
            </span>
          </div>

          {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        </div>

        <div className="px-5 py-4 border-t border-border flex gap-3">
          <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit} className="flex-1">
            <Check className="w-3.5 h-3.5" />
            {isEdit ? "Save Changes" : "Create Category"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Delete confirm ──────────────────────────────────────── */
function DeleteConfirm({
  category,
  onConfirm,
  onClose,
}: {
  category: BlogCategory;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
          <Trash2 className="w-5 h-5 text-destructive" />
        </div>
        <h3 className="text-sm font-black text-foreground mb-1">Delete "{category.name}"?</h3>
        <p className="text-sm text-muted-foreground mb-5">
          This category has <strong>{category.postCount} posts</strong>. Posts will become uncategorised but won't be deleted.
        </p>
        <div className="flex gap-3">
          <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
          <Btn variant="danger" onClick={onConfirm} className="flex-1">Delete Category</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Posts sub-tab ───────────────────────────────────────── */
function PostsTab({ categories }: { categories: BlogCategory[] }) {
  const [search, setSearch]   = useState("");
  const [catFilter, setCat]   = useState("all");
  const [statusFilter, setSt] = useState("all");

  const catMap = Object.fromEntries(categories.map(c => [c.id, c]));

  const filtered = POSTS.filter(p => {
    const matchS  = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchC  = catFilter === "all" || p.categoryId === catFilter;
    const matchSt = statusFilter === "all" || p.status === statusFilter;
    return matchS && matchC && matchSt;
  });

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <select
          value={catFilter}
          onChange={e => setCat(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all"
        >
          <option value="all">All categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setSt(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <Table headers={["Title", "Category", "Author", "Date", "Status", "Views", ""]}>
        {filtered.map(p => {
          const cat = catMap[p.categoryId];
          return (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <p className="text-sm font-semibold text-foreground line-clamp-1 max-w-xs">{p.title}</p>
              </td>
              <td className="px-4 py-3">
                {cat ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white"
                    style={{ background: cat.color }}
                  >
                    {cat.name}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground italic">Uncategorised</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-foreground">{p.author.split(" ")[0]}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-muted-foreground">{p.date}</span>
              </td>
              <td className="px-4 py-3">
                <Badge color={p.status === "published" ? "green" : "yellow"}>
                  {p.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {p.views.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  <Link href={`/blog/${p.id}/edit`}>
                    <Btn variant="ghost" size="sm"><Edit2 className="w-3.5 h-3.5" /></Btn>
                  </Link>
                  <Btn variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Btn>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
      <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {POSTS.length} posts</p>
    </>
  );
}

/* ── Categories sub-tab ──────────────────────────────────── */
function CategoriesTab({
  categories,
  onChange,
}: {
  categories: BlogCategory[];
  onChange: (cats: BlogCategory[]) => void;
}) {
  const [modalOpen, setModalOpen]         = useState(false);
  const [editing, setEditing]             = useState<BlogCategory | null>(null);
  const [deleting, setDeleting]           = useState<BlogCategory | null>(null);

  const handleSave = (cat: BlogCategory) => {
    if (editing) {
      onChange(categories.map(c => c.id === cat.id ? cat : c));
    } else {
      onChange([...categories, cat]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleting) {
      onChange(categories.filter(c => c.id !== deleting.id));
      setDeleting(null);
    }
  };

  const totalPosts = categories.reduce((a, c) => a + c.postCount, 0);

  return (
    <>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-2xl font-black text-foreground">{categories.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total categories</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-2xl font-black text-foreground">{totalPosts}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Categorised posts</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-2xl font-black text-foreground">
            {categories.length > 0
              ? Math.round(totalPosts / categories.length * 10) / 10
              : 0}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Avg posts / category</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-4 py-3">
          <p className="text-2xl font-black text-foreground">
            {categories.reduce((a, c) => c.postCount > a.postCount ? c : a, categories[0])?.name.split(" ")[0] ?? "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Most active category</p>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
          >
            {/* Color bar */}
            <div className="h-1.5 w-full" style={{ background: cat.color }} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: cat.color + "20" }}
                  >
                    <Tag className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{cat.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">/blog/{cat.slug}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(cat); setModalOpen(true); }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleting(cat)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {cat.description && (
                <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{cat.description}</p>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>
                    <strong className="text-foreground">{cat.postCount}</strong> post{cat.postCount !== 1 ? "s" : ""}
                  </span>
                </div>
                {/* Mini bar */}
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${totalPosts > 0 ? (cat.postCount / totalPosts) * 100 : 0}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add new card */}
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/30 transition-all min-h-[130px]"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">Add Category</span>
        </button>
      </div>
    </>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function BlogListPage() {
  const [subTab, setSubTab]     = useState<"posts" | "categories">("posts");
  const [categories, setCategories] = useState<BlogCategory[]>(INITIAL_CATEGORIES);
  const [catModalOpen, setCatModalOpen] = useState(false);

  const publishedCount = POSTS.filter(p => p.status === "published").length;
  const draftCount     = POSTS.filter(p => p.status === "draft").length;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <PageHeader
          title="Blog"
          description={`${publishedCount} published · ${draftCount} draft · ${categories.length} categories`}
          action={
            subTab === "posts"
              ? (
                <Link href="/blog/new">
                  <Btn><Plus className="w-4 h-4" /> New Post</Btn>
                </Link>
              )
              : (
                <Btn onClick={() => setCatModalOpen(true)}>
                  <Plus className="w-4 h-4" /> New Category
                </Btn>
              )
          }
        />

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {([
            { id: "posts",      label: "Posts",      count: POSTS.length },
            { id: "categories", label: "Categories", count: categories.length },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all ${
                subTab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.id === "posts" ? <Eye className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
              {t.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                subTab === t.id ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {subTab === "posts"      && <PostsTab categories={categories} />}
        {subTab === "categories" && <CategoriesTab categories={categories} onChange={setCategories} />}
      </div>

      {/* Category modal (from header button or add-card) */}
      {(catModalOpen) && (
        <CategoryModal
          usedNames={categories.map(c => c.name)}
          onSave={cat => {
            setCategories(prev => [...prev, cat]);
            setCatModalOpen(false);
          }}
          onClose={() => setCatModalOpen(false)}
        />
      )}
    </Layout>
  );
}
