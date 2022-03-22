import Link from "next/link";

import { formatURLParamString, PUBLIC_URLS } from "../../utils";
import { JoinLine } from "../public/DescHeader";
import { motion } from "framer-motion";
import { ADMIN_EDIT_URL } from "../../utils/admin";

export const DesignThumbnail = ({ data, adminMode, center, index }) => {
  
  const designURL = adminMode
    ? ADMIN_EDIT_URL("design", data._id)
    : PUBLIC_URLS.designs.url + "/" + formatURLParamString(data.title);

  return (
    <motion.article
      initial={{ scale : .5 }}
      whileInView={{ rotate : index % 2 ? -5 : 5, scale: 1.05, transition : { type : 'spring', stiffness : 400 }}}
      className={
        (center
          ? "w-full max-w-sm "
          : "sm:col-span-3 sm:even:row-span-2 sm:odd:row-span-2 row-span-1 ") +
        " text-dark bg-light sm:hover:scale-110 flex flex-col gap-y-2 relative h-full min-h-[28rem] lg:h-full flex-grow group overflow-hidden p-2.5 shadow-lg hover:shadow-2xl w-full odd:-rotate-3 even:rotate-3 sm:hover:rotate-0"
      }
    >
      {/* TODO: img to Image */}
      <img
        src={data.thumbnail}
        alt={data.title + "'s thumbnail"}
        className="h-full w-full object-cover filter group-hover:grayscale transition-all group-hover:h-3/5"
      />

      <section className="bottom-0 left-0 w-full h-1/2 absolute z-10 bg-light translate-y-0 md:translate-y-full md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:transition-all md:transform-gpu md:duration-300 md:delay-200">
        <section className="w-full h-1/2 p-10">
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
