import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Tag = ({ cb = null, tag, isActive = false }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const cls = {
    base: `uppercase font-semibold content--sub border-current border-2 py-0.5 px-3 rounded`,
    static() {
      return `${this.base} ${isDarkMode ? "text-secondary" : "text-primary"}`;
    },
    link() {
      return `${
        this.base
      } transition-all hover:shadow-lg cursor-pointer bg-opacity-0 hover:bg-opacity-5 ${
        isDarkMode
          ? "opacity-50 hover:opacity-100 hover:text-secondary bg-secondary"
          : "hover:text-primary bg-primary"
      } ${isActive ? (isDarkMode ? "text-secondary" : "text-primary") : ""}`;
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
