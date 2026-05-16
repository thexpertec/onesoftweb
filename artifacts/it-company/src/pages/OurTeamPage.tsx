import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { useTheme } from "@/context/ThemeContext";
import { useCTAModal } from "@/context/CTAModalContext";
import { Button } from "@/components/ui/button";
import {
  Linkedin, Twitter, Globe, ArrowRight,
  MapPin, Users, Briefcase, Rocket, Heart, Zap,
} from "lucide-react";

const BLUE  = "#1E4DA0";
const CYAN  = "#4FC6FF";

/* ── Team data ────────────────────────────────────────────── */

const leadership = [
  {
    name: "Zain ul Abideen",
    initials: "ZA",
    role: "Founder & CEO",
    office: "Hull, UK",
    bio: "Zain founded OneSoft with a single conviction: businesses everywhere deserve enterprise-grade software without enterprise-grade complexity. With a background in systems architecture and a decade of building software for clients across three continents, he leads the company's vision and strategic direction.",
    tags: ["Strategy", "Systems Architecture", "Business Development"],
    color: BLUE,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Aisha Mahmood",
    initials: "AM",
    role: "Chief Technology Officer",
    office: "Islamabad, PK",
    bio: "Aisha oversees everything technical at OneSoft — from cloud infrastructure and ERP architecture to AI research and security. She has shipped software used by over two hundred organisations across education, healthcare, and retail, and leads a team of thirty-plus engineers.",
    tags: ["Cloud Infrastructure", "ERP Architecture", "AI & Automation"],
    color: BLUE,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Omar Farooq",
    initials: "OF",
    role: "Chief Operating Officer",
    office: "Business Bay, Dubai",
    bio: "Omar ensures OneSoft delivers on every promise made to every client. He manages client success, delivery operations, and the company's processes across all three offices. Before OneSoft, he spent eight years in operations and programme management at a Big Four consultancy.",
    tags: ["Operations", "Client Success", "Delivery Management"],
    color: BLUE,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sara Nawaz",
    initials: "SN",
    role: "Head of Design",
    office: "Hull, UK",
    bio: "Sara leads product design and brand across OneSoft and every client project we touch. She brings a deep belief that good design is not decoration — it is how software communicates. She has designed digital products for clients ranging from NHS-linked clinics to Series-B startups.",
    tags: ["Product Design", "Brand Identity", "UX Research"],
    color: BLUE,
    linkedin: "#",
    twitter: "#",
  },
];

const team = [
  { name: "Bilal Hussain",    initials: "BH", role: "Lead Backend Engineer",       office: "Islamabad, PK", color: "#1E4DA0" },
  { name: "Fatima Riaz",      initials: "FR", role: "Full-Stack Developer",         office: "Islamabad, PK", color: "#1E4DA0" },
  { name: "Tariq Saleem",     initials: "TS", role: "ERP Specialist",               office: "Islamabad, PK", color: "#1E4DA0" },
  { name: "Nadia Khan",       initials: "NK", role: "AI & Automation Engineer",     office: "Islamabad, PK", color: "#1E4DA0" },
  { name: "Hassan Qureshi",   initials: "HQ", role: "DevOps & Infrastructure",      office: "Islamabad, PK", color: "#1E4DA0" },
  { name: "Mariam Yousaf",    initials: "MY", role: "Frontend Developer",           office: "Hull, UK",      color: "#1E4DA0" },
  { name: "James Whitfield",  initials: "JW", role: "SEO Strategist",               office: "Hull, UK",      color: "#1E4DA0" },
  { name: "Priya Menon",      initials: "PM", role: "Digital Marketing Manager",    office: "Hull, UK",      color: "#1E4DA0" },
  { name: "Khalid Al-Rashid", initials: "KR", role: "Client Success Manager",       office: "Dubai, UAE",    color: "#1E4DA0" },
  { name: "Leila Abubakar",   initials: "LA", role: "Business Development",         office: "Dubai, UAE",    color: "#1E4DA0" },
  { name: "Rania Hashim",     initials: "RH", role: "Creative Director",            office: "Dubai, UAE",    color: "#1E4DA0" },
  { name: "Adam Thornton",    initials: "AT", role: "Project Manager",              office: "Hull, UK",      color: "#1E4DA0" },
];

const values = [
  { icon: Rocket, title: "Ship things that matter",   desc: "We build with purpose. Every line of code, every design decision, every campaign exists to solve a real problem for a real person." },
  { icon: Heart,  title: "Client success is our success", desc: "We don't measure ourselves by deliverables. We measure ourselves by what happens to our clients' businesses after we deliver." },
  { icon: Users,  title: "Diverse by design",          desc: "Our team spans three countries and dozens of backgrounds. That diversity is not incidental — it makes our work sharper and our thinking broader." },
  { icon: Zap,    title: "Move fast, stay honest",     desc: "We work at pace and we communicate clearly. If something's wrong, we say so early. No surprises, no excuses." },
];

