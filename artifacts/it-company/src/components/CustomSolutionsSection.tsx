import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useCTAModal } from "@/context/CTAModalContext";
import {
  Wrench, Puzzle, GitBranch, LayoutTemplate, Globe2,
  Zap, Shield, HeadphonesIcon, ArrowRight, Sparkles,
} from "lucide-react";

const CAPABILITIES = [
  { icon: Wrench,          label: "Any-level modification",    desc: "Tweak a field or rebuild an entire workflow — we handle both." },
  { icon: Puzzle,          label: "Custom modules on request", desc: "Need a feature that doesn't exist yet? We build it for you." },
  { icon: GitBranch,       label: "API & third-party links",   desc: "Connect to your bank, courier, CRM, or any external platform." },
  { icon: LayoutTemplate,  label: "White-label & branding",    desc: "Your logo, your colour scheme, your domain — fully branded." },
  { icon: Globe2,          label: "Multi-language & locale",   desc: "Deploy in Arabic, Urdu, French, or any language your team needs." },
  { icon: Zap,             label: "Automation & AI add-ons",   desc: "Smart alerts, predictive reports, and workflow automation." },
  { icon: Shield,          label: "On-premise deployment",     desc: "Prefer your own servers? We support private cloud and on-prem." },
  { icon: HeadphonesIcon,  label: "Dedicated project team",    desc: "A named developer and project manager assigned to your rollout." },
];

const TAGS = [
  "Custom Reports", "New Fields & Forms", "Extra User Roles", "Workflow Automation",
  "SMS / WhatsApp Integration", "Payment Gateway Setup", "Custom Dashboard Widgets",
  "ERP + Website Integration", "Multi-Company Setup", "Data Migration",
  "Legacy System Bridge", "Barcode & RFID", "Custom Mobile App", "AI Analytics",
  "Bulk Import Tools", "Custom Approval Flows",
];

type Props = {
  accentColor: string;
  productName: string;
};

export function CustomSolutionsSection({ accentColor, productName }: Props) {
  const { theme } = useTheme();
  const { openCTAModal } = useCTAModal();
  const isLight = theme === "light";

  const bg   = isLight ? "#ffffff" : "#080f1e";
  const card = isLight ? "#f8fafc" : "rgba(255,255,255,0.04)";
  const border = isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)";
  const text  = isLight ? "#0f172a" : "#ffffff";
  const muted = isLight ? "#64748b" : "rgba(255,255,255,0.5)";

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: bg, borderTop: `1px solid ${border}` }}
    >
      {/* Soft glow behind heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${accentColor}12, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-4 px-3 py-1.5 rounded-full border"
            style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Customised for You
          </span>
          <h2
            className="text-3xl md:text-5xl font-black mb-4 leading-tight"
            style={{ color: text }}
          >
            Need It Built{" "}
            <span style={{ color: accentColor }}>Your Way?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: muted }}>
            Every business is different. Our {productName} can be modified at any level — from a
            single field rename to a full custom module — with a dedicated team handling your rollout
            from day one.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5 border flex flex-col gap-3"
              style={{ background: card, borderColor: border }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${accentColor}18` }}
              >
                <cap.icon className="w-4.5 h-4.5" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: text }}>{cap.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: muted }}>{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-14"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: muted }}>
            Popular customisation requests
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TAGS.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  background: card,
                  borderColor: border,
                  color: isLight ? "#334155" : "rgba(255,255,255,0.65)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}06)`,
            borderColor: `${accentColor}30`,
          }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black mb-1" style={{ color: text }}>
              Tell us what you need — we'll make it happen.
            </h3>
            <p className="text-sm" style={{ color: muted }}>
              Free consultation · No commitment · Response within 24 hours
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openCTAModal(`${productName} – Custom Solution`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: accentColor, color: "#fff" }}
            >
              Request a Custom Build <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+441482000000"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:opacity-80"
              style={{ borderColor: `${accentColor}50`, color: accentColor, background: `${accentColor}10` }}
            >
              Call Us Now
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
