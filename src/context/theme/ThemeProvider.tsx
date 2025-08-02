"use client";
import { useState, useContext, useEffect } from "react";
import ThemeContext from "@/context/theme/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const lsTheme = localStorage.getItem("hotel-theme");
      if (lsTheme) {
        try {
          setDarkTheme(JSON.parse(lsTheme));
        } catch (error) {
          console.error("Error parsing theme from localStorage:", error);
          setDarkTheme(false);
        }
      }
    }
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <ThemeContext.Provider
        value={{ darkTheme: false, setDarkTheme: () => {} }}
      >
        <div className="min-h-screen">{children}</div>
      </ThemeContext.Provider>
    );
  }

  // Always provide context, even during mounting
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-white dark:bg-black text-[#1e1e1e]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
