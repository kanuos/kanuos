// built in imports
import { useState } from "react";

// external imports
import { motion } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

// internal imports
import { Step } from "./PageStepComponent";
import { PortfolioLink } from "../portfolio/PortfolioLink";

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

  const [show, setShow] = useState(true);
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
        "text-sm md:text-base w-full block rounded-md transition-all relative after:absolute after:-z-10 after:inset-0 after:opacity-10 after:blur-lg " +
        (isDarkMode ? " after:bg-light nav-dark" : "after:bg-dark nav-light")
      }
    >
      <ul className="text-xs flex flex-col items-start gap-1 p-4 pb-0">
        <li>
          <small className="font-semibold opacity-50">Chapter {index}</small>
        </li>
        <li className="flex w-full items-center justify-between mb-2">
          <span className={`font-black peer ${!show ? "text-lg" : "text-sm"}`}>
            {segment.heading}
          </span>
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: show ? 180 : 0,
            }}
            animate={
              show
                ? { rotate: 180, borderColor: "currentColor" }
                : { rotate: 0, borderColor: "transparent" }
            }
            onClick={() => setShow((prev) => !prev)}
            className={
              "text-lg aspect-square border p-2 rounded-full border-current border-dashed " +
              (show ? "" : "opacity-50 hover:opacity-100")
            }
          >
            <IoChevronDown />
          </motion.button>
        </li>
        <li>
          <small
            className={`font-semibold bg-opacity-10 py-1 px-2.5 rounded ${
              isComplete
                ? "text-secondary bg-secondary"
                : "text-primary bg-primary"
            }`}
          >
            {isComplete ? "Completed" : "Not completed"}
          </small>
        </li>
      </ul>

      <motion.section
        className={
          "px-4 md:px-6 overflow-hidden w-full " + (show ? "py-6" : "pb-6")
        }
        animate={show ? "show" : "hide"}
        exit="hide"
        variants={variants.wrapper}
      >
        <motion.article
          animate={show ? "show" : "hide"}
          variants={variants.body}
          exit="hide"
          className="mb-10 border-y pb-6"
        >
          {segment.steps?.map((step, i) => (
            <Step step={step} key={i} />
          ))}
        </motion.article>

        <PortfolioLink
          label={isComplete ? "Chapter completed" : "Mark as complete"}
          btnMode={true}
          cb={toggleReadStatus}
        />
      </motion.section>
    </motion.section>
  );
};
