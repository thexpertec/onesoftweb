import { useState } from "react";
import { Layout, PageHeader, Btn } from "@/components/Layout";
import {
  BarChart3, Users, FileText, Truck, Warehouse, CreditCard,
  Calendar, ClipboardList, LayoutDashboard, ShieldCheck,
  Receipt, Package, BookOpen, Stethoscope, UtensilsCrossed,
  Building2, ShoppingBag, Globe, Megaphone, PieChart, DatabaseZap,
  Fingerprint, Clock, MessageSquare, Map, RefreshCcw, Layers,
  ScanBarcode, ChartNoAxesCombined,
  HeartPulse, GraduationCap, HandCoins, BriefcaseMedical,
  Plus, Edit2, Trash2, Search, Save, X, ChevronDown, Sparkles,
  Zap, Bell, Lock, Send, FileSpreadsheet, UserCheck,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Users, BarChart3, Warehouse, CreditCard, Truck,
  Calendar, Receipt, ShieldCheck, FileText, ScanBarcode,
  GraduationCap, ClipboardList, HeartPulse, BriefcaseMedical,
  UtensilsCrossed, Building2, ShoppingBag, Package, HandCoins,
  BookOpen, Stethoscope, PieChart, DatabaseZap, Fingerprint,
  Clock, MessageSquare, Map, RefreshCcw, Layers, Globe,
  Megaphone, ChartNoAxesCombined, UserCheck, FileSpreadsheet,
  Send, Zap, Bell, Lock,
};

const ICON_OPTIONS = [
  { value: "LayoutDashboard",      label: "Live Dashboard"        },
  { value: "Users",                label: "CRM"                   },
  { value: "BarChart3",            label: "Analytics"             },
  { value: "Warehouse",            label: "Inventory"             },
  { value: "CreditCard",           label: "Billing & Invoicing"   },
  { value: "Truck",                label: "Delivery Tracking"     },
  { value: "Calendar",             label: "Scheduling"            },
  { value: "Receipt",              label: "GST / Tax Reports"     },
  { value: "ShieldCheck",          label: "Role-Based Access"     },
  { value: "FileText",             label: "Document Management"   },
  { value: "ScanBarcode",          label: "Barcode Scanning"      },
  { value: "GraduationCap",        label: "Admissions"            },
  { value: "ClipboardList",        label: "Attendance"            },
  { value: "HeartPulse",           label: "Patient Records"       },
  { value: "BriefcaseMedical",     label: "OPD / IPD"             },
  { value: "UtensilsCrossed",      label: "Table Management"      },
  { value: "Building2",            label: "Hall Bookings"         },
  { value: "ShoppingBag",          label: "E-commerce Orders"     },
  { value: "Package",              label: "Stock Ledger"          },
  { value: "HandCoins",            label: "Party Accounts"        },
  { value: "BookOpen",             label: "Timetabling"           },
  { value: "Stethoscope",          label: "Lab Management"        },
  { value: "PieChart",             label: "Sales Reports"         },
  { value: "DatabaseZap",          label: "Real-Time Sync"        },
  { value: "Fingerprint",          label: "Biometric Auth"        },
  { value: "Clock",                label: "Shift Management"      },
  { value: "MessageSquare",        label: "SMS / WhatsApp Alerts" },
  { value: "Map",                  label: "GPS Dispatch"          },
  { value: "RefreshCcw",           label: "Auto Backups"          },
  { value: "Layers",               label: "Multi-Branch"          },
  { value: "Globe",                label: "Web Themes"            },
  { value: "Megaphone",            label: "Marketing Tools"       },
  { value: "ChartNoAxesCombined",  label: "Forecasting"           },
  { value: "Zap",                  label: "Fast Processing"       },
  { value: "Bell",                 label: "Notifications"         },
  { value: "Lock",                 label: "Security"              },
  { value: "Send",                 label: "Email / Messaging"     },
  { value: "FileSpreadsheet",      label: "Spreadsheet Reports"   },
  { value: "UserCheck",            label: "User Approvals"        },
];