const offices = [
  { flag: "🇬🇧", city: "Hull",       country: "United Kingdom", role: "Headquarters & UK operations"         },
  { flag: "🇦🇪", city: "Dubai",      country: "United Arab Emirates", role: "Middle East & global clients"    },
  { flag: "🇵🇰", city: "Islamabad",  country: "Pakistan",      role: "Engineering & product development"     },
];

const stats = [
  { value: "35+", label: "Team members" },
  { value: "3",   label: "Global offices" },
  { value: "8+",  label: "Years in business" },
  { value: "180+",label: "Clients served" },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function OurTeamPage() {
  useSEO(PAGE_SEO.team);
  const { theme } = useTheme();
  const { openCTAModal } = useCTAModal();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

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
                <Users className="w-3 h-3" /> Our Team
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
              style={{ color: headingColor }}>
              The people behind{" "}
              <span style={{ color: BLUE }}>every OneSoft product</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: t70 }}>
              We are engineers, designers, strategists, and builders spread across three offices in the UK, UAE, and Pakistan — united by one goal: making great software accessible to every business.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.26 }}
              className="flex flex-wrap items-center justify-center gap-8">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-black" style={{ color: BLUE }}>{s.value}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: t45 }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LEADERSHIP
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Briefcase className="w-3 h-3" /> Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              The leadership team
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Four leaders. Three continents. One company built to last.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {leadership.map((person, i) => (
              <motion.div key={person.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-5"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black shrink-0"
                    style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN}55)`, border: `2px solid ${BLUE}30` }}>
                    {person.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-black leading-tight" style={{ color: headingColor }}>{person.name}</p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: BLUE }}>{person.role}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 shrink-0" style={{ color: t45 }} />
                      <p className="text-xs" style={{ color: t45 }}>{person.office}</p>
                    </div>
                  </div>
                  {/* Social */}
                  <div className="flex gap-2 shrink-0">
                    <a href={person.linkedin} aria-label="LinkedIn"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: `${BLUE}12`, border: `1px solid ${BLUE}25`, color: BLUE }}>
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href={person.twitter} aria-label="Twitter"
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: `${BLUE}12`, border: `1px solid ${BLUE}25`, color: BLUE }}>
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: t70 }}>{person.bio}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {person.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${BLUE}12`, border: `1px solid ${BLUE}22`, color: BLUE }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TEAM GRID
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              Meet the rest of the team
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Every person here is a specialist. No generalists, no filler — just people who are genuinely excellent at what they do.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {team.map((person, i) => (
              <motion.div key={person.name}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="p-4 rounded-2xl text-center flex flex-col items-center gap-3"
                style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black"
                  style={{ background: `linear-gradient(135deg, ${BLUE}cc, ${BLUE}66)`, border: `1.5px solid ${BLUE}30` }}>
                  {person.initials}
                </div>
                <div>
                  <p className="text-sm font-black leading-tight" style={{ color: headingColor }}>{person.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: BLUE }}>{person.role}</p>
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    <MapPin className="w-2.5 h-2.5" style={{ color: t45 }} />
                    <p className="text-[11px]" style={{ color: t45 }}>{person.office}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          OFFICES
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Globe className="w-3 h-3" /> Offices
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              Three offices. One team.
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Our distributed model means we can serve clients across time zones without sacrificing quality or communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {offices.map((o, i) => (
              <motion.div key={o.city}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                <div className="text-4xl mb-3">{o.flag}</div>
                <p className="text-lg font-black mb-1" style={{ color: headingColor }}>{o.city}</p>
                <p className="text-sm mb-2" style={{ color: t45 }}>{o.country}</p>
                <p className="text-xs leading-relaxed" style={{ color: t70 }}>{o.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Heart className="w-3 h-3" /> How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: headingColor }}>
              What we believe in
            </h2>
            <p className="text-base" style={{ color: t70 }}>
              Our values aren't on a wall. They show up in how we write code, talk to clients, and make decisions under pressure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
                  <v.icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <p className="text-sm font-black mb-2" style={{ color: headingColor }}>{v.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: t70 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          JOIN US CTA
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: BLUE }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
              <Rocket className="w-3 h-3" /> We're hiring
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Want to build the future<br />of business software with us?
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              We're always looking for talented engineers, designers, and strategists who share our belief that great software changes businesses. Remote-friendly. High ownership. Real impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg"
                className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto"
                onClick={openCTAModal}>
                Get in Touch <ArrowRight className="w-4 h-4 ml-1" />
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
