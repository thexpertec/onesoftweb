import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";

import dashSchoolHospital from "@/assets/dash-school-hospital.png";
import dashAnalytics from "@/assets/dash-analytics.jpg";
import dashGraphs from "@/assets/dash-graphs.jpg";
import dashCharts from "@/assets/dash-charts.jpg";
import dashFinance from "@/assets/dash-finance.jpg";
import dashEcom from "@/assets/dash-ecom.jpg";
import schoolErp from "@/assets/school-erp.png";
import hospitalErp from "@/assets/hospital-erp.png";
import ecommerceErp from "@/assets/ecommerce-erp.png";

type Slide = {
  src: string;
  label: string;
  tag: string;
  tagColor: string;
  wide?: boolean;
};

const slides: Slide[] = [
  { src: dashSchoolHospital, label: "School & Hospital ERP",       tag: "Live View",     tagColor: "#16a34a",  wide: true  },
  { src: schoolErp,          label: "School Management System",    tag: "Education",     tagColor: "#2563eb"               },
  { src: dashAnalytics,      label: "Business Analytics Dashboard",tag: "Analytics",     tagColor: "#7c3aed"               },
  { src: hospitalErp,        label: "Hospital OPD & IPD Modules",  tag: "Healthcare",    tagColor: "#0891b2"               },
  { src: dashGraphs,         label: "Sales & Revenue Reports",     tag: "Finance",       tagColor: "#d97706"               },
  { src: ecommerceErp,       label: "E-commerce ERP Suite",        tag: "E-commerce",    tagColor: "#ea580c"               },
  { src: dashCharts,         label: "KPI & Metrics Overview",      tag: "Intelligence",  tagColor: "#8b5cf6"               },
  { src: dashFinance,        label: "Distributor & Wholesale ERP", tag: "Distribution",  tagColor: "#0284c7"               },
  { src: dashEcom,           label: "Restaurant & POS System",     tag: "Restaurant",    tagColor: "#65a30d"               },
];

const SLIDE_HEIGHT = 380; // px — all images same height

export function DashboardSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [active, setActive] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollBy = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * 520, behavior: "smooth" });
  };

  const scrollToSlide = (i: number) => {
    setActive(i);
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 32, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#04080f] border-y border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/6 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Monitor className="w-3.5 h-3.5" />
              Real Product Screenshots
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              See Our Systems in Action
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Actual views from our deployed ERP platforms — not mockups.
            </p>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white disabled:opacity-25 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white disabled:opacity-25 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scrollable track — full bleed with edge fades */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#04080f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#04080f] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pl-8 pr-8 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              onClick={() => scrollToSlide(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.4) }}
              className={`group relative rounded-xl overflow-hidden border cursor-pointer shrink-0 transition-all duration-300 ${
                active === i
                  ? "border-primary/60 shadow-lg shadow-primary/10"
                  : "border-white/10 hover:border-white/25"
              }`}
              style={{
                height: `${SLIDE_HEIGHT}px`,
                width: slide.wide ? `${Math.round(SLIDE_HEIGHT * 1.95)}px` : `${Math.round(SLIDE_HEIGHT * 1.42)}px`,
              }}
            >
              {/* Dark hover overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-400 z-10" />

              <img
                src={slide.src}
                alt={slide.label}
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom label */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20" />
              <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
                  style={{ color: slide.tagColor, backgroundColor: `${slide.tagColor}22` }}
                >
                  {slide.tag}
                </span>
                <span className="text-white font-semibold text-sm drop-shadow leading-tight">
                  {slide.label}
                </span>
              </div>

              {/* Active indicator */}
              {active === i && (
                <div className="absolute top-3 right-3 z-30 w-2 h-2 rounded-full bg-primary shadow-md shadow-primary/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-5 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
