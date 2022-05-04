// built in imports
import { useState } from "react";

// external imports
import { motion } from "framer-motion";
import { IoChevronDownCircleOutline, IoCheckmarkCircle } from "react-icons/io5";

// internal imports
import { Step } from "./PageStepComponent";
import { CTA } from "../portfolio/CTA";

export const PageSegment = ({ segment, index, isDarkMode }) => {
  const variants = {
    section: {
      show: {
        height: "auto",
        transition: {
          when: "beforeChildren",
          delayChildren: 0.5,
        },
      },
      hide: {
        height: "min-content",
        transition: {
          when: "afterChildren",
          type: "tween",
          staggerChildren: 0.5,
          staggerDirection: -1,
        },
      },
    },
    wrapper: {
      show: {
        opacity: 1,
        scale: 1,
        height: "auto",
        transition: {
          type: "tween",
          origin: "bottom",
          delay: 0.25,
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        scale: 0,
        height: 0,
        transition: {
          type: "tween",
          when: "afterChildren",
          delay: 0.25,
          staggerChildren: 0.5,
        },
      },
    },
    body: {
      show: {
        y: 0,
        opacity: 1,
        pointerEvents: "all",
        transition: {
          origin: "bottom",
          delay: 0.5,
        },
      },
      hide: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none",
        transition: {
          type: "tween",
          duration: 0.25,
          delay: 0.25,
          staggerChildren: 0.5,
          when: "afterChildren",
        },
      },
    },
  };

  const [show, setShow] = useState(!true);
  const [isComplete, setIsComplete] = useState(false);

  function toggleReadStatus() {
    setIsComplete((prev) => !prev);
    setShow((prev) => !prev);
  }

  return (
    <motion.section
      variants={variants.section}
      animate={show ? "show" : "hide"}
      className={
        "w-full block rounded-md transition-all shadow-xl " +
        (isDarkMode ? "nav-dark chapter-dark" : "nav-light chapter-light")
      }
    >
      <ul className="text-xs flex flex-col w-full items-start gap-1 p-4">
        <li>
          <small className="font-semibold opacity-60">Chapter {index}</small>
        </li>
        <li className="flex w-full items-center justify-between mb-2">
          <span className={`font-semibold peer text-lg md:text-xl`}>
            {segment.heading}
          </span>
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: show && !isComplete ? 180 : 0,
            }}
            animate={show && !isComplete ? { rotate: 180 } : { rotate: 0 }}
            onClick={() => setShow((prev) => !prev)}
            className={
              "aspect-square " + (show ? "" : "opacity-50 hover:opacity-100")
            }
          >
            {isComplete ? (
              <IoCheckmarkCircle className="text-secondary text-3xl" />
            ) : (
              <IoChevronDownCircleOutline className="text-dark hover:text-primary text-3xl" />
            )}
          </motion.button>
        </li>
      </ul>

      <motion.section
        className={
          "px-4 md:px-6 overflow-hidden w-full max-w-4xl mx-auto " +
          (show ? "pt-4 pb-16" : "pb-4")
        }
        animate={show ? "show" : "hide"}
        exit="hide"
        variants={variants.wrapper}
      >
        <motion.article
          animate={show ? "show" : "hide"}
          variants={variants.body}
          exit="hide"
          className="mb-10 pb-4"
        >
          {segment.steps?.map((step, i) => (
            <Step step={step} key={i} />
          ))}
        </motion.article>
        <div className="mx-auto w-max">
          <CTA
            label={isComplete ? "Chapter completed" : "Mark as complete"}
            isActive={isComplete}
            isDarkMode={isDarkMode}
            btnMode={true}
            cb={toggleReadStatus}
          />
        </div>
      </motion.section>
    </motion.section>
  );
};
