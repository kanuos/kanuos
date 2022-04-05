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
      <div className="w-max mx-auto">
        <button
          onClick={cb}
          className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 hover:blur-0 blur-[0.5px] filter block w-max transition-all border-current cursor-pointer`}
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
          className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 hover:blur-0 blur-[0.5px] filter block w-max transition-all border-current cursor-pointer`}
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
          className={`py-1.5 px-5 border-2 text-xs font-semibold rounded hover:opacity-100 opacity-50 hover:blur-0 blur-[0.5px] filter block w-max transition-all border-current cursor-pointer`}
        >
          {label}
        </a>
      </Link>
    </div>
  );
};
