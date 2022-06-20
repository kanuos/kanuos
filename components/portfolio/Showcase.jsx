import { AnimatePresence, motion } from "framer-motion";
import { CTA } from "./CTA";
import { WorkThumb } from "./WorkThumb";
import { PageLink } from "./PageLink";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../../utils";

export const Showcase = ({ works = [], isDarkMode = false }) => {
  const CATEGORIES = ["All", "Front end", "Full stack"];
  return (
    <section
      id={PORTFOLIO_LINKS["selected works"].name}
      className="h-auto min-h-screen p-10 w-full max-w-5xl mx-auto"
    >
      <h2 className="heading--secondary mb-4">Selected projects and designs</h2>
      <ul className="flex gap-4 items-center justify-start my-8">
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
      <AnimatePresence exitBeforeEnter={true}>
        <motion.section className="py-20 w-full flex flex-col gap-y-28 h-auto min-h-screen mx-auto snap-y snap-always snap-mandatory max-w-5xl">
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
