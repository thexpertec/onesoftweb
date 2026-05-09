import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCTAModal } from "@/context/CTAModalContext";

export function CTAStrip() {
  const { openCTAModal } = useCTAModal();

  return (
    <section id="cta-strip" className="py-14 relative overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/5 skew-x-[-12deg] translate-x-16 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-tight">Get a free ERP consultation</p>
              <p className="text-white/70 text-sm mt-0.5">No commitment. Response within 24 hours.</p>
            </div>
          </div>

          <button
            onClick={() => openCTAModal("General Enquiry")}
            className="shrink-0 flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-primary font-bold text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
