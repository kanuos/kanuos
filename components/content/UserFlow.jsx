import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { titleCase } from "../../utils";
import { JoinLine } from "../public/DescHeader";

const variants = {
  initial: {
    opacity: 0.5,
    scale: 0.5,
    x: 100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
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
    x: -100,
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
  return (
    <section className="bg-dark__light w-full h-full">
      <ul className={`w-full gap-x-4 mx-auto flex flex-col relative`}>
        <AnimatePresence>
          {steps.map(({ images, title }, k) => {
            images = images.filter(Boolean);
            const hasMultipleImages = images.length > 1;
            return (
              <motion.li
                initial="initial"
                whileInView="animate"
                variants={variants}
                exit="exit"
                key={k}
                className={`z-10 block drop-shadow-2xl w-full mx-auto group`}
              >
                <div className="w-full h-auto py-10 lg:py-20">
                  {hasMultipleImages && title.toLowerCase() === "mobile++" ? (
                    <motion.figure
                      className={`relative h-auto w-full grid gap-10 max-w-6xl mx-auto px-8  ${
                        images.length === 1
                          ? "grid-cols-1"
                          : images.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      }
                    `}
                    >
                      {images.map((img, i) => (
                        <Image
                          key={i}
                          layout="responsive"
                          height="0%"
                          width="100%"
                          priority={true}
                          alt={`image #${i + 1}`}
                          src={img}
                          objectFit="contain"
                          loader={({ src, width }) => `${src}?w=${width}&q=100`}
                          className="userflow-img drop-shadow-xl"
                        />
                      ))}
                    </motion.figure>
                  ) : (
                    <motion.figure
                      className={`relative block h-auto w-full max-w-4xl mx-auto px-8`}
                    >
                      <Image
                        layout="responsive"
                        height="0%"
                        width="100%"
                        priority={true}
                        alt={`image #${k + 1}`}
                        src={images[0]}
                        objectFit="contain"
                        loader={({ src, width }) => `${src}?w=${width}&q=100`}
                        className="userflow-img"
                      />
                    </motion.figure>
                  )}
                </div>
              </motion.li>
            );
          })}
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
                <motion.p className="absolute top-0 group-even:-left-20 group-odd:-right-20 z-0 flex flex-col md:flex-row items-center md:opacity-25">
                  <span className="heading--primary">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="md:hidden">
                    <JoinLine />
                    <span className="heading--main text-center opacity-25">
                      {steps.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                </motion.p>
                <motion.h3 className="heading--sub mb-4">
                  {titleCase(title)}
                </motion.h3>
                <motion.p className="content--sub">{about}</motion.p>
              </motion.section>
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};
