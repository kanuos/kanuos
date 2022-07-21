import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CTA } from "./CTA";
import { StickyWrapper } from "../public/StickyWrapper";

export const WorkThumb = ({ project = null, i, caption, isDarkMode, cb }) => {
  const variants = {
    projectLeft: {
      show: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          staggerChildren: 0.25,
        },
      },
      hide: {
        x: "-100",
        opacity: 0,
        transition: {
          type: "spring",
          staggerChildren: 0.25,
          when: "afterChildren",
        },
      },
    },
    projectRight: {
      show: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          staggerChildren: 0.25,
        },
      },
      hide: {
        x: "100",
        opacity: 0,
        transition: {
          type: "spring",
          staggerChildren: 0.25,
          when: "afterChildren",
        },
      },
    },
    content: {
      show: {
        opacity: 1,
        transition: {
          type: "linear",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        transition: {
          staggerChildren: 0.25,
          when: "afterChildren",
        },
      },
    },
  };

  const [hovered, setHovered] = useState(false);

  if (!project) {
    return <></>;
  }

  return (
    <motion.div
      viewport={{ once: true }}
      onMouseLeave={() => setHovered(false)}
      className={`w-full snap-center h-auto md:min-h-[50vh] max-w-4xl mx-auto ${
        i % 2 === 0 ? "md:pl-8" : "md:pr-8"
      }`}
    >
      <motion.article
        variants={i % 2 === 0 ? variants.projectLeft : variants.projectRight}
        whileInView="show"
        initial="hide"
        key={project._id}
        viewport={{ once: true }}
        onMouseEnter={() => setHovered(true)}
        onTap={() => setHovered(true)}
        className={
          "relative snap-top w-full flex flex-col-reverse md:items-center peer md:gap-x-4 " +
          (i % 2 === 0 ? "md:flex-row-reverse mr-auto" : "md:flex-row ml-auto")
        }
      >
        <motion.section
          className={
            "flex flex-col mt-8 max-w-md px-8 md:px-10 " +
            (i % 2 === 0
              ? "items-start mr-auto md:mr-0 md:pl-0"
              : "items-end ml-auto md:ml-0 md:items-start md:pr-0")
          }
        >
          <motion.legend className="text-xs px-2">
            <small
              className={`${
                hovered ? "text-primary" : "text-current opacity-60"
              } font-bold transition-all`}
            >
              {caption}
            </small>
          </motion.legend>
          <motion.h3
            variants={variants.content}
            className={`text-2xl lg:text-3xl my-1 font-title max-w-xs w-max break-words transition-all px-2 delay-100 origin-center capitalize bg-gradient-to-r ${
              i % 2 === 0 ? "text-left md:text-left" : "text-right md:text-left"
            }`}
          >
            {project.project.title}
          </motion.h3>
          <p className="text-xs px-2 mb-3">
            <small
              className={`${
                hovered ? "text-current" : "text-primary"
              } uppercase font-bold`}
            >
              {project.project.category}
            </small>
          </p>
          <motion.p
            className={`px-2 text-sm tracking-tighter w-full max-w-sm ${
              i % 2 === 0 ? "text-left md:text-left" : "text-right md:text-left"
            } ${hovered ? "opacity-90" : "opacity-60"} `}
          >
            {project.project.desc}
          </motion.p>
        </motion.section>

        <motion.figure
          variants={variants.content}
          whileInView="show"
          initial="hide"
          viewport={{ once: true }}
          className={`h-[35vh] relative overflow-hidden filter rounded-md z-10 drop-shadow-2xl shadow-2xl w-11/12 mx-auto md:mx-0 md:w-full max-w-xl grow ${
            hovered ? "grayscale-0" : "grayscale"
          }`}
        >
          <Image
            className={`h-full w-full max-w-xl object-cover block filter transition-all`}
            loader={({ src, width }) => `${src}?w=${width}&q=100`}
            priority={true}
            src={project.design.thumbnail}
            layout="fill"
            alt={project.design.title + " thumbnail"}
          />
        </motion.figure>
      </motion.article>

      <StickyWrapper>
        <motion.div
          className={`w-fit my-10 px-8 md:px-10 md:w-full md:mt-16 md:grid md:place-items-center transition-all ${
            i % 2 === 0 ? "mr-auto md:" : "ml-auto md:"
          } ${
            hovered
              ? "peer-hover:opacity-100 peer-hover:pointer-events-auto peer-hover:translate-y-0 peer-hover:scale-100"
              : "opacity-0 scale-0 pointer-events-none translate-y-full"
          }`}
        >
          <CTA
            label="View details"
            tiny={true}
            btnMode={true}
            cb={() => cb(project)}
            isDarkMode={isDarkMode}
            scroll={true}
          />
        </motion.div>
      </StickyWrapper>
    </motion.div>
  );
};
