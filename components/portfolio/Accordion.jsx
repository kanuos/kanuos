import { useState } from "react";
import { motion } from "framer-motion";

const Accordion = ({ heading, isDarkMode, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const parent = {
    show: {
      height: "auto",
      transition: {
        staggerChildren: 0.25,
        when: "beforeChildren",
        type: "linear",
      },
    },
    hide: {
      height: "auto",
      transition: {
        type: "linear",
      },
    },
  };
  const variant = {
    show: {
      height: "auto",
      y: 0,
      pointerEvents: "all",
      opacity: 1,
      transition: {
        when: "beforeChildren",
        type: "linear",
      },
    },
    hide: {
      height: 0,
      y: -100,
      pointerEvents: "none",
      opacity: 0,
      transition: {
        type: "linear",
      },
    },
  };
  return (
    <motion.div
      variants={parent}
      animate={isExpanded ? "show" : "hide"}
      className={`${isExpanded ? "pb-10" : "pb-0"}`}
    >
      <h5
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`z-20 px-10 border-t py-4 flex items-center justify-between border-opacity-20 ${
          isDarkMode ? "border-light" : "border-dark"
        } ${
          isExpanded ? "border-b-0" : "border-b-px"
        } w-full block cursor-pointer`}
      >
        <span className="text-4xl md:text-6xl tracking-tighter">{heading}</span>
        <span className="text-xs opacity-50 hover:opacity-75">
          [{isExpanded ? "HIDE" : "SHOW"}]
        </span>
      </h5>
      <motion.div variants={variant}>{children}</motion.div>
    </motion.div>
  );
};

export default Accordion;
