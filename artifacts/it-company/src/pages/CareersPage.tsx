import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { useTheme } from "@/context/ThemeContext";
import { useCTAModal } from "@/context/CTAModalContext";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Zap, MapPin, Clock, Briefcase,
  Code2, PenTool, BarChart3, Users, Globe,
  Heart, Rocket, Shield, Coffee, Laptop,
  GraduationCap, TrendingUp, ChevronDown, ChevronUp,
  CheckCircle2, Star,
} from "lucide-react";

const BLUE = "#1E4DA0";

/* ── Data ─────────────────────────────────────────────────── */

const perks = [
  { icon: Laptop,        title: "Remote-friendly",        desc: "Work from anywhere within your office timezone. We judge by output, not hours at a desk." },
  { icon: GraduationCap, title: "Learning budget",        desc: "£1,000 / year per person for courses, books, conferences, or certifications — no justification needed." },
  { icon: TrendingUp,    title: "Real ownership",         desc: "You own your work end to end. No endless handoffs, no layers of approval for decisions that should be yours." },
  { icon: Heart,         title: "Health coverage",        desc: "Private health insurance for UK-based team members. Healthcare allowance for Dubai and Islamabad offices." },
  { icon: Coffee,        title: "Flexible hours",         desc: "Core hours 10–4 in your timezone. Outside of that, structure your day in the way that works best for you." },
  { icon: Globe,         title: "Global team",            desc: "Work with colleagues across the UK, UAE, and Pakistan. Annual in-person team gathering at one of our offices." },
  { icon: Rocket,        title: "Growth path",            desc: "Clear seniority progression and a six-month review cycle. No one gets stuck if they're performing." },
  { icon: Shield,        title: "Transparent pay",        desc: "Salary bands are shared before interviews. No negotiation games — you'll know exactly where you stand." },
];

