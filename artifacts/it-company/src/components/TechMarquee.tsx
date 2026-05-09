import {
  SiReact, SiTypescript, SiNodedotjs, SiPython, SiPostgresql, SiRedis,
  SiDocker, SiNextdotjs, SiVuedotjs, SiLaravel, SiPhp, SiMongodb,
  SiGraphql, SiTailwindcss, SiGit, SiKubernetes, SiNginx, SiMysql,
  SiWordpress, SiStripe, SiFirebase, SiGooglecloud, SiDigitalocean,
  SiFigma, SiVercel, SiCloudflare, SiGithub, SiLinux, SiBootstrap,
  SiTerraform, SiJest, SiPrisma, SiGo, SiRust, SiElasticsearch,
  SiJenkins, SiApache, SiSass, SiWebpack
} from "react-icons/si";

type TechItem = {
  Icon: React.ElementType;
  name: string;
  color: string;
};

const row1: TechItem[] = [
  { Icon: SiReact,         name: "React",        color: "#61DAFB" },
  { Icon: SiTypescript,    name: "TypeScript",   color: "#3178C6" },
  { Icon: SiNodedotjs,     name: "Node.js",      color: "#339933" },
  { Icon: SiPython,        name: "Python",       color: "#3776AB" },
  { Icon: SiPostgresql,    name: "PostgreSQL",   color: "#4169E1" },
  { Icon: SiRedis,         name: "Redis",        color: "#DC382D" },
  { Icon: SiDocker,        name: "Docker",       color: "#2496ED" },
  { Icon: SiDigitalocean,  name: "Cloud",        color: "#0080FF" },
  { Icon: SiNextdotjs,     name: "Next.js",      color: "#ffffff" },
  { Icon: SiGo,            name: "Go",           color: "#00ADD8" },
];

const row2: TechItem[] = [
  { Icon: SiLaravel,       name: "Laravel",      color: "#FF2D20" },
  { Icon: SiPhp,           name: "PHP",          color: "#777BB4" },
  { Icon: SiMongodb,       name: "MongoDB",      color: "#47A248" },
  { Icon: SiGraphql,       name: "GraphQL",      color: "#E10098" },
  { Icon: SiTailwindcss,   name: "Tailwind",     color: "#06B6D4" },
  { Icon: SiGit,           name: "Git",          color: "#F05032" },
  { Icon: SiLinux,         name: "Linux",        color: "#FCC624" },
  { Icon: SiKubernetes,    name: "Kubernetes",   color: "#326CE5" },
  { Icon: SiNginx,         name: "Nginx",        color: "#009639" },
  { Icon: SiMysql,         name: "MySQL",        color: "#4479A1" },
];

const row3: TechItem[] = [
  { Icon: SiWordpress,     name: "WordPress",    color: "#21759B" },
  { Icon: SiStripe,        name: "Stripe",       color: "#635BFF" },
  { Icon: SiFirebase,      name: "Firebase",     color: "#FFCA28" },
  { Icon: SiGooglecloud,   name: "Google Cloud", color: "#4285F4" },
  { Icon: SiTerraform,     name: "Terraform",    color: "#7B42BC" },
  { Icon: SiBootstrap,     name: "Bootstrap",    color: "#7952B3" },
  { Icon: SiFigma,         name: "Figma",        color: "#F24E1E" },
  { Icon: SiVercel,        name: "Vercel",       color: "#ffffff" },
  { Icon: SiCloudflare,    name: "Cloudflare",   color: "#F38020" },
  { Icon: SiGithub,        name: "GitHub",       color: "#ffffff" },
];

function MarqueeTrack({
  items,
  direction = "left",
  speed = 35,
}: {
  items: TechItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 cursor-default group shrink-0"
          >
            <tech.Icon
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-125"
              style={{ color: tech.color }}
            />
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-white/10 bg-black/60">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
          Our Technology Stack
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Technologies We Master
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          From frontend to infrastructure, we command every layer of the modern tech stack — so you don't have to.
        </p>
      </div>

      <div className="relative z-10 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeTrack items={row1} direction="left"  speed={40} />
        <MarqueeTrack items={row2} direction="right" speed={36} />
        <MarqueeTrack items={row3} direction="left"  speed={44} />
      </div>
    </section>
  );
}
