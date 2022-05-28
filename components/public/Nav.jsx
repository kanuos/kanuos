// built in imports
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// external imports
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

// internal imports
import { ADMIN_ACCOUNT, NAV_METADATA, PUBLIC_URLS } from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";
import { CTA } from "../portfolio/CTA";
import { NavContext } from "../../contexts/NavContext";

export const NavBar = ({ type = "public" }) => {
  const { showMenu, toggleNavMenu } = useContext(NavContext);

  return (
    <motion.nav className={`z-40`}>
      <motion.div
        onClick={toggleNavMenu}
        className={
          "z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group h-12 w-12 fixed top-0 right-0 group transition " +
          (showMenu ? "bg-primary mix-blend-normal" : "mix-blend-difference")
        }
      >
        <motion.span
          animate={
            showMenu
              ? {
                  rotate: 45,
                  y: 3,
                  transition: { type: "spring", stiffness: 400 },
                }
              : {
                  rotate: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 400 },
                }
          }
          className={`w-6 rounded h-[2px] transition-colors ${
            showMenu
              ? "bg-dark group-hover:bg-light"
              : "group-hover:mr-1 bg-secondary"
          }`}
        ></motion.span>
        <motion.span
          animate={
            showMenu
              ? {
                  rotate: -45,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 },
                }
              : {
                  rotate: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 400 },
                }
          }
          className={`w-6 rounded h-[2px] transition-colors ${
            showMenu
              ? "bg-dark group-hover:bg-light"
              : "group-hover:ml-1 bg-secondary"
          }`}
        ></motion.span>
      </motion.div>
      <AnimatePresence>
        <NavMenu type={type} />
      </AnimatePresence>
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
        transition: {
          type: "tween",
          delayChildren: 1,
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
      hide: {
        x: "100vw",
        transition: {
          type: "tween",
          duration: 0.5,
        },
      },
      exit: {
        x: "-100vw",
        transition: {
          when: "afterChildren",
          type: "tween",
          duration: 0.5,
        },
      },
    },
    section: {
      show: {
        scale: 1,
        y: "0",
        transition: {
          type: "tween",
          when: "beforeChildren",
        },
      },
      hide: {
        scale: 0,
        rotate: 10,
        y: "100vh",
        transition: {
          type: "tween",
          duration: 0.5,
        },
      },
      exit: {
        scale: 0,
        rotate: 10,
        y: "-100vh",
        transition: {
          type: "tween",
          when: "afterChildren",
          duration: 0.5,
        },
      },
    },
    mainUL: {
      show: {
        scale: [0.75, 1],
        opacity: [0.75, 1],
        transition: {
          type: "tween",
          delay: 0.5,
          delayChildren: 0.25,
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        scale: 0,
        opacity: 0,
        transition: {
          type: "spring",
          duration: 0.5,
        },
      },
      exit: {
        scale: 0,
        opacity: 0,
        transition: {
          type: "spring",
          duration: 0.5,
          when: "afterChildren",
        },
      },
    },
    li: {
      show: {
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        transition: {
          type: "tween",
          duration: 0.5,
        },
      },
      exit: {
        rotate: 10,
        opacity: 0,
        transition: {
          type: "tween",
          duration: 0.5,
          when: "afterChildren",
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
        initial="hide"
        exit="hide"
        animate={showMenu ? "show" : "hide"}
        className={`h-screen overflow-hidden w-full fixed right-0 top-0 z-30 sm:max-w-md sm:px-6 ${
          showMenu ? "shadow-2xl" : "shadow-none"
        } ${!isDarkMode ? "nav-light" : "nav-dark"}`}
      >
        <motion.section
          animate={showMenu ? "show" : "hide"}
          variants={variants.section}
          exit="exit"
          className="w-full mx-auto h-[80vh] my-auto px-10 pb-10 grid place-items-center z-40 absolute inset-0"
        >
          <motion.ul
            variants={variants.mainUL}
            animate={showMenu ? "show" : "hide"}
            exit="hide"
            className={`w-fit flex flex-col justify-center h-full gap-y-8 items-start`}
          >
            {Object.entries(URLS).map(([key, valueObj]) => {
              const label = valueObj.name.replace("-", " ");

              return (
                <motion.li
                  variants={variants.li}
                  animate={showMenu ? "show" : "hide"}
                  exit="hide"
                  onClick={toggleNavMenu}
                  key={key}
                >
                  {["my-website", "portfolio"].includes(
                    valueObj.name.toLowerCase()
                  ) ? (
                    <div className="mt-20 capitalize">
                      <PageLink
                        key={currentPath.toString()}
                        special={true}
                        href={valueObj.url}
                        label={label}
                      />
                    </div>
                  ) : (
                    <PageLink
                      key={currentPath.toString()}
                      scrollToTop={valueObj.type !== "portfolio"}
                      isActive={
                        valueObj.type !== "portfolio" && isActive(valueObj)
                      }
                      href={valueObj.url}
                      showAfter={false}
                      label={label?.toUpperCase()}
                    />
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
          {type === "admin" && (
            <CTA
              btnMode={true}
              cb={handleLogout}
              label="Logout"
              isDarkMode={isDarkMode}
              isActive={true}
            />
          )}

          <div className="mt-auto">
            <CTA
              btnMode={true}
              cb={toggleTheme}
              label="Toggle theme"
              isDarkMode={isDarkMode}
            />
          </div>
        </motion.section>
      </motion.section>
    </AnimatePresence>
  );
};
