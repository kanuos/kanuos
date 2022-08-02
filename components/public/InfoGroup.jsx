import { motion } from "framer-motion";

const variant = {
  initial: {
    opacity: 0,
    scaleY: 0,
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.25,
      ease: "easeIn",
      type: "linear",
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.25,
      staggerDirection: -1,
      ease: "easeIn",
      type: "linear",
    },
  },
};

export const InfoGroup = ({ items = [] }) => {
  return (
    <motion.ul className="col-span-full flex items-start justify-between">
      {items.map(({ heading, content }, i) => (
        <motion.li
          variants={variant}
          key={i}
          className="flex flex-col items-start gap-y-2 grow last-of-type:items-end"
        >
          <motion.p className="opacity-50 text-xs">
            <small className="font-bold uppercase">{heading}</small>
          </motion.p>
          {Array.isArray(content) ? (
            <motion.ul
              variants={variant}
              className="text-sm flex items-start flex-col"
            >
              {content.map((el, k) => (
                <motion.li key={k}>
                  <motion.small className="capitalize">{el}</motion.small>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p className="text-sm">
              <motion.small className="capitalize">{content}</motion.small>
            </motion.p>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};
