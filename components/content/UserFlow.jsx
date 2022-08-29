import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { titleCase } from "../../utils";
import { MarkdownStep } from "../public/PageStepComponent";

const variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: 1.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
      type: "linear",
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: -1.5,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.25,
      staggerDirection: -1,
      type: "linear",
      ease: "easeIn",
    },
  },
};

export const Screens = ({ steps = [] }) => {
  let mobileScreens = [],
    desktopScreens = [];
  steps.forEach((el) => {
    if (el.title.toLowerCase() === "mobile++") {
      mobileScreens.push(el.images);
    } else {
      desktopScreens.push(el.images);
    }
  });

  mobileScreens = mobileScreens.flatMap((el) => el);
  desktopScreens = desktopScreens.flatMap((el) => el);

  return (
    <section className="bg-dark__light w-full h-full">
      <ul className={`w-full gap-x-4 mx-auto flex flex-col relative py-16`}>
        <AnimatePresence>
          {/* desktop screens */}
          {desktopScreens.map((img, k) => {
            return (
              <motion.li
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants}
                exit="exit"
                key={k}
                className={`z-10 block drop-shadow-2xl w-full mx-auto group`}
              >
                <div className="w-full h-auto">
                  <motion.figure
                    className={`relative h-auto w-full grid gap-16 max-w-6xl mx-auto px-8 mt-16  grid-cols-1`}
                  >
                    <Image
                      layout="responsive"
                      height="0%"
                      width="100%"
                      priority={true}
                      alt={`image #${k + 1}`}
                      src={img}
                      objectFit="contain"
                      loader={({ src, width }) => `${src}?w=${width}&q=100`}
                      className="userflow-img drop-shadow-xl"
                    />
                  </motion.figure>
                </div>
              </motion.li>
            );
          })}
          {/* mobile screens */}
          <motion.li
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={variants}
            exit="exit"
            className={`z-10 block drop-shadow-2xl w-full mx-auto group`}
          >
            <div className="w-full h-auto">
              <motion.figure
                variants={variants}
                className={`relative h-auto w-full grid gap-16 max-w-6xl mx-auto px-8 mt-16 ${
                  mobileScreens.length === 1
                    ? "grid-cols-1"
                    : mobileScreens.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                }`}
              >
                {mobileScreens.map((img, k) => {
                  return (
                    <Image
                      key={k}
                      layout="responsive"
                      height="0%"
                      width="100%"
                      priority={true}
                      alt={`image #${k + 1}`}
                      src={img}
                      objectFit="contain"
                      loader={({ src, width }) => `${src}?w=${width}&q=100`}
                      className="userflow-img drop-shadow-xl"
                    />
                  );
                })}
              </motion.figure>
            </div>
          </motion.li>
        </AnimatePresence>
      </ul>
    </section>
  );
};

export const UserFlow = ({ steps = [], isDarkMode }) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      variants={variants}
      className="relative w-full pt-20 mb-20 after-line--center"
    >
      <motion.ul className={`w-full flex flex-col`}>
        {steps
          .filter(
            ({ title }) =>
              !["mobile++", "desktop++"].includes(title.toLowerCase())
          )
          .map(({ about, title }, i) => (
            <motion.li
              key={i}
              className={`my-6 last:mb-0 max-w-3xl mx-auto w-full h-auto z-10 group grid grid-rows-6 grid-cols-6 ${
                isDarkMode ? "nav-dark" : "nav-light"
              }`}
            >
              <div
                className={`group-last:border-0 border-2 border-secondary group-odd:col-start-4 group-odd:col-end-7 group-even:col-start-1 group-even:col-end-4 group-even:border-r-0 group-odd:border-l-0 row-start-4 row-end-7 z-10 h-full w-full animate-pulse ${
                  isDarkMode ? "nav-dark" : "nav-light"
                } group-odd:rounded-r-md group-even:rounded-l-md`}
              ></div>
              <motion.section
                className={`row-start-1 w-full z-20 p-6 rounded-md max-w-xl relative ${
                  isDarkMode ? "nav-dark--light" : "nav-light"
                } drop-shadow-2xl row-end-6 group-odd:col-start-1 group-even:col-start-2  group-odd:col-end-6 group-even:col-end-7`}
              >
                <motion.p className="absolute top-0 group-even:-left-20 md:group-even:-left-24 group-odd:-right-20 md:group-odd:-right-24 z-0 flex flex-col md:flex-row items-center md:opacity-25">
                  <span className="heading--primary">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </motion.p>
                <motion.h3 className="heading--secondary mb-4">
                  {titleCase(title)}
                </motion.h3>
                <div className="text-xs">
                  <MarkdownStep text={about} />
                </div>
                {/* <motion.p className="content--sub">{about}</motion.p> */}
              </motion.section>
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};
