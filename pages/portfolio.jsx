// Portfolio page
import { useEffect, useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

// import : internal
import { HeadComponent } from "../components/Head";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { ThemeContext } from "../contexts/ThemeContext";
import { getPortfolio } from "../database/user";
import { VideoBG } from "../components/public/VideoBG";

import { staticMetadata } from "../utils/portfolio_static";
import { PORTFOLIO_LINKS, PUBLIC_URLS } from "../utils";
import InitialLoader from "../components/portfolio/InitialLoader";
import Showcase from "../components/portfolio/Showcase";

const AboutMe = dynamic(() => import("../components/portfolio/AboutMe"));
const PortfolioHeader = dynamic(() =>
  import("../components/portfolio/PortfolioHeader")
);
const NavBar = dynamic(() =>
  import("../components/public/Nav").then((m) => m.NavBar)
);
const ThemeToggler = dynamic(() =>
  import("../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);
const ContactMe = dynamic(() => import("../components/portfolio/ContactMe"));

const PortfolioPage = ({ metadata }) => {
  metadata = JSON.parse(metadata);
  metadata = {
    ...staticMetadata,
    ...metadata,
    portfolio: [] ?? metadata.portfolio.filter((el) => el.isShowcased),
  };

  console.log({ metadata });

  const { isDarkMode } = useContext(ThemeContext);
  const [expandProject, setExpandProject] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [current, setCurrent] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    console.log(" exx "); //TODO: fix error max render
    if (expandProject) {
      const selectedProject = metadata.portfolio.findIndex(
        (el) => el._id === expandProject
      );

      if (selectedProject >= 0) {
        setCurrent(metadata.portfolio[selectedProject]);
        setPrev(metadata.portfolio[selectedProject - 1]);
        setNext(metadata.portfolio[selectedProject + 1]);
        return;
      }
    }
    setCurrent(null);
    setPrev(null);
    setNext(null);
  }, [expandProject, metadata.portfolio]);

  const hideLoader = useCallback(() => setShowLoader(false), []);

  // if (!metadata?.portfolio || metadata.portfolio.length === 0) {
  //   return (
  //     <>
  //       <HeadComponent title="Sounak Mukherjee | Portfolio" />
  //       <ThemeToggler />
  //       <main
  //         className={
  //           "h-screen scrollbar-none w-full overflow-hidden relative grid place-items-center filter bg-opacity-70 " +
  //           (isDarkMode ? "nav-dark" : "nav-light")
  //         }
  //       >
  //         <VideoBG />
  //         <div className="flex flex-col items-center justify-center gap-4">
  //           <small className="font-semibold uppercase text-xs">
  //             {" "}
  //             portfolio{" "}
  //           </small>
  //           <div className="animate-bounce">
  //             <JoinLine />
  //           </div>
  //           <h1 className="text-7xl w-min text-center capitalize mb-10">
  //             coming soon!
  //           </h1>
  //           <PortfolioLink
  //             label="go to home"
  //             href={PUBLIC_URLS.home.url}
  //             shadow={false}
  //           />
  //         </div>
  //       </main>
  //     </>
  //   );
  // }

  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee | Portfolio"
        content="Check out my full stack web developer portfolio website"
      />
      <NavBar type="portfolio" />
      <ThemeToggler />
      <InitialLoader
        showLoader={showLoader}
        hideLoader={hideLoader}
        isDarkMode={isDarkMode}
      />
      {!showLoader && (
        <main
          className={
            "min-h-screen h-full scrollbar-none w-full overflow-hidden relative filter " +
            (isDarkMode ? "nav-dark" : "nav-light")
          }
        >
          <VideoBG />
          <PortfolioHeader />
          <Showcase projects={projects} isDarkMode={isDarkMode} />
          <AboutMe
            bio={metadata.bio}
            skills={metadata.skills}
            techStack={metadata.techStack}
            isDarkMode={isDarkMode}
            about={metadata.about}
          />
          <ContactMe
            isDarkMode={isDarkMode}
            email={metadata.email}
            social={metadata.social}
          />
        </main>
      )}
    </>
  );
};

export default PortfolioPage;

export async function getStaticProps() {
  let metadata = {};
  try {
    metadata = await getPortfolio();
    return {
      props: { metadata: JSON.stringify(metadata) },
      revalidate: 5,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { metadata: JSON.stringify({}) },
      revalidate: 5,
    };
  }
}

const projects = [
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    _id: 1,
    title: "Moovey",
    desc: `A movie reviewing website for cinema lovers`,
    thumbnail: `https://images.unsplash.com/photo-1649141925043-1ff2b23252f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    _id: 2,
    title: "Budgetly",
    desc: `Your personal budget tracker and investment calculator`,
    thumbnail: `https://images.unsplash.com/photo-1649141925175-bdf9aad2cec9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    _id: 3,
    title: "BlackFist",
    desc: `A dummy fitness studio website`,
    thumbnail: `https://images.unsplash.com/photo-1649035571176-3d2b126d401a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    _id: 4,
    title: "Sounak",
    desc: `Personal website and portfolio of Sounak Mukherjee AKA Kanuos`,
    thumbnail: `https://images.unsplash.com/photo-1649141410965-099af811a095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    _id: 5,
    title: "Pomodoro App",
    desc: `A lean, clean and efficient productivity app`,
    thumbnail: `https://images.unsplash.com/photo-1522399585117-5f8e8e0ab786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80`,
  },
];
