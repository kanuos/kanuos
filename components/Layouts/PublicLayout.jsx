import { useContext } from "react";
import dynamic from "next/dynamic";
// internal imports
import { ThemeContext } from "../../contexts/ThemeContext";
import { HeadComponent } from "../Head";

// dynamic imports
const NavBar = dynamic(() => import("../public/Nav").then((m) => m.NavBar));

const PublicLayout = (props) => {
  const { metaTitle, metaDesc, navType, children } = props;
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <HeadComponent title={metaTitle} content={metaDesc} />
      <NavBar type={navType} />
      <main
        className={(isDarkMode ? "nav-dark" : "nav-light") + " min-h-screen"}
      >
        {children}
      </main>
    </>
  );
};

export default PublicLayout;
