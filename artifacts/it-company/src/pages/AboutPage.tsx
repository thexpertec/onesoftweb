import { useRef, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { GlobalTeams } from "@/components/GlobalTeams";
import { GlobalOffices } from "@/components/GlobalOffices";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Globe, Users, Zap, Shield, Heart, TrendingUp,
  CheckCircle2, ArrowRight, Star, Target, Lightbulb,
  Handshake, Clock, Award, Building2, Code2,
} from "lucide-react";

const BLUE  = "#1E4DA0";
const CYAN  = "#1E4DA0";

/* ── Count-up ───────────────────────────────────────────── */
function CountUp({ to, suffix = "", prefix = "", duration = 2 }:
  { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration, ease: "easeOut",
      onUpdate(v) { if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [inView]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const stats = [
  { prefix: "", to: 7,   suffix: "+", label: "Years in Business" },
  { prefix: "", to: 500, suffix: "+", label: "Clients Served" },
  { prefix: "", to: 3,   suffix: "",  label: "Countries" },
  { prefix: "", to: 40,  suffix: "+", label: "Team Members" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We never stop building. Every product ships with the latest tech stack — fast, scalable, and built to last well beyond launch day.",
    color: CYAN,
  },
  {
    icon: Shield,
    title: "Reliability",
    desc: "Downtime is not an option for the businesses that depend on us. We build with redundancy, monitor 24/7, and respond fast when it matters.",
    color: BLUE,
  },
  {
    icon: Handshake,
    title: "Transparency",
    desc: "No hidden fees, no vague timelines. From the first call to go-live, you always know exactly where your project stands and what it costs.",
    color: CYAN,
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Our teams span the UK, UAE, and Pakistan — meaning we cover multiple time zones, languages, and market needs from one connected company.",
    color: BLUE,
  },
  {
    icon: Heart,
    title: "People-First",
    desc: "Technology serves people, not the other way around. We design every system around the humans who use it daily — from staff to end customers.",
    color: CYAN,
  },
  {
    icon: Target,
    title: "Outcome-Driven",
    desc: "We measure success by your results, not our deliverables. If a feature doesn't solve a real problem, we won't build it.",
    color: BLUE,
  },
];

const milestones = [
  { year: "2017", text: "OneSoft founded in Hull, UK, with a single focus: ERP software for businesses that were being let down by generic off-the-shelf tools." },
  { year: "2019", text: "Launched our first dedicated School ERP, deployed to 12 schools in the first year. The feedback shaped every product that followed." },
  { year: "2021", text: "Expanded into the UAE market and opened our Gulf office in Dubai, serving hospitality and distribution clients across the region." },
  { year: "2022", text: "Pakistan operations launched from Islamabad — bringing dedicated development and support capacity to our growing international client base." },
  { year: "2024", text: "OneSites launched as a standalone brand within OneSoft, delivering custom websites alongside our ERP suite for end-to-end digital transformation." },
  { year: "2025", text: "500+ active clients across three countries, 40+ team members, and seven specialised ERP verticals — with more on the roadmap." },
];

export default function AboutPage() {
  useSEO(PAGE_SEO.about);
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const bg      = isLight ? "#ffffff"            : "#040912";
  const cardBg  = isLight ? "#F5F5F5"            : "rgba(255,255,255,0.04)";
  const border  = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t80     = isLight ? "rgba(0,0,0,0.80)"   : "rgba(255,255,255,0.80)";
  const t55     = isLight ? "rgba(0,0,0,0.55)"   : "rgba(255,255,255,0.55)";
  const t35     = isLight ? "rgba(0,0,0,0.35)"   : "rgba(255,255,255,0.35)";
  const heroBg  = isLight ? "#F5F5F5"            : "#07111f";

  return (
    <div style={{ background: bg, minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{ background: heroBg, borderBottom: `1px solid ${border}` }} className="pt-28 pb-20 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(30,77,160,0.12)", border: "1px solid rgba(30,77,160,0.25)", color: BLUE }}>
              <Building2 className="w-3.5 h-3.5" /> About OneSoft
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ color: isLight ? "#000000" : "#ffffff" }}>
            Built to solve <br />
            <span style={{ color: BLUE }}>real problems.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            style={{ color: t55 }}>
            OneSoft is a global software company delivering enterprise-grade ERP systems and custom websites. We exist to give every business — regardless of size or sector — the digital infrastructure they deserve.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4">
            <Button size="lg" className="h-12 px-8 font-semibold"
              style={{ background: BLUE, border: "none", color: "#ffffff" }}
              onClick={() => openCTAModal("About — General Enquiry")}>
              Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 font-semibold"
              style={{ borderColor: border, color: isLight ? "#000000" : "#ffffff", background: "transparent" }}>
              <a href="#our-team" className="flex items-center gap-2">Meet the Team <Users className="w-4 h-4" /></a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section style={{ background: bg, borderBottom: `1px solid ${border}` }} className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: i % 2 === 0 ? BLUE : CYAN }}>
                  <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: t55 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ──────────────────────────────────── */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: heroBg }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(30,77,160,0.10)", color: BLUE }}>Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: isLight ? "#000000" : "#ffffff" }}>
              How we got here
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: t55 }}>
              OneSoft wasn't founded from a boardroom strategy. It came from frustration — watching good businesses struggle with software that didn't fit them.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${BLUE}, ${CYAN}, ${BLUE})`, opacity: 0.3 }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}>

                  {/* Dot */}
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full border-2 z-10"
                    style={{ background: bg, borderColor: i % 2 === 0 ? BLUE : CYAN }} />

                  {/* Year pill */}
                  <div className={`hidden md:flex flex-1 ${i % 2 === 0 ? "justify-end pr-10" : "justify-start pl-10"}`}>
                    <span className="inline-block text-2xl font-black" style={{ color: i % 2 === 0 ? BLUE : CYAN }}>{m.year}</span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                    <span className="inline-block text-xl font-black mb-2 md:hidden" style={{ color: i % 2 === 0 ? BLUE : CYAN }}>{m.year}</span>
                    <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${border}` }}>
                      <p className="text-sm leading-relaxed" style={{ color: t80 }}>{m.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────── */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: bg }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(30,77,160,0.10)", color: CYAN }}>What Drives Us</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: isLight ? "#000000" : "#ffffff" }}>
              Our core values
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: t55 }}>
              These aren't words on a wall. They're the decisions we make every day — in code, in communication, and in delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${border}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}>
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: isLight ? "#000000" : "#ffffff" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t55 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why clients choose us ──────────────────────── */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: heroBg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: "rgba(30,77,160,0.10)", color: BLUE }}>Why OneSoft</span>
              <h2 className="text-4xl font-black mb-4 leading-tight" style={{ color: isLight ? "#000000" : "#ffffff" }}>
                We build what businesses actually need
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: t55 }}>
                Most ERP vendors sell the same platform to every sector and call it customisation. We don't. Every OneSoft product was built from scratch for a specific industry — shaped by real conversations with the people running those businesses every day.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: t55 }}>
                When you work with us, you get a team that has already solved the exact problem you're describing — not one that will figure it out after you've paid.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="space-y-4">
              {[
                { icon: Code2,      color: BLUE, title: "Built in-house, not resold",    desc: "Every line of code is written by our team. No white-labelled SaaS. No third-party platforms you're renting." },
                { icon: Zap,        color: CYAN, title: "Go live in days, not months",   desc: "Our products are ready to deploy. Onboarding typically takes 3–14 days depending on complexity." },
                { icon: Clock,      color: BLUE, title: "Support that actually responds", desc: "Dedicated account managers and a real support team — not a ticket queue that takes three days to reply." },
                { icon: Award,      color: CYAN, title: "Sector-deep expertise",          desc: "Seven ERP verticals, each shaped by hundreds of hours of feedback from operators in that exact industry." },
                { icon: TrendingUp, color: BLUE, title: "Scales as you grow",             desc: "Start with one module and expand. The architecture supports single sites, multi-branch, and enterprise rollouts." },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 rounded-xl p-4" style={{ background: cardBg, border: `1px solid ${border}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}28` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: isLight ? "#000000" : "#ffffff" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: t55 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonial Pull-quote ─────────────────────── */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: bg }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" style={{ color: CYAN }} />)}
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold leading-snug mb-6" style={{ color: isLight ? "#000000" : "#ffffff" }}>
              "They didn't just deliver software — they delivered an understanding of how our business actually works. That's rare."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: BLUE }}>AM</div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: isLight ? "#000000" : "#ffffff" }}>Ahmed M.</p>
                <p className="text-xs" style={{ color: t55 }}>Director, Multi-branch Restaurant Group</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Global Team ────────────────────────────────── */}
      <div id="our-team">
        <GlobalTeams />
      </div>

      {/* ── Offices ────────────────────────────────────── */}
      <GlobalOffices />

      {/* ── CTA ────────────────────────────────────────── */}
      <CTAStrip onCTA={() => openCTAModal("About — General Enquiry")} />

      <Footer />
    </div>
  );
}
