import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "wouter";
import {
  Menu, Zap, ChevronDown, X,
  GraduationCap, Stethoscope, UtensilsCrossed, ShoppingCart, Package, Building2,
  Palette, Globe, ShoppingBag, Webhook, Code2, Users, LayoutDashboard,
  Wrench, BrainCircuit, Megaphone, SearchCheck, ImagePlay,
  ArrowRight, Sparkles, Phone,
  Pill, Hotel, Home, Dumbbell, Shirt, Truck, Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCTAModal } from "@/context/CTAModalContext";

/* ─── Data ─────────────────────────────────────────────────── */

const erpProducts = [
  { icon: GraduationCap,   label: "School ERP",              desc: "Admissions, fees, timetables, results",  color: "#2563eb", href: "#products" },
  { icon: Stethoscope,     label: "Hospital ERP",             desc: "OPD, IPD, pharmacy, lab management",     color: "#16a34a", href: "#products" },
  { icon: Building2,       label: "Shadi Hall ERP",           desc: "Bookings, catering, event scheduling",   color: "#db2777", href: "#products" },
  { icon: UtensilsCrossed, label: "Restaurant ERP",           desc: "POS, kitchen, menu, delivery",           color: "#ea580c", href: "#products" },
  { icon: ShoppingCart,    label: "E-commerce ERP",           desc: "Inventory, orders, multi-channel",       color: "#7c3aed", href: "#products" },
  { icon: Package,         label: "Wholesaler / Distributor", desc: "Stock, invoicing, supply chain",         color: "#0891b2", href: "#products" },
  { icon: Pill,            label: "Pharmacy ERP",             desc: "Medicines, stock, billing, expiry",      color: "#059669", href: "#products" },
  { icon: Hotel,           label: "Hotel & Hospitality",      desc: "Rooms, bookings, housekeeping",          color: "#0369a1", href: "#products" },
  { icon: Home,            label: "Real Estate ERP",          desc: "Properties, leads, rentals, sales",      color: "#b45309", href: "#products" },
  { icon: Dumbbell,        label: "Gym & Fitness ERP",        desc: "Members, attendance, packages",          color: "#be185d", href: "#products" },
  { icon: Shirt,           label: "Garments / Textile ERP",   desc: "Production, fabric, orders, exports",    color: "#6d28d9", href: "#products" },
  { icon: Truck,           label: "Transport & Logistics",    desc: "Fleet, trips, drivers, invoices",        color: "#c2410c", href: "#products" },
  { icon: Calculator,      label: "Accounting & Bookkeeping", desc: "Double-entry, HRM, inventory, payroll",  color: "#10b981", href: "/accounting" },
];

const themeProducts = [
  { icon: Palette, label: "OneThemes",  desc: "Premium website templates for SMEs", color: "#f59e0b", href: "#themes" },
];

const devServices = [
  { icon: Globe,          label: "Website Development",    desc: "React, Next.js, WordPress", color: "#2563eb", href: "#services" },
  { icon: ShoppingBag,    label: "Shopify Stores",         desc: "Custom themes & apps",      color: "#16a34a", href: "#services" },
  { icon: Webhook,        label: "API Development",        desc: "REST, GraphQL, Swagger",    color: "#0891b2", href: "#services" },
  { icon: Code2,          label: "Custom Software",        desc: "Desktop & web apps",        color: "#7c3aed", href: "#services" },
  { icon: Users,          label: "CRM Systems",            desc: "Leads, pipeline, reporting",color: "#db2777", href: "#services" },
  { icon: LayoutDashboard,label: "ERP Implementation",    desc: "All 6 industry modules",    color: "#ea580c", href: "#services" },
  { icon: Wrench,         label: "Custom Development",     desc: "Unique, complex builds",    color: "#0284c7", href: "#services" },
  { icon: BrainCircuit,   label: "AI & Automation",        desc: "Chatbots, RAG, workflows",  color: "#6d28d9", href: "#ai-automation" },
];

const marketingServices = [
  { icon: Megaphone,    label: "Social Media Marketing", desc: "Instagram, LinkedIn, TikTok", color: "#e11d48", href: "#services" },
  { icon: SearchCheck,  label: "SEO",                    desc: "Technical & on-page SEO",     color: "#15803d", href: "#services" },
  { icon: ImagePlay,    label: "Ad Creatives",           desc: "Google, Meta, video ads",     color: "#b45309", href: "#services" },
];

/* ─── Mega menu panel content ───────────────────────────────── */

