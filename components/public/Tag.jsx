import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Tag = ({ cb = null, tag, isActive = false }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const cls = {
    base: `uppercase font-semibold content--sub border-current border-2 py-0.5 px-3 rounded`,
    static() {
      return `${this.base} cursor-default`;
    },
    link() {
      return `${
        this.base
      } transition-all cursor-pointer hover:-translate-y-0.5 hover:scale-105 ${
        isDarkMode ? "hover:text-secondary" : "hover:text-primary"
      } ${
        isActive
          ? isDarkMode
            ? "text-secondary"
            : "text-primary"
          : "text-current"
      }`;
    },
  };

  if (!cb) {
    return (
      <p className={cls.static()}>
        <small>{tag.tag}</small>
      </p>
    );
  }
  return (
    <button onClick={cb} className={cls.link()}>
      <small>{tag.tag}</small>
    </button>
  );
};
