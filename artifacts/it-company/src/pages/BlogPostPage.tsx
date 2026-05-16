import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { getPost, BLOG_POSTS } from "@/data/blogPosts";
import {
  Clock, ArrowLeft, Tag, ArrowRight,
  Twitter, Linkedin, Link2, CheckCircle2,
} from "lucide-react";

const BLUE = "#1E4DA0";

function BodyBlock({ block, t70, headingColor, accentColor, divider, sectionBg }: {
  block: { type: string; content: string | string[] };
  t70: string; headingColor: string; accentColor: string; divider: string; sectionBg: string;
}) {
  if (block.type === "h2") return (
    <h2 className="text-2xl font-black mt-10 mb-4" style={{ color: headingColor }}>
      {block.content as string}
    </h2>
  );
  if (block.type === "h3") return (
    <h3 className="text-lg font-black mt-7 mb-3" style={{ color: headingColor }}>
      {block.content as string}
    </h3>
  );
  if (block.type === "p") return (
    <p className="text-base leading-[1.85] mb-5" style={{ color: t70 }}>
      {block.content as string}
    </p>
  );
  if (block.type === "ul") return (
    <ul className="space-y-3 mb-6 pl-1">
      {(block.content as string[]).map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-base leading-relaxed" style={{ color: t70 }}>
          <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" style={{ color: accentColor }} />
          {item}
        </li>
      ))}
    </ul>
  );
  if (block.type === "quote") return (
    <blockquote className="my-8 rounded-2xl p-6" style={{ background: `${accentColor}0d`, border: `2px solid ${accentColor}30` }}>
      <div className="w-6 h-1 rounded mb-4" style={{ background: accentColor }} />
      <p className="text-lg font-semibold leading-relaxed italic" style={{ color: headingColor }}>
        "{block.content as string}"
      </p>
    </blockquote>
  );
  return null;
}

export default function BlogPostPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getPost(slug);

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  if (!post) {
    return (
      <div style={{ background: pageBg, minHeight: "100vh" }}>
        <Navigation />
        <div className="container mx-auto px-4 pt-40 text-center">
          <p className="text-xl font-bold mb-4" style={{ color: headingColor }}>Article not found</p>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: BLUE }}>
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════════ */}
      <section className="pt-24 pb-0 md:pt-28" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Link href="/blog">
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 transition-opacity hover:opacity-70"
                  style={{ color: t45 }}>
                  <ArrowLeft className="w-4 h-4" /> Blog
                </button>
              </Link>
            </motion.div>

            {/* Category */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-5"
                style={{ background: `${post.accentColor}15`, color: post.accentColor, border: `1px solid ${post.accentColor}28` }}>
                <Tag className="w-3 h-3" /> {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5"
              style={{ color: headingColor }}>
              {post.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}
              className="flex flex-wrap items-center gap-4 pb-8"
              style={{ borderBottom: `1px solid ${divider}` }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ background: post.authorColor }}>
                  {post.authorInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: headingColor }}>{post.author}</p>
                  <p className="text-xs" style={{ color: t45 }}>{post.authorRole}</p>
                </div>
              </div>
              <div className="h-4 w-px" style={{ background: divider }} />
              <span className="text-xs" style={{ color: t45 }}>{post.date}</span>
              <div className="h-4 w-px" style={{ background: divider }} />
              <span className="inline-flex items-center gap-1 text-xs" style={{ color: t45 }}>
                <Clock className="w-3 h-3" /> {post.readTime} min read
              </span>
              {/* Share */}
              <div className="ml-auto flex gap-2">
                {[
                  { icon: Twitter,  label: "X", href: "#" },
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: Link2,    label: "Copy link", href: "#" },
                ].map(s => (
                  <a key={s.label} href={s.href} aria-label={`Share on ${s.label}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    style={{ background: sectionBg, border: `1px solid ${divider}`, color: t70 }}>
                    <s.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ARTICLE BODY
      ══════════════════════════════════════════════ */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt lead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
              className="text-xl leading-relaxed font-medium mb-8 pb-8"
              style={{ color: headingColor, borderBottom: `1px solid ${divider}` }}>
              {post.excerpt}
            </motion.p>

            {/* Body blocks */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
              {post.body.map((block, i) => (
                <BodyBlock key={i} block={block} t70={t70} headingColor={headingColor}
                  accentColor={post.accentColor} divider={divider} sectionBg={sectionBg} />
              ))}
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8" style={{ borderTop: `1px solid ${divider}` }}>
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: sectionBg, color: t70, border: `1px solid ${divider}` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RELATED POSTS
      ══════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="py-10 lg:py-14" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black" style={{ color: headingColor }}>More from {post.category}</h2>
                <Link href="/blog">
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: BLUE }}>
                    All posts <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4 }}
                      className="group rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
                      style={{ background: cardBg, border: `1px solid ${divider}` }}>
                      <div className="h-1" style={{ background: rp.accentColor }} />
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3 w-fit"
                          style={{ background: `${rp.accentColor}15`, color: rp.accentColor, border: `1px solid ${rp.accentColor}28` }}>
                          {rp.category}
                        </span>
                        <h3 className="text-base font-black leading-snug mb-2 flex-1 group-hover:opacity-80 transition-opacity"
                          style={{ color: headingColor }}>
                          {rp.title}
                        </h3>
                        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px solid ${divider}` }}>
                          <span className="text-xs flex items-center gap-1" style={{ color: t45 }}>
                            <Clock className="w-3 h-3" /> {rp.readTime} min
                          </span>
                          <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: rp.accentColor }}>
                            Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section className="py-10 lg:py-14" style={{ background: BLUE }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Want to see OneSoft in action?
            </h2>
            <p className="text-white/70 text-sm mb-7 max-w-md mx-auto leading-relaxed">
              Book a free demo tailored to your business. No pitch, no pressure — just a live walkthrough of the software relevant to you.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-white/90 transition-all"
                style={{ color: BLUE }}>
                Book a free demo <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
