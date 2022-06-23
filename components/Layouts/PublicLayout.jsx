import { useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// internal imports
import { ThemeContext } from "../../contexts/ThemeContext";
import { NavContext } from "../../contexts/NavContext";
import { HeadComponent } from "../Head";
import bg from "../../public/hero.webp";

// dynamic imports
const NavBar = dynamic(() => import("../public/Nav").then((m) => m.NavBar));

const PublicLayout = (props) => {
  const { metaTitle, metaDesc, navType, children, hideNav = false } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { showMenu } = useContext(NavContext);
  return (
    <>
      <HeadComponent title={metaTitle} content={metaDesc} />
      {!hideNav && <NavBar type={navType} />}
      <div className="fixed top-0 left-0 right-0 h-screen w-screen -z-10">
        <div className="relative w-full h-full block">
          <Image
            src={bg}
            priority
            alt="Site background image"
            layout="fill"
            className="object-cover block w-screen h-full pointer-events-none"
          />
        </div>
      </div>
      <main
        className={`${
          isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
        } bg-opacity-90 h-screen flex flex-col items-stretch z-0 overflow-hidden ${
          showMenu
            ? "grayscale brightness-50 pointer-events-none"
            : "grayscale-0 brightness-100 pointer-events-auto"
        } transition-all`}
      >
        <div
          className={`h-auto min-h-screen pt-10 overflow-y-auto scrollbar w-full ${
            isDarkMode
              ? "scrollbar-track-dark scrollbar-thumb-secondary"
              : "scrollbar-track-light scrollbar-thumb-slate-400"
          }`}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default PublicLayout;
