import Image from "next/image";
import Link from "next/link";

import { formatURLParamString, PUBLIC_NAVIGATION_URLS } from "../../utils";
import { JoinLine } from "../public/DescHeader";
import { motion } from "framer-motion";
import { ADMIN_EDIT_URL } from "../../utils/admin";

export const DesignThumbnail = ({ data, adminMode = false, index = 0 }) => {
  const designURL = adminMode
    ? ADMIN_EDIT_URL("design", data._id)
    : PUBLIC_NAVIGATION_URLS.designs + "/" + formatURLParamString(data.title);
  return (
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
      className="text-dark bg-light sm:hover:scale-110 flex flex-col gap-y-2 relative h-full w-full max-w-xs lg:h-full flex-grow group overflow-hidden p-2 shadow-lg hover:shadow-2xl"
    >
      {!data.isPublic && (
        <small className="font-semibold text-primary absolute top-0 left-0 z-10 bg-light p-2">
          Admin Only
        </small>
      )}
      <div className="bg-light w-full h-full min-h-[20rem] max-w-xs">
        <figure className="relative w-full h-full min-h-[20rem] max-w-xs">
          <Image
            loader={({ src, width }) => `${src}?w=${width}&q=75`}
            src={data.thumbnail}
            layout="fill"
            alt={data.title + "'s thumbnail"}
            className="h-full w-full object-cover filter group-hover:grayscale transition-all group-hover:h-3/5 group-hover:scale-125"
          />
        </figure>
      </div>

      <section className="bottom-0 left-0 w-full h-5/6 absolute z-10 bg-light bg-opacity-90 md:bg-opacity-100 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:transition-all md:transform-gpu md:duration-300 md:delay-200">
        <section className="w-full h-auto p-10">
          <h3 className="font-semibold text-lg">{data.title}</h3>
          <JoinLine />
          <motion.div className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer w-max">
            <Link href={designURL}>
              <a className="py-1.5 px-6 block z-10 peer hover:text-light transition-all hover:shadow-xl border-2 border-dark peer">
                go to design
              </a>
            </Link>
            <span className="py-1.5 px-6 block bg-dark transition-all hover:shadow-xl border-2 border-dark absolute top-0 left-0 h-full w-full group-odd:-translate-x-full group-even:translate-x-full peer-hover:translate-x-0 z-0 duration-300"></span>
          </motion.div>
        </section>
      </section>
    </motion.article>
  );
};
