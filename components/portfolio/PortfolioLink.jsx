import { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "../../contexts/ThemeContext";

export const PortfolioLink = ({
  href = "",
  isExternal,
  label,
  btnMode = false,
  cb,
  shadow = true,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  if (btnMode) {
    return (
      <div className="w-max mx-auto">
        <button
          onClick={cb}
          data-title={label}
          className={`relative font-semibold w-max block text-center after:absolute after:content-[attr(data-title)] after:top-full  after:w-full text-transparent after:left-0 hover:after:top-0 after:transition-all before:absolute before:content-[attr(data-title)] before:top-0 before:w-full before:left-0 hover:before:-top-full before:transition-all overflow-hidden before:text-sm after:text-sm before:font-semibold after:font-semibold before:capitalize after:capitalize capitalize ${
            shadow && "hover:shadow-md"
          } cursor-pointer ${
            isDarkMode
              ? "after:text-light before:opacity-60 before:text-light"
              : "after:text-dark before:opacity-60 before:text-dark"
          }`}
        >
          {label}
        </button>
      </div>
    );
  }
  if (isExternal) {
    return (
      <div className="w-max mx-auto">
        <a
          href={href}
          rel="noreferrer noopener"
          target="_blank"
          data-title={label}
          className={`relative font-semibold w-max block text-center after:absolute after:content-[attr(data-title)] after:top-full  after:w-full text-transparent after:left-0 hover:after:top-0 after:transition-all before:absolute before:content-[attr(data-title)] before:top-0 before:w-full before:left-0 hover:before:-top-full before:transition-all overflow-hidden before:text-sm after:text-sm before:font-semibold after:font-semibold before:capitalize after:capitalize capitalize ${
            shadow && "hover:shadow-md"
          } cursor-pointer ${
            isDarkMode
              ? "after:text-light before:opacity-60 before:text-light"
              : "after:text-dark before:opacity-60 before:text-dark"
          }`}
        >
          {label}
        </a>
      </div>
    );
  }
  return (
    <div className="w-max mx-auto">
      <Link href={href}>
        <a
          data-title={label}
          className={`relative font-semibold w-max block text-center after:absolute after:content-[attr(data-title)] after:top-full  after:w-full text-transparent after:left-0 hover:after:top-0 after:transition-all before:absolute before:content-[attr(data-title)] before:top-0 before:w-full before:left-0 hover:before:-top-full before:transition-all overflow-hidden before:text-sm after:text-sm before:font-semibold after:font-semibold before:capitalize after:capitalize capitalize ${
            shadow && "hover:shadow-md"
          } cursor-pointer ${
            isDarkMode
              ? "after:text-light before:opacity-60 before:text-light"
              : "after:text-dark before:opacity-60 before:text-dark"
          }`}
        >
          {label}
        </a>
      </Link>
    </div>
  );
};
