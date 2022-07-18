// Portfolio page
import dynamic from "next/dynamic";
import { useContext, useState, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";

// import : internal
import { getPortfolio } from "../../database/user";

import { ThemeContext } from "../../contexts/ThemeContext";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../../utils";

import PublicLayout from "../../components/Layouts/PublicLayout";

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
            styledText="Sounak Portfolio•page"
            isDarkMode={isDarkMode}
            showScroll={false}
          >
            <div className="flex flex-col items-start justify-center">
              <h1 className={`heading--primary--max w-min max-w-xs`}>
                Coming Soon
              </h1>
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
        <main className="w-full h-screen">
          <StyledHeader
            styledText={metadata.adminLabel}
            isDarkMode={isDarkMode}
          >
            <>
              <span className="text-sm md:text-base font-bold">Hi, I am</span>
              <h1 className="heading--primary--max w-min">
                {metadata.fullName}
              </h1>
              <Markdown className="content--main markdown-editor-wrapper mt-4">
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
