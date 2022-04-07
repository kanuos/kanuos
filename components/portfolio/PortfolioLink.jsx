import Link from "next/link";

export const PortfolioLink = ({
  href = "",
  isExternal,
  label,
  btnMode = false,
  cb,
}) => {
  if (btnMode) {
    return (
      <button
        onClick={cb}
        className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 filter block w-max transition-all border-current cursor-pointer`}
      >
        {label}
      </button>
    );
  }
  if (isExternal) {
    return (
      <a
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 filter block w-max transition-all border-current cursor-pointer`}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a
        className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 filter block w-max transition-all border-current cursor-pointer`}
      >
        {label}
      </a>
    </Link>
  );
};
