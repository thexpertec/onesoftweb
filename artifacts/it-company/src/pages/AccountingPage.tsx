import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCTAModal } from "@/context/CTAModalContext";
import {
  ArrowRight, CheckCircle2, BookOpen, Users, Package,
  BarChart3, RefreshCw, ShieldCheck, Layers, TrendingUp,
  Receipt, Wallet, Building2, Clock, FileText, Zap,
  ChevronRight, Star, CircleDollarSign, ArrowUpRight, ArrowDownRight,
  Boxes, Briefcase, Calculator,
} from "lucide-react";

/* ─── Shared chart primitives (inline, no import) ───────────── */

function Sparkline({ data, color, w = 90, h = 28 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / range) * (h - 2) - 1).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AreaChart({ data, color, w = 220, h = 72 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / range) * (h - 4) - 2 }));
  const line = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `M${pts[0].x.toFixed(1)},${h} ` + pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + ` L${pts[pts.length - 1].x.toFixed(1)},${h} Z`;
  const id = `acctarea${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCard({ label, value, change, color, icon: Icon, up }: {
  label: string; value: string; change: string; color: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; up: boolean;
}) {
  return (
    <div className="bg-white/[0.04] rounded-xl p-2.5 flex flex-col gap-1 border border-white/8 min-w-0">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[8.5px] text-white/40 uppercase tracking-wider truncate">{label}</span>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}22` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
      </div>
      <p className="text-[17px] font-bold text-white leading-none">{value}</p>
      <p className={`text-[8px] font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>{change}</p>
    </div>
  );
}

/* ─── Accounting Dashboard Mockup ──────────────────────────── */

function AccountingDashboard() {
  const revenueData = [42, 55, 48, 70, 63, 85, 78, 95, 88, 102, 97, 118];
  const expenseData = [30, 38, 35, 42, 38, 52, 48, 58, 54, 62, 58, 70];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const ledgerRows = [
    { date: "12 May", ref: "INV-0291", account: "Accounts Receivable", debit: "£8,400", credit: "—",     balance: "£84,200", type: "Dr" },
    { date: "12 May", ref: "PUR-0183", account: "Inventory",            debit: "£3,200", credit: "—",     balance: "£31,450", type: "Dr" },
    { date: "11 May", ref: "PAY-0097", account: "Cash & Bank",          debit: "—",      credit: "£5,600",balance: "£52,800", type: "Cr" },
    { date: "11 May", ref: "SAL-0044", account: "Salaries Payable",     debit: "—",      credit: "£4,800",balance: "£14,400", type: "Cr" },
    { date: "10 May", ref: "EXP-0062", account: "Office Expenses",      debit: "£620",   credit: "—",     balance: "£4,820",  type: "Dr" },
  ];

  const employees = [
    { name: "Sarah Mitchell",  dept: "Finance",    salary: "£4,800", status: "Active",  leave: "0d" },
    { name: "James O'Brien",   dept: "Operations", salary: "£3,600", status: "Active",  leave: "2d" },
    { name: "Priya Sharma",    dept: "Sales",      salary: "£3,200", status: "On Leave",leave: "5d" },
    { name: "Tom Ashworth",    dept: "Warehouse",  salary: "£2,800", status: "Active",  leave: "0d" },
  ];

  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
      {/* NavBar */}
      <div className="flex items-center justify-between border-b border-white/8 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-emerald-600">
            <Calculator className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-bold text-white">OneSoft Accounting</span>
        </div>
        <div className="flex gap-2">
          {["Dashboard","Ledger","Invoices","HRM","Inventory","Reports"].map(t => (
            <span key={t} className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${t === "Dashboard" ? "font-semibold text-emerald-400 bg-emerald-400/15" : "text-white/35"}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-white/10 border border-white/15" />
          <span className="text-[8.5px] text-white/30">Admin</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 shrink-0">
        <StatCard label="Total Revenue"    value="£118K"  change="↑ 21.6% vs last month" color="#10b981" icon={CircleDollarSign} up={true}  />
        <StatCard label="Outstanding AR"   value="£24.8K" change="↓ 3.2% collected more"  color="#3b82f6" icon={Receipt}          up={false} />
        <StatCard label="Payroll This Month" value="£38.4K" change="↑ 4 new hires"         color="#8b5cf6" icon={Users}            up={true}  />
        <StatCard label="Stock Value"      value="£67.2K" change="↑ 8.4% restocked"        color="#f59e0b" icon={Boxes}            up={true}  />
      </div>

      {/* Charts + Ledger */}
      <div className="flex gap-2 flex-1 min-h-0">
        {/* Revenue vs Expense chart */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-64 shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-semibold text-white/50">Revenue vs Expenses (£K)</p>
            <span className="text-[7.5px] text-emerald-400 font-bold">+21.6%</span>
          </div>
          <div className="relative flex-1 flex flex-col justify-end">
            <div className="absolute inset-0 flex flex-col justify-end">
              <AreaChart data={revenueData} color="#10b981" w={228} h={64} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end opacity-60">
              <AreaChart data={expenseData} color="#6366f1" w={228} h={64} />
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            {["Revenue","Expenses"].map((l, i) => (
              <div key={l} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 0 ? "#10b981" : "#6366f1" }} />
                <span className="text-[7.5px] text-white/40">{l}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-px mt-2">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center gap-0.5">
                <div className="w-full rounded-sm" style={{ height: `${(revenueData[i] / 118) * 20}px`, backgroundColor: "#10b98130" }} />
                <span className="text-[5.5px] text-white/20">{m[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Double Entry Ledger */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
          <p className="text-[9px] font-semibold text-white/50 mb-2">General Ledger — Double Entry</p>
          <table className="w-full text-[8px]">
            <thead>
              <tr>
                {["Date","Ref","Account","Debit","Credit","Balance",""].map(h => (
                  <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ledgerRows.map((r, i) => (
                <tr key={i} className="border-t border-white/[0.04]">
                  <td className="py-1 text-white/40 pr-2 whitespace-nowrap">{r.date}</td>
                  <td className="py-1 text-blue-400 pr-2 whitespace-nowrap">{r.ref}</td>
                  <td className="py-1 text-white/80 pr-2 whitespace-nowrap">{r.account}</td>
                  <td className="py-1 text-emerald-400 pr-2 whitespace-nowrap">{r.debit}</td>
                  <td className="py-1 text-red-400 pr-2 whitespace-nowrap">{r.credit}</td>
                  <td className="py-1 text-white/60 pr-2 whitespace-nowrap">{r.balance}</td>
                  <td className="py-1"><span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${r.type === "Dr" ? "text-emerald-400 bg-emerald-400/10" : "text-violet-400 bg-violet-400/10"}`}>{r.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HRM mini-panel */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-40 shrink-0 flex flex-col">
          <p className="text-[9px] font-semibold text-white/50 mb-2">HRM — Payroll</p>
          <div className="space-y-2 flex-1">
            {employees.map((e, i) => (
              <div key={i} className="border-b border-white/[0.05] pb-2">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[8.5px] text-white font-medium truncate">{e.name}</p>
                  <span className={`text-[6.5px] font-bold px-1 py-0.5 rounded-full whitespace-nowrap ${e.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"}`}>{e.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[7px] text-white/35">{e.dept}</span>
                  <span className="text-[7.5px] text-white/70 font-semibold">{e.salary}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 bg-violet-500/10 border border-violet-500/20 rounded-lg px-2 py-1.5">
            <p className="text-[7.5px] text-violet-300 font-semibold">Monthly Payroll</p>
            <p className="text-[13px] font-bold text-white">£38,400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CountUp component ─────────────────────────────────────── */

function CountUp({ to, suffix = "", decimals = 0, duration = 2 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; },
    });
    return () => ctrl.stop();
  }, [isInView, to, suffix, decimals, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Inventory Status ──────────────────────────────────────── */

function InventoryPreview() {
  const items = [
    { name: "Office Chairs",     sku: "PRD-0041", qty: 24,  min: 10, status: "Good",     val: "£3,600" },
    { name: "Laptop Bags",       sku: "PRD-0082", qty: 6,   min: 8,  status: "Low",      val: "£540"   },
    { name: "HP Ink Cartridges", sku: "PRD-0119", qty: 0,   min: 5,  status: "Out",      val: "£0"     },
    { name: "Desk Lamps",        sku: "PRD-0036", qty: 18,  min: 5,  status: "Good",     val: "£900"   },
    { name: "Standing Desks",    sku: "PRD-0058", qty: 3,   min: 4,  status: "Low",      val: "£2,100" },
  ];
  return (
    <div className="bg-[#080f1e] rounded-2xl border border-white/10 p-4 text-white shadow-xl shadow-black/40">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-white">Inventory Status</p>
        <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded">Live</span>
      </div>
      <table className="w-full text-[11px]">
        <thead>
          <tr>
            {["Product","SKU","Qty","Min","Value","Status"].map(h => (
              <th key={h} className="text-white/30 font-medium pb-2 text-left pr-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={i} className="border-t border-white/[0.05]">
              <td className="py-2 text-white/85 font-medium pr-4">{r.name}</td>
              <td className="py-2 text-blue-400 pr-4">{r.sku}</td>
              <td className="py-2 text-white/70 pr-4">{r.qty}</td>
              <td className="py-2 text-white/40 pr-4">{r.min}</td>
              <td className="py-2 text-white/70 pr-4">{r.val}</td>
              <td className="py-2">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  r.status === "Good" ? "text-emerald-400 bg-emerald-400/10" :
                  r.status === "Low"  ? "text-amber-400 bg-amber-400/10" :
                  "text-red-400 bg-red-400/10"
                }`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

const features = [
  {
    icon: BookOpen,
    color: "#10b981",
    title: "Double-Entry Bookkeeping",
    desc: "Every transaction auto-posts both debit and credit entries — no manual journals, no reconciliation headaches. GAAP and IFRS compliant out of the box.",
    points: ["Auto journal entries", "Trial balance in one click", "Bank reconciliation", "Multi-currency support"],
  },
  {
    icon: Users,
    color: "#8b5cf6",
    title: "HRM & Payroll",
    desc: "Manage your entire workforce — contracts, attendance, leave, and payroll — all linked directly to your accounts so every salary run is auto-journaled.",
    points: ["Employee profiles & contracts", "Attendance & leave tracking", "Automated payroll runs", "Tax & NI calculations"],
  },
  {
    icon: Package,
    color: "#f59e0b",
    title: "Products & Services",
    desc: "Define unlimited products and service lines with pricing tiers, tax rates, and units. Attach them to invoices and purchase orders in seconds.",
    points: ["Product catalogue management", "Service billing & timesheets", "Custom pricing tiers", "Auto tax on invoices"],
  },
  {
    icon: Boxes,
    color: "#3b82f6",
    title: "Inventory Management",
    desc: "Real-time stock tracking across multiple warehouses with low-stock alerts, reorder automation, and full valuation reports.",
    points: ["Multi-warehouse stock control", "Low-stock auto-alerts", "Purchase order automation", "FIFO/LIFO/WAC costing"],
  },
  {
    icon: Receipt,
    color: "#ef4444",
    title: "Invoicing & AR/AP",
    desc: "Create professional invoices, track payments, chase overdue accounts, and manage your payables — all in one place with automated reminders.",
    points: ["Branded invoice templates", "Recurring invoices", "Automated payment reminders", "Aged AR/AP reports"],
  },
  {
    icon: BarChart3,
    color: "#06b6d4",
    title: "Financial Reporting",
    desc: "Real-time P&L, Balance Sheet, Cash Flow, and 40+ custom reports — exportable to PDF, Excel, or shared with your accountant via a read-only portal.",
    points: ["P&L & Balance Sheet live", "Cash flow forecasting", "Budget vs actuals", "Accountant portal access"],
  },
  {
    icon: Briefcase,
    color: "#ec4899",
    title: "Expense Management",
    desc: "Employees submit expenses via mobile, managers approve with one tap, and costs flow straight into your general ledger — no spreadsheets.",
    points: ["Mobile expense submission", "Receipt photo capture", "Multi-level approvals", "Auto ledger posting"],
  },
  {
    icon: RefreshCw,
    color: "#14b8a6",
    title: "Everything Interconnected",
    desc: "Sales → Inventory → AR → Ledger → Payroll → Reports. Every module talks to every other in real time — one system, zero data silos.",
    points: ["Live cross-module sync", "Single source of truth", "Audit trail on all changes", "Role-based access control"],
  },
];

const integrations = [
  { label: "Invoices",    icon: FileText,          color: "#10b981" },
  { label: "Payroll",     icon: Wallet,             color: "#8b5cf6" },
  { label: "Inventory",   icon: Boxes,              color: "#3b82f6" },
  { label: "HRM",         icon: Users,              color: "#f59e0b" },
  { label: "Expenses",    icon: Receipt,            color: "#ef4444" },
  { label: "Reports",     icon: BarChart3,          color: "#06b6d4" },
  { label: "Purchase",    icon: Package,            color: "#ec4899" },
  { label: "Bank Sync",   icon: RefreshCw,          color: "#14b8a6" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AccountingPage() {
  const { openCTAModal } = useCTAModal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-white">
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-background to-background -z-10" />
        <motion.div
          className="absolute top-24 left-[10%] w-80 h-80 bg-emerald-600/12 rounded-full blur-[100px] -z-10 pointer-events-none"
          animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-[6%] w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"
          animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60">Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-400 font-medium">Accounting & Bookkeeping</span>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Badge className="mb-5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20">
                <Calculator className="w-3 h-3 mr-2" />
                Accounting & Bookkeeping Software
              </Badge>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            >
              Your Finances,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Fully Automated.
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              Double-entry bookkeeping, HRM, inventory, products & services — all interconnected in one platform. No more spreadsheets. No more manual data entry. Just clean, accurate books.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10 bg-emerald-600 hover:bg-emerald-500 text-white"
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-10 border-border hover:bg-secondary"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                See All Features
              </Button>
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-[360px]">
              <AccountingDashboard />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="py-14 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 40,   suffix: "+",  label: "Accounting Modules",    icon: Layers          },
              { to: 300,  suffix: "+",  label: "Businesses on Platform", icon: Building2       },
              { to: 99.9, suffix: "%",  label: "Data Accuracy",          icon: ShieldCheck, d: 1 },
              { to: 80,   suffix: "%",  label: "Time Saved on Bookkeeping", icon: Clock       },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-1">
                  <CountUp to={s.to} suffix={s.suffix} decimals={(s as any).d ?? 0} />
                </h3>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it's all connected ────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-600/8 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Fully Integrated</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">One System. Zero Silos.</h2>
            <p className="text-muted-foreground">Every module feeds every other. Raise an invoice — inventory updates, AR posts, ledger journals. Hire an employee — payroll configures, HR records create, expense limits set.</p>
          </motion.div>

          {/* Integration hub */}
          <div className="max-w-2xl mx-auto relative">
            {/* Centre */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 flex flex-col items-center justify-center z-10 shadow-lg shadow-emerald-500/10">
              <Calculator className="w-7 h-7 text-emerald-400 mb-1" />
              <span className="text-[9px] font-bold text-emerald-300 text-center leading-tight">OneSoft<br/>Accounting</span>
            </div>

            {/* Surrounding modules */}
            <div className="grid grid-cols-4 gap-4 relative">
              {integrations.map((mod, i) => (
                <motion.div key={mod.label}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-xl flex flex-col items-center justify-center border shadow-md"
                    style={{ backgroundColor: `${mod.color}15`, borderColor: `${mod.color}30` }}>
                    <mod.icon className="w-6 h-6 mb-1" style={{ color: mod.color }} />
                    <span className="text-[8px] font-semibold" style={{ color: mod.color }}>{mod.label}</span>
                  </div>
                  {/* Connector line hint */}
                  <div className="w-px h-3 bg-white/10" />
                </motion.div>
              ))}
            </div>

            {/* Connection lines (decorative SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              {[0,1,2,3,4,5,6,7].map(i => (
                <line key={i}
                  x1="200" y1="100"
                  x2={50 + (i % 4) * 100} y2={i < 4 ? 30 : 170}
                  stroke="rgba(16,185,129,0.12)" strokeWidth="1" strokeDasharray="4 4"
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────── */}
      <section id="features" className="py-24 bg-[#070d1a]">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/30">Core Modules</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything You Need to Run Your Finances</h2>
            <p className="text-muted-foreground text-lg">Built for growing businesses that need more than basic bookkeeping — without the complexity of enterprise software.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group bg-white/[0.03] rounded-2xl p-5 border border-white/8 hover:border-white/18 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: f.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inventory preview ─────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <Badge className="mb-4 bg-blue-500/15 text-blue-400 border border-blue-500/30">Inventory + Accounting</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Stock that talks to your books.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                When stock comes in, the system posts a debit to inventory and a credit to accounts payable — automatically. When it's sold, COGS hits the P&L in real time. You'll always know your true gross margin without touching a spreadsheet.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: ArrowUpRight,  color: "#10b981", text: "Purchase order → auto inventory receipt → auto AP journal" },
                  { icon: ArrowDownRight,color: "#3b82f6", text: "Sales invoice → auto inventory deduction → auto revenue posting" },
                  { icon: Zap,           color: "#f59e0b", text: "Low-stock alerts trigger auto reorder POs to suppliers" },
                  { icon: BarChart3,     color: "#8b5cf6", text: "Real-time stock valuation on your Balance Sheet at all times" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-white/75 text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                See Inventory Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div className="flex-1 w-full"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <InventoryPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why businesses switch ─────────────────────────────── */}
      <section className="py-24 bg-[#070d1a]">
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Why OneSoft</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why businesses switch to us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            {[
              {
                quote: "We used to spend 3 days closing the books each month. With OneSoft Accounting, it takes half a morning. The double-entry is automatic and our accountant gets a read-only portal — she doesn't even email us for reports anymore.",
                author: "Danielle Forsyth", role: "Finance Director", company: "Northgate Retail, Leeds",
                stars: 5, color: "#10b981",
              },
              {
                quote: "The HRM payroll link is a game-changer. Every month payroll runs, every journal posts automatically. I reviewed our PAYE submissions last year and found zero discrepancies for the first time ever.",
                author: "Ravi Menon", role: "Managing Director", company: "Spice Route Restaurants, Birmingham",
                stars: 5, color: "#8b5cf6",
              },
              {
                quote: "Our warehouse manager used to send me a WhatsApp message when stock was low. Now the system raises a PO automatically and I just approve it. The stock value always matches the Balance Sheet.",
                author: "Tom Ashworth", role: "Operations Director", company: "Northern Star Distribution, Hull",
                stars: 5, color: "#3b82f6",
              },
            ].map((t, i) => (
              <motion.div key={i}
                className="bg-white/[0.03] rounded-2xl p-6 border border-white/8"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/75 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: `${t.color}30` }}>
                    {t.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-[11px] text-white/40">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: ShieldCheck, label: "GDPR Compliant",       color: "#10b981" },
              { icon: BookOpen,    label: "GAAP & IFRS Ready",    color: "#3b82f6" },
              { icon: Clock,       label: "99.9% Uptime SLA",     color: "#f59e0b" },
              { icon: TrendingUp,  label: "Multi-Currency",        color: "#8b5cf6" },
              { icon: Layers,      label: "Open API & Integrations", color: "#ec4899" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <b.icon className="w-4 h-4" style={{ color: b.color }} />
                <span className="text-white/60 font-medium text-sm">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-background to-violet-600/10 -z-10" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to close your books in minutes, not days?</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Book a free 30-minute live demo. We'll walk through your exact business scenario — no slides, no scripts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Book Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-border hover:bg-secondary"
                onClick={() => openCTAModal("General Enquiry")}>
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  );
}
