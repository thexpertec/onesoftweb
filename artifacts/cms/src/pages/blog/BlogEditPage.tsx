import { useState } from "react";
import { Link, useRoute } from "wouter";
import { Layout, Breadcrumb, Badge, Btn } from "@/components/Layout";
import {
  Save, Eye, Trash2, ChevronDown, Bold,
  Italic, List, Link2, Image, Heading2, Quote,
  AlignLeft, Undo, Redo, Globe, Calendar,
  User, Tag,
} from "lucide-react";

const INTERESTS = [
  "ERP & Business Software",
  "Digital Marketing",
  "AI & Automation",
  "Custom Software & Web",
];

const AUTHORS = ["Omar Farooq", "Aisha Malik", "Zain Ahmed", "Bilal Qureshi", "Fatima Khan", "Hamza Siddiqui"];

const SAMPLE = {
  title: "The Real ROI of ERP Software: What Businesses Actually Save",
  slug: "erp-roi-guide-2025",
  excerpt: "Most ERP vendors quote vague efficiency numbers. This guide breaks down the specific, measurable returns — in time, headcount, and cash — that businesses consistently see after a proper implementation.",
  category: "ERP & Business Software",
  author: "Omar Farooq",
  status: "published",
  date: "2025-05-12",
  tags: "ERP, ROI, Business Software, Automation",
  body: `Most ERP vendors quote vague efficiency numbers. This guide breaks down the specific, measurable returns businesses see.\n\n## Why ERP ROI is so hard to measure\n\nWhen businesses ask about ERP return on investment, vendors typically respond with one of two things: broad percentages ('up to 30% efficiency gain!') or cherry-picked case studies...\n\n## The four areas where ERP actually saves money\n\n### 1. Administrative time reduction\n\nThis is the most predictable saving. Manual data entry, cross-referencing spreadsheets, chasing colleagues for information — these tasks vanish when a single system holds everything.`,
};

export default function BlogEditPage() {
  const [, params] = useRoute("/blog/:id/edit");
  const isNew = params?.id === "new";
  const [form, setForm] = useState(isNew ? { title: "", slug: "", excerpt: "", category: INTERESTS[0], author: AUTHORS[0], status: "draft", date: "", tags: "", body: "" } : SAMPLE);
  const [saved, setSaved] = useState(false);

  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const toolbarBtns = [
    { icon: Undo, label: "Undo" }, { icon: Redo, label: "Redo" }, null,
    { icon: Heading2, label: "Heading" }, { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" }, null,
    { icon: List, label: "List" }, { icon: Quote, label: "Quote" },
    { icon: Link2, label: "Link" }, { icon: Image, label: "Image" },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Blog", href: "/blog" }, { label: isNew ? "New Post" : "Edit Post" }]} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-black text-foreground">{isNew ? "New Blog Post" : "Edit Post"}</h1>
            {!isNew && <Badge color="green" >published</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary"><Eye className="w-4 h-4" /> Preview</Btn>
            {!isNew && <Btn variant="danger" size="sm"><Trash2 className="w-3.5 h-3.5" /></Btn>}
            <Btn onClick={handleSave}>{saved ? "✓ Saved" : <><Save className="w-4 h-4" /> Save</>}</Btn>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <div className="bg-card rounded-xl border border-border p-4">
              <input value={form.title}
                onChange={e => { set("title")(e); if (isNew) setForm(f => ({ ...f, title: e.target.value, slug: autoSlug(e.target.value) })); }}
                className="w-full text-2xl font-black text-foreground bg-transparent outline-none placeholder:text-muted-foreground/40 border-none"
                placeholder="Post title…" />
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Slug:</span>
                <input value={form.slug} onChange={set("slug")}
                  className="text-xs text-primary bg-transparent outline-none border-b border-dashed border-primary/30 flex-1"
                  placeholder="post-slug-here" />
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-card rounded-xl border border-border p-4">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Excerpt</label>
              <textarea value={form.excerpt} onChange={set("excerpt")} rows={3}
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/40 resize-none"
                placeholder="A short summary shown in listings and meta descriptions…" />
            </div>

            {/* Body editor */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border flex-wrap">
                {toolbarBtns.map((btn, i) =>
                  btn === null
                    ? <div key={i} className="w-px h-5 bg-border mx-1" />
                    : <button key={i} title={btn.label}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                        <btn.icon className="w-3.5 h-3.5" />
                      </button>
                )}
              </div>
              <div className="p-4">
                <textarea value={form.body} onChange={set("body")} rows={20}
                  className="w-full bg-transparent outline-none text-sm text-foreground leading-relaxed resize-none font-mono placeholder:text-muted-foreground/40"
                  placeholder="Write your post in Markdown…&#10;&#10;## Heading&#10;&#10;Paragraph text here.&#10;&#10;- List item&#10;- Another item" />
              </div>
              <div className="px-4 py-2 border-t border-border bg-muted/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{form.body.split(/\s+/).filter(Boolean).length} words</span>
                <span className="text-xs text-muted-foreground">Markdown supported</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Publish */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">Publish</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
                  <div className="relative">
                    <select value={form.status} onChange={set("status")}
                      className="w-full appearance-none px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Publish Date</label>
                  <input type="date" value={form.date} onChange={set("date")}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
                </div>
                <Btn onClick={handleSave} className="w-full justify-center">
                  <Save className="w-4 h-4" /> {form.status === "published" ? "Update" : "Publish"}
                </Btn>
              </div>
            </div>

            {/* Category & Author */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">Details</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5"><Tag className="w-3 h-3" /> Category</label>
                  <div className="relative">
                    <select value={form.category} onChange={set("category")}
                      className="w-full appearance-none px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                      {INTERESTS.map(i => <option key={i}>{i}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5"><User className="w-3 h-3" /> Author</label>
                  <div className="relative">
                    <select value={form.author} onChange={set("author")}
                      className="w-full appearance-none px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                      {AUTHORS.map(a => <option key={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={set("tags")} placeholder="ERP, ROI, Business Software"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-sm font-bold text-foreground">SEO Preview</h3>
              </div>
              <div className="p-4">
                <div className="rounded-lg border border-border p-3 bg-muted/30 space-y-1">
                  <p className="text-xs text-blue-600 truncate">onesoft.org.uk/blog/{form.slug || "post-slug"}</p>
                  <p className="text-sm font-semibold text-blue-800 line-clamp-2">{form.title || "Post title"}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{form.excerpt || "Post excerpt will appear here…"}</p>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Title: {(form.title || "").length}/60 chars ·{" "}
                  Excerpt: {(form.excerpt || "").length}/160 chars
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
