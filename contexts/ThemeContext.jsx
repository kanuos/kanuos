import { createContext, useState, useEffect } from "react";

const THEME_KEY = "sounak_theme";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    let newMode = !isDarkMode;
    setIsDarkMode(newMode);
    sessionStorage.setItem(THEME_KEY, newMode ? "dark" : "light");
  }

  useEffect(() => {
    const currentTheme = sessionStorage.getItem(THEME_KEY);
    if (["dark", "light"].includes(currentTheme)) {
      setIsDarkMode(currentTheme === "dark" ? true : false);
      return;
    }
    setIsDarkMode(false);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
