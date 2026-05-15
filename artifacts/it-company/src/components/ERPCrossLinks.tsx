import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ALL_PRODUCTS = [
  { label: "School ERP",      href: "/school",      emoji: "🎓" },
  { label: "Hospital ERP",    href: "/hospital",    emoji: "🏥" },
  { label: "Restaurant ERP",  href: "/restaurant",  emoji: "🍽️" },
  { label: "E-commerce ERP",  href: "/ecommerce",   emoji: "🛒" },
  { label: "Distributor ERP", href: "/distributor", emoji: "📦" },
  { label: "Shadi Hall ERP",  href: "/shadi-hall",  emoji: "💒" },
  { label: "Accounting ERP",  href: "/accounting",  emoji: "📊" },
];

export function ERPCrossLinks({ current }: { current: string }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const others = ALL_PRODUCTS.filter(p => p.href !== current);

  const sectionBg   = isLight ? "#F5F5F5"           : "#04091a";
  const divider     = isLight ? "rgba(0,0,0,0.08)"  : "rgba(255,255,255,0.08)";
  const pillBg      = isLight ? "#ffffff"            : "rgba(255,255,255,0.04)";
  const pillBorder  = isLight ? "rgba(0,0,0,0.1)"   : "rgba(255,255,255,0.1)";
  const pillText    = isLight ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.8)";
  const headingText = isLight ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.35)";

  return (
    <section
      className="py-14 border-t"
      style={{ background: sectionBg, borderColor: divider }}
    >
      <div className="container mx-auto px-4">
        <p
          className="text-center text-[11px] font-bold uppercase tracking-widest mb-8"
          style={{ color: headingText }}
        >
          Explore Our Other ERP Systems
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {others.map(p => (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                background: pillBg,
                borderColor: pillBorder,
                color: pillText,
              }}
            >
              <span className="text-base leading-none">{p.emoji}</span>
              {p.label}
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
