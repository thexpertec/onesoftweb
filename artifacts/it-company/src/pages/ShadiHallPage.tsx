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
  ArrowRight, CheckCircle2, Heart, Users, Calendar,
  BarChart3, Receipt, ChevronRight, Star, Clock, ShieldCheck,
  TrendingUp, Zap, Globe, Lock, Sparkles, Building2,
  Wallet, ClipboardList, CheckCheck, FileText,
  Bell, Phone, Camera, Utensils, Mic2, Gift,
  UserCheck, MapPin, Music, Cake,
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

/* ─────────────────── Dashboard Slides ──────────────────── */

function BookingsSlide() {
  const bookings = [
    { id: "BK-1041", hall: "Grand Ballroom", client: "Malik Family",    date: "18 May 2026", pax: 450, advance: "£4,500", status: "Confirmed",  event: "Walima" },
    { id: "BK-1042", hall: "Rose Garden",    client: "Ahmed & Fatima",  date: "24 May 2026", pax: 200, advance: "£2,000", status: "Confirmed",  event: "Nikah"  },
    { id: "BK-1043", hall: "Grand Ballroom", client: "Khan Family",     date: "31 May 2026", pax: 600, advance: "£6,000", status: "Pending",    event: "Mehndi" },
    { id: "BK-1044", hall: "Pearl Suite",    client: "Siddiqui Group",  date: "07 Jun 2026", pax: 150, advance: "£1,500", status: "Confirmed",  event: "Baraat" },
    { id: "BK-1045", hall: "Rose Garden",    client: "Butt Family",     date: "14 Jun 2026", pax: 250, advance: "£2,500", status: "Pending",    event: "Walima" },
    { id: "BK-1046", hall: "Pearl Suite",    client: "Chaudhry Party",  date: "21 Jun 2026", pax: 180, advance: "£1,800", status: "Enquiry",    event: "Nikah"  },
  ];
  const kpis = [
    { label: "Events This Month", value: "24",    color: "#1E4DA0", Icon: Calendar },
    { label: "Hall Occupancy",    value: "87%",   color: "#1E4DA0", Icon: Building2 },
    { label: "Revenue MTD",       value: "£84K",  color: "#1E4DA0", Icon: Wallet    },
    { label: "Pending Enquiries", value: "9",     color: "#1E4DA0", Icon: Bell      },
  ];
  const stColor = (s: string) => s === "Confirmed" ? "#1E4DA0" : s === "Pending" ? "#1E4DA0" : "#1E4DA0";
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
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Upcoming Bookings</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Ref","Hall","Client","Date","Guests","Advance","Event","Status"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
          ))}</tr></thead>
          <tbody>
            {bookings.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-2 font-mono" style={{ color: "#1E4DA0" }}>{r.id}</td>
                <td className="py-1.5 pr-2 text-white/60">{r.hall}</td>
                <td className="py-1.5 pr-2 text-white/85 font-semibold">{r.client}</td>
                <td className="py-1.5 pr-2 text-white/55">{r.date}</td>
                <td className="py-1.5 pr-2 text-white/55">{r.pax}</td>
                <td className="py-1.5 pr-2 text-white/70 font-semibold">{r.advance}</td>
                <td className="py-1.5 pr-2 text-white/55">{r.event}</td>
                <td className="py-1.5">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: stColor(r.status), background: `${stColor(r.status)}18` }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarSlide() {
  const days = ["Mon 18", "Tue 19", "Wed 20", "Thu 21", "Fri 22", "Sat 23", "Sun 24"];
  const halls = ["Grand Ballroom", "Rose Garden", "Pearl Suite"];
  const colorMap: Record<string, string> = {
    Walima: "#1E4DA0", Nikah: "#1E4DA0", Mehndi: "#1E4DA0", Baraat: "#1E4DA0", Corporate: "#1E4DA0",
  };
  const schedule: Record<string, Record<string, { event: string; client: string } | null>> = {
    "Grand Ballroom": {
      "Mon 18": { event: "Walima",  client: "Malik Family"    },
      "Tue 19": null,
      "Wed 20": { event: "Baraat",  client: "Raja Party"      },
      "Thu 21": null,
      "Fri 22": { event: "Corporate", client: "TechCorp Ltd"  },
      "Sat 23": { event: "Walima",  client: "Hussain Family"  },
      "Sun 24": { event: "Nikah",   client: "Ali & Sara"      },
    },
    "Rose Garden": {
      "Mon 18": null,
      "Tue 19": { event: "Mehndi",  client: "Siddiqui Family" },
      "Wed 20": null,
      "Thu 21": { event: "Nikah",   client: "Tariq & Amna"    },
      "Fri 22": null,
      "Sat 23": { event: "Walima",  client: "Chaudhry Group"  },
      "Sun 24": { event: "Nikah",   client: "Ahmed & Fatima"  },
    },
    "Pearl Suite": {
      "Mon 18": { event: "Corporate", client: "Summit Events" },
      "Tue 19": null,
      "Wed 20": { event: "Mehndi",  client: "Khan Family"     },
      "Thu 21": null,
      "Fri 22": { event: "Baraat",  client: "Butt Family"     },
      "Sat 23": null,
      "Sun 24": { event: "Walima",  client: "Raza & Zara"     },
    },
  };
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[8.5px] font-semibold text-white/50">Hall Availability — Week of 18 May</p>
        <span className="text-[7px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(30,77,160,0.2)", color: "#1E4DA0" }}>Live View</span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-full text-[7px] border-collapse">
          <thead>
            <tr>
              <th className="text-white/25 font-medium pb-1.5 text-left pr-2 w-20">Hall</th>
              {days.map(d => <th key={d} className="text-white/25 font-medium pb-1.5 text-left pr-1 min-w-[72px]">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall}>
                <td className="py-1 pr-2 text-white/70 font-semibold text-[6.5px] align-top">{hall}</td>
                {days.map(d => {
                  const ev = schedule[hall][d];
                  if (!ev) return <td key={d} className="py-1 pr-1 align-top"><div className="px-1.5 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-[5.5px] text-white/20">Available</div></td>;
                  const c = colorMap[ev.event] ?? "rgba(0,0,0,0.45)";
                  return (
                    <td key={d} className="py-1 pr-1 align-top">
                      <div className="px-1.5 py-1 rounded border" style={{ background: `${c}18`, borderColor: `${c}35` }}>
                        <p className="text-[6px] font-bold" style={{ color: c }}>{ev.event}</p>
                        <p className="text-[5.5px] text-white/45 truncate">{ev.client}</p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(colorMap).map(([ev, c]) => (
          <div key={ev} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} /><span className="text-[6.5px] text-white/35">{ev}</span></div>
        ))}
      </div>
    </div>
  );
}

function CateringSlide() {
  const menus = [
    { name: "Platinum Package",  price: "£55/head", items: 14, desc: "BBQ + Karahi + Desserts", color: "#1E4DA0" },
    { name: "Gold Package",      price: "£38/head", items: 10, desc: "Karahi + Biryani + Sweets", color: "#1E4DA0" },
    { name: "Silver Package",    price: "£25/head", items: 7,  desc: "Biryani + Raita + Drinks",  color: "rgba(0,0,0,0.45)" },
    { name: "Custom Package",    price: "Quote",    items: 0,  desc: "Bespoke menu selection",    color: "#1E4DA0" },
  ];
  const orders = [
    { event: "Malik Walima",   date: "18 May", pkg: "Platinum", pax: 450, chef: "Chef Aziz",   status: "Confirmed" },
    { event: "Ahmed Nikah",    date: "24 May", pkg: "Gold",     pax: 200, chef: "Chef Tariq",  status: "Prep"      },
    { event: "Khan Mehndi",    date: "31 May", pkg: "Silver",   pax: 600, chef: "Chef Aziz",   status: "Pending"   },
    { event: "Siddiqui Baraat",date: "07 Jun", pkg: "Custom",   pax: 150, chef: "TBC",         status: "Enquiry"   },
  ];
  const stColor = (s: string) => s === "Confirmed" ? "#1E4DA0" : s === "Prep" ? "#1E4DA0" : s === "Pending" ? "#1E4DA0" : "#1E4DA0";
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-2 shrink-0" style={{ width: "195px" }}>
        {menus.map((m, i) => (
          <div key={i} className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[7.5px] font-bold text-white/80">{m.name}</p>
              <span className="text-[8px] font-black" style={{ color: m.color }}>{m.price}</span>
            </div>
            <p className="text-[6.5px] text-white/40">{m.desc}</p>
            {m.items > 0 && <p className="text-[6px] text-white/25 mt-0.5">{m.items} dishes</p>}
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Catering Orders</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Event","Date","Package","Guests","Chef","Status"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {orders.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 text-white/85 font-semibold">{r.event}</td>
                <td className="py-1.5 pr-3 text-white/45">{r.date}</td>
                <td className="py-1.5 pr-3 text-white/60">{r.pkg}</td>
                <td className="py-1.5 pr-3 text-white/55">{r.pax}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.chef}</td>
                <td className="py-1.5">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: stColor(r.status), background: `${stColor(r.status)}18` }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BillingSlide() {
  const invoices = [
    { inv: "INV-2041", client: "Malik Family",    event: "Walima",  total: "£22,500", paid: "£18,000", balance: "£4,500",  due: "18 May", overdue: false },
    { inv: "INV-2042", client: "Ahmed & Fatima",  event: "Nikah",   total: "£9,600",  paid: "£9,600",  balance: "£0",     due: "Settled", overdue: false },
    { inv: "INV-2043", client: "Khan Family",     event: "Mehndi",  total: "£15,000", paid: "£6,000",  balance: "£9,000", due: "31 May", overdue: false },
    { inv: "INV-2040", client: "Chaudhry Party",  event: "Baraat",  total: "£11,200", paid: "£8,000",  balance: "£3,200", due: "02 May", overdue: true  },
  ];
  const summary = [
    { label: "Total Invoiced",  value: "£184,200", color: "#1E4DA0" },
    { label: "Collected",       value: "£152,400", color: "#1E4DA0" },
    { label: "Outstanding",     value: "£31,800",  color: "#1E4DA0" },
    { label: "Overdue",         value: "£8,400",   color: "#1E4DA0" },
  ];
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="grid grid-cols-4 gap-2 mb-2 shrink-0">
        {summary.map((s, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl p-2 border border-white/8">
            <p className="text-[7px] text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-[13px] font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Invoices</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Invoice","Client","Event","Total","Paid","Balance","Due"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {invoices.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono" style={{ color: "#1E4DA0" }}>{r.inv}</td>
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.client}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.event}</td>
                <td className="py-1.5 pr-3 text-white/70 font-semibold">{r.total}</td>
                <td className="py-1.5 pr-3 text-emerald-400">{r.paid}</td>
                <td className="py-1.5 pr-3"><span className={r.balance === "£0" ? "text-white/30" : r.overdue ? "text-red-400 font-bold" : "text-amber-400"}>{r.balance}</span></td>
                <td className="py-1.5"><span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.overdue ? "text-red-400 bg-red-400/10" : r.balance === "£0" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"}`}>{r.due}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShadiDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "Bookings",  Component: BookingsSlide  },
    { label: "Calendar",  Component: CalendarSlide  },
    { label: "Catering",  Component: CateringSlide  },
    { label: "Billing",   Component: BillingSlide   },
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
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(30,77,160,0.25)" }}>
            <Heart className="w-3.5 h-3.5" style={{ color: "#1E4DA0" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft Shadi Hall</span>
        </div>
        <div className="flex gap-1">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className="text-[9px] px-2.5 py-1 rounded-md font-medium transition-all"
              style={{ background: i === slide ? "#1E4DA0" : "rgba(255,255,255,0.06)", color: i === slide ? "#fff" : "rgba(255,255,255,0.45)" }}>
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
            style={{ width: i === slide ? 24 : 6, background: i === slide ? "#1E4DA0" : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Page data ──────────────────────────── */

const modules = [
  { icon: Calendar,    color: "#1E4DA0", bg: "#2d0a1a", border: "#1E4DA030", title: "Booking Management",
    desc: "Handle enquiries, confirm hall bookings, and manage date availability across multiple venues in real time.",
    pts: ["Multi-hall availability calendar", "Online enquiry & booking forms", "Advance deposit tracking", "Auto booking confirmation SMS/email"] },
  { icon: Building2,   color: "#1E4DA0", bg: "#1a0b38", border: "#1E4DA030", title: "Venue & Hall Setup",
    desc: "Configure halls, seating capacities, décor packages, and amenities to match every event type.",
    pts: ["Multiple hall profiles & layouts", "Seating capacity configuration", "Décor & furniture packages", "Hall conflict prevention"] },
  { icon: Utensils,    color: "#1E4DA0", bg: "#2d1f00", border: "#1E4DA030", title: "Catering Management",
    desc: "Create menu packages, assign chefs, track food orders, and manage kitchen prep for each event.",
    pts: ["Tiered catering package builder", "Per-head cost calculation", "Chef & kitchen staff assignment", "Dietary requirement tracking"] },
  { icon: Wallet,      color: "#1E4DA0", bg: "#052e1c", border: "#1E4DA030", title: "Billing & Invoicing",
    desc: "Generate itemised invoices, track advance payments, send payment reminders, and close accounts instantly.",
    pts: ["Auto-generated event invoices", "Advance & balance payment tracking", "Overdue payment alerts", "Receipt printing & PDF export"] },
  { icon: Users,       color: "#1E4DA0", bg: "#0a1f3e", border: "#1E4DA030", title: "Client CRM",
    desc: "Keep a complete record of every client — bookings history, preferences, payments, and follow-up notes.",
    pts: ["Client profiles with booking history", "Follow-up reminders & notes", "Repeat client discounts", "WhatsApp & SMS communication log"] },
  { icon: UserCheck,   color: "#1E4DA0", bg: "#011e26", border: "#1E4DA030", title: "Staff Management",
    desc: "Roster waiters, managers, and decorators per event, track duty hours, and process payroll automatically.",
    pts: ["Per-event staff assignment", "Duty roster & shift planning", "Attendance & overtime tracking", "Payroll calculation per event"] },
  { icon: Camera,      color: "#1E4DA0", bg: "#2d0a1a", border: "#1E4DA030", title: "Vendor Coordination",
    desc: "Link photographers, florists, decorators, and DJs to each booking and manage their payments in one place.",
    pts: ["Vendor directory & profiles", "Per-event vendor assignment", "Vendor payment & commission tracking", "Vendor performance ratings"] },
  { icon: BarChart3,   color: "#1E4DA0", bg: "#021f1c", border: "#1E4DA030", title: "Reports & Analytics",
    desc: "Track revenue by hall, event type, and month. Spot booking trends and plan capacity like never before.",
    pts: ["Revenue by hall & event type", "Occupancy rate dashboards", "Monthly & annual P&L summary", "Peak season demand forecasting"] },
];

const flow = [
  { step: "01", icon: Phone,      color: "#1E4DA0", title: "Enquiry Received",          detail: "Client calls or submits a booking enquiry — their details, event type, and preferred dates are logged instantly" },
  { step: "02", icon: Calendar,   color: "#1E4DA0", title: "Availability Checked",       detail: "The system checks hall availability in real time — no double-bookings, no manual checks across registers" },
  { step: "03", icon: FileText,   color: "#1E4DA0", title: "Booking Confirmed",          detail: "Quote sent, advance payment recorded, and hall blocked — client receives an automatic confirmation message" },
  { step: "04", icon: Utensils,   color: "#1E4DA0", title: "Catering & Vendors Assigned",detail: "Catering package selected, chef assigned, and vendors linked — everything attached to one event record" },
  { step: "05", icon: CheckCheck, color: "#1E4DA0", title: "Event Runs Smoothly",        detail: "Staff rostered, kitchen prepped, décor set — your team works from the same live event plan on any device" },
  { step: "06", icon: Receipt,    color: "#1E4DA0", title: "Invoice Settled",            detail: "Balance invoice generated automatically after the event — paid, receipted, and filed with zero paperwork" },
];

const testimonials = [
  { quote: "Before OneSoft, our booking register was a paper diary and our billing was done in Excel. We had double-bookings twice in one season. Now every hall is managed from a single screen and we haven't had a single conflict in two years.",
    name: "Mr. Tariq Hussain", role: "Owner", co: "Royal Palace Banquets, Dubai, UAE", color: "#1E4DA0" },
  { quote: "The catering module completely changed how we operate. We know exactly how many guests are expected, which chef is assigned, and what's on the menu for every event three weeks in advance. Wastage is down by 30%.",
    name: "Mrs. Saima Malik", role: "Operations Manager", co: "Pearl Garden Shadi Hall, Lahore, Pakistan", color: "#1E4DA0" },
  { quote: "Our clients love getting automated confirmation messages and payment reminders on WhatsApp. We used to spend hours calling families — now the system does it. Our team can focus on the event, not the admin.",
    name: "Mr. Asif Chaudhry", role: "Managing Director", co: "The Grand Marquee, Toronto, Canada", color: "#1E4DA0" },
];

const stats = [
  { value: 120, suffix: "+", label: "Shadi Halls Managed" },
  { value: 15000, suffix: "+", label: "Events Processed" },
  { value: 40, suffix: "%",  label: "Avg. Admin Time Saved" },
  { value: 99.8, suffix: "%", decimals: 1, label: "Zero Double-Booking Rate" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function ShadiHallPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const tableBg      = isLight ? "#ffffff"             : "#07111f";
  const connectorBg  = isLight ? "#F5F5F5"             : "#070e1c";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)"    : "rgba(255,255,255,0.08)";
  const gridLine     = isLight ? "rgba(0,0,0,0.04)"    : "rgba(255,255,255,0.06)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t50          = isLight ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.5)";
  const t80          = isLight ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.8)";
  const t90          = isLight ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.9)";
  const cardBg       = isLight ? "#ffffff"             : "rgba(255,255,255,0.03)";
  const cardBorder   = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";

  const PINK = "#1E4DA0";

  return (
    <div className="min-h-screen" style={{ background: pageBg }}>
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-24 pb-4 md:pt-32 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left copy */}
            <div className="flex-1 max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6"
                style={{ background: `${PINK}15`, borderColor: `${PINK}40`, color: PINK }}>
                <Heart className="w-3.5 h-3.5" />
                Shadi Hall ERP — Complete Event Management
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black leading-tight mb-5">
                Run Your{" "}
                <span style={{ color: PINK }}>Shadi Hall</span>{" "}
                Without the Chaos
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg leading-relaxed mb-8" style={{ color: t50 }}>
                From the first enquiry to the final invoice — bookings, catering, billing, vendors, and staff all in one system. No double-bookings. No missed payments. No chaos.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10">
                <Button size="lg" onClick={() => openCTAModal()} className="gap-2 text-white" style={{ background: PINK, border: "none" }}>
                  Book a Free Demo <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2" style={{ borderColor: dividerColor, color: t80 }}>
                  See Pricing <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>

              {/* Trust row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-5">
                {[
                  { icon: ShieldCheck, text: "Zero double-bookings guaranteed" },
                  { icon: Zap,         text: "Go live in under 3 days" },
                  { icon: Globe,       text: "Access from any device" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: PINK }} />
                    <span className="text-sm" style={{ color: t50 }}>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section style={{ background: sectionBg, borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }} className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <p className="text-4xl font-black mb-1" style={{ color: PINK }}>
                  <CountUp to={s.value} suffix={s.suffix} decimals={(s as any).decimals ?? 0} />
                </p>
                <p className="text-sm" style={{ color: t45 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: pageBg }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
              Everything in One System
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black mb-4">
              8 Modules, 1 Platform
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto" style={{ color: t50 }}>
              Every aspect of running a shadi hall — from the first phone call to the final payment — handled by a single, connected system.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                className="rounded-2xl p-6 border flex flex-col" style={{ background: isLight ? cardBg : m.bg, borderColor: isLight ? cardBorder : m.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: `${m.color}20`, border: `1px solid ${m.color}35` }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: t90 }}>{m.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: t50 }}>{m.desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {m.pts.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: t45 }}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: m.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
              How It Works
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black mb-4">
              From Enquiry to Invoice — Automated
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto" style={{ color: t50 }}>
              Every step of the event journey flows through OneSoft — connected, automated, and visible to your whole team.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* connector line */}
            <div className="hidden md:block absolute top-9 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${PINK}60, transparent)` }} />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {flow.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-4 border"
                    style={{ background: isLight ? "#fff" : connectorBg, borderColor: `${f.color}40` }}>
                    <f.icon className="w-6 h-6 mb-1" style={{ color: f.color }} />
                    <span className="text-[10px] font-black" style={{ color: f.color }}>{f.step}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2" style={{ color: t90 }}>{f.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: t45 }}>{f.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <CTAStrip />

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: pageBg }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
              Trusted by Shadi Halls Worldwide
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black">
              What Hall Managers Say
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl p-6 border flex flex-col" style={{ background: cardBg, borderColor: cardBorder }}>
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: t50 }}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: t90 }}>{t.name}</p>
                    <p className="text-xs" style={{ color: t45 }}>{t.role} · {t.co}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────── */}
      <section className="py-20" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
              Why OneSoft?
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-black">
              Spreadsheets vs. OneSoft
            </motion.h2>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border overflow-hidden" style={{ background: tableBg, borderColor: dividerColor }}>
            <div className="grid grid-cols-3 px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: `${PINK}15`, color: PINK }}>
              <span>Feature</span>
              <span className="text-center" style={{ color: t50 }}>Spreadsheets / Paper</span>
              <span className="text-center" style={{ color: PINK }}>OneSoft Shadi Hall ERP</span>
            </div>
            {[
              ["Double-booking prevention",     "Manual checks — error-prone",  "Automatic — impossible to double-book"],
              ["Payment tracking",              "Excel cells, easy to miss",     "Live balance sheet per event"],
              ["Client communication",          "Phone calls only",              "Auto SMS/WhatsApp confirmations"],
              ["Catering coordination",         "Separate paper sheets",         "Linked to every booking record"],
              ["Staff rostering",               "WhatsApp groups",               "Scheduled per event, payroll-ready"],
              ["Revenue reports",               "End-of-month manual totals",    "Real-time dashboard, any period"],
              ["Vendor management",             "Contacts in your phone",        "Full vendor directory with payments"],
              ["Access from mobile",            "Not possible",                  "Any device, anywhere"],
            ].map(([feat, bad, good], i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4 text-sm" style={{ borderTop: `1px solid ${gridLine}` }}>
                <span className="font-medium" style={{ color: t80 }}>{feat}</span>
                <span className="text-center flex items-center justify-center gap-1.5" style={{ color: t45 }}>
                  <span className="w-4 h-4 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold shrink-0">✕</span>
                  {bad}
                </span>
                <span className="text-center flex items-center justify-center gap-1.5" style={{ color: t80 }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: PINK }} />
                  {good}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-16" style={{ background: pageBg }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 border relative overflow-hidden"
            style={{ background: `${PINK}10`, borderColor: `${PINK}35` }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${PINK}15 0%, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border" style={{ background: `${PINK}20`, borderColor: `${PINK}50` }}>
                <Heart className="w-7 h-7" style={{ color: PINK }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Manage Every Event with Confidence?
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: t50 }}>
                Book a free 30-minute live demo. We'll walk through bookings, catering, billing, and reports — tailored to how your hall operates.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" onClick={() => openCTAModal()} className="gap-2 text-white" style={{ background: PINK, border: "none" }}>
                  Book Free Demo <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" style={{ borderColor: `${PINK}40`, color: PINK }}>
                  Talk to Sales
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FeatureMarqueeSection
        accentColor="#1E4DA0"
        heading="Everything a Shadi Hall Needs"
        subheading="From booking to billing — every module built for modern banquet halls and wedding venues."
        row1={[
          { icon: "💒", label: "Booking Management",    color: "#1E4DA0" },
          { icon: "📅", label: "Hall Calendar",         color: "#1E4DA0" },
          { icon: "🎉", label: "Event Scheduling",      color: "#1E4DA0" },
          { icon: "👥", label: "Guest Management",      color: "#1E4DA0" },
          { icon: "🔒", label: "Advance Booking",       color: "#1E4DA0" },
          { icon: "⚠️", label: "Conflict Prevention",   color: "#1E4DA0" },
          { icon: "💬", label: "WhatsApp Alerts",       color: "#1E4DA0" },
          { icon: "👤", label: "Customer Portal",       color: "#1E4DA0" },
          { icon: "🍽️", label: "Catering Management",  color: "#1E4DA0" },
          { icon: "📋", label: "Menu Planning",         color: "#1E4DA0" },
          { icon: "👨‍🍳", label: "Chef Assignment",     color: "#1E4DA0" },
          { icon: "📦", label: "Inventory Control",     color: "#1E4DA0" },
        ]}
        row2={[
          { icon: "👥", label: "Staff Scheduling",      color: "#1E4DA0" },
          { icon: "🎀", label: "Decoration Packages",   color: "#1E4DA0" },
          { icon: "🤝", label: "Vendor Management",     color: "#1E4DA0" },
          { icon: "🧮", label: "Food Costing",          color: "#1E4DA0" },
          { icon: "🧾", label: "Billing & Invoicing",   color: "#1E4DA0" },
          { icon: "💳", label: "Installment Plans",     color: "#1E4DA0" },
          { icon: "💰", label: "Payment Tracking",      color: "#1E4DA0" },
          { icon: "🏛️", label: "Multi-Hall",            color: "#1E4DA0" },
          { icon: "📊", label: "Event Reports",         color: "#1E4DA0" },
          { icon: "📷", label: "Photo Gallery",         color: "#1E4DA0" },
          { icon: "⭐", label: "Feedback Collection",   color: "#1E4DA0" },
          { icon: "🎁", label: "Loyalty Program",       color: "#1E4DA0" },
        ]}
        row3={[
          { icon: "📱", label: "Mobile App",            color: "#1E4DA0" },
          { icon: "☁️", label: "Cloud Hosted",          color: "#1E4DA0" },
          { icon: "🔑", label: "Role-Based Access",     color: "#1E4DA0" },
          { icon: "🔔", label: "Reminder Automation",   color: "#1E4DA0" },
          { icon: "📑", label: "Contract Generator",    color: "#1E4DA0" },
          { icon: "🌍", label: "Multi-Currency",        color: "#1E4DA0" },
          { icon: "🔒", label: "Audit Trail",           color: "#1E4DA0" },
          { icon: "📈", label: "Revenue Analytics",     color: "#1E4DA0" },
          { icon: "🎶", label: "Sound & AV Booking",    color: "#1E4DA0" },
          { icon: "🚗", label: "Parking Management",    color: "#1E4DA0" },
          { icon: "🧾", label: "Tax Compliance",        color: "#1E4DA0" },
          { icon: "🤖", label: "AI Availability Check", color: "#1E4DA0" },
        ]}
      />
      <CustomSolutionsSection accentColor="#1E4DA0" productName="Shadi Hall ERP" />
      <ERPCrossLinks current="/shadi-hall" />
      <Footer />
    </div>
  );
}
