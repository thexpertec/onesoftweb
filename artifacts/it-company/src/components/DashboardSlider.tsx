import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Monitor,
  Users, DollarSign, Package, Activity, ShoppingBag,
  TrendingUp, Truck, UtensilsCrossed, Home as HomeIcon,
} from "lucide-react";

/* ─── Tiny reusable chart / UI primitives ───────────────────── */

function Sparkline({ data, color, w = 90, h = 32 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${((i / (data.length - 1)) * w).toFixed(1)},${(h - ((v - min) / range) * (h - 2) - 1).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AreaChart({ data, color, w = 240, h = 80 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / range) * (h - 4) - 2 }));
  const line = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `M${pts[0].x.toFixed(1)},${h} ` + pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + ` L${pts[pts.length - 1].x.toFixed(1)},${h} Z`;
  const id = `ag${color.replace(/[^a-z0-9]/gi, "")}`;
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
      {pts.map((p, i) => i === pts.length - 1 && (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />
      ))}
    </svg>
  );
}

function BarChart({ data, color, labels, w = 200, h = 64 }: { data: number[]; color: string; labels?: string[]; w?: number; h?: number }) {
  const max = Math.max(...data);
  const gap = 3, barW = (w - gap * (data.length - 1)) / data.length;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {data.map((v, i) => {
        const bh = (v / max) * (h - (labels ? 12 : 2));
        const x = i * (barW + gap);
        return (
          <g key={i}>
            <rect x={x} y={h - bh - (labels ? 12 : 2)} width={barW} height={bh} rx="2" fill={color} opacity={0.6 + (v / max) * 0.35} />
            {labels && <text x={x + barW / 2} y={h - 1} textAnchor="middle" fill="rgba(0,0,0,0.45)" fontSize="6.5">{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function StatCard({ label, value, change, color, icon: Icon }: { label: string; value: string; change: string; color: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }) {
  const up = !change.startsWith("-") || change.includes("+");
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

const STATUS_CLS: Record<string, string> = {
  Paid:          "text-emerald-400 bg-emerald-400/10",
  Pending:       "text-amber-400   bg-amber-400/10",
  Overdue:       "text-red-400     bg-red-400/10",
  Delivered:     "text-emerald-400 bg-emerald-400/10",
  Shipped:       "text-[#1E4DA0]    bg-[#1E4DA0]/10",
  Processing:    "text-amber-400   bg-amber-400/10",
  Cancelled:     "text-red-400     bg-red-400/10",
  Active:        "text-emerald-400 bg-emerald-400/10",
  Vacant:        "text-slate-400   bg-slate-400/10",
  Occupied:      "text-[#1E4DA0]    bg-[#1E4DA0]/10",
  Reserved:      "text-violet-400  bg-violet-400/10",
  Available:     "text-emerald-400 bg-emerald-400/10",
  New:           "text-[#1E4DA0]    bg-[#1E4DA0]/10",
  Closed:        "text-slate-400   bg-slate-400/10",
  OPD:           "text-[#1E4DA0]    bg-[#1E4DA0]/10",
  IPD:           "text-violet-400  bg-violet-400/10",
};

function Pill({ s }: { s: string }) {
  return <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${STATUS_CLS[s] ?? "text-slate-300 bg-slate-400/10"}`}>{s}</span>;
}

function NavBar({ title, icon, iconBg, tabs, active }: { title: string; icon?: React.ReactNode; iconBg?: string; tabs: string[]; active: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/8 pb-2 shrink-0">
      <div className="flex items-center gap-2">
        {icon && <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ backgroundColor: iconBg }}>{icon}</div>}
        <span className="text-[11px] font-bold text-white">{title}</span>
      </div>
      <div className="flex gap-2">
        {tabs.map(t => (
          <span key={t} className={`text-[9px] px-2 py-0.5 rounded cursor-pointer ${t === active ? "font-semibold" : "text-white/35"}`}
            style={t === active ? { color: iconBg ?? "#1E4DA0", backgroundColor: `${iconBg ?? "#1E4DA0"}18` } : {}}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-white/10 border border-white/15" />
        <span className="text-[8.5px] text-white/30">Admin</span>
      </div>
    </div>
  );
}

/* ─── Individual Dashboard Components ──────────────────────── */

function SchoolErpDash() {
  const att = [[95,92,88,96,91],[89,94,97,85,93],[92,87,95,98,90],[96,91,88,94,87],[90,93,96,89,95]];
  const days = ["M","T","W","T","F"];
  const fees = [
    { name: "Ali Hassan",  cls: "10-A", amt: "£850", st: "Paid" },
    { name: "Sara Khan",   cls: "9-B",  amt: "£850", st: "Pending" },
    { name: "Umar Rauf",   cls: "11-C", amt: "£920", st: "Paid" },
    { name: "Fatima N.",   cls: "8-A",  amt: "£780", st: "Overdue" },
    { name: "Hamza Ali",   cls: "12-B", amt: "£950", st: "Paid" },
  ];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="SchoolPro ERP" iconBg="#1E4DA0" icon={<span className="text-[8px] font-black">S</span>}
        tabs={["Dashboard","Students","Fees","Timetable","Reports"]} active="Dashboard" />
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Students" value="1,248" change="+4.2% this term" color="#1E4DA0" icon={Users} />
        <StatCard label="Attendance" value="94.6%" change="+1.1% today" color="#1E4DA0" icon={Activity} />
        <StatCard label="Fees Collected" value="£84.2K" change="+8.5% this month" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Active Classes" value="48" change="+2 new this week" color="#1E4DA0" icon={Package} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        {/* Attendance heatmap */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Attendance Heatmap</p>
          <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(5, 1fr)` }}>
            {days.map((d, di) => <span key={di} className="text-[7px] text-white/25 text-center pb-0.5">{d}</span>)}
            {att.flat().map((v, i) => (
              <div key={i} className="rounded h-6 flex items-center justify-center text-[8px] font-bold"
                style={{ backgroundColor: v >= 95 ? "#16a34a28" : v >= 90 ? "#d9780625" : "#dc262625", color: v >= 95 ? "#1E4DA0" : v >= 90 ? "#1E4DA0" : "#f87171" }}>
                {v}
              </div>
            ))}
          </div>
        </div>
        {/* Timetable */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Timetable — Class 10-A (This Week)</p>
          <table className="w-full text-[8px]">
            <thead>
              <tr>{["Period","Monday","Tuesday","Wednesday","Thursday","Friday"].map(h => (
                <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-1">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {[
                ["08:00", "Mathematics","Physics","Mathematics","Chemistry","English"],
                ["09:00", "English","Mathematics","Physics","Mathematics","Urdu"],
                ["10:00", "Physics","Chemistry","English","Physics","Mathematics"],
                ["11:00", "Chemistry","English","Urdu","Biology","Chemistry"],
              ].map(([t, ...subs], ri) => (
                <tr key={ri} className="border-t border-white/[0.04]">
                  <td className="py-1 text-white/25 pr-2 whitespace-nowrap">{t}</td>
                  {subs.map((s, ci) => (
                    <td key={ci} className="py-1 pr-1">
                      <span className="px-1.5 py-0.5 rounded text-[7.5px] font-medium whitespace-nowrap"
                        style={{ backgroundColor: ["#2563eb18","#16a34a18","#1E4DA018","#d9780618","#1E4DA018"][ci % 5], color: ["#1E4DA0","#1E4DA0","#1E4DA0","#1E4DA0","#38bdf8"][ci % 5] }}>
                        {s}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Fee table */}
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-40 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Fee Collection</p>
          <div className="space-y-1.5">
            {fees.map((r, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                <div>
                  <p className="text-[9px] text-white font-medium">{r.name}</p>
                  <p className="text-[7.5px] text-white/30">{r.cls}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/60">{r.amt}</p>
                  <Pill s={r.st} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HospitalErpDash() {
  const patients = [
    { name: "Ahmed Raza",   age: 45, dept: "Cardiology",  token: "#001", type: "OPD" },
    { name: "Nadia Malik",  age: 32, dept: "Gynecology",  token: "#002", type: "IPD" },
    { name: "Tariq Shah",   age: 67, dept: "Orthopedics", token: "#003", type: "OPD" },
    { name: "Sara Bibi",    age: 28, dept: "Pediatrics",  token: "#004", type: "IPD" },
    { name: "Khalid Ali",   age: 55, dept: "Cardiology",  token: "#005", type: "OPD" },
  ];
  const beds = [
    {r:"101",s:"Occupied"},{r:"102",s:"Vacant"},{r:"103",s:"Occupied"},{r:"104",s:"Reserved"},
    {r:"201",s:"Vacant"  },{r:"202",s:"Occupied"},{r:"203",s:"Occupied"},{r:"204",s:"Vacant"},
    {r:"301",s:"Reserved"},{r:"302",s:"Occupied"},{r:"303",s:"Vacant"},{r:"304",s:"Occupied"},
  ];
  const bg: Record<string,string> = { Occupied:"rgba(30,77,160,0.13)", Vacant:"#16a34a18", Reserved:"#1E4DA022" };
  const tc: Record<string,string> = { Occupied:"#1E4DA0",   Vacant:"#1E4DA0",   Reserved:"#1E4DA0" };
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="HospitalCare ERP" iconBg="#1E4DA0" icon={<span className="text-[8px] font-black">H</span>}
        tabs={["OPD","IPD","Pharmacy","Lab","Billing"]} active="OPD" />
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Patients Today" value="284" change="+12 since morning" color="#1E4DA0" icon={Users} />
        <StatCard label="OPD Queue" value="47" change="-3 avg wait 8 min" color="#1E4DA0" icon={Activity} />
        <StatCard label="Beds Occupied" value="68%" change="+5% this week" color="#1E4DA0" icon={Package} />
        <StatCard label="Revenue Today" value="£12.4K" change="+18% vs yesterday" color="#1E4DA0" icon={DollarSign} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Patient Queue</p>
          <table className="w-full text-[8.5px]">
            <thead><tr>{["Patient","Age","Department","Token","Type"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={i} className="border-t border-white/[0.04]">
                  <td className="py-1.5 text-white font-medium pr-2">{p.name}</td>
                  <td className="py-1.5 text-white/40 pr-2">{p.age}</td>
                  <td className="py-1.5 text-white/60 pr-2">{p.dept}</td>
                  <td className="py-1.5 text-white/40 font-mono pr-2">{p.token}</td>
                  <td className="py-1.5"><Pill s={p.type} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Bed Availability</p>
          <div className="grid grid-cols-4 gap-1 mb-3">
            {beds.map((b, i) => (
              <div key={i} className="rounded-lg py-1.5 text-center" style={{ backgroundColor: bg[b.s] }}>
                <p className="text-[8px] font-bold" style={{ color: tc[b.s] }}>{b.r}</p>
                <p className="text-[6.5px] text-white/25">{b.s.slice(0,3)}</p>
              </div>
            ))}
          </div>
          {[["Occupied","#1E4DA0"],["Vacant","#1E4DA0"],["Reserved","#1E4DA0"]].map(([s,c]) => (
            <div key={s} className="flex items-center gap-2 text-[8px] text-white/40 mb-1">
              <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: c }} />
              {s}: {beds.filter(b => b.s === s).length}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsDash() {
  const rev = [42,58,52,71,63,79,88,74,92,85,97,112];
  const bar = [65,48,82,54,71,90,76,58];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const cats = ["ERP","Web","AI","CRM","POS","API","SaaS","Mob"];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Business Intelligence" iconBg="#1E4DA0" tabs={["Overview","Analytics","Reports","Forecast"]} active="Analytics" />
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Annual Revenue" value="£842K" change="+18.4% YoY" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Active Clients" value="12,480" change="+6.2% this quarter" color="#1E4DA0" icon={Users} />
        <StatCard label="Conversion Rate" value="3.84%" change="+0.6% vs last month" color="#1E4DA0" icon={TrendingUp} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-semibold text-white/50">Monthly Revenue — FY 2025–26 (£K)</p>
            <div className="flex gap-2 text-[8px]">
              <span className="text-[#1E4DA0] font-medium">● Revenue</span>
              <span className="text-white/25">● Target</span>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col justify-between text-[7px] text-white/20 pr-1 pb-3">
              <span>120</span><span>90</span><span>60</span><span>30</span><span>0</span>
            </div>
            <div className="flex-1">
              <AreaChart data={rev} color="#1E4DA0" w={320} h={90} />
              <div className="flex justify-between mt-1 px-1">
                {months.map(m => <span key={m} className="text-[6.5px] text-white/20">{m.slice(0,1)}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Revenue by Product</p>
          <BarChart data={bar} color="#1E4DA0" labels={cats} w={144} h={100} />
        </div>
      </div>
    </div>
  );
}

function EcommerceDash() {
  const orders = [
    { id:"#4821", cust:"Khan Traders", qty:8,  amt:"£1,240", st:"Shipped" },
    { id:"#4820", cust:"City Mart",    qty:3,  amt:"£480",   st:"Processing" },
    { id:"#4819", cust:"Al-Barakah",   qty:15, amt:"£2,890", st:"Delivered" },
    { id:"#4818", cust:"Fresh Stores", qty:6,  amt:"£760",   st:"Shipped" },
    { id:"#4817", cust:"Metro Sales",  qty:2,  amt:"£320",   st:"Processing" },
  ];
  const stock = [72,48,91,35,68,55];
  const cats = ["Apparel","Electronics","Grocery","Sports","Home","Beauty"];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="E-commerce ERP" iconBg="#1E4DA0" icon={<ShoppingBag className="w-2.5 h-2.5" />}
        tabs={["Orders","Inventory","Suppliers","Analytics"]} active="Orders" />
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Orders Today" value="184" change="+24% vs yesterday" color="#1E4DA0" icon={ShoppingBag} />
        <StatCard label="Revenue Today" value="£28.4K" change="+15% this week" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Pending Orders" value="37" change="-8 processing now" color="#1E4DA0" icon={Package} />
        <StatCard label="Active Products" value="2,841" change="+52 new listings" color="#1E4DA0" icon={Activity} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Recent Orders</p>
          <table className="w-full text-[8.5px]">
            <thead><tr>{["Order","Customer","Items","Amount","Status"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>{orders.map((o,i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 text-orange-400 font-mono pr-2">{o.id}</td>
                <td className="py-1.5 text-white pr-2">{o.cust}</td>
                <td className="py-1.5 text-white/40 pr-2">{o.qty}</td>
                <td className="py-1.5 text-white/70 pr-2">{o.amt}</td>
                <td className="py-1.5"><Pill s={o.st} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Stock Levels</p>
          {stock.map((v, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[7.5px] mb-0.5">
                <span className="text-white/45">{cats[i]}</span>
                <span className="text-white/60 font-medium">{v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <div className="h-1.5 rounded-full transition-all" style={{ width:`${v}%`, backgroundColor: v>70?"#1E4DA0":v>40?"#1E4DA0":"#1E4DA0" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesReportDash() {
  const bars = [48,62,55,79,67,91,84,72,98,88,103,115];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const reps = [
    { name:"Zain Ahmad",    region:"Dubai",      deals:48, rev:"$128K" },
    { name:"Amara Patel",   region:"Karachi",    deals:41, rev:"$109K" },
    { name:"James Wright",  region:"Toronto",    deals:37, rev:"$96K"  },
    { name:"Sadia Hussain", region:"New York",   deals:33, rev:"$88K"  },
    { name:"David Osei",    region:"Singapore",  deals:29, rev:"$74K"  },
  ];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Sales & Revenue Reports" iconBg="#1E4DA0" tabs={["Overview","By Region","By Product","Forecast"]} active="Overview" />
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Annual Revenue" value="£1.02M" change="+22.4% YoY" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Deals Closed" value="324" change="+18% this quarter" color="#1E4DA0" icon={Activity} />
        <StatCard label="Avg Deal Size" value="£3,148" change="+4.2% vs last year" color="#1E4DA0" icon={TrendingUp} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-1.5">Monthly Sales Performance (£K)</p>
          <BarChart data={bars} color="#1E4DA0" labels={months} w={230} h={100} />
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Top Sales Representatives</p>
          <table className="w-full text-[8.5px]">
            <thead><tr>{["#","Name","Region","Deals","Revenue"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>{reps.map((r,i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 text-white/25 pr-2">{i+1}</td>
                <td className="py-1.5 text-white font-medium pr-2">{r.name}</td>
                <td className="py-1.5 text-white/40 pr-2">{r.region}</td>
                <td className="py-1.5 text-white/60 pr-2">{r.deals}</td>
                <td className="py-1.5 text-emerald-400 font-bold">{r.rev}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiMetricsDash() {
  const kpis = [
    { label:"Total Revenue",    value:"£842K",  change:"+18.4%", color:"#1E4DA0", data:[40,55,48,70,65,82,90,85,95,88,102,112] },
    { label:"Active Clients",   value:"12.4K",  change:"+6.2%",  color:"#1E4DA0", data:[8.2,9.1,8.8,10.2,10.8,11.4,12.0,11.6,12.1,12.8,12.4,12.5] },
    { label:"Conversion Rate",  value:"3.84%",  change:"+0.6%",  color:"#1E4DA0", data:[2.8,3.1,2.9,3.4,3.2,3.6,3.5,3.7,3.9,3.8,3.7,3.84] },
    { label:"Avg Response",     value:"1.2s",   change:"-0.3s",  color:"#1E4DA0", data:[2.1,1.9,2.0,1.7,1.8,1.5,1.6,1.4,1.3,1.5,1.2,1.2] },
    { label:"Platform Uptime",  value:"99.97%", change:"+0.02%", color:"#1E4DA0", data:[99.8,99.9,99.7,99.95,99.9,99.97,99.95,99.98,99.97,99.96,99.98,99.97] },
    { label:"Support CSAT",     value:"4.9/5",  change:"+0.1",   color:"#1E4DA0", data:[4.5,4.6,4.5,4.7,4.6,4.8,4.7,4.8,4.9,4.8,4.9,4.9] },
  ];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Executive KPI Dashboard" iconBg="#1E4DA0" tabs={["Q4 2025","Q3 2025","YTD","All Time"]} active="Q4 2025" />
      <div className="grid grid-cols-3 gap-2 flex-1">
        {kpis.map((k,i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2.5 border border-white/8 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] text-white/40 uppercase tracking-wider">{k.label}</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">{k.change}</span>
            </div>
            <p className="text-[22px] font-bold text-white leading-none">{k.value}</p>
            <div className="mt-auto">
              <Sparkline data={k.data} color={k.color} w={150} h={38} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistributorDash() {
  const ledger = [
    { party:"Khan Wholesale",  qty:"2,200",  bal:"£8,450",  st:"Paid" },
    { party:"City Suppliers",  qty:"1,840",  bal:"£12,200", st:"Pending" },
    { party:"Al-Barakah Dist", qty:"3,600",  bal:"£0",      st:"Paid" },
    { party:"Metro Trading",   qty:"980",    bal:"£4,100",  st:"Overdue" },
    { party:"Premier Stores",  qty:"2,450",  bal:"£6,800",  st:"Paid" },
  ];
  const stock = [72,85,48,91,63,55,78,82];
  const cats  = ["Apparel","FMCG","Pharma","Tech","Food","Auto","Home","Elec"];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Distributor ERP" iconBg="#1E4DA0" icon={<Truck className="w-2.5 h-2.5" />}
        tabs={["Stock Ledger","Invoices","Deliveries","Suppliers"]} active="Stock Ledger" />
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Total Parties" value="284" change="+12 this month" color="#1E4DA0" icon={Users} />
        <StatCard label="Pending Dues" value="£68.4K" change="+£8K overdue" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Orders Today" value="142" change="+18 since 9am" color="#1E4DA0" icon={Package} />
        <StatCard label="In Transit" value="38" change="+5 dispatched" color="#1E4DA0" icon={Truck} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Party Stock Ledger</p>
          <table className="w-full text-[8.5px]">
            <thead><tr>{["Party Name","Qty (units)","Balance","Status"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>{ledger.map((r,i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 text-white font-medium pr-2">{r.party}</td>
                <td className="py-1.5 text-white/50 pr-2">{r.qty}</td>
                <td className="py-1.5 text-white/70 pr-2 font-mono">{r.bal}</td>
                <td className="py-1.5"><Pill s={r.st} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Category Stock Levels</p>
          {stock.map((v,i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-[7.5px] mb-0.5">
                <span className="text-white/40">{cats[i]}</span>
                <span className="text-white/60 font-medium">{v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <div className="h-1.5 rounded-full" style={{ width:`${v}%`, backgroundColor:"#1E4DA0" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantPosDash() {
  const tables = [
    {n:"T1",s:"Occupied",g:4},{n:"T2",s:"Available",g:0},{n:"T3",s:"Reserved",g:6},
    {n:"T4",s:"Occupied",g:2},{n:"T5",s:"Available",g:0},{n:"T6",s:"Occupied",g:5},
    {n:"T7",s:"Occupied",g:3},{n:"T8",s:"Available",g:0},{n:"T9",s:"Reserved",g:4},
    {n:"T10",s:"Occupied",g:2},{n:"T11",s:"Available",g:0},{n:"T12",s:"Occupied",g:6},
  ];
  const bg: Record<string,string> = { Occupied:"rgba(30,77,160,0.13)", Available:"rgba(30,77,160,0.10)", Reserved:"rgba(30,77,160,0.13)" };
  const tc: Record<string,string> = { Occupied:"#1E4DA0",   Available:"#1E4DA0",   Reserved:"#1E4DA0" };
  const orders = [
    { tbl:"T1",  items:"Burger ×2, Fries ×2, Cola ×2",                 total:"£28.50" },
    { tbl:"T4",  items:"Pasta ×1, Garden Salad ×1",                     total:"£18.00" },
    { tbl:"T6",  items:"Margherita Pizza ×2, Garlic Bread, Juice ×3",   total:"£42.50" },
    { tbl:"T12", items:"Grilled Steak ×2, Fries ×2, House Wine ×1",     total:"£78.00" },
  ];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Restaurant POS" iconBg="#1E4DA0" icon={<UtensilsCrossed className="w-2.5 h-2.5" />}
        tabs={["Floor View","Orders","Menu","Reports"]} active="Floor View" />
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Tables Occupied" value="7/12" change="+2 since lunch" color="#1E4DA0" icon={Activity} />
        <StatCard label="Revenue Today" value="£1,842" change="+14% vs yesterday" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Active Orders" value="4" change="+1 just placed" color="#1E4DA0" icon={Package} />
        <StatCard label="Avg Bill" value="£35.75" change="+£4.20 this week" color="#1E4DA0" icon={TrendingUp} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-48 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Floor Plan</p>
          <div className="grid grid-cols-3 gap-1.5">
            {tables.map(t => (
              <div key={t.n} className="rounded-lg p-1.5 text-center" style={{ backgroundColor:bg[t.s], border:`1px solid ${tc[t.s]}28` }}>
                <p className="text-[9px] font-bold" style={{ color:tc[t.s] }}>{t.n}</p>
                {t.g > 0 && <p className="text-[7px] text-white/25">{t.g} pax</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Active Orders</p>
          <div className="space-y-2">
            {orders.map((o,i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-amber-400">{o.tbl}</span>
                  <span className="text-[10px] font-bold text-white">{o.total}</span>
                </div>
                <p className="text-[8px] text-white/35">{o.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RealEstateDash() {
  const listings = [
    { prop:"204 Hyde Park Rd",      type:"Residential", price:"£425K", st:"Active" },
    { prop:"12 Canal Side Blvd",    type:"Commercial",  price:"£1.2M", st:"Pending" },
    { prop:"Flat 8, City Tower",    type:"Apartment",   price:"£195K", st:"Active" },
    { prop:"88 Green Lane",         type:"Residential", price:"£380K", st:"Closed" },
    { prop:"Unit 4, Ind. Estate",   type:"Industrial",  price:"£680K", st:"Active" },
  ];
  const stages = [
    { label:"New Leads",   count:48, color:"#1E4DA0" },
    { label:"Contacted",   count:31, color:"#1E4DA0" },
    { label:"Viewing",     count:18, color:"#1E4DA0" },
    { label:"Negotiation", count:9,  color:"#1E4DA0" },
    { label:"Closed",      count:24, color:"#1E4DA0" },
  ];
  return (
    <div className="w-full h-full bg-[#080f1e] flex flex-col text-white p-3 gap-2.5 overflow-hidden">
      <NavBar title="Real Estate ERP" iconBg="#1E4DA0" icon={<HomeIcon className="w-2.5 h-2.5" />}
        tabs={["Listings","Leads","Valuations","Reports"]} active="Listings" />
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Active Listings" value="148" change="+12 this month" color="#1E4DA0" icon={HomeIcon} />
        <StatCard label="Total Pipeline" value="£18.4M" change="+£2.1M this quarter" color="#1E4DA0" icon={DollarSign} />
        <StatCard label="Active Leads" value="130" change="+24 this week" color="#1E4DA0" icon={Users} />
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Property Listings</p>
          <table className="w-full text-[8.5px]">
            <thead><tr>{["Property","Type","Price","Status"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>{listings.map((r,i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 text-white font-medium pr-2">{r.prop}</td>
                <td className="py-1.5 text-white/40 pr-2">{r.type}</td>
                <td className="py-1.5 text-rose-400 font-bold pr-2">{r.price}</td>
                <td className="py-1.5"><Pill s={r.st} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 w-44 shrink-0">
          <p className="text-[9px] font-semibold text-white/50 mb-2">Lead Pipeline</p>
          {stages.map((s,i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[7.5px] mb-0.5">
                <span className="text-white/45">{s.label}</span>
                <span className="text-white/70 font-bold">{s.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <div className="h-1.5 rounded-full" style={{ width:`${(s.count/48)*100}%`, backgroundColor:s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Slide config ──────────────────────────────────────────── */

type SlideConfig = {
  component: React.ComponentType;
  label: string;
  tag: string;
  tagColor: string;
  wide?: boolean;
};

const SLIDES: SlideConfig[] = [
  { component: SchoolErpDash,    label: "School Management ERP",       tag: "Education",    tagColor: "#1E4DA0", wide: true },
  { component: HospitalErpDash,  label: "Hospital OPD & IPD Modules",  tag: "Healthcare",   tagColor: "#1E4DA0" },
  { component: AnalyticsDash,    label: "Business Analytics Dashboard", tag: "Analytics",    tagColor: "#1E4DA0" },
  { component: EcommerceDash,    label: "E-commerce ERP Suite",         tag: "E-commerce",   tagColor: "#1E4DA0" },
  { component: SalesReportDash,  label: "Sales & Revenue Reports",      tag: "Finance",      tagColor: "#1E4DA0" },
  { component: KpiMetricsDash,   label: "Executive KPI Dashboard",      tag: "Intelligence", tagColor: "#1E4DA0" },
  { component: DistributorDash,  label: "Distributor & Wholesale ERP",  tag: "Distribution", tagColor: "#1E4DA0" },
  { component: RestaurantPosDash,label: "Restaurant & POS System",      tag: "Restaurant",   tagColor: "#1E4DA0" },
  { component: RealEstateDash,   label: "Real Estate CRM & ERP",        tag: "Real Estate",  tagColor: "#1E4DA0" },
];

const H = 400; // slide height px

/* ─── Main slider ───────────────────────────────────────────── */

export function DashboardSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [active,   setActive]   = useState(0);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => el.removeEventListener("scroll", sync);
  }, [sync]);

  const scrollBy = (dir: -1 | 1) => trackRef.current?.scrollBy({ left: dir * 560, behavior: "smooth" });

  const goTo = (i: number) => {
    setActive(i);
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-10 lg:py-[60px] relative overflow-hidden bg-[#04080f] border-y border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Monitor className="w-3.5 h-3.5" />
              Live Product Interfaces
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">See Our Systems in Action</h2>
            <p className="mt-2 text-muted-foreground max-w-xl">Interactive previews of our deployed ERP platforms — real data, real UI.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => scrollBy(-1)} disabled={!canLeft}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white disabled:opacity-25 hover:bg-primary/20 hover:border-primary/50 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scrollBy(1)} disabled={!canRight}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white disabled:opacity-25 hover:bg-primary/20 hover:border-primary/50 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#04080f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#04080f] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-4 overflow-x-auto pl-8 pr-8 pb-2" style={{ scrollbarWidth: "none" }}>
          {SLIDES.map((slide, i) => {
            const width = slide.wide ? Math.round(H * 1.95) : Math.round(H * 1.42);
            return (
              <motion.div key={i} onClick={() => goTo(i)}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.4) }}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer shrink-0 transition-all duration-300 ${
                  active === i ? "border-primary/50 shadow-xl shadow-primary/10 ring-1 ring-primary/20" : "border-white/8 hover:border-white/20"
                }`}
                style={{ height: H, width }}>

                {/* Dashboard UI */}
                <div className="w-full h-full overflow-hidden">
                  <slide.component />
                </div>

                {/* Bottom label */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-20" />
                <div className="absolute bottom-3.5 left-4 z-30 flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
                    style={{ color: slide.tagColor, backgroundColor: `${slide.tagColor}22` }}>
                    {slide.tag}
                  </span>
                  <span className="text-white font-semibold text-sm drop-shadow">{slide.label}</span>
                </div>

                {active === i && (
                  <div className="absolute top-3 right-3 z-30 w-2 h-2 rounded-full bg-primary shadow-md shadow-primary/50" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
