import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO } from "@/data/seoMeta";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { BLOG_POSTS, CATEGORIES } from "@/data/blogPosts";
import {
  Clock, ArrowRight, Tag, Search,
  BookOpen, Rss,
} from "lucide-react";

const BLUE = "#1E4DA0";

export default function BlogPage() {
  useSEO(PAGE_SEO.blog);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const inputBg      = isLight ? "#F5F5F5"             : "rgba(255,255,255,0.05)";
  const inputBorder  = isLight ? "rgba(0,0,0,0.10)"   : "rgba(255,255,255,0.09)";
  const t45          = isLight ? "rgba(15,23,42,0.5)"  : "rgba(255,255,255,0.45)";
  const t70          = isLight ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.70)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  const featured = BLOG_POSTS.find(p => p.featured);
  const allPosts = BLOG_POSTS.filter(p => !p.featured);

  const filtered = allPosts.filter(p => {
    const matchCat  = activeCategory === "All" || p.category === activeCategory;
    const matchSrch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSrch;
  });

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                  style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
                  <Rss className="w-3 h-3" /> OneSoft Blog
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
                style={{ color: headingColor }}>
                Insights on software,<br />
                <span style={{ color: BLUE }}>growth, and operations</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}
                className="text-base mt-4 max-w-lg"
                style={{ color: t70 }}>
                Practical writing on ERP, digital marketing, AI automation, and web — from the OneSoft team.
              </motion.p>
            </div>

            {/* Search */}
            <motion.div className="relative w-full md:w-72"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: t45 }} />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: headingColor }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED POST
      ══════════════════════════════════════════════ */}
      {featured && !searchQuery && activeCategory === "All" && (
        <section className="py-8 md:py-10" style={{ borderBottom: `1px solid ${divider}` }}>
          <div className="container mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: t45 }}>Featured article</p>
            <Link href={`/blog/${featured.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="group grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: cardBg, border: `1px solid ${divider}` }}>
                {/* Left colour block */}
                <div className="lg:col-span-2 min-h-[200px] lg:min-h-0 flex flex-col justify-end p-8 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${featured.accentColor}ee 0%, ${featured.accentColor}99 100%)` }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 70%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                  <BookOpen className="w-10 h-10 text-white/40 mb-4" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit"
                    style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <Tag className="w-3 h-3" /> {featured.category}
                  </span>
                </div>

                {/* Right content */}
                <div className="lg:col-span-3 p-7 md:p-9 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black leading-snug mb-4 group-hover:opacity-80 transition-opacity"
                      style={{ color: headingColor }}>
                      {featured.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: t70 }}>{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: featured.authorColor }}>
                        {featured.authorInitials}
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: headingColor }}>{featured.author}</p>
                        <p className="text-[11px]" style={{ color: t45 }}>{featured.date} · {featured.readTime} min read</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold transition-all"
                      style={{ color: featured.accentColor }}>
                      Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          FILTER TABS + GRID
      ══════════════════════════════════════════════ */}
      <section className="py-8 md:py-10 lg:py-14">
        <div className="container mx-auto px-4">
          {/* Category tabs */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: activeCategory === cat ? BLUE : `${BLUE}10`,
                    color: activeCategory === cat ? "#fff" : t70,
                    border: `1px solid ${activeCategory === cat ? BLUE : `${BLUE}22`}`,
                  }}>
                  {cat === "All"
                    ? `All (${allPosts.length})`
                    : `${cat} (${allPosts.filter(p => p.category === cat).length})`}
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          {(searchQuery || activeCategory !== "All") && (
            <p className="text-xs font-semibold mb-6" style={{ color: t45 }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              {searchQuery ? ` for "${searchQuery}"` : ` in ${activeCategory}`}
            </p>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-black mb-2" style={{ color: headingColor }}>No articles found</p>
              <p className="text-sm" style={{ color: t45 }}>Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                    className="group rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full transition-all hover:-translate-y-0.5"
                    style={{ background: cardBg, border: `1px solid ${divider}` }}>
                    {/* Accent bar */}
                    <div className="h-1 shrink-0" style={{ background: post.accentColor }} />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Category badge */}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 w-fit"
                        style={{ background: `${post.accentColor}15`, color: post.accentColor, border: `1px solid ${post.accentColor}25` }}>
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="text-base font-black leading-snug mb-3 flex-1 group-hover:opacity-80 transition-opacity"
                        style={{ color: headingColor }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: t70 }}>
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: `1px solid ${divider}` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                            style={{ background: post.authorColor }}>
                            {post.authorInitials}
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold leading-none" style={{ color: headingColor }}>{post.author}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: t45 }}>{post.date}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold shrink-0" style={{ color: t45 }}>
                          <Clock className="w-3 h-3" /> {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER CTA
      ══════════════════════════════════════════════ */}
      <section className="py-10" style={{ background: sectionBg, borderTop: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center p-8 md:p-10 rounded-2xl"
            style={{ background: cardBg, border: `1px solid ${divider}` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}28` }}>
              <Rss className="w-6 h-6" style={{ color: BLUE }} />
            </div>
            <h3 className="text-xl font-black mb-2" style={{ color: headingColor }}>
              Get new articles by email
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-sm mx-auto" style={{ color: t70 }}>
              One or two articles a month. Practical, specific, no filler. Unsubscribe any time.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="Your email address"
                className="flex-1 py-3 px-4 rounded-xl text-sm outline-none transition-all"
                style={{ background: sectionBg, border: `1px solid ${divider}`, color: headingColor }} />
              <button type="submit"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white whitespace-nowrap transition-all hover:opacity-90"
                style={{ background: BLUE }}>
                Subscribe <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
