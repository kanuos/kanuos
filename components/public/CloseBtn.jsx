import { motion } from "framer-motion";

export const CloseBtn = ({ isOpen, cb }) => {
  return (
    <motion.div
      onClick={cb}
      className={
        "z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group h-12 w-12 fixed top-0 right-0 group transition " +
        (isOpen ? "bg-primary mix-blend-normal" : "mix-blend-difference")
      }
    >
      <motion.span
        animate={
          isOpen
            ? {
                rotate: 45,
                y: 3,
                transition: { type: "spring", stiffness: 400 },
              }
            : {
                rotate: 0,
                y: 0,
                transition: { type: "spring", stiffness: 400 },
              }
        }
        className={`w-6 rounded h-[2px] transition-colors ${
          isOpen
            ? "bg-dark group-hover:bg-light"
            : "group-hover:mr-1 bg-secondary"
        }`}
      ></motion.span>
      <motion.span
        animate={
          isOpen
            ? {
                rotate: -45,
                y: -5,
                transition: { type: "spring", stiffness: 400 },
              }
            : {
                rotate: 0,
                y: 0,
                transition: { type: "spring", stiffness: 400 },
              }
        }
        className={`w-6 rounded h-[2px] transition-colors ${
          isOpen
            ? "bg-dark group-hover:bg-light"
            : "group-hover:ml-1 bg-secondary"
        }`}
      ></motion.span>
    </motion.div>
  );
};
