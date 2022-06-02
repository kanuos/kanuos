import Image from "next/image";

import { formatURLParamString, PUBLIC_NAVIGATION_URLS } from "../../utils";
import { motion } from "framer-motion";
import { ADMIN_EDIT_URL } from "../../utils/admin";
import { CTA } from "../portfolio/CTA";

export const DesignThumbnail = ({ data, adminMode = false, index = 0 }) => {
  const designURL = adminMode
    ? ADMIN_EDIT_URL("design", data._id)
    : PUBLIC_NAVIGATION_URLS.designs + "/" + formatURLParamString(data.title);
  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      <motion.article
        initial={{ scale: 0.5 }}
        whileInView={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 400 },
        }}
        whileHover={{
          scale: 1.1,
          rotate: index % 2 ? 2 : -2,
          shadow: "1px 4px 10px rgba(0,0,0,.10)",
        }}
        whileTap={{ scale: 1.1 }}
        className="text-dark bg-light sm:hover:scale-110 flex flex-col gap-y-2 relative h-full mx-auto w-64 lg:h-full flex-grow group overflow-hidden p-2 shadow-lg hover:shadow-2xl"
      >
        <div className="bg-dark md:bg-light w-full h-full min-h-[22rem] max-w-xs">
          <figure className="relative w-full h-full min-h-[22rem] max-w-xs">
            <Image
              loader={({ src, width }) => `${src}?w=${width}&q=75`}
              src={data.thumbnail}
              layout="fill"
              alt={data.title + "'s thumbnail"}
              className="h-full w-full object-cover filter group-hover:blur-sm md:group-hover:blur-none transition-all group-hover:h-3/5 group-hover:scale-125"
            />
          </figure>
        </div>

        <section className="bottom-0 left-0 w-full h-full md:h-3/5 absolute z-10 bg-transparent group-hover:bg-light opacity-0 group-hover:opacity-100 group-hover:bg-opacity-70 md:group-hover:bg-opacity-100 md:bg-light bg-opacity-90 md:bg-opacity-100 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:transition-all md:transform-gpu md:duration-300 md:delay-200 flex flex-col items-center justify-center gap-y-10">
          <h3 className="heading--sub w-min text-center text-light group-hover:text-dark md:text-dark">
            {data.title}
          </h3>
          <div className="hover:-translate-y-1 transition-all scale-0 group-hover:scale-90 md:scale-90 hover:scale-x-100">
            <CTA
              label={adminMode ? "View in Admin mode" : "Explore design"}
              href={designURL}
              isDarkMode={false}
            />
          </div>
        </section>
      </motion.article>
      {adminMode && (
        <p
          className={`font-semibold content--sub text-center ${
            data.isPublic ? "text-secondary" : "text-primary"
          }`}
        >
          <small>Access : {!data.isPublic ? "Private" : "Public"}</small>
        </p>
      )}
    </div>
  );
};
