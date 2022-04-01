import { AnimatePresence, motion } from "framer-motion";

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
      x: "-100vw",
      transition: { type: "linear", delay: 0.75 },
    },
  },
  loader: {
    show: {
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        staggerChildren: 0.25,
        when: "beforeChildren",
      },
    },
    hide: {
      scaleY: 0,
    },
    exit: {
      scaleY: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        staggerChildren: 0.25,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  },
  text: {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hide: {
      opacity: 0,
      x: "100vw",
    },
    exit: {
      opacity: 0,
      x: "-100vw",
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  },
};

const InitialLoader = ({ showLoader, hideLoader }) => {
  return (
    <AnimatePresence>
      {showLoader && (
        <motion.section
          variants={variants.wrapper}
          initial="hide"
          exit="exit"
          animate="show"
          className="h-screen fixed top-0 left-0 w-full z-20 bg-dark flex flex-col items-center justify-center"
        >
          <motion.div
            variants={variants.loader}
            className="text-center font-black flex flex-col items-start"
          >
            <motion.span
              variants={variants.text}
              className="text-6xl md:text-9xl inline-block text-secondary"
            >
              Full
            </motion.span>
            <motion.span
              variants={variants.text}
              className="text-6xl md:text-9xl inline-block text-primary"
            >
              Stack
            </motion.span>
            <motion.span
              variants={variants.text}
              onAnimationComplete={hideLoader}
              className="text-6xl md:text-9xl inline-block text-secondary"
            >
              Developer
            </motion.span>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
