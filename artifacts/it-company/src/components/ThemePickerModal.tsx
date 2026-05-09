import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Zap, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const SESSION_KEY = "pt-theme-chosen";

export function ThemePickerModal() {
  const [visible, setVisible] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const chosen = sessionStorage.getItem(SESSION_KEY);
    if (!chosen) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (t: "dark" | "light") => {
    setTheme(t);
    sessionStorage.setItem(SESSION_KEY, t);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Card */}
            <div className="rounded-3xl border border-white/12 bg-[#0d1526] shadow-2xl shadow-black/60 overflow-hidden">
              {/* Top accent line */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-violet-500" />

              <div className="p-8">
                {/* Logo + heading */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1.5">Choose your experience</h2>
                  <p className="text-sm text-white/50">
                    Pick the theme that works best for you — you can't change it mid-visit.
                  </p>
                </div>

                {/* Two choice cards */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Dark */}
                  <button
                    onClick={() => choose("dark")}
                    className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/50 transition-all duration-200 text-center"
                  >
                    {/* Preview swatch */}
                    <div className="w-full h-20 rounded-xl bg-[#070d1a] border border-white/10 overflow-hidden relative mb-1 flex flex-col justify-end p-2">
                      <div className="w-full h-1.5 rounded-full bg-blue-600/60 mb-1.5" />
                      <div className="flex gap-1">
                        <div className="h-1.5 rounded w-10 bg-white/20" />
                        <div className="h-1.5 rounded w-6 bg-white/10" />
                      </div>
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-blue-600/40 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-blue-400/80" />
                      </div>
                    </div>
                    <Moon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-bold text-white">Dark Theme</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Easy on the eyes</p>
                    </div>
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </button>

                  {/* Light */}
                  <button
                    onClick={() => choose("light")}
                    className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-400/50 transition-all duration-200 text-center"
                  >
                    {/* Preview swatch */}
                    <div className="w-full h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative mb-1 flex flex-col justify-end p-2">
                      <div className="w-full h-1.5 rounded-full bg-blue-600/70 mb-1.5" />
                      <div className="flex gap-1">
                        <div className="h-1.5 rounded w-10 bg-slate-400/40" />
                        <div className="h-1.5 rounded w-6 bg-slate-300/40" />
                      </div>
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-blue-600/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-blue-500/80" />
                      </div>
                    </div>
                    <Sun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <p className="text-sm font-bold text-white">Light Theme</p>
                      <p className="text-[11px] text-white/40 mt-0.5">Clean & bright</p>
                    </div>
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </button>
                </div>

                <p className="text-center text-[11px] text-white/25 mt-5">
                  This choice resets when you close your browser tab
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
