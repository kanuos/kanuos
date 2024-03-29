import { useState, useContext } from "react";
import { PUBLIC_NAVIGATION_URLS, titleCase } from "../../utils";
import { JoinLine } from "../public/DescHeader";
import { AnimatePresence, motion } from "framer-motion";
import { IoCubeOutline, IoChevronDown } from "react-icons/io5";
import { CTA } from "../portfolio/CTA";
import { ADMIN_EDIT_URL } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MarkdownStep } from "../public/PageStepComponent";

export const ProjectThumbnail = ({ data, index, adminMode = false }) => {
  const [hovered, setHovered] = useState(false);
  const [showMD, setShowMD] = useState(false);

  const metadataVariants = {
    wrapper: {
      show: {
        opacity: 1,
        scale: 1,
        height: "auto",
        pointerEvents: "all",
        transition: {
          type: "tween",
          origin: "bottom",
          delay: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        scale: 0,
        height: "0",
        pointerEvents: "none",
        transition: {
          type: "linear",
          duration: 0.25,
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
        },
      },
      hide: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none",
        transition: {
          type: "tween",
          duration: 0.25,
        },
      },
    },
  };

  const btnVariants = {
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
    hide: {
      y: "100%",
      opacity: 0,
    },
  };

  const articleVariants = {
    left: {
      hide: {
        scale: 0.5,
        opacity: 0.5,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 200 },
      },
    },
    right: {
      hide: {
        scale: 0.5,
        opacity: 0.5,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 200 },
      },
    },
  };

  const { isDarkMode } = useContext(ThemeContext);

  const projectURL = adminMode
    ? ADMIN_EDIT_URL("project", data._id)
    : PUBLIC_NAVIGATION_URLS.projects + "/" + data.slug;

  return (
    <motion.article
      whileInView="show"
      whileTap="show"
      initial="hide"
      variants={index % 2 ? articleVariants.left : articleVariants.right}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col gap-y-2 max-w-lg w-full ${
        index % 2 === 0 ? "ml-auto items-end" : "items-start mr-auto"
      }`}
    >
      <p
        className={`text-xs transition-all ${
          hovered ? "opacity-100 text-primary" : "opacity-50"
        }`}
      >
        <small className="font-bold">Project : #{index}</small>
      </p>
      {!data.isPublic && (
        <p className={`text-xs transition-all text-primary`}>
          <small className="font-bold">Admin Only</small>
        </p>
      )}
      <h3
        className={`font-bold transition-all text-2xl md:text-3xl ${
          index % 2 === 0 ? "text-right" : "text-left"
        } ${hovered ? "opacity-100" : "opacity-75"}`}
      >
        {titleCase(data.title)}
      </h3>
      <p className={`text-xs uppercase`}>
        <small className="font-bold">{data.category}</small>
      </p>
      <div className={`filter ${hovered ? "grayscale-0" : "grayscale"}`}>
        <JoinLine />
      </div>
      <div
        className={`content--secondary ${
          index % 2 === 0 ? "text-right" : "text-left"
        }`}
      >
        <MarkdownStep
          text={
            data.desc?.slice(0, 250) + (data.desc.length > 250 ? "..." : "")
          }
        />
      </div>
      <section className="bg-white rounded-md p-4 pb-0 w-full mt-4 filter shadow-lg">
        <div
          onClick={() => setShowMD((prev) => !prev)}
          className={
            "flex items-center justify-between cursor-pointer text-dark hover:text-primary"
          }
        >
          <p className="flex items-center justify-start gap-x-1 pb-2">
            <IoCubeOutline />
            <small className="text-sm font-bold capitalize">
              Project information
            </small>
          </p>
          <motion.button
            animate={!showMD ? { rotate: 0 } : { rotate: 180 }}
            className={`text-lg`}
          >
            <IoChevronDown />
          </motion.button>
        </div>
        <AnimatePresence>
          <motion.section
            variants={metadataVariants.wrapper}
            animate={showMD ? "show" : "hide"}
            className="w-full"
          >
            <motion.ul
              variants={metadataVariants.body}
              className="text-xs flex mt-2 border-t flex-col items-start gap-4 py-4 text-dark pl-6"
            >
              <li className="w-full">
                <ul className="flex flex-col items-start gap-4">
                  <li className="flex items-center justify-start gap-1">
                    <span className="capitalize font-bold">Difficulty</span>
                  </li>
                  <li className="flex w-full items-center justify-between">
                    <small className="text-xs capitalize font-bold opacity-60">
                      {data.difficulty}
                    </small>
                  </li>
                </ul>
              </li>
              <li className="w-full">
                <ul className="flex flex-col items-start gap-4">
                  <li className="flex items-center justify-start gap-1.5">
                    <span className="capitalize font-bold">Tech stack</span>
                  </li>
                  <li className="flex w-full items-center justify-between">
                    <ul className="flex flex-col items-start gap-y-2 gap-x-4">
                      {data.techStack.map((stack, i) => (
                        <li key={i}>
                          <small className="text-xs font-bold opacity-60">
                            {stack.text}
                          </small>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
            </motion.ul>
          </motion.section>
        </AnimatePresence>
      </section>
      <ul
        className={`text-sm mt-4 ${
          index % 2 === 0 ? "text-right" : "text-left"
        }`}
      >
        <li className="text-xs font-bold capitalize opacity-75">
          <small>Project Date</small>
        </li>
        <li className={`text-xs font-bold ${hovered ? "text-primary" : ""}`}>
          {new Date(data.date).toDateString()}
        </li>
      </ul>
      <motion.div
        variants={btnVariants}
        animate={hovered ? "show" : "hide"}
        className="my-6 capitalize text-xs rounded hidden md:flex items-center justify-center relative overflow-hidden cursor-pointer"
      >
        <CTA
          label={adminMode ? "Open project in Admin Mode" : "View project"}
          href={projectURL}
          isDarkMode={isDarkMode}
        />
      </motion.div>

      <div className="my-6 capitalize text-xs rounded flex md:hidden items-center justify-center relative overflow-hidden cursor-pointer">
        <CTA
          label={adminMode ? "Open project in Admin Mode" : "View project"}
          href={projectURL}
          isDarkMode={isDarkMode}
        />
      </div>
    </motion.article>
  );
};
