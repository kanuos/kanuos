import Image from "next/image";
import { motion } from "framer-motion";
import { InfoGroup } from "../public/InfoGroup";

const variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      ease: "easeIn",
      type: "linear",
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      when: "afterChildren",
      ease: "easeIn",
      type: "linear",
      staggerChildren: 0.25,
      staggerDirection: -1,
    },
  },
};

export const DetailHeader = ({
  caption,
  title,
  thumbnail = null,
  items = [],
  aboutMe = false,
  figcaption,
}) => {
  return (
    <motion.header variants={variants}>
      <motion.section className="p-8 max-w-4xl mx-auto grid grid-cols-10 h-auto">
        <motion.div className={(aboutMe ? "" : "mb-20") + " col-span-full"}>
          <motion.p className="text-xs text-primary w-max">{caption}</motion.p>
          <motion.h1 className={`heading--primary w-full uppercase mt-1`}>
            {title}
          </motion.h1>
        </motion.div>

        {items.length > 0 && <InfoGroup items={items} />}
      </motion.section>
      {thumbnail && (
        <>
          <motion.figure className="relative h-[75vh] lg:h-[80vh] w-full max-w-6xl mx-auto lg:rounded-md overflow-hidden md:my-6">
            <Image
              layout="fill"
              className="object-cover"
              loader={({ src, width }) => `${src}?w=${width}&q=100`}
              src={thumbnail}
              alt={`${title} poster`}
            />
          </motion.figure>
          {figcaption && (
            <motion.figcaption className="text-xs opacity-75 capitalize text-center mt-2">
              <motion.small>{figcaption}</motion.small>
            </motion.figcaption>
          )}
        </>
      )}
    </motion.header>
  );
};
