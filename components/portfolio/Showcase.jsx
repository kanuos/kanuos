import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO_LINKS } from "../../utils";

const Showcase = ({ projects, isDarkMode, selectProject }) => {
  const variants = {
    projectLeft: {
      show: {
        x: 0,
        opacity: 1,
        transition: {
          type: "linear",
          duration: 0.5,
          delay: 0.5,
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
          type: "linear",
          duration: 0.5,
          delay: 0.5,
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
          staggerChildren: 0.5,
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
    linear: {
      initial: {
        y: 100,
        scaleY: 0,
        opacity: 0,
      },
      final: {
        y: 0,
        scaleY: 1,
        opacity: 1,
        transition: {
          type: "linear",
          delayChildren: 0.25,
          staggerChildren: 0.25,
        },
      },
    },
  };

  return (
    <>
      <motion.section
        id={PORTFOLIO_LINKS["selected works"].name}
        initial="initial"
        whileInView="final"
        variants={variants.content}
        className="h-auto w-full flex flex-col items-start relative md:px-10"
      >
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeader
            paddingBottom={false}
            heading="selected work"
            shadow="projects I've worked on"
            content={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. `}
          />
        </div>

        <AnimatePresence exitBeforeEnter={true}>
          <motion.section className="my-20 w-full grid gap-y-28 md:gap-y-20 grid-cols-1 h-auto min-h-screen mx-auto snap-y snap-always snap-mandatory max-w-5xl">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                viewport={{ once: true }}
                className={`w-full p-10 snap-center group h-auto`}
              >
                <motion.article
                  variants={
                    i % 2 === 0 ? variants.projectLeft : variants.projectRight
                  }
                  whileInView="show"
                  initial="hide"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => selectProject(project)}
                  key={project._id}
                  viewport={{ once: true }}
                  className="relative peer snap-top w-full group-even:mr-auto group-odd:ml-auto md:flex md:items-center md:group-even:flex-row-reverse md:group-odd:flex-row md:gap-x-6 cursor-pointer"
                >
                  <motion.figure
                    variants={variants.content}
                    whileInView="show"
                    initial="hide"
                    viewport={{ once: true }}
                    className="h-[30vh] relative overflow-hidden filter rounded-md z-10 drop-shadow-2xl shadow-2xl w-full md:max-w-2xl md:grow"
                  >
                    <Image
                      className="h-full w-full object-cover block group-hover:scale-125 transition-all group-hover:group-even:rotate-3 group-hover:group-odd:-rotate-3"
                      loader={({ src, width }) => `${src}?w=${width}&q=100`}
                      src={project.design.thumbnail}
                      layout="fill"
                    />
                  </motion.figure>

                  <motion.section className="flex flex-col gap-y-4 mt-10 pl-6 md:pl-0 max-w-md">
                    <motion.legend className="text-xs font-semibold px-2 inline-flex gap-x-1 items-center">
                      <span className="text-primary group-hover:text-secondary">
                        {i + 1}
                      </span>
                      <span>&ndash;</span>
                      <span className="text-primary group-hover:text-secondary">
                        {projects.length}
                      </span>
                    </motion.legend>
                    <motion.h3
                      variants={variants.content}
                      className="text-5xl font-black tracking-tighter max-w-xs transition-all bg-gradient-to-r from-primary to-secondary bg-clip-text group-hover:text-transparent px-2"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className={
                        "px-2 text-sm tracking-tighter w-full max-w-sm group-hover:opacity-100 " +
                        (isDarkMode ? "opacity-50" : "opacity-75")
                      }
                    >
                      {project.desc}
                    </motion.p>
                  </motion.section>
                </motion.article>
              </motion.div>
            ))}
          </motion.section>
        </AnimatePresence>

        <motion.a
          href=""
          className="text-sm block w-max max-w-md mx-auto relative after:absolute after:w-4 after:h-0.5 after:-bottom-2 after:bg-current after:left-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          Check out my website
        </motion.a>
      </motion.section>
    </>
  );
};

export default Showcase;
