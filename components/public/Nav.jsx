// built in imports
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// external imports
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

// internal imports
import { ADMIN_ACCOUNT, NAV_METADATA, PUBLIC_URLS } from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CTA } from "../portfolio/CTA";
import { NavContext } from "../../contexts/NavContext";
import { CloseBtn } from "./CloseBtn";

export const NavBar = ({ type = "public" }) => {
  const { showMenu, toggleNavMenu } = useContext(NavContext);

  return (
    <motion.nav className={`z-40`}>
      <CloseBtn cb={toggleNavMenu} isOpen={showMenu} />
      <NavMenu type={type} />
    </motion.nav>
  );
};

const NavMenu = ({ type = "public" }) => {
  const [currentPath] = useState(useRouter());
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { showMenu, toggleNavMenu } = useContext(NavContext);

  const URLS = type in NAV_METADATA ? NAV_METADATA[type] : NAV_METADATA.public;

  const variants = {
    container: {
      show: {
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
        },
      },
      exit: {
        x: "100vw",
        opacity: 0,
        transition: {
          type: "linear",
          duration: 0.75,
        },
      },
    },
    mainUL: {
      show: {
        opacity: 1,
        transition: {
          type: "tween",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      exit: {
        opacity: 0,
        transition: {
          type: "spring",
        },
      },
    },
    li: {
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        transition: {
          type: "spring",
        },
      },
    },
    btnBox: {
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          delay: 0.75,
        },
      },
      exit: {
        opacity: 0,
        y: 100,
        transition: {
          type: "spring",
        },
      },
    },
  };

  function isActive(path) {
    if (
      currentPath.asPath === PUBLIC_URLS.home.url &&
      PUBLIC_URLS.home.url === path.base
    ) {
      return true;
    }
    if (
      currentPath.asPath.startsWith(path.base) &&
      path.base !== PUBLIC_URLS.home.url
    )
      return true;
    return false;
  }

  const r = useRouter();

  async function handleLogout() {
    try {
      await axios.get(AUTH_ROUTES.logout);
      toggleNavMenu();
      r.push(ADMIN_ACCOUNT);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <AnimatePresence>
      <motion.section
        id="nav-menu"
        variants={variants.container}
        initial="exit"
        exit="exit"
        animate={showMenu ? "show" : "exit"}
        className={`h-screen overflow-hidden w-full flex flex-col items-center justify-between py-10 fixed right-0 top-0 z-30 sm:max-w-md ${
          showMenu
            ? isDarkMode
              ? "light-shadow"
              : "dark-shadow"
            : "shadow-none"
        } ${!isDarkMode ? "nav-light" : "nav-dark"}`}
      >
        <motion.ul
          variants={variants.mainUL}
          className={`w-full flex flex-col justify-center h-3/4 gap-y-8 items-start`}
        >
          {Object.entries(URLS).map(([key, valueObj]) => {
            const label = valueObj.name.replace("-", " ");

            return (
              <motion.li
                variants={variants.li}
                onClick={toggleNavMenu}
                key={key}
                className="w-full"
              >
                {["main-website", "portfolio"].includes(
                  valueObj.name.toLowerCase()
                ) ? (
                  <div
                    className={`grid grid-cols-3 place-items-center gap-0 group ${
                      valueObj.type === "work" ? "" : "my-20"
                    }`}
                  >
                    <span className="transition-all opacity-0 w-full -translate-x-full group-hover:translate-x-0 col-span-1 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left duration-150 group-hover:opacity-100"></span>
                    <Link href={valueObj.url}>
                      <a
                        className={`text-sm uppercase tracking-wide col-start-2 w-full ${
                          valueObj.type === "work"
                            ? "col-end-4 pl-2 text-left"
                            : "col-end-3 pl-6"
                        }`}
                      >
                        {label.split("").map((el, k) => {
                          if (el !== " ") {
                            return (
                              <span
                                className={`navStyleLink font-bold`}
                                key={k}
                              >
                                {el}
                              </span>
                            );
                          }
                          return (
                            <span className="text-transparent" key={k}>
                              {el}
                            </span>
                          );
                        })}
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 place-items-center gap-0">
                    <Link
                      scroll={valueObj.type !== "portfolio"}
                      href={valueObj.url}
                    >
                      <a
                        className={`text-sm tracking-wide col-start-2 col-end-3 w-full flex items-center gap-x-4 transition-all ${
                          valueObj.type !== "portfolio" && isActive(valueObj)
                            ? "opacity-100"
                            : "opacity-40 hover:opacity-100"
                        } `}
                      >
                        <div className="flex flex-col items-center justify-center animate-spin gap-px">
                          <span
                            className={
                              (valueObj.type !== "portfolio" &&
                              isActive(valueObj)
                                ? "bg-secondary"
                                : "bg-transparent") +
                              " text-lg h-2 w-2 rounded-full block"
                            }
                          ></span>
                          <span
                            className={
                              (valueObj.type !== "portfolio" &&
                              isActive(valueObj)
                                ? "bg-primary"
                                : "bg-transparent") +
                              " text-lg h-2 w-2 rounded-full block"
                            }
                          ></span>
                        </div>
                        <span
                          className={`relative font-bold transition-all block after:absolute after:h-0.5 after:-bottom-1 after:left-0 ${
                            valueObj.type !== "portfolio" && isActive(valueObj)
                              ? ""
                              : "after:bg-secondary after:w-0 hover:after:w-6 after:transition-all after:origin-left"
                          } `}
                        >
                          {label?.toUpperCase()}
                        </span>
                      </a>
                    </Link>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.ul
          variants={variants.btnBox}
          className="mt-auto flex items-center justify-around gap-4"
        >
          {type === "admin" && (
            <CTA
              btnMode={true}
              cb={handleLogout}
              label="Logout"
              isDarkMode={isDarkMode}
              isActive={true}
            />
          )}
          <CTA
            btnMode={true}
            cb={toggleTheme}
            label="Toggle theme"
            isDarkMode={isDarkMode}
          />
        </motion.ul>
      </motion.section>
    </AnimatePresence>
  );
};
