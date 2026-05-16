import { useRef, useEffect } from "react";
import { useEditMode } from "@/context/EditModeContext";
import { Edit2, X, Save, ChevronRight } from "lucide-react";

const BLUE = "#1E4DA0";

interface EditableSectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
  drawer: React.ReactNode;
}

export function EditableSection({ id, label, children, drawer }: EditableSectionProps) {
  const { isEditMode, activeSection, openSection, closeSection } = useEditMode();
  const isActive = activeSection === id;
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeSection();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, closeSection]);

  if (!isEditMode) return <>{children}</>;

  return (
    <div className="relative group/editable">
      {/* Highlight ring */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-sm transition-all duration-200"
        style={{
          outline: `2px dashed ${BLUE}55`,
          outlineOffset: "-2px",
        }}
      />

      {/* Section label + edit button */}
      <div
        className="absolute top-2 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover/editable:opacity-100 transition-all duration-150"
      >
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md text-white"
          style={{ background: BLUE }}
        >
          {label}
        </span>
        <button
          onClick={() => openSection(id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
          style={{ background: BLUE }}
        >
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>

      {/* Always-visible small tab on left edge */}
      <button
        onClick={() => openSection(id)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1 px-1.5 py-2 rounded-r-lg text-[10px] font-bold text-white opacity-0 group-hover/editable:opacity-100 transition-all duration-150 shadow-md"
        style={{ background: BLUE, writingMode: "vertical-lr" }}
      >
        <ChevronRight className="w-3 h-3 rotate-90" />
      </button>

      {children}

      {/* Drawer */}
      {isActive && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            onClick={closeSection}
          />
          {/* Panel */}
          <div
            ref={drawerRef}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-white dark:bg-[#07111f] shadow-2xl flex flex-col overflow-hidden"
            style={{ borderLeft: `1px solid rgba(0,0,0,0.10)` }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: BLUE }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-0.5">
                  Editing Section
                </p>
                <h2 className="text-base font-black text-white">{label}</h2>
              </div>
              <button
                onClick={closeSection}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5">
              {drawer}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Reusable field components for drawers ── */

export function EField({ label, value, onChange, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; hint?: string;
}) {
  const cls = "w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#1E4DA0]/50 focus:ring-2 focus:ring-[#1E4DA0]/10 transition-all resize-none text-gray-900";
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={cls} />}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function ESaveBar({ onSave, saved, onClose }: {
  onSave: () => void; saved: boolean; onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
      {saved && (
        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
          <Save className="w-3.5 h-3.5" /> Saved
        </span>
      )}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 flex items-center gap-1.5"
          style={{ background: BLUE }}
        >
          <Save className="w-3.5 h-3.5" /> Save Changes
        </button>
      </div>
    </div>
  );
}

export function ESectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{children}</h3>
  );
}
