import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

const BLUE = "#1E4DA0";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      `This Service Level Agreement ("SLA") sets out the standards of service that OneSoft Ltd ("OneSoft", "we", "us", or "our") commits to delivering to its clients ("Client", "you") for ongoing managed services, hosted software products, retainer agreements, and support engagements.`,
      `This SLA is incorporated by reference into the applicable Statement of Work ("SOW") or Master Services Agreement ("MSA") between OneSoft and the Client. In the event of any conflict between this SLA and the SOW, the SOW shall prevail.`,
      `This SLA applies from the commencement date stated in the SOW and remains in force for the duration of the engagement unless superseded by a revised SLA agreed in writing.`,
    ],
  },
  {
    id: "scope",
    title: "2. Scope of Coverage",
    content: [
      `This SLA covers the following services where applicable to your engagement:`,
      `**Hosted ERP & Software Products** — OneSoft-hosted instances of our ERP systems (School ERP, Hospital ERP, E-commerce ERP, Restaurant ERP, Shadi Hall ERP, Distributor ERP, Accounting ERP) and any bespoke hosted software developed by OneSoft.`,
      `**Website Hosting & Maintenance** — Websites hosted by OneSoft under an active maintenance or retainer plan, including uptime monitoring, security updates, and content changes.`,
      `**Support Services** — Technical support, bug fixing, and incident resolution for software products and websites covered under an active support plan.`,
      `**Retainer Engagements** — Ongoing digital marketing, SEO, AI automation, or development retainers where a defined monthly scope has been agreed.`,
      `This SLA does not apply to: one-off project deliveries, work performed under a fixed-price project with no ongoing support component, or services disrupted by causes within the Client's control or outside our reasonable control (see Force Majeure in the Terms of Service).`,
    ],
  },
  {
    id: "uptime",
    title: "3. Uptime Guarantee",
    content: [
      `OneSoft commits to the following uptime guarantees for hosted products and websites:`,
      `**Standard Plan** — 99.5% monthly uptime, equating to a maximum of approximately 3.6 hours of unplanned downtime per month.`,
      `**Professional Plan** — 99.9% monthly uptime, equating to a maximum of approximately 43 minutes of unplanned downtime per month.`,
      `**Enterprise Plan** — 99.95% monthly uptime, equating to a maximum of approximately 22 minutes of unplanned downtime per month.`,
      `Uptime is calculated as: ((total minutes in month − unplanned downtime minutes) / total minutes in month) × 100.`,
      `**Scheduled maintenance** — Planned maintenance windows (typically 02:00–05:00 UTC on weekdays) are excluded from uptime calculations. We will provide at least 48 hours' notice for scheduled maintenance expected to exceed 15 minutes.`,
      `**Exclusions** — Downtime caused by the following is excluded from SLA calculations: Client-side internet connectivity issues, force majeure events, third-party platform outages (e.g. hosting providers, payment gateways, DNS providers), or actions taken by the Client or their authorised users.`,
    ],
  },
  {
    id: "support-hours",
    title: "4. Support Hours",
    content: [
      `OneSoft provides support during the following hours, based on the Client's plan:`,
      `**Standard Plan** — Monday to Friday, 09:00–17:00 UK time (GMT/BST). Excluding UK public holidays.`,
      `**Professional Plan** — Monday to Friday, 08:00–20:00 UK time. Saturday, 09:00–14:00 UK time. Excluding UK public holidays.`,
      `**Enterprise Plan** — Monday to Sunday, 08:00–22:00 UK time. Including UK public holidays.`,
      `Support requests received outside of supported hours will be acknowledged on the next business day unless they qualify as a Critical incident (see Section 5).`,
      `Support is provided via email at info@onesoft.org.uk, telephone at +44 7984 273482, and the designated support portal or ticketing system where applicable.`,
    ],
  },
  {
    id: "response-times",
    title: "5. Incident Response & Resolution Times",
    content: [
      `Incidents are classified by severity. Response and resolution targets are measured from the time a support request is received and acknowledged during supported hours.`,
      `**P1 — Critical** — Complete loss of service or a critical system outage affecting all users. Initial response: 1 hour (all plans). Target resolution: 4 hours (Enterprise), 8 hours (Professional), next business day (Standard).`,
      `**P2 — High** — Major functionality impaired, significant user impact, no viable workaround. Initial response: 4 hours (all plans, during supported hours). Target resolution: 1 business day (Enterprise), 2 business days (Professional), 3 business days (Standard).`,
      `**P3 — Medium** — Partial functionality impaired, workaround available, moderate impact on operations. Initial response: 1 business day (all plans). Target resolution: 3 business days (Enterprise & Professional), 5 business days (Standard).`,
      `**P4 — Low** — Minor issues, cosmetic defects, general queries, or feature requests. Initial response: 2 business days (all plans). Target resolution: Agreed on a case-by-case basis.`,
      `Response time targets are best-effort commitments. Resolution times may be extended where a defect requires a new software release, third-party involvement, or Client cooperation to diagnose and fix.`,
    ],
  },
  {
    id: "credits",
    title: "6. Service Credits",
    content: [
      `Where OneSoft fails to meet the uptime guarantee in a given calendar month (excluding scheduled maintenance and exclusions in Section 3), the Client may be eligible for a service credit applied to their next invoice.`,
      `**Credit schedule:**`,
      `**99.0% – 99.49% uptime** (Standard breach) — 5% credit of the affected month's service fee.`,
      `**95.0% – 98.99% uptime** — 10% credit of the affected month's service fee.`,
      `**Below 95.0% uptime** — 20% credit of the affected month's service fee.`,
      `**Claiming credits** — Credits must be requested in writing within 14 days of the end of the affected month. OneSoft will review the request and apply any valid credit to the Client's next invoice within 30 days.`,
      `**Limitation** — Service credits are the Client's sole and exclusive remedy for uptime failures. Credits do not apply to services disrupted by causes outside OneSoft's reasonable control, or where the Client's account is in arrears.`,
      `**Maximum credit** — Total service credits in any calendar month shall not exceed 30% of the monthly service fee for the affected service.`,
    ],
  },
  {
    id: "backups",
    title: "7. Data Backup & Recovery",
    content: [
      `OneSoft maintains automated backups of all hosted client data in accordance with the following schedule:`,
      `**Standard Plan** — Daily backups, retained for 14 days. Recovery point objective (RPO): 24 hours. Recovery time objective (RTO): 8 business hours.`,
      `**Professional Plan** — Daily backups, retained for 30 days. RPO: 24 hours. RTO: 4 business hours.`,
      `**Enterprise Plan** — Daily backups with weekly full snapshots, retained for 90 days. RPO: 24 hours. RTO: 2 business hours.`,
      `Backups are stored in geographically separate locations from primary data. OneSoft will attempt to restore data upon request, however, we cannot guarantee that all data will be recoverable in all circumstances.`,
      `**Client responsibility** — Clients are encouraged to maintain their own independent backups of critical data. OneSoft is not liable for data loss resulting from Client actions, accidental deletion, or errors introduced by the Client's users.`,
    ],
  },
  {
    id: "security",
    title: "8. Security Standards",
    content: [
      `OneSoft implements the following security measures across all hosted environments:`,
      `**Encryption** — All data in transit is encrypted using TLS 1.2 or higher. Data at rest is encrypted using AES-256 encryption.`,
      `**Access controls** — Access to production environments is restricted to authorised OneSoft personnel only, using multi-factor authentication (MFA) and role-based access controls.`,
      `**Vulnerability management** — We perform regular security patching of server infrastructure and application dependencies. Critical security patches are applied within 48 hours of release.`,
      `**Penetration testing** — Annual penetration tests are conducted on our hosting infrastructure by qualified third-party security professionals.`,
      `**Incident notification** — In the event of a confirmed security breach affecting Client data, OneSoft will notify the Client within 72 hours of becoming aware, in accordance with UK GDPR obligations.`,
    ],
  },
  {
    id: "client-obligations",
    title: "9. Client Obligations",
    content: [
      `To enable OneSoft to meet the service levels in this SLA, the Client agrees to:`,
      `**Timely reporting** — Report incidents and support requests promptly through the agreed channels. Delays in reporting may affect resolution time targets.`,
      `**Access & cooperation** — Provide OneSoft with timely access to systems, environments, and personnel reasonably required to diagnose and resolve incidents.`,
      `**Authorised contacts** — Designate a primary technical contact who is authorised to raise support requests and make decisions regarding the service.`,
      `**Acceptable use** — Use the hosted services in accordance with OneSoft's Terms of Service and not undertake actions that knowingly degrade performance or security.`,
      `**Timely payment** — Maintain an account in good standing. OneSoft is not obligated to meet SLA commitments where the Client's account is in arrears.`,
    ],
  },
  {
    id: "change-management",
    title: "10. Change Management",
    content: [
      `**Planned changes** — Any changes to hosted software, configurations, or integrations that may affect service availability will be communicated to the Client at least 48 hours in advance.`,
      `**Emergency changes** — Critical security patches or emergency fixes may be applied without advance notice. OneSoft will notify the Client as soon as practicable after the change is made.`,
      `**Client-requested changes** — Changes requested by the Client that fall outside the agreed scope will be assessed, quoted, and delivered under a separate change request or SOW amendment.`,
      `**Change freeze** — Clients on Professional and Enterprise plans may request a change freeze period (e.g. around peak trading periods). Reasonable requests will be accommodated with a minimum of 7 days' notice.`,
    ],
  },
  {
    id: "reporting",
    title: "11. Reporting & Reviews",
    content: [
      `**Monthly reports** — Professional and Enterprise plan clients receive a monthly service report covering: uptime statistics, incident summary, open/closed support tickets, backup status, and security patch status.`,
      `**Standard plan clients** — Receive a quarterly summary report upon request.`,
      `**Service reviews** — Enterprise clients are offered a quarterly service review call with a senior OneSoft account manager to review performance against SLA targets and discuss improvements or upcoming requirements.`,
      `**Incident post-mortems** — For P1 and P2 incidents, OneSoft will provide a written root cause analysis and remediation plan within 5 business days of resolution.`,
    ],
  },
  {
    id: "escalation",
    title: "12. Escalation Path",
    content: [
      `If you are not satisfied with the response or resolution of a support request, you may escalate through the following path:`,
      `**Level 1** — Contact the assigned support engineer via info@onesoft.org.uk or +44 7984 273482. Response within the SLA-defined targets for your plan.`,
      `**Level 2** — If unresolved after the target resolution time, request escalation to a Senior Engineer or Team Lead. Response within 4 business hours of escalation.`,
      `**Level 3** — If still unresolved, escalate to the OneSoft Account Director. Response within 2 business hours. Formal resolution plan issued within 1 business day.`,
      `**Level 4** — For issues involving a potential SLA breach or formal dispute, contact OneSoft management directly at info@onesoft.org.uk with the subject line "SLA Escalation". We will respond within 1 business day.`,
    ],
  },
  {
    id: "amendments",
    title: "13. Amendments & Termination",
    content: [
      `OneSoft reserves the right to amend this SLA with 30 days' written notice. Material changes that reduce service levels will be communicated with at least 30 days' notice, giving the Client the option to terminate the engagement without penalty if the changes are not acceptable.`,
      `This SLA terminates automatically upon the conclusion of the applicable SOW or MSA. Early termination of the SOW is governed by the termination provisions in the Terms of Service.`,
    ],
  },
  {
    id: "contact",
    title: "14. Contact & Support",
    content: [
      `To raise a support request, report an incident, or discuss your SLA, please contact OneSoft through any of the following channels:`,
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
export default function SLAPage() {
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
              <ShieldCheck className="w-3 h-3" /> Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: headingColor }}>
              Service Level Agreement
            </h1>
            <p className="text-base leading-relaxed mb-3" style={{ color: t75 }}>
              This SLA defines OneSoft's commitments to uptime, support response times, data backup, and security for all managed and hosted services. It applies to all active retainer and hosted product engagements.
            </p>
            <p className="text-xs font-medium" style={{ color: t55 }}>
              Last updated: 16 May 2025 &nbsp;·&nbsp; Effective date: 1 January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Plan comparison strip ─────────────────────────── */}
      <section className="py-8 md:py-10" style={{ background: sectionBg, borderBottom: `1px solid ${divider}` }}>
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-6 text-center" style={{ color: t55 }}>
            At a glance — plan comparison
          </p>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  {["", "Standard", "Professional", "Enterprise"].map((h, i) => (
                    <th key={h} className={`py-3 px-4 text-left font-black text-xs uppercase tracking-wide ${i === 0 ? "w-48" : ""}`}
                      style={{
                        color: i === 0 ? t55 : (i === 3 ? BLUE : headingColor),
                        borderBottom: `2px solid ${i === 3 ? BLUE : divider}`,
                      }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Monthly uptime",       "99.5%",                "99.9%",              "99.95%"],
                  ["Support hours",        "Mon–Fri 09–17",        "Mon–Sat extended",   "Mon–Sun 08–22"],
                  ["P1 response",          "1 hour",               "1 hour",             "1 hour"],
                  ["P1 resolution",        "Next business day",    "8 hours",            "4 hours"],
                  ["Backup retention",     "14 days",              "30 days",            "90 days"],
                  ["RTO",                  "8 business hours",     "4 business hours",   "2 business hours"],
                  ["Monthly report",       "On request",           "Included",           "Included"],
                  ["Quarterly review",     "—",                    "—",                  "Included"],
                ].map(([label, std, pro, ent], i) => (
                  <tr key={label} style={{ background: i % 2 === 0 ? "transparent" : `${BLUE}06` }}>
                    <td className="py-3 px-4 font-semibold text-xs" style={{ color: t55 }}>{label}</td>
                    <td className="py-3 px-4 text-xs" style={{ color: t75 }}>{std}</td>
                    <td className="py-3 px-4 text-xs" style={{ color: t75 }}>{pro}</td>
                    <td className="py-3 px-4 text-xs font-semibold" style={{ color: BLUE }}>{ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
