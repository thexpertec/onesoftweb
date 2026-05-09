import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

export function Footer() {
  return (
    <footer id="site-footer" className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand col */}
          <motion.div
            className="col-span-1 md:col-span-1"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">PowerTech</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Precision-engineered ERP systems and premium website themes for modern businesses.
            </p>
          </motion.div>

          {/* ERP Solutions */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <h4 className="font-semibold text-white mb-4">ERP Solutions</h4>
            <ul className="space-y-3">
              {["School ERP", "Hospital ERP", "E-commerce ERP", "Restaurant ERP"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Case Studies", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "SLA Agreement"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PowerTech Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>System Status: <span className="text-primary">99.9% Uptime</span></span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
