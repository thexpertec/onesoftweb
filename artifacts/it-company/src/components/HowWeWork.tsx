import { motion } from "framer-motion";
import { ScanSearch, PencilRuler, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    step: "Step 1",
    icon: ScanSearch,
    title: "We audit your business",
    desc: "We map every workflow, data source, and bottleneck — giving you a clear picture of where technology can drive the biggest gains.",
  },
  {
    step: "Step 2",
    icon: PencilRuler,
    title: "We design the solution",
    desc: "Our architects plan a custom ERP or web platform tailored to your industry, team size, and growth targets.",
  },
  {
    step: "Step 3",
    icon: Rocket,
    title: "We build and deploy",
    desc: "We develop, test, and go live with precision — migrating your data and training your team with zero disruption.",
  },
  {
    step: "Step 4",
    icon: HeartHandshake,
    title: "We support and grow",
    desc: "Every client we work with grows. We stay on board with 24/7 support, updates, and new features as your business evolves.",
  },
];

export function HowWeWork() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            How our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">
              ERP delivery
            </span>{" "}
            process works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We get under the hood of your business and find opportunities to replace manual, error-prone processes with powerful, precision-engineered software — delivered on time, every time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Dashed connector — desktop only */}
          <div className="hidden md:block absolute top-[2.75rem] left-[calc(12.5%+2.5rem)] right-[calc(12.5%+2.5rem)] h-px">
            <svg width="100%" height="2" className="overflow-visible">
              <line
                x1="0" y1="1"
                x2="100%" y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6"
                className="text-primary/40"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
                data-testid={`step-${i + 1}`}
              >
                {/* Icon box */}
                <div className="relative mb-6">
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[9px] font-bold" style={{ color: "#ffffff" }}>{i + 1}</span>
                  </div>
                  <div className="w-20 h-20 rounded-2xl border-2 border-primary/30 bg-primary/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                    <s.icon className="w-9 h-9 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Step label */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                  {s.step}
                </span>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-3 leading-tight">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px] mx-auto">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
