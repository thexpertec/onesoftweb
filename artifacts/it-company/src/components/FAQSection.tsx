import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "What exactly does OneSoft offer?",
    a: "We build two categories of software: industry-specific ERP systems (for schools, hospitals, restaurants, shadi halls, e-commerce, wholesalers, and distributors) and premium website products under our OneThemes brand. Every solution is custom-engineered — not off-the-shelf — so it fits your exact workflows and scales as your business grows.",
  },
  {
    q: "Do I need technical expertise to work with you?",
    a: "Not at all. Our team handles every technical detail from architecture to deployment. We translate your business requirements into software, train your team, and provide ongoing support. You simply describe how your business works — we build the rest.",
  },
  {
    q: "Which types of businesses benefit most from your ERP?",
    a: "Any business managing multiple departments, large volumes of transactions, or complex inventory. Our strongest verticals are schools and colleges, hospitals and clinics, restaurants and cafes, shadi halls and event venues, e-commerce stores, and wholesale/distribution businesses.",
  },
  {
    q: "How long does an ERP implementation take?",
    a: "A standard ERP deployment takes 4–12 weeks depending on the complexity of your workflows and the number of modules. We use an agile delivery model — core features go live first, then we add modules iteratively so your team starts seeing value immediately.",
  },
  {
    q: "Can the ERP be fully customized for our workflows?",
    a: "Yes — customization is the foundation of how we work. We start with a business audit, map your exact processes, and build around them. Every module — from billing to reporting to role-based access — is configured to match how your team actually operates.",
  },
  {
    q: "What happens after the system goes live?",
    a: "We provide a structured handover, full team training, and a dedicated support period. After that, our clients access ongoing support through our SLA packages — covering bug fixes, security updates, feature additions, and 24/7 monitoring for mission-critical systems.",
  },
  {
    q: "Is our business data secure on your systems?",
    a: "Security is built into everything we deliver. We use end-to-end encryption, role-based access control, automated database backups, and optional on-premise deployment for clients who require data sovereignty. We comply with standard data protection frameworks.",
  },
  {
    q: "Do you work with businesses outside Pakistan?",
    a: "Yes. We have active offices in Islamabad, Hull (UK), and Dubai (UAE), and have delivered projects across 40+ countries. Our team operates across time zones to ensure responsive communication regardless of where you are based.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left — sticky title column */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                FAQs
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-5">
                Frequently Asked<br />Questions
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                These FAQs are based on the real, pressing questions our clients asked — and our answers, written for complete clarity.
              </p>

              <Button
                size="lg"
                className="group h-12 px-6 text-sm font-semibold"
                data-testid="btn-faq-contact"
              >
                Still have a question?
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <motion.div
            className="lg:col-span-3 space-y-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isOpen
                      ? "border-primary/50 bg-primary/5"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-testid={`faq-item-${i}`}
                >
                  {/* Question row */}
                  <div className="flex items-center justify-between gap-4 px-6 py-5">
                    <span
                      className={`font-semibold text-sm md:text-base leading-snug transition-colors ${
                        isOpen ? "text-white" : "text-white/80"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "border-primary bg-primary text-white rotate-0"
                          : "border-white/20 text-white/50"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px bg-primary/20 mb-4" />
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Bottom contact nudge */}
            <motion.div
              className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/8 bg-white/[0.02] mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <MessageCircle className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                Can't find your answer?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Chat with our team
                </a>{" "}
                — we respond within 2 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
