import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CTA } from "./CTA";
import { PORTFOLIO_PROJECT_PATH } from "../../utils";

export const WorkThumb = ({ project = null, i, caption, isDarkMode }) => {
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
      className={`w-full snap-center h-auto md:min-h-[50vh]`}
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
          "relative snap-top w-full flex flex-col-reverse md:items-center md:gap-x-6 peer " +
          (i % 2 === 0 ? "md:flex-row-reverse mr-auto" : "md:flex-row ml-auto")
        }
      >
        <motion.section className="flex flex-col mt-8 max-w-md px-8 md:px-10">
          <motion.legend className="text-xs px-2">
            <small
              className={`${
                hovered ? "text-primary" : "text-current opacity-60"
              } font-semibold transition-all`}
            >
              {caption}
            </small>
          </motion.legend>
          <motion.h3
            variants={variants.content}
            className={`text-2xl lg:text-3xl mt-1 mb-3 font-black max-w-xs w-max break-words transition-all px-2 delay-100 origin-center tracking-tight capitalize bg-gradient-to-r ${
              isDarkMode ? "from-light" : "from-dark"
            } via-primary to-secondary bg-clip-text ${
              hovered ? "text-transparent" : "text-current"
            }`}
          >
            {project.project.title}
          </motion.h3>
          <motion.p
            className={`px-2 text-sm tracking-tighter w-full max-w-sm ${
              hovered ? "opacity-90" : "opacity-60"
            } `}
          >
            {project.project.desc}
          </motion.p>
        </motion.section>

        <motion.figure
          variants={variants.content}
          whileInView="show"
          initial="hide"
          viewport={{ once: true }}
          className={`h-[35vh] relative overflow-hidden filter rounded-md z-10 drop-shadow-2xl shadow-2xl w-11/12 md:w-full max-w-xl grow ${
            hovered ? "grayscale-0" : "grayscale"
          }`}
        >
          <Image
            className={`h-full w-full max-w-2xl object-cover block filter transition-all`}
            loader={({ src, width }) => `${src}?w=${width}&q=100`}
            priority={true}
            src={project.design.thumbnail}
            layout="fill"
            alt={project.design.title + " thumbnail"}
          />
        </motion.figure>
      </motion.article>

      <motion.div
        className={`w-fit my-10 px-8 md:px-10 md:w-full md:mt-16 md:grid md:place-items-center transition-all ${
          hovered
            ? "peer-hover:opacity-100 peer-hover:pointer-events-auto peer-hover:translate-y-0 peer-hover:scale-100"
            : "opacity-0 scale-0 pointer-events-none translate-y-full"
        }`}
      >
        <CTA
          label="View details"
          href={PORTFOLIO_PROJECT_PATH + project.project.slug}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </motion.div>
  );
};