function ProductsMega({ close }: { close: () => void }) {
  const { openCTAModal } = useCTAModal();
  return (
    <div className="grid grid-cols-[1fr_200px] gap-0 min-w-[820px] max-h-[calc(100vh-90px)] overflow-y-auto">
      {/* Left: ERP + Themes */}
      <div className="p-4 border-r border-white/8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">ERP Systems</p>
        <div className="grid grid-cols-3 gap-0.5 mb-3">
          {erpProducts.map(p => (
            <a key={p.label} href={p.href} onClick={close}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors group">
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${p.color}1a`, border: `1px solid ${p.color}30` }}>
                <p.icon className="w-3.5 h-3.5" style={{ color: p.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-white/90 group-hover:text-white leading-tight truncate">{p.label}</p>
                <p className="text-[10px] text-white/40 leading-tight truncate">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="h-px bg-white/8 mb-2" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">Website Products</p>
        {themeProducts.map(p => (
          <a key={p.label} href={p.href} onClick={close}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors group">
            <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${p.color}1a`, border: `1px solid ${p.color}30` }}>
              <p.icon className="w-3.5 h-3.5" style={{ color: p.color }} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white/90 group-hover:text-white leading-tight">{p.label}</p>
              <p className="text-[10px] text-white/40 leading-tight">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <div className="p-4 flex flex-col justify-between bg-white/[0.02]">
        <div>
          <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm font-bold text-white mb-1">See it in action</p>
          <p className="text-xs text-white/50 leading-relaxed">
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
    <div className="grid grid-cols-[1fr_190px] gap-0 min-w-[660px] max-h-[calc(100vh-90px)] overflow-y-auto">
      {/* Left: Dev + Marketing */}
      <div className="p-4 border-r border-white/8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">Software & Development</p>
        <div className="grid grid-cols-2 gap-0.5 mb-3">
          {devServices.map(s => (
            <a key={s.label} href={s.href} onClick={close}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors group">
              <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                <s.icon className="w-3 h-3" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[12px] font-medium text-white/85 group-hover:text-white leading-tight">{s.label}</p>
                <p className="text-[10px] text-white/38">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="h-px bg-white/8 mb-2" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">Digital Marketing</p>
        <div className="grid grid-cols-3 gap-0.5">
          {marketingServices.map(s => (
            <a key={s.label} href={s.href} onClick={close}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors group">
              <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                <s.icon className="w-3 h-3" style={{ color: s.color }} />
              </div>
              <p className="text-[12px] font-medium text-white/80 group-hover:text-white leading-tight">{s.label}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="p-4 flex flex-col justify-between bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI-Powered</span>
          </div>
          <p className="text-sm font-bold text-white mb-1">Every service AI-ready</p>
          <p className="text-xs text-white/50 leading-relaxed">
            We layer AI automation into every product we build — chatbots, document AI, predictive analytics.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <a href="#ai-automation" onClick={close}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:underline">
            Explore AI <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => { close(); openCTAModal(); }}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
            Get a Quote <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Nav item with mega dropdown ──────────────────────────── */

type MegaKey = "products" | "services" | null;

const PANEL_WIDTH: Record<string, number> = {
  products: 860,
  services: 700,
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
              className="absolute -top-1.5 w-3 h-3 rotate-45 bg-[#0d1526] border-l border-t border-white/10"
              style={{ left: `calc(50% - ${panelLeft}px - 6px)` }}
            />
            <div className="rounded-2xl border border-white/10 bg-[#0d1526] shadow-2xl shadow-black/60 overflow-hidden">
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
              <img src="/onesoft-logo.png" alt="OneSoft" className={theme === "light" ? "h-8 w-auto brightness-0" : "h-8 w-auto brightness-0 invert"} />
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
              <div className="pl-3 py-2 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 py-1">Software & Development</p>
                {devServices.map(s => (
                  <a key={s.label} href={s.href} onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-white/70 hover:text-white">
                    <s.icon className="w-4 h-4 shrink-0" style={{ color: s.color }} />
                    {s.label}
                  </a>
                ))}
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 py-1 pt-3">Digital Marketing</p>
                {marketingServices.map(s => (
                  <a key={s.label} href={s.href} onClick={onClose}
                    className="flex items-center gap-3 py-2 text-sm text-white/70 hover:text-white">
                    <s.icon className="w-4 h-4 shrink-0" style={{ color: s.color }} />
                    {s.label}
                  </a>
                ))}
              </div>
            )}

            {[
              { label: "AI Automation", href: "#ai-automation", violet: true },
              { label: "Accounting", href: "/accounting", green: true },
              { label: "OneThemes", href: "#themes" },
              { label: "Why Us", href: "#why-choose-us" },
            ].map(item => (
              <a key={item.label} href={item.href} onClick={onClose}
                className={`flex py-3 text-sm font-semibold border-b border-white/8 ${item.violet ? "text-violet-400" : (item as any).green ? "text-emerald-400" : "text-white"}`}>
                {item.violet && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse mr-2 mt-1.5" />}
                {(item as any).green && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-2 mt-1.5" />}
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
    ? "h-9 w-auto brightness-0 group-hover:opacity-80 transition-opacity"
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

            <a href="#themes" className="text-sm text-muted-foreground hover:text-white transition-colors">OneThemes</a>
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
