import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTA } from "./CTA";
import { WorkThumb } from "./WorkThumb";
import { PageLink } from "./PageLink";
import { PORTFOLIO_LINKS, PUBLIC_URLS, titleCase } from "../../utils";

export const Showcase = ({ works = [], isDarkMode = false }) => {
  const CATEGORIES = works.map((el) => titleCase(el.project?.category));

  CATEGORIES.unshift("All");

  const [keyword, setKeyword] = useState("All");

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
      className="h-auto w-full max-w-4xl mx-auto"
    >
      <div className="p-10">
        <h2 className="heading--secondary mb-4">
          Selected projects and designs
        </h2>
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
      </div>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.section className="py-6 sm:py-20 w-full sm:p-10 flex flex-col gap-y-16 md:gap-y-28 h-auto mx-auto snap-y snap-always snap-mandatory max-w-4xl">
          {filteredWork.map((project, i) => (
            <WorkThumb
              project={project}
              i={i}
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
