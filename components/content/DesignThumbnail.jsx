import Image from "next/image";

import { PUBLIC_NAVIGATION_URLS, titleCase } from "../../utils";
import { motion } from "framer-motion";
import { ADMIN_EDIT_URL } from "../../utils/admin";
import { CTA } from "../portfolio/CTA";

export const DesignThumbnail = ({ data, adminMode = false, index = 0 }) => {
  const designURL = adminMode
    ? ADMIN_EDIT_URL("design", data._id)
    : PUBLIC_NAVIGATION_URLS.designs + "/" + data.slug;

  return (
    <motion.article
      initial={{ scale: 0.75, rotate: index % 2 === 0 ? 10 : -10 }}
      whileInView={{
        scale: 1.01,
        rotate: 0,
        transition: { type: "tween", stiffness: 200 },
      }}
      whileHover={{
        scale: 1.05,
      }}
      className="h-96 text-dark bg-light grid grid-rows-2 relative mx-auto max-w-md w-full flex-grow p-1.5 shadow-lg overflow-hidden hover:shadow-2xl rounded-md transition-shadow"
    >
      {/* admin tag */}

      {adminMode && !data.isPublic && (
        <p
          className={`absolute top-4 z-10 left-0 w-fit mx-auto font-bold content--sub text-center bg-dark text-light p-4`}
        >
          Private
        </p>
      )}

      {/* card details */}
      <section
        className={`transition-all transform-gpu duration-300 delay-200 grid grid-rows-6 col-span-full px-4 pb-6 pt-2 row-start-2 row-end-full peer`}
      >
        <div className="flex row-span-1 h-full items-center justify-start">
          <p className="text-xs">
            <small className="bg-primary text-light px-1 py-0.5 rounded font-bold capitalize">
              {data.category}
            </small>
          </p>
        </div>
        <h3 className="heading--sub row-start-2 row-end-3 text-dark mt-2">
          {titleCase(data.title)}
        </h3>
        <p className="content--sub row-start-3 row-end-6 text-ellipsis mt-2.5">
          {titleCase(data.desc).slice(0, 50) +
            (data.desc.length > 50 ? "..." : "")}
        </p>
        <div className="w-max row-start-6 row-end-7">
          <CTA
            tiny={true}
            label={adminMode ? "View in Admin mode" : "Explore design"}
            href={designURL}
            isDarkMode={false}
          />
        </div>
      </section>
      {/* card image */}
      <figure className="relative w-full h-full row-start-1 col-span-full row-end-2 rounded-md overflow-hidden transition md:grayscale md:hover:grayscale-0 md:peer-hover:grayscale-0">
        <Image
          loader={({ src, width }) => `${src}?w=${width}&q=100`}
          src={data.thumbnail}
          layout="fill"
          objectFit="cover"
          alt={data.title + "'s thumbnail"}
        />
      </figure>
    </motion.article>
  );
};
