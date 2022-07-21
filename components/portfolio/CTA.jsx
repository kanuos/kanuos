// built in imports
import Link from "next/link";

export const CTA = ({
  label,
  href,
  btnMode = false,
  cb = undefined,
  externalLink = false,
  isDarkMode = false,
  isActive = false,
  btnType = "button",
  tiny = false,
  scroll = false,
}) => {
  const wrapper = `text-sm ${
    tiny ? "" : "lg:text-base"
  } relative inline-block group overflow-hidden hover:shadow-2xl transition-all p-px`;
  const content = `z-10 border-2 w-full h-full block font-bold py-1.5 ${
    tiny ? "px-4" : "px-6"
  } relative rounded-full transition-all ${
    isDarkMode
      ? !isActive
        ? "group-hover:text-dark border-light"
        : "text-dark group-hover:text-dark border-light"
      : !isActive
      ? "group-hover:text-light border-dark"
      : "text-light group-hover:text-light border-dark"
  }`;
  const style = `absolute left-0 origin-center pointer-events-none transition-all w-full h-full rounded-full ease-linear ${
    isDarkMode ? "bg-light" : "bg-dark"
  } ${
    isActive
      ? "top-0 scale-100"
      : "top-full group-hover:top-0 group-hover:scale-100 scale-0"
  }`;

  if (btnMode) {
    return (
      <button type={btnType} className={wrapper} onClick={cb}>
        <span className={content}>{label}</span>
        <span className={style}></span>
      </button>
    );
  }
  if (externalLink) {
    return (
      <a
        className={wrapper}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className={content}>{label}</span>
        <span className={style}></span>
      </a>
    );
  }

  return (
    <Link href={href} scroll={scroll}>
      <a className={wrapper}>
        <span className={content}>{label}</span>
        <span className={style}></span>
      </a>
    </Link>
  );
};
