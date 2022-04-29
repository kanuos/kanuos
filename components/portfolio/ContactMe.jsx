import React from "react";
import { CTA } from "./CTA";
import { PORTFOLIO_LINKS, SOCIAL, SOCIAL_LINKS } from "../../utils";
import { StyledHeader } from "./StyledHeader";
import { PageLink } from "./PageLink";
import { SocialIcons } from "./SocialIcons";

export const ContactMe = ({ isDarkMode }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["contact me"].name}
      className={`min-h-[95vh] flex pt-10 flex-col items-start w-full ${
        isDarkMode ? "nav-light" : "nav-dark"
      }`}
    >
      <StyledHeader isDarkMode={!isDarkMode} styledText="let's work together">
        <section>
          <h2 className="text-3xl md:text-5xl font-semibold">Say hello</h2>
          <p
            className={`w-full max-w-lg text-xs font-semibold mt-6 mb-10 opacity-75`}
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <CTA
            isDarkMode={!isDarkMode}
            externalLink={true}
            href={SOCIAL.mailto}
            label={SOCIAL.email}
          />
        </section>
      </StyledHeader>
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
    </div>
  );
};
