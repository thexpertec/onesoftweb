import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

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
  flag: string;
  accent: string;
};

const members: Member[] = [
  { name: "Ahmed Raza",         role: "Head of Engineering",   photo: pk1,  flag: "🇵🇰", accent: "#16a34a" },
  { name: "Sara Malik",         role: "Lead UX Designer",      photo: pk2,  flag: "🇵🇰", accent: "#16a34a" },
  { name: "Tariq Hassan",       role: "Senior Backend Dev",    photo: pk3,  flag: "🇵🇰", accent: "#16a34a" },
  { name: "Khalid Al Mansoori", role: "Regional Director",     photo: uae1, flag: "🇦🇪", accent: "#ef4444" },
  { name: "Layla Al Farsi",     role: "Business Development",  photo: uae2, flag: "🇦🇪", accent: "#ef4444" },
  { name: "Omar Rashid",        role: "Solutions Architect",   photo: uae3, flag: "🇦🇪", accent: "#ef4444" },
  { name: "James Whitfield",    role: "CTO & Co-Founder",      photo: uk1,  flag: "🇬🇧", accent: "#2563eb" },
  { name: "Emily Carter",       role: "Product Manager",       photo: uk2,  flag: "🇬🇧", accent: "#2563eb" },
  { name: "Arjun Patel",        role: "Enterprise Consultant", photo: uk3,  flag: "🇬🇧", accent: "#2563eb" },
  { name: "Rafiqul Islam",      role: "Full-Stack Developer",  photo: bd1,  flag: "🇧🇩", accent: "#dc2626" },
  { name: "Nadia Akter",        role: "QA & DevOps Lead",      photo: bd2,  flag: "🇧🇩", accent: "#dc2626" },
  { name: "Kamal Hossain",      role: "ERP Specialist",        photo: bd3,  flag: "🇧🇩", accent: "#dc2626" },
];

const doubled = [...members, ...members];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300 shrink-0 w-56">
      <div className="h-1 w-full" style={{ backgroundColor: member.accent }} />
      <div className="p-6 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 rounded-full mb-4 overflow-hidden ring-2 ring-white/10 group-hover:ring-primary/50 transition-all duration-300">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm leading-none">
            {member.flag}
          </div>
        </div>
        <h3 className="text-white font-semibold text-base mb-1 leading-tight">{member.name}</h3>
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: member.accent }}>
          {member.role}
        </p>
      </div>
    </div>
  );
}

export function GlobalTeams() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
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
      </div>

      {/* Sliding carousel — full bleed */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex gap-5 w-max"
          style={{ animation: "marquee-left 40s linear infinite" }}
        >
          {doubled.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </div>

      {/* Office flags row */}
      <div className="container mx-auto px-4 mt-14">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { flag: "🇵🇰", country: "Pakistan",       city: "Lahore / Karachi" },
            { flag: "🇦🇪", country: "UAE",            city: "Dubai"            },
            { flag: "🇬🇧", country: "United Kingdom", city: "Hull"             },
            { flag: "🇧🇩", country: "Bangladesh",     city: "Dhaka"            },
          ].map((o, i) => (
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
