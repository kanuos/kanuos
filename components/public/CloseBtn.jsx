import { motion } from "framer-motion";

export const CloseBtn = ({ isOpen, cb, isDarkMode }) => {
  return (
    <motion.div
      onClick={cb}
      className={
        "z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group h-12 w-12 fixed top-2 right-4 lg:top-4 lg:right-6 group transition-all " +
        (isOpen
          ? ""
          : `${
              isDarkMode ? "bg-dark__light" : "bg-light"
            } hover:rounded-lg rounded hover:-rotate-180 drop-shadow-2xl`)
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
