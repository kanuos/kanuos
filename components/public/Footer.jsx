import Image from "next/image";
import { SOCIAL_LINKS } from "../../utils";
import { SocialIcons } from "../portfolio/SocialIcons";
import img from "../../public/android-chrome-512x512.png";

export const Footer = ({ detailMode = false }) => {
  return (
    <footer
      className={`mt-auto w-full grid place-items-center ${
        detailMode ? "pb-4" : "pb-6"
      }`}
    >
      <Image
        alt="Sounak's logo"
        height={40}
        width={40}
        src={img}
        objectFit="contain"
      />
      <p className="text-center my-3">
        <small className="font-bold">Created by Sounak</small>
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-3">
        {Object.entries(SOCIAL_LINKS).map(([social, url]) => (
          <li
            key={social}
            className="text-xs lg:text-sm opacity-60 hover:opacity-100 hover:scale-150 hover:rotate-[360deg] transition-all"
          >
            <SocialIcons social={social} url={url} />
          </li>
        ))}
      </ul>
    </footer>
  );
};
