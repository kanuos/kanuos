import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO_LINKS, PUBLIC_URLS, titleCase } from "../../utils";

const CTA = dynamic(() => import("./CTA").then((m) => m.CTA));
const WorkThumb = dynamic(() => import("./WorkThumb").then((m) => m.WorkThumb));
const PageLink = dynamic(() => import("./PageLink").then((m) => m.PageLink));

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
      return works;
    }
    return works.filter(
      (el) => el.project?.category?.toLowerCase() === keyword?.toLowerCase()
    );
  }, [keyword, works]);

  return (
    <section
      id={PORTFOLIO_LINKS["selected works"].name}
      className="h-auto w-full max-w-6xl mx-auto"
    >
      <div className="p-8 max-w-4xl mx-auto">
        <h2
          className={`heading__portfolio w-max mr-auto ${
            isDarkMode
              ? "heading__portfolio--dark-mode"
              : "heading__portfolio--light-mode"
          }`}
        >
          Works
        </h2>
        <h3 className="heading--sub opacity-75 mb-4">
          Showing some of my favorite projects
        </h3>
        {CATEGORIES.length > 1 && (
          <ul className="flex gap-y-4 gap-x-2 items-center justify-start my-8 flex-wrap">
            {CATEGORIES.map((el, i) => (
              <li key={i} className="w-fit">
                <CTA
                  label={el}
                  btnMode={true}
                  tiny={true}
                  cb={() => setKeyword(() => el)}
                  isDarkMode={isDarkMode}
                  isActive={el === keyword}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.section className="py-6 sm:py-20 w-full flex flex-col gap-y-16 md:gap-y-28 h-auto mx-auto snap-y snap-always snap-mandatory">
          {filteredWork.map((project, i) => (
            <WorkThumb
              project={project}
              i={i}
              cb={handleSelectProject}
              key={project._id}
              isDarkMode={isDarkMode}
              caption={`Project ${i + 1} of ${filteredWork.length}`}
            />
          ))}
        </motion.section>
      </AnimatePresence>
      <div className="w-full grid place-items-center h-auto">
        <div>
          <PageLink
            label="Check out my other works"
            href={PUBLIC_URLS.home.url}
          />
        </div>
      </div>
    </section>
  );
};
