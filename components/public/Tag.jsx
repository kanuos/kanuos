import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Tag = ({ cb = null, tag, isActive = false }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const cls = {
    base: `uppercase text-xs border-current border-2 py-1 px-2.5 rounded`,
    static() {
      return `${this.base} cursor-default`;
    },
    link() {
      return `${this.base} transition-all cursor-pointer hover:drop-shadow-xl ${
        isDarkMode
          ? "hover:border-secondary hover:bg-secondary hover:text-dark"
          : "hover:border-primary hover:bg-primary hover:text-light"
      } ${
        isActive
          ? isDarkMode
            ? "border-secondary bg-secondary text-dark"
            : "border-primary bg-primary text-light"
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
