import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const variants = {
  wrapper: {
    show: {
      transition: {
        delayChildren: 0.25,
        type: "linear",
        when: "beforeChildren",
      },
    },
    hide: {
      transition: { when: "afterChildren" },
    },
    exit: {
      opacity: 0,
      transition: { type: "linear", duration: 0.5 },
    },
  },
  divider: {
    hide: {
      height: ".25vh",
      width: ".25vw",
      opacity: 0.5,
    },
    show: {
      opacity: 1,
      height: ["1vh", "5vh", "1vh", "5vh", "10vh", "5vh", "100vh", "100vh"],
      width: [
        ".25vw",
        ".25vw",
        ".25vw",
        ".25vw",
        ".25vw",
        ".25vw",
        ".25vw",
        "100vw",
      ],
      origin: "center",
      transition: { type: "spring", duration: 2 },
    },
  },
};

const InitialLoader = ({ showLoader, hideLoader, isDarkMode }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isComplete) return;

    hideLoader();
  }, [isComplete, hideLoader]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.section
          variants={variants.wrapper}
          initial="hide"
          exit="exit"
          animate="show"
          className={
            "h-screen fixed top-0 left-0 w-full z-20 flex items-center justify-center " +
            (isDarkMode ? "bg-secondary" : "bg-dark")
          }
        >
          <motion.span
            variants={variants.divider}
            onAnimationComplete={() => setIsComplete(true)}
            className={"block " + (isDarkMode ? "bg-dark" : "bg-light")}
          ></motion.span>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
