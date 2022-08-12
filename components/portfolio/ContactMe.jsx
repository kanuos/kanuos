import { IoMailOutline } from "react-icons/io5";

import { CTA } from "./CTA";
import { PORTFOLIO_LINKS, SOCIAL } from "../../utils";
import { StyledHeader } from "./StyledHeader";
import { Footer } from "../public/Footer";
import { MarkdownStep } from "../public/PageStepComponent";

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
      className={`h-full flex flex-col items-start w-full ${
        isDarkMode ? "nav-light" : "nav-dark"
      }`}
    >
      <StyledHeader
        isDarkMode={!isDarkMode}
        styledText={CONTENT.styledText}
        showScroll={false}
      >
        <section className="max-w-4xl mx-auto w-full">
          <h2 className={`heading--primary w-max mr-auto `}>
            {CONTENT.heading}
          </h2>
          <div className="my-10 content--main">
            <MarkdownStep text={CONTENT.content} />
          </div>
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
        <div className="mt-auto mb-2 w-full">
          <Footer detailMode={true} />
        </div>
      </StyledHeader>
    </div>
  );
};
