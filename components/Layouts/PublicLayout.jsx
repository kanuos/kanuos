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
        className={`${
          isDarkMode ? "nav-dark" : "nav-light"
        } h-screen flex flex-col items-stretch z-0 overflow-hidden ${
          showMenu
            ? "grayscale brightness-50 pointer-events-none"
            : "grayscale-0 brightness-100 pointer-events-auto"
        } transition-all`}
      >
        <div className="h-auto min-h-screen overflow-y-auto scrollbar-thin w-full">
          {children}
        </div>
      </main>
    </>
  );
};

export default PublicLayout;
