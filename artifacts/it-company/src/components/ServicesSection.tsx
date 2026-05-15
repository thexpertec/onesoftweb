import { motion } from "framer-motion";
import {
  Globe,
  ShoppingBag,
  Webhook,
  Code2,
  Users,
  LayoutDashboard,
  Wrench,
  BrainCircuit,
  Megaphone,
  SearchCheck,
  ImagePlay,
  ArrowRight,
} from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  desc: string;
  tags: string[];
  color: string;
};

const devServices: Service[] = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Bespoke business websites — from corporate brochures to full content platforms — built for speed, SEO, and conversion.",
    tags: ["React", "Next.js", "WordPress", "Webflow"],
    color: "#1E4DA0",
  },
  {
    icon: ShoppingBag,
    title: "Shopify Stores",
    desc: "End-to-end Shopify builds including custom themes, app integrations, payment setup, and multi-currency storefronts.",
    tags: ["Shopify Plus", "Liquid", "Custom Apps", "Multi-currency"],
    color: "#4FC6FF",
  },
  {
    icon: Webhook,
    title: "API Development",
    desc: "RESTful and GraphQL APIs engineered for reliability — with auth, rate limiting, versioning, and full documentation.",
    tags: ["REST", "GraphQL", "Node.js", "Swagger"],
    color: "#4FC6FF",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Purpose-built desktop and web applications that replace spreadsheets and manual processes with precision automation.",
    tags: ["Python", "TypeScript", "Electron", "PostgreSQL"],
    color: "#1E4DA0",
  },
  {
    icon: Users,
    title: "CRM Systems",
    desc: "Custom CRM solutions that track leads, manage client relationships, automate follow-ups, and give your sales team clarity.",
    tags: ["Pipeline", "Lead Scoring", "Automations", "Reports"],
    color: "#1E4DA0",
  },
  {
    icon: LayoutDashboard,
    title: "ERP Systems",
    desc: "Industry-specific ERP for schools, hospitals, restaurants, distributors, shadi halls, and e-commerce operations.",
    tags: ["School", "Hospital", "Restaurant", "Distributor"],
    color: "#1E4DA0",
  },
  {
    icon: Wrench,
    title: "Custom Development",
    desc: "Have something specific in mind? We take on unique, complex builds that off-the-shelf tools simply can't handle.",
    tags: ["Scoping", "Architecture", "Build", "Deploy"],
    color: "#4FC6FF",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration & Automation",
    desc: "LLM-powered features, document intelligence, chatbots, and workflow automation baked into your existing systems.",
    tags: ["OpenAI", "LangChain", "RAG", "Automation"],
    color: "#1E4DA0",
  },
];

const marketingServices: Service[] = [
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    desc: "Strategy, content creation, scheduling, and community management across Instagram, Facebook, LinkedIn, and TikTok.",
    tags: ["Instagram", "LinkedIn", "TikTok", "Meta Ads"],
    color: "#1E4DA0",
  },
  {
    icon: SearchCheck,
    title: "SEO",
    desc: "Technical SEO audits, keyword strategy, on-page optimisation, and link building that actually moves rankings.",
    tags: ["On-page", "Technical", "Backlinks", "Local SEO"],
    color: "#4FC6FF",
  },
  {
    icon: ImagePlay,
    title: "Ad Creatives",
    desc: "High-converting static and video ad creatives for Google, Meta, TikTok, and programmatic — designed to stop the scroll.",
    tags: ["Google Ads", "Meta Ads", "Video", "A/B Testing"],
    color: "#1E4DA0",
  },
];

function ServiceCard({ svc, i }: { svc: Service; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.36) }}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 p-6 transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${svc.color}12 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${svc.color}18`, border: `1px solid ${svc.color}35` }}
      >
        <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
      </div>

      {/* Title + desc */}
      <h3 className="text-white font-bold text-base mb-2 leading-tight">{svc.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">{svc.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {svc.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: svc.color, backgroundColor: `${svc.color}15` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Learn more */}
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
        style={{ color: svc.color }}
      >
        Get a quote <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#060b16] border-y border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
            What We Build & Deliver
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            Full-Spectrum Digital Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From custom ERP systems and Shopify stores to AI integrations and performance marketing — we cover every layer of your digital operation.
          </p>
        </motion.div>

        {/* Dev + Tech group */}
        <div className="mb-6">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 px-3">
              Software & Development
            </span>
            <div className="h-px flex-1 bg-white/8" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devServices.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>
        </div>

        {/* Digital Marketing group */}
        <div>
          <motion.div
            className="flex items-center gap-3 mb-6 mt-10"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 px-3">
              Digital Marketing
            </span>
            <div className="h-px flex-1 bg-white/8" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {marketingServices.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/5 px-8 py-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div>
            <p className="text-white font-bold text-lg mb-1">Not sure what you need?</p>
            <p className="text-muted-foreground text-sm">Book a free discovery call — we'll scope the right solution for your budget and timeline.</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            Talk to an Expert <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
