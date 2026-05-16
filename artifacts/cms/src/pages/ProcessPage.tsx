import { useState } from "react";
import { Layout, PageHeader, Btn, Breadcrumb } from "@/components/Layout";
import { Plus, Edit2, Trash2, Save, X, GripVertical, ScanSearch, PencilRuler, Rocket, HeartHandshake } from "lucide-react";

const ICON_OPTIONS = [
  { value: "ScanSearch", label: "🔍 Audit / Search" },
  { value: "PencilRuler", label: "✏️ Design / Plan" },
  { value: "Rocket", label: "🚀 Build / Deploy" },
  { value: "HeartHandshake", label: "🤝 Support / Grow" },
  { value: "CheckCircle2", label: "✅ Complete" },
  { value: "Zap", label: "⚡ Speed / Fast" },
  { value: "Shield", label: "🛡️ Security" },
  { value: "Users", label: "👥 Team" },
  { value: "BarChart3", label: "📊 Analytics" },
  { value: "Globe", label: "🌐 Global" },
];

const INITIAL_STEPS = [
  {
    id: 1, step: "Step 1", icon: "ScanSearch", title: "We audit your business",
    desc: "We map every workflow, data source, and bottleneck — giving you a clear picture of where technology can drive the biggest gains.",
    status: "active",
  },
  {
    id: 2, step: "Step 2", icon: "PencilRuler", title: "We design the solution",
    desc: "Our architects plan a custom ERP or web platform tailored to your industry, team size, and growth targets.",
    status: "active",
  },
  {
    id: 3, step: "Step 3", icon: "Rocket", title: "We build and deploy",
    desc: "We develop, test, and go live with precision — migrating your data and training your team with zero disruption.",
    status: "active",
  },
  {
    id: 4, step: "Step 4", icon: "HeartHandshake", title: "We support and grow",
    desc: "Every client we work with grows. We stay on board with 24/7 support, updates, and new features as your business evolves.",
    status: "active",
  },
];

type Step = typeof INITIAL_STEPS[0];

function StepIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    ScanSearch: <ScanSearch className="w-5 h-5 text-primary" />,
    PencilRuler: <PencilRuler className="w-5 h-5 text-primary" />,
    Rocket: <Rocket className="w-5 h-5 text-primary" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-primary" />,
  };
  return <>{map[icon] || <Rocket className="w-5 h-5 text-primary" />}</>;
}

function EditModal({ step, onClose }: { step: Step; onClose: () => void }) {
  const [form, setForm] = useState({ ...step });
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">{step.id === 0 ? "New Step" : `Edit ${step.step}`}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Step Label</label>
              <input value={form.step} onChange={set("step")} placeholder="Step 1"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon</label>
              <select value={form.icon} onChange={set("icon")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
                {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Step Title</label>
            <input value={form.title} onChange={set("title")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Description</label>
            <textarea value={form.desc} onChange={set("desc")} rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
            <p className="text-[11px] text-muted-foreground mt-1">{form.desc.length} characters</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Status</label>
            <select value={form.status} onChange={set("status")}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50">
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 justify-end px-5 py-4 border-t border-border bg-muted/30">
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={onClose}><Save className="w-4 h-4" /> Save Step</Btn>
        </div>
      </div>
    </div>
  );
}

export default function ProcessPage() {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [editing, setEditing] = useState<Step | null>(null);

  const [sectionHeadline, setSectionHeadline] = useState("How our ERP delivery process works");
  const [sectionSub, setSectionSub] = useState("We get under the hood of your business and find opportunities to replace manual, error-prone processes with powerful, precision-engineered software — delivered on time, every time.");

  return (
    <Layout>
      {editing && <EditModal step={editing} onClose={() => setEditing(null)} />}
      <div className="p-6 max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "How We Work" }]} />
        <PageHeader
          title="How We Work"
          description="4-step ERP delivery process — shown on the homepage"
          action={
            <Btn onClick={() => setEditing({ id: 0, step: `Step ${steps.length + 1}`, icon: "Rocket", title: "", desc: "", status: "active" })}>
              <Plus className="w-4 h-4" /> Add Step
            </Btn>
          }
        />

        {/* Section copy */}
        <div className="bg-card rounded-xl border border-border p-5 mb-6 space-y-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Section Header Text</p>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Section Headline</label>
            <input value={sectionHeadline} onChange={e => setSectionHeadline(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Section Subheading</label>
            <textarea value={sectionSub} onChange={e => setSectionSub(e.target.value)} rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 resize-none" />
          </div>
        </div>

        {/* Visual preview */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-primary mb-3">Live Preview — Step Order</p>
          <div className="flex items-center gap-2 flex-wrap">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <StepIcon icon={s.icon} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{s.step}: {s.title}</span>
                </div>
                {i < steps.length - 1 && <span className="text-muted-foreground/40 text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Steps list */}
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={s.id} className="bg-card rounded-xl border border-border p-4 flex items-start gap-4 group hover:border-primary/30 transition-all">
              <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab mt-1 shrink-0" />

              {/* Step number */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <StepIcon icon={s.icon} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{s.step}</span>
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-foreground mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Btn variant="ghost" size="sm" onClick={() => setEditing(s)}><Edit2 className="w-3.5 h-3.5" /></Btn>
                <Btn variant="ghost" size="sm" onClick={() => setSteps(ss => ss.filter(x => x.id !== s.id))}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Btn>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">{steps.length} steps · drag to reorder (coming soon)</p>
      </div>
    </Layout>
  );
}
