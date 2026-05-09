import { motion } from "framer-motion";

type Client = {
  initials: string;
  name: string;
  industry: string;
  location: string;
  color: string;
};

const clients: Client[] = [
  { initials: "BPS", name: "Beaconhouse Group",      industry: "Education",     location: "Pakistan",  color: "#2563eb" },
  { initials: "CMS", name: "City Medical Centre",    industry: "Healthcare",    location: "UK",        color: "#059669" },
  { initials: "HMG", name: "Ha-Meem Group",          industry: "Retail & Dist", location: "Bangladesh",color: "#dc2626" },
  { initials: "RKR", name: "Ravi Kitchen & Grill",   industry: "Restaurant",    location: "Pakistan",  color: "#ea580c" },
  { initials: "ICT", name: "ICT Division",           industry: "Technology",    location: "Bangladesh",color: "#7c3aed" },
  { initials: "ALN", name: "Al-Noor Hospital",       industry: "Healthcare",    location: "UAE",       color: "#0891b2" },
  { initials: "GDM", name: "GDM Group",              industry: "Distribution",  location: "UK",        color: "#0284c7" },
  { initials: "SFT", name: "Softech Solutions",      industry: "Technology",    location: "Pakistan",  color: "#6d28d9" },
  { initials: "PAL", name: "Pearl Continental Ltd",  industry: "Hospitality",   location: "Pakistan",  color: "#b45309" },
  { initials: "DBK", name: "Dubai Baker's Co.",      industry: "Food & Bev",    location: "UAE",       color: "#65a30d" },
  { initials: "SXM", name: "Siglo XXI Centro",       industry: "Healthcare",    location: "UK",        color: "#0e7490" },
  { initials: "CIT", name: "CIT Technologies",       industry: "IT Services",   location: "Bangladesh",color: "#4338ca" },
  { initials: "FAR", name: "Farhan Distributors",    industry: "Distribution",  location: "Pakistan",  color: "#15803d" },
  { initials: "MJH", name: "Majestic Hall Events",   industry: "Event Venue",   location: "UAE",       color: "#be185d" },
  { initials: "GLC", name: "Global Care Clinic",     industry: "Healthcare",    location: "UK",        color: "#059669" },
  { initials: "KAR", name: "Karachi Traders Co.",    industry: "Wholesale",     location: "Pakistan",  color: "#b45309" },
  { initials: "AHS", name: "Al-Hassan School",       industry: "Education",     location: "UAE",       color: "#2563eb" },
  { initials: "UNI", name: "UniMart Online",         industry: "E-commerce",    location: "UK",        color: "#7c3aed" },
  { initials: "STR", name: "Star Restaurant Group",  industry: "Restaurant",    location: "Bangladesh",color: "#ea580c" },
  { initials: "DXB", name: "DXB Business Hub",       industry: "Corporate",     location: "UAE",       color: "#0891b2" },
  { initials: "HYD", name: "Hyder & Sons Ltd",       industry: "Wholesale",     location: "Pakistan",  color: "#dc2626" },
  { initials: "NVS", name: "Nova Supplies UK",       industry: "Distribution",  location: "UK",        color: "#0284c7" },
  { initials: "QFD", name: "Qatar Food Depot",       industry: "Food & Bev",    location: "UAE",       color: "#65a30d" },
  { initials: "SKL", name: "Skill Academy BD",       industry: "Education",     location: "Bangladesh",color: "#4338ca" },
  { initials: "OPT", name: "OptimaCare Hospital",    industry: "Healthcare",    location: "Pakistan",  color: "#059669" },
  { initials: "MNR", name: "Manara Events Hall",     industry: "Event Venue",   location: "UAE",       color: "#be185d" },
  { initials: "TPL", name: "Tulip Pharma Ltd",       industry: "Pharma",        location: "Bangladesh",color: "#0e7490" },
  { initials: "BRK", name: "Brookside Academy",      industry: "Education",     location: "UK",        color: "#2563eb" },
  { initials: "KFC", name: "Khyber Food Chain",      industry: "Restaurant",    location: "Pakistan",  color: "#ea580c" },
  { initials: "ESH", name: "Emirates Star Hotel",    industry: "Hospitality",   location: "UAE",       color: "#b45309" },
  { initials: "LAB", name: "LabPlus Diagnostics",    industry: "Healthcare",    location: "UK",        color: "#059669" },
  { initials: "AZZ", name: "Azzam Wholesale",        industry: "Wholesale",     location: "UAE",       color: "#15803d" },
];

export function ClientLogos() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Trusted by Growing Businesses Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Schools, hospitals, restaurants, distributors, and event venues — real businesses that run on PowerTech ERP every day.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } }
          }}
        >
          {clients.map((client, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
              }}
              className="group flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-default"
              data-testid={`logo-${client.initials.toLowerCase()}`}
            >
              {/* Initials badge */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-wider shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${client.color}22`, border: `1px solid ${client.color}55` }}
              >
                <span style={{ color: client.color }}>{client.initials}</span>
              </div>

              {/* Name */}
              <span className="text-[11px] font-semibold text-white/55 group-hover:text-white/90 transition-colors text-center leading-tight">
                {client.name}
              </span>

              {/* Industry tag */}
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                style={{
                  color: client.color,
                  backgroundColor: `${client.color}18`,
                }}
              >
                {client.industry}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>🇵🇰 <span className="text-white/60 font-medium">Pakistan</span></span>
          <span className="hidden sm:block text-white/15">|</span>
          <span>🇦🇪 <span className="text-white/60 font-medium">UAE</span></span>
          <span className="hidden sm:block text-white/15">|</span>
          <span>🇬🇧 <span className="text-white/60 font-medium">United Kingdom</span></span>
          <span className="hidden sm:block text-white/15">|</span>
          <span>🇧🇩 <span className="text-white/60 font-medium">Bangladesh</span></span>
          <span className="hidden sm:block text-white/15">|</span>
          <span className="text-primary font-semibold">500+ organizations served</span>
        </motion.div>
      </div>
    </section>
  );
}