const INITIAL_FEATURES = [
  { id:  1, icon: "LayoutDashboard",     label: "Live Dashboard",        row: "1", status: "active" },
  { id:  2, icon: "Users",               label: "CRM",                   row: "1", status: "active" },
  { id:  3, icon: "BarChart3",           label: "Analytics",             row: "1", status: "active" },
  { id:  4, icon: "Warehouse",           label: "Inventory",             row: "1", status: "active" },
  { id:  5, icon: "CreditCard",          label: "Billing & Invoicing",   row: "1", status: "active" },
  { id:  6, icon: "Truck",               label: "Delivery Tracking",     row: "1", status: "active" },
  { id:  7, icon: "Calendar",            label: "Scheduling",            row: "1", status: "active" },
  { id:  8, icon: "Receipt",             label: "GST / Tax Reports",     row: "1", status: "active" },
  { id:  9, icon: "ShieldCheck",         label: "Role-Based Access",     row: "1", status: "active" },
  { id: 10, icon: "FileText",            label: "Document Management",   row: "1", status: "active" },
  { id: 11, icon: "ScanBarcode",         label: "Barcode Scanning",      row: "1", status: "active" },
  { id: 12, icon: "GraduationCap",       label: "Admissions",            row: "2", status: "active" },
  { id: 13, icon: "ClipboardList",       label: "Attendance",            row: "2", status: "active" },
  { id: 14, icon: "HeartPulse",          label: "Patient Records",       row: "2", status: "active" },
  { id: 15, icon: "BriefcaseMedical",    label: "OPD / IPD",             row: "2", status: "active" },
  { id: 16, icon: "UtensilsCrossed",     label: "Table Management",      row: "2", status: "active" },
  { id: 17, icon: "Building2",           label: "Hall Bookings",         row: "2", status: "active" },
  { id: 18, icon: "ShoppingBag",         label: "E-commerce Orders",     row: "2", status: "active" },
  { id: 19, icon: "Package",             label: "Stock Ledger",          row: "2", status: "active" },
  { id: 20, icon: "HandCoins",           label: "Party Accounts",        row: "2", status: "active" },
  { id: 21, icon: "BookOpen",            label: "Timetabling",           row: "2", status: "active" },
  { id: 22, icon: "Stethoscope",         label: "Lab Management",        row: "2", status: "active" },
  { id: 23, icon: "PieChart",            label: "Sales Reports",         row: "3", status: "active" },
  { id: 24, icon: "DatabaseZap",         label: "Real-Time Sync",        row: "3", status: "active" },
  { id: 25, icon: "Fingerprint",         label: "Biometric Auth",        row: "3", status: "active" },
  { id: 26, icon: "Clock",               label: "Shift Management",      row: "3", status: "active" },
  { id: 27, icon: "MessageSquare",       label: "SMS / WhatsApp Alerts", row: "3", status: "active" },
  { id: 28, icon: "Map",                 label: "GPS Dispatch",          row: "3", status: "active" },
  { id: 29, icon: "RefreshCcw",          label: "Auto Backups",          row: "3", status: "active" },
  { id: 30, icon: "Layers",              label: "Multi-Branch",          row: "3", status: "active" },
  { id: 31, icon: "Globe",               label: "Web Themes",            row: "3", status: "active" },
  { id: 32, icon: "Megaphone",           label: "Marketing Tools",       row: "3", status: "active" },
  { id: 33, icon: "ChartNoAxesCombined", label: "Forecasting",           row: "3", status: "active" },
];

type Feature = typeof INITIAL_FEATURES[0];
const BLUE = "#1E4DA0";

