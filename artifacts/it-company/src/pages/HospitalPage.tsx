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
  ArrowRight, CheckCircle2, Stethoscope, Users, Calendar,
  BedDouble, FlaskConical, Pill, BarChart3, Receipt,
  ChevronRight, Star, Clock, ShieldCheck, TrendingUp,
  FileText, Zap, Globe, Lock, Sparkles, Building2,
  ClipboardList, Ambulance, HeartPulse, UserCog, Wallet,
  AlertCircle, CheckCheck,
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

function OPDSlide() {
  const queue = [
    { token: "OPD-041", name: "Mrs. Fatima Ali",   age: 54, dept: "Cardiology",  status: "In Consultation", wait: "—" },
    { token: "OPD-042", name: "Mr. James Patel",   age: 38, dept: "General",     status: "Waiting",         wait: "8 min" },
    { token: "OPD-043", name: "Sarah Thompson",    age: 29, dept: "ENT",         status: "Waiting",         wait: "22 min" },
    { token: "OPD-044", name: "Mr. Ravi Menon",    age: 62, dept: "Orthopaedics",status: "Waiting",         wait: "35 min" },
    { token: "OPD-045", name: "Emma Clarke",       age: 41, dept: "Dermatology", status: "Registered",      wait: "45 min" },
  ];
  const kpis = [
    { label: "Today's OPD",    value: "84",   color: "#1E4DA0", Icon: Users },
    { label: "In Consultation",value: "6",    color: "#4FC6FF", Icon: Stethoscope },
    { label: "Avg Wait Time",  value: "18m",  color: "#4FC6FF", Icon: Clock },
    { label: "Appointments",   value: "112",  color: "#1E4DA0", Icon: Calendar },
  ];
  const statusColor = (s: string) => s === "In Consultation" ? "#4FC6FF" : s === "Waiting" ? "#4FC6FF" : "#94a3b8";
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
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">OPD Queue — Live</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Token","Patient","Age","Department","Status","Est. Wait"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {queue.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono text-white/50">{r.token}</td>
                <td className="py-1.5 pr-3 text-white/85 font-semibold">{r.name}</td>
                <td className="py-1.5 pr-3 text-white/40">{r.age}</td>
                <td className="py-1.5 pr-3 text-white/60">{r.dept}</td>
                <td className="py-1.5 pr-3">
                  <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: statusColor(r.status), background: `${statusColor(r.status)}18` }}>{r.status}</span>
                </td>
                <td className="py-1.5 text-white/40">{r.wait}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WardSlide() {
  const wards = [
    { name: "General Ward A", total: 24, occupied: 21, available: 3, color: "#1E4DA0" },
    { name: "Cardiology",     total: 16, occupied: 14, available: 2, color: "#1E4DA0" },
    { name: "Orthopaedics",   total: 12, occupied: 8,  available: 4, color: "#4FC6FF" },
    { name: "Maternity",      total: 10, occupied: 7,  available: 3, color: "#4FC6FF" },
    { name: "ICU",            total: 8,  occupied: 8,  available: 0, color: "#1E4DA0" },
    { name: "Paediatrics",    total: 14, occupied: 9,  available: 5, color: "#4FC6FF" },
  ];
  const inpatients = [
    { name: "Mr. Ahmed Khan",   ward: "Cardiology",   bed: "C-04", days: 3, doctor: "Dr. Smith",   status: "Stable" },
    { name: "Ms. Priya Sharma", ward: "General A",    bed: "A-11", days: 1, doctor: "Dr. Patel",   status: "Stable" },
    { name: "Mr. Tom Wilson",   ward: "Orthopaedics", bed: "O-02", days: 5, doctor: "Dr. Clarke",  status: "Critical" },
    { name: "Mrs. Emma Davis",  ward: "Maternity",    bed: "M-03", days: 2, doctor: "Dr. Ahmed",   status: "Stable" },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 shrink-0" style={{ width: "200px" }}>
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Ward Occupancy</p>
        <div className="space-y-2.5">
          {wards.map((w, i) => (
            <div key={i}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[7px] text-white/60">{w.name}</span>
                <span className="text-[7px] font-semibold text-white/70">{w.occupied}/{w.total}</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${(w.occupied/w.total)*100}%`, background: w.occupied === w.total ? "#1E4DA0" : w.color }} />
              </div>
              {w.available === 0 && <p className="text-[6px] text-red-400 font-bold mt-0.5">FULL</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Current Inpatients</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Patient","Ward","Bed","Days","Doctor","Status"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {inpatients.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 text-white/85 font-semibold">{r.name}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.ward}</td>
                <td className="py-1.5 pr-3 font-mono text-white/60">{r.bed}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.days}d</td>
                <td className="py-1.5 pr-3 text-white/60">{r.doctor}</td>
                <td className="py-1.5">
                  <span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.status === "Critical" ? "text-red-400 bg-red-400/10" : "text-emerald-400 bg-emerald-400/10"}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PharmacySlide() {
  const prescriptions = [
    { id: "RX-0291", patient: "Mrs. Fatima Ali",  drug: "Atorvastatin 20mg", qty: 30, status: "Dispensed",  dr: "Dr. Smith"  },
    { id: "RX-0292", patient: "Mr. Ravi Menon",   drug: "Metformin 500mg",   qty: 60, status: "Pending",    dr: "Dr. Patel"  },
    { id: "RX-0293", patient: "Sarah Thompson",   drug: "Amoxicillin 250mg", qty: 21, status: "Dispensed",  dr: "Dr. Clarke" },
    { id: "RX-0294", patient: "Mr. James Patel",  drug: "Ibuprofen 400mg",   qty: 14, status: "Pending",    dr: "Dr. Ahmed"  },
    { id: "RX-0295", patient: "Emma Clarke",       drug: "Cetirizine 10mg",   qty: 28, status: "Dispensed",  dr: "Dr. Smith"  },
  ];
  const stock = [
    { name: "Paracetamol 500mg", stock: 1240, min: 200, color: "#4FC6FF" },
    { name: "Amoxicillin 250mg", stock: 84,   min: 100, color: "#1E4DA0" },
    { name: "Metformin 500mg",   stock: 620,  min: 150, color: "#4FC6FF" },
    { name: "Aspirin 75mg",      stock: 940,  min: 200, color: "#4FC6FF" },
    { name: "Omeprazole 20mg",   stock: 112,  min: 150, color: "#4FC6FF" },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-2 shrink-0" style={{ width: "180px" }}>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <p className="text-[8.5px] font-semibold text-white/50 mb-2">Drug Stock Levels</p>
          <div className="space-y-2">
            {stock.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[7px] text-white/60 truncate pr-1">{s.name}</span>
                  <span className="text-[7px] font-semibold shrink-0" style={{ color: s.stock < s.min ? "#1E4DA0" : s.stock < s.min * 1.5 ? "#4FC6FF" : "#4FC6FF" }}>{s.stock}</span>
                </div>
                <div className="h-1 bg-white/8 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${Math.min((s.stock / 1400) * 100, 100)}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 p-2 rounded-lg" style={{ background: "rgba(30,77,160,0.12)", border: "1px solid rgba(30,77,160,0.25)" }}>
            <p className="text-[7px] text-red-400 font-bold">⚠ 2 drugs below minimum</p>
          </div>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Today's Prescriptions</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Rx ID","Patient","Drug","Qty","Doctor","Status"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {prescriptions.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono" style={{ color: "#1E4DA0" }}>{r.id}</td>
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.patient}</td>
                <td className="py-1.5 pr-3 text-white/60">{r.drug}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.qty}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.dr}</td>
                <td className="py-1.5">
                  <span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.status === "Dispensed" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"}`}>{r.status}</span>
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
    { id: "INV-0841", patient: "Mr. Ahmed Khan",   type: "Inpatient",   amount: "£3,840", insurer: "BUPA",       status: "Claimed"  },
    { id: "INV-0842", patient: "Ms. Priya Sharma",  type: "OPD",         amount: "£180",   insurer: "Self-Pay",   status: "Paid"     },
    { id: "INV-0843", patient: "Mr. Tom Wilson",    type: "Surgery",     amount: "£8,200", insurer: "AXA",        status: "Pending"  },
    { id: "INV-0844", patient: "Mrs. Emma Davis",   type: "Maternity",   amount: "£2,600", insurer: "Aviva",      status: "Claimed"  },
    { id: "INV-0845", patient: "Sarah Thompson",    type: "OPD + Lab",   amount: "£340",   insurer: "Self-Pay",   status: "Paid"     },
  ];
  const summary = [
    { label: "Today's Revenue",    value: "£18,420", color: "#4FC6FF" },
    { label: "Insurance Claims",   value: "£14,640", color: "#1E4DA0" },
    { label: "Pending Collection", value: "£8,200",  color: "#4FC6FF" },
  ];
  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {summary.map((s, i) => (
          <div key={i} className="bg-white/[0.04] rounded-xl px-3 py-2 border border-white/8">
            <p className="text-[7.5px] text-white/40 mb-1">{s.label}</p>
            <p className="text-[15px] font-black" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Recent Invoices</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Invoice","Patient","Type","Amount","Insurer","Status"].map(h => (
            <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {invoices.map((r, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1.5 pr-3 font-mono" style={{ color: "#1E4DA0" }}>{r.id}</td>
                <td className="py-1.5 pr-3 text-white/80 font-semibold">{r.patient}</td>
                <td className="py-1.5 pr-3 text-white/50">{r.type}</td>
                <td className="py-1.5 pr-3 text-white/75 font-semibold">{r.amount}</td>
                <td className="py-1.5 pr-3 text-white/40">{r.insurer}</td>
                <td className="py-1.5">
                  <span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.status === "Paid" ? "text-emerald-400 bg-emerald-400/10" : r.status === "Claimed" ? "text-blue-400 bg-blue-400/10" : "text-amber-400 bg-amber-400/10"}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HospitalDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "OPD Queue",  Component: OPDSlide },
    { label: "Ward Status",Component: WardSlide },
    { label: "Pharmacy",   Component: PharmacySlide },
    { label: "Billing",    Component: BillingSlide },
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
            <Stethoscope className="w-3.5 h-3.5" style={{ color: "#1E4DA0" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft Hospital</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
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
  { icon: Users,        color: "#1E4DA0", bg: "#0a1f3e", border: "#1E4DA030", title: "Patient Management",
    desc: "Complete patient lifecycle — registration, history, allergies, and records accessible in seconds.",
    pts: ["One-click patient registration", "Full medical history & allergy records", "Linked family / GP records", "Patient portal for online booking"] },
  { icon: Calendar,     color: "#4FC6FF", bg: "#052e1c", border: "#4FC6FF30", title: "Appointment Scheduling",
    desc: "Online and walk-in appointment booking with doctor calendars, reminders, and no-show tracking.",
    pts: ["Doctor availability calendars", "Online & reception booking", "Automated appointment reminders", "No-show & cancellation tracking"] },
  { icon: BedDouble,    color: "#1E4DA0", bg: "#1a0b38", border: "#1E4DA030", title: "Inpatient (IPD) Management",
    desc: "Bed allocation, ward rounds, transfer tracking, and discharge summaries — all linked to billing.",
    pts: ["Real-time bed occupancy map", "Ward transfer & escalation alerts", "Nursing notes per shift", "Discharge summary auto-generated"] },
  { icon: Pill,         color: "#4FC6FF", bg: "#2d1f00", border: "#4FC6FF30", title: "Pharmacy & Dispensing",
    desc: "Prescriptions auto-sent from doctor to pharmacy, with stock control and low-drug alerts.",
    pts: ["Digital prescription workflow", "Drug stock with reorder alerts", "Dispensing records & audit trail", "Controlled drug compliance log"] },
  { icon: FlaskConical, color: "#1E4DA0", bg: "#2e0a0a", border: "#1E4DA030", title: "Laboratory (LIS)",
    desc: "Lab test requests from doctors, result entry by technicians, and instant delivery to patient records.",
    pts: ["Doctor-raised test requests", "Sample tracking & barcode labels", "Result entry with reference ranges", "Results auto-linked to patient file"] },
  { icon: Receipt,      color: "#4FC6FF", bg: "#011e26", border: "#4FC6FF30", title: "Billing & Insurance",
    desc: "Auto-generated invoices from OPD, IPD, lab, and pharmacy — with direct insurance claim submission.",
    pts: ["Auto-billing from all departments", "Insurance pre-auth & claim filing", "Co-pay & self-pay management", "Outstanding & aged debt reports"] },
  { icon: UserCog,      color: "#4FC6FF", bg: "#2d0a1a", border: "#4FC6FF30", title: "Staff & Doctor Management",
    desc: "Doctor schedules, nurse shift rosters, HR records, and payroll — all in one place.",
    pts: ["Doctor & nurse scheduling", "Shift roster with leave management", "Staff HR profiles & contracts", "Integrated payroll processing"] },
  { icon: BarChart3,    color: "#4FC6FF", bg: "#021f1c", border: "#4FC6FF30", title: "Reports & Analytics",
    desc: "Live dashboards for OPD load, bed occupancy, revenue, and clinical KPIs — always up to date.",
    pts: ["Real-time OPD & IPD dashboards", "Revenue & collections analytics", "Clinical quality indicators", "Exportable management reports"] },
];

const flow = [
  { step: "01", icon: Users,        color: "#1E4DA0", title: "Patient Arrives & Registers",     detail: "Patient registered once — all subsequent visits pre-fill automatically from their record" },
  { step: "02", icon: Stethoscope,  color: "#4FC6FF", title: "Doctor Consults & Prescribes",    detail: "Prescription is digitally sent to pharmacy the moment the doctor saves — zero paper" },
  { step: "03", icon: FlaskConical, color: "#1E4DA0", title: "Lab Tests Ordered Instantly",     detail: "Lab receives test requests electronically — results post to the patient record when ready" },
  { step: "04", icon: BedDouble,    color: "#1E4DA0", title: "Bed Assigned — Ward Notified",    detail: "Ward occupancy map updates in real time — nursing team alerted before patient arrives" },
  { step: "05", icon: Receipt,      color: "#4FC6FF", title: "Invoice Auto-Generated",          detail: "All OPD, pharmacy, lab, and ward charges compile into one final bill automatically" },
  { step: "06", icon: CheckCheck,   color: "#4FC6FF", title: "Insurance Claim Submitted",       detail: "Claim sent directly to insurer the moment the bill is finalised — no manual paperwork" },
];

const testimonials = [
  { quote: "Before OneSoft, our OPD queue was managed on paper and billing took 2 days after discharge. Now the bill is ready the moment we click Discharge and the insurance claim goes out automatically. We've cut billing errors by 90%.",
    name: "Dr. Khalid Hassan", role: "Medical Director", co: "Crescent Health Hospital, Dubai, UAE", color: "#1E4DA0" },
  { quote: "Our pharmacy used to run out of drugs without warning. Now the system flags low stock before it's a problem and raises a purchase order automatically. We haven't had a stock-out in over 8 months.",
    name: "Ms. Rebecca Osei", role: "Pharmacy Manager", co: "North City Medical Centre, Lahore, Pakistan", color: "#4FC6FF" },
  { quote: "The lab integration alone changed our workflow entirely. Doctors used to phone the lab for results. Now results appear in the patient record the moment they're entered and the doctor is notified — no calls, no delays.",
    name: "Dr. Priya Sharma", role: "Head of Pathology", co: "Midland General Hospital, Singapore", color: "#1E4DA0" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function HospitalPage() {
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
      <div className="relative pt-32 pb-6 md:pt-40 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 right-0 h-[600px]" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30,77,160,0.15), transparent)" }} />
          <motion.div className="absolute top-20 left-[8%] w-72 h-72 rounded-full" style={{ background: "rgba(30,77,160,0.10)", filter: "blur(90px)" }}
            animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-10 right-[6%] w-96 h-96 rounded-full" style={{ background: "rgba(30,77,160,0.07)", filter: "blur(110px)" }}
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
            <span style={{ color: "#1E4DA0", fontWeight: 600 }}>Hospital Management</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
                <Stethoscope className="w-3.5 h-3.5" />Hospital Management ERP
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Your Hospital,{" "}
              <span style={{ color: "#1E4DA0" }}>Fully Connected.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              OPD, IPD, pharmacy, lab, billing, and insurance — all interconnected in one platform. No paper forms. No missed charges. No chasing insurance claims manually.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: "#1E4DA0", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Hospital Management ERP")}>
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button className="h-14 px-10 text-lg rounded-lg font-medium transition-all duration-200"
                style={{ background: secBtnBg, border: `1px solid ${secBtnBorder}`, color: secBtnColor }}
                onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
                Explore All Modules
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 200,  suf: "+",  label: "Hospitals on Platform",    Icon: Building2,  color: "#1E4DA0" },
              { to: 500,  suf: "K+", label: "Patients Managed",         Icon: Users,      color: "#4FC6FF" },
              { to: 99,   suf: ".5%",label: "Billing Accuracy",         Icon: ShieldCheck,color: "#1E4DA0", d: 0 },
              { to: 60,   suf: "%",  label: "Faster Discharge Process", Icon: TrendingUp, color: "#4FC6FF" },
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
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(30,77,160,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
              <Sparkles className="w-3.5 h-3.5" />Every Department Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Patient arrives once.<br />Everything flows automatically.</h2>
            <p style={{ color: t55 }} className="text-lg">
              From registration to discharge, every step triggers the next — no phone calls between departments, no re-entering data, no missed charges.
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
      <div id="modules" className="py-16" style={{ background: isLight ? "#ffffff" : sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
              <HeartPulse className="w-3.5 h-3.5" />8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Every department.<br />One connected system.</h2>
            <p style={{ color: t50 }} className="text-lg">
              Built for hospitals that need clinical accuracy, operational speed, and zero revenue leakage.
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

      {/* ═══ BILLING & INSURANCE DEEP-DIVE ══════════════════════ */}
      <div className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(30,77,160,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
                <Receipt className="w-3.5 h-3.5" />Zero Revenue Leakage
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Every service billed.<br />Every claim filed.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                The moment a patient is discharged, every OPD visit, lab test, drug dispensed, ward night, and procedure is automatically compiled into a final invoice. Insurance claims go out the same day — no manual paperwork, no missed revenue.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Zap,          color: "#1E4DA0", bg: "#0a1f3e", border: "#1E4DA030",
                    title: "All department charges auto-compiled on discharge",
                    sub: "OPD, pharmacy, lab, theatre, and ward charges merge into one invoice automatically" },
                  { icon: ShieldCheck,  color: "#4FC6FF", bg: "#052e1c", border: "#4FC6FF30",
                    title: "Insurance pre-authorisation tracked in real time",
                    sub: "Pre-auth requests, approvals, and limits tracked per patient — no manual follow-up needed" },
                  { icon: Receipt,      color: "#4FC6FF", bg: "#2d1f00", border: "#4FC6FF30",
                    title: "Claims submitted to insurers electronically",
                    sub: "Claim forms auto-populated from the patient's invoice and sent direct to the insurer" },
                  { icon: AlertCircle,  color: "#1E4DA0", bg: "#1a0b38", border: "#1E4DA030",
                    title: "Rejected claims flagged with resubmission prompts",
                    sub: "System identifies rejected claims and guides billing staff through the correction and resubmit process" },
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
                style={{ background: "#1E4DA0", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Hospital Management ERP")}>
                See Billing Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* billing summary card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(30,77,160,0.15)" }}>
                      <Receipt className="w-4 h-4" style={{ color: "#1E4DA0" }} />
                    </div>
                    <span className="font-bold text-sm">Discharge Bill — Mr. Ahmed Khan</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(79,198,255,0.12)", color: "#4FC6FF" }}>Auto-Generated</span>
                </div>

                <div className="grid grid-cols-3 gap-px" style={{ background: gridLine }}>
                  {[
                    { label: "Ward (3 nights)", value: "£1,800", color: "#1E4DA0" },
                    { label: "OPD & Procedures", value: "£960",  color: "#4FC6FF" },
                    { label: "Pharmacy & Lab",   value: "£420",  color: "#4FC6FF" },
                  ].map(s => (
                    <div key={s.label} className="px-4 py-3" style={{ background: tableBg }}>
                      <p className="text-[10px] mb-1" style={{ color: t45 }}>{s.label}</p>
                      <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 space-y-3">
                  {[
                    { label: "Subtotal",         value: "£3,180", bold: false },
                    { label: "VAT (0% — medical)",value: "£0.00",  bold: false },
                    { label: "Total Invoice",     value: "£3,180", bold: true  },
                    { label: "BUPA Pre-Auth",     value: "£2,700", bold: false },
                    { label: "Patient Co-Pay",    value: "£480",   bold: true  },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between items-center" style={{ borderBottom: i < 4 ? `1px solid ${dividerColor}` : "none", paddingBottom: i < 4 ? "12px" : "0" }}>
                      <span className="text-sm" style={{ color: t55, fontWeight: r.bold ? 700 : 400 }}>{r.label}</span>
                      <span className="text-sm font-bold" style={{ color: r.bold ? "#0f172a" : t65 }}>{r.value}</span>
                    </div>
                  ))}

                  <div className="mt-4 rounded-xl p-3 flex items-center justify-between"
                    style={{ background: "rgba(30,77,160,0.08)", border: "1px solid rgba(30,77,160,0.20)" }}>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: t65 }}>Insurance Claim Status</p>
                      <p className="text-base font-black" style={{ color: "#1E4DA0" }}>Submitted to BUPA</p>
                      <p className="text-[10px]" style={{ color: t45 }}>Sent automatically at discharge · Ref: BUPA-2026-08841</p>
                    </div>
                    <CheckCheck className="w-6 h-6 shrink-0" style={{ color: "#4FC6FF" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════ */}
      <div className="py-16" style={{ background: sectionBg }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
              <Star className="w-3.5 h-3.5 fill-current" />What Hospitals Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Trusted by hospitals worldwide.</h2>
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
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(30,77,160,0.10), transparent)" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(30,77,160,0.10)", border: "1px solid rgba(30,77,160,0.30)", color: "#1E4DA0" }}>
              <Lock className="w-3.5 h-3.5" />No card required · Free 30-day trial
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Better care starts with<br />
              <span style={{ color: "#1E4DA0" }}>better systems.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 200+ hospitals running their entire operation on OneSoft. Go live in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: "#1E4DA0", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("Hospital Management ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Used in hospitals worldwide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("Hospital Management ERP")} />
      <FeatureMarqueeSection
        accentColor="#1E4DA0"
        heading="Everything a Hospital Needs"
        subheading="From OPD queues to insurance claims — every module built for modern hospitals and clinics."
        row1={[
          { icon: "🏥", label: "OPD Management",        color: "#1E4DA0" },
          { icon: "🛏️", label: "IPD Management",       color: "#1E4DA0" },
          { icon: "🚑", label: "Emergency Care",        color: "#1E4DA0" },
          { icon: "📋", label: "Patient Registration",  color: "#4FC6FF" },
          { icon: "🏨", label: "Ward Management",       color: "#4FC6FF" },
          { icon: "🛌", label: "Bed Allocation",        color: "#4FC6FF" },
          { icon: "👨‍⚕️", label: "Doctor Scheduling",  color: "#4FC6FF" },
          { icon: "📅", label: "Appointment Booking",   color: "#4FC6FF" },
          { icon: "💊", label: "Pharmacy",              color: "#1E4DA0" },
          { icon: "🔬", label: "Laboratory",            color: "#1E4DA0" },
          { icon: "📡", label: "Radiology",             color: "#1E4DA0" },
          { icon: "🩸", label: "Blood Bank",            color: "#4FC6FF" },
        ]}
        row2={[
          { icon: "💰", label: "Billing & Insurance",   color: "#4FC6FF" },
          { icon: "📄", label: "Discharge Summary",     color: "#1E4DA0" },
          { icon: "🗂️", label: "Medical Records",      color: "#1E4DA0" },
          { icon: "📹", label: "Telemedicine",          color: "#4FC6FF" },
          { icon: "🏭", label: "Operation Theatre",     color: "#4FC6FF" },
          { icon: "❤️", label: "ICU Management",        color: "#4FC6FF" },
          { icon: "📝", label: "Nursing Notes",         color: "#4FC6FF" },
          { icon: "👩‍💼", label: "Staff Payroll",       color: "#1E4DA0" },
          { icon: "📦", label: "Inventory Control",     color: "#1E4DA0" },
          { icon: "🚐", label: "Ambulance Tracking",    color: "#1E4DA0" },
          { icon: "🧾", label: "Accounts & Finance",    color: "#1E4DA0" },
          { icon: "🩺", label: "Mortuary Management",   color: "#4FC6FF" },
        ]}
        row3={[
          { icon: "📱", label: "Mobile App",            color: "#4FC6FF" },
          { icon: "🔔", label: "SMS Alerts",            color: "#1E4DA0" },
          { icon: "📊", label: "Clinical Analytics",    color: "#1E4DA0" },
          { icon: "🔑", label: "Role-Based Access",     color: "#4FC6FF" },
          { icon: "🌐", label: "Multi-Branch",          color: "#4FC6FF" },
          { icon: "☁️", label: "Cloud Hosted",          color: "#4FC6FF" },
          { icon: "🔒", label: "Data Security",         color: "#4FC6FF" },
          { icon: "📑", label: "Compliance Reports",    color: "#1E4DA0" },
          { icon: "💬", label: "Patient Communication", color: "#1E4DA0" },
          { icon: "🩻", label: "DICOM / PACS Ready",    color: "#1E4DA0" },
          { icon: "🔄", label: "HL7 / FHIR Support",   color: "#1E4DA0" },
          { icon: "🎯", label: "KPI Dashboard",         color: "#4FC6FF" },
        ]}
      />
      <CustomSolutionsSection accentColor="#1E4DA0" productName="Hospital ERP" />
      <ERPCrossLinks current="/hospital" />
      <Footer />
    </div>
  );
}
