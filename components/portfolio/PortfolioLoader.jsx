import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { StyledHeader } from "./StyledHeader";

export const PortfolioLoader = ({ isDarkMode, hide, isLoading }) => {
  const texts = [
    "UI-UX",
    "API",
    "Micro Services",
    "MERN Stack",
    "MEVN Stack",
    "JAM Stack",
    "Django",
    "Python",
    "JavaScript",
    "TypeScript",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 500);

    const p = setInterval(() => {
      const adder = Math.round(Math.random() * 10);
      setPercentage((prev) => Math.min(prev + adder, 100));
    }, 250);

    return () => {
      clearInterval(t);
      clearInterval(p);
    };
  }, [texts.length]);

  useEffect(() => {
    if (percentage === 100) {
      hide();
    }
  }, [percentage, hide]);

  const variants = {
    container: {
      final: {
        height: "100vh",
        transition: {
          when: "beforeChildren",
        },
      },
      exit: {
        scale: [1, 4],
        borderRadius: ["50%", "50%"],
        opacity: [1, 0],
        rotate: [90, 0],
        transition: {
          when: "afterChildren",
        },
        transitionEnd: {
          display: "none",
        },
      },
    },
    wrapper: {
      final: {
        transition: {
          type: "spring",
          when: "beforeChildren",
          staggerChildren: 0.25,
        },
      },
      exit: {
        transition: {
          type: "spring",
          stiffness: 400,
        },
      },
    },
    text: {
      final: {
        opacity: 1,
        transition: {
          type: "spring",
        },
      },
      initial: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
        scaleY: 0,
      },
    },
    loader: {
      final: {
        scaleX: 1,
      },
      initial: {
        scaleX: 0,
      },
      exit: {
        scaleX: 0,
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.section
          variants={variants.container}
          initial="final"
          exit="exit"
          className={`w-screen z-[100] ${
            isDarkMode ? "nav-dark" : "nav-light"
          } grid place-items-center absolute inset-0`}
        >
          <StyledHeader
            isDarkMode={isDarkMode}
            styledText="Sounak Mukherjee"
            showScroll={false}
          >
            <motion.div
              variants={variants.wrapper}
              className="flex flex-col items-center h-screen justify-center w-fit mx-auto"
            >
              <motion.h4
                variants={variants.text}
                className="heading--secondary text-center w-full mx-auto"
              >
                <span>{texts[currentIndex]}</span>
              </motion.h4>
              <motion.div variants={variants.loader} className="relative my-4">
                <div
                  className={`w-28 h-0.5 relative rounded-full overflow-hidden bg-gradient-to-r from-primary to-secondary`}
                >
                  <div
                    className={`h-full absolute right-0 top-0 bottom-0 ${
                      !isDarkMode ? "bg-dark__light" : "bg-light"
                    }`}
                    style={{ width: `${100 - percentage}%` }}
                  ></div>
                </div>
              </motion.div>
              <motion.h4
                variants={variants.text}
                className="flex items-center justify-center gap-1 heading--secondary text-center w-full mx-auto"
              >
                <span>Developer</span>
              </motion.h4>
            </motion.div>
          </StyledHeader>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
