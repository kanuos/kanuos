import { Fragment } from "react";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Markdown from "react-markdown";
import { StickyWrapper } from "../public/StickyWrapper";
import { CTA } from "./CTA";

const variants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.25,
      stiffness: 400,
    },
  },
};

const childrenVariants = {
  initial: {
    scaleY: 0,
  },
  final: {
    scaleY: 1,
    transition: {
      type: "linear",
      staggerChildren: 0.25,
      when: "beforeChildren",
      stiffness: 400,
    },
  },
};

const headingVariants = {
  initial: {
    scale: 0.25,
    opacity: 0,
  },
  final: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "linear",
      staggerChildren: 0.25,
      when: "beforeChildren",
      stiffness: 400,
    },
  },
};

const locationVariants = {
  initial: {
    y: -10,
    opacity: 0,
  },
  final: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      staggerChildren: 0.25,
      staggerDirection: -1,
      stiffness: 400,
    },
  },
};
const btnVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  final: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      staggerChildren: 0.25,
      staggerDirection: -1,
      stiffness: 400,
    },
  },
};

export const PortfolioHeader = ({
  location = "",
  isDarkMode,
  heading,
  text,
  href,
  label,
}) => {
  return (
    <motion.header
      variants={variants}
      initial="initial"
      exit="initial"
      whileInView="final"
      viewport={{ once: true }}
      className="h-screen px-8 flex flex-col items-center justify-center"
    >
      <div className="grid grid-flow-row w-full">
        <motion.div
          variants={childrenVariants}
          className="row-start-2 row-end-4"
        >
          <motion.h1
            variants={headingVariants}
            className={`flex items-center flex-wrap justify-center gap-x-4 md:gap-x-8 group`}
          >
            {heading.split(" ").map((el, k) => (
              <Fragment key={k}>
                {el.match(/sounak/gi) ? (
                  <span className="heading__portfolio text-primary group-hover:-rotate-3 group-hover:scale-105 border-b-2 border-transparent group-hover:text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text block transition-all group-hover:drop-shadow-xl">
                    {el}
                  </span>
                ) : (
                  <span className="heading__portfolio">{el}</span>
                )}
              </Fragment>
            ))}
          </motion.h1>
          <motion.div
            variants={childrenVariants}
            className="max-w-sm md:max-w-lg text-justify md:text-center w-fit mb-auto mx-auto opacity-75 mt-6"
          >
            <Markdown>{text}</Markdown>
          </motion.div>
        </motion.div>

        {Boolean(location) && (
          <motion.p
            variants={locationVariants}
            className="flex items-center justify-center my-1 gap-x-0.5 row-start-1 mt-auto"
          >
            <motion.span variants={locationVariants}>
              <HiOutlineLocationMarker className="mb-1" />
            </motion.span>
            <motion.span
              variants={childrenVariants}
              className="text-xs font-bold"
            >
              {location}
            </motion.span>
          </motion.p>
        )}

        <motion.div
          variants={btnVariants}
          className="mt-20 w-max mx-auto row-start-4"
        >
          <StickyWrapper>
            <CTA label={label} href={href} isDarkMode={isDarkMode} />
          </StickyWrapper>
        </motion.div>
      </div>
    </motion.header>
  );
};
