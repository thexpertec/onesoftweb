import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const BLUE = "#1E4DA0";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      `OneSoft Ltd ("OneSoft", "we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at onesoft.org.uk, use our software products, or engage with our services.`,
      `Please read this policy carefully. By using our website or services, you confirm that you have read, understood, and agree to this policy. If you do not agree, please stop using our services.`,
      `OneSoft Ltd is registered in England & Wales. Our registered office is in Hull, United Kingdom. We are the data controller for personal data collected through this website and our services.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      `We may collect and process the following categories of personal data:`,
      `**Contact and Identity Data** — Your name, email address, phone number, company name, and job title when you fill in a contact form, book a demo, or request a quote.`,
      `**Technical Data** — IP address, browser type and version, time zone setting, operating system, and platform, collected automatically when you visit our website.`,
      `**Usage Data** — Information about how you use our website, including pages visited, time spent, referral source, and click paths — collected via analytics tools.`,
      `**Communications Data** — Records of any correspondence you send us, including emails and enquiry form submissions.`,
      `**ERP & Software Data** — If you are a client using our ERP or custom software systems, we may process operational data on your behalf as a data processor under a separate Data Processing Agreement.`,
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: [
      `We use your personal data only for lawful purposes. The specific purposes and legal bases are:`,
      `**To respond to enquiries** — When you contact us or submit a form, we process your details to respond to your request. Legal basis: legitimate interests.`,
      `**To deliver our services** — When you are a client, we process data as necessary to fulfil our contractual obligations to you. Legal basis: performance of a contract.`,
      `**To improve our website and services** — We use aggregated analytics data to understand how our website is used and where we can improve. Legal basis: legitimate interests.`,
      `**Marketing communications** — We may send you information about our services if you have opted in, or if you are an existing client. You can opt out at any time. Legal basis: consent or legitimate interests.`,
      `**Legal compliance** — We may process your data where required to comply with a legal obligation. Legal basis: legal obligation.`,
    ],
  },
  {
    id: "data-sharing",
    title: "4. Sharing Your Data",
    content: [
      `We do not sell, rent, or trade your personal information to third parties. We may share your data only in the following circumstances:`,
      `**Service providers** — We work with trusted third-party providers (e.g. hosting, analytics, email platforms) who process data on our behalf under strict data processing agreements.`,
      `**Legal requirements** — We may disclose your data if required by law, court order, or government authority.`,
      `**Business transfers** — In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you before this occurs.`,
      `All third-party service providers are required to take appropriate security measures and are not permitted to use your data for their own purposes.`,
    ],
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: [
      `We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including any legal, accounting, or reporting requirements.`,
      `**Enquiry and contact data** is retained for up to 2 years from the date of last contact.`,
      `**Client data** is retained for the duration of the contract and for 6 years thereafter in accordance with UK financial record-keeping requirements.`,
      `**Analytics data** is retained in anonymised or aggregated form for up to 26 months.`,
      `When data is no longer required, it is securely deleted or anonymised.`,
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    content: [
      `Under UK GDPR and the Data Protection Act 2018, you have the following rights regarding your personal data:`,
      `**Right of access** — You may request a copy of the personal data we hold about you.`,
      `**Right to rectification** — You may ask us to correct inaccurate or incomplete data.`,
      `**Right to erasure** — You may ask us to delete your data where there is no compelling reason for its continued processing.`,
      `**Right to restrict processing** — You may ask us to suspend processing your data in certain circumstances.`,
      `**Right to data portability** — You may request that we transfer your data to you or a third party in a structured, machine-readable format.`,
      `**Right to object** — You may object to processing based on legitimate interests or for direct marketing purposes.`,
      `To exercise any of these rights, please contact us at info@onesoft.org.uk. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies",
    content: [
      `Our website uses cookies to distinguish you from other users and to improve your experience. Cookies are small text files placed on your device.`,
      `**Strictly necessary cookies** — Required for the website to function. These cannot be disabled.`,
      `**Analytics cookies** — We use tools such as Google Analytics to collect anonymised data about how visitors use our site. These cookies help us improve our content and performance. You may opt out via your browser settings or by using the ICO's opt-out tool.`,
      `**Preference cookies** — These remember your settings (such as dark/light mode) to personalise your experience.`,
      `By continuing to use our website you consent to our use of cookies. You can withdraw consent at any time by clearing cookies in your browser settings.`,
    ],
  },
  {
    id: "security",
    title: "8. Data Security",
    content: [
      `We implement appropriate technical and organisational security measures to protect your personal data against accidental loss, unauthorised access, alteration, or disclosure. These measures include SSL/TLS encryption, access controls, and regular security reviews.`,
      `We limit access to your personal data to employees, contractors, and agents who have a business need to know. They are subject to confidentiality obligations.`,
      `While we take all reasonable steps to protect your data, no transmission over the internet is completely secure. We cannot guarantee the absolute security of data transmitted to our website.`,
    ],
  },
  {
    id: "international-transfers",
    title: "9. International Data Transfers",
    content: [
      `OneSoft operates offices in the United Kingdom, the United Arab Emirates, and Pakistan. If your data is processed or accessed from outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements.`,
      `For transfers to countries without an adequacy decision, we use standard contractual clauses approved by the ICO, or rely on other lawful transfer mechanisms.`,
    ],
  },
  {
    id: "third-party-links",
    title: "10. Third-Party Links",
    content: [
      `Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices.`,
      `We encourage you to read the privacy policy of every website you visit.`,
    ],
  },
  {
    id: "children",
    title: "11. Children's Privacy",
    content: [
      `Our services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have collected data from a child without appropriate consent, please contact us immediately and we will take steps to delete it.`,
    ],
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: [
      `We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will reflect the most recent revision. Where changes are material, we will notify you by email (if you are a client) or by posting a prominent notice on our website.`,
      `We encourage you to review this policy periodically to stay informed about how we protect your information.`,
    ],
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: [
      `If you have any questions about this Privacy Policy, wish to exercise your data rights, or have a concern about how we handle your personal data, please contact us:`,
    ],
  },
];

/* ── Render a content paragraph — bold markdown style ── */
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
export default function PrivacyPolicyPage() {
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
              <Shield className="w-3 h-3" /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: headingColor }}>
              Privacy Policy
            </h1>
            <p className="text-base leading-relaxed mb-3" style={{ color: t75 }}>
              This policy explains how OneSoft Ltd collects, uses, and protects your personal information. We take your privacy seriously and are committed to handling your data transparently and responsibly.
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

                  {/* Contact section extras */}
                  {sec.id === "contact" && (
                    <div className="mt-5 space-y-3">
                      {[
                        { icon: Mail,    label: "Email", value: "info@onesoft.org.uk",      href: "mailto:info@onesoft.org.uk" },
                        { icon: Phone,   label: "Phone (UK)", value: "+44 7984 273482",     href: "tel:+447984273482" },
                        { icon: MapPin,  label: "Address", value: "Hull, United Kingdom",  href: "#" },
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
                        You also have the right to complain to the UK Information Commissioner's Office (ICO) at{" "}
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
