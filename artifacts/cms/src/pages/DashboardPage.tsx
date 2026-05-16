import { Layout, PageHeader, Badge } from "@/components/Layout";
import { Link } from "wouter";
import {
  FileText, Package, Wrench, BookOpen,
  Users, Briefcase, Eye, TrendingUp,
  ArrowRight, Clock, AlertCircle, CheckCircle2,
  Image, Globe,
} from "lucide-react";

const stats = [
  { label: "Blog Posts",     value: "9",  sub: "+1 this month",  icon: FileText,  color: "#1E4DA0", href: "/blog" },
  { label: "ERP Products",   value: "12", sub: "7 active",        icon: Package,   color: "#0891b2", href: "/products" },
  { label: "Team Members",   value: "12", sub: "3 offices",       icon: Users,     color: "#16a34a", href: "/team" },
  { label: "Open Roles",     value: "10", sub: "4 departments",   icon: Briefcase, color: "#7c3aed", href: "/careers" },
  { label: "Case Studies",   value: "8",  sub: "3 categories",    icon: BookOpen,  color: "#f97316", href: "/case-studies" },
  { label: "Services",       value: "6",  sub: "All active",      icon: Wrench,    color: "#ec4899", href: "/services" },
];

const recentActivity = [
  { action: "Blog post published",    item: "The Real ROI of ERP Software",       who: "Omar Farooq",   time: "12 May",  status: "published" },
  { action: "Case study updated",     item: "Al-Noor Academy — School ERP",       who: "Sarah Mitchell", time: "10 May",  status: "published" },
  { action: "New job listing added",  item: "Senior React Developer",             who: "Bilal Qureshi",  time: "9 May",   status: "published" },
  { action: "Blog post drafted",      item: "Cloud ERP vs On-Premise in 2025",    who: "Omar Farooq",   time: "8 May",   status: "draft" },
  { action: "Team member added",      item: "Hamza Siddiqui — Lead Web Developer",who: "Sarah Mitchell", time: "5 May",   status: "published" },
  { action: "Service page updated",   item: "AI & Automation",                    who: "Zain Ahmed",     time: "2 May",   status: "published" },
];

const quickActions = [
  { label: "New blog post",     href: "/blog/new",         icon: FileText  },
  { label: "New case study",    href: "/case-studies/new", icon: BookOpen  },
  { label: "Add team member",   href: "/team/new",         icon: Users     },
  { label: "Post a job",        href: "/careers/new",      icon: Briefcase },
];

const siteHealth = [
  { label: "SEO meta tags",        ok: true  },
  { label: "All pages have images",ok: false },
  { label: "Contact details set",  ok: true  },
  { label: "Privacy policy live",  ok: true  },
  { label: "SSL certificate",      ok: true  },
  { label: "Sitemap up to date",   ok: false },
];

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <PageHeader
          title="Dashboard"
          description="Welcome back, Sarah. Here's what's happening on the site."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
          {stats.map(s => (
            <Link key={s.label} href={s.href}>
              <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}28` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-black text-foreground">{s.value}</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent activity */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Recent Activity</h2>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${a.status === "published" ? "bg-green-500" : "bg-yellow-500"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">{a.action}</p>
                    <p className="text-sm font-semibold text-foreground truncate">{a.item}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">{a.who.split(" ")[0]}</p>
                    <p className="text-[11px] text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="px-4 py-3.5 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">Quick Actions</h2>
              </div>
              <div className="p-3 space-y-1">
                {quickActions.map(a => (
                  <Link key={a.label} href={a.href}>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "#1E4DA015" }}>
                        <a.icon className="w-3.5 h-3.5" style={{ color: "#1E4DA0" }} />
                      </div>
                      <span className="text-sm font-medium text-foreground flex-1">{a.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Site health */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">Site Health</h2>
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="p-3 space-y-1">
                {siteHealth.map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 px-3 py-2">
                    {item.ok
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      : <AlertCircle className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    }
                    <span className={`text-xs ${item.ok ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
