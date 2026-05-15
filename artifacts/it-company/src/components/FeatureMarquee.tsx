import {
  BarChart3, Users, FileText, Truck, Warehouse, CreditCard,
  Calendar, ClipboardList, BellRing, LayoutDashboard, ShieldCheck,
  Receipt, Package, BookOpen, Stethoscope, UtensilsCrossed,
  Building2, ShoppingBag, Globe, Megaphone, PieChart, DatabaseZap,
  Fingerprint, Clock, MessageSquare, Map, RefreshCcw, Layers,
  ScanBarcode, UserCheck, FileSpreadsheet, Send, ChartNoAxesCombined,
  HeartPulse, GraduationCap, HandCoins, BriefcaseMedical
} from "lucide-react";

type FeaturePill = {
  icon: React.ElementType;
  label: string;
};

const row1: FeaturePill[] = [
  { icon: LayoutDashboard,     label: "Live Dashboard"       },
  { icon: Users,               label: "CRM"                  },
  { icon: BarChart3,           label: "Analytics"            },
  { icon: Warehouse,           label: "Inventory"            },
  { icon: CreditCard,          label: "Billing & Invoicing"  },
  { icon: Truck,               label: "Delivery Tracking"    },
  { icon: Calendar,            label: "Scheduling"           },
  { icon: Receipt,             label: "GST / Tax Reports"    },
  { icon: ShieldCheck,         label: "Role-Based Access"    },
  { icon: FileText,            label: "Document Management"  },
  { icon: ScanBarcode,         label: "Barcode Scanning"     },
];

const row2: FeaturePill[] = [
  { icon: GraduationCap,       label: "Admissions"           },
  { icon: ClipboardList,       label: "Attendance"           },
  { icon: HeartPulse,          label: "Patient Records"      },
  { icon: BriefcaseMedical,    label: "OPD / IPD"            },
  { icon: UtensilsCrossed,     label: "Table Management"     },
  { icon: Building2,           label: "Hall Bookings"        },
  { icon: ShoppingBag,         label: "E-commerce Orders"    },
  { icon: Package,             label: "Stock Ledger"         },
  { icon: HandCoins,           label: "Party Accounts"       },
  { icon: BookOpen,            label: "Timetabling"          },
  { icon: Stethoscope,         label: "Lab Management"       },
];

const row3: FeaturePill[] = [
  { icon: PieChart,            label: "Sales Reports"        },
  { icon: DatabaseZap,         label: "Real-Time Sync"       },
  { icon: Fingerprint,         label: "Biometric Auth"       },
  { icon: Clock,               label: "Shift Management"     },
  { icon: MessageSquare,       label: "SMS / WhatsApp Alerts"},
  { icon: Map,                 label: "GPS Dispatch"         },
  { icon: RefreshCcw,          label: "Auto Backups"         },
  { icon: Layers,              label: "Multi-Branch"         },
  { icon: Globe,               label: "Web Themes"           },
  { icon: Megaphone,           label: "Marketing Tools"      },
  { icon: ChartNoAxesCombined, label: "Forecasting"          },
];

function PillTrack({
  pills,
  direction = "left",
  speed = 40,
}: {
  pills: FeaturePill[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...pills, ...pills];
  return (
    <div className="overflow-hidden py-1.5">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((pill, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/12 bg-white/[0.04] hover:border-primary/50 hover:bg-primary/8 transition-all duration-300 cursor-default group shrink-0 select-none"
          >
            <pill.icon
              className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors shrink-0"
              strokeWidth={1.75}
            />
            <span className="text-sm text-white/65 group-hover:text-white transition-colors whitespace-nowrap font-medium">
              {pill.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureMarquee() {
  return (
    <section className="py-8 md:py-10 lg:py-[60px] relative overflow-hidden border-y border-white/8 bg-black/30">
      <div className="container mx-auto px-4 text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 block">
          What We Deliver
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          50+ ERP Features For Your Business
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          From admissions to analytics, every module your business needs — built in, connected, and ready to run.
        </p>
      </div>

      <div className="space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <PillTrack pills={row1} direction="left"  speed={38} />
        <PillTrack pills={row2} direction="right" speed={34} />
        <PillTrack pills={row3} direction="left"  speed={42} />
      </div>
    </section>
  );
}
