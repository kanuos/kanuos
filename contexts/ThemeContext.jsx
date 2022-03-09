import { createContext, useState, useEffect } from "react";

const THEME_KEY = "sounak_theme";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    let currentState = !isDarkMode;
    setIsDarkMode(currentState);
    sessionStorage.setItem(THEME_KEY, JSON.stringify(currentState));
  }

  useEffect(() => {
    const themeFromStorage = sessionStorage.getItem(THEME_KEY);
    if (!themeFromStorage) {
      sessionStorage.setItem(THEME_KEY, JSON.stringify(false));
      return;
    }
    setIsDarkMode(JSON.parse(Boolean(themeFromStorage)));
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
