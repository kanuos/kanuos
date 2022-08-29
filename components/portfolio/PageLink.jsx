import React from "react";
import Link from "next/link";

export const PageLink = ({
  label,
  href = "",
  isExternal = false,
  resumeMode = false,
  scrollToTop = true,
}) => {
  const cls = `navStyleLink inline-block font-title text-lg`;

  const base = `relative group w-fit mx-auto flex items-center justify-center after:absolute after:h-[1.25px] after:block after:bg-gradient-to-r after:from-primary after:to-secondary after:left-0 after:right-0 after:bottom-0.5 after:origin-center after:w-full after:scale-0 hover:after:scale-100 after:transition-all`;

  if (resumeMode) {
    return (
      <Link className={base} href={href}>
        <a download>
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
  }

  if (isExternal) {
    return (
      <a className={base} target="_blank" rel="noopener noreferrer" href={href}>
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
      <a className={base}>
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
