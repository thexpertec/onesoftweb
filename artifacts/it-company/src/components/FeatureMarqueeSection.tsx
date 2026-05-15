import { useTheme } from "@/context/ThemeContext";

type FeatureItem = {
  icon: string;
  label: string;
  color: string;
};

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
  isLight,
}: {
  items: FeatureItem[];
  direction?: "left" | "right";
  speed?: number;
  isLight: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1.5">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-default group shrink-0"
            style={{
              background: isLight ? "#ffffff" : "rgba(255,255,255,0.04)",
              borderColor: isLight ? "#F5F5F5" : "rgba(255,255,255,0.10)",
            }}
          >
            <span className="text-base shrink-0 transition-transform duration-300 group-hover:scale-110 inline-block">{item.icon}</span>
            <span
              className="text-sm font-medium whitespace-nowrap transition-colors"
              style={{ color: isLight ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.65)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  accentColor: string;
  heading: string;
  subheading: string;
  row1: FeatureItem[];
  row2: FeatureItem[];
  row3: FeatureItem[];
};

export function FeatureMarqueeSection({ accentColor, heading, subheading, row1, row2, row3 }: Props) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className="py-16 relative overflow-hidden border-y"
      style={{
        background: isLight ? "#FFFFFF" : "rgba(0,0,0,0.3)",
        borderColor: isLight ? "#F5F5F5" : "rgba(255,255,255,0.07)",
      }}
    >
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <span
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-3 block"
          style={{ color: accentColor }}
        >
          Complete Feature Suite
        </span>
        <h2
          className="text-3xl md:text-4xl font-black mb-3"
          style={{ color: isLight ? "#0f172a" : "#ffffff" }}
        >
          {heading}
        </h2>
        <p
          className="max-w-xl mx-auto text-base"
          style={{ color: isLight ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.5)" }}
        >
          {subheading}
        </p>
      </div>

      <div
        className="relative z-10 space-y-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <MarqueeRow items={row1} direction="left"  speed={45} isLight={isLight} />
        <MarqueeRow items={row2} direction="right" speed={38} isLight={isLight} />
        <MarqueeRow items={row3} direction="left"  speed={50} isLight={isLight} />
      </div>
    </div>
  );
}
