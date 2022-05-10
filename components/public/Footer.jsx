import { SOCIAL_LINKS } from "../../utils";
import { SocialIcons } from "../portfolio/SocialIcons";

export const Footer = () => {
  return (
    <footer className="mt-auto text-xs w-full grid place-items-center pb-6">
      <small className="font-semibold">
        Designed and developed by Sounak Mukherjee
      </small>
      <ul className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {Object.entries(SOCIAL_LINKS).map(([social, url]) => (
          <li
            key={social}
            className="opacity-60 hover:opacity-100 hover:scale-150 hover:rotate-[360deg] transition-all"
          >
            <SocialIcons social={social} url={url} />
          </li>
        ))}
      </ul>
    </footer>
  );
};
