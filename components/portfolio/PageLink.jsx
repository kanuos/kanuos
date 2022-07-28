import React from "react";
import Link from "next/link";

export const PageLink = ({
  label,
  href = "",
  isExternal = false,
  scrollToTop = true,
}) => {
  const cls = `opacity-50 hover:opacity-100 navStyleLink inline-block font-title text-lg`;

  const ToolTip = (
    <p className="text-xs">
      <small className="absolute px-2 py-1 bg-dark__light text-light w-max max-w-xs rounded left-0 top-full invisible group-hover:visible z-20 transition-all delay-1000 font-mono">
        Go to {label} page {href}.
      </small>
    </p>
  );

  if (isExternal) {
    return (
      <a
        className="relative group"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
      >
        {ToolTip}
        {label.split("").map((el, i) => {
          if (el === " ") {
            return <span key={i}>&nbsp;</span>;
          }
          return (
            <span className={cls} key={i}>
              {el}
            </span>
          );
        })}
      </a>
    );
  }

  return (
    <Link href={href} scroll={scrollToTop}>
      <a className="relative group">
        {ToolTip}
        {label.split("").map((el, i) => {
          if (el === " ") {
            return <span key={i}>&nbsp;</span>;
          }
          return (
            <span className={cls} key={i}>
              {el}
            </span>
          );
        })}
      </a>
    </Link>
  );
};
