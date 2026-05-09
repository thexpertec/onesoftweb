import { motion } from "framer-motion";
import {
  SiGoogle, SiApple, SiMeta, SiNetflix, SiSpotify, SiSlack,
  SiSalesforce, SiNvidia, SiIntel, SiSamsung, SiSony, SiSiemens,
  SiSap, SiHp, SiDell, SiCisco, SiQualcomm,
  SiVisa, SiMastercard, SiPaypal,
  SiTesla, SiBmw, SiToyota, SiVolkswagen, SiAudi, SiHyundai,
  SiNike, SiAdidas, SiIkea, SiWalmart, SiCocacola, SiStarbucks,
  SiMcdonalds, SiZara, SiAirbnb, SiUber
} from "react-icons/si";

type LogoItem = {
  Icon: React.ElementType;
  name: string;
  industry: string;
};

const logos: LogoItem[] = [
  { Icon: SiGoogle,     name: "Google",      industry: "Technology"   },
  { Icon: SiApple,      name: "Apple",        industry: "Technology"   },
  { Icon: SiMeta,       name: "Meta",         industry: "Technology"   },
  { Icon: SiNetflix,    name: "Netflix",      industry: "Entertainment"},
  { Icon: SiSpotify,    name: "Spotify",      industry: "Entertainment"},
  { Icon: SiSlack,      name: "Slack",        industry: "Technology"   },
  { Icon: SiSalesforce, name: "Salesforce",   industry: "Enterprise"   },
  { Icon: SiNvidia,     name: "Nvidia",       industry: "Technology"   },
  { Icon: SiIntel,      name: "Intel",        industry: "Technology"   },
  { Icon: SiSamsung,    name: "Samsung",      industry: "Electronics"  },
  { Icon: SiSony,       name: "Sony",         industry: "Electronics"  },
  { Icon: SiSiemens,    name: "Siemens",      industry: "Engineering"  },
  { Icon: SiSap,        name: "SAP",          industry: "Enterprise"   },
  { Icon: SiHp,         name: "HP",           industry: "Technology"   },
  { Icon: SiDell,       name: "Dell",         industry: "Technology"   },
  { Icon: SiCisco,      name: "Cisco",        industry: "Networking"   },
  { Icon: SiQualcomm,   name: "Qualcomm",     industry: "Technology"   },
  { Icon: SiVisa,       name: "Visa",         industry: "Finance"      },
  { Icon: SiMastercard, name: "Mastercard",   industry: "Finance"      },
  { Icon: SiPaypal,     name: "PayPal",       industry: "Finance"      },
  { Icon: SiTesla,      name: "Tesla",        industry: "Automotive"   },
  { Icon: SiBmw,        name: "BMW",          industry: "Automotive"   },
  { Icon: SiToyota,     name: "Toyota",       industry: "Automotive"   },
  { Icon: SiVolkswagen, name: "Volkswagen",   industry: "Automotive"   },
  { Icon: SiAudi,       name: "Audi",         industry: "Automotive"   },
  { Icon: SiHyundai,    name: "Hyundai",      industry: "Automotive"   },
  { Icon: SiNike,       name: "Nike",         industry: "Retail"       },
  { Icon: SiAdidas,     name: "Adidas",       industry: "Retail"       },
  { Icon: SiIkea,       name: "IKEA",         industry: "Retail"       },
  { Icon: SiWalmart,    name: "Walmart",      industry: "Retail"       },
  { Icon: SiCocacola,   name: "Coca-Cola",    industry: "FMCG"         },
  { Icon: SiStarbucks,  name: "Starbucks",    industry: "Food & Bev"   },
  { Icon: SiMcdonalds,  name: "McDonald's",   industry: "Food & Bev"   },
  { Icon: SiZara,       name: "Zara",         industry: "Fashion"      },
  { Icon: SiAirbnb,     name: "Airbnb",       industry: "Travel"       },
  { Icon: SiUber,       name: "Uber",         industry: "Transport"    },
];

const industryColors: Record<string, string> = {
  Technology:    "#2563eb",
  Entertainment: "#7c3aed",
  Enterprise:    "#0891b2",
  Electronics:   "#0284c7",
  Engineering:   "#059669",
  Networking:    "#d97706",
  Finance:       "#16a34a",
  Automotive:    "#dc2626",
  Retail:        "#db2777",
  FMCG:          "#ea580c",
  "Food & Bev":  "#65a30d",
  Fashion:       "#9333ea",
  Travel:        "#0ea5e9",
  Transport:     "#6d28d9",
};

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
            Global Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Powering Businesses Across Every Industry
          </h2>
          <p className="text-muted-foreground text-lg">
            From Silicon Valley tech giants to global automotive leaders, retailers, and financial institutions — the world's strongest brands run on proven technology.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } }
          }}
        >
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
              }}
              className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-primary/40 transition-all duration-300 cursor-default"
              data-testid={`logo-${logo.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              <logo.Icon
                className="w-7 h-7 text-white/30 group-hover:text-[var(--logo-color)] group-hover:scale-110 transition-all duration-300"
                style={{ "--logo-color": industryColors[logo.industry] ?? "#ffffff" } as React.CSSProperties}
              />
              <span className="text-[11px] font-medium text-white/30 group-hover:text-white/80 transition-colors text-center leading-tight">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="text-primary font-semibold">500+ organizations</span> across 40+ countries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
