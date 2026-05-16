import { useState } from "react";
import { Link } from "wouter";
import { Layout, PageHeader, Badge, Btn, Table, Breadcrumb } from "@/components/Layout";
import { Plus, Search, Edit2, Trash2, Eye, MoreHorizontal } from "lucide-react";

const posts = [
  { id: 1, title: "The Real ROI of ERP Software: What Businesses Actually Save", category: "ERP & Business Software", author: "Omar Farooq", date: "12 May 2025", status: "published", views: 1240 },
  { id: 2, title: "SEO in 2025: What Actually Moves the Needle", category: "Digital Marketing", author: "Aisha Malik", date: "5 May 2025", status: "published", views: 893 },
  { id: 3, title: "AI Automation in Business: Moving Beyond the Hype to Actual Results", category: "AI & Automation", author: "Zain Ahmed", date: "28 Apr 2025", status: "published", views: 1105 },
  { id: 4, title: "Custom Software vs Off-the-Shelf: An Honest Guide", category: "Custom Software & Web", author: "Bilal Qureshi", date: "21 Apr 2025", status: "published", views: 672 },
  { id: 5, title: "Building a Social Media Strategy That Actually Generates Business", category: "Digital Marketing", author: "Fatima Khan", date: "14 Apr 2025", status: "published", views: 541 },
  { id: 6, title: "How Page Speed Directly Affects Your Conversion Rate", category: "Custom Software & Web", author: "Hamza Siddiqui", date: "7 Apr 2025", status: "published", views: 489 },
  { id: 7, title: "How Al-Noor Academy Cut Administrative Workload by 45% in 8 Weeks", category: "ERP & Business Software", author: "Omar Farooq", date: "31 Mar 2025", status: "published", views: 780 },
  { id: 8, title: "Ad Creative That Converts: What We've Learned from 400+ Campaigns", category: "Digital Marketing", author: "Fatima Khan", date: "24 Mar 2025", status: "published", views: 612 },
  { id: 9, title: "What Is an ERP System and Does Your Business Actually Need One?", category: "ERP & Business Software", author: "Omar Farooq", date: "17 Mar 2025", status: "published", views: 934 },
  { id: 10, title: "Cloud ERP vs On-Premise in 2025: What Actually Matters", category: "ERP & Business Software", author: "Omar Farooq", date: "—", status: "draft", views: 0 },
];

const categories = ["All", "ERP & Business Software", "Digital Marketing", "AI & Automation", "Custom Software & Web"];

export default function BlogListPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [status, setStatus] = useState("all");

  const filtered = posts.filter(p => {
    const matchS = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchC = cat === "All" || p.category === cat;
    const matchSt = status === "all" || p.status === status;
    return matchS && matchC && matchSt;
  });

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Blog" }]} />
        <PageHeader
          title="Blog"
          description={`${posts.filter(p => p.status === "published").length} published · ${posts.filter(p => p.status === "draft").length} draft`}
          action={
            <Link href="/blog/new">
              <Btn><Plus className="w-4 h-4" /> New Post</Btn>
            </Link>
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <Table headers={["Title", "Category", "Author", "Date", "Status", "Views", ""]}>
          {filtered.map(p => (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <p className="text-sm font-semibold text-foreground line-clamp-1 max-w-xs">{p.title}</p>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs text-muted-foreground">{p.category}</span>
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
          ))}
        </Table>
        <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {posts.length} posts</p>
      </div>
    </Layout>
  );
}
