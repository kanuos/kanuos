// built in imports
import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// external imports
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

// internal imports
import {
  ADMIN_ACCOUNT,
  ADMIN_URLS,
  NAV_METADATA,
  PUBLIC_URLS,
} from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SecondaryHeading } from "../portfolio/SecondaryHeading";
import { VideoBG } from "./VideoBG";

export const NavBar = ({ type = "public" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <motion.nav className="fixed z-40 flex items-center justify-center top-4 right-2">
      <motion.div
        onClick={() => setShowMenu((prev) => !prev)}
        className="z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group rounded-full h-10 w-10 hover:rounded-full"
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
          className={`w-6 rounded h-[2px] transition-opacity ${
            showMenu
              ? "bg-primary"
              : type !== "admin"
              ? isDarkMode
                ? "bg-light  group-hover:mr-0 mr-1"
                : "bg-dark group-hover:mr-0 mr-1"
              : "bg-dark"
          } opacity-50 group-hover:opacity-100`}
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
          className={`w-6 rounded h-[2px] transition-opacity ${
            showMenu
              ? "bg-primary"
              : type !== "admin"
              ? isDarkMode
                ? "bg-light  group-hover:ml-0 ml-1"
                : "bg-dark group-hover:ml-0 ml-1"
              : "bg-dark"
          } opacity-50 group-hover:opacity-100`}
        ></motion.span>
      </motion.div>
      <AnimatePresence>
        <NavMenu showMenu={showMenu} type={type} />
      </AnimatePresence>
    </motion.nav>
  );
};

