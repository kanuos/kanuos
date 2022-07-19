import { motion } from "framer-motion";

export const CloseBtn = ({ isOpen, cb, isDarkMode }) => {
  return (
    <motion.div
      onClick={cb}
      className={
        "z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group h-12 w-12 fixed top-4 right-4 rounded-full group transition-colors drop-shadow-xl " +
        (isOpen
          ? "opacity-50 hover:opacity-100"
          : isDarkMode
          ? "bg-dark__light"
          : "bg-light")
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
        className={`w-6 rounded h-0.5 transition-colors ${
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
        className={`w-6 rounded h-0.5 transition-colors ${
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
