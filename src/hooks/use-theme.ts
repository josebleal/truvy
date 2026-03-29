import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("truvy-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("truvy-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("truvy-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  return { isDark, toggleTheme };
}
