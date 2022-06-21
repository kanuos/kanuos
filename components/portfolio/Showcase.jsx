import { AnimatePresence, motion } from "framer-motion";
import { CTA } from "./CTA";
import { WorkThumb } from "./WorkThumb";
import { PageLink } from "./PageLink";
import { PORTFOLIO_LINKS, PUBLIC_URLS, titleCase } from "../../utils";

export const Showcase = ({ works = [], isDarkMode = false }) => {
  const CATEGORIES = works.map((el) => titleCase(el.project?.category));

  CATEGORIES.unshift("All");

  return (
    <section
      id={PORTFOLIO_LINKS["selected works"].name}
      className="h-auto w-full max-w-5xl mx-auto"
    >
      <div className="p-10">
        <h2 className="heading--secondary mb-4">
          Selected projects and designs
        </h2>
        <ul className="hidden md:flex gap-4 items-center justify-start my-8">
          {CATEGORIES.map((el, i) => (
            <li key={i}>
              <CTA
                label={el}
                btnMode={true}
                cb={() => alert(el)}
                isDarkMode={isDarkMode}
                isActive={i === 0}
              />
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence exitBeforeEnter={true}>
        <motion.section className="py-6 sm:py-20 w-full sm:p-10 flex flex-col gap-y-28 h-auto mx-auto snap-y snap-always snap-mandatory max-w-5xl">
          {works.map((project, i) => (
            <WorkThumb
              project={project}
              i={i}
              key={project._id}
              isDarkMode={isDarkMode}
              total={works.length}
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