function FeaturePill({ feature, onEdit, onDelete }: { feature: Feature; onEdit: () => void; onDelete: () => void }) {
  const Icon = ICON_MAP[feature.icon] ?? Sparkles;
  return (
    <div className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all select-none ${
      feature.status === "hidden"
        ? "border-dashed border-border/60 bg-muted/10 opacity-50"
        : "border-border bg-card hover:border-primary/50"
    }`}>
      <Icon className="w-4 h-4 shrink-0" style={{ color: BLUE }} />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">{feature.label}</span>
      <div className="hidden group-hover:flex items-center gap-0.5 ml-1">
        <button onClick={onEdit} className="w-5 h-5 rounded-md hover:bg-muted flex items-center justify-center">
          <Edit2 className="w-3 h-3 text-muted-foreground" />
        </button>
        <button onClick={onDelete} className="w-5 h-5 rounded-md hover:bg-red-500/10 flex items-center justify-center">
          <Trash2 className="w-3 h-3 text-red-500/70" />
        </button>
      </div>
    </div>
  );
}

function EditModal({ feature, onClose, onSave }: {
  feature: Feature | null;
  onClose: () => void;
  onSave: (f: Feature) => void;
}) {
  const [form, setForm] = useState<Feature>(
    feature ?? { id: 0, icon: "Zap", label: "", row: "1", status: "active" }
  );
  const set = (k: keyof Feature) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const PreviewIcon = ICON_MAP[form.icon] ?? Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">{feature ? "Edit Feature" : "Add Feature"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {/* Live preview pill */}
          <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/20">
            <span className="text-xs text-muted-foreground mr-1">Preview:</span>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-card">
              <PreviewIcon className="w-4 h-4 shrink-0" style={{ color: BLUE }} />
              <span className="text-sm font-medium text-foreground">{form.label || "Feature label"}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Feature Label</label>
            <input value={form.label} onChange={set("label")} placeholder="e.g. Live Dashboard"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Icon</label>
            <div className="relative">
              <select value={form.icon} onChange={set("icon")}
                className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Marquee Row</label>
              <div className="relative">
                <select value={form.row} onChange={set("row")}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 transition-all">
                  <option value="1">Row 1</option>
                  <option value="2">Row 2</option>
                  <option value="3">Row 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Visibility</label>
              <div className="flex gap-2 h-[42px]">
                {(["active", "hidden"] as const).map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                    className={`flex-1 rounded-lg text-xs font-semibold transition-all border ${form.status === s ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                    {s === "active" ? "Visible" : "Hidden"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-all">
            Cancel
          </button>
          <button onClick={() => { onSave({ ...form, id: form.id || Date.now() }); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ label, onConfirm, onClose }: { label: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Remove "{label}"?</h3>
        <p className="text-sm text-muted-foreground mb-5">This feature pill will be removed from the homepage marquee.</p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground transition-all">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeatureHighlightsPage() {
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [search, setSearch]     = useState("");
  const [rowFilter, setRowFilter] = useState("all");
  const [editing, setEditing]   = useState<Feature | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<Feature | null>(null);

  const filtered = features.filter(f => {
    const matchSearch = !search || f.label.toLowerCase().includes(search.toLowerCase());
    const matchRow    = rowFilter === "all" || f.row === rowFilter;
    return matchSearch && matchRow;
  });

  const activeCount = features.filter(f => f.status === "active").length;
  const rowTabs = [
    { key: "all", label: "All",    count: features.length },
    { key: "1",   label: "Row 1",  count: features.filter(f => f.row === "1").length },
    { key: "2",   label: "Row 2",  count: features.filter(f => f.row === "2").length },
    { key: "3",   label: "Row 3",  count: features.filter(f => f.row === "3").length },
  ];

  function handleSave(f: Feature) {
    setFeatures(prev => {
      const idx = prev.findIndex(i => i.id === f.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = f; return next; }
      return [...prev, f];
    });
  }

  const rows = rowFilter === "all" ? ["1", "2", "3"] : [rowFilter];

  return (
    <Layout>
      <PageHeader
        title="Feature Highlights"
        description="Manage the feature pills scrolling across the homepage marquee — three rows of ERP capabilities."
        action={<Btn onClick={() => setEditing(null)}><Plus className="w-4 h-4" />Add Feature</Btn>}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Features", value: features.length },
          { label: "Visible",        value: activeCount },
          { label: "Hidden",         value: features.length - activeCount },
          { label: "Rows",           value: 3 },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
          {rowTabs.map(tab => (
            <button key={tab.key} onClick={() => setRowFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${rowFilter === tab.key ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {tab.label}
              <span className={`ml-1.5 font-normal ${rowFilter === tab.key ? "text-white/70" : "text-muted-foreground"}`}>{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-44 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search features…"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-card text-sm outline-none focus:border-primary/50 transition-all" />
        </div>
      </div>

      {/* Rows as sections */}
      {rows.map(row => {
        const rowFeatures = filtered.filter(f => f.row === row);
        if (rowFeatures.length === 0 && search) return null;
        return (
          <div key={row} className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-[11px] font-black text-primary">{row}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">Row {row}</h3>
                <span className="text-xs text-muted-foreground">{rowFeatures.length} feature{rowFeatures.length !== 1 ? "s" : ""}</span>
              </div>
              <button onClick={() => setEditing({ id: 0, icon: "Zap", label: "", row, status: "active" })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-border text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all">
                <Plus className="w-3.5 h-3.5" /> Add to row {row}
              </button>
            </div>
            <div className="p-4">
              {rowFeatures.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {rowFeatures.map(f => (
                    <FeaturePill
                      key={f.id}
                      feature={f}
                      onEdit={() => setEditing(f)}
                      onDelete={() => setDeleting(f)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground/60 text-center py-4">No features in row {row}</p>
              )}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && search && (
        <div className="bg-card border border-border rounded-2xl py-14 text-center">
          <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No features match "{search}"</p>
        </div>
      )}

      {editing !== undefined && (
        <EditModal feature={editing} onClose={() => setEditing(undefined)} onSave={handleSave} />
      )}
      {deleting && (
        <DeleteModal
          label={deleting.label}
          onConfirm={() => { setFeatures(p => p.filter(i => i.id !== deleting.id)); setDeleting(null); }}
          onClose={() => setDeleting(null)}
        />
      )}
    </Layout>
  );
}
