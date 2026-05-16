import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { useTheme } from "@/context/ThemeContext";
import { useCTAModal } from "@/context/CTAModalContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, MapPin, Star, Zap, ChevronDown, ChevronUp } from "lucide-react";

const BLUE = "#1E4DA0";

/* ── All case studies ─────────────────────────────────────── */
const allCaseStudies = [
  {
    slug: "al-noor-hospital",
    tag: "Hospital ERP",
    tagColor: "#0891b2",
    category: "ERP",
    client: "Al-Noor Medical Centre",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    industry: "Healthcare",
    headline: "Billing errors down 97% in the first week after go-live",
    challenge: "Al-Noor Medical Centre was running three departments — OPD, pharmacy, and laboratory — on entirely separate paper-based records and manual billing processes. Dozens of billing errors occurred every day. Patient wait times were high because staff were constantly reconciling information across departments. A single patient visit required four separate pieces of paperwork to complete.",
    solution: "OneSoft implemented a full Hospital ERP covering patient registration, OPD management, appointment scheduling, in-patient/out-patient billing, pharmacy inventory, lab results, and financial reporting — all in a single, integrated system. Go-live was achieved in under one week with data migration and staff training included.",
    results: [
      { value: "97%", label: "Reduction in daily billing errors" },
      { value: "40%", label: "Shorter average OPD wait times" },
      { value: "1 wk", label: "Full go-live timeline" },
      { value: "3", label: "Departments unified" },
    ],
    quote: "Everything — OPD, pharmacy, lab, billing — is on one screen now. The errors disappeared almost overnight. I honestly don't know how we managed before.",
    author: "Dr. Adil Rehman",
    authorRole: "Chief Medical Officer",
  },
  {
    slug: "beacon-academy",
    tag: "School ERP",
    tagColor: "#7c3aed",
    category: "ERP",
    client: "Beacon Academy Group",
    location: "Lahore, Pakistan",
    flag: "🇵🇰",
    industry: "Education",
    headline: "Four school branches unified on one system — admin time down 60%",
    challenge: "Beacon Academy Group had grown to four campuses in three years. Each campus tracked fees, attendance, and exam results in separate Excel spreadsheets. The admin team spent 70% of their working week on manual data entry, reconciliation, and chasing unpaid fees. Teachers had no visibility of student progress across terms.",
    solution: "OneSoft deployed a multi-branch School ERP with centralised student profiles, automated fee collection with payment gateway integration, digital attendance, online exam results, timetable management, and a parent communication portal. All four branches went live simultaneously on a single system.",
    results: [
      { value: "60%", label: "Less time spent on admin" },
      { value: "4", label: "Branches on one system" },
      { value: "100%", label: "Fee collection automated" },
      { value: "3 days", label: "Full staff training" },
    ],
    quote: "The admin team went from overworked to actually having time to focus on students. That is the real result. The system paid for itself in the first term.",
    author: "Mrs. Fatima Akhtar",
    authorRole: "Principal & Director",
  },
  {
    slug: "northern-star-distribution",
    tag: "Distributor ERP",
    tagColor: "#ea580c",
    category: "ERP",
    client: "Northern Star Distribution",
    location: "Toronto, Canada",
    flag: "🇨🇦",
    industry: "Distribution & Logistics",
    headline: "Monthly stock reconciliation went from two days to ten minutes",
    challenge: "Northern Star distributes to over 200 retailers across two provinces. Monthly stock reconciliation required two members of staff working for two full days. Orders were tracked in spreadsheets, delivery routes were unoptimised, and invoice disputes with retailers were a recurring problem due to manual entry errors.",
    solution: "OneSoft built a Distributor ERP integrating purchase orders, warehouse stock management, multi-location inventory, automated invoicing, delivery tracking, and a retailer portal for order placement and invoice dispute resolution. Custom reporting gave management real-time visibility across the entire supply chain.",
    results: [
      { value: "10 min", label: "Monthly stock reconciliation" },
      { value: "200+", label: "Retailers on the portal" },
      { value: "99.1%", label: "Invoice accuracy rate" },
      { value: "Q1", label: "System paid for itself" },
    ],
    quote: "Before OneSoft, stock reconciliation alone took two people two days a month. Now it's a 10-minute report. The system paid for itself in the first quarter.",
    author: "Tom Ashworth",
    authorRole: "Operations Director",
  },
  {
    slug: "saffron-restaurant-group",
    tag: "Restaurant ERP",
    tagColor: "#b45309",
    category: "ERP",
    client: "Saffron Restaurant Group",
    location: "Birmingham, UK",
    flag: "🇬🇧",
    industry: "Food & Hospitality",
    headline: "Food wastage down 35%, table turns up 20% across three branches",
    challenge: "Saffron operated three restaurant branches with no shared system. Each branch managed its own inventory independently, leading to over-ordering, wastage, and inconsistent menu pricing. Table management was manual, peak-hour queuing was a problem, and end-of-day reconciliation took the manager over two hours each night.",
    solution: "OneSoft deployed a Restaurant ERP with a unified POS system across all three branches, shared recipe-level ingredient tracking, automated purchase orders based on par-level stock alerts, table and reservation management, kitchen display integration, and a consolidated multi-branch financial dashboard.",
    results: [
      { value: "35%", label: "Reduction in food wastage" },
      { value: "20%", label: "More table turns per service" },
      { value: "3", label: "Branches on one system" },
      { value: "2 hrs", label: "Saved on nightly reconciliation" },
    ],
    quote: "We stopped guessing how much to order and started knowing. Wastage fell almost immediately. And the table management alone has meaningfully grown our weekly covers.",
    author: "Karim Siddiqui",
    authorRole: "Owner & Head Chef",
  },
  {
    slug: "maple-leaf-ecommerce",
    tag: "E-commerce ERP",
    tagColor: "#16a34a",
    category: "ERP",
    client: "Maple Leaf Homewares",
    location: "Manchester, UK",
    flag: "🇬🇧",
    industry: "Retail & E-commerce",
    headline: "Order processing 3× faster — returns reduced by 25% in 90 days",
    challenge: "Maple Leaf was processing over 400 orders a day across Shopify, Amazon, and their own website — managed in three separate dashboards with no shared stock count. Overselling, late despatch, and a 14% returns rate from incorrect orders were damaging their seller ratings and eating into margins.",
    solution: "OneSoft built an E-commerce ERP integrating all three channels into a single order management and inventory system. Real-time stock sync eliminated overselling. Automated pick-pack-despatch workflows replaced manual order processing. A centralised returns management module tracked every return to its root cause.",
    results: [
      { value: "3×", label: "Faster order processing" },
      { value: "25%", label: "Fewer customer returns" },
      { value: "400+", label: "Daily orders managed" },
      { value: "3", label: "Sales channels unified" },
    ],
    quote: "We were drowning in orders and losing money on returns we didn't understand. Now everything is one system and our returns rate has dropped significantly in under three months.",
    author: "Claire Bosworth",
    authorRole: "Head of Operations",
  },
  {
    slug: "proFit-equipment",
    tag: "SEO Optimisation",
    tagColor: BLUE,
    category: "Digital Marketing",
    client: "ProFit Gym Equipment UK",
    location: "Hull, UK",
    flag: "🇬🇧",
    industry: "Retail & E-commerce",
    headline: "From page 4 to positions 1–3 for 12 core keywords in 8 months",
    challenge: "ProFit had an excellent product range and a well-built website but zero organic visibility. Every relevant commercial keyword landed them on page 4 or beyond. They were spending heavily on paid ads to compensate, with no long-term asset being built.",
    solution: "OneSoft conducted a full technical SEO audit, fixed 47 indexation and site speed issues, built a keyword-mapped content strategy targeting 60 commercial terms, executed a white-hat link-building campaign placing editorial links on authority fitness and retail publications, and delivered monthly reporting dashboards tracking all ranking movements.",
    results: [
      { value: "340%", label: "Organic traffic increase" },
      { value: "12", label: "Keywords on page 1" },
      { value: "8 mo", label: "To first-page results" },
      { value: "3×", label: "Increase in organic leads" },
    ],
    quote: "We were on page 4 for every keyword that mattered. Eight months later we hold positions 1–3 for our top 12 terms. Organic leads have tripled.",
    author: "Samir Osman",
    authorRole: "Managing Director",
  },
  {
    slug: "fintrak-accountants",
    tag: "Custom Software & AI",
    tagColor: "#0e7490",
    category: "Software & AI",
    client: "FinTrak Accountancy",
    location: "Leeds, UK",
    flag: "🇬🇧",
    industry: "Professional Services",
    headline: "Four hours of daily manual data work automated — 90% time saved",
    challenge: "FinTrak's team spent four hours every working day manually extracting data from client bank statements, classifying transactions, and populating Excel reports. Errors were common, turnaround times were slow, and the firm couldn't scale without hiring more people to do the same manual work.",
    solution: "OneSoft built a custom AI-powered document processing tool that ingested bank statements, receipts, and invoices in any format, classified transactions using a trained model, and auto-populated the firm's reporting templates. An exception-flagging system highlighted items needing human review, reducing review time to under 20 minutes per client.",
    results: [
      { value: "90%", label: "Reduction in manual processing time" },
      { value: "4 hrs", label: "Saved per working day" },
      { value: "<20 min", label: "Exception review per client" },
      { value: "0", label: "Manual data entry errors" },
    ],
    quote: "What used to take four hours now takes twenty minutes and it's more accurate than we ever were manually. The ROI was clear within the first month.",
    author: "James Cartwright",
    authorRole: "Senior Partner",
  },
  {
    slug: "luna-beauty",
    tag: "Social Media & Ad Creatives",
    tagColor: "#be185d",
    category: "Digital Marketing",
    client: "Luna Beauty Studio",
    location: "Leeds, UK",
    flag: "🇬🇧",
    industry: "Beauty & Wellness",
    headline: "2.8× ROAS on Meta ads, 400% follower growth in six months",
    challenge: "Luna Beauty had a loyal local following but negligible social media presence and had never run paid advertising. Their previous DIY ads consistently underperformed — generic visuals, no clear targeting strategy, and zero measurement framework meant every campaign was a guess.",
    solution: "OneSoft took over their social media management across Instagram and TikTok, built a monthly content calendar with professional creative production, launched Meta ad campaigns with audience segmentation by location, age, and beauty interests, and A/B tested creative formats to continuously improve performance.",
    results: [
      { value: "2.8×", label: "Return on ad spend (ROAS)" },
      { value: "400%", label: "Follower growth in 6 months" },
      { value: "£0.38", label: "Cost per booking from ads" },
      { value: "6 mo", label: "To full campaign maturity" },
    ],
    quote: "We went from almost no online presence to fully booked three weeks in advance. The ad creatives actually look like our brand now and the results speak for themselves.",
    author: "Yasmin Hussain",
    authorRole: "Founder & Lead Stylist",
  },
];

