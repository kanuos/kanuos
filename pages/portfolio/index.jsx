// Portfolio page
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";

// import : internal
import { getPortfolio } from "../../database/user";

import PublicLayout from "../../components/Layouts/PublicLayout";
import { CTA } from "../../components/portfolio/CTA";
import { Showcase } from "../../components/portfolio/Showcase";
import { StyledHeader } from "../../components/portfolio/StyledHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ContactMe } from "../../components/portfolio/ContactMe";
import { AboutMe } from "../../components/portfolio/AboutMe";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../../utils";

const PortfolioPage = ({ metadata }) => {
  metadata = JSON.parse(metadata);
  const { isDarkMode } = useContext(ThemeContext);
  const validPortfolioMetadata = metadata?.portfolio?.length;
  if (!validPortfolioMetadata) {
    return (
      <PublicLayout
        metaTitle="Sounak Mukherjee | Portfolio"
        content="Check out my full stack web developer portfolio website"
        navType="portfolio"
      >
        <main className="h-screen w-screen grid place-items-center">
          <StyledHeader
            styledText="Sounak Portfolio•page"
            isDarkMode={isDarkMode}
            showScroll={false}
          >
            <div className="flex flex-col items-start justify-center">
              <h1 className={`heading--main w-min max-w-xs`}>Coming Soon</h1>
              <p className="content--main mb-10 mt-4 text-justify">
                Hi there, I am Sounak. The portfolio page you are trying to
                visit is currently being maintained. You can still visit my
                blogs, projects and designs in my website. Please follow the
                link below to the visit my work.
              </p>
              <CTA
                href={PUBLIC_URLS.home.url}
                label="Go to HomePage"
                isDarkMode={isDarkMode}
              />
            </div>
          </StyledHeader>
        </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout
      metaTitle="Sounak Mukherjee | Portfolio"
      content="Check out my full stack web developer portfolio website"
      navType="portfolio"
    >
      <main className="w-full overflow-x-hidden">
        <StyledHeader styledText={metadata.adminLabel} isDarkMode={isDarkMode}>
          <>
            <span className="text-sm md:text-base font-semibold">Hi, I am</span>
            <h1 className="heading--main w-min">{metadata.fullName}</h1>
            <Markdown className="content--main markdown-editor-wrapper">
              {metadata.about}
            </Markdown>
            <div className="mt-10">
              <CTA
                label="Let's talk"
                href={PORTFOLIO_LINKS["contact me"].url}
                isDarkMode={isDarkMode}
              />
            </div>
          </>
        </StyledHeader>

        <Showcase works={metadata.portfolio} isDarkMode={isDarkMode} />
        <AboutMe
          skills={metadata.skills}
          techStack={metadata.techStack}
          isDarkMode={isDarkMode}
        />
        <ContactMe isDarkMode={isDarkMode} />
      </main>
    </PublicLayout>
  );
};

export default PortfolioPage;

export async function getStaticProps() {
  let metadata = {};
  try {
    metadata = await getPortfolio();
    metadata = {
      ...metadata._doc,
      portfolio: metadata.portfolio.filter((el) => el.isShowcased),
    };
    return {
      props: { metadata: JSON.stringify(metadata) },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: { metadata: JSON.stringify({}) },
      revalidate: 1,
    };
  }
}
