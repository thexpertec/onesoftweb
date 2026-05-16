import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { FileText, Mail, Phone, MapPin } from "lucide-react";

const BLUE = "#1E4DA0";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      `These Terms of Service ("Terms") govern your access to and use of the website at onesoft.org.uk and all services provided by OneSoft Ltd ("OneSoft", "we", "us", or "our"), including but not limited to our ERP software products, custom software development, website design, digital marketing, SEO, AI automation, and related professional services.`,
      `By accessing our website, submitting an enquiry, or entering into a contract with us, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our website or services.`,
      `OneSoft Ltd is registered in England & Wales. These Terms constitute the entire agreement between you and OneSoft with respect to your use of the website and services, and supersede all prior communications or agreements.`,
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: [
      `**"Client"** means any individual, company, or organisation that purchases or engages OneSoft's services under a separate Statement of Work, proposal, or contract.`,
      `**"Services"** means any product or service offered by OneSoft including ERP software, custom software development, website design and development, SEO optimisation, social media marketing, ad creatives, AI automation, and any other digital services.`,
      `**"Deliverables"** means any work product, software, content, design, or materials produced by OneSoft as part of the Services.`,
      `**"Confidential Information"** means any non-public information disclosed by either party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.`,
      `**"Intellectual Property"** means all patents, trademarks, trade names, domain names, rights in designs, copyrights, database rights, know-how, and all other intellectual property rights, whether registered or unregistered.`,
    ],
  },
  {
    id: "services",
    title: "3. Our Services",
    content: [
      `OneSoft provides a range of digital and software services. The specific scope, deliverables, timelines, and fees for each engagement are set out in a separate written agreement, proposal, or Statement of Work ("SOW") agreed between OneSoft and the Client.`,
      `**Scope of work** — All services are delivered strictly in accordance with the agreed scope. Any additions or modifications to the scope must be agreed in writing and may result in additional charges.`,
      `**Subcontracting** — OneSoft may, at its discretion, engage qualified subcontractors or freelancers to deliver elements of the Services. OneSoft remains responsible for the quality of all work delivered.`,
      `**Third-party services** — Certain services may depend on or integrate with third-party platforms (e.g. Google Ads, Meta, Shopify, hosting providers). OneSoft is not liable for changes, outages, or policy updates made by those platforms that affect the delivery or performance of our services.`,
    ],
  },
  {
    id: "payments",
    title: "4. Payment Terms",
    content: [
      `**Invoicing** — Invoices are issued in accordance with the agreed payment schedule in the SOW. Standard payment terms are net 14 days from the date of invoice unless otherwise agreed in writing.`,
      `**Late payment** — Invoices not paid by the due date will accrue interest at 8% per annum above the Bank of England base rate, calculated daily, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.`,
      `**Deposits** — For project-based work, a non-refundable deposit (typically 30–50% of the total project fee) is required before work commences. The deposit confirms the booking and covers initial planning and resource allocation.`,
      `**Disputes** — If you dispute an invoice, you must notify us in writing within 7 days of the invoice date. Undisputed amounts remain payable by the due date.`,
      `**Suspension** — OneSoft reserves the right to suspend services, withhold deliverables, or withdraw access to hosted products in the event of non-payment.`,
      `**Currency** — All fees are quoted and invoiced in British Pounds Sterling (GBP) unless explicitly agreed otherwise.`,
    ],
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    content: [
      `**Client materials** — You retain ownership of all content, data, and materials you provide to OneSoft. You grant OneSoft a non-exclusive licence to use such materials solely for the purpose of delivering the Services.`,
      `**Deliverables** — Upon receipt of full payment, OneSoft assigns to the Client all intellectual property rights in bespoke Deliverables created specifically for the Client under the SOW, except as stated below.`,
      `**Retained rights** — OneSoft retains all rights in its proprietary tools, frameworks, libraries, methods, and pre-existing intellectual property ("Background IP"), including any elements of the Deliverables that incorporate Background IP. OneSoft grants the Client a non-exclusive, perpetual licence to use the Background IP solely as incorporated within the Deliverables.`,
      `**Third-party components** — Deliverables may include third-party open-source software, stock assets, or licensed components. Ownership of these components remains with their respective owners. OneSoft will notify the Client of any material third-party licences applicable to the Deliverables.`,
      `**Portfolio use** — Unless the Client requests confidentiality in writing, OneSoft reserves the right to reference the Client's name, display the Deliverables, and describe the project in its portfolio, case studies, and marketing materials.`,
    ],
  },
  {
    id: "confidentiality",
    title: "6. Confidentiality",
    content: [
      `Each party agrees to keep the other's Confidential Information strictly confidential and not to disclose it to any third party without the prior written consent of the other party, except as required by law or regulation.`,
      `Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party at the time of disclosure; (c) is independently developed by the receiving party; or (d) is required to be disclosed by law, court order, or regulatory authority.`,
      `Confidentiality obligations survive the termination of these Terms or any SOW for a period of three (3) years.`,
    ],
  },
  {
    id: "warranties",
    title: "7. Warranties & Representations",
    content: [
      `**OneSoft warrants** that: (a) Services will be performed with reasonable skill and care; (b) Deliverables will materially conform to the specifications in the agreed SOW at the time of delivery; and (c) we have the right to provide the Services and grant the licences set out in these Terms.`,
      `**Client warrants** that: (a) you have the authority to enter into and be bound by these Terms; (b) all materials and information you provide to OneSoft are accurate and do not infringe any third-party rights; and (c) your use of the Deliverables will comply with all applicable laws.`,
      `**Disclaimer** — Except as expressly stated, OneSoft makes no warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that services will be uninterrupted, error-free, or that specific business results (e.g. search engine rankings, advertising ROI) will be achieved.`,
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      `**Cap on liability** — To the maximum extent permitted by law, OneSoft's total aggregate liability to you arising out of or in connection with these Terms or any SOW shall not exceed the total fees paid by you to OneSoft in the twelve (12) months preceding the event giving rise to the claim.`,
      `**Excluded losses** — OneSoft shall not be liable for any: (a) loss of profits, revenue, or business; (b) loss of data or goodwill; (c) indirect, consequential, special, or punitive damages; whether arising in contract, tort (including negligence), or otherwise — even if advised of the possibility of such damages.`,
      `**Exceptions** — Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.`,
    ],
  },
  {
    id: "termination",
    title: "9. Termination",
    content: [
      `**By the Client** — You may terminate a project engagement by providing 30 days' written notice. You remain liable for all fees incurred up to the termination date, plus the cost of any work in progress. Deposits are non-refundable.`,
      `**By OneSoft** — We may terminate or suspend services immediately by written notice if: (a) you fail to make any payment due; (b) you breach any material term and fail to remedy the breach within 14 days of written notice; (c) you become insolvent or enter administration or liquidation; or (d) continuing to provide services would cause us to violate any applicable law.`,
      `**Effect of termination** — Upon termination, your right to use any software, platform, or hosted services provided by OneSoft will cease immediately unless the parties agree otherwise in writing. Each party will promptly return or destroy the other's Confidential Information.`,
      `**Retainer agreements** — Retainer engagements require 30 days' written notice to terminate from either party, unless otherwise specified in the SOW.`,
    ],
  },
  {
    id: "acceptable-use",
    title: "10. Acceptable Use",
    content: [
      `You agree not to use our website or services to:`,
      `**Illegal activity** — Engage in, facilitate, or promote any activity that violates any applicable local, national, or international law or regulation.`,
      `**Harmful content** — Transmit, distribute, or store any content that is unlawful, defamatory, obscene, fraudulent, or harmful, or that infringes any third-party intellectual property rights.`,
      `**System interference** — Interfere with or disrupt the integrity or performance of our website, services, or infrastructure, including through denial-of-service attacks, malware, or data scraping.`,
      `**Impersonation** — Misrepresent your identity or affiliation, or impersonate any person or organisation.`,
      `OneSoft reserves the right to suspend or terminate access for any user or client found to be in breach of this acceptable use policy.`,
    ],
  },
  {
    id: "data-protection",
    title: "11. Data Protection",
    content: [
      `Both parties agree to comply with all applicable data protection legislation, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
      `Where OneSoft processes personal data on behalf of the Client as a data processor, the parties will enter into a separate Data Processing Agreement (DPA) setting out the subject matter, nature, and purpose of the processing.`,
      `For details of how OneSoft processes personal data collected through the website, please refer to our Privacy Policy at onesoft.org.uk/privacy-policy.`,
    ],
  },
  {
    id: "force-majeure",
    title: "12. Force Majeure",
    content: [
      `OneSoft shall not be in breach of these Terms nor liable for delay in performing, or failure to perform, any of our obligations if such delay or failure results from events, circumstances, or causes beyond our reasonable control, including but not limited to acts of God, natural disasters, epidemic or pandemic, acts of government, civil unrest, fire, flood, or failure of third-party infrastructure.`,
      `In such circumstances, we will notify you as soon as reasonably practicable and take all reasonable steps to minimise the impact of the event. If the force majeure event continues for more than 60 days, either party may terminate the affected engagement by written notice.`,
    ],
  },
  {
    id: "governing-law",
    title: "13. Governing Law & Disputes",
    content: [
      `These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the laws of England and Wales.`,
      `The parties agree that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms.`,
      `Before commencing legal proceedings, the parties agree to attempt to resolve any dispute by good-faith negotiation for a period of 30 days. If the dispute cannot be resolved by negotiation, either party may refer the matter to mediation before litigation.`,
    ],
  },
  {
    id: "changes",
    title: "14. Changes to These Terms",
    content: [
      `OneSoft reserves the right to update or modify these Terms at any time. The "Last updated" date at the top of this page reflects the most recent revision.`,
      `For existing Clients, changes to these Terms will not affect active SOWs already in force unless agreed in writing. For new engagements, the Terms in effect at the time of the SOW will apply.`,
      `Your continued use of our website after changes are posted constitutes your acceptance of the revised Terms.`,
    ],
  },
  {
    id: "contact",
    title: "15. Contact Us",
    content: [
      `For any questions about these Terms, or to discuss a specific engagement, please get in touch:`,
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
export default function TermsOfServicePage() {
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
              <FileText className="w-3 h-3" /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: headingColor }}>
              Terms of Service
            </h1>
            <p className="text-base leading-relaxed mb-3" style={{ color: t75 }}>
              These Terms govern your use of the OneSoft website and all services we provide. Please read them carefully before engaging with us.
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
