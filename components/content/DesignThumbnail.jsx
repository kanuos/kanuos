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
      className="max-h-[55vh] h-full text-dark bg-light sm:hover:scale-110 grid grid-rows-2 relative mx-auto max-w-md w-full lg:h-full flex-grow group p-1.5 shadow-lg overflow-hidden hover:shadow-2xl rounded-md"
    >
      {/* admin tag */}

      {adminMode && (
        <p
          className={`absolute top-4 left-0 w-fit mx-auto font-semibold content--sub text-center bg-dark text-light p-4 z-20`}
        >
          {!data.isPublic ? "Private" : "Public"}
        </p>
      )}

      {/* card image */}
      <figure className="relative w-full h-full row-start-1 col-span-full z-10 group-hover:row-end-2 row-end-3 rounded-md overflow-hidden transition">
        <Image
          loader={({ src, width }) => `${src}?w=${width}&q=100`}
          src={data.thumbnail}
          layout="fill"
          objectFit="cover"
          className="transition-all"
          alt={data.title + "'s thumbnail"}
        />
      </figure>

      {/* card details */}
      <section
        className={`transition-all transform-gpu duration-300 delay-200 grid grid-rows-6 col-span-full px-4 pb-6 pt-2 row-start-2 row-end-full z-0 group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none`}
      >
        <div className="flex row-span-1 h-full items-center justify-start">
          <p className="text-xs">
            <small className="bg-primary text-light px-1 py-0.5 rounded font-semibold capitalize">
              {data.category}
            </small>
          </p>
        </div>
        <h3 className="heading--sub row-start-2 row-end-3 text-dark mt-1">
          {titleCase(data.title)}
        </h3>
        <p className="content--secondary row-start-3 row-end-6 text-ellipsis">
          {titleCase(data.desc).slice(0, 50) +
            (data.desc.length > 50 ? "..." : "")}
        </p>
        <div className="w-max row-start-6 row-end-7 hover:-translate-y-1 drop-shadow-xl transition-all scale-90 origin-left">
          <CTA
            label={adminMode ? "View in Admin mode" : "Explore design"}
            href={designURL}
            isDarkMode={false}
            isActive={true}
          />
        </div>
      </section>
    </motion.article>
  );
};
