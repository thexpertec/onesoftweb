import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ERPCrossLinks } from "@/components/ERPCrossLinks";
import { FeatureMarqueeSection } from "@/components/FeatureMarqueeSection";
import { CustomSolutionsSection } from "@/components/CustomSolutionsSection";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, ShoppingCart, Users, Package,
  BarChart3, Receipt, ChevronRight, Star, Clock, ShieldCheck,
  TrendingUp, Zap, Globe, Lock, Sparkles, Truck,
  RefreshCw, Tag, Warehouse, Store, LayoutGrid,
  CheckCheck, AlertTriangle, RotateCcw, Layers, Link2,
  BadgeCheck, ScanLine,
} from "lucide-react";

/* ─────────────────── count-up ───────────────────────────── */
function CountUp({ to, suffix = "", decimals = 0, duration = 2 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const ctrl = motionAnimate(0, to, { duration, ease: "easeOut", onUpdate(v) { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; } });
    return () => ctrl.stop();
  }, [isInView]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─────────────────── Dashboard Mockup ──────────────────── */

function OrdersSlide() {
  const orders = [
    { id: "#ORD-9841", customer: "James Patel",      channel: "Shopify",  items: 3, total: "£124.00", status: "Awaiting Pick",   time: "2m ago"  },
    { id: "#ORD-9842", customer: "Emma Clarke",       channel: "Amazon",   items: 1, total: "£49.99",  status: "Packing",         time: "8m ago"  },
    { id: "#ORD-9843", customer: "Sarah Thompson",    channel: "eBay",     items: 2, total: "£87.50",  status: "Dispatched",      time: "14m ago" },
    { id: "#ORD-9844", customer: "Tom Wilson",        channel: "Website",  items: 5, total: "£214.00", status: "Awaiting Pick",   time: "19m ago" },
    { id: "#ORD-9845", customer: "Fatima Ali",        channel: "Shopify",  items: 1, total: "£32.00",  status: "Dispatched",      time: "31m ago" },
    { id: "#ORD-9846", customer: "David Park",        channel: "Amazon",   items: 4, total: "£163.20", status: "Awaiting Pick",   time: "45m ago" },
  ];
  const kpis = [
    { label: "Orders Today",    value: "148",    color: "#1a69c4", Icon: ShoppingCart },
    { label: "Awaiting Pick",   value: "34",     color: "#f59e0b", Icon: Package },
    { label: "Dispatched",      value: "112",    color: "#10b981", Icon: Truck },
    { label: "Today's Revenue", value: "£6,840", color: "#8b5cf6", Icon: Receipt },
  ];
  const chColor = (c: string) => c === "Shopify" ? "#10b981" : c === "Amazon" ? "#f59e0b" : c === "eBay" ? "#ef4444" : "#1a69c4";
  const stColor = (s: string) => s === "Dispatched" ? "#10b981" : s === "Packing" ? "#1a69c4" : "#f59e0b";
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-4 gap-2 shrink-0">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7.5px] text-white/40 uppercase tracking-wider">{k.label}</span>
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${k.color}20` }}>
                <k.Icon className="w-3 h-3" style={{ color: k.color }} />
              </div>
            </div>
            <p className="text-[15px] font-black leading-none">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Live Order Feed</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Order","Customer","Channel","Items","Total","Status","Time"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {orders.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono" style={{ color: "#1a69c4" }}>{r.id}</td>
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.customer}</td>
                <td className="py-1.5 pr-3">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: chColor(r.channel), background: `${chColor(r.channel)}18` }}>{r.channel}</span>
                </td>
                <td className="py-1.5 pr-3 text-white/50">{r.items}</td>
                <td className="py-1.5 pr-3 text-white/75 font-semibold">{r.total}</td>
                <td className="py-1.5 pr-3">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: stColor(r.status), background: `${stColor(r.status)}18` }}>{r.status}</span>
                </td>
                <td className="py-1.5 text-white/35">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventorySlide() {
  const products = [
    { sku: "SNK-001-BLK-10", name: 'Air Runner — Black/UK10', stock: 4,   committed: 3,  avail: 1,  reorder: 10, channels: ["Shopify","Amazon"] },
    { sku: "TEE-M-WHT",       name: 'Classic Tee — White/M',  stock: 142, committed: 12, avail: 130, reorder: 20, channels: ["Website","eBay"] },
    { sku: "BAG-TOTE-NAV",    name: 'Canvas Tote — Navy',      stock: 0,   committed: 0,  avail: 0,  reorder: 15, channels: ["Shopify"] },
    { sku: "WATCH-SLV-001",   name: 'Mesh Watch — Silver',     stock: 28,  committed: 5,  avail: 23, reorder: 10, channels: ["Website","Amazon","eBay"] },
    { sku: "CAP-GRN-ONE",     name: 'Snapback Cap — Green',    stock: 7,   committed: 6,  avail: 1,  reorder: 12, channels: ["Shopify","eBay"] },
  ];
  const summary = [
    { label: "Total SKUs",     value: "1,842", color: "#1a69c4" },
    { label: "Low Stock",      value: "23",    color: "#f59e0b" },
    { label: "Out of Stock",   value: "7",     color: "#ef4444" },
  ];
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {summary.map((s, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8 text-center">
            <p className="text-[7.5px] text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-[18px] font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Stock Levels — Attention Required</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["SKU","Product","Stock","Committed","Available","Channels"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {products.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono text-[6.5px]" style={{ color: "#1a69c4" }}>{r.sku}</td>
                <td className="py-1.5 pr-3 text-white/75">{r.name}</td>
                <td className="py-1.5 pr-3 font-bold" style={{ color: r.stock === 0 ? "#ef4444" : r.stock <= r.reorder ? "#f59e0b" : "#10b981" }}>{r.stock}</td>
                <td className="py-1.5 pr-3 text-white/45">{r.committed}</td>
                <td className="py-1.5 pr-3 font-bold" style={{ color: r.avail === 0 ? "#ef4444" : r.avail < 3 ? "#f59e0b" : "rgba(255,255,255,0.65)" }}>{r.avail}</td>
                <td className="py-1.5 flex gap-1 flex-wrap">
                  {r.channels.map(ch => <span key={ch} className="text-[6px] px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{ch}</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChannelsSlide() {
  const channels = [
    { name: "Shopify",  orders: 62, revenue: "£2,940", pct: 100, color: "#10b981" },
    { name: "Amazon",   orders: 44, revenue: "£2,100", pct: 71,  color: "#f59e0b" },
    { name: "Website",  orders: 28, revenue: "£1,180", pct: 40,  color: "#1a69c4" },
    { name: "eBay",     orders: 14, revenue: "£620",   pct: 21,  color: "#ef4444" },
  ];
  const topProducts = [
    { name: "Air Runner Sneakers",  sold: 28, revenue: "£1,400", trend: "+12%" },
    { name: "Mesh Watch — Silver",  sold: 22, revenue: "£1,100", trend: "+8%"  },
    { name: "Classic Tee — White",  sold: 41, revenue: "£820",   trend: "+3%"  },
    { name: "Canvas Tote — Navy",   sold: 18, revenue: "£540",   trend: "-2%"  },
    { name: "Snapback Cap — Green", sold: 15, revenue: "£375",   trend: "+5%"  },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 shrink-0" style={{ width: "190px" }}>
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Revenue by Channel</p>
        <div className="space-y-3">
          {channels.map((c, i) => (
            <div key={i}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[7.5px] font-bold" style={{ color: c.color }}>{c.name}</span>
                <span className="text-[7.5px] text-white/60">{c.revenue}</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
              <p className="text-[6px] text-white/30 mt-0.5">{c.orders} orders</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex justify-between">
            <span className="text-[7.5px] text-white/40">Total Orders</span>
            <span className="text-[7.5px] font-bold text-white/70">148</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[7.5px] text-white/40">Total Revenue</span>
            <span className="text-[7.5px] font-bold" style={{ color: "#1a69c4" }}>£6,840</span>
          </div>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Top Selling Products Today</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Product","Units Sold","Revenue","vs Yesterday"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {topProducts.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.name}</td>
                <td className="py-1.5 pr-3 text-white/55">{r.sold}</td>
                <td className="py-1.5 pr-3 text-white/70 font-semibold">{r.revenue}</td>
                <td className="py-1.5">
                  <span className="font-bold" style={{ color: r.trend.startsWith("+") ? "#10b981" : "#ef4444" }}>{r.trend}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FulfilmentSlide() {
  const queue = [
    { id: "#ORD-9841", customer: "James Patel",   items: ["Air Runner BLK/10 x1","Classic Tee M/WHT x2"],  courier: "DHL",   label: "Printed", status: "Picking"  },
    { id: "#ORD-9844", customer: "Tom Wilson",     items: ["Mesh Watch SLV x2","Canvas Tote x3"],            courier: "FedEx", label: "Printed", status: "Packing"  },
    { id: "#ORD-9846", customer: "David Park",     items: ["Snapback Cap GRN x2","Classic Tee L/BLK x2"],   courier: "UPS",   label: "Pending", status: "Picking"  },
    { id: "#ORD-9849", customer: "Priya Sharma",   items: ["Air Runner WHT/8 x1"],                            courier: "DHL",   label: "Printed", status: "Awaiting" },
  ];
  const stats = [
    { label: "To Pick",   value: "22", color: "#f59e0b" },
    { label: "Packing",   value: "8",  color: "#1a69c4" },
    { label: "Ready",     value: "14", color: "#10b981" },
  ];
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8 text-center">
            <p className="text-[7.5px] text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-[20px] font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Fulfilment Queue</p>
        <div className="space-y-2">
          {queue.map((r, i) => (
            <div key={i} className="rounded-lg p-2.5 border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black" style={{ color: "#1a69c4" }}>{r.id}</span>
                  <span className="text-[7.5px] text-white/55">{r.customer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[6.5px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>{r.courier}</span>
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: r.label === "Printed" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: r.label === "Printed" ? "#10b981" : "#f59e0b" }}>{r.label}</span>
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: r.status === "Packing" ? "rgba(26,105,196,0.12)" : r.status === "Picking" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.06)",
                      color: r.status === "Packing" ? "#1a69c4" : r.status === "Picking" ? "#f59e0b" : "rgba(255,255,255,0.4)" }}>{r.status}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {r.items.map((it, j) => <span key={j} className="text-[6.5px] text-white/40">• {it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcommerceDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "Live Orders",   Component: OrdersSlide     },
    { label: "Inventory",     Component: InventorySlide  },
    { label: "Channels",      Component: ChannelsSlide   },
    { label: "Fulfilment",    Component: FulfilmentSlide },
  ];
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const Active = slides[slide].Component;
  return (
    <div className="h-full rounded-2xl overflow-hidden flex flex-col" style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(26,105,196,0.25)" }}>
            <ShoppingCart className="w-3.5 h-3.5" style={{ color: "#1a69c4" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft Commerce</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
        <div className="flex gap-1">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className="text-[9px] px-2.5 py-1 rounded-md font-medium transition-all"
              style={{ background: i === slide ? "#1a69c4" : "rgba(255,255,255,0.06)", color: i === slide ? "#fff" : "rgba(255,255,255,0.45)" }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0 p-3 flex flex-col">
        <Active />
      </div>
      <div className="flex gap-1.5 justify-center py-2 shrink-0">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === slide ? 24 : 6, background: i === slide ? "#1a69c4" : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Page data ──────────────────────────── */

const modules = [
  { icon: ShoppingCart,  color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430", title: "Order Management",
    desc: "Every order from every channel — in one place, with status tracked from payment to delivery.",
    pts: ["Unified inbox across all channels", "Auto order-routing by warehouse/courier", "Fraud detection & payment verification", "Returns & exchange management"] },
  { icon: Layers,        color: "#10b981", bg: "#052e1c", border: "#10b98130", title: "Multi-Channel Sync",
    desc: "Sell on Shopify, Amazon, eBay, and your own website — inventory stays perfectly in sync.",
    pts: ["Real-time stock sync across channels", "Channel-specific pricing & promotions", "Listing management from one place", "Channel performance comparison"] },
  { icon: Warehouse,     color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630", title: "Inventory & Warehousing",
    desc: "Track every SKU, variant, and bundle across multiple warehouses — with bin locations.",
    pts: ["Multi-warehouse stock management", "Bin & shelf location tracking", "Bundles & kit-building", "Automatic low-stock reorder triggers"] },
  { icon: Truck,         color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30", title: "Shipping & Fulfilment",
    desc: "Courier labels printed in one click — DHL, FedEx, UPS, Aramex all connected natively.",
    pts: ["Multi-courier label printing", "Batch picking & packing workflows", "Tracking synced back to customer", "Shipping rules by weight / destination"] },
  { icon: Tag,           color: "#ef4444", bg: "#2e0a0a", border: "#ef444430", title: "Product Catalogue",
    desc: "Manage thousands of SKUs with variants, images, descriptions, and supplier costs.",
    pts: ["Unlimited SKUs & variants", "Bulk import & export via CSV", "Supplier cost vs. sell price tracking", "Barcode & QR code generation"] },
  { icon: Users,         color: "#06b6d4", bg: "#011e26", border: "#06b6d430", title: "Customer Management",
    desc: "Full CRM — order history, lifetime value, loyalty points, and marketing segmentation.",
    pts: ["Customer lifetime value tracking", "Loyalty & rewards programme", "Purchase history & preferences", "Email list segmentation"] },
  { icon: RefreshCw,     color: "#ec4899", bg: "#2d0a1a", border: "#ec489930", title: "Purchasing & Suppliers",
    desc: "Raise purchase orders when stock hits reorder level — automatically, to the right supplier.",
    pts: ["Auto-generated purchase orders", "Supplier lead time tracking", "GRN & stock-in workflows", "Supplier pricing history"] },
  { icon: BarChart3,     color: "#14b8a6", bg: "#021f1c", border: "#14b8a630", title: "Reports & Analytics",
    desc: "Revenue by channel, bestsellers, return rates, and margin analysis — all in one dashboard.",
    pts: ["Channel revenue comparison", "Product margin & profitability", "Return rate by product / channel", "Inventory turnover & velocity"] },
];

const flow = [
  { step: "01", icon: ShoppingCart, color: "#1a69c4", title: "Order Placed on Any Channel",      detail: "Shopify, Amazon, eBay, or your own website — every order arrives in one unified inbox immediately" },
  { step: "02", icon: Warehouse,    color: "#10b981", title: "Stock Reserved Instantly",          detail: "Inventory committed the moment the order is confirmed — no overselling across any channel" },
  { step: "03", icon: ScanLine,     color: "#8b5cf6", title: "Picking List Auto-Generated",      detail: "Warehouse staff receive a consolidated pick list — optimised by bin location for fastest pick" },
  { step: "04", icon: Package,      color: "#f59e0b", title: "Packed & Labelled in One Click",   detail: "Courier label printed automatically at the right service rate — no manual booking with couriers" },
  { step: "05", icon: Truck,        color: "#ef4444", title: "Dispatched — Tracking Auto-Sent",  detail: "Tracking number synced back to the channel and emailed to the customer automatically" },
  { step: "06", icon: RotateCcw,    color: "#06b6d4", title: "Returns Processed & Stock Updated",detail: "Return labels issued, stock reinstated on receipt, and refund triggered — all without manual steps" },
];

const testimonials = [
  { quote: "We were selling on four channels with four separate spreadsheets and overselling constantly. OneSoft's inventory sync fixed that on day one. We haven't had a single oversell in seven months and our customer satisfaction score has gone from 3.8 to 4.7.",
    name: "Aisha Rahman",  role: "Founder & Director",        co: "Zahra Collective, Dubai, UAE",       color: "#1a69c4" },
  { quote: "The multi-courier setup alone saves my warehouse manager two hours every morning. He used to log into DHL, FedEx, and UPS separately to book each shipment. Now it's one click per batch and every tracking number goes to the customer automatically.",
    name: "Mark Stevens",  role: "Operations Manager",         co: "ProKit Sports Equipment, Toronto, Canada", color: "#10b981" },
  { quote: "Our return rate was high and we had no idea which products were causing it. The analytics showed us straight away — one supplier's sizing was running small. We raised it with them, fixed the listing, and our return rate on that range dropped 60% in a month.",
    name: "Lucy Chen",     role: "E-commerce Trading Manager", co: "Verdant Homeware, Sydney, Australia", color: "#8b5cf6" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function EcommercePage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#f1f5f9"             : "#04091a";
  const tableBg      = isLight ? "#ffffff"             : "#07111f";
  const connectorBg  = isLight ? "#f1f5f9"             : "#070e1c";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t50          = isLight ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.5)";
  const t55          = isLight ? "rgba(15,23,42,0.6)"  : "rgba(255,255,255,0.55)";
  const t60          = isLight ? "rgba(15,23,42,0.65)" : "rgba(255,255,255,0.6)";
  const t65          = isLight ? "rgba(15,23,42,0.7)"  : "rgba(255,255,255,0.65)";
  const t85          = isLight ? "rgba(15,23,42,0.9)"  : "rgba(255,255,255,0.85)";
  const pageColor    = isLight ? "#0f172a"             : "#fff";
  const secBtnBg     = isLight ? "rgba(0,0,0,0.05)"   : "rgba(255,255,255,0.06)";
  const secBtnBorder = isLight ? "rgba(0,0,0,0.15)"   : "rgba(255,255,255,0.12)";
  const secBtnColor  = isLight ? "rgba(15,23,42,0.85)": "rgba(255,255,255,0.85)";

  return (
    <div style={{ background: pageBg, color: pageColor }} className="min-h-screen overflow-hidden">
      <Navigation />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(26,105,196,0.15), transparent)" }} />
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full" style={{ background: "rgba(26,105,196,0.10)", filter: "blur(90px)" }}
            animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full" style={{ background: "rgba(26,105,196,0.07)", filter: "blur(110px)" }}
            animate={{ y: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </div>

        <div className="container mx-auto px-4">
          <motion.div className="flex items-center gap-2 text-sm mb-8" style={{ color: t45 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="hover:underline transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: t50 }}>Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#1a69c4", fontWeight: 600 }}>E-commerce Management</span>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <ShoppingCart className="w-3.5 h-3.5" />E-commerce Management ERP
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Sell Everywhere.{" "}
              <span style={{ color: "#1a69c4" }}>Manage from One Place.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Shopify, Amazon, eBay, and your own website — unified inventory, one order inbox, automated fulfilment. No more overselling. No more manual courier bookings. No more channel chaos.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("E-commerce Management ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{ background: secBtnBg, border: `1px solid ${secBtnBorder}`, color: secBtnColor }}
                onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                Explore All Modules
              </button>
            </motion.div>
          </div>

          <motion.div className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
            <div className="h-[400px]"><EcommerceDashboard /></div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 500,  suf: "+",  label: "Online Stores",              Icon: Store,        color: "#1a69c4" },
              { to: 5,    suf: "M+", label: "Orders Processed",           Icon: ShoppingCart, color: "#10b981" },
              { to: 99.8, suf: "%",  label: "Order Accuracy Rate",        Icon: BadgeCheck,   color: "#8b5cf6", d: 1 },
              { to: 40,   suf: "%",  label: "Faster Fulfilment",          Icon: Truck,        color: "#f59e0b" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  <s.Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-1">
                  <CountUp to={s.to} suffix={s.suf} decimals={(s as any).d ?? 0} />
                </h3>
                <p style={{ color: t45 }} className="text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FLOW ═══════════════════════════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(26,105,196,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
              <Sparkles className="w-3.5 h-3.5" />From Click to Customer
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Order placed.<br />Delivered automatically.</h2>
            <p style={{ color: t55 }} className="text-lg">
              From any channel to the customer's door — every step automated. No manual courier bookings, no copy-pasting tracking numbers, no spreadsheets.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flow.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative rounded-2xl p-5 overflow-hidden"
                style={{ background: `${f.color}0d`, border: `1px solid ${f.color}25` }}>
                <div className="absolute top-3 right-4 text-[42px] font-black leading-none select-none pointer-events-none"
                  style={{ color: t85 }}>{f.step}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}35` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p style={{ color: t50 }} className="text-sm leading-relaxed">{f.detail}</p>
                {i < flow.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
                    style={{ background: connectorBg, border: `1px solid ${f.color}40` }}>
                    <ArrowRight className="w-2.5 h-2.5" style={{ color: f.color }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MODULES GRID ════════════════════════════════════════ */}
      <div id="modules" className="py-24" style={{ background: isLight ? "#ffffff" : sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
              <LayoutGrid className="w-3.5 h-3.5" />8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">All your channels.<br />One connected backend.</h2>
            <p style={{ color: t50 }} className="text-lg">
              Built for growing e-commerce brands that need to sell more without adding more admin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m, i) => (
              <motion.div key={m.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: isLight ? `${m.color}28` : m.bg,
                  border: `1.5px solid ${isLight ? m.color + "70" : m.border}`,
                  boxShadow: isLight ? `0 2px 16px ${m.color}18` : "none",
                }}
                whileHover={{ y: -5, boxShadow: `0 24px 48px ${m.color}33` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: isLight ? `${m.color}35` : `${m.color}20`, border: `1.5px solid ${isLight ? m.color + "80" : m.color + "40"}` }}>
                  <m.icon className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: isLight ? "#0f172a" : undefined }}>{m.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: isLight ? "#475569" : t50 }}>{m.desc}</p>
                <ul className="space-y-2">
                  {m.pts.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                        style={{ background: isLight ? `${m.color}28` : `${m.color}20`, border: `1px solid ${m.color}50` }}>
                        <CheckCircle2 className="w-2.5 h-2.5" style={{ color: m.color }} />
                      </div>
                      <span className="text-xs leading-relaxed" style={{ color: isLight ? "#475569" : t55 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MULTI-CHANNEL SYNC DEEP-DIVE ════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(26,105,196,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <Link2 className="w-3.5 h-3.5" />One Inventory. All Channels.
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Sell on four channels.<br />Never oversell once.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                The moment a unit sells anywhere — Shopify, Amazon, eBay, or your own site — every other channel's stock count updates in real time. One system of record. Zero discrepancies. No angry customers told their order can't be fulfilled.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: RefreshCw,    color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430",
                    title: "Stock syncs across all channels in real time",
                    sub: "A sale on Amazon reduces available inventory on Shopify, eBay, and your website simultaneously — no lag" },
                  { icon: AlertTriangle,color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30",
                    title: "Low-stock warnings push to all channels automatically",
                    sub: "When stock drops below your threshold, listings are automatically updated to reflect true availability" },
                  { icon: Tag,          color: "#10b981", bg: "#052e1c", border: "#10b98130",
                    title: "Channel-specific pricing without duplication",
                    sub: "Set different prices for Amazon vs Shopify vs your own site — one product record, multiple price rules" },
                  { icon: BarChart3,    color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630",
                    title: "See which channel is most profitable per SKU",
                    sub: "Channel fee deductions built in — compare net margin after Amazon, eBay, and Shopify fees side by side" },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-4 rounded-xl p-4"
                    style={{ background: isLight ? `${item.color}0f` : item.bg, border: `1px solid ${item.border}` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}35` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: t45 }}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="h-13 px-8 text-base font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("E-commerce Management ERP")}>
                See Channel Sync Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* inventory card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(26,105,196,0.15)" }}>
                      <Layers className="w-4 h-4" style={{ color: "#1a69c4" }} />
                    </div>
                    <span className="font-bold text-sm">Air Runner — Black/UK10</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>Low Stock</span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Total Stock",  value: "4",  color: "#f59e0b" },
                      { label: "Committed",    value: "3",  color: "#ef4444" },
                      { label: "Available",    value: "1",  color: "#f59e0b" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-xl p-3 text-center" style={{ background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.04)", border: `1px solid ${dividerColor}` }}>
                        <p className="text-[9px] mb-1" style={{ color: t45 }}>{s.label}</p>
                        <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold" style={{ color: t55 }}>Live Channel Stock</p>
                    {[
                      { ch: "Shopify",  stock: 1, color: "#10b981" },
                      { ch: "Amazon",   stock: 0, color: "#ef4444" },
                      { ch: "eBay",     stock: 1, color: "#10b981" },
                      { ch: "Website",  stock: 1, color: "#10b981" },
                    ].map((ch, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.03)", border: `1px solid ${dividerColor}` }}>
                        <span className="text-sm font-semibold" style={{ color: t65 }}>{ch.ch}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                          <span className="text-sm font-bold" style={{ color: ch.color }}>{ch.stock} unit{ch.stock !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#f59e0b" }} />
                      <div>
                        <p className="text-xs font-bold mb-0.5" style={{ color: "#f59e0b" }}>Purchase Order Raised</p>
                        <p className="text-[11px]" style={{ color: t45 }}>PO-0284 sent to Supplier: FootCore Ltd · 48 units · ETA 5 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-24" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
              <Star className="w-3.5 h-3.5 fill-current" />What Online Sellers Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Trusted by online brands worldwide.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)", border: `1px solid ${t.color}25` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: t.color }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: t65 }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}35` }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: t45 }}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CTA ═════════════════════════════════════════════════ */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(26,105,196,0.10), transparent)" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
              <Lock className="w-3.5 h-3.5" />No card required · Free 30-day trial
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              More channels.<br />
              <span style={{ color: "#1a69c4" }}>Zero extra admin.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 500+ online brands running their entire e-commerce operation on OneSoft. Sync your channels and ship faster from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("E-commerce Management ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Online brands worldwide trust OneSoft</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("E-commerce Management ERP")} />
      <FeatureMarqueeSection
        accentColor="#7c3aed"
        heading="Everything an Online Store Needs"
        subheading="From order capture to last-mile delivery — every module built for modern e-commerce brands."
        row1={[
          { icon: "🛒", label: "Order Management",      color: "#7c3aed" },
          { icon: "🔄", label: "Inventory Sync",        color: "#8b5cf6" },
          { icon: "📡", label: "Multi-Channel Selling", color: "#10b981" },
          { icon: "📦", label: "Product Catalogue",     color: "#f59e0b" },
          { icon: "🏷️", label: "Shipping Labels",      color: "#06b6d4" },
          { icon: "🏭", label: "Warehouse Picking",     color: "#ec4899" },
          { icon: "↩️", label: "Returns Handling",      color: "#14b8a6" },
          { icon: "👤", label: "Customer Portal",       color: "#6366f1" },
          { icon: "📊", label: "Analytics Dashboard",   color: "#f97316" },
          { icon: "🎟️", label: "Coupons & Discounts",  color: "#a855f7" },
          { icon: "🛍️", label: "Abandoned Cart",       color: "#ef4444" },
          { icon: "🌍", label: "Multi-Currency",        color: "#0ea5e9" },
        ]}
        row2={[
          { icon: "💳", label: "Payment Gateway",       color: "#10b981" },
          { icon: "⭐", label: "Reviews & Ratings",     color: "#3b82f6" },
          { icon: "🤝", label: "Affiliate Portal",      color: "#8b5cf6" },
          { icon: "🚚", label: "Supplier Portal",       color: "#f59e0b" },
          { icon: "📋", label: "Purchase Orders",       color: "#06b6d4" },
          { icon: "📈", label: "Stock Forecasting",     color: "#ec4899" },
          { icon: "📷", label: "Barcode Scanning",      color: "#14b8a6" },
          { icon: "💬", label: "Live Chat",             color: "#6366f1" },
          { icon: "📧", label: "Email Marketing",       color: "#f97316" },
          { icon: "🔔", label: "Push Notifications",    color: "#a855f7" },
          { icon: "🎯", label: "Upsell & Cross-sell",   color: "#ef4444" },
          { icon: "📱", label: "Mobile App",            color: "#0ea5e9" },
        ]}
        row3={[
          { icon: "☁️", label: "Cloud Hosted",          color: "#10b981" },
          { icon: "🔒", label: "Fraud Prevention",      color: "#3b82f6" },
          { icon: "🔑", label: "Role-Based Access",     color: "#8b5cf6" },
          { icon: "🏪", label: "Multi-Store",           color: "#f59e0b" },
          { icon: "📦", label: "Dropshipping Ready",    color: "#06b6d4" },
          { icon: "🔗", label: "API Integrations",      color: "#ec4899" },
          { icon: "🗂️", label: "Bulk Import/Export",   color: "#14b8a6" },
          { icon: "📑", label: "Tax Compliance",        color: "#6366f1" },
          { icon: "🌐", label: "Multi-Language",        color: "#f97316" },
          { icon: "🎨", label: "Custom Branding",       color: "#a855f7" },
          { icon: "📉", label: "Margin Tracking",       color: "#ef4444" },
          { icon: "🤖", label: "AI Recommendations",    color: "#0ea5e9" },
        ]}
      />
      <CustomSolutionsSection accentColor="#7c3aed" productName="E-commerce ERP" />
      <ERPCrossLinks current="/ecommerce" />
      <Footer />
    </div>
  );
}
