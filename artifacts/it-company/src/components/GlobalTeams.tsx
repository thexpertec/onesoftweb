import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users } from "lucide-react";

import pk1 from "@/assets/team/pk-1.png";
import pk2 from "@/assets/team/pk-2.png";
import pk3 from "@/assets/team/pk-3.png";
import uae1 from "@/assets/team/uae-1.png";
import uae2 from "@/assets/team/uae-2.png";
import uae3 from "@/assets/team/uae-3.png";
import uk1 from "@/assets/team/uk-1.png";
import uk2 from "@/assets/team/uk-2.png";
import uk3 from "@/assets/team/uk-3.png";
import bd1 from "@/assets/team/bd-1.png";
import bd2 from "@/assets/team/bd-2.png";
import bd3 from "@/assets/team/bd-3.png";

type Member = {
  name: string;
  role: string;
  photo: string;
};

type Office = {
  country: string;
  city: string;
  flag: string;
  accent: string;
  members: Member[];
};

const offices: Office[] = [
  {
    country: "Pakistan",
    city: "Lahore / Karachi",
    flag: "🇵🇰",
    accent: "#16a34a",
    members: [
      { name: "Ahmed Raza",     role: "Head of Engineering",   photo: pk1 },
      { name: "Sara Malik",     role: "Lead UX Designer",      photo: pk2 },
      { name: "Tariq Hassan",   role: "Senior Backend Dev",    photo: pk3 },
    ],
  },
  {
    country: "UAE",
    city: "Dubai",
    flag: "🇦🇪",
    accent: "#ef4444",
    members: [
      { name: "Khalid Al Mansoori", role: "Regional Director",       photo: uae1 },
      { name: "Layla Al Farsi",     role: "Business Development",    photo: uae2 },
      { name: "Omar Rashid",        role: "Solutions Architect",     photo: uae3 },
    ],
  },
  {
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    accent: "#2563eb",
    members: [
      { name: "James Whitfield",  role: "CTO & Co-Founder",     photo: uk1 },
      { name: "Emily Carter",     role: "Product Manager",       photo: uk2 },
      { name: "Arjun Patel",      role: "Enterprise Consultant", photo: uk3 },
    ],
  },
  {
    country: "Bangladesh",
    city: "Dhaka",
    flag: "🇧🇩",
    accent: "#dc2626",
    members: [
      { name: "Rafiqul Islam",  role: "Full-Stack Developer",  photo: bd1 },
      { name: "Nadia Akter",    role: "QA & DevOps Lead",      photo: bd2 },
      { name: "Kamal Hossain",  role: "ERP Specialist",        photo: bd3 },
    ],
  },
];

export function GlobalTeams() {
  const [active, setActive] = useState(0);
  const office = offices[active];

  return (
    <section className="py-24 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
            Our Global Presence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Meet the Teams Behind the Tech
          </h2>
          <p className="text-muted-foreground text-lg">
            Four offices. One mission. A globally distributed team of engineers, designers, and strategists building world-class software.
          </p>
        </motion.div>

        {/* Country tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {offices.map((o, i) => (
            <button
              key={i}
              data-testid={`tab-team-${o.country.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                active === i
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                  : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              <span className="text-base">{o.flag}</span>
              {o.country}
            </button>
          ))}
        </div>

        {/* Office panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Office info bar */}
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: office.accent }}
              />
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-white/70 text-sm font-medium">{office.city}</span>
              <span className="text-white/20">·</span>
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-white/70 text-sm font-medium">{office.members.length} team members shown</span>
            </div>

            {/* Member cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {office.members.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300"
                  data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* Accent top bar */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: office.accent }}
                  />

                  <div className="p-6 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div
                      className="relative w-24 h-24 rounded-full mb-4 overflow-hidden ring-2 ring-white/10 group-hover:ring-primary/50 transition-all duration-300"
                    >
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Flag badge */}
                      <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm leading-none">
                        {office.flag}
                      </div>
                    </div>

                    <h3 className="text-white font-semibold text-base mb-1">{member.name}</h3>
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: office.accent }}
                    >
                      {member.role}
                    </p>
                    <p className="text-white/40 text-xs mt-1">{office.country}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom stat row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {offices.map((o, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border border-white/8 bg-white/[0.03]"
            >
              <span className="text-2xl">{o.flag}</span>
              <span className="text-white text-sm font-semibold">{o.country}</span>
              <span className="text-xs text-muted-foreground">{o.city}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
