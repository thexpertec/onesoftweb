import {
  BookOpen, Receipt, Landmark, TrendingUp, Wallet, CreditCard,
  Scale, PenLine, ShoppingCart, LayoutList, FileX, Globe2,
  BarChart3, LineChart, Waves, FileCheck, Building, FileText,
  ClipboardCheck, Activity, BarChart2, Target, TrendingDown, Layers,
  Users, BadgeCheck, Banknote, Heart, PiggyBank, Boxes,
  Calculator, FolderTree, Briefcase, PackageSearch, Truck, HandCoins,
  ShieldCheck, Lock, RefreshCw, Clock, Bell, Zap,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type FeatureItem = {
  Icon: React.ElementType;
  label: string;
  color: string;
};

const row1: FeatureItem[] = [
  { Icon: BookOpen,      label: "General Ledger",         color: "#4FC6FF" },
  { Icon: Receipt,       label: "Invoicing",               color: "#1E4DA0" },
  { Icon: Landmark,      label: "Bank Reconciliation",     color: "#1E4DA0" },
  { Icon: TrendingUp,    label: "Accounts Receivable",     color: "#4FC6FF" },
  { Icon: Wallet,        label: "Accounts Payable",        color: "#4FC6FF" },
  { Icon: CreditCard,    label: "Expense Tracking",        color: "#4FC6FF" },
  { Icon: Scale,         label: "Trial Balance",           color: "#4FC6FF" },
  { Icon: PenLine,       label: "Journal Entries",         color: "#1E4DA0" },
  { Icon: ShoppingCart,  label: "Purchase Orders",         color: "#1E4DA0" },
  { Icon: LayoutList,    label: "Chart of Accounts",       color: "#1E4DA0" },
  { Icon: FileX,         label: "Credit Notes",            color: "#1E4DA0" },
  { Icon: Globe2,        label: "Multi-Currency",          color: "#4FC6FF" },
];

const row2: FeatureItem[] = [
  { Icon: BarChart3,     label: "P&L Statement",          color: "#4FC6FF" },
  { Icon: LineChart,     label: "Balance Sheet",           color: "#1E4DA0" },
  { Icon: Waves,         label: "Cash Flow",               color: "#1E4DA0" },
  { Icon: FileCheck,     label: "Tax Returns",             color: "#4FC6FF" },
  { Icon: Building,      label: "Corporate Tax",           color: "#4FC6FF" },
  { Icon: FileText,      label: "Tax Filing",              color: "#4FC6FF" },
  { Icon: ClipboardCheck,label: "Compliance Reporting",    color: "#4FC6FF" },
  { Icon: Activity,      label: "Audit Trail",             color: "#1E4DA0" },
  { Icon: BarChart2,     label: "Financial Reporting",     color: "#1E4DA0" },
  { Icon: Target,        label: "Budgeting",               color: "#1E4DA0" },
  { Icon: TrendingDown,  label: "Forecasting",             color: "#1E4DA0" },
  { Icon: Layers,        label: "Management Accounts",     color: "#4FC6FF" },
];

const row3: FeatureItem[] = [
  { Icon: Users,         label: "Payroll Processing",      color: "#4FC6FF" },
  { Icon: BadgeCheck,    label: "Payroll Tax",              color: "#1E4DA0" },
  { Icon: Heart,         label: "Pension & Benefits",      color: "#1E4DA0" },
  { Icon: PiggyBank,     label: "Fixed Assets",            color: "#4FC6FF" },
  { Icon: Calculator,    label: "Depreciation",            color: "#4FC6FF" },
  { Icon: Briefcase,     label: "Project Costing",         color: "#4FC6FF" },
  { Icon: FolderTree,    label: "Cost Centres",            color: "#4FC6FF" },
  { Icon: Boxes,         label: "Stock Valuation",         color: "#1E4DA0" },
  { Icon: PackageSearch, label: "COGS Tracking",           color: "#1E4DA0" },
  { Icon: Truck,         label: "Supplier Management",     color: "#1E4DA0" },
  { Icon: HandCoins,     label: "Debt Collection",         color: "#1E4DA0" },
  { Icon: Banknote,      label: "Direct Debit",            color: "#4FC6FF" },
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
  isLight,
}: {
  items: FeatureItem[];
  direction?: "left" | "right";
  speed?: number;
  isLight: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1.5">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-default group shrink-0"
            style={{
              background: isLight ? "#ffffff" : "rgba(255,255,255,0.04)",
              borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.10)",
            }}
          >
            <item.Icon
              className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ color: item.color }}
            />
            <span
              className="text-sm font-medium whitespace-nowrap transition-colors"
              style={{ color: isLight ? "#334155" : "rgba(255,255,255,0.65)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountingMarquee() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className="py-16 relative overflow-hidden border-y"
      style={{
        background: isLight ? "#f8fafc" : "rgba(0,0,0,0.3)",
        borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.07)",
      }}
    >
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <span
          className="text-xs font-semibold uppercase tracking-[0.22em] mb-3 block"
          style={{ color: "#4FC6FF" }}
        >
          Complete Feature Suite
        </span>
        <h2
          className="text-3xl md:text-4xl font-black mb-3"
          style={{ color: isLight ? "#0f172a" : "#ffffff" }}
        >
          Everything an Accounting Firm Needs
        </h2>
        <p
          className="max-w-xl mx-auto text-base"
          style={{ color: isLight ? "#475569" : "rgba(255,255,255,0.5)" }}
        >
          From double-entry bookkeeping to HMRC compliance — every module built for modern accountants.
        </p>
      </div>

      <div
        className="relative z-10 space-y-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <MarqueeRow items={row1} direction="left"  speed={45} isLight={isLight} />
        <MarqueeRow items={row2} direction="right" speed={38} isLight={isLight} />
        <MarqueeRow items={row3} direction="left"  speed={50} isLight={isLight} />
      </div>
    </div>
  );
}
