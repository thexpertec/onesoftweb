import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "wouter";
import {
  Menu, Zap, ChevronDown, X,
  GraduationCap, Stethoscope, UtensilsCrossed, ShoppingCart, Package, Building2,
  Palette, Globe, ShoppingBag, Webhook, Code2, Users, LayoutDashboard,
  Wrench, BrainCircuit, Megaphone, SearchCheck, ImagePlay,
  ArrowRight, Sparkles, Phone,
  Pill, Hotel, Home, Dumbbell, Shirt, Truck, Calculator, Heart,
  MonitorSmartphone, Bot, Brush, TrendingUp, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCTAModal } from "@/context/CTAModalContext";

/* ─── Data ─────────────────────────────────────────────────── */

const erpProducts = [
  { icon: GraduationCap,   label: "School ERP",              desc: "Admissions, fees, timetables & results",  color: "#1a69c4", href: "/school" },
  { icon: Stethoscope,     label: "Hospital ERP",             desc: "OPD, IPD, pharmacy & lab management",     color: "#1a69c4", href: "/hospital" },
  { icon: UtensilsCrossed, label: "Restaurant ERP",           desc: "POS, kitchen display, menu & delivery",   color: "#ea580c", href: "/restaurant" },
  { icon: ShoppingCart,    label: "E-commerce ERP",           desc: "Inventory, orders & multi-channel sales", color: "#7c3aed", href: "/ecommerce" },
  { icon: Package,         label: "Wholesaler / Distributor", desc: "Stock, invoicing & supply chain",         color: "#0891b2", href: "/distributor" },
  { icon: Heart,           label: "Shadi Hall ERP",           desc: "Bookings, catering, billing & vendors",   color: "#db2777", href: "/shadi-hall" },
  { icon: Calculator,      label: "Accounting & Bookkeeping", desc: "Double-entry, HRM, inventory & payroll",  color: "#10b981", href: "/accounting" },
];

const themeProducts = [
  { icon: Palette, label: "OneSites",  desc: "Custom websites built for any business", color: "#1a69c4", href: "/onethemes" },
];

const allServices = [
  {
    icon: MonitorSmartphone,
    label: "Website Development",
    desc: "Fast, modern websites built to convert",
    tags: ["React & Next.js", "WordPress", "Landing Pages"],
    color: "#2563eb",
    grad: "from-blue-600/20 to-blue-500/5",
    border: "border-blue-500/20",
    href: "#services",
  },
  {
    icon: Code2,
    label: "Custom Software",
    desc: "Bespoke desktop & web applications",
    tags: ["Web Apps", "Desktop Apps", "API Integration"],
    color: "#7c3aed",
    grad: "from-violet-600/20 to-violet-500/5",
    border: "border-violet-500/20",
    href: "#services",
  },
  {
    icon: Bot,
    label: "AI Automation",
    desc: "Intelligent workflows that work for you",
    tags: ["Chatbots", "RAG Pipelines", "Predictive AI"],
    color: "#8b5cf6",
    grad: "from-purple-600/20 to-fuchsia-500/5",
    border: "border-purple-500/20",
    href: "#ai-automation",
    badge: "New",
  },
  {
    icon: Brush,
    label: "Ad Creatives",
    desc: "High-conversion visuals & video ads",
    tags: ["Google Ads", "Meta Ads", "Video Creatives"],
    color: "#f97316",
    grad: "from-orange-600/20 to-orange-500/5",
    border: "border-orange-500/20",
    href: "#services",
  },
  {
    icon: Megaphone,
    label: "Social Media Marketing",
    desc: "Grow your audience across every platform",
    tags: ["Instagram", "LinkedIn", "TikTok & X"],
    color: "#e11d48",
    grad: "from-rose-600/20 to-pink-500/5",
    border: "border-rose-500/20",
    href: "#services",
  },
  {
    icon: BarChart3,
    label: "SEO Optimization",
    desc: "Rank higher and drive organic traffic",
    tags: ["Technical SEO", "On-page", "Link Building"],
    color: "#10b981",
    grad: "from-emerald-600/20 to-teal-500/5",
    border: "border-emerald-500/20",
    href: "#services",
  },
];

/* ─── Mega menu panel content ───────────────────────────────── */

