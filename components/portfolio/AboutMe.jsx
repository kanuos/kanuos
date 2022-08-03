import dynamic from "next/dynamic";
import { PORTFOLIO_LINKS } from "../../utils";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const CTA = dynamic(() => import("./CTA").then((m) => m.CTA));
const MarkdownStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.MarkdownStep)
);
const StickyWrapper = dynamic(() =>
  import("../public/StickyWrapper").then((m) => m.StickyWrapper)
);

const VARIANTS = {
  wrapper: {
    initial: { opacity: 0.25, scale: 0.25 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.25, when: "beforeChildren" },
    },
  },
  header: {
    initial: { opacity: 0, scaleY: 0.25 },
    animate: {
      opacity: 1,
      scaleY: 1,
      transition: { staggerChildren: 0.25, when: "beforeChildren" },
    },
  },
  desc: {
    initial: { opacity: 0, scaleY: 0.25 },
    animate: {
      opacity: 1,
      scaleY: 1,
      transition: { staggerChildren: 0.25, when: "beforeChildren" },
    },
  },
  li: {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [1, 1],
      scale: [0.5, 1],
      rotate: [180, 0],
      transition: {
        staggerChildren: 0.25,
        when: "beforeChildren",
        stiffness: 300,
        type: "spring",
      },
    },
  },
  lg_ul: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.5, when: "beforeChildren" },
    },
  },
  btn: {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
      },
    },
  },
};

export const AboutMe = ({ isDarkMode, skills = "", techStack = [] }) => {
  return (
    <motion.section
      variants={VARIANTS.wrapper}
      id={PORTFOLIO_LINKS["about me"].name}
      className={`min-h-screen mt-40 flex flex-col items-start justify-center w-full h-auto`}
    >
      <motion.div
        variants={VARIANTS.wrapper}
        whileInView="animate"
        initial="initial"
        viewport={{ once: true }}
        className="p-8 w-full max-w-3xl mx-auto"
      >
        <motion.h2
          variants={VARIANTS.header}
          className={`flex items-center justify-center gap-2 md:gap-6`}
        >
          <span className="heading--primary">About</span>
          <span className="heading--primary">Me</span>
        </motion.h2>
        <motion.div variants={VARIANTS.desc} className="mt-10">
          <div className="opacity-75">
            <MarkdownStep text={skills} />
          </div>
        </motion.div>
      </motion.div>

      <motion.article
        variants={VARIANTS.li}
        className={`px-8 flex flex-col mt-10 pb-40 lg:pb-0 lg:mb-40 gap-y-16 mx-auto after-line--center lg:hidden`}
      >
        {techStack.map(({ heading, text }, i) => (
          <motion.section
            initial="initial"
            whileInView="animate"
            variants={VARIANTS.li}
            viewport={{ once: true }}
            key={i}
            className={`p-6 z-10 w-5/6 lg:w-full group max-w-lg lg:hover:scale-105 transition-all will-change-transform drop-shadow-lg ${
              i % 2 ? "ml-auto" : "mr-auto"
            } max-w-lg rounded-md ${isDarkMode ? "nav-dark" : "nav-light"}`}
          >
            <strong
              className={`text-xl font-title capitalize font-bold break-words bg-gradient-to-r will-change-transform ${
                isDarkMode ? "lg:to-light" : "lg:to-dark"
              } mb-4 block`}
            >
              {heading}
            </strong>
            <div className="opacity-75">
              <MarkdownStep text={text} />
            </div>
          </motion.section>
        ))}
      </motion.article>

      <motion.article
        initial="initial"
        whileInView="animate"
        variants={VARIANTS.lg_ul}
        viewport={{ once: true }}
        className={`hidden px-8 lg:flex my-28 w-full mx-auto max-w-6xl flex-row justify-center items-stretch h-auto gap-6 skill__card__container`}
      >
        {techStack.map(({ heading, text }, i) => (
          <motion.section
            key={i}
            variants={VARIANTS.lg_ul}
            className={`p-6 z-10 w-full group max-w-lg hover:scale-105 transition-all will-change-transform skill__card ${
              i % 2 ? "ml-0 translate-y-6" : "mr-0 -translate-y-6"
            } max-w-lg rounded-md drop-shadow-2xl ${
              isDarkMode ? "bg-dark__light text-light" : "bg-light text-dark"
            }`}
          >
            <strong
              className={`text-2xl font-title capitalize font-bold break-words bg-gradient-to-r group-hover:group-odd:text-primary group-hover:group-even:text-secondary will-change-transform mb-6 block`}
            >
              {heading}
            </strong>
            <div className="opacity-75 group-hover:opacity-100">
              <MarkdownStep text={text} />
            </div>
          </motion.section>
        ))}
      </motion.article>

      <motion.div
        variants={VARIANTS.btn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="w-max mx-auto pb-20"
      >
        <StickyWrapper>
          <CTA
            btnMode={true}
            isDarkMode={isDarkMode}
            label={
              <div className="inline-flex items-center justify-center gap-1">
                <IoCloudDownloadOutline className="group-hover:scale-110 group-hover:rotate-[360deg] transition-all" />
                <strong className="font-bold">My Resume</strong>
              </div>
            }
            cb={() => alert(new Date().toLocaleString())}
          />
        </StickyWrapper>
      </motion.div>
    </motion.section>
  );
};
