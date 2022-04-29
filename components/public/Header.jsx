import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SOCIAL } from "../../utils";
import { CTA } from "../portfolio/CTA";

export const PublicHeader = ({ data }) => {
  const { title, desc, count, type } = data;
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <header className="flex flex-col items-start mb-24 gap-y-2">
      <h1 className="text-5xl md:text-7xl font-black mt-2 mb-6 w-min">
        {title}
      </h1>
      <p className="w-3/4 text-sm opacity-75">{desc}</p>
      {count > 0 && (
        <strong className="capitalize text-xs font-semibold mt-4">
          total {type} : {count}
        </strong>
      )}
      <div className="mt-10">
        <CTA
          isDarkMode={isDarkMode}
          externalLink={true}
          href={SOCIAL.mailto}
          label="Get in touch"
        />
      </div>
    </header>
  );
};
