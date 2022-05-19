import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SOCIAL } from "../../utils";
import { CTA } from "../portfolio/CTA";

export const PublicHeader = ({ data, adminMode = false }) => {
  const { title, desc, count, type } = data;
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <header className="flex flex-col items-start mb-24 gap-y-2">
      {adminMode && (
        <small className="content--sub font-semibold -mb-4 text-secondary">
          Admin Mode
        </small>
      )}
      <h1 className="heading--main">{title}</h1>
      <p className="content--main my-6">{desc}</p>
      {count > 0 && (
        <strong className="heading--sub">
          total {type} : {count}
        </strong>
      )}
      {!adminMode && (
        <div className="mt-4">
          <CTA
            isDarkMode={isDarkMode}
            externalLink={true}
            href={SOCIAL.mailto}
            label="Get in touch"
          />
        </div>
      )}
    </header>
  );
};

// TODO: CTA search button to search type
