import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = (t: Theme) => {
    setThemeState(t);
    const root = document.documentElement;
    if (t === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }
    sessionStorage.setItem("pt-theme", t);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("pt-theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