const categories = ["All", "ERP", "Digital Marketing", "Software & AI"];

/* ── Expandable card ──────────────────────────────────────── */
function CaseStudyCard({ cs, isLight, divider, cardBg, t70, t45, headingColor, sectionBg }:
  { cs: typeof allCaseStudies[0]; isLight: boolean; divider: string; cardBg: string; t70: string; t45: string; headingColor: string; sectionBg: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: cardBg, border: `1px solid ${divider}` }}>

      {/* Colour top bar */}
      <div className="h-1" style={{ background: cs.tagColor }} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: `${cs.tagColor}18`, color: cs.tagColor, border: `1px solid ${cs.tagColor}30` }}>
                {cs.tag}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: t45 }}>
                <MapPin className="w-3 h-3" /> {cs.flag} {cs.location}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${divider}`, color: t45 }}>
                {cs.industry}
              </span>
            </div>
            <p className="text-xs font-semibold mb-1" style={{ color: t45 }}>{cs.client}</p>
            <h3 className="text-base md:text-lg font-black leading-snug" style={{ color: headingColor }}>
              {cs.headline}
            </h3>
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {cs.results.map(r => (
            <div key={r.label} className="rounded-xl p-3 text-center"
              style={{ background: `${cs.tagColor}10`, border: `1px solid ${cs.tagColor}20` }}>
              <p className="text-sm font-black" style={{ color: cs.tagColor }}>{r.value}</p>
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: t45 }}>{r.label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mb-5 p-4 rounded-xl" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
          <div className="flex gap-0.5 mb-2">
            {Array(5).fill(0).map((_, j) => (
              <Star key={j} className="w-3 h-3 fill-current" style={{ color: cs.tagColor }} />
            ))}
          </div>
          <p className="text-sm leading-relaxed italic mb-2" style={{ color: t70 }}>"{cs.quote}"</p>
          <p className="text-xs font-semibold" style={{ color: t45 }}>— {cs.author}, {cs.authorRole}</p>
        </blockquote>

        {/* Expand / collapse */}
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 text-xs font-bold transition-colors"
          style={{ color: cs.tagColor }}>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {open ? "Hide details" : "See challenge & solution"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <div className="pt-5 grid md:grid-cols-2 gap-5">
                <div className="rounded-xl p-4" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: t45 }}>
                    The Challenge
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: t70 }}>{cs.challenge}</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <p className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: t45 }}>
                    The Solution
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: t70 }}>{cs.solution}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  const { theme } = useTheme();
  const { openCTAModal } = useCTAModal();
  const isLight = theme === "light";
  const [activeCategory, setActiveCategory] = useState("All");

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  const filtered = activeCategory === "All"
    ? allCaseStudies
    : allCaseStudies.filter(cs => cs.category === activeCategory);

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <TrendingUp className="w-3 h-3" /> Case Studies
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Real businesses.{" "}
              <span style={{ color: BLUE }}>Measurable results.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              Every number on this page comes from a real client running a real business on OneSoft software and services. No simulations, no estimates.
            </motion.p>

            {/* Summary stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.26 }}
              className="flex flex-wrap items-center justify-center gap-8">
              {[
                { v: "8",    l: "Industries covered" },
                { v: "180+", l: "Clients served" },
                { v: "3",    l: "Continents" },
                { v: "100%", l: "Real results, real clients" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl md:text-3xl font-black" style={{ color: BLUE }}>{s.v}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: t45 }}>{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter tabs ───────────────────────────────────── */}
      <div className="sticky top-16 z-20 py-3" style={{ background: pageBg, borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
                style={{
                  background: activeCategory === cat ? BLUE : `${BLUE}12`,
                  color: activeCategory === cat ? "#fff" : t70,
                  border: `1px solid ${activeCategory === cat ? BLUE : `${BLUE}25`}`,
                }}>
                {cat}
                <span className="ml-1.5 text-[11px] opacity-70">
                  ({cat === "All" ? allCaseStudies.length : allCaseStudies.filter(c => c.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Case study cards ──────────────────────────────── */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map(cs => (
                <CaseStudyCard key={cs.slug} cs={cs}
                  isLight={isLight} divider={divider} cardBg={cardBg}
                  t70={t70} t45={t45} headingColor={headingColor} sectionBg={sectionBg} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: BLUE }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
              <Zap className="w-3 h-3" /> Your business next
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Want results like these<br />for your business?
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us about your business and the problem you're trying to solve. We'll show you exactly how OneSoft can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Book a Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <a href="mailto:info@onesoft.org.uk"
                className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold text-white/80 hover:text-white transition-colors">
                info@onesoft.org.uk
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAStrip />
      <Footer />
    </div>
  );
}
