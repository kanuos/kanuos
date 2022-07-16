import React from "react";
import Link from "next/link";

export const PageLink = ({
  label,
  href = "",
  isExternal = false,
  isActive = false,
  showAfter = true,
  special = false,
  scrollToTop = true,
}) => {
  const cls = `inline-block w-max max-w-lg py-0.5 relative after:absolute after:h-[1.5px] hover:after:w-full after:left-0 after:bottom-0 after:bg-secondary after:rounded-full after:transition-all ${
    special
      ? "hover:text-secondary opacity-100 after:w-4"
      : isActive
      ? "after:w-full opacity-100"
      : `${showAfter ? "after:w-4" : "after:w-0"}`
  }`;
  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={href} className={cls}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} scroll={scrollToTop}>
      <a className={cls}>
        {label}
        {/* <small className="font-bold">{label}</small> */}
      </a>
    </Link>
  );
};
