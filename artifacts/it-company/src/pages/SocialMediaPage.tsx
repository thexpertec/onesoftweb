import { useRef, useEffect, useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { motion, useInView, animate as motionAnimate } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTAStrip } from "@/components/CTAStrip";
import { Button } from "@/components/ui/button";
import { useCTAModal } from "@/context/CTAModalContext";
import { useTheme } from "@/context/ThemeContext";
import { EditableSection, EField, ESaveBar, ESectionHeader } from "@/components/EditableSection";
import { EditModeBar } from "@/components/EditModeBar";
import { useEditMode } from "@/context/EditModeContext";
import {
  ArrowRight, CheckCircle2, Megaphone, Zap, Clock, Star,
  MessageSquare, Rocket, Users, TrendingUp, AlertCircle,
  XCircle, BarChart3, Search, Lock, Heart, Eye,
  Camera, Video, PenTool, Calendar, Globe, Package,
  Building2, GraduationCap, Stethoscope, UtensilsCrossed,
  ShoppingCart, Bot, Repeat2, Target, ThumbsUp,
} from "lucide-react";

const BLUE = "#1E4DA0";
const ROSE = "#e11d48";

function CountUp({ to, suffix = "", prefix = "", duration = 2 }:
  { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = motionAnimate(0, to, {
      duration, ease: "easeOut",
      onUpdate(v) { if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [inView]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ── Initial data ──────────────────────────────────────────── */

const INIT_HERO = {
  badge: "Social Media Management",
  headline: "Social media that actually grows your business — not just your follower count",
  subheadline: "OneSoft manages your social presence end-to-end — content strategy, design, scheduling, and community management — so you can focus on running your business.",
  ctaPrimary: "Get a Free Social Audit",
  ctaSecondary: "Book a Strategy Call",
};

const INIT_PROBLEM = {
  badge: "The Problem",
  heading: "Posting without a strategy is just noise",
  subheading: "Without the right content, timing, and targeting, social media drains time without delivering results.",
  cards: [
    { icon: XCircle,     title: "Posting consistently but seeing zero growth",    desc: "Random posts without a strategy are noise. Without a content calendar tied to your audience's behaviour and platform algorithms, you're invisible to the people who matter." },
    { icon: AlertCircle, title: "Content that looks unprofessional",              desc: "Blurry graphics, inconsistent fonts, and low-effort captions signal to potential customers that your business doesn't take itself seriously — before they ever visit your website." },
    { icon: XCircle,     title: "Followers that never become customers",           desc: "Vanity metrics — likes, followers — don't pay bills. Without a proper funnel from awareness to enquiry, social media is just entertainment with no return on investment." },
    { icon: AlertCircle, title: "No time to manage it properly",                  desc: "Running a business and running a content operation at the same time is unsustainable. Most business owners either burn out or go quiet — both damage your brand." },
  ],
};

const INIT_SOLUTION = {
  badge: "The Solution",
  heading: "A complete social media operation — done for you",
  subheading: "Strategy, content, scheduling, engagement, and reporting — we handle the entire function so you don't have to.",
  cards: [
    { icon: PenTool,       title: "Content Strategy",          desc: "A monthly content plan aligned to your goals, audience, and platform — every post has a purpose." },
    { icon: Camera,        title: "Graphic & Visual Design",   desc: "On-brand static posts, carousels, story templates, and cover art designed to stop the scroll." },
    { icon: Video,         title: "Video & Reels Production",  desc: "Short-form video content for Instagram Reels, TikTok, and YouTube Shorts — scripted, edited, captioned." },
    { icon: Calendar,      title: "Content Scheduling",        desc: "Posts go out at peak engagement times across all your platforms — no manual effort from you." },
    { icon: MessageSquare, title: "Community Management",      desc: "We respond to comments, DMs, and mentions in your brand voice — keeping your audience engaged." },
    { icon: Target,        title: "Paid Social Campaigns",     desc: "Meta Ads, TikTok Ads, and LinkedIn Ads — targeted campaigns built to drive leads, not just clicks." },
    { icon: BarChart3,     title: "Monthly Analytics Report",  desc: "Clear monthly reporting on reach, engagement, follower growth, and link clicks — no vanity metrics." },
    { icon: Repeat2,       title: "Hashtag & SEO Research",    desc: "Platform-specific keyword and hashtag research to maximise discoverability on every channel." },
  ],
};

const INIT_PLATFORMS = {
  heading: "Every platform, handled natively",
  subheading: "We don't repurpose the same content across every platform. Each channel gets content designed specifically for it.",
  items: [
    { label: "Instagram",   sub: "Feed posts, Reels, Stories & DM campaigns" },
    { label: "Facebook",    sub: "Page management, groups & paid reach" },
    { label: "TikTok",      sub: "Short-form video & trending audio content" },
    { label: "LinkedIn",    sub: "B2B thought leadership & lead generation" },
    { label: "X (Twitter)", sub: "Real-time engagement & brand voice" },
    { label: "YouTube",     sub: "Shorts, long-form video & channel growth" },
  ],
};

const INIT_PROCESS = {
  badge: "How It Works",
  heading: "From audit to content live in one week",
  subheading: "A structured onboarding that gets your brand looking professional within 7 days of starting.",
  steps: [
    { step: "01", icon: Search,    title: "Audit & Strategy",   detail: "We analyse your current presence, competitors, and audience. Then build a 90-day strategy with clear growth targets." },
    { step: "02", icon: PenTool,   title: "Brand Toolkit",      detail: "We establish your visual identity for social — templates, colour palette, tone of voice, and content pillars." },
    { step: "03", icon: Calendar,  title: "Create & Schedule",  detail: "Monthly content production and scheduling. You review and approve before anything goes live." },
    { step: "04", icon: BarChart3, title: "Analyse & Optimise", detail: "Monthly performance review. We double down on what works and refine what doesn't — continuously improving results." },
  ],
};

const INIT_STATS = [
  { to: 3,   suffix: "×",         label: "Avg. engagement increase" },
  { to: 200, suffix: "+",         label: "Brands managed" },
  { to: 6,   suffix: " platforms",label: "We cover" },
  { to: 90,  suffix: "%",         label: "Client retention rate" },
];

const INIT_INDUSTRIES = {
  heading: "Every industry, every platform",
  subheading: "We create platform-native content tailored to the behaviour and expectations of your specific audience.",
  items: [
    { icon: UtensilsCrossed, label: "Restaurants & Cafes" },
    { icon: Stethoscope,     label: "Clinics & Wellness" },
    { icon: GraduationCap,   label: "Education & Coaching" },
    { icon: ShoppingCart,    label: "Retail & E-commerce" },
    { icon: Building2,       label: "Corporates & B2B" },
    { icon: Heart,           label: "Events & Hospitality" },
    { icon: Package,         label: "Products & Brands" },
    { icon: Bot,             label: "SaaS & Tech" },
  ],
};

const INIT_TESTIMONIALS = {
  badge: "Client Results",
  heading: "Social media that actually moves the needle",
  items: [
    { quote: "In three months our Instagram went from 800 followers to 6,200. More importantly, we're getting 15–20 genuine enquiries a week directly from social.",                       name: "Aisha Noor",    role: "Owner",            co: "Bloom Bridal Studio, Manchester" },
    { quote: "We handed over our LinkedIn completely. They now post three times a week, our connection requests are up 400%, and we've closed two B2B deals through it.",                  name: "Daniel Mbeki",  role: "Managing Director",co: "Apex Consulting Group" },
    { quote: "The Reels they produce for our restaurant are genuinely cinematic. We've had people come in specifically because they saw us on TikTok.",                                    name: "Layla Hassan",  role: "Co-Founder",       co: "The Olive Table, Birmingham" },
  ],
};

const INIT_CTA = {
  badge: "Ready to grow?",
  heading: "Let's turn your social media into a lead generation machine",
  subheading: "Free audit included. We'll show you exactly what's holding your social back and what we'd do differently — no pitch, no pressure.",
  ctaPrimary: "Get My Free Social Audit",
  email: "info@onesoft.org.uk",
};

/* ── Drawers ───────────────────────────────────────────────── */

function HeroDrawer({ data, setData }: { data: typeof INIT_HERO; setData: (d: typeof INIT_HERO) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  const set = (k: keyof typeof INIT_HERO) => (v: string) => setLocal(d => ({ ...d, [k]: v }));
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Hero Content</ESectionHeader>
      <EField label="Badge Text" value={local.badge} onChange={set("badge")} />
      <EField label="Headline (H1)" value={local.headline} onChange={set("headline")} multiline />
      <EField label="Sub-headline" value={local.subheadline} onChange={set("subheadline")} multiline />
      <div className="grid grid-cols-2 gap-3">
        <EField label="Primary CTA" value={local.ctaPrimary} onChange={set("ctaPrimary")} />
        <EField label="Secondary CTA" value={local.ctaSecondary} onChange={set("ctaSecondary")} />
      </div>
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function ProblemDrawer({ data, setData }: { data: typeof INIT_PROBLEM; setData: (d: typeof INIT_PROBLEM) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Badge" value={local.badge} onChange={v => setLocal(d => ({ ...d, badge: v }))} />
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} multiline />
      <EField label="Subheading" value={local.subheading} onChange={v => setLocal(d => ({ ...d, subheading: v }))} multiline />
      <ESectionHeader>Problem Cards</ESectionHeader>
      {local.cards.map((c, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Card {i + 1}</p>
          <EField label="Title" value={c.title} onChange={v => setLocal(d => ({ ...d, cards: d.cards.map((x, j) => j === i ? { ...x, title: v } : x) }))} />
          <EField label="Description" value={c.desc} onChange={v => setLocal(d => ({ ...d, cards: d.cards.map((x, j) => j === i ? { ...x, desc: v } : x) }))} multiline />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function SolutionDrawer({ data, setData }: { data: typeof INIT_SOLUTION; setData: (d: typeof INIT_SOLUTION) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Badge" value={local.badge} onChange={v => setLocal(d => ({ ...d, badge: v }))} />
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} multiline />
      <EField label="Subheading" value={local.subheading} onChange={v => setLocal(d => ({ ...d, subheading: v }))} multiline />
      <ESectionHeader>Service Cards</ESectionHeader>
      {local.cards.map((c, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Card {i + 1}</p>
          <EField label="Title" value={c.title} onChange={v => setLocal(d => ({ ...d, cards: d.cards.map((x, j) => j === i ? { ...x, title: v } : x) }))} />
          <EField label="Description" value={c.desc} onChange={v => setLocal(d => ({ ...d, cards: d.cards.map((x, j) => j === i ? { ...x, desc: v } : x) }))} multiline />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function PlatformsDrawer({ data, setData }: { data: typeof INIT_PLATFORMS; setData: (d: typeof INIT_PLATFORMS) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} />
      <EField label="Subheading" value={local.subheading} onChange={v => setLocal(d => ({ ...d, subheading: v }))} multiline />
      <ESectionHeader>Platforms</ESectionHeader>
      {local.items.map((item, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <EField label="Platform Name" value={item.label} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, label: v } : x) }))} />
          <EField label="Description" value={item.sub} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, sub: v } : x) }))} />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function ProcessDrawer({ data, setData }: { data: typeof INIT_PROCESS; setData: (d: typeof INIT_PROCESS) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Badge" value={local.badge} onChange={v => setLocal(d => ({ ...d, badge: v }))} />
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} multiline />
      <EField label="Subheading" value={local.subheading} onChange={v => setLocal(d => ({ ...d, subheading: v }))} multiline />
      <ESectionHeader>Steps</ESectionHeader>
      {local.steps.map((s, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <p className="text-xs font-black text-primary">Step {s.step}</p>
          <EField label="Title" value={s.title} onChange={v => setLocal(d => ({ ...d, steps: d.steps.map((x, j) => j === i ? { ...x, title: v } : x) }))} />
          <EField label="Detail" value={s.detail} onChange={v => setLocal(d => ({ ...d, steps: d.steps.map((x, j) => j === i ? { ...x, detail: v } : x) }))} multiline />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function StatsDrawer({ data, setData }: { data: typeof INIT_STATS; setData: (d: typeof INIT_STATS) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Statistics</ESectionHeader>
      {local.map((s, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <EField label="Value" value={String(s.to)} onChange={v => setLocal(d => d.map((x, j) => j === i ? { ...x, to: Number(v) || 0 } : x))} />
            <EField label="Suffix" value={s.suffix} onChange={v => setLocal(d => d.map((x, j) => j === i ? { ...x, suffix: v } : x))} />
          </div>
          <EField label="Label" value={s.label} onChange={v => setLocal(d => d.map((x, j) => j === i ? { ...x, label: v } : x))} />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function IndustriesDrawer({ data, setData }: { data: typeof INIT_INDUSTRIES; setData: (d: typeof INIT_INDUSTRIES) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} />
      <EField label="Subheading" value={local.subheading} onChange={v => setLocal(d => ({ ...d, subheading: v }))} multiline />
      <ESectionHeader>Industry Tiles</ESectionHeader>
      {local.items.map((item, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50">
          <EField label={`Tile ${i + 1} Label`} value={item.label} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, label: v } : x) }))} />
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function TestimonialsDrawer({ data, setData }: { data: typeof INIT_TESTIMONIALS; setData: (d: typeof INIT_TESTIMONIALS) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>Section Headers</ESectionHeader>
      <EField label="Badge" value={local.badge} onChange={v => setLocal(d => ({ ...d, badge: v }))} />
      <EField label="Heading" value={local.heading} onChange={v => setLocal(d => ({ ...d, heading: v }))} multiline />
      <ESectionHeader>Testimonials</ESectionHeader>
      {local.items.map((t, i) => (
        <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Testimonial {i + 1}</p>
          <EField label="Quote" value={t.quote} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, quote: v } : x) }))} multiline />
          <EField label="Name" value={t.name} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, name: v } : x) }))} />
          <div className="grid grid-cols-2 gap-2">
            <EField label="Role" value={t.role} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, role: v } : x) }))} />
            <EField label="Company" value={t.co} onChange={v => setLocal(d => ({ ...d, items: d.items.map((x, j) => j === i ? { ...x, co: v } : x) }))} />
          </div>
        </div>
      ))}
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

