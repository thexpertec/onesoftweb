import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { Cookie, Mail, Phone, MapPin } from "lucide-react";

const BLUE = "#1E4DA0";

const cookieTable = [
  {
    category: "Strictly Necessary",
    color: "#16a34a",
    canDisable: "No",
    examples: [
      { name: "session_id",    purpose: "Maintains your login session and keeps you authenticated while browsing.", duration: "Session" },
      { name: "csrf_token",    purpose: "Protects form submissions from cross-site request forgery attacks.",       duration: "Session" },
      { name: "cookie_consent",purpose: "Stores your cookie consent preference so we don't ask again.",            duration: "1 year"  },
    ],
  },
  {
    category: "Analytics & Performance",
    color: "#d97706",
    canDisable: "Yes",
    examples: [
      { name: "_ga",           purpose: "Google Analytics — distinguishes unique users and sessions.",             duration: "2 years" },
      { name: "_ga_*",         purpose: "Google Analytics — stores and counts page views for your session.",      duration: "2 years" },
      { name: "_gid",          purpose: "Google Analytics — distinguishes users, expires after 24 hours.",        duration: "24 hours"},
    ],
  },
  {
    category: "Preference & Functionality",
    color: BLUE,
    canDisable: "Yes",
    examples: [
      { name: "theme",         purpose: "Remembers your dark/light mode preference across visits.",               duration: "1 year"  },
      { name: "lang",          purpose: "Stores your language or region preference.",                             duration: "1 year"  },
    ],
  },
  {
    category: "Marketing & Targeting",
    color: "#dc2626",
    canDisable: "Yes",
    examples: [
      { name: "_fbp",          purpose: "Facebook Pixel — tracks visits for ad measurement and retargeting.",     duration: "3 months"},
      { name: "li_fat_id",     purpose: "LinkedIn Insight Tag — tracks conversions from LinkedIn ad campaigns.",  duration: "30 days" },
      { name: "IDE",           purpose: "Google DoubleClick — used for targeting and measuring ad effectiveness.", duration: "1 year"  },
    ],
  },
];

