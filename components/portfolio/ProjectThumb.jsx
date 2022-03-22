import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { JoinLine } from "../public/DescHeader";
import { PortfolioLink } from "./PortfolioLink";

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
        opacity: 0,
        x: "-100",
      },
      show: {
        opacity: 1,
        x: 0,
        transition: {
          type: "linear",
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
    },
    right: {
      hide: {
        opacity: 0,
        x: "100",
      },
      show: {
        opacity: 1,
        x: 0,
        transition: {
          type: "linear",
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
    },
    item: {
      hide: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { type: "linear", staggerChildren: 0.5 },
      },
    },
    imageLeft: {
      hide: { opacity: 0, y: '100%', x: '-100%'},
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { type: "linear", staggerChildren: 0.5, delay: 0.75 },
      },
    },
    imageRight: {
      hide: { opacity: 0, y: '100%', x: '100%'},
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { type: "linear", staggerChildren: 0.5, delay: 0.75 },
      },
    },
  };

  return (
    <motion.article
      variants={variants.container}
      initial="hide"
      whileInView="show"
      className="h-auto w-full flex flex-col justify-center gap-6 p-10 snap-center group even:items-end odd:items-start lg:odd:flex-row lg:even:flex-row-reverse lg:items-end z-10"
    >
      <motion.section
        viewport={{ once: true }}
        variants={index % 2 === 0 ? variants.left : variants.right}
        whileInView="show"
        initial="hide"
        className="flex flex-col justify-start group-even:items-end group-odd:items-start"
      >
        <motion.p variants={variants.item} className="text-xs w-max mb-2">
          <small className="text-xs opacity-75">
            Project {index} of {total}
          </small>
        </motion.p>

        <motion.h3
          variants={variants.item}
          className="filter drop-shadow-lg text-5xl md:text-7xl capitalize font-black  w-min group-even:text-right group-odd:text-left"
        >
          {title}
        </motion.h3>
        <JoinLine />

        <motion.p
          variants={variants.item}
          className="text-xs capitalize font-semibold italic max-w-sm group-even:text-right group-odd:text-left"
        >
          {desc}
        </motion.p>

        <ul className="flex flex-col group-even:items-end group-odd:items-start my-6 gap-y-2 max-w-lg">
          <li className="text-xs font-semibold capitalize text-primary">
            tags
          </li>
          <li>
            <motion.ul
              variants={variants.item}
              className="flex flex-wrap gap-x-4 gap-y-2 group-even:justify-end group-odd:justify-start"
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
        <motion.div
          variants={variants.item}
          className="my-4 md:block hidden animate-bounce"
        >
          <PortfolioLink
            label="view details"
            btnMode={true}
            cb={() => selectProject({ _id: project._id })}
          />
        </motion.div>
      </motion.section>

      <motion.div
        variants={index % 2 ? variants.imageLeft : variants.imageRight}
        className="w-full block bg-light filter md:group-even:hover:rotate-3 md:group-odd:hover:-rotate-3 md:p-3 md:bg-light md:shadow-lg lg:group-even:-rotate-3 lg:group-odd:rotate-3 lg:group-hover:scale-105 group-hover:shadow-2xl max-w-lg h-[75vh] md:h-[50vh]"
      >
        <motion.figure
          variants={index % 2 ? variants.imageLeft : variants.imageRight}
          className="h-full w-full object-cover block relative"
        >
          <Image
            loader={({ src, width }) => `${src}?w=${width}&q=100`}
            src={portfolioDesign.thumbnail}
            layout="fill"
            objectFit="cover"
            alt={`Project ${title}'s thumbnail`}
          />
        </motion.figure>
      </motion.div>

      <motion.div
        variants={variants.item}
        className="my-4 w-full grid place-content-center md:hidden"
      >
        <PortfolioLink
          label="view details"
          btnMode={true}
          cb={() => selectProject(project)}
        />
      </motion.div>
    </motion.article>
  );
};
