// built in imports
import { useState, useContext, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// external imports
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { AiOutlineLogout } from "react-icons/ai";

// internal imports
import {
  ADMIN_ACCOUNT,
  ADMIN_URLS,
  NAV_METADATA,
  PUBLIC_URLS,
} from "../../utils";
import { AUTH_ROUTES } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoBG } from "./VideoBG";

export const NavBar = ({ type = "public" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const toggleModal = useCallback(() => setShowMenu((prev) => !prev));

  const r = useRouter();

  async function handleLogout() {
    try {
      await axios.get(AUTH_ROUTES.logout);
      toggleModal();
      r.push(ADMIN_ACCOUNT);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <motion.nav className="z-40">
      {type === "admin" && (
        <button onClick={handleLogout} className="z-40 fixed top-6 left-4">
          <AiOutlineLogout />
        </button>
      )}

      <motion.div
        onClick={toggleModal}
        className="z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group rounded-full h-10 w-10 hover:rounded-full fixed top-4 right-2"
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
        <NavMenu showMenu={showMenu} type={type} toggleModal={toggleModal} />
      </AnimatePresence>
    </motion.nav>
  );
};

const NavMenu = ({ showMenu, type = "public", toggleModal }) => {
  const currentPath = useRouter().pathname;
  const { isDarkMode } = useContext(ThemeContext);

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
          className="w-full max-w-5xl mx-auto h-[95vh] px-10 grid place-items-center"
        >
          <motion.ul
            variants={variants.mainUL}
            animate={showMenu ? "show" : "hide"}
            exit="hide"
            className={`w-fit mx-auto flex flex-col justify-center  ${
              type === "admin" ? "gap-y-6 items-start" : "gap-y-10 items-center"
            }`}
          >
            {Object.entries(URLS).map(([key, valueObj]) => {
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

              return (
                <motion.li
                  variants={variants.li}
                  animate={showMenu ? "show" : "hide"}
                  exit="hide"
                  key={key}
                >
                  <Link href={valueObj.url}>
                    <a
                      onClick={toggleModal}
                      className={`${
                        type === "admin"
                          ? "text-xl"
                          : "text-4xl md:text-5xl xl:text-6xl"
                      } block uppercase text-center transition-all bg-gradient-to-r from-primary to-secondary bg-clip-text ${
                        isActive
                          ? "opacity-100"
                          : `${
                              isDarkMode ? "opacity-25" : "opacity-40"
                            } hover:opacity-100 scale-75 hover:scale-90 hover:text-transparent `
                      }`}
                    >
                      {valueObj.name.replace("-", " ")}
                    </a>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.section>
      </motion.section>
    </AnimatePresence>
  );
};
