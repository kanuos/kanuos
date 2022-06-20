import { IoMailOutline } from "react-icons/io5";

import { CTA } from "./CTA";
import { PORTFOLIO_LINKS, SOCIAL } from "../../utils";
import { StyledHeader } from "./StyledHeader";
import { Footer } from "../public/Footer";

export const ContactMe = ({ isDarkMode }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["contact me"].name}
      className={`min-h-[95vh] flex pt-10 flex-col items-start w-full ${
        isDarkMode ? "nav-light" : "nav-dark"
      }`}
    >
      <StyledHeader
        isDarkMode={!isDarkMode}
        styledText="let's work together"
        showScroll={false}
      >
        <section className="mt-10 max-w-5xl mx-auto w-full">
          <h2 className="heading--secondary">Get in touch</h2>
          <p className="content--secondary my-10 max-w-xl text-justify">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using, making it look like
            readable English.
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
      <Footer />
    </div>
  );
};
