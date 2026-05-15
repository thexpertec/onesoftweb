import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ERPCrossLinks } from "@/components/ERPCrossLinks";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import { AccountingMarquee } from "@/components/AccountingMarquee";
import { CustomSolutionsSection } from "@/components/CustomSolutionsSection";
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

/* ─────────────────── Slide 1: Overview Dashboard ───────────────── */

function DashboardSlide() {
  const revenue  = [38,52,44,68,58,82,74,92,85,108,94,118];
  const expenses = [28,36,32,40,35,50,46,56,51,60,55,68];
  const months   = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const kpis = [
    { label:"Monthly Revenue",   value:"$118K",  delta:"+21.6%",  up:true,  color:"#1E4DA0", icon:CircleDollarSign },
    { label:"Outstanding AR",    value:"$24.8K", delta:"−3.2%",   up:false, color:"#1E4DA0", icon:Receipt },
    { label:"Monthly Payroll",   value:"$38.4K", delta:"+4 hires",up:true,  color:"#1E4DA0", icon:Users },
    { label:"Inventory Value",   value:"$67.2K", delta:"+8.4%",   up:true,  color:"#1E4DA0", icon:Boxes },
    { label:"Accounts Payable",  value:"$18.2K", delta:"Due 30d", up:false, color:"#1E4DA0", icon:Briefcase },
    { label:"Cash & Bank",       value:"$52.8K", delta:"+$4.2K",  up:true,  color:"#1E4DA0", icon:Wallet },
  ];
  const ledger = [
    { date:"15 May", ref:"INV-0291", account:"Accounts Receivable",debit:"$8,400", credit:"—",     type:"Dr" },
    { date:"15 May", ref:"PUR-0183", account:"Inventory",           debit:"$3,200", credit:"—",     type:"Dr" },
    { date:"14 May", ref:"PAY-0097", account:"Cash & Bank",         debit:"—",      credit:"$5,600",type:"Cr" },
    { date:"14 May", ref:"SAL-0044", account:"Salaries Payable",    debit:"—",      credit:"$4,800",type:"Cr" },
    { date:"13 May", ref:"EXP-0062", account:"Office Expenses",     debit:"$620",   credit:"—",     type:"Dr" },
    { date:"13 May", ref:"VAT-0031", account:"Tax Payable",         debit:"—",      credit:"$1,240",type:"Cr" },
  ];
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-6 gap-1.5 shrink-0">
        {kpis.map((k,i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[7px] text-white/35 uppercase tracking-wider truncate">{k.label}</span>
              <div className="w-4 h-4 rounded flex items-center justify-center shrink-0" style={{background:`${k.color}22`}}>
                <k.icon className="w-2.5 h-2.5" style={{color:k.color}}/>
              </div>
            </div>
            <p className="text-[13px] font-black leading-none text-white">{k.value}</p>
            <p className={`text-[7px] font-semibold ${k.up?"text-emerald-400":"text-red-400"}`}>{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-48 shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[8px] font-semibold text-white/50">Revenue vs Expenses</p>
            <span className="text-[6.5px] text-emerald-400 font-bold bg-emerald-400/10 px-1 py-0.5 rounded-full">+21.6%</span>
          </div>
          <div className="flex-1 relative min-h-0">
            <AreaChart data={revenue} color="#1E4DA0" w={168} h={46}/>
            <div className="absolute inset-0 opacity-50"><AreaChart data={expenses} color="#1E4DA0" w={168} h={46}/></div>
          </div>
          <div className="grid grid-cols-12 gap-px mt-1">
            {months.map((m,i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className="w-full rounded-sm" style={{height:`${(revenue[i]/118)*12}px`,background:"#1E4DA020"}}/>
                <span className="text-[4.5px] text-white/15">{m}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            {[["Revenue","#1E4DA0"],["Expenses","#1E4DA0"]].map(([l,c])=>(
              <div key={l} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{background:c}}/><span className="text-[6.5px] text-white/30">{l}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[8px] font-semibold text-white/50">General Ledger — Double Entry</p>
            <span className="text-[6.5px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded-full">Live · Auto-posted</span>
          </div>
          <table className="w-full text-[7px]">
            <thead><tr>{["Date","Ref","Account","Debit","Credit","Type"].map(h=>(
              <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>
              {ledger.map((r,i)=>(
                <tr key={i} className="border-t border-white/[0.04]">
                  <td className="py-1 text-white/30 pr-2 whitespace-nowrap">{r.date}</td>
                  <td className="py-1 text-[#1E4DA0] pr-2 whitespace-nowrap font-mono">{r.ref}</td>
                  <td className="py-1 text-white/75 pr-2 whitespace-nowrap">{r.account}</td>
                  <td className="py-1 text-emerald-400 pr-2 whitespace-nowrap font-semibold">{r.debit}</td>
                  <td className="py-1 text-red-400 pr-2 whitespace-nowrap font-semibold">{r.credit}</td>
                  <td className="py-1"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${r.type==="Dr"?"text-emerald-400 bg-emerald-400/10":"text-violet-400 bg-violet-400/10"}`}>{r.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-36 shrink-0 flex flex-col gap-1.5">
          <p className="text-[8px] font-semibold text-white/50">Financial Health</p>
          {[
            { label:"Current Ratio",    value:"2.4×", good:true  },
            { label:"Quick Ratio",      value:"1.8×", good:true  },
            { label:"Debt / Equity",    value:"0.77", good:true  },
            { label:"Days Sales Out.",  value:"19d",  good:true  },
            { label:"Gross Margin",     value:"64.9%",good:true  },
            { label:"Net Margin",       value:"33.0%",good:true  },
          ].map((r,i)=>(
            <div key={i} className="flex justify-between items-center border-b border-white/[0.04] pb-1">
              <span className="text-[7px] text-white/40">{r.label}</span>
              <span className={`text-[7.5px] font-bold ${r.good?"text-emerald-400":"text-red-400"}`}>{r.value}</span>
            </div>
          ))}
          <div className="mt-auto rounded-lg px-1.5 py-1 bg-emerald-500/12 border border-emerald-500/20">
            <p className="text-[6px] text-emerald-300 font-semibold">Overall Status</p>
            <p className="text-[10px] font-black text-white">Healthy ✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 2: P&L Report ───────────────────────── */

function PLSlide() {
  const netData = [12,8,15,18,11,22,19,28,24,31,27,36];
  const revenueData = [42,55,48,70,63,85,78,95,88,102,97,118];
  const months  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const income  = [
    { name:"Sales Revenue",       amount:"$284,400", pct:88, color:"#1E4DA0" },
    { name:"Service Revenue",     amount:"$32,800",  pct:55, color:"#1E4DA0" },
    { name:"Subscription Income", amount:"$12,600",  pct:32, color:"#1E4DA0" },
    { name:"Other Income",        amount:"$4,200",   pct:18, color:"#1E4DA0" },
  ];
  const expenses = [
    { name:"Cost of Goods Sold",  amount:"$112,600", pct:80, color:"#1E4DA0" },
    { name:"Salaries & Wages",    amount:"$68,400",  pct:58, color:"#1E4DA0" },
    { name:"Rent & Utilities",    amount:"$18,200",  pct:24, color:"#1E4DA0" },
    { name:"Marketing & Ads",     amount:"$9,800",   pct:14, color:"#1E4DA0" },
    { name:"Admin & Software",    amount:"$6,400",   pct: 9, color:"#1E4DA0" },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-1.5 shrink-0" style={{width:"184px"}}>
        <div className="bg-white/[0.03] rounded-xl p-2 border border-white/8 flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[7.5px] font-semibold text-white/50">Income</p>
            <span className="text-[7.5px] font-black text-emerald-400">$334,000</span>
          </div>
          {income.map((r,i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between mb-0.5"><span className="text-[6.5px] text-white/55">{r.name}</span><span className="text-[6.5px] font-semibold text-white/80">{r.amount}</span></div>
              <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full transition-all" style={{width:`${r.pct}%`,background:r.color}}/></div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 border border-white/8 flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[7.5px] font-semibold text-white/50">Expenses</p>
            <span className="text-[7.5px] font-black text-red-400">$215,400</span>
          </div>
          {expenses.map((r,i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between mb-0.5"><span className="text-[6.5px] text-white/55">{r.name}</span><span className="text-[6.5px] font-semibold text-white/80">{r.amount}</span></div>
              <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${r.pct}%`,background:r.color}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[8px] font-semibold text-white/50">Revenue & Net Profit — Monthly</p>
          <span className="text-[6.5px] text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded-full">+34.2% YoY</span>
        </div>
        <div className="relative flex-1 min-h-0">
          <AreaChart data={revenueData} color="#1E4DA0" w={340} h={52}/>
          <div className="absolute inset-0 opacity-80"><AreaChart data={netData} color="#1E4DA0" w={340} h={52}/></div>
        </div>
        <div className="flex gap-2 mb-1">
          {[["Revenue","#1E4DA0"],["Net Profit","#1E4DA0"]].map(([l,c])=>(
            <div key={l} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{background:c}}/><span className="text-[6px] text-white/30">{l}</span></div>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-px mb-2">
          {months.map((m,i) => <div key={i} className="text-center"><span className="text-[5px] text-white/15">{m}</span></div>)}
        </div>
        <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-white/8">
          {[
            { label:"Total Revenue",  value:"$334,000", color:"#1E4DA0" },
            { label:"Total Expenses", value:"$215,400", color:"#1E4DA0" },
            { label:"Net Profit",     value:"$118,600", color:"#1E4DA0" },
            { label:"Tax Provision",  value:"$23,720",  color:"#1E4DA0" },
          ].map((s,i) => (
            <div key={i} className="rounded-lg p-1.5" style={{background:`${s.color}12`}}>
              <p className="text-[6px] text-white/35 mb-0.5">{s.label}</p>
              <p className="text-[10px] font-black" style={{color:s.color}}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-32 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Profit Margins</p>
        {[
          { label:"Gross Margin",     value:"64.9%", color:"#1E4DA0", bar:65 },
          { label:"Operating Margin", value:"38.2%", color:"#1E4DA0", bar:38 },
          { label:"Net Margin",       value:"35.5%", color:"#1E4DA0", bar:36 },
          { label:"EBITDA Margin",    value:"41.5%", color:"#1E4DA0", bar:42 },
          { label:"ROE",              value:"28.4%", color:"#1E4DA0", bar:28 },
        ].map((m,i) => (
          <div key={i} className="mb-1.5">
            <div className="flex justify-between mb-0.5">
              <span className="text-[6.5px] text-white/45">{m.label}</span>
              <span className="text-[7px] font-bold" style={{color:m.color}}>{m.value}</span>
            </div>
            <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${m.bar}%`,background:m.color}}/></div>
          </div>
        ))}
        <div className="mt-auto rounded-lg px-1.5 py-1.5 bg-emerald-500/12 border border-emerald-500/20">
          <p className="text-[6px] text-emerald-300 font-semibold">YTD Net Profit</p>
          <p className="text-[12px] font-black text-white">$118.6K</p>
          <p className="text-[6px] text-emerald-400">+34.2% vs last year</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 3: Invoices & AR ────────────────────── */

function InvoicesSlide() {
  const invoices = [
    { num:"INV-0291", customer:"Northgate Retail Ltd",    date:"15 May", due:"29 May", amount:"$8,400",  status:"Sent"    },
    { num:"INV-0290", customer:"Spice Route Restaurants", date:"13 May", due:"27 May", amount:"$3,200",  status:"Overdue" },
    { num:"INV-0289", customer:"Northern Star Distrib.",  date:"10 May", due:"24 May", amount:"$12,750", status:"Paid"    },
    { num:"INV-0288", customer:"Meridian Tech Solutions", date:"08 May", due:"22 May", amount:"$5,600",  status:"Paid"    },
    { num:"INV-0287", customer:"Hartley & Sons Trading",  date:"05 May", due:"19 May", amount:"$2,100",  status:"Overdue" },
    { num:"INV-0286", customer:"Apex Logistics Group",    date:"01 May", due:"15 May", amount:"$9,300",  status:"Paid"    },
    { num:"INV-0285", customer:"BlueSky Pharma Ltd",      date:"28 Apr", due:"12 May", amount:"$4,800",  status:"Sent"    },
  ];
  const aging = [
    { label:"Current (0–30d)",  amount:"$13,200", pct:55, color:"#1E4DA0" },
    { label:"31–60 days",       amount:"$5,600",  pct:28, color:"#1E4DA0" },
    { label:"61–90 days",       amount:"$3,200",  pct:16, color:"#1E4DA0" },
    { label:"90+ days overdue", amount:"$2,100",  pct:11, color:"#1E4DA0" },
  ];
  const sc = (s:string) => s==="Paid"?"text-emerald-400 bg-emerald-400/10":s==="Overdue"?"text-red-400 bg-red-400/10":"text-[#1E4DA0] bg-[#1E4DA0]/10";
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Sales Invoices — May 2026</p>
          <div className="flex gap-1">
            {[["Sent","#1E4DA0"],["Overdue","#1E4DA0"],["Paid","#1E4DA0"]].map(([s,c])=>(
              <span key={s} className="text-[6px] font-bold px-1.5 py-0.5 rounded-full" style={{color:c,background:`${c}18`}}>{s}</span>
            ))}
          </div>
        </div>
        <table className="w-full text-[7px]">
          <thead><tr>{["Invoice","Customer","Issued","Due","Amount","Status"].map(h=>(
            <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {invoices.map((r,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-0.5 text-[#1E4DA0] pr-2 whitespace-nowrap font-mono">{r.num}</td>
                <td className="py-0.5 text-white/80 pr-2 whitespace-nowrap">{r.customer}</td>
                <td className="py-0.5 text-white/30 pr-2 whitespace-nowrap">{r.date}</td>
                <td className="py-0.5 text-white/30 pr-2 whitespace-nowrap">{r.due}</td>
                <td className="py-0.5 text-white/90 font-semibold pr-2 whitespace-nowrap">{r.amount}</td>
                <td className="py-0.5"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${sc(r.status)}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto pt-1.5 border-t border-white/8 grid grid-cols-4 gap-1.5">
          {[
            { label:"Sent",           value:"$13,200", color:"#1E4DA0" },
            { label:"Overdue",        value:"$5,300",  color:"#1E4DA0" },
            { label:"Paid (MTD)",     value:"$27,650", color:"#1E4DA0" },
            { label:"Avg Days DSO",   value:"19 days", color:"#1E4DA0" },
          ].map((s,i) => (
            <div key={i} className="rounded-lg p-1" style={{background:`${s.color}12`}}>
              <p className="text-[6px] text-white/35">{s.label}</p>
              <p className="text-[9px] font-black" style={{color:s.color}}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-36 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Aged Debtors</p>
        {aging.map((a,i) => (
          <div key={i} className="mb-1.5">
            <div className="flex justify-between mb-0.5">
              <span className="text-[6.5px] text-white/45">{a.label}</span>
              <span className="text-[7px] font-semibold" style={{color:a.color}}>{a.amount}</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${a.pct}%`,background:a.color}}/></div>
          </div>
        ))}
        <div className="mt-1.5 pt-1.5 border-t border-white/8">
          <p className="text-[7px] font-semibold text-white/50 mb-1">Collection Rate</p>
          <div className="h-1.5 bg-white/8 rounded-full mb-0.5"><div className="h-full rounded-full bg-emerald-400" style={{width:"84%"}}/></div>
          <span className="text-[7.5px] font-bold text-emerald-400">84% on-time</span>
        </div>
        <div className="mt-auto rounded-lg px-1.5 py-1.5 bg-[#1E4DA0]/12 border border-[#1E4DA0]/20">
          <p className="text-[6px] text-[#1E4DA0] font-semibold">Total Outstanding</p>
          <p className="text-[12px] font-black text-white">$24,100</p>
          <p className="text-[6px] text-white/35">Across 4 invoices</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 4: HRM & Payroll ────────────────────── */

function HRMSlide() {
  const staff = [
    { name:"Sarah Mitchell", dept:"Finance",    salary:"$4,800", days:22, leave:0, ok:true  },
    { name:"James O'Brien",  dept:"Operations", salary:"$3,600", days:21, leave:1, ok:true  },
    { name:"Priya Sharma",   dept:"Sales",      salary:"$3,200", days:18, leave:4, ok:false },
    { name:"Tom Ashworth",   dept:"Warehouse",  salary:"$2,800", days:22, leave:0, ok:true  },
    { name:"Lucy Chen",      dept:"Finance",    salary:"$4,200", days:20, leave:2, ok:true  },
    { name:"Kiran Patel",    dept:"Sales",      salary:"$3,400", days:21, leave:1, ok:true  },
  ];
  const depts = [
    { name:"Finance",    count:2, cost:"$9,000", color:"#1E4DA0", pct:65 },
    { name:"Operations", count:1, cost:"$3,600", color:"#1E4DA0", pct:27 },
    { name:"Sales",      count:2, cost:"$6,600", color:"#1E4DA0", pct:50 },
    { name:"Warehouse",  count:1, cost:"$2,800", color:"#1E4DA0", pct:21 },
  ];
  const payBreakdown = [
    { label:"Base Salaries",   amount:"$32,400", color:"#1E4DA0", pct:84 },
    { label:"Overtime",        amount:"$2,800",  color:"#1E4DA0", pct:13 },
    { label:"Bonuses",         amount:"$1,600",  color:"#1E4DA0", pct: 8 },
    { label:"Employer Tax",    amount:"$3,840",  color:"#1E4DA0", pct:10 },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Employee Directory — 12 Headcount</p>
          <span className="text-[6.5px] text-violet-400 bg-violet-400/10 px-1.5 py-0.5 rounded-full font-semibold">May Payroll</span>
        </div>
        <table className="w-full text-[7px]">
          <thead><tr>{["Employee","Dept","Days","Leave","Pay","Status"].map(h=>(
            <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {staff.map((e,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-0.5 text-white/85 font-semibold pr-2 whitespace-nowrap">{e.name}</td>
                <td className="py-0.5 text-white/35 pr-2 whitespace-nowrap">{e.dept}</td>
                <td className="py-0.5 text-white/50 pr-2 whitespace-nowrap">{e.days}/22</td>
                <td className="py-0.5 pr-2 whitespace-nowrap"><span className={e.leave>0?"text-amber-400":"text-white/25"}>{e.leave}d</span></td>
                <td className="py-0.5 text-emerald-400 font-semibold pr-2 whitespace-nowrap">{e.salary}</td>
                <td className="py-0.5"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${e.ok?"text-emerald-400 bg-emerald-400/10":"text-amber-400 bg-amber-400/10"}`}>{e.ok?"Active":"Leave"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-1.5 w-40 shrink-0">
        <div className="bg-white/[0.03] rounded-xl p-2 border border-white/8 flex-1">
          <p className="text-[7.5px] font-semibold text-white/50 mb-1.5">Dept Costs</p>
          {depts.map((d,i)=>(
            <div key={i} className="mb-1.5">
              <div className="flex justify-between mb-0.5">
                <div className="flex items-center gap-1"><div className="w-1 h-1 rounded-full" style={{background:d.color}}/><span className="text-[6.5px] text-white/60">{d.name}</span></div>
                <span className="text-[6.5px] font-bold" style={{color:d.color}}>{d.cost}</span>
              </div>
              <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${d.pct}%`,background:d.color}}/></div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2 border border-white/8 flex-1">
          <p className="text-[7.5px] font-semibold text-white/50 mb-1">Payroll Breakdown</p>
          {payBreakdown.map((p,i)=>(
            <div key={i} className="mb-1">
              <div className="flex justify-between mb-0.5"><span className="text-[6px] text-white/40">{p.label}</span><span className="text-[6.5px] font-semibold text-white/70">{p.amount}</span></div>
              <div className="h-0.5 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${p.pct}%`,background:p.color}}/></div>
            </div>
          ))}
          <div className="mt-1.5 rounded-md px-1.5 py-1 bg-violet-500/12 border border-violet-500/20">
            <p className="text-[6px] text-violet-300">Total Payroll</p>
            <p className="text-[11px] font-black text-white">$38,400</p>
            <p className="text-[6px] text-emerald-400">Auto-journaled ✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 5: Balance Sheet ────────────────────── */

function BalanceSheetSlide() {
  const assets = [
    { name:"Cash & Bank",           value:"$52,800",   color:"#1E4DA0" },
    { name:"Accounts Receivable",   value:"$24,800",   color:"#1E4DA0" },
    { name:"Inventory",             value:"$67,200",   color:"#1E4DA0" },
    { name:"Prepaid Expenses",      value:"$3,400",    color:"#1E4DA0" },
    { name:"Property & Equipment",  value:"$148,000",  color:"#1E4DA0" },
    { name:"Less: Depreciation",    value:"($22,400)", color:"#1E4DA0" },
  ];
  const liabilities = [
    { name:"Accounts Payable",  value:"$18,200",  color:"#1E4DA0" },
    { name:"Tax Payable",       value:"$6,400",   color:"#1E4DA0" },
    { name:"Salaries Payable",  value:"$14,400",  color:"#1E4DA0" },
    { name:"Bank Loan (LT)",    value:"$80,000",  color:"#1E4DA0" },
  ];
  const equity = [
    { name:"Retained Earnings", value:"$106,000", color:"#1E4DA0" },
    { name:"Share Capital",     value:"$48,800",  color:"#1E4DA0" },
  ];
  const ratios = [
    { label:"Current Ratio",  value:"2.4×",  color:"#1E4DA0" },
    { label:"Debt Ratio",     value:"0.43",  color:"#1E4DA0" },
    { label:"Equity Ratio",   value:"0.57",  color:"#1E4DA0" },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Assets</p>
          <span className="text-[8px] font-black text-emerald-400">$273,800</span>
        </div>
        {assets.map((a,i)=>(
          <div key={i} className="flex items-center justify-between py-0.5 border-b border-white/[0.04]">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:a.color}}/><span className="text-[7px] text-white/60">{a.name}</span></div>
            <span className="text-[7px] font-semibold text-white/80">{a.value}</span>
          </div>
        ))}
        <div className="flex justify-between mt-1 pt-1 border-t border-white/15">
          <span className="text-[7.5px] font-bold text-white/65">Total Assets</span>
          <span className="text-[7.5px] font-black text-emerald-400">$273,800</span>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Liabilities</p>
          <span className="text-[8px] font-black text-red-400">$119,000</span>
        </div>
        {liabilities.map((a,i)=>(
          <div key={i} className="flex items-center justify-between py-0.5 border-b border-white/[0.04]">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:a.color}}/><span className="text-[7px] text-white/60">{a.name}</span></div>
            <span className="text-[7px] font-semibold text-white/80">{a.value}</span>
          </div>
        ))}
        <div className="mt-1.5 pt-1.5 border-t border-white/8">
          <p className="text-[7.5px] font-semibold text-white/45 mb-1">Equity</p>
          {equity.map((a,i)=>(
            <div key={i} className="flex items-center justify-between py-0.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:a.color}}/><span className="text-[7px] text-white/60">{a.name}</span></div>
              <span className="text-[7px] font-semibold text-white/80">{a.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 pt-1 border-t border-white/15">
          <span className="text-[7.5px] font-bold text-white/65">Total L&E</span>
          <span className="text-[7.5px] font-black text-[#1E4DA0]">$273,800</span>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-36 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Summary</p>
        <div className="space-y-1.5">
          {[
            { label:"Total Assets",      value:"$273,800", color:"#1E4DA0" },
            { label:"Total Liabilities", value:"$119,000", color:"#1E4DA0" },
            { label:"Total Equity",      value:"$154,800", color:"#1E4DA0" },
          ].map((s,i)=>(
            <div key={i} className="rounded-lg p-1.5" style={{background:`${s.color}12`}}>
              <p className="text-[6px] text-white/35">{s.label}</p>
              <p className="text-[10px] font-black" style={{color:s.color}}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-1.5 border-t border-white/8">
          <p className="text-[7.5px] font-semibold text-white/45 mb-1">Key Ratios</p>
          {ratios.map((r,i)=>(
            <div key={i} className="flex justify-between mb-0.5">
              <span className="text-[6.5px] text-white/35">{r.label}</span>
              <span className="text-[7px] font-bold" style={{color:r.color}}>{r.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-lg px-1.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30">
          <div className="flex items-center gap-1"><span className="text-[8px] text-emerald-400 font-black">✓</span><p className="text-[7px] text-emerald-300 font-bold">Balanced</p></div>
          <p className="text-[6px] text-white/25">Assets = Liabilities + Equity</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 6: Cash Flow ────────────────────────── */

function CashFlowSlide() {
  const monthly = [18,-4,22,15,-8,28,24,32,19,35,28,42];
  const mLabels = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const operating = [
    { name:"Net Income",                amount:"$118,600", sign:1  },
    { name:"Depreciation Add-back",     amount:"$22,400",  sign:1  },
    { name:"Accounts Receivable (Δ)",   amount:"($6,200)", sign:-1 },
    { name:"Inventory (Δ)",             amount:"($9,400)", sign:-1 },
    { name:"Accounts Payable (Δ)",      amount:"$4,800",   sign:1  },
  ];
  const investing = [
    { name:"Equipment Purchase",        amount:"($28,000)", sign:-1 },
    { name:"Software Licenses",         amount:"($4,200)",  sign:-1 },
    { name:"Proceeds — Asset Sale",     amount:"$8,600",    sign:1  },
  ];
  const financing = [
    { name:"Loan Repayment",            amount:"($12,000)", sign:-1 },
    { name:"Dividend Paid",             amount:"($8,000)",  sign:-1 },
    { name:"New Equity Raised",         amount:"$0",        sign:0  },
  ];
  const maxBar = 42;
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-1.5 shrink-0" style={{width:"200px"}}>
        {[
          { title:"Operating Activities",  items:operating,  total:"$130,200", color:"#1E4DA0" },
          { title:"Investing Activities",  items:investing,  total:"($23,600)",color:"#1E4DA0" },
          { title:"Financing Activities",  items:financing,  total:"($20,000)",color:"#1E4DA0" },
        ].map((sec,si)=>(
          <div key={si} className="bg-white/[0.03] rounded-xl p-2 border border-white/8 flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[7.5px] font-semibold" style={{color:sec.color}}>{sec.title}</p>
              <span className="text-[7.5px] font-black" style={{color:sec.color}}>{sec.total}</span>
            </div>
            {sec.items.map((it,ii)=>(
              <div key={ii} className="flex justify-between py-0.5 border-b border-white/[0.04]">
                <span className="text-[6.5px] text-white/45 truncate pr-1">{it.name}</span>
                <span className={`text-[6.5px] font-semibold whitespace-nowrap ${it.sign>0?"text-emerald-400":it.sign<0?"text-red-400":"text-white/30"}`}>{it.amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Monthly Net Cash Flow</p>
          <span className="text-[6.5px] text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded-full">+$86.6K YTD</span>
        </div>
        <div className="flex items-end gap-1 flex-1 min-h-0 pb-1">
          {monthly.map((v,i)=>{
            const h = Math.abs(v)/maxBar*100;
            const pos = v >= 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                {pos ? (
                  <>
                    <div className="w-full rounded-t-sm" style={{height:`${h}%`,background:"#1E4DA0",opacity:0.7+i*0.02}}/>
                    <span className="text-[4.5px] text-white/20">{mLabels[i]}</span>
                  </>
                ) : (
                  <>
                    <div className="w-full rounded-b-sm" style={{height:`${h}%`,background:"#1E4DA0",opacity:0.7}}/>
                    <span className="text-[4.5px] text-white/20">{mLabels[i]}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 mt-1">
          {[["Positive","#1E4DA0"],["Negative","#1E4DA0"]].map(([l,c])=>(
            <div key={l} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-sm" style={{background:c}}/><span className="text-[6px] text-white/30">{l}</span></div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-32 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Cash Summary</p>
        {[
          { label:"Opening Balance",  value:"$44,600",  color:"#1E4DA0" },
          { label:"Operating CF",     value:"+$130.2K", color:"#1E4DA0" },
          { label:"Investing CF",     value:"−$23.6K",  color:"#1E4DA0" },
          { label:"Financing CF",     value:"−$20.0K",  color:"#1E4DA0" },
          { label:"Closing Balance",  value:"$131.2K",  color:"#1E4DA0" },
        ].map((r,i)=>(
          <div key={i} className="flex justify-between py-1 border-b border-white/[0.04]">
            <span className="text-[6.5px] text-white/40">{r.label}</span>
            <span className="text-[7px] font-bold" style={{color:r.color}}>{r.value}</span>
          </div>
        ))}
        <div className="mt-auto rounded-lg px-1.5 py-1.5 bg-emerald-500/12 border border-emerald-500/20">
          <p className="text-[6px] text-emerald-300">Free Cash Flow</p>
          <p className="text-[12px] font-black text-white">$86.6K</p>
          <p className="text-[6px] text-white/35">After capex</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 7: Expenses & AP ────────────────────── */

function ExpensesSlide() {
  const categories = [
    { name:"COGS",               amount:"$112,600", pct:52, color:"#1E4DA0" },
    { name:"Salaries & Wages",   amount:"$68,400",  pct:36, color:"#1E4DA0" },
    { name:"Rent & Utilities",   amount:"$18,200",  pct:22, color:"#1E4DA0" },
    { name:"Marketing",          amount:"$9,800",   pct:14, color:"#1E4DA0" },
    { name:"Software & Tools",   amount:"$6,400",   pct: 9, color:"#1E4DA0" },
    { name:"Travel & Expenses",  amount:"$3,200",   pct: 5, color:"#1E4DA0" },
  ];
  const bills = [
    { supplier:"Global Cloud Inc",      ref:"BILL-0112", due:"20 May", amount:"$2,400",  status:"Approved" },
    { supplier:"CityHub Properties",    ref:"BILL-0111", due:"18 May", amount:"$4,800",  status:"Paid"     },
    { supplier:"DataPrint Solutions",   ref:"BILL-0110", due:"15 May", amount:"$860",    status:"Pending"  },
    { supplier:"Apex Freight Ltd",      ref:"BILL-0109", due:"12 May", amount:"$1,640",  status:"Overdue"  },
    { supplier:"MediaReach Agency",     ref:"BILL-0108", due:"10 May", amount:"$3,200",  status:"Paid"     },
  ];
  const sc = (s:string)=>s==="Paid"?"text-emerald-400 bg-emerald-400/10":s==="Overdue"?"text-red-400 bg-red-400/10":s==="Approved"?"text-[#1E4DA0] bg-[#1E4DA0]/10":"text-amber-400 bg-amber-400/10";
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Expense Categories</p>
        {categories.map((c,i)=>(
          <div key={i} className="mb-1.5">
            <div className="flex justify-between mb-0.5">
              <div className="flex items-center gap-1"><div className="w-1 h-1 rounded-full" style={{background:c.color}}/><span className="text-[6.5px] text-white/55">{c.name}</span></div>
              <span className="text-[6.5px] font-semibold text-white/80">{c.amount}</span>
            </div>
            <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{width:`${c.pct}%`,background:c.color}}/></div>
          </div>
        ))}
        <div className="mt-auto rounded-lg px-1.5 py-1.5 bg-red-500/10 border border-red-500/20">
          <p className="text-[6px] text-red-300">Total Expenses</p>
          <p className="text-[12px] font-black text-white">$218,600</p>
          <p className="text-[6px] text-white/30">YTD across 6 categories</p>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Supplier Bills — Accounts Payable</p>
          <span className="text-[6.5px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full">3 pending approval</span>
        </div>
        <table className="w-full text-[7px]">
          <thead><tr>{["Supplier","Ref","Due","Amount","Status"].map(h=>(
            <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {bills.map((r,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1 text-white/80 pr-2 whitespace-nowrap">{r.supplier}</td>
                <td className="py-1 text-[#1E4DA0] pr-2 whitespace-nowrap font-mono">{r.ref}</td>
                <td className="py-1 text-white/30 pr-2 whitespace-nowrap">{r.due}</td>
                <td className="py-1 text-white/90 font-semibold pr-2 whitespace-nowrap">{r.amount}</td>
                <td className="py-1"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${sc(r.status)}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto pt-1.5 border-t border-white/8 grid grid-cols-3 gap-1.5">
          {[
            { label:"Paid (MTD)",    value:"$8,000",  color:"#1E4DA0" },
            { label:"Pending AP",    value:"$4,900",  color:"#1E4DA0" },
            { label:"Overdue AP",    value:"$1,640",  color:"#1E4DA0" },
          ].map((s,i)=>(
            <div key={i} className="rounded-lg p-1.5" style={{background:`${s.color}12`}}>
              <p className="text-[6px] text-white/35">{s.label}</p>
              <p className="text-[9px] font-black" style={{color:s.color}}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-32 shrink-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Approval Queue</p>
        {[
          { name:"DataPrint Solutions", amount:"$860",   icon:"⏳" },
          { name:"TechCloud Services",  amount:"$1,200", icon:"⏳" },
          { name:"ProMedia Group",      amount:"$640",   icon:"⏳" },
        ].map((a,i)=>(
          <div key={i} className="mb-1.5 rounded-lg p-1.5 bg-amber-400/8 border border-amber-400/15">
            <div className="flex justify-between items-start">
              <span className="text-[6.5px] text-white/70 font-semibold leading-tight">{a.name}</span>
              <span className="text-[8px] ml-1">{a.icon}</span>
            </div>
            <p className="text-[9px] font-black text-amber-400">{a.amount}</p>
          </div>
        ))}
        <div className="mt-2 rounded-lg p-1.5 bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-[6px] text-emerald-300">Budget Utilisation</p>
          <div className="h-1.5 bg-white/8 rounded-full mt-1 mb-0.5"><div className="h-full rounded-full bg-emerald-400" style={{width:"68%"}}/></div>
          <p className="text-[7px] font-bold text-white">68% of budget used</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slide 8: Bank Reconciliation ──────────────── */

function BankRecSlide() {
  const txns = [
    { date:"15 May", desc:"Customer Payment — Northgate",  amount:"+$8,400",  matched:true  },
    { date:"15 May", desc:"Supplier — Global Cloud Inc",   amount:"−$2,400",  matched:true  },
    { date:"14 May", desc:"Payroll Disbursement",          amount:"−$38,400", matched:true  },
    { date:"14 May", desc:"Unidentified Credit",           amount:"+$1,240",  matched:false },
    { date:"13 May", desc:"CityHub Rent — May",            amount:"−$4,800",  matched:true  },
    { date:"13 May", desc:"Bank Charge Q2",                amount:"−$180",    matched:false },
    { date:"12 May", desc:"POS Sales Receipt",             amount:"+$6,820",  matched:true  },
  ];
  const accounts = [
    { name:"Main Operating A/C",  bank:"$52,800",  ledger:"$52,800",  diff:"$0",      ok:true  },
    { name:"Payroll Account",     bank:"$18,400",  ledger:"$18,400",  diff:"$0",      ok:true  },
    { name:"Tax Reserve",         bank:"$12,600",  ledger:"$12,240",  diff:"+$360",   ok:false },
    { name:"Savings / Reserve",   bank:"$28,000",  ledger:"$28,000",  diff:"$0",      ok:true  },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-semibold text-white/50">Bank Transactions — 15 May 2026</p>
          <div className="flex gap-1">
            <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">5 matched</span>
            <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full text-amber-400 bg-amber-400/10">2 unmatched</span>
          </div>
        </div>
        <table className="w-full text-[7px]">
          <thead><tr>{["Date","Description","Amount","Status"].map(h=>(
            <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {txns.map((t,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-0.5 text-white/30 pr-2 whitespace-nowrap">{t.date}</td>
                <td className="py-0.5 text-white/75 pr-2">{t.desc}</td>
                <td className={`py-0.5 pr-2 whitespace-nowrap font-semibold ${t.amount.startsWith("+")?"text-emerald-400":"text-red-400"}`}>{t.amount}</td>
                <td className="py-0.5"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${t.matched?"text-emerald-400 bg-emerald-400/10":"text-amber-400 bg-amber-400/10"}`}>{t.matched?"Matched":"Review"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto pt-1.5 border-t border-white/8">
          <div className="flex justify-between items-center">
            <span className="text-[7px] text-white/40">Match Rate</span>
            <span className="text-[7.5px] font-bold text-emerald-400">71%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full mt-0.5"><div className="h-full rounded-full bg-emerald-400" style={{width:"71%"}}/></div>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0 flex flex-col">
        <p className="text-[8px] font-semibold text-white/50 mb-1.5">Account Reconciliation Status</p>
        <table className="w-full text-[7px]">
          <thead><tr>{["Account","Bank Bal.","Ledger Bal.","Diff","Status"].map(h=>(
            <th key={h} className="text-white/20 font-medium pb-1 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {accounts.map((a,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1 text-white/75 pr-2 whitespace-nowrap">{a.name}</td>
                <td className="py-1 text-emerald-400 font-semibold pr-2 whitespace-nowrap">{a.bank}</td>
                <td className="py-1 text-[#1E4DA0] font-semibold pr-2 whitespace-nowrap">{a.ledger}</td>
                <td className={`py-1 pr-2 whitespace-nowrap font-bold text-[7px] ${a.ok?"text-white/25":"text-amber-400"}`}>{a.diff}</td>
                <td className="py-1"><span className={`text-[6px] font-bold px-1.5 py-0.5 rounded-full ${a.ok?"text-emerald-400 bg-emerald-400/10":"text-amber-400 bg-amber-400/10"}`}>{a.ok?"Reconciled":"Review"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto rounded-lg p-2 bg-emerald-500/8 border border-emerald-500/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[6.5px] text-emerald-300 font-semibold">3 of 4 accounts fully reconciled</p>
              <p className="text-[6px] text-white/30">Last run: 15 May 2026 at 09:42 AM</p>
            </div>
            <span className="text-[18px]">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Slider wrapper ────────────────────────────── */

function AccountingDashboard() {
  const [slide, setSlide] = useState(0);
  const [dir,   setDir]   = useState(1);

  const TABS = [
    "Overview", "P&L Report", "Invoices & AR", "HRM & Payroll",
    "Balance Sheet", "Cash Flow", "Expenses & AP", "Bank Rec",
  ];
  const SLIDES = [
    DashboardSlide, PLSlide, InvoicesSlide, HRMSlide,
    BalanceSheetSlide, CashFlowSlide, ExpensesSlide, BankRecSlide,
  ];
  const Content = SLIDES[slide];

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setSlide(s => (s + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (i: number) => { setDir(i >= slide ? 1 : -1); setSlide(i); };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 bg-[#06101e] flex flex-col text-white overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/80"
        style={{background:"linear-gradient(135deg,#07111f 0%,#060d1a 100%)"}}>
        {/* top bar */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{background:"linear-gradient(135deg,#1E4DA0,#059669)"}}>
              <Calculator className="w-3.5 h-3.5 text-white"/>
            </div>
            <div>
              <span className="text-[11px] font-bold text-white leading-none block">OneSoft Accounting</span>
              <span className="text-[7px] text-white/30 leading-none">Live · Auto-synced</span>
            </div>
          </div>
          {/* scrollable tab bar */}
          <div className="flex gap-0.5 overflow-x-auto" style={{scrollbarWidth:"none"}}>
            {TABS.map((t,i) => (
              <button key={t} onClick={() => go(i)}
                className={`text-[7.5px] px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  i===slide
                    ? "text-emerald-300 font-bold border border-emerald-500/30"
                    : "text-white/30 hover:text-white/55 hover:bg-white/[0.04]"
                }`}
                style={i===slide?{background:"rgba(30,77,160,0.12)"}:{}}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <div className="w-5 h-5 rounded-full bg-white/10 border border-white/12"/>
            <span className="text-[8px] text-white/25">Admin</span>
          </div>
        </div>
        {/* slide content */}
        <div className="flex-1 min-h-0 p-2.5 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={slide}
              initial={{ opacity:0, x:dir*24 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:dir*-24 }}
              transition={{ duration:0.28, ease:"easeOut" }}
              className="h-full flex flex-col">
              <Content />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* progress bar at very bottom */}
        <div className="h-0.5 bg-white/5 shrink-0">
          <motion.div className="h-full bg-emerald-500/60" style={{width:`${((slide+1)/SLIDES.length)*100}%`}} transition={{duration:0.3}}/>
        </div>
      </div>
      {/* dot row */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {TABS.map((_,i) => (
          <button key={i} onClick={() => go(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{width:i===slide?20:5, background:i===slide?"#1E4DA0":"rgba(255,255,255,0.18)"}}/>
        ))}
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
  { icon: BookOpen,   color: "#1E4DA0", bg: "#052e1c", border: "#1E4DA030", title: "Double-Entry Bookkeeping",
    desc: "Every transaction auto-posts debit & credit entries simultaneously — GAAP and IFRS compliant.",
    pts: ["Auto journal entries on every transaction", "Trial balance & reconciliation in one click", "Multi-currency with live FX rates", "Full audit trail on every change"] },
  { icon: Users,      color: "#1E4DA0", bg: "#1a0b38", border: "#1E4DA030", title: "HRM & Payroll",
    desc: "Full workforce management connected directly to accounts — every payroll run auto-journals instantly.",
    pts: ["Employee contracts & document vault", "Attendance, leave & overtime tracking", "Automated payroll with tax & NI calc", "Payslips generated & emailed automatically"] },
  { icon: Package,    color: "#1E4DA0", bg: "#2d1f00", border: "#1E4DA030", title: "Products & Services",
    desc: "Define unlimited products and service lines with pricing tiers, tax codes, and units of measure.",
    pts: ["Product & service catalogue management", "Custom pricing tiers per customer", "Auto VAT / tax on every invoice line", "Service billing & timesheet integration"] },
  { icon: Boxes,      color: "#1E4DA0", bg: "#0a1f3e", border: "#1E4DA030", title: "Inventory Management",
    desc: "Real-time stock levels across multiple warehouses with automated reorder and full cost valuation.",
    pts: ["Multi-warehouse stock tracking", "Low-stock alerts & auto purchase orders", "FIFO / LIFO / weighted average costing", "Stock valuation live on balance sheet"] },
  { icon: Receipt,    color: "#1E4DA0", bg: "#2e0a0a", border: "#1E4DA030", title: "Invoicing & AR / AP",
    desc: "Professional invoices, payment tracking, automated chasers, and full payables management.",
    pts: ["Branded invoice & quote templates", "Recurring & subscription invoices", "Automated overdue payment chasers", "Aged debtors & creditors reports"] },
  { icon: BarChart3,  color: "#1E4DA0", bg: "#011e26", border: "#1E4DA030", title: "Financial Reporting",
    desc: "Live P&L, Balance Sheet, Cash Flow, and 40+ custom reports exportable to PDF or Excel.",
    pts: ["Real-time P&L & Balance Sheet", "Cash flow forecasting dashboard", "Budget vs actuals variance reports", "Read-only accountant portal access"] },
  { icon: Briefcase,  color: "#1E4DA0", bg: "#2d0a1a", border: "#1E4DA030", title: "Expense Management",
    desc: "Mobile expense submission, multi-level approvals, and auto-posting to the general ledger.",
    pts: ["Mobile app receipt capture", "Configurable approval workflows", "Per-diem & mileage rules", "Auto debit posting to ledger"] },
  { icon: RefreshCw,  color: "#1E4DA0", bg: "#021f1c", border: "#1E4DA030", title: "Everything Connected",
    desc: "Sales → Inventory → AR → Ledger → Payroll → Reports. One live system, zero manual re-entry.",
    pts: ["Real-time cross-module sync", "Single source of financial truth", "Role-based access control", "Open API for third-party apps"] },
];

const flow = [
  { step: "01", icon: FileText,   color: "#1E4DA0", title: "Sales Invoice Raised",         detail: "Sales team raises invoice in seconds using the product catalogue" },
  { step: "02", icon: Boxes,      color: "#1E4DA0", title: "Inventory Auto-Deducted",       detail: "Stock levels drop instantly — no warehouse team update needed" },
  { step: "03", icon: BookOpen,   color: "#1E4DA0", title: "Ledger Auto-Journaled",         detail: "Debit AR, credit Revenue posted automatically — double-entry complete" },
  { step: "04", icon: TrendingUp, color: "#1E4DA0", title: "P&L Updates in Real Time",      detail: "Gross margin and revenue charts refresh the moment the invoice saves" },
  { step: "05", icon: Users,      color: "#1E4DA0", title: "Payroll Linked to Accounts",    detail: "Every salary run debits wages expense and credits bank automatically" },
  { step: "06", icon: BarChart3,  color: "#1E4DA0", title: "Reports Always Accurate",       detail: "No month-end close needed — your Balance Sheet is live 24/7" },
];

const testimonials = [
  { quote: "We used to spend 3 days closing the books every month. With OneSoft it takes half a morning. The double-entry is automatic and our accountant has a read-only portal — she doesn't need to email us for reports anymore.",
    name: "Danielle Forsyth", role: "Finance Director", co: "Northgate Retail, Dubai, UAE", color: "#1E4DA0" },
  { quote: "The HRM payroll link is a game-changer. Every month payroll runs, every journal posts automatically. I reviewed our payroll submissions last year and found zero discrepancies for the first time ever.",
    name: "Ravi Menon", role: "Managing Director", co: "Spice Route Restaurants, Singapore", color: "#1E4DA0" },
  { quote: "Our warehouse manager used to message me when stock was low. Now the system raises the PO automatically and I just approve it. Stock value always matches the Balance Sheet — magic.",
    name: "Tom Ashworth", role: "Operations Director", co: "Northern Star Distribution, Toronto, Canada", color: "#1E4DA0" },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default function AccountingPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg        = isLight ? "#ffffff"                    : "#070e1c";
  const sectionBg     = isLight ? "#F5F5F5"                    : "#04091a";
  const tableBg       = isLight ? "#ffffff"                    : "#07111f";
  const connectorBg   = isLight ? "#F5F5F5"                    : "#070e1c";
  const statsBg       = isLight ? "rgba(0,0,0,0.03)"           : "rgba(255,255,255,0.03)";
  const dividerColor  = isLight ? "rgba(0,0,0,0.08)"           : "rgba(255,255,255,0.08)";
  const gridLine      = isLight ? "rgba(0,0,0,0.04)"           : "rgba(255,255,255,0.06)";
  const t45           = isLight ? "rgba(15,23,42,0.5)"         : "rgba(255,255,255,0.45)";
  const t50           = isLight ? "rgba(15,23,42,0.55)"        : "rgba(255,255,255,0.5)";
  const t55           = isLight ? "rgba(15,23,42,0.6)"         : "rgba(255,255,255,0.55)";
  const t60           = isLight ? "rgba(15,23,42,0.65)"        : "rgba(255,255,255,0.6)";
  const t65           = isLight ? "rgba(15,23,42,0.7)"         : "rgba(255,255,255,0.65)";
  const t85           = isLight ? "rgba(15,23,42,0.9)"         : "rgba(255,255,255,0.85)";
  const pageColor     = isLight ? "#0f172a"                    : "#fff";
  const secBtnBg      = isLight ? "rgba(0,0,0,0.05)"          : "rgba(255,255,255,0.06)";
  const secBtnBorder  = isLight ? "rgba(0,0,0,0.15)"          : "rgba(255,255,255,0.12)";
  const secBtnColor   = isLight ? "rgba(15,23,42,0.85)"       : "rgba(255,255,255,0.85)";

  return (
    <div style={{ background: pageBg, color: pageColor }} className="min-h-screen overflow-hidden">
      <Navigation />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <div className="relative pt-32 pb-6 md:pt-40 md:pb-8 overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]" style={{background:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30,77,160,0.15), transparent)"}}/>
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full" style={{background:"rgba(30,77,160,0.10)",filter:"blur(90px)"}}
            animate={{y:[0,-18,0]}} transition={{duration:8,repeat:Infinity,ease:"easeInOut"}}/>
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full" style={{background:"rgba(30,77,160,0.07)",filter:"blur(110px)"}}
            animate={{y:[0,18,0]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut",delay:2}}/>
        </div>

        <div className="container mx-auto px-4">
          {/* breadcrumb */}
          <motion.div className="flex items-center gap-2 text-sm mb-8" style={{color:t45}}
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span style={{color:t50}}>Products</span>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span style={{color:"#1E4DA0",fontWeight:600}}>Accounting & Bookkeeping</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
                <Calculator className="w-3.5 h-3.5"/>Accounting & Bookkeeping ERP
              </span>
            </motion.div>
            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.08]"
              initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.65,delay:0.1}}>
              Your Finances,{" "}
              <span style={{color:"#1E4DA0"}}>
                Fully Automated.
              </span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{color:t60}}
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}>
              Double-entry bookkeeping, HRM, inventory, products & services — all interconnected in one platform. No more spreadsheets. No more manual data entry. Just clean, accurate books.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{background:"#1E4DA0",border:"none",color:"#ffffff"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{background:secBtnBg,border:`1px solid ${secBtnBorder}`,color:secBtnColor}}
                onClick={() => document.getElementById("modules")?.scrollIntoView({behavior:"smooth"})}>
                Explore All Modules
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{background:statsBg,borderTop:`1px solid ${dividerColor}`,borderBottom:`1px solid ${dividerColor}`}}
        className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {to:40,  suf:"+", label:"Accounting Modules",     Icon:Layers,     color:"#1E4DA0"},
              {to:300, suf:"+", label:"Businesses on Platform",  Icon:Building2,  color:"#1E4DA0"},
              {to:99.9,suf:"%", label:"Data Accuracy",           Icon:ShieldCheck,color:"#1E4DA0",d:1},
              {to:80,  suf:"%", label:"Time Saved on Bookkeeping",Icon:Clock,     color:"#1E4DA0"},
            ].map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.5}}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{background:`${s.color}18`,border:`1px solid ${s.color}30`}}>
                  <s.Icon className="w-5 h-5" style={{color:s.color}}/>
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-1"><CountUp to={s.to} suffix={s.suf} decimals={(s as any).d??0}/></h3>
                <p style={{color:t45}} className="text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AccountingMarquee />

      {/* ═══ FLOW — how it all connects ═════════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 70% 50% at 50% 100%, rgba(30,77,160,0.07), transparent)"}}/>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
              <Sparkles className="w-3.5 h-3.5"/>Zero Manual Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">One action. Six systems update.</h2>
            <p style={{color:t55}} className="text-lg">
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
                    style={{color:t85}}>{f.step}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{background:`${f.color}20`,border:`1px solid ${f.color}35`}}>
                    <f.icon className="w-5 h-5" style={{color:f.color}}/>
                  </div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p style={{color:t50}} className="text-sm leading-relaxed">{f.detail}</p>
                  {i < flow.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 flex items-center justify-center"
                      style={{background:connectorBg,border:`1px solid ${f.color}40`}}>
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
      <div id="modules" className="py-16" style={{background:isLight?"#ffffff":sectionBg}}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
              <Layers className="w-3.5 h-3.5"/>8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Everything You Need,<br/>Nothing You Don't.</h2>
            <p style={{color:t50}} className="text-lg">
              Built for ambitious businesses that need more than basic bookkeeping — without enterprise complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m,i)=>(
              <motion.div key={m.title}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.06,duration:0.5}}
                className="group rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: isLight ? `${m.color}28` : m.bg,
                  border: `1.5px solid ${isLight ? m.color + "70" : m.border}`,
                  boxShadow: isLight ? `0 2px 16px ${m.color}18` : "none",
                }}
                whileHover={{y:-5,boxShadow:`0 24px 48px ${m.color}33`}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{background:isLight?`${m.color}35`:`${m.color}20`,border:`1.5px solid ${isLight?m.color+"80":m.color+"40"}`}}>
                  <m.icon className="w-6 h-6" style={{color:m.color}}/>
                </div>
                <h3 className="text-base font-bold mb-2" style={{color:isLight?"#0f172a":undefined}}>{m.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{color:isLight?"rgba(0,0,0,0.55)":t50}}>{m.desc}</p>
                <ul className="space-y-2">
                  {m.pts.map(p=>(
                    <li key={p} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                        style={{background:isLight?`${m.color}28`:`${m.color}20`,border:`1px solid ${m.color}50`}}>
                        <CheckCircle2 className="w-2.5 h-2.5" style={{color:m.color}}/>
                      </div>
                      <span className="text-xs leading-relaxed" style={{color:isLight?"rgba(0,0,0,0.55)":t55}}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ INVENTORY DEEP-DIVE ════════════════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{background:"radial-gradient(ellipse 60% 60% at 80% 50%, rgba(30,77,160,0.09), transparent)"}}/>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* text side */}
            <motion.div className="flex-1"
              initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65}}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
                <Boxes className="w-3.5 h-3.5"/>Inventory + Accounting
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Stock that talks<br/>to your books.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{color:t55}}>
                When stock comes in, the system posts a debit to inventory and a credit to accounts payable — automatically. When it's sold, COGS hits the P&L in real time. Your gross margin is always accurate without a single spreadsheet.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: ArrowUpRight, color: "#1E4DA0", bg: "#052e1c", border: "#1E4DA030",
                    title: "Purchase order → auto inventory receipt → auto AP journal",
                    sub: "Every goods receipt auto-debits inventory and credits your payables account" },
                  { icon: ArrowDownRight, color: "#1E4DA0", bg: "#0a1f3e", border: "#1E4DA030",
                    title: "Sales invoice → inventory deduction → revenue posting",
                    sub: "Selling one unit auto-reduces stock and books COGS vs Revenue immediately" },
                  { icon: Zap, color: "#1E4DA0", bg: "#2d1f00", border: "#1E4DA030",
                    title: "Low-stock alert → automated reorder PO to supplier",
                    sub: "Configurable thresholds trigger purchase orders without human intervention" },
                  { icon: BarChart3, color: "#1E4DA0", bg: "#1a0b38", border: "#1E4DA030",
                    title: "Real-time stock valuation always on your Balance Sheet",
                    sub: "FIFO, LIFO, or weighted average — your choice, applied automatically" },
                ].map((item,i)=>(
                  <motion.div key={i}
                    initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}}
                    viewport={{once:true}} transition={{delay:i*0.08,duration:0.5}}
                    className="flex items-start gap-4 rounded-xl p-4"
                    style={{background:isLight?`${item.color}0f`:item.bg,border:`1px solid ${item.border}`}}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{background:`${item.color}20`,border:`1px solid ${item.color}35`}}>
                      <item.icon className="w-5 h-5" style={{color:item.color}}/>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs leading-relaxed" style={{color:t45}}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="h-13 px-8 text-base font-semibold"
                style={{background:"#1E4DA0",border:"none",color:"#ffffff"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                See Inventory Demo <ArrowRight className="ml-2 w-4 h-4"/>
              </Button>
            </motion.div>

            {/* inventory table */}
            <motion.div className="flex-1 w-full"
              initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.65}}>
              <div className="rounded-2xl overflow-hidden" style={{background:tableBg,border:`1px solid ${dividerColor}`,boxShadow:"0 30px 60px rgba(0,0,0,0.12)"}}>
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4" style={{borderBottom:`1px solid ${dividerColor}`}}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:"rgba(30,77,160,0.2)"}}>
                      <Boxes className="w-4 h-4 text-[#1E4DA0]"/>
                    </div>
                    <span className="font-bold text-sm">Inventory Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
                    <span className="text-xs" style={{color:t45}}>Live</span>
                  </div>
                </div>
                {/* summary row */}
                <div className="grid grid-cols-3 gap-px" style={{background:gridLine}}>
                  {[
                    {label:"Total Items",value:"847",color:"#1E4DA0"},
                    {label:"Total Value",value:"£67.2K",color:"#1E4DA0"},
                    {label:"Low / Out",value:"3 items",color:"#1E4DA0"},
                  ].map(s=>(
                    <div key={s.label} className="px-4 py-3" style={{background:tableBg}}>
                      <p className="text-xs mb-1" style={{color:t45}}>{s.label}</p>
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
                        {name:"Standing Desks",   sku:"PRD-0042",qty:8,  min:10,val:"£5,200",st:"Low"},
                        {name:"Monitor Stands",   sku:"PRD-0043",qty:52, min:20,val:"£2,080",st:"Good"},
                        {name:"Keyboard + Mouse", sku:"PRD-0044",qty:0,  min:15,val:"—",     st:"Out"},
                        {name:"Webcam HD",        sku:"PRD-0045",qty:31, min:10,val:"£1,550",st:"Good"},
                        {name:"Laptop Bags",      sku:"PRD-0046",qty:6,  min:10,val:"£420",  st:"Low"},
                      ].map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                          <td className="py-2.5 pr-4" style={{color:"rgba(255,255,255,0.8)"}}>{r.name}</td>
                          <td className="py-2.5 pr-4" style={{color:"rgba(255,255,255,0.35)"}}>{r.sku}</td>
                          <td className="py-2.5 pr-4 font-semibold" style={{color:r.qty===0?"#1E4DA0":r.qty<r.min?"#1E4DA0":"rgba(255,255,255,0.7)"}}>{r.qty}</td>
                          <td className="py-2.5 pr-4" style={{color:"rgba(255,255,255,0.3)"}}>{r.min}</td>
                          <td className="py-2.5 pr-4" style={{color:"rgba(255,255,255,0.6)"}}>{r.val}</td>
                          <td className="py-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              r.st==="Good"?"text-emerald-400 bg-emerald-400/10":
                              r.st==="Low"?"text-amber-400 bg-amber-400/10":
                              "text-red-400 bg-red-400/10"}`}>{r.st}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-16" style={{background:sectionBg}}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
              <Star className="w-3.5 h-3.5 fill-current"/>What Customers Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Real results from real businesses.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.1,duration:0.6}}
                className="rounded-2xl p-7 flex flex-col"
                style={{background:isLight?"#ffffff":"rgba(255,255,255,0.03)",border:`1px solid ${t.color}25`}}>
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_,j)=><Star key={j} className="w-4 h-4 fill-current" style={{color:t.color}}/>)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{color:t65}}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{background:`${t.color}20`,color:t.color,border:`1px solid ${t.color}35`}}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{color:t45}}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CTA ═════════════════════════════════════════════════ */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{background:"radial-gradient(ellipse 70% 70% at 50% 50%, rgba(30,77,160,0.10), transparent)"}}/>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{background:"rgba(30,77,160,0.10)",border:"1px solid rgba(30,77,160,0.30)",color:"#1E4DA0"}}>
              <Lock className="w-3.5 h-3.5"/>No card required · Free 30-day trial
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Your books, finally<br/>
              <span style={{color:"#1E4DA0"}}>
                under control.
              </span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{color:t55}}>
              Join 300+ businesses that run their entire finance operation on OneSoft. Set up in a day, accurate from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{background:"#1E4DA0",border:"none",color:"#ffffff"}}
                onClick={() => openCTAModal("Accounting & Bookkeeping ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
              <div className="flex items-center gap-2" style={{color:t45}}>
                <Globe className="w-4 h-4"/>
                <span className="text-sm">Used in 12 countries</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("Accounting & Bookkeeping ERP")}/>
      <CustomSolutionsSection accentColor="#1E4DA0" productName="Accounting ERP" />
      <ERPCrossLinks current="/accounting" />
      <Footer />
    </div>
  );
}