const NavMenu = ({ showMenu, type = "public" }) => {
  const currentPath = useRouter().pathname;
  const { isDarkMode } = useContext(ThemeContext);

  const r = useRouter();

  async function handleLogout() {
    try {
      await axios.get(AUTH_ROUTES.logout);
      r.push(ADMIN_ACCOUNT);
    } catch (error) {
      alert(error);
    }
  }

  const URLS = type in NAV_METADATA ? NAV_METADATA[type] : NAV_METADATA.public;

  const variants = {
    container: {
      show: {
        y: 0,
        x: 0,
        transition: {
          type: "tween",
          delayChildren: 1,
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
      hide: {
        y: "-100vh",
        x: "100vw",
        transition: {
          type: "tween",
          duration: 0.5,
        },
      },
      exit: {
        y: "-100vh",
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
        rotate : 10,
        y: "-100vh",
        transition: {
          type: "tween",
          when : 'afterChildren',
          duration: 0.5,
        },
      },
    },
    mainUL: {
      show: {
        scale: [.75, 1],
        opacity: [.75, 1],
        transition: {
          type: "tween",
          delay: 0.5,
          delayChildren: 0.25,
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        scale : 0,
        opacity : 0,
        transition: {
          type: "spring",
          duration: 0.5,
        },
      },
      exit: {
        scale : 0,
        opacity : 0,
        transition: {
          type: "spring",
          duration: 0.5,
          when : 'afterChildren'
        },
      },
    },
    li: {
      show: {
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          when : 'beforeChildren'
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
        rotate : 10,
        opacity: 0,
        transition: {
          type: "tween",
          duration: 0.5,
          when : 'afterChildren'
        },
      },
    },
    socialUL: {
      show: {
        transition: {
          type: "tween",
          delay: 1,
        },
      },
      hide: {
        opacity: 0,
        transition: {
          type: "tween",
        },
      },
      exit: {
        opacity: 0,
        rotate : 5,
        transition: {
          type: "tween",
        },
      },
    },
    social: {
      show: {
        y: "0",
        opacity: 1,
        transition: {
          type: "linear",
          staggerChildren: 0.25,
          delay: 1.25,
        },
      },
      hide: {
        y: "100vh",
        opacity: 0,
        transition: {
          type: "tween",
        },
      },
      exit: {
        y: "-100vh",
        rotate : 10,
        opacity: 0,
        transition: {
          type: "tween",
        },
      },
    },
    altMenu: {
      show: {
        y: "0",
        opacity: 1,
        transition: {
          type: "tween",
          delay: 0.5,
          delayChildren: 1.5,
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        y: "100vh",
        opacity: 0,
        transition: {
          type: "tween",
          duration: 0.5,
        },
      },
      exit: {
        y: "-50vh",
        opacity: 0,
        rotate : 5,
        transition: {
          type: "tween",
          duration: 0.5,
          when: "afterChildren",
        },
      },
    },
    contact: {
      show: {
        rotate: 0,
        opacity: 1,
        y: "0",
        transition: {
          delay : 1,
          type: "tween",
        },
      },
      hide: {
        rotate: 5,
        opacity: 0,
        y: "100vh",
      },
      exit: {
        rotate: -5,
        scale: 0,
        opacity: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.section
        variants={variants.container}
        initial="hide"
        exit="hide"
        animate={showMenu ? "show" : "hide"}
        className={
          "h-screen overflow-hidden w-full fixed inset-0 z-30 " +
          (isDarkMode ? "nav-dark" : "nav-light")
        }
      >
        <VideoBG />
        <motion.section
          animate={showMenu ? "show" : "hide"}
          variants={variants.section}
          exit="exit"
          className="w-full max-w-5xl mx-auto grow h-full px-10 pt-20 pb-20 flex flex-col items-start justify-between sm:grid sm:grid-cols-2 sm:grid-rows-6 sm:pt-28"
        >
          <motion.ul
            variants={variants.mainUL}
            animate={showMenu ? "show" : "hide"}
            exit="hide"
            className="w-max mx-auto flex flex-col justify-center sm:justify-start sm:mx-0 items-start sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-4 h-fit sm:h-full gap-6 sm:gap-10"
          >
            {Object.entries(URLS.links).map(([key, valueObj]) => {
              let isActive;

              if (
                [PUBLIC_URLS.home.url, ADMIN_URLS.dashboard.url].includes(
                  valueObj.url
                )
              ) {
                if (currentPath === valueObj.url) {
                  isActive = true;
                }
              } else {
                isActive = currentPath.startsWith(valueObj.url);
              }
              if (isActive || type === "portfolio") {
                return (
                  <motion.li
                    variants={variants.li}
                    animate={showMenu ? "show" : "hide"}
                    exit="hide"
                    key={key}
                    className="capitalize w-min"
                  >
                    <Link href={valueObj.url}>
                      <a
                        className={
                          "text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 relative group font-black"
                        }
                      >
                        <span>{valueObj.name}</span>
                        {type === "portfolio" && (
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-6 origin-right transition-all duration-100"></span>
                        )}
                      </a>
                    </Link>
                  </motion.li>
                );
              }
              return (
                <motion.li
                  variants={variants.li}
                  animate={showMenu ? "show" : "hide"}
                  exit="hide"
                  key={key}
                  className="capitalize w-min"
                >
                  <Link href={valueObj.url}>
                    <a className="text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 relative group font-black">
                      <span className="opacity-40 group-hover:scale-x-105 origin-left group-hover:opacity-75 transition-all">
                        {valueObj.name}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-6 origin-right transition-all duration-100"></span>
                    </a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            variants={variants.altMenu}
            animate={showMenu ? "show" : "hide"}
            exit="hide"
            className="flex w-max mx-auto flex-col items-start justify-start gap-4 sm:mx-0 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2 sm:items-end sm:w-full"
          >
            {URLS.other?.heading?.toLowerCase() !== "logout" ? (
              <Link href={URLS.other.link}>
                <motion.a variants={variants.socialUL}
              animate={showMenu ? "show" : "hide"}
              exit="hide" className="cursor-pointer block hover:italic">
                  <SecondaryHeading text={URLS.other.heading} navMode={true} />
                </motion.a>
              </Link>
            ) : (
              <button onClick={handleLogout}>
                <SecondaryHeading text={URLS.other.heading} navMode={true} />
              </button>
            )}
            {URLS.other.sublinks && (
              <ul className="hidden sm:flex flex-col items-end">
                {Object.values(URLS.other.sublinks).map((link) => (
                  <li key={link.name}>
                    <Link href={link.url}>
                      <a className="text-xs md:text-sm font-semibold capitalize opacity-50 hover:opacity-100 transition-all text-right">
                        <small>{link.name}</small>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {URLS.social && (
            <motion.div
              variants={variants.socialUL}
              animate={showMenu ? "show" : "hide"}
              exit="hide"
              className="hidden sm:flex flex-col items-end justify-end gap-4 sm:col-start-2 sm:col-end-3 sm:row-start-4 h-full"
            >
              <motion.div variants={variants.social}
              animate={showMenu ? "show" : "hide"}
              exit="hide">
                <SecondaryHeading text="social links" navMode={true} />
              </motion.div>
              {URLS.social && (
                <motion.ul
                  variants={variants.social}
                  animate={showMenu ? "show" : "hide"}
                  exit="hide"
                  className="hidden sm:flex flex-col items-end"
                >
                  {Object.entries(URLS.social)?.map(([name, url]) => (
                    <li key={name}>
                      <Link href={url}>
                        <a className="text-xs md:text-sm font-semibold capitalize opacity-50 hover:opacity-100 transition-all">
                          <small className="text-right">{name}</small>
                        </a>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}

          {URLS?.contact && (
            <motion.section
              variants={variants.contact}
              animate={showMenu ? "show" : "hide"}
              exit="hide"
              className="flex flex-col w-max mx-auto items-center sm:mx-0 sm:items-start gap-y-2 sm:col-start-1 sm:col-end-2 sm:justify-end sm:h-full sm:row-start-6 sm:row-end-7"
            >
              <strong className="opacity-50 font-semibold capitalize text-xs">
                {URLS.contact?.credential}
              </strong>
              <ul className="flex flex-col items-center sm:items-start">
                <li className="font-semibold lowercase text-xs">
                  {URLS.contact?.email}
                </li>
                <li className="font-semibold lowercase text-xs">
                  {URLS.contact?.phone}
                </li>
              </ul>
            </motion.section>
          )}
        </motion.section>
      </motion.section>
    </AnimatePresence>
  );
};
