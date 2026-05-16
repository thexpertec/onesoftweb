import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import pk1 from "@/assets/team/pk-1.png";
import pk2 from "@/assets/team/pk-2.png";
import pk3 from "@/assets/team/pk-3.png";
import pk4 from "@/assets/team/pk-4.png";
import pk5 from "@/assets/team/pk-5.png";
import pk6 from "@/assets/team/pk-6.png";
import pk7 from "@/assets/team/pk-7.png";
import pk8 from "@/assets/team/pk-8.png";
import pk9 from "@/assets/team/pk-9.png";
import uae1 from "@/assets/team/uae-1.png";
import uae2 from "@/assets/team/uae-2.png";
import uae3 from "@/assets/team/uae-3.png";
import uk1 from "@/assets/team/uk-1.png";
import uk2 from "@/assets/team/uk-2.png";
import uk3 from "@/assets/team/uk-3.png";
import bd1 from "@/assets/team/bd-1.png";

type Member = {
  name: string;
  role: string;
  photo: string;
  flag: string;
  accent: string;
};

/* ── Unified team — same 16 people as OurTeamPage + leadership ── */
const members: Member[] = [
  /* Leadership */
  { name: "Zain ul Abideen",  role: "Founder & CEO",              photo: uk1,  flag: "🇬🇧", accent: "#1E4DA0" },
  { name: "Aisha Mahmood",    role: "Chief Technology Officer",    photo: pk1,  flag: "🇵🇰", accent: "#1E4DA0" },
  { name: "Omar Farooq",      role: "Chief Operating Officer",     photo: uae1, flag: "🇦🇪", accent: "#1E4DA0" },
  { name: "Sara Nawaz",       role: "Head of Design",              photo: uk2,  flag: "🇬🇧", accent: "#1E4DA0" },
  /* Islamabad team */
  { name: "Bilal Hussain",    role: "Lead Backend Engineer",       photo: pk2,  flag: "🇵🇰", accent: "#1E4DA0" },
  { name: "Fatima Riaz",      role: "Full-Stack Developer",        photo: pk3,  flag: "🇵🇰", accent: "#1E4DA0" },
  { name: "Tariq Saleem",     role: "ERP Specialist",              photo: pk4,  flag: "🇵🇰", accent: "#1E4DA0" },
  { name: "Nadia Khan",       role: "AI & Automation Engineer",    photo: pk5,  flag: "🇵🇰", accent: "#1E4DA0" },
  { name: "Hassan Qureshi",   role: "DevOps & Infrastructure",     photo: pk6,  flag: "🇵🇰", accent: "#1E4DA0" },
  /* Hull team */
  { name: "Mariam Yousaf",    role: "Frontend Developer",          photo: uk3,  flag: "🇬🇧", accent: "#1E4DA0" },
  { name: "James Whitfield",  role: "SEO Strategist",              photo: pk7,  flag: "🇬🇧", accent: "#1E4DA0" },
  { name: "Priya Menon",      role: "Digital Marketing Manager",   photo: pk8,  flag: "🇬🇧", accent: "#1E4DA0" },
  { name: "Adam Thornton",    role: "Project Manager",             photo: pk9,  flag: "🇬🇧", accent: "#1E4DA0" },
  /* Dubai team */
  { name: "Khalid Al-Rashid", role: "Client Success Manager",      photo: uae2, flag: "🇦🇪", accent: "#1E4DA0" },
  { name: "Leila Abubakar",   role: "Business Development",        photo: uae3, flag: "🇦🇪", accent: "#1E4DA0" },
  { name: "Rania Hashim",     role: "Creative Director",           photo: bd1,  flag: "🇦🇪", accent: "#1E4DA0" },
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
    <section className="py-8 md:py-10 lg:py-[60px] relative overflow-hidden border-y border-white/10">
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
            Our Global Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Meet the People Behind OneSoft
          </h2>
          <p className="text-muted-foreground text-lg">
            Three offices. One mission. Engineers, designers, and strategists in Hull, Dubai, and Islamabad — building world-class software together.
          </p>
        </motion.div>
      </div>

      {/* Sliding carousel — full bleed */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex gap-5 w-max"
          style={{ animation: "marquee-left 55s linear infinite" }}
        >
          {doubled.map((member, i) => (
            <MemberCard key={i} member={member} />
          ))}
        </div>
      </div>

    </section>
  );
}
