import { useRef, useEffect } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import {
  ArrowRight, CheckCircle2, BookOpen, Users, Package,
  BarChart3, RefreshCw, ShieldCheck, Layers, TrendingUp,
  Receipt, Wallet, Building2, Clock, FileText, Zap,
  ChevronRight, Star, CircleDollarSign, ArrowUpRight, ArrowDownRight,
  Boxes, Briefcase, Calculator, Sparkles, Lock, Globe,
} from "lucide-react";

/* ───────────────────── tiny chart helpers ───────────────────── */

function AreaChart({ data, color, w = 220, h = 60 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / range) * (h - 4) - 2 }));
  const line = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `M${pts[0].x.toFixed(1)},${h} ` + pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + ` L${pts[pts.length - 1].x.toFixed(1)},${h} Z`;
  const id = `acc${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.slice(-1).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} />)}
    </svg>
  );
}

/* ─────────────── Accounting Dashboard Mockup ───────────────── */

function AccountingDashboard() {
  const revenue  = [42, 55, 48, 70, 63, 85, 78, 95, 88, 102, 97, 118];
  const expenses = [30, 38, 35, 42, 38, 52, 48, 58, 54, 62,  58, 70 ];
  const months   = ["J","F","M","A","M","J","J","A","S","O","N","D"];

  const ledger = [
    { date: "12 May", ref: "INV-0291", account: "Accounts Receivable", debit: "£8,400", credit: "—",      type: "Dr", balance: "£84,200" },
    { date: "12 May", ref: "PUR-0183", account: "Inventory",            debit: "£3,200", credit: "—",      type: "Dr", balance: "£31,450" },
    { date: "11 May", ref: "PAY-0097", account: "Cash & Bank",          debit: "—",      credit: "£5,600", type: "Cr", balance: "£52,800" },
    { date: "11 May", ref: "SAL-0044", account: "Salaries Payable",     debit: "—",      credit: "£4,800", type: "Cr", balance: "£14,400" },
    { date: "10 May", ref: "EXP-0062", account: "Office Expenses",      debit: "£620",   credit: "—",      type: "Dr", balance: "£4,820"  },
  ];

  const staff = [
    { name: "Sarah Mitchell", dept: "Finance",    salary: "£4,800", ok: true  },
    { name: "James O'Brien",  dept: "Operations", salary: "£3,600", ok: true  },
    { name: "Priya Sharma",   dept: "Sales",      salary: "£3,200", ok: false },
    { name: "Tom Ashworth",   dept: "Warehouse",  salary: "£2,800", ok: true  },
  ];

  const kpis = [
    { label: "Revenue",   value: "£118K",  delta: "+21.6%", up: true,  color: "#10b981", icon: CircleDollarSign },
    { label: "Outstndg AR", value: "£24.8K", delta: "−3.2%",  up: false, color: "#3b82f6", icon: Receipt           },
    { label: "Payroll",   value: "£38.4K", delta: "+4 hires",up: true,  color: "#8b5cf6", icon: Users              },
    { label: "Stock",     value: "£67.2K", delta: "+8.4%",   up: true,  color: "#f59e0b", icon: Boxes              },
  ];

  return (
    <div className="w-full h-full bg-[#07111f] flex flex-col text-white p-3 gap-2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/70">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/8 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center"><Calculator className="w-3 h-3 text-white" /></div>
          <span className="text-[11px] font-bold">OneSoft Accounting</span>
        </div>
        <div className="flex gap-1">
          {["Dashboard","Ledger","Invoices","HRM","Inventory","Reports"].map(t => (
            <span key={t} className={`text-[8.5px] px-2 py-0.5 rounded ${t==="Dashboard" ? "bg-emerald-500/15 text-emerald-300 font-bold" : "text-white/30"}`}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-white/10 border border-white/15"/><span className="text-[8px] text-white/30">Admin</span></div>
      </div>

      {/* kpi row */}
      <div className="grid grid-cols-4 gap-2 shrink-0">
        {kpis.map((k,i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7.5px] text-white/40 uppercase tracking-wider">{k.label}</span>
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{background:`${k.color}20`}}>
                <k.icon className="w-3 h-3" style={{color:k.color}}/>
              </div>
            </div>
            <p className="text-[16px] font-black leading-none">{k.value}</p>
            <p className={`text-[7.5px] font-semibold mt-0.5 ${k.up?"text-emerald-400":"text-red-400"}`}>{k.delta}</p>
          </div>
        ))}
      </div>

      {/* main row */}
      <div className="flex gap-2 flex-1 min-h-0">
        {/* chart */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-56 shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[8.5px] font-semibold text-white/50">Revenue vs Expenses</p>
            <span className="text-[7px] text-emerald-400 font-bold">+21.6%</span>
          </div>
          <div className="flex-1 relative min-h-0">
            <AreaChart data={revenue}  color="#10b981" w={192} h={52}/>
            <div className="absolute inset-0 opacity-55"><AreaChart data={expenses} color="#818cf8" w={192} h={52}/></div>
          </div>
          <div className="grid grid-cols-12 gap-px mt-1.5">
            {months.map((m,i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className="w-full rounded-sm" style={{height:`${(revenue[i]/118)*14}px`,background:"#10b98128"}}/>
                <span className="text-[5px] text-white/20">{m}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-1">
            {[["Revenue","#10b981"],["Expenses","#818cf8"]].map(([l,c])=>(
              <div key={l} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{background:c}}/><span className="text-[7px] text-white/35">{l}</span></div>
            ))}
          </div>
        </div>

        {/* ledger */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
          <p className="text-[8.5px] font-semibold text-white/50 mb-1.5">General Ledger — Double Entry</p>
          <table className="w-full text-[7.5px]">
            <thead><tr>{["Date","Ref","Account","Debit","Credit","Balance","T"].map(h=>(
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>
              {ledger.map((r,i)=>(
                <tr key={i} className="border-t border-white/[0.04]">
                  <td className="py-1 text-white/35 pr-2 whitespace-nowrap">{r.date}</td>
                  <td className="py-1 text-blue-400 pr-2 whitespace-nowrap">{r.ref}</td>
                  <td className="py-1 text-white/80 pr-2 whitespace-nowrap">{r.account}</td>
                  <td className="py-1 text-emerald-400 pr-2 whitespace-nowrap">{r.debit}</td>
                  <td className="py-1 text-red-400 pr-2 whitespace-nowrap">{r.credit}</td>
                  <td className="py-1 text-white/55 pr-2 whitespace-nowrap">{r.balance}</td>
                  <td className="py-1"><span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.type==="Dr"?"text-emerald-400 bg-emerald-400/10":"text-violet-400 bg-violet-400/10"}`}>{r.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* hrm */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-38 shrink-0 flex flex-col" style={{minWidth:"148px"}}>
          <p className="text-[8.5px] font-semibold text-white/50 mb-2">HRM — Payroll</p>
          <div className="space-y-1.5 flex-1">
            {staff.map((e,i)=>(
              <div key={i} className="border-b border-white/[0.05] pb-1.5">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[8px] font-semibold truncate text-white/90">{e.name}</p>
                  <span className={`text-[6px] font-bold px-1 py-0.5 rounded-full ${e.ok?"text-emerald-400 bg-emerald-400/10":"text-amber-400 bg-amber-400/10"}`}>{e.ok?"Active":"Leave"}</span>
                </div>
                <div className="flex justify-between"><span className="text-[7px] text-white/30">{e.dept}</span><span className="text-[7.5px] font-semibold text-white/70">{e.salary}</span></div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 rounded-lg px-2 py-1.5 bg-violet-500/12 border border-violet-500/20">
            <p className="text-[7px] text-violet-300 font-semibold">Monthly Payroll</p>
            <p className="text-[14px] font-black text-white">£38,400</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── count-up ──────────────────────────────── */

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

/* ─────────────────── page data ─────────────────────────────── */

const modules = [
  { icon: BookOpen,   color: "#10b981", bg: "#052e1c", border: "#10b98130", title: "Double-Entry Bookkeeping",
    desc: "Every transaction auto-posts debit & credit entries simultaneously — GAAP and IFRS compliant.",
    pts: ["Auto journal entries on every transaction", "Trial balance & reconciliation in one click", "Multi-currency with live FX rates", "Full audit trail on every change"] },
  { icon: Users,      color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630", title: "HRM & Payroll",
    desc: "Full workforce management connected directly to accounts — every payroll run auto-journals instantly.",
    pts: ["Employee contracts & document vault", "Attendance, leave & overtime tracking", "Automated payroll with tax & NI calc", "Payslips generated & emailed automatically"] },
  { icon: Package,    color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30", title: "Products & Services",
    desc: "Define unlimited products and service lines with pricing tiers, tax codes, and units of measure.",
    pts: ["Product & service catalogue management", "Custom pricing tiers per customer", "Auto VAT / tax on every invoice line", "Service billing & timesheet integration"] },
  { icon: Boxes,      color: "#3b82f6", bg: "#0a1f3e", border: "#3b82f630", title: "Inventory Management",
    desc: "Real-time stock levels across multiple warehouses with automated reorder and full cost valuation.",
    pts: ["Multi-warehouse stock tracking", "Low-stock alerts & auto purchase orders", "FIFO / LIFO / weighted average costing", "Stock valuation live on balance sheet"] },
  { icon: Receipt,    color: "#ef4444", bg: "#2e0a0a", border: "#ef444430", title: "Invoicing & AR / AP",
    desc: "Professional invoices, payment tracking, automated chasers, and full payables management.",
    pts: ["Branded invoice & quote templates", "Recurring & subscription invoices", "Automated overdue payment chasers", "Aged debtors & creditors reports"] },
  { icon: BarChart3,  color: "#06b6d4", bg: "#011e26", border: "#06b6d430", title: "Financial Reporting",
    desc: "Live P&L, Balance Sheet, Cash Flow, and 40+ custom reports exportable to PDF or Excel.",
    pts: ["Real-time P&L & Balance Sheet", "Cash flow forecasting dashboard", "Budget vs actuals variance reports", "Read-only accountant portal access"] },
  { icon: Briefcase,  color: "#ec4899", bg: "#2d0a1a", border: "#ec489930", title: "Expense Management",
    desc: "Mobile expense submission, multi-level approvals, and auto-posting to the general ledger.",
    pts: ["Mobile app receipt capture", "Configurable approval workflows", "Per-diem & mileage rules", "Auto debit posting to ledger"] },
  { icon: RefreshCw,  color: "#14b8a6", bg: "#021f1c", border: "#14b8a630", title: "Everything Connected",
    desc: "Sales → Inventory → AR → Ledger → Payroll → Reports. One live system, zero manual re-entry.",
    pts: ["Real-time cross-module sync", "Single source of financial truth", "Role-based access control", "Open API for third-party apps"] },
];

const flow = [
  { step: "01", icon: FileText,   color: "#10b981", title: "Sales Invoice Raised",         detail: "Sales team raises invoice in seconds using the product catalogue" },
  { step: "02", icon: Boxes,      color: "#3b82f6", title: "Inventory Auto-Deducted",       detail: "Stock levels drop instantly — no warehouse team update needed" },
  { step: "03", icon: BookOpen,   color: "#8b5cf6", title: "Ledger Auto-Journaled",         detail: "Debit AR, credit Revenue posted automatically — double-entry complete" },
  { step: "04", icon: TrendingUp, color: "#f59e0b", title: "P&L Updates in Real Time",      detail: "Gross margin and revenue charts refresh the moment the invoice saves" },
  { step: "05", icon: Users,      color: "#ec4899", title: "Payroll Linked to Accounts",    detail: "Every salary run debits wages expense and credits bank automatically" },
  { step: "06", icon: BarChart3,  color: "#06b6d4", title: "Reports Always Accurate",       detail: "No month-end close needed — your Balance Sheet is live 24/7" },
];

const testimonials = [
  { quote: "We used to spend 3 days closing the books every month. With OneSoft it takes half a morning. The double-entry is automatic and our accountant has a read-only portal — she doesn't need to email us for reports anymore.",
    name: "Danielle Forsyth", role: "Finance Director", co: "Northgate Retail, Leeds", color: "#10b981" },
  { quote: "The HRM payroll link is a game-changer. Every month payroll runs, every journal posts automatically. I reviewed our PAYE submissions last year and found zero discrepancies for the first time ever.",
    name: "Ravi Menon", role: "Managing Director", co: "Spice Route Restaurants, Birmingham", color: "#8b5cf6" },
  { quote: "Our warehouse manager used to message me when stock was low. Now the system raises the PO automatically and I just approve it. Stock value always matches the Balance Sheet — magic.",
    name: "Tom Ashworth", role: "Operations Director", co: "Northern Star Distribution, Hull", color: "#3b82f6" },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default function AccountingPage() {
  const { openCTAModal } = useCTAModal();

  return (
    <div style={{ background: "#070e1c", color: "#fff" }} className="min-h-screen overflow-hidden">
      <Navigation />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]" style={{background:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.22), transparent)"}}/>
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full" style={{background:"rgba(16,185,129,0.12)",filter:"blur(90px)"}}
            animate={{y:[0,-18,0]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}/>
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full" style={{background:"rgba(139,92,246,0.1)",filter:"blur(110px)"}}
            animate={{y:[0,18,0]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut",delay:2}}/>
        </div>

        <div className="container mx-auto px-4">
          {/* breadcrumb */}
          <motion.div className="flex items-center gap-2 text-sm mb-8" style={{color:"rgba(255,255,255,0.45)"}}
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span style={{color:"rgba(255,255,255,0.5)"}}>Products</span>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span style={{color:"#34d399",fontWeight:600}}>Accounting & Bookkeeping</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",color:"#34d399"}}>
                <Calculator className="w-3.5 h-3.5"/>Accounting & Bookkeeping ERP
              </span>
            </motion.div>
            <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.08]"
              initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.1}}>
              Your Finances,{" "}
              <span style={{background:"linear-gradient(135deg,#34d399,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                Fully Automated.
              </span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{color:"rgba(255,255,255,0.6)"}}
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}>
              Double-entry bookkeeping, HRM, inventory, products & services — all interconnected in one platform. No more spreadsheets. No more manual data entry. Just clean, accurate books.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}}>
              <Button size="lg" className="h-14 px-10 text-lg text-white font-semibold"
                style={{background:"linear-gradient(135deg,#059669,#0d9488)",border:"none"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.85)"}}
                onClick={() => document.getElementById("modules")?.scrollIntoView({behavior:"smooth"})}>
                Explore All Modules
              </button>
            </motion.div>
          </div>

          {/* dashboard */}
          <motion.div className="max-w-5xl mx-auto"
            initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.45}}>
            <div className="h-[370px]"><AccountingDashboard /></div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{background:"rgba(255,255,255,0.03)",borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}
        className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {to:40,  suf:"+", label:"Accounting Modules",     Icon:Layers,     color:"#10b981"},
              {to:300, suf:"+", label:"Businesses on Platform",  Icon:Building2,  color:"#3b82f6"},
              {to:99.9,suf:"%", label:"Data Accuracy",           Icon:ShieldCheck,color:"#8b5cf6",d:1},
              {to:80,  suf:"%", label:"Time Saved on Bookkeeping",Icon:Clock,     color:"#f59e0b"},
            ].map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.5}}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{background:`${s.color}18`,border:`1px solid ${s.color}30`}}>
                  <s.Icon className="w-5 h-5" style={{color:s.color}}/>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-1"><CountUp to={s.to} suffix={s.suf} decimals={(s as any).d??0}/></h3>
                <p style={{color:"rgba(255,255,255,0.45)"}} className="text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FLOW — how it all connects ═════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 70% 50% at 50% 100%, rgba(16,185,129,0.07), transparent)"}}/>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(16,185,129,0.12)",border:"1px solid rgba(16,185,129,0.3)",color:"#34d399"}}>
              <Sparkles className="w-3.5 h-3.5"/>Zero Manual Work
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-5">One action. Six systems update.</h2>
            <p style={{color:"rgba(255,255,255,0.55)"}} className="text-lg">
              Raise a single invoice and watch your inventory, ledger, P&L, payroll, and reports all update themselves — no exports, no copy-paste, no re-entry.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flow.map((f,i)=>(
                <motion.div key={i}
                  initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:i*0.08,duration:0.5}}
                  className="relative rounded-2xl p-5 overflow-hidden"
                  style={{background:`${f.color}0d`,border:`1px solid ${f.color}25`}}>
                  <div className="absolute top-3 right-4 text-[42px] font-black leading-none select-none pointer-events-none"
                    style={{color:`${f.color}12`}}>{f.step}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{background:`${f.color}20`,border:`1px solid ${f.color}35`}}>
                    <f.icon className="w-5 h-5" style={{color:f.color}}/>
                  </div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p style={{color:"rgba(255,255,255,0.5)"}} className="text-sm leading-relaxed">{f.detail}</p>
                  {i < flow.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 flex items-center justify-center"
                      style={{background:"#070e1c",border:`1px solid ${f.color}40`}}>
                      <ArrowRight className="w-2.5 h-2.5" style={{color:f.color}}/>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MODULES GRID ════════════════════════════════════════ */}
      <div id="modules" className="py-24" style={{background:"#04091a"}}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-16"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.3)",color:"#60a5fa"}}>
              <Layers className="w-3.5 h-3.5"/>8 Core Modules
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-5">Everything You Need,<br/>Nothing You Don't.</h2>
            <p style={{color:"rgba(255,255,255,0.5)"}} className="text-lg">
              Built for ambitious businesses that need more than basic bookkeeping — without enterprise complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m,i)=>(
              <motion.div key={m.title}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.06,duration:0.5}}
                className="group rounded-2xl p-5 transition-all duration-300 cursor-default"
                style={{background:m.bg,border:`1px solid ${m.border}`}}
                whileHover={{y:-4,boxShadow:`0 20px 40px ${m.color}12`}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{background:`${m.color}20`,border:`1px solid ${m.color}40`}}>
                  <m.icon className="w-6 h-6" style={{color:m.color}}/>
                </div>
                <h3 className="text-base font-bold mb-2">{m.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>{m.desc}</p>
                <ul className="space-y-2">
                  {m.pts.map(p=>(
                    <li key={p} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                        style={{background:`${m.color}20`}}>
                        <CheckCircle2 className="w-2.5 h-2.5" style={{color:m.color}}/>
                      </div>
                      <span className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.55)"}}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ INVENTORY DEEP-DIVE ════════════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 60% 60% at 80% 50%, rgba(59,130,246,0.09), transparent)"}}/>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* text side */}
            <motion.div className="flex-1"
              initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65}}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.3)",color:"#60a5fa"}}>
                <Boxes className="w-3.5 h-3.5"/>Inventory + Accounting
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Stock that talks<br/>to your books.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{color:"rgba(255,255,255,0.55)"}}>
                When stock comes in, the system posts a debit to inventory and a credit to accounts payable — automatically. When it's sold, COGS hits the P&L in real time. Your gross margin is always accurate without a single spreadsheet.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: ArrowUpRight, color: "#10b981", bg: "#052e1c", border: "#10b98130",
                    title: "Purchase order → auto inventory receipt → auto AP journal",
                    sub: "Every goods receipt auto-debits inventory and credits your payables account" },
                  { icon: ArrowDownRight, color: "#3b82f6", bg: "#0a1f3e", border: "#3b82f630",
                    title: "Sales invoice → inventory deduction → revenue posting",
                    sub: "Selling one unit auto-reduces stock and books COGS vs Revenue immediately" },
                  { icon: Zap, color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30",
                    title: "Low-stock alert → automated reorder PO to supplier",
                    sub: "Configurable thresholds trigger purchase orders without human intervention" },
                  { icon: BarChart3, color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630",
                    title: "Real-time stock valuation always on your Balance Sheet",
                    sub: "FIFO, LIFO, or weighted average — your choice, applied automatically" },
                ].map((item,i)=>(
                  <motion.div key={i}
                    initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                    viewport={{once:true}} transition={{delay:i*0.08,duration:0.5}}
                    className="flex items-start gap-4 rounded-xl p-4"
                    style={{background:item.bg,border:`1px solid ${item.border}`}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{background:`${item.color}20`,border:`1px solid ${item.color}35`}}>
                      <item.icon className="w-5 h-5" style={{color:item.color}}/>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="h-13 px-8 text-base text-white font-semibold"
                style={{background:"linear-gradient(135deg,#1d4ed8,#1e40af)",border:"none"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                See Inventory Demo <ArrowRight className="ml-2 w-4 h-4"/>
              </Button>
            </motion.div>

            {/* inventory table */}
            <motion.div className="flex-1 w-full"
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65}}>
              <div className="rounded-2xl overflow-hidden" style={{background:"#07111f",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 30px 60px rgba(0,0,0,0.5)"}}>
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:"rgba(59,130,246,0.2)"}}>
                      <Boxes className="w-4 h-4 text-blue-400"/>
                    </div>
                    <span className="font-bold text-sm">Inventory Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                    <span className="text-xs" style={{color:"rgba(255,255,255,0.4)"}}>Live</span>
                  </div>
                </div>
                {/* summary row */}
                <div className="grid grid-cols-3 gap-px" style={{background:"rgba(255,255,255,0.06)"}}>
                  {[
                    {label:"Total Items",value:"847",color:"#60a5fa"},
                    {label:"Total Value",value:"£67.2K",color:"#34d399"},
                    {label:"Low / Out",value:"3 items",color:"#fbbf24"},
                  ].map(s=>(
                    <div key={s.label} className="px-4 py-3" style={{background:"#07111f"}}>
                      <p className="text-xs mb-1" style={{color:"rgba(255,255,255,0.35)"}}>{s.label}</p>
                      <p className="text-lg font-black" style={{color:s.color}}>{s.value}</p>
                    </div>
                  ))}
                </div>
                {/* table */}
                <div className="px-5 py-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                        {["Product","SKU","In Stock","Min","Value","Status"].map(h=>(
                          <th key={h} className="pb-3 text-left pr-4 font-medium" style={{color:"rgba(255,255,255,0.3)"}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {name:"Office Chairs",    sku:"PRD-0041",qty:24, min:10,val:"£3,600",st:"Good"},
                        {name:"Laptop Bags",      sku:"PRD-0082",qty:6,  min:8, val:"£540",  st:"Low"},
                        {name:"HP Ink Cartridges",sku:"PRD-0119",qty:0,  min:5, val:"£0",    st:"Out"},
                        {name:"Desk Lamps",       sku:"PRD-0036",qty:18, min:5, val:"£900",  st:"Good"},
                        {name:"Standing Desks",   sku:"PRD-0058",qty:3,  min:4, val:"£2,100",st:"Low"},
                      ].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                          <td className="py-3 pr-4 font-semibold" style={{color:"rgba(255,255,255,0.85)"}}>{r.name}</td>
                          <td className="py-3 pr-4 text-blue-400">{r.sku}</td>
                          <td className="py-3 pr-4" style={{color:"rgba(255,255,255,0.7)"}}>{r.qty}</td>
                          <td className="py-3 pr-4" style={{color:"rgba(255,255,255,0.35)"}}>{r.min}</td>
                          <td className="py-3 pr-4 font-semibold" style={{color:"rgba(255,255,255,0.7)"}}>{r.val}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{
                              background: r.st==="Good"?"rgba(16,185,129,0.12)":r.st==="Low"?"rgba(245,158,11,0.12)":"rgba(239,68,68,0.12)",
                              color:      r.st==="Good"?"#34d399"           :r.st==="Low"?"#fbbf24"           :"#f87171",
                              border:     `1px solid ${r.st==="Good"?"rgba(16,185,129,0.2)":r.st==="Low"?"rgba(245,158,11,0.2)":"rgba(239,68,68,0.2)"}`,
                            }}>{r.st}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* reorder alert */}
                <div className="mx-5 mb-5 rounded-xl p-3.5 flex items-center gap-3"
                  style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)"}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background:"rgba(239,68,68,0.15)"}}>
                    <Zap className="w-4 h-4 text-red-400"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-300">2 purchase orders auto-raised</p>
                    <p className="text-[11px] mt-0.5" style={{color:"rgba(255,255,255,0.4)"}}>Laptop Bags & HP Ink Cartridges — pending your approval</p>
                  </div>
                  <button className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0"
                    style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5"}}>
                    Review
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-24" style={{background:"#04091a"}}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-14"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(251,191,36,0.1)",border:"1px solid rgba(251,191,36,0.25)",color:"#fbbf24"}}>
              <Star className="w-3.5 h-3.5 fill-amber-400"/>Trusted by 300+ businesses
            </span>
            <h2 className="text-3xl md:text-4xl font-black">Why businesses switch to OneSoft</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
            {testimonials.map((t,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.55}}
                className="rounded-2xl p-6 flex flex-col"
                style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)"}}>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_,s)=><Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400"/>)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1 italic" style={{color:"rgba(255,255,255,0.7)"}}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4" style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                    style={{background:`${t.color}20`,color:t.color}}>
                    {t.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs mt-0.5" style={{color:"rgba(255,255,255,0.38)"}}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              {Icon:ShieldCheck, color:"#10b981", label:"GDPR Compliant"},
              {Icon:BookOpen,    color:"#3b82f6", label:"GAAP & IFRS Ready"},
              {Icon:Clock,       color:"#f59e0b", label:"99.9% Uptime SLA"},
              {Icon:Globe,       color:"#8b5cf6", label:"Multi-Currency"},
              {Icon:Lock,        color:"#ec4899", label:"Bank-Level Encryption"},
            ].map(b=>(
              <div key={b.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:`${b.color}15`,border:`1px solid ${b.color}25`}}>
                  <b.Icon className="w-4 h-4" style={{color:b.color}}/>
                </div>
                <span className="text-sm font-semibold" style={{color:"rgba(255,255,255,0.65)"}}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FINAL CTA ═══════════════════════════════════════════ */}
      <div className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.14), transparent)"}}/>
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 60% 60% at 80% 80%, rgba(139,92,246,0.1), transparent)"}}/>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
              style={{background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)"}}>
              <Calculator className="w-8 h-8" style={{color:"#34d399"}}/>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Ready to close your books<br/>in minutes, not days?
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{color:"rgba(255,255,255,0.55)"}}>
              Book a free 30-minute live demo. We'll walk through your exact business scenario — no slides, no scripts, no sales pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-lg text-white font-semibold"
                style={{background:"linear-gradient(135deg,#059669,#0d9488)",border:"none"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Book Free Demo <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.85)"}}
                onClick={() => openCTAModal("General Enquiry")}>
                Talk to Sales
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip />
      <Footer />
    </div>
  );
}
