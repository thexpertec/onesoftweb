import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatarPhoto from "@/assets/team/pk-1.png";
import { useCTAModal } from "@/context/CTAModalContext";

export function StickyCTA() {
  const { openCTAModal } = useCTAModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    // Show after scrolling past the hero (~300px), hide when footer is in view
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
        }
      },
      { threshold: 0.01 }
    );
    footerObserver.observe(footer);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const footerRect = footer.getBoundingClientRect();
      const footerInView = footerRect.top < window.innerHeight;
      setVisible(scrollY > 320 && !footerInView);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      footerObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          data-testid="sticky-cta-bar"
        >
          {/* Glow line on top */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="bg-gradient-to-r from-[#0d1117] via-[#0f1f45] to-[#0d1117] border-t border-primary/30 backdrop-blur-md shadow-[0_-8px_40px_rgba(37,99,235,0.25)]">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">

                {/* Left: social proof */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-center px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-white mt-0.5">4.9 / 5.0</span>
                    <span className="text-[9px] text-white/50 uppercase tracking-wider">500+ Clients</span>
                  </div>
                </div>

                {/* Centre: avatar + text */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={avatarPhoto}
                      alt="PowerTech team"
                      className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-primary/60"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight">
                      Hi, we're <span className="text-primary">PowerTech.</span>
                    </p>
                    <p className="text-white/60 text-xs truncate">
                      Schedule a call to discover smarter ways to build &amp; grow your business.
                    </p>
                  </div>
                </div>

                {/* Right: CTA button */}
                <Button
                  size="sm"
                  className="shrink-0 h-10 px-5 text-sm font-semibold shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-shadow"
                  data-testid="btn-sticky-cta"
                  onClick={() => openCTAModal()}
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  Book My Call
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
