// in built + external imports
import { useContext } from "react";
import { motion } from "framer-motion";

// internal imports : components
import { JoinLine } from "../public/DescHeader";
import { CTA } from "../portfolio/CTA";

// internal imports : utils & more
import { PUBLIC_NAVIGATION_URLS } from "../../utils";
import { ADMIN_EDIT_URL } from "../../utils/admin";
import { ThemeContext } from "../../contexts/ThemeContext";

export const BlogThumbnail = ({ data, index, adminMode = false }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const articleVariants = {
    left: {
      hide: {
        scale: 0.5,
        opacity: 0.5,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 200 },
      },
    },
    right: {
      hide: {
        scale: 0.5,
        opacity: 0.5,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 200 },
      },
    },
  };

  const blogURL = adminMode
    ? ADMIN_EDIT_URL("blog", data._id)
    : PUBLIC_NAVIGATION_URLS.blogs + "/" + data.slug;

  const isEven = index % 2 === 0;

  return (
    <article className="even:items-end odd:items-start even:ml-auto odd:mr-auto max-w-lg">
      <motion.article
        whileInView="show"
        whileTap="show"
        initial="hide"
        variants={
          index % 2 === 0 ? articleVariants.left : articleVariants.right
        }
        className={`flex flex-col gap-y-2 w-full group ${
          isEven ? "items-end" : "items-start"
        }`}
      >
        <p className="text-xs font-semibold transition-all group-hover:text-primary opacity-50 group-hover:opacity-100">
          <small>Blog : #{index}</small>
        </p>
        {!data.isPublic && (
          <span className="text-xs mt-2 group-even:text-right group-odd:text-left font-semibold capitalize text-primary">
            admin only
          </span>
        )}
        <h3
          className={
            (!data.isPublic && "opacity-50") +
            " font-semibold opacity-75 group-hover:opacity-100 transition-all text-xl md:text-2xl group-odd:text-left group-even:text-right"
          }
        >
          {data.title}
        </h3>
        <div className="filter grayscale group-hover:grayscale-0 transition-all">
          <JoinLine />
        </div>
        <p
          className={`content--secondary ${
            isEven ? "text-right" : "text-left"
          }`}
        >
          {data.desc?.slice(0, 250)}{" "}
          <span className="text-primary text-lg font-semibold">.....</span>
        </p>
        <div
          className={`flex flex-col gap-2 justify-start mt-3 w-full ${
            isEven ? "items-end" : "items-start"
          }`}
        >
          <span className="text-xs font-semibold capitalize transition-all group-hover:text-primary">
            tags
          </span>
          <ul className="flex flex-wrap pz-2 opacity-50 group-hover:opacity-100 items-start group-odd:justify-start group-even:justify-end flex-grow gap-x-4 gap-y-2 capitalize font-semibold text-xs">
            {data.tags.map((tag) => (
              <li key={tag._id}>{tag.tag}</li>
            ))}
          </ul>
        </div>
        <ul className="text-sm mt-2 group-even:text-right group-odd:text-left">
          <li>
            <span className="text-xs font-semibold capitalize transition-all group-hover:text-primary">
              published on
            </span>
          </li>
          <li className="text-xs font-semibold opacity-75">
            <small>{new Date(data.date).toDateString()}</small>
          </li>
        </ul>
      </motion.article>
      <motion.div
        whileInView="show"
        whileTap="show"
        initial="hide"
        variants={
          index % 2 === 0 ? articleVariants.left : articleVariants.right
        }
        className={`my-10 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer w-max ${
          index % 2 ? "mr-auto" : "ml-auto"
        }`}
      >
        <CTA
          label={adminMode ? "Open blog in Admin mode" : "Read blog"}
          href={blogURL}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </article>
  );
};
