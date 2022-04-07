import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const ShadowText = ({ text }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <motion.span
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1 }}
      className={
        "absolute -top-10 -right-10 md:-right-16 text-8xl -z-10 max-w-sm lg:max-w-md w-min break-words font-black uppercase tracking-tighter leading-[0.65] md:leading-[0.75] inline-block pointer-events-none filter text-light drop-shadow-md text-center " +
        (isDarkMode ? "opacity-5" : "opacity-50")
      }
    >
      {text}
    </motion.span>
  );
};
