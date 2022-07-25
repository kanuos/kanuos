import React from "react";
import Link from "next/link";

export const PageLink = ({
  label,
  href = "",
  isExternal = false,
  scrollToTop = true,
}) => {
  const cls = `opacity-50 hover:opacity-100 navStyleLink inline-block font-title text-lg`;

  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={href}>
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
      <a>
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
        {/* <small className="font-bold">{label}</small> */}
      </a>
    </Link>
  );
};

// const classes = {
//   cta: "font-title",
//   specialLink:
//     "font-title text-2xl text-center mt-20 block bg-gradient-to-r from-primary to-secondary bg-clip-text hover:text-transparent transition-color",
//   activeLink:
//     "opacity-100 tracking-wider font-title text-lg after:absolute after:bottom-0 relative block after:left-0 after:w-full after:bg-secondary after:h-0.5",
//   inActiveLink:
//     "opacity-50 hover:opacity-100 navStyleLink inline-block font-title text-lg",
// };

{
  /* <a className={isActiveLink ? classes.activeLink : ""}>
  {isActiveLink
    ? label
    : label.split("").map((el, i) => (
        <span className={classes.inActiveLink} key={i}>
          {el}
        </span>
      ))}
</a>; */
}
