// Portfolio page
import dynamic from "next/dynamic";
import { useContext, useState, useCallback, memo } from "react";
import { AnimatePresence } from "framer-motion";

// import : internal
import { getPortfolio } from "../../database/user";

import { ThemeContext } from "../../contexts/ThemeContext";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../../utils";

import PublicLayout from "../../components/Layouts/PublicLayout";

import { PortfolioHeader } from "../../components/portfolio/PortfolioHeader";

const Showcase = dynamic(() =>
  import("../../components/portfolio/Showcase").then((m) => m.Showcase)
);
const PortfolioLoader = dynamic(() =>
  import("../../components/portfolio/PortfolioLoader").then(
    (m) => m.PortfolioLoader
  )
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
  const [isLoading, setIsLoading] = useState(true);

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
          <PortfolioHeader
            heading="Coming soon"
            text={`Hi there, I am Sounak. The portfolio page you are trying to visit is currently being maintained. You can still visit my blogs, projects and designs in my website. Please follow the link below to the visit my work.`}
            href={PUBLIC_URLS.home.url}
            label="Go to HomePage"
            isDarkMode={isDarkMode}
          />
        </main>
      </PublicLayout>
    );
  }

  const hideLoader = useCallback(() => {
    setIsLoading(() => false);
  }, []);

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
        navType={isLoading ? undefined : "portfolio"}
      >
        <PortfolioLoader
          isDarkMode={isDarkMode}
          hide={hideLoader}
          isLoading={isLoading}
        />
        {!isLoading && (
          <>
            <PortfolioHeader
              location={metadata.location}
              heading={`Hi I'm ${metadata.fullName.split(" ")[0]}`}
              isDarkMode={isDarkMode}
              text={metadata.about}
              href={PORTFOLIO_LINKS["contact me"].url}
              label="Say Hi!"
            />

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
          </>
        )}
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
