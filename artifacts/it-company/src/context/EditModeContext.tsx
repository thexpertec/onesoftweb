import React, { createContext, useContext, useState, useCallback } from "react";

interface EditModeContextValue {
  isEditMode: boolean;
  toggleEditMode: () => void;
  activeSection: string | null;
  openSection: (id: string) => void;
  closeSection: () => void;
}

const EditModeContext = createContext<EditModeContextValue>({
  isEditMode: false,
  toggleEditMode: () => {},
  activeSection: null,
  openSection: () => {},
  closeSection: () => {},
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(v => {
      if (v) setActiveSection(null);
      return !v;
    });
  }, []);

  const openSection = useCallback((id: string) => setActiveSection(id), []);
  const closeSection = useCallback(() => setActiveSection(null), []);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, activeSection, openSection, closeSection }}>
      {children}
    </EditModeContext.Provider>
  );
}
