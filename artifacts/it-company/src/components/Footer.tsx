import { motion } from "framer-motion";
import { Twitter, Linkedin, Youtube, Github, ExternalLink } from "lucide-react";
import { Link } from "wouter";


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
    <footer id="site-footer" className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

          {/* Brand col */}
          <motion.div
            className="col-span-2 md:col-span-2"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <div className="flex items-center mb-4">
              <img src="/onesoft-logo.png" alt="OneSoft" className="h-9 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Precision-engineered ERP systems and custom websites for any business — built by OneSoft. Trusted globally.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter,  href: "#", label: "Twitter / X" },
                { icon: Youtube,  href: "#", label: "YouTube" },
                { icon: Github,   href: "#", label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ERP Solutions */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">ERP Products</h4>
            <ul className="space-y-3">
              {[
                { label: "School ERP",      href: "/school"      },
                { label: "Hospital ERP",    href: "/hospital"    },
                { label: "E-commerce ERP",  href: "/ecommerce"   },
                { label: "Restaurant ERP",  href: "/restaurant"  },
                { label: "Shadi Hall ERP",  href: "/shadi-hall"  },
                { label: "Distributor ERP", href: "/distributor" },
                { label: "Accounting ERP",  href: "/accounting"  },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
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
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us",     href: "#" },
                { label: "Our Team",     href: "/team" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Careers",      href: "#" },
                { label: "Contact",      href: "#contact" },
                { label: "Blog",         href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal + Contact */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={colVariants}
          >
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Privacy Policy",   href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "SLA Agreement",    href: "/sla" },
                { label: "Cookie Policy",    href: "/cookie-policy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Offices</h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>🇬🇧 Hull, United Kingdom</p>
              <p>🇦🇪 Business Bay, Dubai</p>
              <p>🇵🇰 G9 Markaz, Islamabad</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OneSoft Ltd. Registered in England & Wales. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
              All systems operational
            </span>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              System Status <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
