import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Tag = ({ cb = null, tag, isActive = false }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const cls = {
    base: `uppercase text-xs border-current border-2 py-0.5 px-2 rounded`,
    static() {
      return `${this.base} cursor-default opacity-75`;
    },
    link() {
      return `${
        this.base
      } transition-all cursor-pointer opacity-50 hover:opacity-100 ${
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
        <small className="font-bold">{tag.tag}</small>
      </p>
    );
  }
  return (
    <button onClick={cb} className={cls.link()}>
      <small className="font-bold">{tag.tag}</small>
    </button>
  );
};
