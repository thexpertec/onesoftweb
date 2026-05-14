import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, Package, Users, Truck,
  BarChart3, Receipt, ChevronRight, Star, Clock, ShieldCheck,
  TrendingUp, Zap, Globe, Lock, Sparkles, Warehouse,
  RefreshCw, Tag, Store, FileText, MapPin,
  CheckCheck, AlertTriangle, Wallet, BookOpen,
  BadgeCheck, ClipboardList, Route, UserCheck,
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
    { id: "SO-4821", party: "Metro Retail Ltd",      items: 6,  value: "£4,200", route: "Route A", status: "Pending Dispatch", due: "Today"    },
    { id: "SO-4822", party: "City Supermarkets",     items: 12, value: "£9,840", route: "Route B", status: "Picking",          due: "Today"    },
    { id: "SO-4823", party: "Khan Grocery Store",    items: 3,  value: "£820",   route: "Route C", status: "Dispatched",       due: "Today"    },
    { id: "SO-4824", party: "Valley Foods Ltd",      items: 8,  value: "£3,560", route: "Route A", status: "Pending Dispatch", due: "Tomorrow" },
    { id: "SO-4825", party: "Sunrise Convenience",   items: 4,  value: "£1,120", route: "Route D", status: "Dispatched",       due: "Today"    },
    { id: "SO-4826", party: "Green Leaf Wholesaler", items: 15, value: "£7,300", route: "Route B", status: "Picking",          due: "Tomorrow" },
  ];
  const kpis = [
    { label: "Orders Today",    value: "62",     color: "#1a69c4", Icon: ClipboardList },
    { label: "Dispatched",      value: "38",     color: "#10b981", Icon: Truck },
    { label: "Pending",         value: "24",     color: "#f59e0b", Icon: Package },
    { label: "Today's Value",   value: "£84,200",color: "#8b5cf6", Icon: Receipt },
  ];
  const stColor = (s: string) => s === "Dispatched" ? "#10b981" : s === "Picking" ? "#1a69c4" : "#f59e0b";
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
            <p className="text-[14px] font-black leading-none">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Today's Sales Orders</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Order","Party","Items","Value","Route","Status","Due"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {orders.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono" style={{ color: "#1a69c4" }}>{r.id}</td>
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.party}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.items}</td>
                <td className="py-1.5 pr-3 text-white/75 font-semibold">{r.value}</td>
                <td className="py-1.5 pr-3 text-white/45">{r.route}</td>
                <td className="py-1.5 pr-3">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: stColor(r.status), background: `${stColor(r.status)}18` }}>{r.status}</span>
                </td>
                <td className="py-1.5 text-white/40">{r.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StockSlide() {
  const items = [
    { sku: "RICE-5KG-BAS",  name: "Basmati Rice 5kg",      stock: 420,  committed: 180, avail: 240, reorder: 200, batch: "B240501", expiry: "Dec 2025" },
    { sku: "OIL-SUN-1L",    name: "Sunflower Oil 1L",       stock: 84,   committed: 60,  avail: 24,  reorder: 100, batch: "B240412", expiry: "Oct 2025" },
    { sku: "SUGAR-1KG",     name: "White Sugar 1kg",         stock: 1240, committed: 320, avail: 920, reorder: 400, batch: "B240523", expiry: "Jun 2026" },
    { sku: "FLOUR-PL-25KG", name: "Plain Flour 25kg",        stock: 38,   committed: 35,  avail: 3,   reorder: 50,  batch: "B240430", expiry: "Sep 2025" },
    { sku: "MILK-UHT-1L",   name: "UHT Full Cream Milk 1L", stock: 0,    committed: 0,   avail: 0,   reorder: 200, batch: "—",       expiry: "—"        },
  ];
  const summary = [
    { label: "Active SKUs",   value: "2,140", color: "#1a69c4" },
    { label: "Low Stock",     value: "18",    color: "#f59e0b" },
    { label: "Out of Stock",  value: "5",     color: "#ef4444" },
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
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Stock Position — Attention Required</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["SKU","Product","Stock","Committed","Available","Batch","Expiry"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {items.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-2 font-mono text-[6.5px]" style={{ color: "#1a69c4" }}>{r.sku}</td>
                <td className="py-1.5 pr-2 text-white/75">{r.name}</td>
                <td className="py-1.5 pr-2 font-bold" style={{ color: r.stock === 0 ? "#ef4444" : r.stock <= r.reorder ? "#f59e0b" : "#10b981" }}>{r.stock}</td>
                <td className="py-1.5 pr-2 text-white/45">{r.committed}</td>
                <td className="py-1.5 pr-2 font-bold" style={{ color: r.avail === 0 ? "#ef4444" : r.avail < 10 ? "#f59e0b" : "rgba(255,255,255,0.65)" }}>{r.avail}</td>
                <td className="py-1.5 pr-2 text-white/40 font-mono text-[6px]">{r.batch}</td>
                <td className="py-1.5 text-white/40">{r.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LedgerSlide() {
  const parties = [
    { name: "Metro Retail Ltd",      limit: "£20,000", outstanding: "£14,200", overdue: "£0",     days: 0,  risk: "Low"    },
    { name: "City Supermarkets",     limit: "£50,000", outstanding: "£48,900", overdue: "£12,400",days: 42, risk: "High"   },
    { name: "Khan Grocery Store",    limit: "£8,000",  outstanding: "£6,100",  overdue: "£1,800", days: 18, risk: "Medium" },
    { name: "Valley Foods Ltd",      limit: "£30,000", outstanding: "£9,400",  overdue: "£0",     days: 0,  risk: "Low"    },
    { name: "Sunrise Convenience",   limit: "£5,000",  outstanding: "£5,000",  overdue: "£3,200", days: 61, risk: "High"   },
  ];
  const summary = [
    { label: "Total Receivable", value: "£3,84,600", color: "#1a69c4" },
    { label: "Overdue",          value: "£42,800",   color: "#ef4444" },
    { label: "Avg. Collection",  value: "28 days",   color: "#f59e0b" },
  ];
  const riskColor = (r: string) => r === "Low" ? "#10b981" : r === "Medium" ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {summary.map((s, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8 text-center">
            <p className="text-[7.5px] text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-[13px] font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Party Ledger — Outstanding Balances</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Party","Credit Limit","Outstanding","Overdue","Overdue Days","Risk"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {parties.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.name}</td>
                <td className="py-1.5 pr-3 text-white/45">{r.limit}</td>
                <td className="py-1.5 pr-3 text-white/70 font-semibold">{r.outstanding}</td>
                <td className="py-1.5 pr-3 font-bold" style={{ color: r.overdue === "£0" ? "#10b981" : "#ef4444" }}>{r.overdue}</td>
                <td className="py-1.5 pr-3 text-white/40">{r.days > 0 ? `${r.days}d` : "—"}</td>
                <td className="py-1.5">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: riskColor(r.risk), background: `${riskColor(r.risk)}18` }}>{r.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeliverySlide() {
  const routes = [
    { id: "Route A", driver: "Ahmed Khan",   vehicle: "LCV-01", stops: 8, delivered: 5, pending: 3, status: "En Route"  },
    { id: "Route B", driver: "Tom Clarke",   vehicle: "LCV-02", stops: 12, delivered: 8, pending: 4, status: "En Route" },
    { id: "Route C", driver: "Ravi Patel",   vehicle: "LCV-03", stops: 6, delivered: 6, pending: 0, status: "Completed" },
    { id: "Route D", driver: "James Osei",   vehicle: "LCV-04", stops: 9, delivered: 2, pending: 7, status: "En Route"  },
  ];
  const stops = [
    { stop: 6, party: "Metro Retail Ltd",    address: "14 High St, Leeds",    eta: "14:20", status: "Next Stop" },
    { stop: 7, party: "Green Leaf Co.",      address: "8 Mill Rd, Leeds",     eta: "14:55", status: "Pending"   },
    { stop: 8, party: "Sunrise Convenience", address: "32 Park Ave, Bradford", eta: "15:30", status: "Pending"  },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-2 shrink-0" style={{ width: "190px" }}>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[8.5px] font-semibold text-white/50 mb-2">Route Summary</p>
          <div className="space-y-2.5">
            {routes.map((r, i) => (
              <div key={i} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[7.5px] font-bold" style={{ color: r.status === "Completed" ? "#10b981" : "#1a69c4" }}>{r.id}</span>
                  <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: r.status === "Completed" ? "rgba(16,185,129,0.12)" : "rgba(26,105,196,0.12)", color: r.status === "Completed" ? "#10b981" : "#1a69c4" }}>{r.status}</span>
                </div>
                <p className="text-[7px] text-white/55">{r.driver} · {r.vehicle}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[6.5px] text-emerald-400 font-bold">{r.delivered} done</span>
                  <span className="text-[6.5px] text-white/30">·</span>
                  <span className="text-[6.5px] text-amber-400 font-bold">{r.pending} left</span>
                </div>
                <div className="mt-1 h-1 bg-white/8 rounded-full">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${(r.delivered / r.stops) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Route A — Ahmed Khan (Next Stops)</p>
        <div className="space-y-2">
          {stops.map((s, i) => (
            <div key={i} className="rounded-xl p-2.5 border flex items-center gap-3"
              style={{ background: s.status === "Next Stop" ? "rgba(26,105,196,0.10)" : "rgba(255,255,255,0.02)", borderColor: s.status === "Next Stop" ? "rgba(26,105,196,0.30)" : "rgba(255,255,255,0.07)" }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                style={{ background: s.status === "Next Stop" ? "#1a69c4" : "rgba(255,255,255,0.08)", color: s.status === "Next Stop" ? "#fff" : "rgba(255,255,255,0.4)" }}>
                {s.stop}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] font-bold text-white/80">{s.party}</p>
                <p className="text-[7px] text-white/40 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{s.address}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[8px] font-bold" style={{ color: s.status === "Next Stop" ? "#1a69c4" : "rgba(255,255,255,0.5)" }}>ETA {s.eta}</p>
                <p className="text-[6.5px] font-bold" style={{ color: s.status === "Next Stop" ? "#10b981" : "rgba(255,255,255,0.3)" }}>{s.status}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl p-2.5 border" style={{ background: "rgba(16,185,129,0.05)", borderColor: "rgba(16,185,129,0.20)" }}>
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4" style={{ color: "#10b981" }} />
              <div>
                <p className="text-[7.5px] font-bold text-white/60">POD collected at 5 stops</p>
                <p className="text-[7px] text-white/35">Digital signature + photo captured — auto-synced to party ledger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DistributorDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "Sales Orders", Component: OrdersSlide  },
    { label: "Stock",        Component: StockSlide   },
    { label: "Ledger",       Component: LedgerSlide  },
    { label: "Deliveries",   Component: DeliverySlide },
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
            <Package className="w-3.5 h-3.5" style={{ color: "#1a69c4" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft Distributor</span>
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
  { icon: Package,      color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430", title: "Stock & Inventory",
    desc: "Multi-warehouse stock with batch tracking, expiry dates, and real-time committed vs available split.",
    pts: ["Batch & lot number tracking", "Expiry date management & alerts", "Multi-warehouse stock visibility", "FIFO / FEFO issue rules"] },
  { icon: ClipboardList,color: "#10b981", bg: "#052e1c", border: "#10b98130", title: "Sales Order Management",
    desc: "Take orders from retailers, allocate stock, generate invoices, and track fulfilment — all in one flow.",
    pts: ["Order booking from office or field app", "Stock allocation on order confirmation", "Partial delivery & backorder handling", "Invoice auto-generated on dispatch"] },
  { icon: FileText,     color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630", title: "VAT / GST Billing",
    desc: "Fully compliant invoicing with VAT or GST breakdowns, credit notes, and e-invoice integration.",
    pts: ["VAT / GST invoice generation", "Credit note & debit note management", "E-invoicing & Making Tax Digital ready", "Consolidated tax reports by period"] },
  { icon: BookOpen,     color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30", title: "Party Ledger",
    desc: "Every customer and supplier account — balances, credit limits, payment history, and aging reports.",
    pts: ["Credit limit alerts on order entry", "Aged debt report (30/60/90 days)", "Payment receipts & allocation", "Statement of account per party"] },
  { icon: Truck,        color: "#ef4444", bg: "#2e0a0a", border: "#ef444430", title: "Route & Delivery",
    desc: "Plan delivery routes, assign drivers, track progress live, and capture proof of delivery digitally.",
    pts: ["Daily route planning & optimisation", "Driver app with stop-by-stop navigation", "Digital POD — signature & photo", "Deviation & delay alerts"] },
  { icon: RefreshCw,    color: "#06b6d4", bg: "#011e26", border: "#06b6d430", title: "Purchase & Supplier",
    desc: "Raise purchase orders against reorder levels, receive goods, and track supplier performance.",
    pts: ["Auto purchase order on low stock", "GRN with batch & quantity verification", "Landed cost allocation", "Supplier price history & comparison"] },
  { icon: UserCheck,    color: "#ec4899", bg: "#2d0a1a", border: "#ec489930", title: "Salesman Management",
    desc: "Assign territories, set sales targets, track orders per rep, and calculate commissions automatically.",
    pts: ["Territory & route assignment", "Daily order targets vs actuals", "Mobile order-booking app for reps", "Commission calculation & payslip"] },
  { icon: BarChart3,    color: "#14b8a6", bg: "#021f1c", border: "#14b8a630", title: "Reports & Analytics",
    desc: "Stock movement, party-wise sales, route performance, and margin reports — all exportable.",
    pts: ["Party-wise sales & margin report", "Stock movement & valuation", "Route efficiency analytics", "Monthly P&L by product category"] },
];

const flow = [
  { step: "01", icon: ClipboardList, color: "#1a69c4", title: "Order Booked by Rep or Office",    detail: "Retailer order taken on mobile app or desktop — stock checked and allocated instantly" },
  { step: "02", icon: Package,       color: "#10b981", title: "Stock Allocated, Picking Starts",   detail: "Warehouse receives the pick list immediately — batch selected by FIFO and items flagged for loading" },
  { step: "03", icon: FileText,      color: "#8b5cf6", title: "Invoice Auto-Generated",            detail: "Tax-compliant invoice created automatically on dispatch confirmation — no manual invoice entry" },
  { step: "04", icon: Truck,         color: "#f59e0b", title: "Route Assigned, Driver Dispatched", detail: "Order slotted into the day's route — driver app shows all stops with ETAs and customer details" },
  { step: "05", icon: CheckCheck,    color: "#ef4444", title: "POD Collected at Delivery",         detail: "Customer signs digitally on driver app — photo of goods captured and synced to the system" },
  { step: "06", icon: BookOpen,      color: "#06b6d4", title: "Party Ledger Updated Instantly",    detail: "Invoice posted to customer account the moment POD is collected — outstanding balance updates in real time" },
];

const testimonials = [
  { quote: "We distribute to 400 retailers across Yorkshire. Before OneSoft, tracking who owed what was a nightmare — half our credit limits were being exceeded because the salesmen had no visibility. Now every rep sees the party balance before they take an order and our bad debt has dropped significantly.",
    name: "Tariq Mahmood",  role: "Managing Director",     co: "TM Foods Distribution, Bradford",     color: "#1a69c4" },
  { quote: "The route planning and digital POD changed everything for our drivers. No more paper delivery notes, no more arguments about whether something was delivered. The customer signs on the tablet, a photo is taken, and it's in the system before the driver leaves the premises.",
    name: "Sandra Lewis",   role: "Operations Manager",    co: "Lewis & Sons Wholesale, Birmingham",   color: "#10b981" },
  { quote: "Stock used to go out of date and we'd only find out when we tried to pick it. OneSoft shows us items approaching expiry weeks in advance and automatically prioritises FEFO issue. We've cut our write-off losses by over 70% in the first year.",
    name: "Imran Sheikh",   role: "Warehouse Director",    co: "Global Foods & Commodities, Manchester",color: "#8b5cf6" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function DistributorPage() {
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
            <span style={{ color: "#1a69c4", fontWeight: 600 }}>Wholesaler / Distributor</span>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <Package className="w-3.5 h-3.5" />Wholesaler & Distributor ERP
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Your Distribution,{" "}
              <span style={{ color: "#1a69c4" }}>Under Control.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Stock, orders, invoicing, delivery routes, party ledger, and field reps — all in one connected system. Know what you have, who owes you, and where every vehicle is — right now.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Wholesaler & Distributor ERP")}>
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
            <div className="h-[400px]"><DistributorDashboard /></div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 400,  suf: "+",  label: "Distributors & Wholesalers",   Icon: Store,      color: "#1a69c4" },
              { to: 10,   suf: "M+", label: "Invoices Generated",           Icon: FileText,   color: "#10b981" },
              { to: 99.9, suf: "%",  label: "Tax Compliance Rate",          Icon: BadgeCheck, color: "#8b5cf6", d: 1 },
              { to: 50,   suf: "%",  label: "Faster Delivery Planning",     Icon: Truck,      color: "#f59e0b" },
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
              <Sparkles className="w-3.5 h-3.5" />Order to Ledger in One Flow
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Order booked.<br />Delivered, invoiced, and posted.</h2>
            <p style={{ color: t55 }} className="text-lg">
              From the moment your rep books an order to the second the customer signs for delivery — every step tracked, every balance updated, every document generated automatically.
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
              <Package className="w-3.5 h-3.5" />8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Stock to ledger.<br />Warehouse to doorstep.</h2>
            <p style={{ color: t50 }} className="text-lg">
              Built specifically for distributors and wholesalers — not adapted from generic accounting software.
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

      {/* ═══ PARTY LEDGER DEEP-DIVE ══════════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(26,105,196,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <BookOpen className="w-3.5 h-3.5" />Know Exactly Who Owes You What
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">No more chasing payments<br />in a spreadsheet.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                Every customer and supplier has a live ledger — every invoice, every payment, every credit note posted automatically. Credit limits enforced at order entry. Aged debt reports generated at any time. Your accounts team knows exactly where every pound is.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: AlertTriangle, color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30",
                    title: "Credit limits enforced at the point of order",
                    sub: "Rep tries to book an order for a customer who's over their limit — system blocks it and shows the outstanding balance instantly" },
                  { icon: FileText,      color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430",
                    title: "Aged debt report always up to date",
                    sub: "See every customer broken into 0–30, 31–60, 61–90, and 90+ day buckets — in one report, any time" },
                  { icon: Wallet,        color: "#10b981", bg: "#052e1c", border: "#10b98130",
                    title: "Payments received and allocated in seconds",
                    sub: "Record a payment, select which invoices to knock off — partial payments handled correctly with running balance updated immediately" },
                  { icon: CheckCheck,    color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630",
                    title: "Statement of account sent to customer in one click",
                    sub: "Generate a branded PDF statement per customer showing all invoices, payments, and outstanding balance — email it directly from the system" },
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
                onClick={() => openCTAModal("Wholesaler & Distributor ERP")}>
                See Ledger Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* Party ledger card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(26,105,196,0.15)" }}>
                      <BookOpen className="w-4 h-4" style={{ color: "#1a69c4" }} />
                    </div>
                    <span className="font-bold text-sm">City Supermarkets — Ledger</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>Over Limit</span>
                </div>

                <div className="grid grid-cols-3 gap-px" style={{ background: dividerColor }}>
                  {[
                    { label: "Credit Limit",  value: "£50,000", color: "#1a69c4" },
                    { label: "Outstanding",   value: "£48,900", color: "#f59e0b" },
                    { label: "Overdue 42d",   value: "£12,400", color: "#ef4444" },
                  ].map(s => (
                    <div key={s.label} className="px-4 py-3" style={{ background: tableBg }}>
                      <p className="text-[10px] mb-1" style={{ color: t45 }}>{s.label}</p>
                      <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold mb-2" style={{ color: t55 }}>Recent Transactions</p>
                  {[
                    { date: "12 May", ref: "INV-8421", desc: "Sales Invoice",   amount: "+£9,840", color: "#ef4444"  },
                    { date: "10 May", ref: "RCP-0812", desc: "Payment Received",amount: "-£15,000",color: "#10b981" },
                    { date: "08 May", ref: "INV-8386", desc: "Sales Invoice",   amount: "+£7,200", color: "#ef4444"  },
                    { date: "05 May", ref: "CN-0041",  desc: "Credit Note",     amount: "-£640",   color: "#10b981" },
                    { date: "03 May", ref: "INV-8341", desc: "Sales Invoice",   amount: "+£11,300",color: "#ef4444"  },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-lg"
                      style={{ background: isLight ? "#f8fafc" : "rgba(255,255,255,0.025)", borderBottom: `1px solid ${dividerColor}` }}>
                      <span className="text-[10px]" style={{ color: t45 }}>{tx.date}</span>
                      <span className="text-[10px] font-mono" style={{ color: "#1a69c4" }}>{tx.ref}</span>
                      <span className="text-[10px]" style={{ color: t55 }}>{tx.desc}</span>
                      <span className="text-[11px] font-bold" style={{ color: tx.color }}>{tx.amount}</span>
                    </div>
                  ))}

                  <div className="mt-3 rounded-xl p-3 flex items-start gap-2"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}>
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#ef4444" }} />
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{ color: "#ef4444" }}>New Order Blocked</p>
                      <p className="text-[11px]" style={{ color: t45 }}>SO-4829 (£6,200) — customer is £2,500 above credit limit. Approval required before dispatch.</p>
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
              <Star className="w-3.5 h-3.5 fill-current" />What Distributors Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Trusted by distributors across the UK.</h2>
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
              Know your stock.<br />
              <span style={{ color: "#1a69c4" }}>Know your money. Always.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 400+ distributors and wholesalers running their entire operation on OneSoft. Go live in days, not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Wholesaler & Distributor ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Distributors across the UK trust OneSoft</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("Wholesaler & Distributor ERP")} />
      <Footer />
    </div>
  );
}
