import React, { useRef, useEffect } from "react";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TechMarquee } from "@/components/TechMarquee";
import { ClientLogos } from "@/components/ClientLogos";
import { GlobalTeams } from "@/components/GlobalTeams";
import { StickyCTA } from "@/components/StickyCTA";
import { GlobalOffices } from "@/components/GlobalOffices";
import { HowWeWork } from "@/components/HowWeWork";
import { FAQSection } from "@/components/FAQSection";
import { FeatureMarquee } from "@/components/FeatureMarquee";
import { OfficeSlider } from "@/components/OfficeSlider";
import { DashboardSlider } from "@/components/DashboardSlider";
import { CTAStrip } from "@/components/CTAStrip";
import { CTAFormSection } from "@/components/CTAFormSection";
import { ServicesSection } from "@/components/ServicesSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Activity, ShieldCheck, Star,
  Building2, GraduationCap, Stethoscope, 
  ShoppingCart, Utensils, Box, Globe, Users, Server,
  CheckCircle2, Cpu, LineChart, Lock, Quote
} from "lucide-react";

import schoolErp from "@/assets/school-erp.png";
import hospitalErp from "@/assets/hospital-erp.png";
import ecommerceErp from "@/assets/ecommerce-erp.png";
import themesShowcase from "@/assets/themes-showcase.png";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function CountUp({ to, suffix = "", decimals = 0, duration = 2.2 }: {
  to: number; suffix?: string; decimals?: number; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; },
    });
    return () => ctrl.stop();
  }, [isInView, to, suffix, decimals, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        {/* Floating ambient orbs */}
        <motion.div
          className="absolute top-24 left-[12%] w-72 h-72 bg-primary/15 rounded-full blur-[90px] -z-10 pointer-events-none"
          animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-[8%] w-96 h-96 bg-blue-500/10 rounded-full blur-[110px] -z-10 pointer-events-none"
          animate={{ y: [0, 24, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none"
          animate={{ scaleX: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="border-primary/50 text-primary mb-6 bg-primary/10">
                <Activity className="w-3 h-3 mr-2" />
                Enterprise-Grade Software
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
              Mission-Critical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Infrastructure.
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Precision-engineered ERP systems and premium websites. We build the digital backbone for modern businesses that demand power, speed, and reliability.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10" data-testid="btn-hero-demo">
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-10 border-border hover:bg-secondary" data-testid="btn-hero-explore">
                Explore Products
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TechMarquee />

      <ClientLogos />

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "ERP Deployments", to: 340, suffix: "+",  decimals: 0, icon: Server     },
              { label: "Industries Served", to: 6,  suffix: "",   decimals: 0, icon: Building2  },
              { label: "Active Clients",   to: 520, suffix: "+",  decimals: 0, icon: Users      },
              { label: "Uptime Delivered", to: 99.9,suffix: "%",  decimals: 1, icon: ShieldCheck},
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
                className="text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(37,99,235,0.25)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  <CountUp to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                </h3>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureMarquee />

      {/* Core ERP Products */}
      <section id="products" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-primary/50 text-primary mb-4 bg-primary/10">Core Infrastructure</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Powerful ERP Systems</h2>
            <p className="text-muted-foreground text-lg">
              Industry-specific software designed to streamline your operations, reduce costs, and accelerate growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "School ERP", desc: "Admissions, attendance, fees, results, library, and timetabling.", icon: GraduationCap },
                { title: "Hospital ERP", desc: "Patient management, OPD/IPD, billing, pharmacy, and lab.", icon: Stethoscope },
                { title: "E-commerce ERP", desc: "Orders, inventory, suppliers, and multi-channel sales.", icon: ShoppingCart },
                { title: "Restaurant ERP", desc: "Table management, POS, kitchen orders, and inventory.", icon: Utensils },
                { title: "Shadi Hall ERP", desc: "Event booking, hall availability, catering, and invoicing.", icon: Building2 },
                { title: "Distributor ERP", desc: "Stock ledger, party accounts, GST billing, and delivery.", icon: Box }
              ].map((product, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-all hover:-translate-y-1 overflow-hidden group">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                      <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <product.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{product.title}</h3>
                      <p className="text-muted-foreground text-sm">{product.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      <ServicesSection />

      <DashboardSlider />

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-24 bg-black relative overflow-hidden border-y border-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Engineered for <br/> Absolute Reliability</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We don't just write code; we architect systems that handle critical business operations without failure.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Enterprise Encryption & Access", desc: "AES-256 data encryption, granular role-based permissions, and quarterly security audits.", icon: Lock },
                  { title: "High-Performance Architecture", desc: "Optimized queries and scalable infrastructure ensuring sub-second response times.", icon: Cpu },
                  { title: "Actionable Intelligence", desc: "Real-time analytics and predictive reporting to drive your decision making.", icon: LineChart }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.12, backgroundColor: "rgba(37,99,235,0.25)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative p-2 rounded-xl border border-border bg-secondary/20 backdrop-blur-sm">
                <img src={ecommerceErp} alt="System Architecture" className="w-full rounded-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTAStrip />

      {/* PowerThemes Section */}
      <section id="themes" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                 <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
                <img src={themesShowcase} alt="PowerThemes Showcase" className="w-full rounded-xl border border-border shadow-2xl" />
              </div>
            </motion.div>
            <motion.div 
              className="flex-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="outline" className="border-primary/50 text-primary mb-4 bg-primary/10">
                  <Globe className="w-3 h-3 mr-2" />
                  Website Products
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">PowerThemes</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Premium website themes designed for modern businesses. Fast-loading, SEO-ready, and fully customizable. Don't just build a website, build a digital presence.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "50+ Industry-specific templates",
                    "Lightning fast performance (99+ Lighthouse)",
                    "Responsive and mobile-first design",
                    "Integrated with major CMS platforms"
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 400 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      </motion.span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" data-testid="btn-view-themes">
                  View Theme Library
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <GlobalTeams />
      <OfficeSlider />

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30 border-y border-border">
         <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">Client Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What our clients say after going live</h2>
              <p className="mt-3 text-muted-foreground">Straight from the people who run their business on PowerTech every day.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "We were drowning in paper-based patient records and manual billing. PowerTech's Hospital ERP brought everything — OPD, pharmacy, lab — into one screen. Our billing errors dropped from dozens a day to almost zero in the first week.",
                  author: "Dr. Adil Rehman",
                  role: "Chief Medical Officer",
                  company: "Al-Noor Hospital, Dubai",
                  photo: testimonial1,
                  flag: "🇦🇪",
                },
                {
                  quote: "We run 4 branches of our school network on the same system now. Fee collection, attendance, results, timetabling — it's all automated. The admin team went from overworked to actually having time to focus on students.",
                  author: "Mrs. Fatima Akhtar",
                  role: "Principal & Director",
                  company: "Beacon Public School, Lahore",
                  photo: testimonial2,
                  flag: "🇵🇰",
                },
                {
                  quote: "We distribute to over 200 retailers across Yorkshire. Before PowerTech, stock reconciliation alone took two people two days a month. Now it's a 10-minute report. The system paid for itself in the first quarter.",
                  author: "Tom Ashworth",
                  role: "Operations Director",
                  company: "Northern Star Distribution, Hull",
                  photo: testimonial3,
                  flag: "🇬🇧",
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="h-full"
                >
                  <Card className="bg-background border-border h-full flex flex-col">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-5">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                      </div>
                      {/* Quote icon */}
                      <Quote className="w-6 h-6 text-primary/30 mb-3" />
                      {/* Quote */}
                      <p className="text-muted-foreground text-base leading-relaxed flex-1 mb-8">{t.quote}</p>
                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <img
                          src={t.photo}
                          alt={t.author}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                        />
                        <div>
                          <p className="text-white font-semibold text-sm">{t.author} <span className="text-base">{t.flag}</span></p>
                          <p className="text-xs text-primary font-medium">{t.role}</p>
                          <p className="text-xs text-muted-foreground">{t.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      <CTAFormSection />

      <HowWeWork />
      <FAQSection />
      <GlobalOffices />
      <Footer />
      <StickyCTA />
    </div>
  );
}

