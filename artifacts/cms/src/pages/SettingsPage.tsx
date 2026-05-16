import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import { Save, Globe, Mail, Phone, MapPin, Shield, Bell, Palette, Code2, Users, ChevronRight } from "lucide-react";

const TABS = [
  { id: "general",  label: "General",     icon: Globe },
  { id: "seo",      label: "SEO",         icon: Code2 },
  { id: "contact",  label: "Contact",     icon: Mail },
  { id: "users",    label: "Admin Users", icon: Users },
  { id: "notifs",   label: "Notifications",icon: Bell },
  { id: "security", label: "Security",    icon: Shield },
];

function Field({ label, value, onChange, type = "text", mono = false, hint }:
  { label: string; value: string; onChange: (v: string) => void; type?: string; mono?: boolean; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all ${mono ? "font-mono" : ""}`} />
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button onClick={() => onChange(!value)}
        className={`w-10 h-5.5 rounded-full transition-all shrink-0 relative flex items-center ${value ? "bg-primary" : "bg-muted border border-border"}`}>
        <span className={`w-4 h-4 rounded-full bg-white shadow transition-transform absolute ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [general, setGeneral] = useState({ siteName: "OneSoft", tagline: "Smart Business Software", siteUrl: "https://onesoft.org.uk", timezone: "Europe/London", language: "en-GB" });
  const [seo, setSeo] = useState({ metaTitle: "OneSoft — Smart ERP & Digital Marketing", metaDesc: "OneSoft delivers industry-specific ERP systems, custom software, and digital marketing services for businesses in the UK, UAE, and Pakistan.", ogImage: "/og-image.jpg", googleTag: "G-XXXXXXXXXX", robotsTxt: "User-agent: *\nAllow: /" });
  const [contact, setContact] = useState({ email: "info@onesoft.org.uk", phone: "+44 7984 273482", address: "Hull, East Yorkshire, United Kingdom", linkedIn: "https://linkedin.com/company/onesoft", twitter: "https://twitter.com/onesoftuk" });
  const [toggles, setToggles] = useState({ maintenanceMode: false, showCookieBanner: true, allowIndexing: true, blogComments: false, autoSaveDrafts: true, emailNotifs: true });

  const setT = (k: string) => (v: boolean) => setToggles(t => ({ ...t, [k]: v }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const adminUsers = [
    { name: "Sarah Mitchell", email: "sarah@onesoft.org.uk", role: "Super Admin", lastLogin: "Today 09:14", avatar: "SM", color: "#7c3aed" },
    { name: "Bilal Qureshi", email: "bilal@onesoft.org.uk", role: "Admin", lastLogin: "Yesterday 14:32", avatar: "BQ", color: "#1E4DA0" },
    { name: "Omar Farooq", email: "omar@onesoft.org.uk", role: "Editor", lastLogin: "12 May 2025", avatar: "OF", color: "#0891b2" },
    { name: "Aisha Malik", email: "aisha@onesoft.org.uk", role: "Editor", lastLogin: "11 May 2025", avatar: "AM", color: "#16a34a" },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]} />
        <PageHeader title="Settings" description="Global site configuration and admin preferences."
          action={<Btn onClick={handleSave}><Save className="w-4 h-4" /> {saved ? "Saved ✓" : "Save Changes"}</Btn>} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-48 shrink-0">
            <nav className="space-y-0.5 bg-card rounded-xl border border-border overflow-hidden p-1.5">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">{TABS.find(t => t.id === tab)?.label}</h2>
            </div>
            <div className="p-5">
              {tab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Site Name" value={general.siteName} onChange={v => setGeneral(g => ({ ...g, siteName: v }))} />
                    <Field label="Tagline" value={general.tagline} onChange={v => setGeneral(g => ({ ...g, tagline: v }))} />
                  </div>
                  <Field label="Site URL" value={general.siteUrl} onChange={v => setGeneral(g => ({ ...g, siteUrl: v }))} hint="Used for canonical URLs and OG tags." mono />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Default Timezone" value={general.timezone} onChange={v => setGeneral(g => ({ ...g, timezone: v }))} />
                    <Field label="Language" value={general.language} onChange={v => setGeneral(g => ({ ...g, language: v }))} />
                  </div>
                  <div className="pt-2">
                    <Toggle label="Maintenance Mode" desc="Takes the site offline for visitors. Admins can still access the CMS." value={toggles.maintenanceMode} onChange={setT("maintenanceMode")} />
                    <Toggle label="Allow Search Indexing" desc="Tells search engines to index the site via robots.txt." value={toggles.allowIndexing} onChange={setT("allowIndexing")} />
                    <Toggle label="Show Cookie Banner" desc="Displays the cookie consent banner on first visit." value={toggles.showCookieBanner} onChange={setT("showCookieBanner")} />
                  </div>
                </div>
              )}

              {tab === "seo" && (
                <div className="space-y-4">
                  <Field label="Default Meta Title" value={seo.metaTitle} onChange={v => setSeo(s => ({ ...s, metaTitle: v }))} hint={`${seo.metaTitle.length}/60 chars recommended`} />
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Default Meta Description</label>
                    <textarea value={seo.metaDesc} onChange={e => setSeo(s => ({ ...s, metaDesc: e.target.value }))} rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
                    <p className="text-[11px] text-muted-foreground mt-1">{seo.metaDesc.length}/160 chars</p>
                  </div>
                  <Field label="Default OG Image Path" value={seo.ogImage} onChange={v => setSeo(s => ({ ...s, ogImage: v }))} mono />
                  <Field label="Google Analytics Tag" value={seo.googleTag} onChange={v => setSeo(s => ({ ...s, googleTag: v }))} mono hint="G-XXXXXXXXXX format" />
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">robots.txt</label>
                    <textarea value={seo.robotsTxt} onChange={e => setSeo(s => ({ ...s, robotsTxt: e.target.value }))} rows={4}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none font-mono" />
                  </div>
                </div>
              )}

              {tab === "contact" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Primary Email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} type="email" />
                    <Field label="Primary Phone" value={contact.phone} onChange={v => setContact(c => ({ ...c, phone: v }))} />
                  </div>
                  <Field label="HQ Address" value={contact.address} onChange={v => setContact(c => ({ ...c, address: v }))} />
                  <Field label="LinkedIn URL" value={contact.linkedIn} onChange={v => setContact(c => ({ ...c, linkedIn: v }))} mono />
                  <Field label="X (Twitter) URL" value={contact.twitter} onChange={v => setContact(c => ({ ...c, twitter: v }))} mono />
                </div>
              )}

              {tab === "users" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">{adminUsers.length} admin users</p>
                    <Btn size="sm"><Users className="w-3.5 h-3.5" /> Invite User</Btn>
                  </div>
                  <div className="space-y-2">
                    {adminUsers.map(u => (
                      <div key={u.email} className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background hover:border-primary/30 transition-all">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                          style={{ background: u.color }}>{u.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${u.role === "Super Admin" ? "bg-primary/10 text-primary" : u.role === "Admin" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}>
                            {u.role}
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-1">Last: {u.lastLogin}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "notifs" && (
                <div>
                  <Toggle label="Email notifications" desc="Receive email alerts for new form submissions and enquiries." value={toggles.emailNotifs} onChange={setT("emailNotifs")} />
                  <Toggle label="Auto-save drafts" desc="Automatically save blog and content changes every 60 seconds." value={toggles.autoSaveDrafts} onChange={setT("autoSaveDrafts")} />
                  <Toggle label="New applicant alerts" desc="Email notification when a new job application is submitted." value={true} onChange={() => {}} />
                  <Toggle label="Weekly digest" desc="A weekly summary of site activity — views, form submissions, new content." value={false} onChange={() => {}} />
                </div>
              )}

              {tab === "security" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-3">Change Password</h3>
                    <div className="space-y-3 max-w-sm">
                      <Field label="Current Password" value="" onChange={() => {}} type="password" />
                      <Field label="New Password" value="" onChange={() => {}} type="password" hint="At least 12 characters." />
                      <Field label="Confirm New Password" value="" onChange={() => {}} type="password" />
                      <Btn><Shield className="w-4 h-4" /> Update Password</Btn>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Toggle label="Two-factor authentication" desc="Require a verification code on login." value={false} onChange={() => {}} />
                    <Toggle label="Session timeout" desc="Automatically log out after 8 hours of inactivity." value={true} onChange={() => {}} />
                    <Toggle label="Login notifications" desc="Email alert when a new sign-in occurs on this account." value={true} onChange={() => {}} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
