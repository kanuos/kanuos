import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CTA } from "./CTA";

export const WorkThumb = ({ project = null, i, caption, isDarkMode, cb }) => {
  const variants = {
    projectLeft: {
      show: {
        x: 0,
        scale: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          staggerChildren: 0.25,
        },
      },
      hide: {
        x: -100,
        scale: 0,
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
        scale: 1,
        transition: {
          type: "spring",
          duration: 0.25,
          staggerChildren: 0.25,
        },
      },
      hide: {
        x: 100,
        scale: 0,
        transition: {
          type: "spring",
          staggerChildren: 0.25,
          when: "afterChildren",
        },
      },
    },
    content: {
      show: {
        scaleY: 1,
        transition: {
          type: "linear",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        scaleY: 0,
        transition: {
          staggerChildren: 0.25,
          when: "afterChildren",
        },
      },
    },
    image: {
      show: {
        opacity: 1,
        transition: {
          type: "linear",
        },
      },
      hide: {
        opacity: 0,
        transition: {
          type: "linear",
        },
      },
    },
    btn: {
      show: {
        scale: 1,
        transition: {
          type: "spring",
          delay: 0.5,
        },
      },
      hide: {
        scale: 0,
      },
    },
  };

  const [hovered, setHovered] = useState(false);

  if (!project) {
    return <></>;
  }

  return (
    <AnimatePresence>
      <motion.section
        initial="hide"
        exit="hide"
        whileInView="show"
        variants={i % 2 === 0 ? variants.projectLeft : variants.projectRight}
        onMouseLeave={() => setHovered(false)}
        className={`w-full snap-center h-auto md:min-h-[50vh] max-w-4xl mx-auto ${
          i % 2 === 0 ? "md:pl-8" : "md:pr-8"
        }`}
      >
        <motion.article
          variants={variants.content}
          key={project._id}
          onMouseEnter={() => setHovered(true)}
          onTap={() => setHovered(true)}
          className={
            "relative snap-top w-full flex flex-col-reverse md:items-center peer md:gap-x-4 " +
            (i % 2 === 0
              ? "md:flex-row-reverse mr-auto"
              : "md:flex-row ml-auto")
          }
        >
          <motion.section
            variants={variants.content}
            className={
              "flex flex-col mt-8 max-w-md px-8 md:px-10 " +
              (i % 2 === 0
                ? "items-start mr-auto md:mr-0 md:pl-0"
                : "items-end ml-auto md:ml-0 md:items-start md:pr-0")
            }
          >
            <motion.legend
              variants={variants.content}
              className={`${
                hovered ? "text-primary" : "text-current opacity-60"
              } transition-all text-xs px-2`}
            >
              <motion.small>{caption}</motion.small>
            </motion.legend>
            <motion.h3
              variants={variants.content}
              className={`text-2xl lg:text-3xl my-1 font-title font-bold max-w-xs w-max break-words transition-all px-2 delay-100 origin-center capitalize bg-gradient-to-r ${
                i % 2 === 0
                  ? "text-left md:text-left"
                  : "text-right md:text-left"
              }`}
            >
              {project.project.title}
            </motion.h3>
            <motion.p
              variants={variants.content}
              className={`text-primary uppercase text-xs px-2 mb-3`}
            >
              <motion.small className="font-bold">
                {project.project.category}
              </motion.small>
            </motion.p>
            <motion.p
              variants={variants.content}
              className={`px-2 text-sm tracking-tighter w-full max-w-sm ${
                i % 2 === 0
                  ? "text-left md:text-left"
                  : "text-right md:text-left"
              } ${hovered ? "opacity-90" : "opacity-60"} `}
            >
              {project.project.desc.slice(0, 100)}{" "}
              {project.project.desc.length >= 100 ? "..." : ""}
            </motion.p>
          </motion.section>

          <motion.figure
            variants={variants.image}
            className={`h-[45vh] md:h-[35vh] relative filter z-10 drop-shadow-2xl shadow-2xl w-11/12 mx-auto md:mx-0 md:w-full md:max-w-xl grow ${
              hovered ? "grayscale-0" : "grayscale"
            }`}
          >
            <Image
              className={`h-full w-full max-w-xl object-cover block filter transition-all rounded-md overflow-hidden`}
              loader={({ src, width }) => `${src}?w=${width}&q=100`}
              priority={true}
              src={project.design.thumbnail}
              layout="fill"
              alt={project.design.title + " thumbnail"}
            />
          </motion.figure>
        </motion.article>

        <motion.div
          variants={variants.btn}
          className={`w-fit my-10 px-8 md:px-10 md:w-full md:mt-16 md:grid md:place-items-center transition-all ${
            i % 2 === 0 ? "mr-auto md:" : "ml-auto md:"
          } ${
            hovered
              ? "md:peer-hover:opacity-100 md:peer-hover:pointer-events-auto md:peer-hover:translate-y-0 md:peer-hover:scale-100"
              : "md:opacity-0 md:scale-0 md:pointer-events-none md:translate-y-full"
          }`}
        >
          <CTA
            label="Expand Project"
            tiny={true}
            btnMode={true}
            cb={() => cb(project)}
            isDarkMode={isDarkMode}
            scroll={true}
          />
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};
