import React, { createContext, useContext, useState, useCallback } from "react";

interface CTAModalState {
  open: boolean;
  interest: string;
}

interface CTAModalContextValue {
  state: CTAModalState;
  openCTAModal: (interest?: string) => void;
  closeCTAModal: () => void;
}

const CTAModalContext = createContext<CTAModalContextValue>({
  state: { open: false, interest: "" },
  openCTAModal: () => {},
  closeCTAModal: () => {},
});

export function useCTAModal() {
  return useContext(CTAModalContext);
}

export function CTAModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CTAModalState>({ open: false, interest: "" });

  const openCTAModal = useCallback((interest = "") => {
    setState({ open: true, interest });
  }, []);

  const closeCTAModal = useCallback(() => {
    setState(s => ({ ...s, open: false }));
  }, []);

  return (
    <CTAModalContext.Provider value={{ state, openCTAModal, closeCTAModal }}>
      {children}
    </CTAModalContext.Provider>
  );
}
