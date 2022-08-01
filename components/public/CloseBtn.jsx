import { motion } from "framer-motion";

export const CloseBtn = ({ isOpen, cb, isDarkMode }) => {
  return (
    <motion.div
      onClick={cb}
      initial={{
        borderRadius: "25%",
        opacity: 0.75,
      }}
      whileHover={{
        opacity: 1,
        rotateY: isOpen ? 0 : 180,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
        },
      }}
      className={
        "z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group h-12 w-12 fixed top-2 right-4 lg:top-4 lg:right-6 group transition-colors drop-shadow-xl " +
        (isOpen
          ? ""
          : `${
              isDarkMode ? "bg-dark__light" : "bg-light"
            } hover:drop-shadow-2xl`)
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
        className={`w-5 rounded h-0.5 ${
          isOpen
            ? isDarkMode
              ? "bg-light group-hover:bg-primary"
              : "bg-dark group-hover:bg-primary"
            : isDarkMode
            ? "bg-light bg-opacity-50 group-hover:bg-opacity-100"
            : "bg-dark bg-opacity-50 group-hover:bg-opacity-100"
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
        className={`w-5 rounded h-0.5 ${
          isOpen
            ? isDarkMode
              ? "bg-light group-hover:bg-primary"
              : "bg-dark group-hover:bg-primary"
            : isDarkMode
            ? "bg-light bg-opacity-50 group-hover:bg-opacity-100"
            : "bg-dark bg-opacity-50 group-hover:bg-opacity-100"
        }`}
      ></motion.span>
    </motion.div>
  );
};
