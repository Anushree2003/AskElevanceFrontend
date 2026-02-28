import { useState, useEffect } from "react";  

export function useTheme() {
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(initialTheme);  // Consistent naming
    document.documentElement.classList.toggle("dark", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark; 
    setIsDark(newTheme);      
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDark, toggleTheme };
}
