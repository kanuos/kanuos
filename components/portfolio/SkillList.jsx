import { useState } from "react";
import { motion } from "framer-motion";

const variants = {
  iconLeft: {
    show: {
      x: "50%",
      height: 3,
      width: 3,
      transition: {
        type: "linear",
      },
    },
    hide: {
      x: "0%",
      height: 2,
      width: 5,
      transition: {
        type: "linear",
      },
    },
  },
  iconRight: {
    show: {
      rotate: 90,
      height: 3,
      width: 3,
      x: "-50%",
      transition: {
        type: "linear",
      },
    },
    hide: {
      rotate: 0,
      x: "0%",
      height: 2,
      width: 5,
      transition: {
        type: "linear",
      },
    },
  },
  details: {
    show: {
      opacity: 1,
      height: "auto",
      paddingTop: 20,
      transition: {
        type: "linear",
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.25,
        staggerDirection: 1,
      },
    },
    hide: {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      transition: {
        type: "linear",
        stiffness: 300,
        when: "afterChildren",
        staggerChildren: 0.125,
        staggerDirection: -1,
      },
    },
  },
  item: {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  },
};

export const SkillList = ({ isDarkMode, heading, list }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDetailsVisibility() {
    setIsOpen((prev) => !prev);
  }

  return (
    <motion.li
      // variants={variants.wrapper}
      onClick={toggleDetailsVisibility}
      className={
        "text-sm hover:opacity-100 transition-all cursor-pointer border-b w-full px-10 md:px-0 py-8 flex flex-col items-stretch justify-between border-collapse border-opacity-50 " +
        (isDarkMode ? "border-light" : "border-dark")
      }
    >
      <div
        className={
          "flex items-center justify-between w-full " +
          (isOpen ? "text-primary" : "text-current hover:text-primary")
        }
      >
        <small className="font-black uppercase">{heading}</small>
        <DetailIcon isOpen={isOpen} />
      </div>
      <motion.ul
        variants={variants.details}
        initial="hide"
        animate={isOpen ? "show" : "hide"}
        className="flex flex-col items-start gap-1 md:items-center md:flex-wrap justify-start gap-x-3"
      >
        {list.map(({ text }, j) => (
          <motion.li
            variants={variants.item}
            key={j}
            className="font-semibold opacity-75 text-xs"
          >
            {text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.li>
  );
};

const DetailIcon = ({ isOpen }) => {
  return (
    <p className="flex ml-auto w-max items-center justify-center">
      <motion.span
        variants={variants.iconLeft}
        animate={isOpen ? "show" : "hide"}
        className={isOpen ? "bg-primary" : "bg-secondary"}
      ></motion.span>
      <motion.span
        variants={variants.iconRight}
        animate={isOpen ? "show" : "hide"}
        className={isOpen ? "bg-primary" : "bg-secondary"}
      ></motion.span>
    </p>
  );
};
