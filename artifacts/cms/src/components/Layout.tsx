import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, FileText, Package,
  BookOpen, Users, Briefcase, FileStack,
  Image, Settings, LogOut, Bell, ExternalLink,
  Menu, X, ChevronDown, ChevronRight, Home, Globe,
  Star, MessageSquare, Building2, ListChecks, Grid3X3, Bot, Wrench,
} from "lucide-react";

const BLUE = "#1E4DA0";

/* ── Module + tab structure ─────────────────────────────── */
const modules = [
  {
    id: "content",
    label: "Content",
    icon: LayoutDashboard,
    items: [
      { path: "/",             label: "Dashboard" },
      { path: "/blog",         label: "Blog",          count: 9 },
      { path: "/case-studies", label: "Case Studies",  count: 8 },
    ],
  },
  {
    id: "homepage",
    label: "Homepage",
    icon: Home,
    items: [
      { path: "/testimonials",      label: "Testimonials",    count: 5 },
      { path: "/faqs",              label: "FAQs",            count: 10 },
      { path: "/clients",           label: "Clients & Logos", count: 32 },
      { path: "/process",           label: "How We Work",     count: 4 },
      { path: "/homepage-services", label: "Services Grid",   count: 11 },
      { path: "/ai-automation-cms",   label: "AI & Automation",     count: 6  },
      { path: "/tech-stack",          label: "Tech Stack",          count: 30 },
      { path: "/feature-highlights",  label: "Feature Highlights",  count: 33 },
    ],
  },
  {
    id: "products",
    label: "Products & Services",
    icon: Package,
    items: [
      { path: "/products",          label: "ERP Products",            count: 12 },
      { path: "/services",          label: "Services",                count: 6  },
      { path: "/web-development",   label: "↳ Web Dev Page",          count: 9  },
      { path: "/custom-software",   label: "↳ Custom Software Page",  count: 9  },
      { path: "/ai-automation-svc", label: "↳ AI & Automation Page",  count: 9  },
    ],
  },
  {
    id: "company",
    label: "Company",
    icon: Users,
    items: [
      { path: "/team",    label: "Team",    count: 16 },
      { path: "/careers", label: "Careers", count: 10 },
    ],
  },
  {
    id: "site",
    label: "Site",
    icon: Globe,
    items: [
      { path: "/pages",    label: "Pages" },
      { path: "/media",    label: "Media Library" },
      { path: "/settings", label: "Settings" },
      { path: "/roles",    label: "Roles & Permissions" },
    ],
  },
];

function getActiveModule(location: string) {
  return (
    modules.find(m =>
      m.items.some(item =>
        item.path === location ||
        (item.path !== "/" && location.startsWith(item.path))
      )
    ) || modules[0]
  );
}

function getActiveTab(location: string, items: typeof modules[0]["items"]) {
  return (
    items.find(item =>
      item.path === location ||
      (item.path !== "/" && location.startsWith(item.path))
    ) || items[0]
  );
}

/* ── Sidebar module button ───────────────────────────────── */
function ModuleBtn({
  mod,
  active,
  onClick,
}: {
  mod: typeof modules[0];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = mod.icon;
  return (
    <Link href={mod.items[0].path}>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all group ${
          active
            ? "bg-white/[0.12] text-white"
            : "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
        }`}
      >
        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${
            active ? "text-white" : "text-white/40 group-hover:text-white/70"
          }`}
        />
        <span className="text-sm font-medium leading-tight">{mod.label}</span>
        {active && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4FC6FF] shrink-0" />
        )}
      </button>
    </Link>
  );
}

/* ── Main layout ─────────────────────────────────────────── */
export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => { logout(); setLocation("/login"); };

  const activeMod = getActiveModule(location);
  const activeTab = getActiveTab(location, activeMod.items);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: BLUE }}
          >
            <span className="text-white font-black text-sm">O</span>
          </div>
          <div>
            <p className="font-black text-white text-sm leading-none">OneSoft</p>
            <p className="text-[10px] text-white/30 font-medium mt-0.5">CMS Admin</p>
          </div>
        </div>
      </div>

      {/* Module list */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 px-4 mb-3">
          Modules
        </p>
        {modules.map(mod => (
          <ModuleBtn
            key={mod.id}
            mod={mod}
            active={activeMod.id === mod.id}
            onClick={() => setSidebarOpen(false)}
          />
        ))}
      </nav>

      {/* Live site */}
      <div className="px-3 pb-3">
        <a
          href="https://onesoft.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2 rounded-xl hover:bg-white/[0.06] transition-all group"
        >
          <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
          <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors">
            View live site
          </span>
        </a>
      </div>

      {/* User */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3 relative">
        <button
          onClick={() => setUserMenuOpen(v => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-all"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0"
            style={{ background: BLUE }}
          >
            {user?.avatar}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold text-white/80 truncate">{user?.name}</p>
            <p className="text-[10px] text-white/30">{user?.role}</p>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-white/20 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
          />
        </button>
        {userMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
            <div className="px-3 py-2.5 border-b border-border">
              <p className="text-xs font-semibold text-foreground">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/8 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-52 shrink-0 border-r border-white/10"
        style={{ background: "hsl(222 47% 11%)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative w-52 flex flex-col border-r border-white/10 z-10"
            style={{ background: "hsl(222 47% 11%)" }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Top header ─────────────────────────────────── */}
        <header className="h-12 flex items-center justify-between px-5 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Module label (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <activeMod.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{activeMod.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Site
            </a>
          </div>
        </header>

        {/* ── Horizontal tab bar ─────────────────────────── */}
        <div className="border-b border-border bg-card shrink-0">
          <div className="flex overflow-x-auto scrollbar-none px-5">
            {activeMod.items.map(item => {
              const isActive =
                item.path === activeTab.path ||
                (item.path !== "/" && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Page content ───────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Shared page scaffolding ─────────────────────────────── */
export function PageHeader({
  title, description, action,
}: {
  title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-black text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children, color = "default",
}: {
  children: React.ReactNode;
  color?: "default" | "green" | "yellow" | "red" | "blue";
}) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    green:   "bg-green-100 text-green-700",
    yellow:  "bg-yellow-100 text-yellow-700",
    red:     "bg-red-100 text-red-700",
    blue:    "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${styles[color]}`}>
      {children}
    </span>
  );
}

export function Btn({
  children, variant = "primary", size = "md",
  onClick, type = "button", disabled, className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base = "inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all disabled:opacity-50";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm" };
  const variants = {
    primary:   "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    ghost:     "hover:bg-accent text-muted-foreground hover:text-foreground",
    danger:    "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Table({
  headers, children,
}: {
  headers: string[]; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              {headers.map(h => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Breadcrumb kept for backward compat but renders nothing */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return null;
}
