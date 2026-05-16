import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const BLUE = "#1E4DA0";

export const featuredCaseStudies = [
  {
    slug: "al-noor-hospital",
    tag: "Hospital ERP",
    tagColor: "#0891b2",
    client: "Al-Noor Medical Centre",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    headline: "Billing errors down 97% in the first week after go-live",
    challenge: "Manual patient records and paper-based billing across three departments led to dozens of daily billing errors and hours of lost staff time.",
    result1: { value: "97%", label: "Fewer billing errors" },
    result2: { value: "40%", label: "Shorter OPD wait times" },
    result3: { value: "1 week", label: "To full go-live" },
    quote: "Everything — OPD, pharmacy, lab, billing — is one screen now. The errors disappeared almost overnight.",
    author: "Dr. Adil Rehman, CMO",
  },
  {
    slug: "beacon-academy",
    tag: "School ERP",
    tagColor: "#7c3aed",
    client: "Beacon Academy Group",
    location: "Lahore, Pakistan",
    flag: "🇵🇰",
    headline: "Four school branches unified on one system, admin time cut by 60%",
    challenge: "Running four campuses with separate spreadsheets for fees, attendance, and results was unsustainable. Staff spent more time on admin than on students.",
    result1: { value: "60%", label: "Reduction in admin time" },
    result2: { value: "4",   label: "Branches unified" },
    result3: { value: "100%", label: "Fee collection automated" },
    quote: "The admin team went from overworked to actually having time to focus on students. That's the real result.",
    author: "Mrs. Fatima Akhtar, Principal",
  },
  {
    slug: "proFit-equipment",
    tag: "SEO Optimisation",
    tagColor: BLUE,
    client: "ProFit Gym Equipment UK",
    location: "Hull, United Kingdom",
    flag: "🇬🇧",
    headline: "Page 1 for 12 core keywords, organic traffic up 340% in 8 months",
    challenge: "A strong product range with no digital visibility. The business sat on page 4 for every relevant search term while competitors dominated the organic results.",
    result1: { value: "340%", label: "Organic traffic increase" },
    result2: { value: "12",   label: "Page 1 rankings" },
    result3: { value: "8 mo", label: "To first-page results" },
    quote: "We were on page 4 for everything. Eight months later we rank in the top 3 for all our key terms. Leads have tripled.",
    author: "Samir Osman, Managing Director",
  },
];

export default function CaseStudiesSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const cardBg      = isLight ? "#ffffff"              : "#07111f";
  const cardBorder  = isLight ? "rgba(0,0,0,0.08)"     : "rgba(255,255,255,0.08)";
  const headingCol  = isLight ? "#0f172a"               : "#ffffff";
  const t65         = isLight ? "rgba(15,23,42,0.70)"   : "rgba(255,255,255,0.65)";
  const t45         = isLight ? "rgba(15,23,42,0.50)"   : "rgba(255,255,255,0.45)";
  const t40         = isLight ? "rgba(15,23,42,0.45)"   : "rgba(255,255,255,0.40)";

  return (
    <section className="py-8 md:py-10 lg:py-[60px] border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ color: headingCol }}>
              Real businesses. Real results.
            </h2>
            <p className="mt-3 text-lg max-w-xl" style={{ color: t65 }}>
              Numbers from clients who use OneSoft products and services every day.
            </p>
          </div>
          <Link href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 group"
            style={{ color: BLUE }}>
            View all case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCaseStudies.map((cs, i) => (
            <motion.div key={cs.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden flex flex-col"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>

              {/* Top colour bar */}
              <div className="h-1" style={{ background: cs.tagColor }} />

              <div className="p-6 flex flex-col flex-1 gap-5">
                {/* Tag + location */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${cs.tagColor}18`, color: cs.tagColor, border: `1px solid ${cs.tagColor}30` }}>
                    {cs.tag}
                  </span>
                  <span className="text-xs" style={{ color: t40 }}>
                    {cs.flag} {cs.location}
                  </span>
                </div>

                {/* Client + headline */}
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: t45 }}>
                    {cs.client}
                  </p>
                  <h3 className="text-base font-black leading-snug" style={{ color: headingCol }}>
                    {cs.headline}
                  </h3>
                </div>

                {/* Results bar */}
                <div className="grid grid-cols-3 gap-2">
                  {[cs.result1, cs.result2, cs.result3].map(r => (
                    <div key={r.label} className="rounded-xl p-3 text-center"
                      style={{ background: `${cs.tagColor}10`, border: `1px solid ${cs.tagColor}22` }}>
                      <p className="text-sm font-black" style={{ color: cs.tagColor }}>{r.value}</p>
                      <p className="text-[10px] leading-tight mt-0.5" style={{ color: t45 }}>
                        {r.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed italic" style={{ color: t65 }}>
                    "{cs.quote}"
                  </p>
                  <p className="text-xs font-semibold mt-2" style={{ color: t40 }}>
                    — {cs.author}
                  </p>
                </blockquote>

                {/* CTA */}
                <Link href="/case-studies"
                  className="inline-flex items-center gap-1.5 text-xs font-bold group/link"
                  style={{ color: cs.tagColor }}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  Read full case study
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
