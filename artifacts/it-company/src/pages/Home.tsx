import React from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TechMarquee } from "@/components/TechMarquee";
import { ClientLogos } from "@/components/ClientLogos";
import { GlobalTeams } from "@/components/GlobalTeams";
import { StickyCTA } from "@/components/StickyCTA";
import { GlobalOffices } from "@/components/GlobalOffices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Activity, ShieldCheck, Zap, 
  Building2, GraduationCap, Stethoscope, 
  ShoppingCart, Utensils, Box, Globe, Users, Server,
  CheckCircle2, Cpu, LineChart, Lock
} from "lucide-react";

import heroDashboard from "@/assets/hero-dashboard.png";
import schoolErp from "@/assets/school-erp.png";
import hospitalErp from "@/assets/hospital-erp.png";
import ecommerceErp from "@/assets/ecommerce-erp.png";
import themesShowcase from "@/assets/themes-showcase.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

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
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 text-center lg:text-left"
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
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Precision-engineered ERP systems and premium websites. We build the digital backbone for modern businesses that demand power, speed, and reliability.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8" data-testid="btn-hero-demo">
                  Deploy Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-border hover:bg-secondary" data-testid="btn-hero-explore">
                  Explore Products
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-20 animate-pulse" />
                <img 
                  src={heroDashboard} 
                  alt="Enterprise Dashboard" 
                  className="relative rounded-xl border border-border/50 shadow-2xl w-full object-cover aspect-video"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TechMarquee />

      <ClientLogos />

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "ERP Deployments", value: "200+", icon: Server },
              { label: "Industries Served", value: "7", icon: Building2 },
              { label: "Happy Clients", value: "500+", icon: Users },
              { label: "Uptime SLA", value: "99.9%", icon: ShieldCheck }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

          {/* Featured ERP Screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden border border-border group md:col-span-2"
            >
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={schoolErp} alt="School ERP" className="w-full aspect-video object-cover" />
              <div className="absolute bottom-6 left-6 z-20">
                <Badge className="bg-primary text-white mb-2">Featured Module</Badge>
                <h4 className="font-bold text-white text-2xl drop-shadow-md">School Management UI</h4>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden border border-border group"
            >
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={hospitalErp} alt="Hospital ERP" className="w-full h-full object-cover min-h-[300px]" />
              <div className="absolute bottom-6 left-6 z-20">
                <Badge className="bg-primary text-white mb-2">Healthcare</Badge>
                <h4 className="font-bold text-white text-xl drop-shadow-md">Hospital Dashboard</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-black relative overflow-hidden border-y border-border">
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
                  { title: "Military-Grade Security", desc: "End-to-end encryption, role-based access control, and continuous audits.", icon: Lock },
                  { title: "High-Performance Architecture", desc: "Optimized queries and scalable infrastructure ensuring sub-second response times.", icon: Cpu },
                  { title: "Actionable Intelligence", desc: "Real-time analytics and predictive reporting to drive your decision making.", icon: LineChart }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
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
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
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

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30 border-y border-border">
         <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Trusted by Industry Leaders</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "PowerTech's Hospital ERP streamlined our entire operation. Wait times are down 40% and billing errors are practically eliminated.", author: "Dr. Sarah Chen", role: "Chief Medical Officer" },
                { quote: "The most robust eCommerce backend we've ever used. It handles our multi-channel inventory with absolute precision.", author: "James Wilson", role: "Operations Director" },
                { quote: "Our school's administrative overhead was cut in half within the first month of deployment. Incredibly powerful system.", author: "Michael Chang", role: "Principal" }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-background border-border h-full">
                    <CardContent className="p-8">
                      <div className="mb-6 flex gap-1">
                        {[1,2,3,4,5].map(s => <Zap key={s} className="w-4 h-4 text-primary fill-primary" />)}
                      </div>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">"{t.quote}"</p>
                      <div>
                        <p className="text-white font-semibold">{t.author}</p>
                        <p className="text-sm text-primary">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to upgrade your infrastructure?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join 500+ businesses running on PowerTech Solutions. Schedule a demo today and see how our systems can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg" data-testid="btn-cta-sales">
                Contact Sales <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg border-primary/50 text-white hover:bg-primary/10" data-testid="btn-cta-pricing">
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <GlobalOffices />
      <Footer />
      <StickyCTA />
    </div>
  );
}

