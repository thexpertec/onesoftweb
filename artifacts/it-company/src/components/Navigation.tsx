import React, { useState, useRef } from "react";
import { Link } from "wouter";
import {
  Menu, Zap, ChevronDown, X,
  GraduationCap, Stethoscope, UtensilsCrossed, ShoppingCart, Package, Building2,
  Palette, Globe, ShoppingBag, Webhook, Code2, Users, LayoutDashboard,
  Wrench, BrainCircuit, Megaphone, SearchCheck, ImagePlay,
  ArrowRight, Sparkles, Phone,
  Pill, Hotel, Home, Dumbbell, Shirt, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
];

const themeProducts = [
  { icon: Palette, label: "PowerThemes",  desc: "Premium website templates for SMEs", color: "#f59e0b", href: "#themes" },
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
  return (
    <div className="grid grid-cols-[1fr_220px] gap-0 min-w-[860px]">
      {/* Left: ERP + Themes */}
      <div className="p-6 border-r border-white/8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">ERP Systems</p>
        <div className="grid grid-cols-3 gap-1.5 mb-5">
          {erpProducts.map(p => (
            <a key={p.label} href={p.href} onClick={close}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${p.color}1a`, border: `1px solid ${p.color}30` }}>
                <p.icon className="w-4 h-4" style={{ color: p.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-white leading-tight">{p.label}</p>
                <p className="text-[11px] text-white/45 mt-0.5">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="h-px bg-white/8 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Website Products</p>
        {themeProducts.map(p => (
          <a key={p.label} href={p.href} onClick={close}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${p.color}1a`, border: `1px solid ${p.color}30` }}>
              <p.icon className="w-4 h-4" style={{ color: p.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{p.label}</p>
              <p className="text-[11px] text-white/45 mt-0.5">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <div className="p-6 flex flex-col justify-between bg-white/[0.02]">
        <div>
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-bold text-white mb-1.5">See it in action</p>
          <p className="text-xs text-white/50 leading-relaxed">
            Book a free 30-minute demo of any ERP module — live, no slides.
          </p>
        </div>
        <a href="#contact" onClick={close}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          Book Free Demo <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function ServicesMega({ close }: { close: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_200px] gap-0 min-w-[700px]">
      {/* Left: Dev + Marketing */}
      <div className="p-6 border-r border-white/8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Software & Development</p>
        <div className="grid grid-cols-2 gap-1 mb-5">
          {devServices.map(s => (
            <a key={s.label} href={s.href} onClick={close}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/[0.06] transition-colors group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white/85 group-hover:text-white leading-tight">{s.label}</p>
                <p className="text-[10px] text-white/38">{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="h-px bg-white/8 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-3">Digital Marketing</p>
        <div className="grid grid-cols-3 gap-1">
          {marketingServices.map(s => (
            <a key={s.label} href={s.href} onClick={close}
              className="flex flex-col items-center gap-2 px-2 py-3 rounded-xl hover:bg-white/[0.06] transition-colors group text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-[12px] font-medium text-white/80 group-hover:text-white leading-tight">{s.label}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="p-6 flex flex-col justify-between bg-white/[0.02]">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI-Powered</span>
          </div>
          <p className="text-sm font-bold text-white mb-1.5">Every service AI-ready</p>
          <p className="text-xs text-white/50 leading-relaxed">
            We layer AI automation into every product we build — chatbots, document AI, predictive analytics.
          </p>
        </div>
        <div className="mt-6 space-y-2">
          <a href="#ai-automation" onClick={close}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:underline">
            Explore AI <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href="#contact" onClick={close}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
            Get a Quote <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Nav item with mega dropdown ──────────────────────────── */

type MegaKey = "products" | "services" | null;

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
  return (
    <div className="relative" onMouseEnter={() => onEnter(id)} onMouseLeave={onLeave}>
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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
          >
            {/* Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0d1526] border-l border-t border-white/10" />
            <div className="rounded-2xl border border-white/10 bg-[#0d1526] shadow-2xl shadow-black/60 overflow-hidden">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile drawer ─────────────────────────────────────────── */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">PowerTech</span>
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
              { label: "PowerThemes", href: "#themes" },
              { label: "Why Us", href: "#why-choose-us" },
            ].map(item => (
              <a key={item.label} href={item.href} onClick={onClose}
                className={`flex py-3 text-sm font-semibold border-b border-white/8 ${item.violet ? "text-violet-400" : "text-white"}`}>
                {item.violet && <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse mr-2 mt-1.5" />}
                {item.label}
              </a>
            ))}
          </div>

          <div className="px-5 pb-8 pt-4 grid grid-cols-2 gap-3 border-t border-white/8">
            <Button variant="outline" className="border-white/15 text-white hover:bg-white/10">Login</Button>
            <Button asChild><a href="#contact" onClick={onClose}>Book Demo</a></Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navigation ───────────────────────────────────────── */

export function Navigation() {
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
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PowerTech</span>
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

            <a href="#themes" className="text-sm text-muted-foreground hover:text-white transition-colors">PowerThemes</a>
            <a href="#why-choose-us" className="text-sm text-muted-foreground hover:text-white transition-colors">Why Us</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+441234567890"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +44 1482 000000
            </a>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary text-sm h-9">Login</Button>
            <Button asChild className="h-9 text-sm"><a href="#contact">Book Demo</a></Button>
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
