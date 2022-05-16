import { useContext } from "react";
import dynamic from "next/dynamic";
// internal imports
import { ThemeContext } from "../../contexts/ThemeContext";
import { NavContext } from "../../contexts/NavContext";
import { HeadComponent } from "../Head";

// dynamic imports
const NavBar = dynamic(() => import("../public/Nav").then((m) => m.NavBar));

const PublicLayout = (props) => {
  const { metaTitle, metaDesc, navType, children } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { showMenu } = useContext(NavContext);
  return (
    <>
      <HeadComponent title={metaTitle} content={metaDesc} />
      <NavBar type={navType} />
      <main
        className={`${isDarkMode ? "nav-dark" : "nav-light"} min-h-screen z-0 ${
          showMenu
            ? "grayscale brightness-50 pointer-events-none"
            : "grayscale-0 brightness-100 pointer-events-auto"
        } transition-all`}
      >
        {children}
      </main>
    </>
  );
};

export default PublicLayout;