const sections = [
  {
    id: "introduction",
    title: "1. What Are Cookies?",
    content: [
      `Cookies are small text files placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to website owners about how their site is being used.`,
      `Cookies can be "session cookies" — which are deleted when you close your browser — or "persistent cookies" — which remain on your device for a set period of time or until you delete them.`,
      `Cookies set by the website owner (OneSoft Ltd) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies may track your activity across multiple websites.`,
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Cookies",
    content: [
      `OneSoft uses cookies on our website at onesoft.org.uk for the following purposes:`,
      `**Essential operation** — Some cookies are strictly necessary for the website to function. Without them, certain features such as secure login sessions and form protection cannot work.`,
      `**Analytics & improvement** — We use analytics cookies to understand how visitors interact with our website — which pages are visited most, how long users stay, and where they come from. This helps us improve the site.`,
      `**Preferences & personalisation** — Preference cookies remember choices you make (such as dark/light mode) to provide a more personalised experience on return visits.`,
      `**Marketing** — Where you have given consent, we may use marketing cookies to show you relevant OneSoft advertisements on other websites and to measure the effectiveness of our advertising campaigns.`,
    ],
  },
  {
    id: "cookie-types",
    title: "3. Cookies We Use",
    isTable: true,
    content: [
      `The table below describes the specific cookies used on the OneSoft website, grouped by category. You can control which non-essential categories are active using your browser settings or our consent tool.`,
    ],
  },
  {
    id: "third-party",
    title: "4. Third-Party Cookies",
    content: [
      `Some pages on our website may embed content or functionality from third-party services, which may set their own cookies on your device. These third-party services include:`,
      `**Google Analytics** — Used to analyse website traffic and user behaviour. Google's privacy policy is available at policies.google.com/privacy.`,
      `**Google Ads / DoubleClick** — Used for advertising measurement and remarketing. You can opt out at adssettings.google.com.`,
      `**Meta (Facebook) Pixel** — Used to track conversions from Facebook and Instagram advertising. Meta's cookie policy is available at facebook.com/policies/cookies.`,
      `**LinkedIn Insight Tag** — Used to track conversions from LinkedIn advertising campaigns. LinkedIn's cookie policy is at linkedin.com/legal/cookie-policy.`,
      `OneSoft does not control the cookies set by these third parties. We recommend reviewing their respective privacy and cookie policies for full details.`,
    ],
  },
  {
    id: "consent",
    title: "5. Your Consent",
    content: [
      `When you first visit our website, you will be presented with a cookie consent notice. Strictly necessary cookies are always active and do not require your consent, as they are essential for the website to function.`,
      `For all other cookie categories (analytics, preference, and marketing cookies), we will only set these cookies if you explicitly consent via the cookie consent tool.`,
      `You may withdraw or change your consent at any time by clearing cookies in your browser settings (see Section 6) or by contacting us at info@onesoft.org.uk.`,
      `Please note that withdrawing consent for certain cookies may affect the functionality of the website or our ability to provide you with a personalised experience.`,
    ],
  },
  {
    id: "managing-cookies",
    title: "6. Managing & Disabling Cookies",
    content: [
      `You can control and manage cookies in several ways:`,
      `**Browser settings** — Most browsers allow you to view, block, or delete cookies through their settings. Below are links to instructions for common browsers:`,
      `Google Chrome: support.google.com/chrome/answer/95647`,
      `Mozilla Firefox: support.mozilla.org/en-US/kb/cookies`,
      `Microsoft Edge: support.microsoft.com/en-gb/microsoft-edge/cookies`,
      `Apple Safari: support.apple.com/en-gb/guide/safari/sfri11471`,
      `**Google Analytics opt-out** — You can prevent Google Analytics from collecting data about your visits by installing the Google Analytics Opt-out Browser Add-on, available at tools.google.com/dlpage/gaoptout.`,
      `**Industry opt-out tools** — You can opt out of interest-based advertising from many ad networks through the Your Online Choices tool at youronlinechoices.eu.`,
      `**Please note** — Blocking all cookies, including strictly necessary cookies, may prevent parts of our website from working correctly. Deleting cookies will also reset your consent preferences, meaning you may be asked for consent again on your next visit.`,
    ],
  },
  {
    id: "do-not-track",
    title: "7. Do Not Track",
    content: [
      `Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not wish to be tracked. There is currently no universal standard for how websites should respond to DNT signals.`,
      `At present, our website does not respond to DNT signals. If a universal standard is established, we will update this policy accordingly.`,
    ],
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: [
      `We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for legal, operational, or regulatory reasons. The "Last updated" date at the top of this page will reflect the most recent revision.`,
      `We encourage you to review this policy periodically to stay informed about how we use cookies. Where changes are material, we will notify you through a prominent notice on our website or via email if you are an existing client.`,
    ],
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: [
      `If you have any questions about our use of cookies or this Cookie Policy, please get in touch:`,
    ],
  },
];

/* ── Bold-markdown renderer ─────────────────────────────── */
function Para({ text, color }: { text: string; color: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <p className="text-sm leading-relaxed mb-3" style={{ color }}>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i} style={{ color, fontWeight: 700 }}>{part}</strong>
          : part
      )}
    </p>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function CookiePolicyPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const pageBg       = isLight ? "#ffffff"             : "#070e1c";
  const sectionBg    = isLight ? "#F5F5F5"             : "#04091a";
  const cardBg       = isLight ? "#ffffff"             : "#07111f";
  const divider      = isLight ? "rgba(0,0,0,0.08)"   : "rgba(255,255,255,0.08)";
  const t55          = isLight ? "rgba(15,23,42,0.6)"  : "rgba(255,255,255,0.55)";
  const t75          = isLight ? "rgba(15,23,42,0.80)" : "rgba(255,255,255,0.75)";
  const headingColor = isLight ? "#0f172a"             : "#ffffff";

  return (
    <div style={{ background: pageBg, minHeight: "100vh" }}>
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10" style={{ borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE }}>
              <Cookie className="w-3 h-3" /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: headingColor }}>
              Cookie Policy
            </h1>
            <p className="text-base leading-relaxed mb-3" style={{ color: t75 }}>
              This policy explains what cookies are, which cookies OneSoft uses on this website, and how you can control them. We are committed to being transparent about the data we collect.
            </p>
            <p className="text-xs font-medium" style={{ color: t55 }}>
              Last updated: 16 May 2025 &nbsp;·&nbsp; Effective date: 1 January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">

          {/* Sticky TOC */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 rounded-2xl p-5" style={{ background: sectionBg, border: `1px solid ${divider}` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: t55 }}>Contents</p>
              <nav className="space-y-1">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`}
                    className="block text-xs py-1.5 px-2 rounded-lg transition-colors hover:text-white"
                    style={{ color: t55 }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${BLUE}18`)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-10">
              {sections.map((sec, i) => (
                <motion.section key={sec.id} id={sec.id}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.03 }}
                  className="rounded-2xl p-6 md:p-8"
                  style={{ background: cardBg, border: `1px solid ${divider}` }}>
                  <h2 className="text-lg font-black mb-4" style={{ color: headingColor }}>{sec.title}</h2>

                  {sec.content.map((para, j) => (
                    <Para key={j} text={para} color={t75} />
                  ))}

                  {/* Cookie table */}
                  {sec.isTable && (
                    <div className="mt-4 space-y-6">
                      {cookieTable.map(cat => (
                        <div key={cat.category} className="rounded-xl overflow-hidden"
                          style={{ border: `1px solid ${divider}` }}>
                          {/* Category header */}
                          <div className="flex items-center justify-between px-4 py-3"
                            style={{ background: `${cat.color}12`, borderBottom: `1px solid ${divider}` }}>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                              <span className="text-sm font-black" style={{ color: headingColor }}>{cat.category}</span>
                            </div>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: cat.canDisable === "No" ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.10)",
                                color: cat.canDisable === "No" ? "#16a34a" : "#dc2626",
                                border: `1px solid ${cat.canDisable === "No" ? "rgba(22,163,74,0.25)" : "rgba(220,38,38,0.20)"}`,
                              }}>
                              {cat.canDisable === "No" ? "Always active" : "Can be disabled"}
                            </span>
                          </div>
                          {/* Cookie rows */}
                          <div className="divide-y" style={{ borderColor: divider }}>
                            {cat.examples.map(ck => (
                              <div key={ck.name} className="grid grid-cols-[140px_1fr_80px] gap-3 px-4 py-3 text-xs">
                                <span className="font-mono font-bold pt-0.5 break-all" style={{ color: cat.color }}>{ck.name}</span>
                                <span style={{ color: t75 }}>{ck.purpose}</span>
                                <span className="text-right" style={{ color: t55 }}>{ck.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact section */}
                  {sec.id === "contact" && (
                    <div className="mt-5 space-y-3">
                      {[
                        { icon: Mail,   label: "Email",      value: "info@onesoft.org.uk", href: "mailto:info@onesoft.org.uk" },
                        { icon: Phone,  label: "Phone (UK)", value: "+44 7984 273482",      href: "tel:+447984273482" },
                        { icon: MapPin, label: "Address",    value: "Hull, United Kingdom", href: "#" },
                      ].map(c => (
                        <a key={c.label} href={c.href}
                          className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                          style={{ background: sectionBg, border: `1px solid ${divider}` }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${BLUE}18`, border: `1px solid ${BLUE}30` }}>
                            <c.icon className="w-4 h-4" style={{ color: BLUE }} />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: t55 }}>{c.label}</p>
                            <p className="text-sm font-medium" style={{ color: headingColor }}>{c.value}</p>
                          </div>
                        </a>
                      ))}
                      <p className="text-xs mt-3 leading-relaxed" style={{ color: t55 }}>
                        You can also complain about our use of cookies to the UK Information Commissioner's Office at{" "}
                        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer"
                          className="underline" style={{ color: BLUE }}>ico.org.uk</a>.
                      </p>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
