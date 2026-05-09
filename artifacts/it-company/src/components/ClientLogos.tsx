import { useState } from "react";
import { motion } from "framer-motion";

type Client = {
  domain: string;
  name: string;
  sector: string;
  flag: string;
  color: string;
};

const row1: Client[] = [
  { domain: "nandos.com",          name: "Nando's",           sector: "Restaurant",   flag: "🇬🇧", color: "#dc2626" },
  { domain: "greggs.co.uk",        name: "Greggs",            sector: "Bakery",       flag: "🇬🇧", color: "#e97316" },
  { domain: "fiveguys.com",        name: "Five Guys",         sector: "Restaurant",   flag: "🇺🇸", color: "#dc2626" },
  { domain: "wingstop.com",        name: "Wingstop",          sector: "Restaurant",   flag: "🇺🇸", color: "#0891b2" },
  { domain: "timhortons.com",      name: "Tim Hortons",       sector: "Café",         flag: "🇨🇦", color: "#dc2626" },
  { domain: "pret.com",            name: "Pret A Manger",     sector: "Café",         flag: "🇬🇧", color: "#7c3aed" },
  { domain: "subway.com",          name: "Subway",            sector: "Restaurant",   flag: "🌍", color: "#16a34a" },
  { domain: "apollohospitals.com", name: "Apollo Hospitals",  sector: "Healthcare",   flag: "🇮🇳", color: "#0891b2" },
  { domain: "kumon.com",           name: "Kumon",             sector: "Education",    flag: "🌍", color: "#2563eb" },
  { domain: "berlitz.com",         name: "Berlitz",           sector: "Education",    flag: "🌍", color: "#0284c7" },
  { domain: "spar.com",            name: "SPAR",              sector: "Retail",       flag: "🌍", color: "#16a34a" },
  { domain: "bestwestern.com",     name: "Best Western",      sector: "Hospitality",  flag: "🌍", color: "#2563eb" },
  { domain: "papajohns.com",       name: "Papa John's",       sector: "Restaurant",   flag: "🇺🇸", color: "#dc2626" },
  { domain: "dunkindonuts.com",    name: "Dunkin'",           sector: "Café",         flag: "🇺🇸", color: "#ea580c" },
  { domain: "morrisons.com",       name: "Morrisons",         sector: "Supermarket",  flag: "🇬🇧", color: "#16a34a" },
  { domain: "costcutter.co.uk",    name: "Costcutter",        sector: "Retail",       flag: "🇬🇧", color: "#dc2626" },
];

const row2: Client[] = [
  { domain: "chipotle.com",        name: "Chipotle",          sector: "Restaurant",   flag: "🇺🇸", color: "#7c2d12" },
  { domain: "shakeshack.com",      name: "Shake Shack",       sector: "Restaurant",   flag: "🇺🇸", color: "#16a34a" },
  { domain: "cafenero.com",        name: "Caffè Nero",        sector: "Café",         flag: "🇬🇧", color: "#292524" },
  { domain: "costa.co.uk",         name: "Costa Coffee",      sector: "Café",         flag: "🇬🇧", color: "#7f1d1d" },
  { domain: "lidl.com",            name: "Lidl",              sector: "Retail",       flag: "🌍", color: "#2563eb" },
  { domain: "aldi.com",            name: "Aldi",              sector: "Retail",       flag: "🌍", color: "#1d4ed8" },
  { domain: "fortishealthcare.com",name: "Fortis Healthcare", sector: "Healthcare",   flag: "🇮🇳", color: "#0891b2" },
  { domain: "metropolisindia.com", name: "Metropolis Labs",   sector: "Diagnostics",  flag: "🇮🇳", color: "#7c3aed" },
  { domain: "sysco.com",           name: "Sysco",             sector: "Distribution", flag: "🇺🇸", color: "#dc2626" },
  { domain: "ihg.com",             name: "IHG Hotels",        sector: "Hospitality",  flag: "🌍", color: "#2563eb" },
  { domain: "radissonhotels.com",  name: "Radisson Hotels",   sector: "Hospitality",  flag: "🌍", color: "#1d4ed8" },
  { domain: "poundland.co.uk",     name: "Poundland",         sector: "Retail",       flag: "🇬🇧", color: "#ea580c" },
  { domain: "gsk.com",             name: "GSK",               sector: "Pharma",       flag: "🇬🇧", color: "#f59e0b" },
  { domain: "bupa.co.uk",          name: "Bupa",              sector: "Healthcare",   flag: "🇬🇧", color: "#dc2626" },
  { domain: "specsavers.com",      name: "Specsavers",        sector: "Healthcare",   flag: "🇬🇧", color: "#dc2626" },
  { domain: "boots.com",           name: "Boots",             sector: "Pharmacy",     flag: "🇬🇧", color: "#0891b2" },
];

function LogoCard({ client }: { client: Client }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="shrink-0 flex items-center gap-3.5 px-5 py-3.5 mx-2 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/18 transition-all duration-300 group cursor-default min-w-[190px]">
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
        {imgOk ? (
          <img
            src={`https://logo.clearbit.com/${client.domain}`}
            alt={client.name}
            className="w-9 h-9 object-contain"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[10px] font-black tracking-tight"
            style={{ backgroundColor: client.color }}
          >
            {client.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate leading-tight">
            {client.name}
          </p>
          <span className="text-sm leading-none shrink-0">{client.flag}</span>
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
          style={{ color: client.color }}
        >
          {client.sector}
        </p>
      </div>
    </div>
  );
}

function MarqueeRow({
  clients,
  direction,
  duration,
}: {
  clients: Client[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...clients, ...clients];
  const anim = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070d1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070d1a] to-transparent z-10 pointer-events-none" />

      <div
        className="flex py-1.5"
        style={{
          animation: `${anim} ${duration}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((c, i) => (
          <LogoCard key={`${c.domain}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070d1a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12 px-4"
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
          Schools, hospitals, restaurants, distributors, and event venues — real businesses that rely on PowerTech every day.
        </p>
      </motion.div>

      {/* Two-row marquee */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <MarqueeRow clients={row1} direction="left"  duration={38} />
        <MarqueeRow clients={row2} direction="right" duration={42} />
      </motion.div>

      {/* Country flags strip */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span>🇵🇰 <span className="text-white/60 font-medium">Pakistan</span></span>
        <span className="text-white/15">|</span>
        <span>🇦🇪 <span className="text-white/60 font-medium">UAE</span></span>
        <span className="text-white/15">|</span>
        <span>🇬🇧 <span className="text-white/60 font-medium">United Kingdom</span></span>
        <span className="text-white/15">|</span>
        <span>🇮🇳 <span className="text-white/60 font-medium">India</span></span>
        <span className="text-white/15">|</span>
        <span>🇺🇸 <span className="text-white/60 font-medium">USA</span></span>
        <span className="text-white/15">|</span>
        <span>🇧🇩 <span className="text-white/60 font-medium">Bangladesh</span></span>
        <span className="text-white/15">|</span>
        <span className="text-primary font-semibold">500+ organisations served</span>
      </motion.div>
    </section>
  );
}
