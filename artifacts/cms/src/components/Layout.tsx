import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, FileText, Package, Wrench,
  BookOpen, Users, Briefcase, FileStack,
  Image, Settings, ChevronDown, LogOut,
  Menu, X, Bell, ExternalLink, ChevronRight,
  Star, MessageSquare, Building2,
} from "lucide-react";

const BLUE = "#1E4DA0";

const navSections = [
  {
    label: "Content",
    items: [
      { path: "/",             icon: LayoutDashboard, label: "Dashboard" },
      { path: "/blog",         icon: FileText,        label: "Blog",         count: 9 },
      { path: "/case-studies", icon: BookOpen,        label: "Case Studies", count: 8 },
    ],
  },
  {
    label: "Homepage Sections",
    items: [
      { path: "/testimonials", icon: Star,           label: "Testimonials", count: 5 },
      { path: "/faqs",         icon: MessageSquare,  label: "FAQs",         count: 10 },
      { path: "/clients",      icon: Building2,      label: "Clients & Logos", count: 32 },
    ],
  },
  {
    label: "Products & Services",
    items: [
      { path: "/products", icon: Package, label: "ERP Products", count: 12 },
      { path: "/services", icon: Wrench,  label: "Services",     count: 6 },
    ],
  },
  {
    label: "Company",
    items: [
      { path: "/team",    icon: Users,     label: "Team",    count: 12 },
      { path: "/careers", icon: Briefcase, label: "Careers", count: 10 },
    ],
  },
  {
    label: "Site",
    items: [
      { path: "/pages",    icon: FileStack, label: "Pages" },
      { path: "/media",    icon: Image,     label: "Media Library" },
      { path: "/settings", icon: Settings,  label: "Settings" },
    ],
  },
];

function NavItem({ path, icon: Icon, label, count }: { path: string; icon: any; label: string; count?: number }) {
  const [location] = useLocation();
  const active = location === path || (path !== "/" && location.startsWith(path));
  return (
    <Link href={path}>
      <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all group ${
        active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60"
      }`}>
        <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80"}`} />
        <span className={`text-sm font-medium flex-1 transition-colors ${active ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"}`}>
          {label}
        </span>
        {count !== undefined && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${active ? "bg-sidebar-primary/20 text-sidebar-primary" : "bg-sidebar-accent text-sidebar-foreground/40"}`}>
            {count}
          </span>
        )}
        {active && <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary shrink-0" />}
      </div>
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => { logout(); setLocation("/login"); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: BLUE }}>
            <span className="text-white font-black text-sm">O</span>
          </div>
          <div>
            <p className="font-black text-sidebar-foreground text-sm leading-none">OneSoft</p>
            <p className="text-[10px] text-sidebar-foreground/40 font-medium mt-0.5">Content Management</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {navSections.map(section => (
          <div key={section.label}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/30 px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => <NavItem key={item.path} {...item} />)}
            </div>
          </div>
        ))}
      </nav>

      {/* Live site link */}
      <div className="px-3 pb-3">
        <a href="https://onesoft.org.uk" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-sidebar-accent/60 transition-all group">
          <ExternalLink className="w-4 h-4 text-sidebar-foreground/30 group-hover:text-sidebar-foreground/60" />
          <span className="text-xs text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70 transition-colors">
            View live site
          </span>
        </a>
      </div>

      {/* User */}
      <div className="px-3 pb-4 border-t border-sidebar-border pt-3 relative">
        <button onClick={() => setUserMenuOpen(v => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-sidebar-accent/60 transition-all">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0"
            style={{ background: BLUE }}>
            {user?.avatar}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-sidebar-foreground/40">{user?.role}</p>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-sidebar-foreground/30 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
        </button>
        {userMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
            <div className="px-3 py-2.5 border-b border-border">
              <p className="text-xs font-semibold text-foreground">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/8 transition-colors">
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
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border"
        style={{ background: "hsl(222 47% 11%)" }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 flex flex-col border-r border-border z-10"
            style={{ background: "hsl(222 47% 11%)" }}>
            <button onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-sidebar-foreground/50 hover:text-sidebar-foreground">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-5 border-b border-border bg-card shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <a href="/" target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
              <ExternalLink className="w-3.5 h-3.5" /> Live Site
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Shared page scaffolding ─────────────────────────────── */
export function PageHeader({ title, description, action }: {
  title: string; description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-black text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, color = "default" }: { children: React.ReactNode; color?: "default" | "green" | "yellow" | "red" | "blue" }) {
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

export function Btn({ children, variant = "primary", size = "md", onClick, type = "button", disabled, className = "" }: {
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
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              {headers.map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
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

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
          {item.href
            ? <Link href={item.href}><span className="hover:text-foreground transition-colors cursor-pointer">{item.label}</span></Link>
            : <span className={i === items.length - 1 ? "text-foreground font-medium" : ""}>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}
