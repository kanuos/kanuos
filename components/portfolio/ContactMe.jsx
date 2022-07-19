import { IoMailOutline } from "react-icons/io5";

import { CTA } from "./CTA";
import { PORTFOLIO_LINKS, SOCIAL } from "../../utils";
import { StyledHeader } from "./StyledHeader";
import { Footer } from "../public/Footer";

export const ContactMe = ({ isDarkMode, portfolioMode = true }) => {
  const CONTENT = portfolioMode
    ? {
        styledText: "let's work together",
        heading: "Get in touch",
        content: `I am always eager to work on interesting projects. If you have any such intersting projects in mind, please reach out to me and I'll get back to you as soon as possible.`,
      }
    : {
        styledText: "Connect with me",
        heading: "Contact Me",
        content: `If you have any doubts about my work please reach out to me. You can use any of my designs, projects or blogs to your use provided you give proper attribution to my site. To learn more about attribution, contact me. I'll respond as soon as possible. `,
      };

  return (
    <div
      id={PORTFOLIO_LINKS["contact me"].name}
      className={`min-h-[95vh] flex pt-10 flex-col items-start w-full ${
        isDarkMode ? "nav-light" : "nav-dark"
      }`}
    >
      <StyledHeader
        isDarkMode={!isDarkMode}
        styledText={CONTENT.styledText}
        showScroll={false}
      >
        <section className="mt-10 max-w-4xl mx-auto w-full">
          <h2
            className={`heading__portfolio w-max mr-auto ${
              !isDarkMode
                ? "heading__portfolio--dark-mode"
                : "heading__portfolio--light-mode"
            }`}
          >
            {CONTENT.heading}
          </h2>
          <p className="content--secondary my-10 max-w-xl text-justify">
            {CONTENT.content}
          </p>
          <CTA
            isDarkMode={!isDarkMode}
            externalLink={true}
            href={SOCIAL.mailto}
            label={
              <div className="inline-flex items-center justify-center gap-2">
                <IoMailOutline className="group-hover:scale-150 group-hover:rotate-[360deg] transition-all" />
                {SOCIAL.email}
              </div>
            }
          />
        </section>
      </StyledHeader>
      <div className="mt-20 mb-2 w-full">
        <Footer />
      </div>
    </div>
  );
};
