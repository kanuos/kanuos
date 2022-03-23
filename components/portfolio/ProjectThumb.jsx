import { useState } from "react";
import { motion } from "framer-motion";

import { JoinLine } from "../public/DescHeader";

export const ProjectThumb = ({
  project = null,
  index,
  total,
  selectProject,
}) => {
  const [showImage, setShowImage] = useState(false);
  if (!project) {
    return <></>;
  }
  const { title, desc } = project;

  const portfolioProject = project.project;
  const portfolioDesign = project.design;

  const tags = [
    ...new Set([
      ...portfolioProject.tags.map(({ tag }) => tag),
      ...portfolioDesign.tags.map(({ tag }) => tag),
    ]),
  ];

  const variants = {
    container: {
      hide: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: {
          type: "linear",
        },
      },
    },
    left: {
      hide: {
        opacity: 0.5,
        x: "-100%",
        rotate: 5,
      },
      show: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          type: "linear",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
    },
    right: {
      hide: {
        opacity: 0.5,
        x: "100%",
        rotate: -5,
      },
      show: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          type: "linear",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
    },
    item: {
      hide: { opacity: 0, scale: 0 },
      show: {
        opacity: 1,
        scale: 1,
        transition: { type: "linear", staggerChildren: 0.25 },
      },
    },
    text: {
      hide: { opacity: 0, scale: 0 },
      show: {
        opacity: .75,
        scale: 1,
        transition: { type: "linear", staggerChildren: 0.25 },
      },
    },
  };

  return (
    <motion.article
      variants={variants.container}
      initial="hide"
      viewport={{ once: true }}
      whileInView="show"
      className="h-auto w-full flex flex-col justify-center gap-6 p-10 snap-center even:items-end odd:items-start z-10"
    >
      <motion.section
        variants={index % 2 === 0 ? variants.left : variants.right}
        className={
          "flex flex-col justify-start lg:gap-x-10 lg:w-full group lg:grid lg:grid-cols-2 lg:grid-flow-row lg:h-[60vh]"
        }
      >
        <div
          className={
            "flex flex-col w-full max-w-lg lg:row-start-1 " +
            (index % 2 ? "items-start col-start-1" : "items-end col-start-2")
          }
        >
          <motion.p variants={variants.item} className="text-xs w-max mb-2">
            <small className="text-xs opacity-75">
              Project {index} of {total}
            </small>
          </motion.p>

          <motion.h3
            variants={variants.item}
            className={"filter drop-shadow-lg text-5xl md:text-7xl capitalize font-black w-min break-words max-w-xs " + ((index % 2 === 0) ? 'text-right' : 'text-left')}
          >
            {title}
          </motion.h3>

          <motion.div variants={variants.item}>
            <JoinLine />
          </motion.div>

          <motion.p
            variants={variants.text}
            className={"text-xs capitalize font-semibold italic max-w-sm " + ((index % 2) ? 'text-left' : 'text-right')}
          >
            {desc}
          </motion.p>

          <ul
            className={
              "flex flex-col my-6 gap-y-2 max-w-md " +
              (index % 2 ? "items-start" : "items-end")
            }
          >
            <motion.li
              variants={variants.item}
              className="text-xs font-semibold capitalize text-primary"
            >
              tags
            </motion.li>
            <li>
              <motion.ul
                variants={variants.item}
                className={
                  "flex flex-wrap gap-x-4 gap-y-2 " +
                  (index % 2 ? "justify-start" : "justify-end")
                }
              >
                {tags.map((tag, i) => (
                  <motion.li
                    variants={variants.item}
                    key={i}
                    className="text-xs uppercase font-semibold opacity-75"
                  >
                    <small>{tag}</small>
                  </motion.li>
                ))}
              </motion.ul>
            </li>
          </ul>
        </div>

        <motion.figure
          variants={variants.item}
          className={
            "w-full lg:row-span-full " +
            (index % 2 ? "lg:col-start-2" : "lg:col-start-1")
          }
          onAnimationComplete={() => setShowImage(true)}
        >
          <img
            className={
              "h-[50vh] max-w-lg bg-light sm:p-3 md:p-4 filter drop-shadow-xl w-full block object-cover rounded-md sm:rounded-none z-10 lg:hover:drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all" +
              (index % 2
                ? "group-hover:rotate-3 md:rotate-3"
                : "group-hover:-rotate-3 md:-rotate-3")
            }
            src={portfolioDesign.thumbnail}
            alt={`Project ${title}'s thumbnail`}
          />
        </motion.figure>

        <motion.div
          variants={variants.text}
          transition={{ delay : 1 }}
          className={
            "mt-10 lg:mt-0 block lg:row-start-3 z-10 " +
            (index % 2
              ? "text-left lg:col-start-1"
              : "text-right lg:col-start-2")
          }
        >
          <button
            className="text-xs uppercase opacity-50 lg:opacity-0 lg:group-hover:opacity-100 transition-all font-semibold hover:underline underline-offset-2"
            onClick={() => selectProject(project)}
          >
            {index % 2 ===0 && <>&larr;</>}  view details {(index % 2 !==0) && <>&rarr;</>}
          </button>
        </motion.div>
      </motion.section>
    </motion.article>
  );
};
