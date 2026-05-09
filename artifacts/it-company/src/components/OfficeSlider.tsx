import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import office1 from "@/assets/office/office-1.jpg";
import office2 from "@/assets/office/office-2.jpg";
import office3 from "@/assets/office/office-3.jpg";
import office4 from "@/assets/office/office-4.jpg";
import office5 from "@/assets/office/office-5.jpg";
import office6 from "@/assets/office/office-6.jpg";
import office7 from "@/assets/office/office-7.jpg";
import office8 from "@/assets/office/office-8.jpg";
import office9 from "@/assets/office/office-9.jpg";
import office10 from "@/assets/office/office-10.jpg";
import office11 from "@/assets/office/office-11.jpg";
import office12 from "@/assets/office/office-12.jpg";

const slides = [
  { src: office1,  caption: "Our compact workspace in Hull — small team, big ambitions" },
  { src: office2,  caption: "Morning stand-up — the whole team in one room" },
  { src: office3,  caption: "Quick whiteboard session before a client call" },
  { src: office4,  caption: "Two heads on a problem — how most of our best ideas start" },
  { src: office5,  caption: "Focused work hours — everyone heads-down on delivery" },
  { src: office6,  caption: "Our corner of Hull — a small office that ships world-class software" },
  { src: office7,  caption: "Reviewing a new ERP module together before release" },
  { src: office8,  caption: "Pair programming session — how we keep code quality high" },
  { src: office9,  caption: "A coffee and a quick retro — always room to improve" },
  { src: office10, caption: "Client demo prep — everyone chips in" },
  { src: office11, caption: "Architecture review: small team, clear ownership" },
  { src: office12, caption: "End of a good sprint — shipped, tested, deployed" },
];

export function OfficeSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);

  useEffect(() => {
    const t = setTimeout(next, 4500);
    return () => clearTimeout(t);
  }, [current, next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#060b16] border-y border-white/8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            <MapPin className="w-3.5 h-3.5" />
            Hull, United Kingdom — Head Office
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our Hull Office
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A small, focused team working from Hull, East Yorkshire — managing UK client relationships, product direction, and company strategy.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main image frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black shadow-2xl shadow-black/60 border border-white/10">
            <AnimatePresence custom={direction} initial={false}>
              <motion.img
                key={current}
                src={slides[current].src}
                alt={slides[current].caption}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent z-10" />

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current + "-cap"}
                className="absolute bottom-5 left-6 right-20 z-20 text-sm text-white/80 font-medium"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {slides[current].caption}
              </motion.p>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary/70 hover:border-primary transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary/70 hover:border-primary transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-5 overflow-x-auto pb-1 scrollbar-hide">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? "border-primary opacity-100 scale-100"
                    : "border-white/10 opacity-50 hover:opacity-75 scale-95"
                }`}
              >
                <img
                  src={slide.src}
                  alt=""
                  className="w-24 h-14 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
