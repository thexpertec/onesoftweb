import { useState } from "react";
import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

type Client = {
  file: string;
  name: string;
  sector: string;
  flag: string;
  color: string;
};

const row1: Client[] = [
  { file: "nandos",      name: "Nando's",          sector: "Restaurant",   flag: "🇬🇧", color: "#dc2626" },
  { file: "greggs",      name: "Greggs",            sector: "Bakery",       flag: "🇬🇧", color: "#e97316" },
  { file: "fiveguys",    name: "Five Guys",         sector: "Restaurant",   flag: "🇺🇸", color: "#dc2626" },
  { file: "wingstop",    name: "Wingstop",          sector: "Restaurant",   flag: "🇺🇸", color: "#0891b2" },
  { file: "timhortons",  name: "Tim Hortons",       sector: "Café",         flag: "🇨🇦", color: "#dc2626" },
  { file: "pret",        name: "Pret A Manger",     sector: "Café",         flag: "🇬🇧", color: "#7c3aed" },
  { file: "subway",      name: "Subway",            sector: "Restaurant",   flag: "🌍", color: "#16a34a" },
  { file: "apollo",      name: "Apollo Hospitals",  sector: "Healthcare",   flag: "🇮🇳", color: "#0891b2" },
  { file: "kumon",       name: "Kumon",             sector: "Education",    flag: "🌍", color: "#2563eb" },
  { file: "berlitz",     name: "Berlitz",           sector: "Education",    flag: "🌍", color: "#0284c7" },
  { file: "spar",        name: "SPAR",              sector: "Retail",       flag: "🌍", color: "#16a34a" },
  { file: "bestwestern", name: "Best Western",      sector: "Hospitality",  flag: "🌍", color: "#2563eb" },
  { file: "papajohns",   name: "Papa John's",       sector: "Restaurant",   flag: "🇺🇸", color: "#dc2626" },
  { file: "dunkin",      name: "Dunkin'",           sector: "Café",         flag: "🇺🇸", color: "#ea580c" },
  { file: "morrisons",   name: "Morrisons",         sector: "Supermarket",  flag: "🇬🇧", color: "#16a34a" },
  { file: "costcutter",  name: "Costcutter",        sector: "Retail",       flag: "🇬🇧", color: "#dc2626" },
];

const row2: Client[] = [
  { file: "chipotle",    name: "Chipotle",          sector: "Restaurant",   flag: "🇺🇸", color: "#7c2d12" },
  { file: "shakeshack",  name: "Shake Shack",       sector: "Restaurant",   flag: "🇺🇸", color: "#16a34a" },
  { file: "cafenero",    name: "Caffè Nero",        sector: "Café",         flag: "🇬🇧", color: "#292524" },
  { file: "costa",       name: "Costa Coffee",      sector: "Café",         flag: "🇬🇧", color: "#7f1d1d" },
  { file: "lidl",        name: "Lidl",              sector: "Retail",       flag: "🌍", color: "#2563eb" },
  { file: "aldi",        name: "Aldi",              sector: "Retail",       flag: "🌍", color: "#1d4ed8" },
  { file: "fortis",      name: "Fortis Healthcare", sector: "Healthcare",   flag: "🇮🇳", color: "#0891b2" },
  { file: "metropolis",  name: "Metropolis Labs",   sector: "Diagnostics",  flag: "🇮🇳", color: "#7c3aed" },
  { file: "sysco",       name: "Sysco",             sector: "Distribution", flag: "🇺🇸", color: "#dc2626" },
  { file: "ihg",         name: "IHG Hotels",        sector: "Hospitality",  flag: "🌍", color: "#2563eb" },
  { file: "radisson",    name: "Radisson Hotels",   sector: "Hospitality",  flag: "🌍", color: "#1d4ed8" },
  { file: "poundland",   name: "Poundland",         sector: "Retail",       flag: "🇬🇧", color: "#ea580c" },
  { file: "boots",       name: "Boots",             sector: "Pharmacy",     flag: "🇬🇧", color: "#0891b2" },
  { file: "specsavers",  name: "Specsavers",        sector: "Healthcare",   flag: "🇬🇧", color: "#dc2626" },
  { file: "bupa",        name: "Bupa",              sector: "Healthcare",   flag: "🇬🇧", color: "#0091da" },
  { file: "gsk",         name: "GSK",               sector: "Pharma",       flag: "🇬🇧", color: "#f59e0b" },
];

function LogoCard({ client }: { client: Client }) {
  const [imgOk, setImgOk] = useState(true);
  const src = `${BASE}clients/${client.file}.png`;

  return (
    <div className="shrink-0 flex items-center gap-3.5 px-5 py-3.5 mx-2 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/18 transition-all duration-300 group cursor-default min-w-[190px]">
      {/* Logo box — white bg so any colour logo shows clearly */}
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
        {imgOk ? (
          <img
            src={src}
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

      {/* Company info */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors truncate leading-tight">
            {client.name}
          </p>
          <span className="text-sm leading-none shrink-0">{client.flag}</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: client.color }}>
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
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#070d1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#070d1a] to-transparent z-10 pointer-events-none" />
      <div
        className="flex py-1.5"
        style={{ animation: `${anim} ${duration}s linear infinite`, width: "max-content" }}
      >
        {doubled.map((c, i) => (
          <LogoCard key={`${c.file}-${i}`} client={c} />
        ))}
      </div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070d1a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent pointer-events-none" />

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
          Restaurants, hospitals, retailers, schools, and distributors — running on PowerTech every day.
        </p>
      </motion.div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <MarqueeRow clients={row1} direction="left"  duration={40} />
        <MarqueeRow clients={row2} direction="right" duration={45} />
      </motion.div>

      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {[
          { flag: "🇵🇰", label: "Pakistan" },
          { flag: "🇦🇪", label: "UAE" },
          { flag: "🇬🇧", label: "United Kingdom" },
          { flag: "🇮🇳", label: "India" },
          { flag: "🇺🇸", label: "USA" },
          { flag: "🇧🇩", label: "Bangladesh" },
        ].map((c, i, arr) => (
          <span key={c.label} className="flex items-center gap-2">
            <span>{c.flag} <span className="text-white/60 font-medium">{c.label}</span></span>
            {i < arr.length - 1 && <span className="text-white/15 hidden sm:inline">|</span>}
          </span>
        ))}
        <span className="text-white/15 hidden sm:inline">|</span>
        <span className="text-primary font-semibold">500+ organisations served</span>
      </motion.div>
    </section>
  );
}
