import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import islamabadSkyline from "@/assets/skylines/islamabad.png";
import hullSkyline from "@/assets/skylines/hull.png";
import dubaiSkyline from "@/assets/skylines/dubai.png";

const offices = [
  {
    label: "Head Office",
    city: "Hull",
    country: "United Kingdom",
    flag: "🇬🇧",
    address: "Hull, East Yorkshire,\nUnited Kingdom",
    phone: "+44 7984 273482",
    email: "info@onesoft.org.uk",
    skyline: hullSkyline,
    accent: "#1E4DA0",
  },
  {
    label: "Gulf Office",
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    address: "Business Bay, Dubai,\nUnited Arab Emirates",
    phone: "+971 50 584 1517",
    email: "info@onesoft.org.uk",
    skyline: dubaiSkyline,
    accent: "#1E4DA0",
  },
  {
    label: "Pakistan Office",
    city: "Islamabad",
    country: "Pakistan",
    flag: "🇵🇰",
    address: "Islamabad,\nPakistan",
    phone: "+92 333 41 99 233",
    email: "info@onesoft.org.uk",
    skyline: islamabadSkyline,
    accent: "#4FC6FF",
  },
];

export function GlobalOffices() {
  return (
    <section className="py-24 bg-[#080d1a] relative overflow-hidden border-y border-white/8">
      {/* faint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
            Where We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Global Offices
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three countries across Europe, the Gulf & South Asia.
          </p>
        </motion.div>

        {/* Office cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {offices.map((office, i) => (
            <OfficeCard key={i} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfficeCard({ office }: { office: typeof offices[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center text-center px-6 py-8 group bg-[#080d1a] hover:bg-white/[0.02] transition-colors duration-300"
      data-testid={`office-card-${office.city.toLowerCase()}`}
    >
      {/* City skyline illustration */}
      <div className="relative w-full mb-6 overflow-hidden">
        <img
          src={office.skyline}
          alt={`${office.city} skyline`}
          className="w-full h-36 object-cover object-bottom mix-blend-lighten opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080d1a] to-transparent" />
      </div>

      {/* Label pill */}
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border mb-3"
        style={{
          color: office.accent,
          borderColor: `${office.accent}40`,
          backgroundColor: `${office.accent}15`,
        }}
      >
        {office.label}
      </span>

      {/* City + country */}
      <h3 className="text-xl font-bold text-white mb-0.5 tracking-tight">
        {office.city}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1.5 justify-center">
        <span>{office.flag}</span> {office.country}
      </p>

      {/* Divider */}
      <div
        className="w-10 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
        style={{ backgroundColor: office.accent }}
      />

      {/* Contact details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2 justify-center text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/70" />
          <span className="whitespace-pre-line leading-snug text-left">{office.address}</span>
        </div>
        <div className="flex items-center gap-2 justify-center text-muted-foreground">
          <Phone className="w-4 h-4 shrink-0 text-primary/70" />
          <span>{office.phone}</span>
        </div>
        <div className="flex items-center gap-2 justify-center text-muted-foreground">
          <Mail className="w-4 h-4 shrink-0 text-primary/70" />
          <span className="text-xs">{office.email}</span>
        </div>
      </div>
    </motion.div>
  );
}
