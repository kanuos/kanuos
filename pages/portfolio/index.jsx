// Portfolio page
import dynamic from "next/dynamic";
import { useContext, useState, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";

import { HiOutlineLocationMarker } from "react-icons/hi";

// import : internal
import { getPortfolio } from "../../database/user";

import { ThemeContext } from "../../contexts/ThemeContext";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../../utils";

import PublicLayout from "../../components/Layouts/PublicLayout";

const StickyWrapper = dynamic(() =>
  import("../../components/public/StickyWrapper").then((m) => m.StickyWrapper)
);

const Showcase = dynamic(() =>
  import("../../components/portfolio/Showcase").then((m) => m.Showcase)
);
const CTA = dynamic(() =>
  import("../../components/portfolio/CTA").then((m) => m.CTA)
);
const StyledHeader = dynamic(() =>
  import("../../components/portfolio/StyledHeader").then((m) => m.StyledHeader)
);
const ContactMe = dynamic(() =>
  import("../../components/portfolio/ContactMe").then((m) => m.ContactMe)
);
const AboutMe = dynamic(() =>
  import("../../components/portfolio/AboutMe").then((m) => m.AboutMe)
);
const WorkDetailModal = dynamic(() =>
  import("../../components/portfolio/WorkDetailModal").then(
    (m) => m.WorkDetailModal
  )
);

const MemoizedWorkModal = memo(WorkDetailModal);

const PortfolioPage = ({ metadata }) => {
  metadata = JSON.parse(metadata);
  const { isDarkMode } = useContext(ThemeContext);
  const validPortfolioMetadata = metadata?.portfolio?.length;

  const [selectedProject, setSelectedProject] = useState(null);

  const selectProject = useCallback((p) => {
    setSelectedProject(() => p);
  }, []);

  if (!validPortfolioMetadata) {
    return (
      <PublicLayout
        metaTitle="Sounak Mukherjee | Portfolio"
        content="Check out my full stack web developer portfolio website"
        navType="portfolio"
      >
        <main className="h-screen w-screen grid place-items-center">
          <StyledHeader
            styledText="Sounak mukherjee"
            isDarkMode={isDarkMode}
            showScroll={false}
          >
            <div className="flex flex-col items-start justify-center">
              <h1
                className={`heading__portfolio ${
                  isDarkMode
                    ? "heading__portfolio--dark-mode"
                    : "heading__portfolio--light-mode"
                }`}
              >
                Coming Soon
              </h1>
              <p className="content--main mb-10 mt-4 text-justify">
                Hi there, I am Sounak. The portfolio page you are trying to
                visit is currently being maintained. You can still visit my
                blogs, projects and designs in my website. Please follow the
                link below to the visit my work.
              </p>
              <StickyWrapper>
                <CTA
                  href={PUBLIC_URLS.home.url}
                  label="Go to HomePage"
                  isDarkMode={isDarkMode}
                />
              </StickyWrapper>
            </div>
          </StyledHeader>
        </main>
      </PublicLayout>
    );
  }

  return (
    <>
      {selectedProject && (
        <AnimatePresence>
          <MemoizedWorkModal
            handleSelectProject={selectProject}
            work={selectedProject}
            isDarkMode={isDarkMode}
            allProjects={metadata.portfolio}
          />
        </AnimatePresence>
      )}

      <PublicLayout
        metaTitle="Sounak Mukherjee | Portfolio"
        content="Check out my full stack web developer portfolio website"
        navType="portfolio"
      >
        <main className="min-h-screen">
          <header className="h-screen px-8 flex flex-col items-center justify-center">
            <>
              <p className="flex items-center justify-center my-1 gap-x-1 opacity-75">
                <HiOutlineLocationMarker className="animate-bounce" />
                <span className="text-xs font-bold">{metadata.location}</span>
              </p>
              <h1
                className={`heading__portfolio ${
                  isDarkMode
                    ? "heading__portfolio--dark-mode"
                    : "heading__portfolio--light-mode"
                }`}
              >
                Hi, I&apos;m {metadata.fullName.split(" ")[0]}
              </h1>
              <div className="max-w-lg text-center w-fit mt-6 mx-auto opacity-75">
                <Markdown>{metadata.about}</Markdown>
              </div>
              <div className="mt-20">
                <StickyWrapper>
                  <CTA
                    label="Say Hi!"
                    href={PORTFOLIO_LINKS["contact me"].url}
                    isDarkMode={isDarkMode}
                  />
                </StickyWrapper>
              </div>
            </>
          </header>

          <Showcase
            works={metadata.portfolio}
            isDarkMode={isDarkMode}
            handleSelectProject={selectProject}
          />
          <AboutMe
            skills={metadata.skills}
            techStack={metadata.techStack}
            isDarkMode={isDarkMode}
          />
          <ContactMe isDarkMode={isDarkMode} />
        </main>
      </PublicLayout>
    </>
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