function ProductsMega({ close }: { close: () => void }) {
  const { openCTAModal } = useCTAModal();
  return (
    <div className="grid grid-cols-[1fr_200px] gap-0 min-w-[640px] max-h-[calc(100vh-90px)] overflow-y-auto">
      {/* Left: ERP + Themes */}
      <div className="p-4 border-r border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">ERP Systems</p>
        <div className="grid grid-cols-2 gap-1 mb-3">
          {erpProducts.map(p => (
            <a key={p.label} href={p.href} onClick={close}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${p.color}18`, border: `1px solid ${p.color}35` }}>
                <p.icon className="w-4 h-4" style={{ color: p.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 group-hover:text-gray-900 leading-tight truncate">{p.label}</p>
                <p className="text-[11px] text-gray-400 leading-tight truncate">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="h-px bg-gray-100 mb-2" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Website Products</p>
        {themeProducts.map(p => (
          <a key={p.label} href={p.href} onClick={close}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}28` }}>
              <p.icon className="w-3.5 h-3.5" style={{ color: p.color }} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-800 group-hover:text-gray-900 leading-tight">{p.label}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <div className="p-4 flex flex-col justify-between bg-gray-50">
        <div>
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">See it in action</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Book a free 30-minute demo of any ERP module — live, no slides.
          </p>
        </div>
        <button onClick={() => { close(); openCTAModal(); }}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          Book Free Demo <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ServicesMega({ close }: { close: () => void }) {
  const { openCTAModal } = useCTAModal();
  return (
    <div className="grid grid-cols-[1fr_200px] gap-0 min-w-[640px] max-h-[calc(100vh-90px)] overflow-y-auto">

      {/* Left: service rows */}
      <div className="p-4 border-r border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Our Services</p>
        <div className="grid grid-cols-2 gap-1">
          {allServices.map(s => (
            <a key={s.label} href={s.href} onClick={close}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}35` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 group-hover:text-gray-900 leading-tight truncate">{s.label}</p>
                <p className="text-[11px] text-gray-400 leading-tight truncate">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="p-4 flex flex-col justify-between bg-gray-50">
        <div>
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">All services, AI-ready</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every solution we build is layered with AI — chatbots, automation, and predictive analytics included.
          </p>
        </div>
        <button onClick={() => { close(); openCTAModal(); }}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          Get a Free Quote <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Nav item with mega dropdown ──────────────────────────── */

type MegaKey = "products" | "services" | null;

const PANEL_WIDTH: Record<string, number> = {
  products: 860,
  services: 820,
};

function MegaNavItem({
  label,
  id,
  open,
  onEnter,
  onLeave,
  children,
}: {
  label: string;
  id: MegaKey;
  open: MegaKey;
  onEnter: (id: MegaKey) => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  const isOpen = open === id;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [panelLeft, setPanelLeft] = useState(0);

  useEffect(() => {
    if (isOpen && wrapperRef.current && id) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const pw = PANEL_WIDTH[id] ?? 800;
      const naturalLeft = rect.left + rect.width / 2 - pw / 2;
      const clamped = Math.max(8, Math.min(naturalLeft, window.innerWidth - pw - 8));
      setPanelLeft(clamped - rect.left);
    }
  }, [isOpen, id]);

  return (
    <div ref={wrapperRef} className="relative" onMouseEnter={() => onEnter(id)} onMouseLeave={onLeave}>
      <button
        className={`flex items-center gap-1 text-sm transition-colors ${isOpen ? "text-white" : "text-muted-foreground hover:text-white"}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full mt-3 z-50"
            style={{ left: panelLeft }}
          >
            {/* Arrow — stays centred over the button */}
            <div
              className="absolute -top-1.5 w-3 h-3 rotate-45 bg-white border-l border-t border-gray-200"
              style={{ left: `calc(50% - ${panelLeft}px - 6px)` }}
            />
            <div className="mega-panel rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/60 overflow-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile bottom CTA bar ─────────────────────────────────── */

function MobileBookDemo({ onClose }: { onClose: () => void }) {
  const { openCTAModal } = useCTAModal();
  return (
    <div className="px-5 pb-8 pt-4 grid grid-cols-2 gap-3 border-t border-white/8">
      <Button variant="outline" className="border-white/15 text-white hover:bg-white/10">Login</Button>
      <Button onClick={() => { onClose(); openCTAModal(); }}>Book Demo</Button>
    </div>
  );
}

/* ─── Mobile drawer ─────────────────────────────────────────── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { theme } = useTheme();
  const toggle = (k: string) => setExpanded(v => v === k ? null : k);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-[#070d1a] flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/8 shrink-0">
            <div className="flex items-center">
              <img src="/onesoft-logo.png" alt="OneSoft" className={theme === "light" ? "h-8 w-auto" : "h-8 w-auto brightness-0 invert"} />
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-5 py-6 space-y-1 flex-1">
            {/* Products */}
            <button onClick={() => toggle("products")}
              className="w-full flex items-center justify-between py-3 text-sm font-semibold text-white border-b border-white/8">
              Products <ChevronDown className={`w-4 h-4 transition-transform ${expanded === "products" ? "rotate-180" : ""}`} />
            </button>
            {expanded === "products" && (
              <div className="pl-3 py-2 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 py-1">ERP Systems</p>
                {erpProducts.map(p => (
                  <a key={p.label} href={p.href} onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-white/70 hover:text-white">
                    <p.icon className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                    {p.label}
                  </a>
                ))}
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 py-1 pt-3">Website Products</p>
                {themeProducts.map(p => (
                  <a key={p.label} href={p.href} onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-white/70 hover:text-white">
                    <p.icon className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                    {p.label}
                  </a>
                ))}
              </div>
            )}

            {/* Services */}
            <button onClick={() => toggle("services")}
              className="w-full flex items-center justify-between py-3 text-sm font-semibold text-white border-b border-white/8">
              Services <ChevronDown className={`w-4 h-4 transition-transform ${expanded === "services" ? "rotate-180" : ""}`} />
            </button>
            {expanded === "services" && (
              <div className="pl-3 py-2 space-y-0.5">
                {allServices.map(s => (
                  <a key={s.label} href={s.href} onClick={onClose}
                    className="flex items-center gap-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                      <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/80 group-hover:text-white font-medium leading-tight">{s.label}</p>
                      <p className="text-[10px] text-white/35 leading-tight">{s.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {[
              { label: "AI Automation", href: "#ai-automation", violet: true },
              { label: "Accounting", href: "/accounting", blue: true },
              { label: "School ERP", href: "/school", blue: true },
              { label: "Hospital ERP", href: "/hospital", blue: true },
              { label: "Restaurant ERP", href: "/restaurant", blue: true },
              { label: "E-commerce ERP", href: "/ecommerce", blue: true },
              { label: "Distributor ERP", href: "/distributor", blue: true },
              { label: "Shadi Hall ERP", href: "/shadi-hall", blue: true },
              { label: "OneSites", href: "/onethemes" },
              { label: "Why Us", href: "#why-choose-us" },
            ].map(item => (
              <a key={item.label} href={item.href} onClick={onClose}
                className={`flex py-3 text-sm font-semibold border-b border-white/8 ${item.violet ? "text-violet-400" : (item as any).blue ? "text-blue-400" : "text-white"}`}>
                {item.violet && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse mr-2 mt-1.5" />}
                {(item as any).blue && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-2 mt-1.5" />}
                {item.label}
              </a>
            ))}
          </div>

          <MobileBookDemo onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navigation ───────────────────────────────────────── */

export function Navigation() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const logoClass = theme === "light"
    ? "h-9 w-auto group-hover:opacity-80 transition-opacity"
    : "h-9 w-auto brightness-0 invert group-hover:opacity-90 transition-opacity";
  const [openMega, setOpenMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (id: MegaKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(id);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  const closeMega = () => setOpenMega(null);

  return (
    <>
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <img src="/onesoft-logo.png" alt="OneSoft" className={logoClass} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <MegaNavItem label="Products" id="products" open={openMega} onEnter={handleEnter} onLeave={handleLeave}>
              <ProductsMega close={closeMega} />
            </MegaNavItem>

            <MegaNavItem label="Services" id="services" open={openMega} onEnter={handleEnter} onLeave={handleLeave}>
              <ServicesMega close={closeMega} />
            </MegaNavItem>

            <a href="#ai-automation"
              className="flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              AI
            </a>

            <Link href="/onethemes" className="text-sm text-muted-foreground hover:text-white transition-colors">OneSites</Link>
            <a href="#why-choose-us" className="text-sm text-muted-foreground hover:text-white transition-colors">Why Us</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+441234567890"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +44 1482 000000
            </a>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary text-sm h-9">Login</Button>
            <Button className="h-9 text-sm" onClick={() => openCTAModal()}>Book Demo</Button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-white/70 hover:text-white p-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
