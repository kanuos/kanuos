import { useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SOCIAL_LINKS } from "../../utils";
import { SocialIcons } from "../portfolio/SocialIcons";
import me from "../../public/apple-touch-icon-180x180.png";

export const Footer = ({ about = "author", content = "" }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <footer
      className={`relative mt-auto text-xs w-full flex flex-col items-center justify-between ${
        isDarkMode ? "nav-light" : "nav-dark"
      }`}
    >
      <div className="px-8 md:px-10 pb-10 w-full max-w-4xl mx-auto">
        <figure className="relative h-16 w-16 md:w-20 md:h-20 p-1 bg-light block rounded-full -translate-y-1/2 filter drop-shadow-[0_-4px_20px_rgba(23,23,56,.35)]">
          <Image
            src={me}
            className="top-0 object-cover rounded-full h-full w-full"
          />
        </figure>
        <strong className="heading--sub block mb-2">About {about}</strong>
        <p className="content--sub max-w-lg">
          {content
            ? content
            : `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae aliquid eaque ut magnam maxime veritatis odio esse ipsa accusantium similique, reprehenderit sit eum ipsam. Qui ipsum odit reiciendis cum doloribus?`}
        </p>
        <ul className="flex flex-wrap w-full items-center justify-start gap-3 mt-20">
          {Object.entries(SOCIAL_LINKS).map(([social, url]) => (
            <li
              key={social}
              className="opacity-60 hover:opacity-100 hover:scale-150 hover:rotate-[360deg] transition-all"
            >
              <SocialIcons social={social} url={url} />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
