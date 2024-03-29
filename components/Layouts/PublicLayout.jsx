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
  const { metaTitle, metaDesc, navType, children, errorPage = false } = props;
  const { isDarkMode } = useContext(ThemeContext);
  const { showMenu } = useContext(NavContext);
  return (
    <>
      <HeadComponent title={metaTitle} content={metaDesc} />
      {navType !== "loadScreen" && <NavBar type={navType} />}
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
        <div
          className={`absolute inset-0 h-full w-full ${
            isDarkMode ? "bg-dark" : "bg-light"
          } bg-opacity-90`}
        ></div>
      </div>
      <main
        className={`${
          isDarkMode ? "text-light" : "text-dark"
        } h-screen flex flex-col items-stretch z-0 overflow-hidden ${
          showMenu
            ? "blur-[1.5px] grayscale brightness-50 pointer-events-none"
            : "blur-0 grayscale-0 brightness-100 pointer-events-auto"
        } transition-all scroll-smooth`}
      >
        <div
          className={`w-full scroll-smooth overflow-x-hidden h-full ${
            isDarkMode
              ? "scrollbar-track-dark scrollbar-thumb-secondary"
              : "scrollbar-track-light scrollbar-thumb-primary"
          }
          ${errorPage ? "overflow-y-hidden" : "overflow-y-auto scrollbar-thin"}
            `}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default PublicLayout;
