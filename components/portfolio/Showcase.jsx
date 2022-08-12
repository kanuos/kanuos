import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_LINKS, PUBLIC_URLS, titleCase } from "../../utils";

const CTA = dynamic(() => import("./CTA").then((m) => m.CTA));
const WorkThumb = dynamic(() => import("./WorkThumb").then((m) => m.WorkThumb));
const PageLink = dynamic(() => import("./PageLink").then((m) => m.PageLink));

const VARIANTS = {
  control: {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.25, ease: "easeIn", type: "linear" },
    },
  },
  children: {
    initial: { opacity: 0, x: 100, scale: 0 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { staggerChildren: 0.25, ease: "easeIn", type: "linear" },
    },
  },
  btn: {
    initial: { opacity: 0, scale: 0, y: -200 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { ease: "easeIn", type: "spring", delay: 0.75 },
    },
  },
};

export const Showcase = ({
  works = [],
  isDarkMode = false,
  handleSelectProject,
}) => {
  const CATEGORIES = works.map((el) => titleCase(el.project?.category));

  if (CATEGORIES.length > 1) {
    CATEGORIES.unshift("All");
  }

  const [keyword, setKeyword] = useState(CATEGORIES[0]);

  const filteredWork = useMemo(() => {
    if (["All", "all"].includes(keyword)) {
      return works.sort((a, b) => b.priority - a.priority).slice(0, 6);
    }
    return works
      .filter(
        (el) => el.project?.category?.toLowerCase() === keyword?.toLowerCase()
      )
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 6);
  }, [keyword, works]);

  useEffect(() => {
    function cb() {
      if (window.innerWidth < 768) {
        setKeyword("all");
      }
    }
    window?.addEventListener("resize", cb);
    return () => window?.removeEventListener("resize", cb);
  }, []);

  return (
    <section
      id={PORTFOLIO_LINKS["selected works"].name}
      className="h-auto w-full max-w-6xl mx-auto"
    >
      <motion.div
        variants={VARIANTS.control}
        initial="initial"
        className="p-8 max-w-4xl mx-auto"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2 variants={VARIANTS.control} className={`w-max mr-auto`}>
          <span className="heading--primary">Works</span>
        </motion.h2>
        <motion.p
          variants={VARIANTS.control}
          className="content--secondary mb-4"
        >
          <span className="opacity-75">
            Showing some of my favorite projects
          </span>
        </motion.p>
        {CATEGORIES.length > 1 && (
          <motion.ul
            variants={VARIANTS.children}
            className="hidden md:flex gap-y-4 gap-x-2 items-center justify-start my-8 flex-wrap"
          >
            {CATEGORIES.map((el, i) => (
              <motion.li variants={VARIANTS.children} key={i} className="w-fit">
                <CTA
                  label={el}
                  btnMode={true}
                  tiny={true}
                  cb={() => setKeyword(() => el)}
                  isDarkMode={isDarkMode}
                  isActive={el === keyword}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      <motion.section
        key={filteredWork.length}
        className="py-6 sm:py-20 w-full flex flex-col gap-y-16 md:gap-y-28 h-auto mx-auto snap-y snap-always snap-mandatory"
      >
        {filteredWork.map((project, i) => (
          <WorkThumb
            project={project}
            i={i}
            cb={handleSelectProject}
            key={i}
            isDarkMode={isDarkMode}
            caption={`${i + 1} — ${filteredWork.length}`}
          />
        ))}
      </motion.section>
      <motion.div
        viewport={{ once: true }}
        variants={VARIANTS.btn}
        whileInView="animate"
        initial="initial"
        className="grid place-items-center mt-20"
      >
        <PageLink
          label="Check out my other works"
          href={PUBLIC_URLS.home.url}
        />
      </motion.div>
    </section>
  );
};