function CTADrawer({ data, setData }: { data: typeof INIT_CTA; setData: (d: typeof INIT_CTA) => void }) {
  const [local, setLocal] = useState(data);
  const [saved, setSaved] = useState(false);
  const { closeSection } = useEditMode();
  const set = (k: keyof typeof INIT_CTA) => (v: string) => setLocal(d => ({ ...d, [k]: v }));
  function save() { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  return (
    <div className="space-y-4">
      <ESectionHeader>CTA Section</ESectionHeader>
      <EField label="Badge" value={local.badge} onChange={set("badge")} />
      <EField label="Heading" value={local.heading} onChange={set("heading")} multiline />
      <EField label="Sub-heading" value={local.subheading} onChange={set("subheading")} multiline />
      <EField label="Primary Button" value={local.ctaPrimary} onChange={set("ctaPrimary")} />
      <EField label="Email" value={local.email} onChange={set("email")} />
      <ESaveBar onSave={save} saved={saved} onClose={closeSection} />
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function SocialMediaPage() {
  useSEO(PAGE_SEO.socialMedia);
  const { openCTAModal } = useCTAModal();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  const [hero, setHero]               = useState(INIT_HERO);
  const [problem, setProblem]         = useState(INIT_PROBLEM);
  const [solution, setSolution]       = useState(INIT_SOLUTION);
  const [platforms, setPlatforms]     = useState(INIT_PLATFORMS);
  const [process, setProcess]         = useState(INIT_PROCESS);
  const [stats, setStats]             = useState(INIT_STATS);
  const [industries, setIndustries]   = useState(INIT_INDUSTRIES);
  const [testimonials, setTestimonials] = useState(INIT_TESTIMONIALS);
  const [cta, setCta]                 = useState(INIT_CTA);

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* HERO */}
      <EditableSection id="hero" label="Hero" drawer={<HeroDrawer data={hero} setData={setHero} />}>
        <section className="pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-32 lg:pb-14 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.06]"
              style={{ background: `radial-gradient(circle, ${ROSE}, transparent 70%)` }} />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                  style={{ background: "rgba(225,29,72,0.10)", border: "1px solid rgba(225,29,72,0.25)", color: ROSE }}>
                  <Megaphone className="w-3 h-3" /> {hero.badge}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6" style={{ color: headingColor }}>
                {hero.headline}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
                className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: t70 }}>
                {hero.subheadline}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto" onClick={openCTAModal}>
                  {hero.ctaPrimary} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                  style={{ borderColor: divider, color: headingColor }} onClick={openCTAModal}>
                  {hero.ctaSecondary}
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap items-center justify-center gap-5 mt-10">
                {[
                  { icon: ThumbsUp,   label: "3× engagement growth" },
                  { icon: Eye,        label: "200+ brands managed" },
                  { icon: Globe,      label: "6 platforms covered" },
                  { icon: TrendingUp, label: "90% client retention" },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-2">
                    <t.icon className="w-4 h-4" style={{ color: BLUE }} />
                    <span className="text-sm font-medium" style={{ color: t45 }}>{t.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* PROBLEM */}
      <EditableSection id="problem" label="Problem Section" drawer={<ProblemDrawer data={problem} setData={setProblem} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.25)", color: "#dc2626" }}>
                <AlertCircle className="w-3 h-3" /> {problem.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>{problem.heading}</h2>
              <p className="text-base leading-relaxed" style={{ color: t70 }}>{problem.subheading}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {problem.cards.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 p-6 rounded-2xl" style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.20)" }}>
                    <p.icon className="w-4.5 h-4.5" style={{ color: "#dc2626" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1.5" style={{ color: headingColor }}>{p.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: t70 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* SOLUTION */}
      <EditableSection id="solution" label="Solution Section" drawer={<SolutionDrawer data={solution} setData={setSolution} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <CheckCircle2 className="w-3 h-3" /> {solution.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>{solution.heading}</h2>
              <p className="text-base leading-relaxed" style={{ color: t70 }}>{solution.subheading}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {solution.cards.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="p-5 rounded-2xl" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                    <s.icon className="w-4.5 h-4.5" style={{ color: BLUE }} />
                  </div>
                  <p className="text-sm font-bold mb-1.5" style={{ color: headingColor }}>{s.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: t70 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* PLATFORMS */}
      <EditableSection id="platforms" label="Platforms" drawer={<PlatformsDrawer data={platforms} setData={setPlatforms} />}>
        <section className="pb-8 md:pb-10 lg:pb-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <h3 className="text-xl font-black mb-2" style={{ color: headingColor }}>{platforms.heading}</h3>
              <p className="text-sm" style={{ color: t45 }}>{platforms.subheading}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {platforms.items.map((p, i) => (
                <motion.div key={p.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 p-5 rounded-2xl items-center" style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                    <Globe className="w-4 h-4" style={{ color: BLUE }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: headingColor }}>{p.label}</p>
                    <p className="text-xs" style={{ color: t70 }}>{p.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* PROCESS */}
      <EditableSection id="process" label="Process / How It Works" drawer={<ProcessDrawer data={process} setData={setProcess} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center max-w-xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Rocket className="w-3 h-3" /> {process.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>{process.heading}</h2>
              <p className="text-base leading-relaxed" style={{ color: t70 }}>{process.subheading}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {process.steps.map((p, i) => (
                <motion.div key={p.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl" style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                      <p.icon className="w-5 h-5" style={{ color: BLUE }} />
                    </div>
                    <span className="text-3xl font-black tabular-nums" style={{ color: `${BLUE}25` }}>{p.step}</span>
                  </div>
                  <p className="text-base font-black mb-2" style={{ color: headingColor }}>{p.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: t70 }}>{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* STATS */}
      <EditableSection id="stats" label="Stats" drawer={<StatsDrawer data={stats} setData={setStats} />}>
        <section className="py-10 lg:py-14" style={{ borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: BLUE }}>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="text-sm font-medium" style={{ color: t45 }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* INDUSTRIES */}
      <EditableSection id="industries" label="Industries" drawer={<IndustriesDrawer data={industries} setData={setIndustries} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: headingColor }}>{industries.heading}</h2>
              <p className="text-sm" style={{ color: t45 }}>{industries.subheading}</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {industries.items.map((ind, i) => (
                <motion.div key={ind.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center"
                  style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
                    <ind.icon className="w-4 h-4" style={{ color: BLUE }} />
                  </div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: headingColor }}>{ind.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* TESTIMONIALS */}
      <EditableSection id="testimonials" label="Testimonials" drawer={<TestimonialsDrawer data={testimonials} setData={setTestimonials} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <motion.div className="text-center max-w-xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
                style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                <Star className="w-3 h-3" /> {testimonials.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: headingColor }}>{testimonials.heading}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {testimonials.items.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="p-6 rounded-2xl flex flex-col gap-4" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" style={{ color: BLUE }} />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: t70 }}>"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${divider}` }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: BLUE }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: headingColor }}>{t.name}</p>
                      <p className="text-[11px]" style={{ color: t45 }}>{t.role} · {t.co}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </EditableSection>

      {/* CTA */}
      <EditableSection id="cta" label="CTA Section" drawer={<CTADrawer data={cta} setData={setCta} />}>
        <section className="py-8 md:py-10 lg:py-[60px]" style={{ background: BLUE }}>
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>
                <Zap className="w-3 h-3" /> {cta.badge}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">{cta.heading}</h2>
              <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">{cta.subheading}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-base font-semibold bg-white text-[#1E4DA0] hover:bg-white/90 w-full sm:w-auto" onClick={openCTAModal}>
                  {cta.ctaPrimary} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <a href={`mailto:${cta.email}`} className="inline-flex items-center gap-2 h-12 px-8 text-base font-semibold text-white/85 hover:text-white transition-colors">
                  {cta.email}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </EditableSection>

      <CTAStrip />
      <Footer />
      <EditModeBar />
    </div>
  );
}
