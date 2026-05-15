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
  ArrowRight, CheckCircle2, Utensils, Users, Calendar,
  BarChart3, Receipt, ChevronRight, Star, Clock, ShieldCheck,
  TrendingUp, Zap, Globe, Lock, Sparkles, Building2,
  Monitor, ChefHat, Package, Wallet, ClipboardList,
  CheckCheck, UtensilsCrossed, Smartphone, AlertTriangle,
  Coffee, Pizza,
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

function FloorSlide() {
  const tables = [
    { id: "T01", seats: 4, status: "Occupied",   name: "Smith party",   covers: 3, mins: 42 },
    { id: "T02", seats: 2, status: "Available",  name: "",              covers: 0, mins: 0  },
    { id: "T03", seats: 6, status: "Reserved",   name: "Johnson x5",   covers: 5, mins: 0  },
    { id: "T04", seats: 4, status: "Occupied",   name: "Davis party",   covers: 4, mins: 18 },
    { id: "T05", seats: 2, status: "Occupied",   name: "Table for 2",   covers: 2, mins: 67 },
    { id: "T06", seats: 4, status: "Available",  name: "",              covers: 0, mins: 0  },
    { id: "T07", seats: 8, status: "Occupied",   name: "Birthday party",covers: 7, mins: 28 },
    { id: "T08", seats: 2, status: "Cleaning",   name: "",              covers: 0, mins: 0  },
    { id: "T09", seats: 4, status: "Available",  name: "",              covers: 0, mins: 0  },
    { id: "T10", seats: 6, status: "Reserved",   name: "Evans x4",     covers: 4, mins: 0  },
    { id: "T11", seats: 2, status: "Occupied",   name: "Walk-in",       covers: 1, mins: 9  },
    { id: "T12", seats: 4, status: "Available",  name: "",              covers: 0, mins: 0  },
  ];
  const statusColor = (s: string) => s === "Occupied" ? "#1a69c4" : s === "Reserved" ? "#f59e0b" : s === "Cleaning" ? "#ef4444" : "#10b981";
  const statusBg    = (s: string) => s === "Occupied" ? "rgba(26,105,196,0.18)" : s === "Reserved" ? "rgba(245,158,11,0.15)" : s === "Cleaning" ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)";
  const kpis = [
    { label: "Tables Occupied", value: "6/12",  color: "#1a69c4", Icon: UtensilsCrossed },
    { label: "Covers Today",    value: "84",    color: "#10b981", Icon: Users },
    { label: "Avg Table Time",  value: "38m",   color: "#f59e0b", Icon: Clock },
    { label: "Today's Revenue", value: "£1,840",color: "#8b5cf6", Icon: Receipt },
  ];
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
            <p className="text-[16px] font-black leading-none">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-h-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Floor Plan — Live</p>
        <div className="grid grid-cols-6 gap-1.5">
          {tables.map((t, i) => (
            <div key={i} className="rounded-lg p-1.5 flex flex-col items-center text-center"
              style={{ background: statusBg(t.status), border: `1px solid ${statusColor(t.status)}35` }}>
              <p className="text-[9px] font-black" style={{ color: statusColor(t.status) }}>{t.id}</p>
              <p className="text-[6.5px] text-white/40">{t.seats} seats</p>
              <p className="text-[6px] text-white/50 truncate w-full text-center mt-0.5">{t.status === "Occupied" ? `${t.mins}m` : t.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KitchenSlide() {
  const tickets = [
    { id: "#142", table: "T04", items: ["Grilled Salmon x1", "Caesar Salad x2"], mins: 18, status: "Cooking",  priority: "high"   },
    { id: "#143", table: "T01", items: ["Beef Burger x2", "Chips x2", "Coke x3"],  mins: 12, status: "Cooking",  priority: "normal" },
    { id: "#144", table: "T07", items: ["Margherita x3", "Lasagne x2"],             mins: 7,  status: "Pending",  priority: "normal" },
    { id: "#145", table: "T11", items: ["Soup of Day x1", "Garlic Bread x1"],       mins: 4,  status: "Ready",    priority: "normal" },
    { id: "#146", table: "T05", items: ["Chicken Tikka x2", "Naan x4"],             mins: 2,  status: "Pending",  priority: "high"   },
  ];
  const sColor = (s: string) => s === "Ready" ? "#10b981" : s === "Cooking" ? "#f59e0b" : "#94a3b8";
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {[
          { label: "Pending Tickets", value: "3",   color: "#94a3b8" },
          { label: "Cooking Now",     value: "2",   color: "#f59e0b" },
          { label: "Ready to Serve",  value: "1",   color: "#10b981" },
        ].map((k, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8 text-center">
            <p className="text-[7.5px] text-white/40 uppercase tracking-wider mb-1">{k.label}</p>
            <p className="text-[20px] font-black" style={{ color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-1 min-h-0 overflow-x-auto">
        {tickets.map((t, i) => (
          <div key={i} className="rounded-xl p-2.5 border shrink-0 flex flex-col min-h-0"
            style={{ width: "140px", background: `${sColor(t.status)}0c`, borderColor: `${sColor(t.status)}30` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black" style={{ color: sColor(t.status) }}>{t.id}</span>
              <span className="text-[8px] font-bold text-white/50">{t.table}</span>
            </div>
            {t.priority === "high" && (
              <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full mb-1.5 self-start" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>PRIORITY</span>
            )}
            <div className="space-y-1 flex-1">
              {t.items.map((item, j) => (
                <p key={j} className="text-[7px] text-white/65 leading-tight">• {item}</p>
              ))}
            </div>
            <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-[7px] text-white/40">Ticket age: <span className="font-bold text-white/60">{t.mins}m</span></p>
              <div className="mt-1 text-[6.5px] font-bold px-1.5 py-0.5 rounded-full text-center"
                style={{ background: `${sColor(t.status)}18`, color: sColor(t.status) }}>{t.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalesSlide() {
  const hourly = [
    { h: "11",  rev: 120  },
    { h: "12",  rev: 380  },
    { h: "13",  rev: 620  },
    { h: "14",  rev: 440  },
    { h: "15",  rev: 160  },
    { h: "16",  rev: 90   },
    { h: "17",  rev: 220  },
    { h: "18",  rev: 480  },
    { h: "19",  rev: 710  },
    { h: "20",  rev: 590  },
  ];
  const max = Math.max(...hourly.map(h => h.rev));
  const topItems = [
    { name: "Grilled Salmon",    qty: 28, rev: "£700",  pct: 100 },
    { name: "Beef Burger",       qty: 34, rev: "£510",  pct: 73  },
    { name: "Chicken Tikka",     qty: 22, rev: "£440",  pct: 63  },
    { name: "Margherita Pizza",  qty: 19, rev: "£285",  pct: 41  },
    { name: "Caesar Salad",      qty: 31, rev: "£248",  pct: 35  },
  ];
  return (
    <div className="flex gap-3 flex-1 min-h-0">
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 shrink-0">
          <p className="text-[8px] font-semibold text-white/40 mb-2">Revenue by Hour</p>
          <div className="flex items-end gap-1 h-16">
            {hourly.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
                <div className="w-full rounded-sm" style={{ height: `${(h.rev / max) * 100}%`, background: "rgba(26,105,196,0.7)", minHeight: 2 }} />
                <span className="text-[6px] text-white/30">{h.h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {[
            { label: "Total Revenue", value: "£3,810", color: "#1a69c4" },
            { label: "Orders",        value: "134",    color: "#10b981" },
            { label: "Avg. Bill",     value: "£28.4",  color: "#f59e0b" },
            { label: "Covers",        value: "211",    color: "#8b5cf6" },
          ].map((s, i) => (
            <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8">
              <p className="text-[7px] text-white/40 mb-1">{s.label}</p>
              <p className="text-[14px] font-black" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 shrink-0" style={{ width: "180px" }}>
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Top Selling Items</p>
        <div className="space-y-2.5">
          {topItems.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[7px] text-white/65 truncate pr-1">{item.name}</span>
                <span className="text-[7px] font-bold text-white/50 shrink-0">{item.rev}</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: "#1a69c4" }} />
              </div>
              <p className="text-[6px] text-white/30 mt-0.5">{item.qty} sold</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReservationsSlide() {
  const bookings = [
    { ref: "RES-081", name: "Smith Family",    covers: 4, time: "12:00", table: "T03", status: "Confirmed", notes: "Birthday" },
    { ref: "RES-082", name: "Johnson Group",   covers: 8, time: "13:00", table: "T07", status: "Confirmed", notes: "Corporate" },
    { ref: "RES-083", name: "Evans, 2 pax",    covers: 2, time: "13:30", table: "T02", status: "Pending",   notes: "" },
    { ref: "RES-084", name: "Taylor x6",       covers: 6, time: "19:00", table: "T10", status: "Confirmed", notes: "Anniversary" },
    { ref: "RES-085", name: "Walk-in, 3 pax",  covers: 3, time: "19:45", table: "T06", status: "Seated",    notes: "" },
    { ref: "RES-086", name: "Brown Family",    covers: 5, time: "20:00", table: "T03", status: "Confirmed", notes: "" },
  ];
  const sColor = (s: string) => s === "Confirmed" ? "#10b981" : s === "Seated" ? "#1a69c4" : "#f59e0b";
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {[
          { label: "Today's Reservations", value: "18", color: "#1a69c4", Icon: Calendar },
          { label: "Confirmed",            value: "14", color: "#10b981", Icon: CheckCheck },
          { label: "Covers Expected",      value: "64", color: "#f59e0b", Icon: Users },
        ].map((k, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7.5px] text-white/40 uppercase tracking-wider">{k.label}</span>
              <k.Icon className="w-3 h-3" style={{ color: k.color }} />
            </div>
            <p className="text-[18px] font-black" style={{ color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Today's Booking Sheet</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Ref","Guest","Covers","Time","Table","Status","Notes"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {bookings.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-2 font-mono" style={{ color: "#1a69c4" }}>{r.ref}</td>
                <td className="py-1.5 pr-2 text-white/80 font-semibold">{r.name}</td>
                <td className="py-1.5 pr-2 text-white/50">{r.covers}</td>
                <td className="py-1.5 pr-2 text-white/65 font-semibold">{r.time}</td>
                <td className="py-1.5 pr-2 font-mono text-white/50">{r.table}</td>
                <td className="py-1.5 pr-2">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ color: sColor(r.status), background: `${sColor(r.status)}18` }}>{r.status}</span>
                </td>
                <td className="py-1.5 text-white/35 italic">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RestaurantDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "Live Floor",    Component: FloorSlide        },
    { label: "Kitchen",       Component: KitchenSlide      },
    { label: "Today's Sales", Component: SalesSlide        },
    { label: "Reservations",  Component: ReservationsSlide },
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
            <UtensilsCrossed className="w-3.5 h-3.5" style={{ color: "#1a69c4" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft Restaurant</span>
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
  { icon: Monitor,       color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430", title: "Point of Sale (POS)",
    desc: "Fast, touch-friendly till for dine-in, takeaway, and delivery — all from the same screen.",
    pts: ["Table, counter & drive-through modes", "Split bills & partial payments", "Cash, card & contactless", "Offline mode — never goes down"] },
  { icon: UtensilsCrossed, color: "#10b981", bg: "#052e1c", border: "#10b98130", title: "Table Management",
    desc: "Visual floor plan with real-time table status — occupied, reserved, available, or being cleaned.",
    pts: ["Drag-and-drop floor plan editor", "Multi-area & multi-floor support", "Table timer & cover count", "Walk-in & reservation assignment"] },
  { icon: ChefHat,       color: "#ef4444", bg: "#2e0a0a", border: "#ef444430", title: "Kitchen Display (KDS)",
    desc: "Orders appear on kitchen screens the instant they're placed — no printed tickets, no lost orders.",
    pts: ["Course-by-course firing", "Ticket priority & allergy alerts", "Item-level status (cooking / ready)", "Bump screen confirmation"] },
  { icon: ClipboardList, color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30", title: "Menu Management",
    desc: "Build and update your menu from the back office — items, categories, modifiers, and pricing.",
    pts: ["Modifier groups & add-ons", "Time-based & seasonal menus", "Item availability toggles", "Nutritional & allergen info"] },
  { icon: Package,       color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630", title: "Inventory & Stock",
    desc: "Track ingredients down to the gram — wastage logging, low-stock alerts, and supplier orders.",
    pts: ["Recipe-linked stock deduction", "Wastage & spoilage tracking", "Supplier purchase orders", "Low-stock & reorder alerts"] },
  { icon: Calendar,      color: "#06b6d4", bg: "#011e26", border: "#06b6d430", title: "Reservations & Booking",
    desc: "Online and phone reservations with table assignment, confirmation emails, and no-show tracking.",
    pts: ["Online booking widget", "Automated confirmation & reminders", "Deposit & pre-payment support", "No-show & cancellation tracking"] },
  { icon: Users,         color: "#ec4899", bg: "#2d0a1a", border: "#ec489930", title: "Staff & Shift Management",
    desc: "Rosters, clock-in/out, tip pooling, and payroll export — all linked to your team schedule.",
    pts: ["Weekly rota builder", "Clock-in / clock-out with PIN", "Tips tracking & pooling", "Payroll export (CSV / Xero)"] },
  { icon: BarChart3,     color: "#14b8a6", bg: "#021f1c", border: "#14b8a630", title: "Reports & Analytics",
    desc: "Revenue by hour, best-selling items, staff performance, and wastage — all on one dashboard.",
    pts: ["Hourly & daily revenue charts", "Top items & category sales", "Staff sales performance", "Wastage cost by day / week"] },
];

const flow = [
  { step: "01", icon: Users,         color: "#1a69c4", title: "Guest Seated at Table",         detail: "Table assigned from the live floor plan — status flips to Occupied in real time" },
  { step: "02", icon: ClipboardList, color: "#10b981", title: "Waiter Takes Order on Tablet",  detail: "Order entered via tablet POS — sent instantly to the kitchen display, no paper ticket" },
  { step: "03", icon: ChefHat,       color: "#ef4444", title: "Kitchen Cooks by Course",       detail: "Each course fires to the screen in sequence — chef confirms each item as it's ready" },
  { step: "04", icon: Utensils,      color: "#f59e0b", title: "Food Served — KDS Cleared",     detail: "Server bumps the ticket when food leaves the pass — timing logged for every cover" },
  { step: "05", icon: Receipt,       color: "#8b5cf6", title: "Bill Auto-Generated",           detail: "Every item from every round compiled into one itemised bill — split it any way needed" },
  { step: "06", icon: Wallet,        color: "#06b6d4", title: "Payment Taken, Stock Updated",  detail: "Payment recorded; ingredient stock deducted by recipe and wastage flagged if over-usage detected" },
];

const testimonials = [
  { quote: "We used to lose around £300 a week in unrecorded items — a bottle of wine here, a dessert there. Since going on OneSoft, every item is tracked from the moment it's ordered and our gross margin has improved by 8 percentage points.",
    name: "Chef Marco Rossi", role: "Owner & Head Chef", co: "Rossi's Trattoria, Toronto, Canada", color: "#1a69c4" },
  { quote: "The kitchen display system transformed our service speed. Before, our chefs were squinting at handwritten tickets. Now orders appear on screen the second the waiter taps confirm and the table timer tells us exactly when we're falling behind.",
    name: "Sarah Mitchell", role: "Restaurant Manager", co: "The Harbour Kitchen, Sydney, Australia", color: "#ef4444" },
  { quote: "We run three sites. Previously we had three different systems and no way to compare them. OneSoft shows me a combined report every morning — revenue, top sellers, staff performance across all three — in one view on my phone.",
    name: "David Park", role: "Multi-Site Operations Director", co: "Park Hospitality Group, New York, USA", color: "#10b981" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function RestaurantPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#f1f5f9"             : "#04091a";
  const tableBg      = isLight ? "#ffffff"             : "#07111f";
  const connectorBg  = isLight ? "#f1f5f9"             : "#070e1c";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const gridLine     = isLight ? "rgba(0,0,0,0.04)"   : "rgba(255,255,255,0.06)";
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
          {/* breadcrumb */}
          <motion.div className="flex items-center gap-2 text-sm mb-8" style={{ color: t45 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="hover:underline transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: t50 }}>Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#1a69c4", fontWeight: 600 }}>Restaurant Management</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <UtensilsCrossed className="w-3.5 h-3.5" />Restaurant Management ERP
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Your Restaurant,{" "}
              <span style={{ color: "#1a69c4" }}>Running Smoothly.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              POS, kitchen display, table management, reservations, inventory, and staff — all connected in one system. Less chaos in service, less waste in the kitchen, more money at the end of the night.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Restaurant Management ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{ background: secBtnBg, border: `1px solid ${secBtnBorder}`, color: secBtnColor }}
                onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                Explore All Modules
              </button>
            </motion.div>
          </div>

          {/* dashboard */}
          <motion.div className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
            <div className="h-[400px]"><RestaurantDashboard /></div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 300,  suf: "+",  label: "Restaurants on Platform",       Icon: UtensilsCrossed, color: "#1a69c4" },
              { to: 2,    suf: "M+", label: "Orders Processed",              Icon: Receipt,         color: "#10b981" },
              { to: 45,   suf: "s",  label: "Avg. Order to Kitchen Time",    Icon: Clock,           color: "#f59e0b" },
              { to: 30,   suf: "%",  label: "Reduction in Food Wastage",     Icon: TrendingUp,      color: "#8b5cf6" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  <s.Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-1">
                  <CountUp to={s.to} suffix={s.suf} />
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
              <Sparkles className="w-3.5 h-3.5" />Every Station Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Table to kitchen to payment.<br />All automatic.</h2>
            <p style={{ color: t55 }} className="text-lg">
              From the moment a guest is seated to the second payment clears — every touchpoint is tracked, timed, and recorded automatically. No gaps, no guesswork.
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
              <ChefHat className="w-3.5 h-3.5" />8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Front of house.<br />Back of house. All of house.</h2>
            <p style={{ color: t50 }} className="text-lg">
              From the POS on the floor to the stock room to the end-of-day report — every part of your operation in one connected system.
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

      {/* ═══ KDS DEEP-DIVE ═══════════════════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(239,68,68,0.06), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <ChefHat className="w-3.5 h-3.5" />Kitchen Display System
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">No more paper tickets.<br />No more shouted orders.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                The moment a waiter confirms an order on the POS, it appears on the kitchen screen — broken down by course, with allergy alerts highlighted and a live timer ticking. Chefs confirm each item as it's plated. Nothing gets missed, nothing gets cold.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Zap,          color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430",
                    title: "Orders appear on kitchen screen in under 2 seconds",
                    sub: "No printer jams, no lost tickets, no shouting across a pass — the screen updates the moment the order is confirmed" },
                  { icon: AlertTriangle,color: "#ef4444", bg: "#2e0a0a", border: "#ef444430",
                    title: "Allergy alerts highlighted automatically",
                    sub: "Any allergen flagged during ordering is shown in red on the kitchen ticket — before the chef starts cooking" },
                  { icon: Clock,        color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30",
                    title: "Live ticket timer — see which orders are running late",
                    sub: "Each ticket shows how long it's been waiting — tickets turn amber at 10 minutes and red at 15" },
                  { icon: CheckCheck,   color: "#10b981", bg: "#052e1c", border: "#10b98130",
                    title: "Bump confirmation sends 'ready' signal to the floor",
                    sub: "When the chef bumps the ticket, waitstaff on the floor are notified the food is at the pass — no more guessing" },
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
                onClick={() => openCTAModal("Restaurant Management ERP")}>
                See KDS in Action <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* KDS preview card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
                      <ChefHat className="w-4 h-4" style={{ color: "#ef4444" }} />
                    </div>
                    <span className="font-bold text-sm">Kitchen Display — Hot Section</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs" style={{ color: t45 }}>Live</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {[
                    { id: "#142", table: "T04", mins: 18, items: ["Grilled Salmon x1", "Dauphinoise Potatoes x1"], allergy: "Dairy", status: "cooking", late: true  },
                    { id: "#143", table: "T01", mins: 12, items: ["Beef Burger x2", "Skinny Fries x2"],             allergy: "",      status: "cooking", late: false },
                    { id: "#145", table: "T11", mins: 4,  items: ["Soup of the Day x1", "Sourdough x1"],            allergy: "Gluten",status: "ready",   late: false },
                  ].map((ticket, i) => (
                    <div key={i} className="rounded-xl p-3.5 transition-all"
                      style={{
                        background: ticket.status === "ready" ? "rgba(16,185,129,0.08)" : ticket.late ? "rgba(239,68,68,0.08)" : `${isLight ? "#f1f5f9" : "rgba(255,255,255,0.03)"}`,
                        border: `1.5px solid ${ticket.status === "ready" ? "rgba(16,185,129,0.30)" : ticket.late ? "rgba(239,68,68,0.30)" : dividerColor}`,
                      }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black" style={{ color: ticket.status === "ready" ? "#10b981" : ticket.late ? "#ef4444" : "#1a69c4" }}>{ticket.id}</span>
                          <span className="text-xs font-semibold" style={{ color: t55 }}>Table {ticket.table}</span>
                          {ticket.late && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>LATE</span>}
                          {ticket.status === "ready" && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>READY</span>}
                        </div>
                        <span className="text-xs font-bold" style={{ color: ticket.late ? "#ef4444" : t45 }}>{ticket.mins}m</span>
                      </div>
                      {ticket.allergy && (
                        <div className="flex items-center gap-1 mb-2 px-2 py-1 rounded-md" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
                          <AlertTriangle className="w-3 h-3" style={{ color: "#ef4444" }} />
                          <span className="text-[10px] font-bold" style={{ color: "#ef4444" }}>ALLERGY: {ticket.allergy}</span>
                        </div>
                      )}
                      <div className="space-y-1">
                        {ticket.items.map((item, j) => (
                          <p key={j} className="text-xs" style={{ color: t55 }}>• {item}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4">
                  <div className="rounded-xl p-3 flex items-center justify-between"
                    style={{ background: "rgba(26,105,196,0.08)", border: "1px solid rgba(26,105,196,0.20)" }}>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: t65 }}>Next ticket fires in</p>
                      <p className="text-lg font-black" style={{ color: "#1a69c4" }}>00:35</p>
                      <p className="text-[10px]" style={{ color: t45 }}>Table T07 — course 2 — 4 mains</p>
                    </div>
                    <Clock className="w-7 h-7 shrink-0" style={{ color: "#1a69c4" }} />
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
              <Star className="w-3.5 h-3.5 fill-current" />What Restaurants Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Trusted by restaurants worldwide.</h2>
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
              Less chaos in service.<br />
              <span style={{ color: "#1a69c4" }}>More money at closing.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 300+ restaurants running their entire operation on OneSoft. Set up in a day, earning more by the weekend.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Restaurant Management ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Restaurants worldwide trust OneSoft</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("Restaurant Management ERP")} />
      <FeatureMarqueeSection
        accentColor="#ea580c"
        heading="Everything a Restaurant Needs"
        subheading="From table orders to kitchen displays — every module built for modern restaurants and food chains."
        row1={[
          { icon: "🍽️", label: "Table Management",     color: "#ea580c" },
          { icon: "🖥️", label: "POS System",           color: "#8b5cf6" },
          { icon: "📺", label: "Kitchen Display",       color: "#10b981" },
          { icon: "📱", label: "Online Orders",         color: "#f59e0b" },
          { icon: "📋", label: "Menu Management",       color: "#06b6d4" },
          { icon: "📅", label: "Reservations",          color: "#ec4899" },
          { icon: "🛵", label: "Delivery Tracking",     color: "#14b8a6" },
          { icon: "🧑‍🍳", label: "Waiter App",          color: "#6366f1" },
          { icon: "📦", label: "Inventory Control",     color: "#f97316" },
          { icon: "🧮", label: "Recipe Costing",        color: "#a855f7" },
          { icon: "🚚", label: "Supplier Orders",       color: "#ef4444" },
          { icon: "🗑️", label: "Waste Tracking",       color: "#0ea5e9" },
        ]}
        row2={[
          { icon: "⭐", label: "Loyalty Program",       color: "#10b981" },
          { icon: "👥", label: "Staff Scheduling",      color: "#3b82f6" },
          { icon: "💵", label: "Payroll",               color: "#8b5cf6" },
          { icon: "💰", label: "Tips Management",       color: "#f59e0b" },
          { icon: "🏪", label: "Multi-Branch",          color: "#06b6d4" },
          { icon: "📊", label: "Sales Reports",         color: "#ec4899" },
          { icon: "🧾", label: "Tax Management",        color: "#14b8a6" },
          { icon: "💬", label: "Customer Feedback",     color: "#6366f1" },
          { icon: "📲", label: "QR Code Menu",          color: "#f97316" },
          { icon: "🏦", label: "Cash Drawer",           color: "#a855f7" },
          { icon: "↩️", label: "Void & Refunds",        color: "#ef4444" },
          { icon: "🌙", label: "Shift Reports",         color: "#0ea5e9" },
        ]}
        row3={[
          { icon: "☁️", label: "Cloud Hosted",          color: "#10b981" },
          { icon: "🔔", label: "Allergy Alerts",        color: "#3b82f6" },
          { icon: "🎯", label: "Upsell Prompts",        color: "#8b5cf6" },
          { icon: "📷", label: "CCTV Integration",      color: "#f59e0b" },
          { icon: "🧾", label: "Split Billing",         color: "#06b6d4" },
          { icon: "💳", label: "Multi-Payment",         color: "#ec4899" },
          { icon: "🌍", label: "Multi-Currency",        color: "#14b8a6" },
          { icon: "📈", label: "Food Cost Analysis",    color: "#6366f1" },
          { icon: "🔑", label: "Role-Based Access",     color: "#f97316" },
          { icon: "🤝", label: "Vendor Portal",         color: "#a855f7" },
          { icon: "🎁", label: "Promotions Engine",     color: "#ef4444" },
          { icon: "🔄", label: "Real-Time Sync",        color: "#0ea5e9" },
        ]}
      />
      <CustomSolutionsSection accentColor="#ea580c" productName="Restaurant ERP" />
      <ERPCrossLinks current="/restaurant" />
      <Footer />
    </div>
  );
}
