import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ERPCrossLinks } from "@/components/ERPCrossLinks";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight, CheckCircle2, GraduationCap, Users, BookOpen,
  Calendar, BarChart3, Bell, Bus, Library, ClipboardList,
  ChevronRight, Star, TrendingUp, UserCheck, Wallet,
  FileText, Zap, Shield, Globe, Lock, Sparkles, Building2,
  BookMarked, Clock, Award, MessageSquare,
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

const TABS = ["Overview", "Fees", "Timetable", "Results"];

function DashboardOverview() {
  const kpis = [
    { label: "Total Students", value: "1,284", delta: "+38 this term", up: true, color: "#1a69c4", Icon: Users },
    { label: "Attendance Today", value: "96.4%", delta: "+1.2% vs yesterday", up: true, color: "#10b981", Icon: UserCheck },
    { label: "Fees Collected", value: "£84.2K", delta: "£12.4K outstanding", up: false, color: "#f59e0b", Icon: Wallet },
    { label: "Exams This Week", value: "6", delta: "3 results pending", up: true, color: "#8b5cf6", Icon: ClipboardList },
  ];
  const notices = [
    { type: "Fee", msg: "Term 2 fee due — 142 students", color: "#f59e0b", time: "Today" },
    { type: "Exam", msg: "Maths Yr 10 results uploaded", color: "#1a69c4", time: "2h ago" },
    { type: "Absent", msg: "18 students marked absent", color: "#ef4444", time: "9:15 AM" },
    { type: "New", msg: "3 new admissions approved", color: "#10b981", time: "Yesterday" },
  ];
  const classes = [
    { name: "Year 7A", students: 28, teacher: "Mrs. Ahmed", present: 27 },
    { name: "Year 8B", students: 30, teacher: "Mr. Clarke", present: 29 },
    { name: "Year 9A", students: 26, teacher: "Ms. Patel",  present: 25 },
    { name: "Year 10C",students: 32, teacher: "Mr. Wilson", present: 31 },
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
            <p className={`text-[7.5px] font-semibold mt-0.5 ${k.up ? "text-emerald-400" : "text-amber-400"}`}>{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
          <p className="text-[8.5px] font-semibold text-white/50 mb-2">Class Attendance — Today</p>
          <table className="w-full text-[7.5px]">
            <thead><tr>{["Class","Students","Teacher","Present","Rate"].map(h => (
              <th key={h} className="text-white/25 font-medium pb-1.5 text-left pr-2">{h}</th>
            ))}</tr></thead>
            <tbody>
              {classes.map((c, i) => (
                <tr key={i} className="border-t border-white/[0.04]">
                  <td className="py-1 text-white/85 pr-2 font-semibold">{c.name}</td>
                  <td className="py-1 text-white/40 pr-2">{c.students}</td>
                  <td className="py-1 text-white/60 pr-2">{c.teacher}</td>
                  <td className="py-1 text-emerald-400 pr-2">{c.present}</td>
                  <td className="py-1 pr-2">
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-1 bg-white/10 rounded-full">
                        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${(c.present/c.students)*100}%` }} />
                      </div>
                      <span className="text-emerald-400 text-[7px]">{Math.round((c.present/c.students)*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 shrink-0 flex flex-col" style={{ minWidth: "160px" }}>
          <p className="text-[8.5px] font-semibold text-white/50 mb-2">Recent Activity</p>
          <div className="space-y-2 flex-1">
            {notices.map((n, i) => (
              <div key={i} className="flex items-start gap-2 border-b border-white/[0.04] pb-1.5">
                <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: n.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] font-semibold text-white/80 truncate">{n.msg}</p>
                  <p className="text-[6.5px] text-white/30">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeeSlide() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const collected = [62, 70, 58, 80, 75, 90, 85, 88, 82, 95, 90, 98];
  const outstanding = [18, 12, 22, 10, 15, 8, 12, 9, 14, 7, 10, 6];
  const feeBreakdown = [
    { name: "Tuition Fees",   amount: "£54,200", pct: 90, color: "#1a69c4" },
    { name: "Transport",      amount: "£12,800", pct: 65, color: "#10b981" },
    { name: "Library & Lab",  amount: "£6,400",  pct: 45, color: "#8b5cf6" },
    { name: "Sports & Trips", amount: "£4,200",  pct: 30, color: "#f59e0b" },
  ];
  const pending = [
    { student: "Amir Hassan",    class: "Yr 9B",  amount: "£1,200", due: "3 days", overdue: false },
    { student: "Emma Clarke",    class: "Yr 7A",  amount: "£850",   due: "Overdue",overdue: true  },
    { student: "Raj Patel",      class: "Yr 11A", amount: "£1,450", due: "7 days", overdue: false },
    { student: "Sophie Williams",class: "Yr 8C",  amount: "£600",   due: "Overdue",overdue: true  },
  ];
  return (
    <div className="flex gap-2 flex-1 min-h-0">
      <div className="flex flex-col gap-2 shrink-0" style={{ width: "200px" }}>
        <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[8px] font-semibold text-white/50">Fee Collection</p>
            <span className="text-[8px] font-black" style={{ color: "#1a69c4" }}>£84,200</span>
          </div>
          {feeBreakdown.map((r, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-[7px] text-white/60">{r.name}</span>
                <span className="text-[7px] font-semibold text-white/80">{r.amount}</span>
              </div>
              <div className="h-1 bg-white/8 rounded-full"><div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} /></div>
            </div>
          ))}
          <div className="mt-2 rounded-lg px-2 py-1.5 border" style={{ background: "rgba(26,105,196,0.15)", borderColor: "rgba(26,105,196,0.3)" }}>
            <p className="text-[7px] text-white/60 font-semibold">Outstanding</p>
            <p className="text-[14px] font-black text-white">£12,400</p>
          </div>
        </div>
      </div>
      <div className="bg-white/[0.03] rounded-xl p-2.5 border border-white/8 flex-1 min-w-0">
        <p className="text-[8.5px] font-semibold text-white/50 mb-2">Monthly Collection vs Outstanding</p>
        <div className="grid grid-cols-12 gap-0.5 items-end h-16 mb-1">
          {months.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="w-full flex flex-col-reverse gap-px">
                <div className="w-full rounded-sm" style={{ height: `${(collected[i]/98)*36}px`, background: "#1a69c4" }} />
                <div className="w-full rounded-sm" style={{ height: `${(outstanding[i]/22)*12}px`, background: "#f59e0b88" }} />
              </div>
              <span className="text-[5px] text-white/20">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mb-3">
          {[["Collected","#1a69c4"],["Outstanding","#f59e0b"]].map(([l,c])=>(
            <div key={l} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{background:c}}/><span className="text-[7px] text-white/35">{l}</span></div>
          ))}
        </div>
        <p className="text-[8px] font-semibold text-white/40 mb-1.5">Pending Payments</p>
        <table className="w-full text-[7.5px]">
          <thead><tr>{["Student","Class","Amount","Due"].map(h=>(
            <th key={h} className="text-white/25 font-medium pb-1 text-left pr-3">{h}</th>
          ))}</tr></thead>
          <tbody>
            {pending.map((r,i)=>(
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="py-1 text-white/80 pr-3">{r.student}</td>
                <td className="py-1 text-white/40 pr-3">{r.class}</td>
                <td className="py-1 text-white/70 font-semibold pr-3">{r.amount}</td>
                <td className="py-1"><span className={`text-[6.5px] font-bold px-1.5 py-0.5 rounded-full ${r.overdue?"text-red-400 bg-red-400/10":"text-amber-400 bg-amber-400/10"}`}>{r.due}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TimetableSlide() {
  const days = ["Mon","Tue","Wed","Thu","Fri"];
  const periods = ["8:30","9:30","10:30","11:30","12:30","1:30","2:30"];
  const subjects: Record<string,{label:string;color:string}> = {
    maths:   { label: "Maths",    color: "#1a69c4" },
    eng:     { label: "English",  color: "#10b981" },
    sci:     { label: "Science",  color: "#8b5cf6" },
    hist:    { label: "History",  color: "#f59e0b" },
    geo:     { label: "Geography",color: "#ef4444" },
    pe:      { label: "PE",       color: "#06b6d4" },
    art:     { label: "Art",      color: "#ec4899" },
    break:   { label: "Break",    color: "" },
    lunch:   { label: "Lunch",    color: "" },
  };
  const grid: Record<string, string[]> = {
    Mon: ["maths","eng","sci","break","hist","lunch","pe"],
    Tue: ["eng","maths","hist","break","sci","lunch","art"],
    Wed: ["sci","hist","maths","break","eng","lunch","geo"],
    Thu: ["hist","sci","art","break","maths","lunch","eng"],
    Fri: ["pe","eng","geo","break","art","lunch","maths"],
  };
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[8.5px] font-semibold text-white/50">Year 9A — Weekly Timetable</p>
        <span className="text-[7px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(26,105,196,0.2)", color: "#1a69c4" }}>Current Week</span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-full text-[7px] border-collapse">
          <thead>
            <tr>
              <th className="text-white/25 font-medium pb-1.5 text-left pr-2 w-10">Period</th>
              {days.map(d=><th key={d} className="text-white/25 font-medium pb-1.5 text-left pr-1">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {periods.map((p,pi)=>(
              <tr key={pi}>
                <td className="py-0.5 pr-2 text-white/30 whitespace-nowrap">{p}</td>
                {days.map(d=>{
                  const key = grid[d][pi];
                  const sub = subjects[key];
                  if (key==="break"||key==="lunch") return <td key={d} className="py-0.5 pr-1"><span className="text-white/20 text-[6px]">{sub.label}</span></td>;
                  return (
                    <td key={d} className="py-0.5 pr-1">
                      <div className="px-1.5 py-0.5 rounded text-[6.5px] font-semibold whitespace-nowrap" style={{ background: `${sub.color}25`, color: sub.color }}>
                        {sub.label}
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
        {Object.entries(subjects).filter(([k])=>k!=="break"&&k!=="lunch").map(([k,s])=>(
          <div key={k} className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{background:s.color}}/><span className="text-[6.5px] text-white/35">{s.label}</span></div>
        ))}
      </div>
    </div>
  );
}

function ResultsSlide() {
  const students = [
    { name: "Aisha Rahman",   maths: 94, eng: 88, sci: 91, hist: 85, avg: 89.5, grade: "A*" },
    { name: "Tom Ashworth",   maths: 78, eng: 82, sci: 75, hist: 88, avg: 80.8, grade: "B+" },
    { name: "Priya Sharma",   maths: 96, eng: 90, sci: 97, hist: 82, avg: 91.3, grade: "A*" },
    { name: "James O'Brien",  maths: 65, eng: 72, sci: 68, hist: 70, avg: 68.8, grade: "C+" },
    { name: "Emma Clarke",    maths: 88, eng: 94, sci: 80, hist: 92, avg: 88.5, grade: "A"  },
    { name: "Ravi Menon",     maths: 71, eng: 68, sci: 74, hist: 65, avg: 69.5, grade: "C+" },
  ];
  const gradeColor = (g: string) => g.startsWith("A") ? "#10b981" : g.startsWith("B") ? "#1a69c4" : "#f59e0b";
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[8.5px] font-semibold text-white/50">Year 9A — Term 2 Results</p>
        <div className="flex gap-2">
          <span className="text-[7px] text-emerald-400 font-semibold">Class Avg: 81.4%</span>
          <span className="text-[7px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(26,105,196,0.2)", color: "#1a69c4" }}>Published</span>
        </div>
      </div>
      <table className="w-full text-[7.5px] flex-1">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {["Student","Maths","English","Science","History","Average","Grade"].map(h=>(
              <th key={h} className="pb-2 text-left pr-3 font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s,i)=>(
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <td className="py-2 pr-3 font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{s.name}</td>
              {[s.maths,s.eng,s.sci,s.hist].map((m,j)=>(
                <td key={j} className="py-2 pr-3" style={{ color: m>=90?"#10b981":m>=75?"rgba(255,255,255,0.7)":"#f59e0b" }}>{m}%</td>
              ))}
              <td className="py-2 pr-3 font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{s.avg}%</td>
              <td className="py-2">
                <span className="text-[6.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: gradeColor(s.grade), background: `${gradeColor(s.grade)}18` }}>{s.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SchoolDashboard() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label: "Dashboard",  Component: DashboardOverview },
    { label: "Fee Report", Component: FeeSlide },
    { label: "Timetable",  Component: TimetableSlide },
    { label: "Results",    Component: ResultsSlide },
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
            <GraduationCap className="w-3.5 h-3.5" style={{ color: "#1a69c4" }} />
          </div>
          <span className="font-bold text-white text-[11px]">OneSoft School</span>
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
  { icon: Users,        color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430", title: "Student Management",
    desc: "Complete student lifecycle from application to graduation — profiles, documents, and history in one place.",
    pts: ["Online admissions & enrolment", "Student profiles with document vault", "Class & section assignment", "Alumni & leavers tracking"] },
  { icon: Wallet,       color: "#10b981", bg: "#052e1c", border: "#10b98130", title: "Fee Management",
    desc: "Automated fee schedules, instant receipts, outstanding trackers, and parent payment portals.",
    pts: ["Flexible fee structures per class", "Automated due date reminders", "Online & cash payment recording", "Aged debtors & collection reports"] },
  { icon: UserCheck,    color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630", title: "Attendance Tracking",
    desc: "Mark attendance in seconds, auto-notify parents of absences, and generate compliance reports.",
    pts: ["One-click class-wise attendance", "Automated parent SMS/email alerts", "Monthly attendance registers", "Biometric & RFID integration ready"] },
  { icon: Calendar,     color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30", title: "Timetable & Scheduling",
    desc: "Drag-and-drop timetable builder that auto-checks conflicts across teachers, rooms, and subjects.",
    pts: ["Conflict-free schedule builder", "Substitute teacher assignment", "Room & lab allocation", "Exportable weekly timetables"] },
  { icon: ClipboardList,color: "#ef4444", bg: "#2e0a0a", border: "#ef444430", title: "Exams & Results",
    desc: "Schedule exams, enter marks, auto-calculate grades, and publish result cards to parents instantly.",
    pts: ["Configurable grading schemes", "Auto-calculated averages & ranks", "Result cards generated instantly", "Parent portal result access"] },
  { icon: Library,      color: "#06b6d4", bg: "#011e26", border: "#06b6d430", title: "Library Management",
    desc: "Catalogue books, manage checkouts, track overdue returns, and enforce borrowing limits automatically.",
    pts: ["Book catalogue with ISBN scan", "Student checkout & return tracking", "Overdue notices auto-sent", "Stock audit & procurement reports"] },
  { icon: Bus,          color: "#ec4899", bg: "#2d0a1a", border: "#ec489930", title: "Transport Management",
    desc: "Define routes and stops, assign students to buses, and give parents live departure tracking.",
    pts: ["Route & stop management", "Student bus assignment", "Driver & vehicle records", "Parent transport notifications"] },
  { icon: Bell,         color: "#14b8a6", bg: "#021f1c", border: "#14b8a630", title: "Communication Hub",
    desc: "Send notices, circulars, and announcements to parents and staff via SMS, email, or in-app push.",
    pts: ["Bulk SMS & email to parents", "Notice board & circular archive", "Parent-teacher message threads", "Event & holiday calendar"] },
];

const flow = [
  { step: "01", icon: Users,        color: "#1a69c4", title: "Student Enrolled",            detail: "Admission form submitted online — profile, class & fee schedule created automatically" },
  { step: "02", icon: UserCheck,    color: "#10b981", title: "Attendance Marked",            detail: "Teacher marks attendance in one click — absent students' parents notified instantly" },
  { step: "03", icon: Wallet,       color: "#f59e0b", title: "Fee Due — Reminder Sent",     detail: "System detects upcoming due dates and sends automated payment reminders to parents" },
  { step: "04", icon: ClipboardList,color: "#8b5cf6", title: "Exams Completed",             detail: "Marks entered once — averages, ranks, and grade cards generated automatically" },
  { step: "05", icon: FileText,     color: "#ef4444", title: "Result Cards Published",       detail: "Parents receive result cards on their portal the moment the teacher clicks 'Publish'" },
  { step: "06", icon: BarChart3,    color: "#06b6d4", title: "Admin Gets Full Picture",      detail: "Live dashboards show fees, attendance, results, and staff — no manual reports needed" },
];

const testimonials = [
  { quote: "We used to spend the entire first week of term just sorting fee ledgers and attendance registers. With OneSoft, the data is already there on day one. Parents get fee reminders automatically and I haven't chased a single payment manually this term.",
    name: "Mrs. Anita Sharma", role: "Principal", co: "Bright Futures Academy, Leicester", color: "#1a69c4" },
  { quote: "The timetable builder alone saved us two full days of admin. It checks conflicts automatically — no more double-booking teachers or rooms. And when we need a substitute, we assign them in seconds.",
    name: "Mr. David Clarke", role: "Head of Administration", co: "St. Margaret's School, Birmingham", color: "#10b981" },
  { quote: "Parents love the portal. They can see attendance, results, and fee balance from their phone. We've had zero calls asking 'did my child come in today?' since going live. That alone is worth every penny.",
    name: "Ms. Fatima Al-Rashid", role: "IT & Operations Lead", co: "Crescent Park School, Bradford", color: "#8b5cf6" },
];

/* ─────────────────── Page ───────────────────────────────── */

export default function SchoolPage() {
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"                  : "#070e1c";
  const sectionBg    = isLight ? "#f1f5f9"                  : "#04091a";
  const tableBg      = isLight ? "#ffffff"                  : "#07111f";
  const connectorBg  = isLight ? "#f1f5f9"                  : "#070e1c";
  const dividerColor = isLight ? "rgba(0,0,0,0.08)"         : "rgba(255,255,255,0.08)";
  const gridLine     = isLight ? "rgba(0,0,0,0.04)"         : "rgba(255,255,255,0.06)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"       : "rgba(255,255,255,0.45)";
  const t50          = isLight ? "rgba(15,23,42,0.55)"      : "rgba(255,255,255,0.5)";
  const t55          = isLight ? "rgba(15,23,42,0.6)"       : "rgba(255,255,255,0.55)";
  const t60          = isLight ? "rgba(15,23,42,0.65)"      : "rgba(255,255,255,0.6)";
  const t65          = isLight ? "rgba(15,23,42,0.7)"       : "rgba(255,255,255,0.65)";
  const t85          = isLight ? "rgba(15,23,42,0.9)"       : "rgba(255,255,255,0.85)";
  const pageColor    = isLight ? "#0f172a"                  : "#fff";
  const secBtnBg     = isLight ? "rgba(0,0,0,0.05)"         : "rgba(255,255,255,0.06)";
  const secBtnBorder = isLight ? "rgba(0,0,0,0.15)"         : "rgba(255,255,255,0.12)";
  const secBtnColor  = isLight ? "rgba(15,23,42,0.85)"      : "rgba(255,255,255,0.85)";

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
            <span style={{ color: "#1a69c4", fontWeight: 600 }}>School Management</span>
          </motion.div>

          {/* headline */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <GraduationCap className="w-3.5 h-3.5" />School Management ERP
              </span>
            </motion.div>

            <motion.h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              Your School,{" "}
              <span style={{ color: "#1a69c4" }}>Fully Managed.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: t60 }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Admissions, attendance, fees, timetables, exams, library, transport, and parent communication — all in one connected platform. No spreadsheets. No missed payments. No manual reports.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Button size="lg" className="h-14 px-10 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("School Management ERP")}>
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
            <div className="h-[400px]"><SchoolDashboard /></div>
          </motion.div>
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════ */}
      <div style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", borderTop: `1px solid ${dividerColor}`, borderBottom: `1px solid ${dividerColor}` }}
        className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 500,  suf: "+",  label: "Schools on Platform",      Icon: Building2,  color: "#1a69c4" },
              { to: 200,  suf: "K+", label: "Students Managed",         Icon: Users,      color: "#10b981" },
              { to: 98,   suf: "%",  label: "Average Fee Collection",   Icon: Wallet,     color: "#8b5cf6" },
              { to: 3,    suf: "hrs",label: "Admin Saved Per Day",      Icon: Clock,      color: "#f59e0b" },
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
              <Sparkles className="w-3.5 h-3.5" />Everything Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Enrol once. Everything follows.</h2>
            <p style={{ color: t55 }} className="text-lg">
              Add a student and the system creates their fee schedule, class record, attendance log, and parent account — automatically. No double entry, ever.
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
              <BookOpen className="w-3.5 h-3.5" />8 Core Modules
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Everything your school needs,<br />in one system.</h2>
            <p style={{ color: t50 }} className="text-lg">
              Built for schools that want to spend less time on admin and more time on education.
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

      {/* ═══ PARENT PORTAL DEEP-DIVE ═════════════════════════════ */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(26,105,196,0.07), transparent)" }} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(26,105,196,0.10)", border: "1px solid rgba(26,105,196,0.30)", color: "#1a69c4" }}>
                <MessageSquare className="w-3.5 h-3.5" />Parent Portal & Communication
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Parents always<br />in the picture.</h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: t55 }}>
                Every parent gets a personal portal where they can check their child's attendance, view results, pay fees online, and receive instant school notices — all from their phone. No more printed letters. No more missed payments.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: UserCheck,    color: "#1a69c4", bg: "#0a1f3e", border: "#1a69c430",
                    title: "Absence alert sent within 60 seconds",
                    sub: "If a student is marked absent, parents receive an automated SMS and app notification instantly" },
                  { icon: Wallet,       color: "#10b981", bg: "#052e1c", border: "#10b98130",
                    title: "Fee reminders auto-sent 7 days before due date",
                    sub: "Parents receive payment reminders automatically — no staff intervention needed" },
                  { icon: Award,        color: "#f59e0b", bg: "#2d1f00", border: "#f59e0b30",
                    title: "Results visible to parents the moment they're published",
                    sub: "No waiting for report cards — parents see marks and grades on their portal instantly" },
                  { icon: Bell,         color: "#8b5cf6", bg: "#1a0b38", border: "#8b5cf630",
                    title: "Notices, events & circulars pushed to all parents",
                    sub: "Replace printed letters with instant digital notifications to every parent simultaneously" },
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
                onClick={() => openCTAModal("School Management ERP")}>
                See Parent Portal Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* portal preview card */}
            <motion.div className="flex-1 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: tableBg, border: `1px solid ${dividerColor}`, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(26,105,196,0.15)" }}>
                      <GraduationCap className="w-4 h-4" style={{ color: "#1a69c4" }} />
                    </div>
                    <span className="font-bold text-sm">Parent Portal — Aisha Rahman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs" style={{ color: t45 }}>Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-px" style={{ background: gridLine }}>
                  {[
                    { label: "Attendance", value: "97.2%", color: "#10b981" },
                    { label: "Class Rank",  value: "2nd",  color: "#1a69c4" },
                    { label: "Fee Balance", value: "£0",   color: "#f59e0b" },
                  ].map(s => (
                    <div key={s.label} className="px-4 py-3" style={{ background: tableBg }}>
                      <p className="text-xs mb-1" style={{ color: t45 }}>{s.label}</p>
                      <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs font-semibold mb-3" style={{ color: t45 }}>Recent Subjects — Term 2</p>
                  <div className="space-y-3">
                    {[
                      { subject: "Mathematics",  mark: 94, grade: "A*", color: "#1a69c4" },
                      { subject: "English",       mark: 88, grade: "A",  color: "#10b981" },
                      { subject: "Science",       mark: 91, grade: "A*", color: "#8b5cf6" },
                      { subject: "History",       mark: 85, grade: "A",  color: "#f59e0b" },
                      { subject: "Geography",     mark: 79, grade: "B+", color: "#ef4444" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs w-28 shrink-0" style={{ color: t65 }}>{r.subject}</span>
                        <div className="flex-1 h-2 rounded-full" style={{ background: dividerColor }}>
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${r.mark}%`, background: r.color }} />
                        </div>
                        <span className="text-xs font-bold w-8 shrink-0 text-right" style={{ color: r.color }}>{r.grade}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl p-3" style={{ background: "rgba(26,105,196,0.08)", border: "1px solid rgba(26,105,196,0.20)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold" style={{ color: t65 }}>Next Fee Due</p>
                        <p className="text-base font-black" style={{ color: "#1a69c4" }}>£1,200 — Term 3</p>
                        <p className="text-[10px]" style={{ color: t45 }}>Due: 1 September 2026</p>
                      </div>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "#1a69c4", color: "#ffffff" }}>
                        Pay Now
                      </button>
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
              <Star className="w-3.5 h-3.5 fill-current" />What Schools Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5">Trusted by schools across the UK.</h2>
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
              Less admin.<br />
              <span style={{ color: "#1a69c4" }}>More education.</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: t55 }}>
              Join 500+ schools that run their entire operation on OneSoft. Set up in a week, fully live in a term.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="h-14 px-12 text-lg font-semibold"
                style={{ background: "#1a69c4", border: "none", color: "#ffffff" }}
                onClick={() => openCTAModal("School Management ERP")}>
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2" style={{ color: t45 }}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">Used in schools across the UK</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CTAStrip onCTA={() => openCTAModal("School Management ERP")} />
      <ERPCrossLinks current="/school" />
      <Footer />
    </div>
  );
}
