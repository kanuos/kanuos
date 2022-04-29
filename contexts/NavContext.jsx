import { createContext, useState, useCallback, useEffect } from "react";

export const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleNavMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  });

  useEffect(() => {
    document.addEventListener("click", getClickTarget);
    return () => document.removeEventListener("click", getClickTarget);
  }, [showMenu]);

  function getClickTarget(e) {
    const child = e.target;
    const navMenu = document?.querySelector("#nav-menu");
    if (!navMenu) return;

    const clickedOutsideMenu = !navMenu.contains(child);

    if (showMenu && clickedOutsideMenu) {
      setShowMenu(() => false);
    }
  }

  return (
    <NavContext.Provider value={{ showMenu, toggleNavMenu }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
