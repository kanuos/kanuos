import { AnimatePresence, motion } from "framer-motion";

import { JoinLine } from "../public/DescHeader";
import { ShadowText } from "./ShadowText";

export const SectionHeader = ({
  heading,
  content,
  shadow = "",
  paddingBottom = true,
}) => {
  const variants = {
    wrapper: {
      hide: {
        opacity: 0.5,
      },
      show: {
        opacity: 1,
        transition: {
          type: "tween",
          when: "beforeChildren",
        },
      },
    },
    h2: {
      hide: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: { type: "linear" },
      },
    },
    content: {
      hide: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: {
          type: "linear",
        },
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.article
        variants={variants.wrapper}
        initial="hide"
        whileInView="show"
        className={
          "flex flex-col relative mt-20 pt-20 px-10 " +
          (paddingBottom ? "pb-20 mb-20" : "")
        }
      >
        <motion.section
          variants={variants.wrapper}
          className="relative z-10 max-w-md"
        >
          <ShadowText text={shadow} />
          <motion.h2
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
            variants={variants.h2}
            className="text-7xl lg:text-8xl tracking-tighter leading-[0.8] lg:leading-[0.8] capitalize w-min selection:text-transparent bg-gradient-to-b from-primary to-secondary bg-clip-text selection:bg-transparent"
          >
            {heading}
          </motion.h2>
          {content && (
            <>
              <motion.div variants={variants.content} className="ml-4">
                <JoinLine />
              </motion.div>
              <motion.p
                variants={variants.content}
                className="text-xs uppercase m-2 font-black w-3/4 max-w-lg text-primary"
              >
                <small>{content}</small>
              </motion.p>
            </>
          )}
        </motion.section>
      </motion.article>
    </AnimatePresence>
  );
};
