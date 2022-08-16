// built in imports
import { useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// external imports
import { AnimatePresence, motion } from "framer-motion";
// internal imports
import { ADMIN_NEW_CONTENT, NAV_METADATA, PUBLIC_URLS } from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CTA } from "../portfolio/CTA";
import { NavContext } from "../../contexts/NavContext";
import { CloseBtn } from "./CloseBtn";
import { StickyWrapper } from "./StickyWrapper";
import { PageLink } from "../portfolio/PageLink";

export const NavBar = ({ type = "public" }) => {
  const { showMenu, toggleNavMenu } = useContext(NavContext);
  const { isDarkMode } = useContext(ThemeContext);
  const r = useRouter();

  return (
    <motion.nav className={`z-40`}>
      <CloseBtn cb={toggleNavMenu} isOpen={showMenu} isDarkMode={isDarkMode} />
      <NavMenu type={type} key={r?.asPath || ""} router={r} />
    </motion.nav>
  );
};

const NavMenu = ({ type = "public", router }) => {
  const [currentPath] = useState(router);
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

  const isActive = useCallback(
    function (path) {
      if (!currentPath) return false;
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
    },
    [currentPath]
  );

  const classes = {
    cta: "font-title",
    specialLink: "font-title text-2xl text-center mt-20 block transition-all",
    activeLink:
      "opacity-100 tracking-wider font-title text-lg after:absolute after:bottom-0 relative block after:left-0 after:w-full after:bg-secondary after:h-0.5 w-fit mx-auto",
  };

  return (
    <AnimatePresence>
      <motion.section
        id="nav-menu"
        variants={variants.container}
        initial="exit"
        exit="exit"
        animate={showMenu ? "show" : "exit"}
        className={`h-full overflow-hidden w-full grid grid-cols-3 py-10 fixed right-0 top-0 bottom-0 z-30 sm:max-w-md ${
          showMenu
            ? isDarkMode
              ? "light-shadow"
              : "dark-shadow"
            : "shadow-none"
        } ${!isDarkMode ? "nav-light" : "nav-dark"}`}
      >
        <motion.ul
          key={router?.asPath || ""}
          variants={variants.mainUL}
          className={`w-max mx-auto flex flex-col justify-center h-auto col-start-2 col-end-3 gap-y-8 items-start`}
        >
          {Object.entries(URLS).map(([key, valueObj]) => {
            const label = valueObj.name.replace("-", " ");
            const isSpecialLink = ["main-website", "portfolio"].includes(
              valueObj.name.toLowerCase()
            );
            const isActiveLink = isActive(valueObj);
            return (
              <motion.li
                variants={variants.li}
                onClick={toggleNavMenu}
                key={key}
                className="w-full md:w-fit"
              >
                {isSpecialLink ? (
                  <div className="w-full">
                    <StickyWrapper>
                      <Link href={valueObj.url}>
                        <a className={classes.specialLink}>{label}</a>
                      </Link>
                    </StickyWrapper>
                  </div>
                ) : (
                  <>
                    {isActiveLink ? (
                      <Link
                        scroll={valueObj.type !== "portfolio"}
                        href={valueObj.url}
                      >
                        <a className={classes.activeLink}>{label}</a>
                      </Link>
                    ) : (
                      <PageLink href={valueObj.url} label={label} />
                    )}
                  </>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          variants={variants.btnBox}
          className="mt-auto col-span-full flex items-center justify-center gap-4"
        >
          {type === "admin" && (
            <form action={AUTH_ROUTES.logout} method="get">
              <CTA
                btnMode={true}
                btnType="submit"
                tiny={type === "admin"}
                cb={() => null}
                label={<span className={classes.cta}>Logout</span>}
                isDarkMode={isDarkMode}
              />
            </form>
          )}
          <CTA
            btnMode={true}
            tiny={type === "admin"}
            cb={toggleTheme}
            label={<span className={classes.cta}>Toggle theme</span>}
            isDarkMode={isDarkMode}
          />
          {type === "admin" && (
            <form action={ADMIN_NEW_CONTENT} method="get">
              <CTA
                btnType="submit"
                btnMode={true}
                cb={() => null}
                tiny={type === "admin"}
                label={<span className={classes.cta}>New content</span>}
                isDarkMode={isDarkMode}
              />
            </form>
          )}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};