const departments = [
  {
    id: "engineering",
    label: "Engineering",
    icon: Code2,
    color: BLUE,
    roles: [
      {
        title: "Senior React Developer",
        type: "Full-time",
        location: "Islamabad, PK · Remote",
        level: "Senior",
        desc: "You'll lead frontend development on our ERP products and client-facing web applications. We work with React, TypeScript, Vite, and Tailwind. You'll own components end to end — from architecture decisions to pixel-level polish.",
        requirements: [
          "4+ years with React and TypeScript",
          "Strong understanding of component architecture and state management",
          "Experience with REST and GraphQL APIs",
          "Attention to detail in UI implementation",
        ],
        nice: ["Framer Motion", "React Native", "Next.js"],
      },
      {
        title: "Backend Engineer (Node.js / PHP)",
        type: "Full-time",
        location: "Islamabad, PK · Remote",
        level: "Mid–Senior",
        desc: "You'll build and maintain the server-side logic powering our ERP systems, REST APIs, and integrations. Our stack includes Node.js, PHP (Laravel), PostgreSQL, and Redis. You'll work on systems that businesses rely on every day.",
        requirements: [
          "3+ years in backend development with Node.js or PHP",
          "Solid SQL and database design skills (PostgreSQL preferred)",
          "Experience building and consuming REST APIs",
          "Understanding of authentication, caching, and performance optimisation",
        ],
        nice: ["Laravel", "Redis", "Docker", "AWS or similar cloud"],
      },
      {
        title: "AI / ML Engineer",
        type: "Full-time",
        location: "Islamabad, PK · Remote",
        level: "Senior",
        desc: "You'll design and build AI-powered features across our product suite — from document processing and automation workflows to intelligent reporting and LLM integrations. You'll work closely with the CTO on product strategy for our AI offerings.",
        requirements: [
          "3+ years in applied machine learning or AI engineering",
          "Hands-on experience with Python and key ML libraries (PyTorch, scikit-learn, etc.)",
          "Experience working with LLM APIs (OpenAI, Anthropic, etc.)",
          "Understanding of document processing, NLP, or automation pipelines",
        ],
        nice: ["Langchain / LlamaIndex", "Vector databases", "Fine-tuning experience"],
      },
      {
        title: "DevOps & Infrastructure Engineer",
        type: "Full-time",
        location: "Islamabad, PK · Remote",
        level: "Mid–Senior",
        desc: "You'll own cloud infrastructure, deployment pipelines, and uptime for all hosted OneSoft products. We need someone who thinks about reliability, security, and cost — and who can set up the foundations that scale with us.",
        requirements: [
          "3+ years in DevOps or infrastructure engineering",
          "Strong Linux and shell scripting knowledge",
          "Experience with cloud platforms (AWS, GCP, or Azure)",
          "CI/CD pipeline design and management",
        ],
        nice: ["Terraform", "Kubernetes", "PostgreSQL administration", "Security hardening"],
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: PenTool,
    color: "#7c3aed",
    roles: [
      {
        title: "UI/UX Designer",
        type: "Full-time",
        location: "Hull, UK · Remote",
        level: "Mid–Senior",
        desc: "You'll design software interfaces and marketing pages for OneSoft and our clients. You'll work from research through to high-fidelity Figma prototypes, collaborate with engineers on implementation, and care deeply about getting the details right.",
        requirements: [
          "3+ years in product or UI/UX design",
          "Strong Figma skills — components, auto-layout, prototyping",
          "Ability to design for both web and mobile",
          "Clear thinking about user flows and information architecture",
        ],
        nice: ["Motion design", "Design system maintenance", "User research facilitation"],
      },
      {
        title: "Brand & Visual Designer",
        type: "Full-time",
        location: "Hull, UK · Remote",
        level: "Mid",
        desc: "You'll work on brand identity, marketing collateral, social media content, and ad creatives for OneSoft and our clients. You'll be the person who makes things look unmistakably good and on-brand.",
        requirements: [
          "3+ years in brand or graphic design",
          "Proficient in Figma, Adobe Illustrator, and Photoshop",
          "Strong eye for typography, colour, and layout",
          "Experience creating assets for digital advertising and social media",
        ],
        nice: ["Motion graphics", "Video editing", "3D illustration"],
      },
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    icon: BarChart3,
    color: "#0891b2",
    roles: [
      {
        title: "SEO Specialist",
        type: "Full-time",
        location: "Hull, UK · Remote",
        level: "Mid",
        desc: "You'll work on SEO strategy and execution for OneSoft clients across a range of industries — from local businesses to e-commerce and SaaS. You'll own technical audits, content strategy, link building, and monthly reporting.",
        requirements: [
          "2+ years in SEO (agency or in-house)",
          "Confident with Google Search Console, Ahrefs, or SEMrush",
          "Understanding of technical SEO (Core Web Vitals, crawlability, schema)",
          "Ability to write clear content briefs and keyword research documents",
        ],
        nice: ["Local SEO", "E-commerce SEO", "Python for SEO automation"],
      },
      {
        title: "Paid Media Manager",
        type: "Full-time",
        location: "Hull, UK · Remote",
        level: "Mid–Senior",
        desc: "You'll manage paid advertising campaigns for OneSoft clients across Meta, Google, TikTok, and LinkedIn. You'll handle strategy, audience targeting, creative briefing, budget management, and performance reporting.",
        requirements: [
          "3+ years managing paid social and/or paid search campaigns",
          "Hands-on experience with Meta Ads Manager and Google Ads",
          "Strong analytical skills — comfortable with attribution and ROAS analysis",
          "Ability to brief and give feedback on creative assets",
        ],
        nice: ["TikTok Ads", "LinkedIn Ads", "GA4", "A/B testing frameworks"],
      },
    ],
  },
  {
    id: "business",
    label: "Business & Client Success",
    icon: Users,
    color: "#16a34a",
    roles: [
      {
        title: "Business Development Manager",
        type: "Full-time",
        location: "Dubai, UAE",
        level: "Senior",
        desc: "You'll identify and close new client relationships in the Middle East and South Asia. You'll lead discovery calls, manage proposals, and work with the delivery team to ensure new clients start well. This is a consultative sales role, not a numbers game.",
        requirements: [
          "4+ years in B2B sales or business development",
          "Track record of closing enterprise or mid-market deals",
          "Strong communication and proposal-writing skills",
          "Understanding of software products (ERP, SaaS, or similar)",
        ],
        nice: ["Knowledge of Gulf market", "Arabic language skills", "CRM experience"],
      },
      {
        title: "Client Success Manager",
        type: "Full-time",
        location: "Dubai, UAE · Hull, UK",
        level: "Mid",
        desc: "You'll be the main point of contact for a portfolio of OneSoft clients once they're live. You'll manage onboarding, monitor satisfaction, handle escalations, and identify growth opportunities within existing accounts.",
        requirements: [
          "2+ years in client success, account management, or project management",
          "Strong written and verbal communication",
          "Organised and proactive — you follow up before clients have to",
          "Comfortable with software products and able to learn systems quickly",
        ],
        nice: ["Experience with ERP or SaaS products", "Project management tools", "CRM experience"],
      },
    ],
  },
];

/* ── Role card ────────────────────────────────────────────── */
function RoleCard({ role, color, isLight, divider, cardBg, sectionBg, t45, t70, headingColor, onApply }:
  { role: typeof departments[0]["roles"][0]; color: string; isLight: boolean; divider: string; cardBg: string; sectionBg: string; t45: string; t70: string; headingColor: string; onApply: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: cardBg, border: `1px solid ${divider}` }}>
      <div className="h-0.5" style={{ background: color }} />
      <div className="p-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-black leading-snug mb-2" style={{ color: headingColor }}>{role.title}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${color}15`, color, border: `1px solid ${color}28` }}>
                <Briefcase className="w-2.5 h-2.5" /> {role.type}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${divider}`, color: t70 }}>
                <MapPin className="w-2.5 h-2.5" /> {role.location}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${divider}`, color: t70 }}>
                <Star className="w-2.5 h-2.5" /> {role.level}
              </span>
            </div>
          </div>
          <Button size="sm" className="h-8 px-4 text-xs font-bold shrink-0"
            style={{ background: color, color: "#fff" }}
            onClick={onApply}>
            Apply <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: t70 }}>{role.desc}</p>

        <button onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 text-xs font-bold transition-colors"
          style={{ color }}>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {open ? "Hide requirements" : "See requirements"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden">
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: t45 }}>Requirements</p>
                  <ul className="space-y-2">
                    {role.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: t70 }}>
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-4" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: t45 }}>Nice to have</p>
                  <ul className="space-y-2">
                    {role.nice.map((n, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: t70 }}>
                        <div className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 flex items-center justify-center"
                          style={{ background: `${color}25` }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        </div>
                        {n}
                      </li>
                    ))}
                  </ul>
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
export default function CareersPage() {
  const { theme } = useTheme();
  const { openCTAModal } = useCTAModal();
  const isLight = theme === "light";
  const [activeDept, setActiveDept] = useState("all");

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  const totalRoles = departments.reduce((n, d) => n + d.roles.length, 0);
  const filtered   = activeDept === "all" ? departments : departments.filter(d => d.id === activeDept);

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Rocket className="w-3 h-3" /> Careers at OneSoft
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              Build software that runs{" "}
              <span style={{ color: BLUE }}>real businesses</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              We're a team of engineers, designers, strategists, and builders. We work on hard problems, ship things that matter, and give people real ownership of their work. Remote-friendly across three offices.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
              className="flex flex-wrap items-center justify-center gap-8">
              {[
                { v: `${totalRoles}`, l: "Open roles" },
                { v: "3",            l: "Office locations" },
                { v: "Remote",       l: "Friendly culture" },
                { v: "35+",          l: "Team members" },
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

      {/* ══════════════════════════════════════════════
          PERKS
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Heart className="w-3 h-3" /> Benefits & Perks
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              What you get when you join
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              No ping-pong tables. Just the things that actually matter to people who do serious work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {perks.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-5 rounded-2xl"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
                  <p.icon className="w-4.5 h-4.5" style={{ color: BLUE }} />
                </div>
                <p className="text-sm font-black mb-1.5" style={{ color: headingColor }}>{p.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: t70 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OPEN ROLES
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Briefcase className="w-3 h-3" /> Open Roles
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              {totalRoles} open positions across {departments.length} teams
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Filter by department or scroll through all roles below.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button onClick={() => setActiveDept("all")}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeDept === "all" ? BLUE : `${BLUE}12`,
                color: activeDept === "all" ? "#fff" : t70,
                border: `1px solid ${activeDept === "all" ? BLUE : `${BLUE}25`}`,
              }}>
              All ({totalRoles})
            </button>
            {departments.map(d => (
              <button key={d.id} onClick={() => setActiveDept(d.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeDept === d.id ? d.color : `${d.color}12`,
                  color: activeDept === d.id ? "#fff" : t70,
                  border: `1px solid ${activeDept === d.id ? d.color : `${d.color}25`}`,
                }}>
                <d.icon className="w-3.5 h-3.5" />
                {d.label} ({d.roles.length})
              </button>
            ))}
          </div>

          {/* Roles grouped by dept */}
          <div className="max-w-5xl mx-auto space-y-12">
            <AnimatePresence mode="popLayout">
              {filtered.map(dept => (
                <motion.div key={dept.id} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: `${dept.color}18`, border: `1px solid ${dept.color}30` }}>
                      <dept.icon className="w-4 h-4" style={{ color: dept.color }} />
                    </div>
                    <h3 className="text-lg font-black" style={{ color: headingColor }}>{dept.label}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${dept.color}15`, color: dept.color, border: `1px solid ${dept.color}28` }}>
                      {dept.roles.length} open
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {dept.roles.map(role => (
                      <RoleCard key={role.title} role={role} color={dept.color}
                        isLight={isLight} divider={divider} cardBg={cardBg}
                        sectionBg={sectionBg} t45={t45} t70={t70}
                        headingColor={headingColor} onApply={openCTAModal} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NO FIT? OPEN APPLICATION
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center p-8 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${divider}` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
              <Globe className="w-6 h-6" style={{ color: BLUE }} />
            </div>
            <h3 className="text-xl font-black mb-3" style={{ color: headingColor }}>
              Don't see a role that fits?
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: t70 }}>
              We occasionally hire for roles we haven't posted yet — and we always want to hear from exceptional people. Send us your CV and tell us what you're best at. If there's a fit now or in the future, we'll be in touch.
            </p>
            <Button size="lg" className="h-11 px-8 text-sm font-semibold"
              style={{ background: BLUE, color: "#fff" }}
              onClick={openCTAModal}>
              Send an open application <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: BLUE }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
              <Zap className="w-3 h-3" /> Join the team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Build something you're<br />proud of, with people you respect
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              High ownership, real problems, a team that cares about quality. If that sounds like where you want to work, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                View open roles <ArrowRight className="w-4 h-4 ml-1" />
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
