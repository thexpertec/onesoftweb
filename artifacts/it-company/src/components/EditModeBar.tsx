import { useEditMode } from "@/context/EditModeContext";
import { Edit2, X, Eye } from "lucide-react";

const BLUE = "#1E4DA0";

export function EditModeBar() {
  const { isEditMode, toggleEditMode, closeSection } = useEditMode();

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl transition-all duration-300"
      style={{
        background: isEditMode ? BLUE : "#0f172a",
        border: `1px solid ${isEditMode ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.10)"}`,
        boxShadow: isEditMode
          ? `0 8px 32px ${BLUE}55, 0 2px 8px rgba(0,0,0,0.3)`
          : "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Status dot */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full transition-all"
          style={{
            background: isEditMode ? "#4ade80" : "rgba(255,255,255,0.3)",
            boxShadow: isEditMode ? "0 0 6px #4ade80" : "none",
          }}
        />
        <span className="text-xs font-bold text-white/80 whitespace-nowrap">
          {isEditMode ? "Edit Mode On" : "Edit Mode"}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-white/20" />

      {/* Toggle button */}
      <button
        onClick={() => {
          if (isEditMode) closeSection();
          toggleEditMode();
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95"
        style={{
          background: isEditMode ? "rgba(255,255,255,0.20)" : BLUE,
          color: "#fff",
        }}
      >
        {isEditMode ? (
          <><Eye className="w-3.5 h-3.5" /> View Mode</>
        ) : (
          <><Edit2 className="w-3.5 h-3.5" /> Enable Editing</>
        )}
      </button>

      {isEditMode && (
        <p className="text-[10px] text-white/50 hidden sm:block">
          Hover any section → click Edit
        </p>
      )}
    </div>
  );
}
