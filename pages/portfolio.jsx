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
import ProjectDetailModal from "../components/portfolio/ProjectDetailModal";

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

  const { isDarkMode } = useContext(ThemeContext);
  const [showLoader, setShowLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const hideLoader = useCallback(() => setShowLoader(false), []);

  function expandProject(p) {
    setCurrentProject(() => p);
    setIsModalOpen(() => true);
  }

  useEffect(() => {
    if (!currentProject) return;
    console.log(currentProject.title);
  }, [currentProject]);

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
          <Showcase
            projects={projects}
            isDarkMode={isDarkMode}
            selectProject={expandProject}
          />
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
          {/* <AnimatePresence exitBeforeEnter={true}> */}
          <ProjectDetailModal
            key={currentProject?.title ?? ""}
            isDarkMode={isDarkMode}
            data={currentProject}
            show={isModalOpen}
            close={() => setIsModalOpen(false)}
          />
          {/* </AnimatePresence> */}
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
    uiux: [
      {
        heading: "react",
        text: "lorem ipsum dolor",
      },
      {
        heading: "tailwind css",
        text: "lorem ipsum dolor",
      },
      {
        heading: "context api",
        text: "lorem ipsum dolor",
      },
    ],
    dev: [
      {
        heading: "database",
        text: "lorem ipsum dolor",
      },
      {
        heading: "security",
        text: "lorem ipsum dolor",
      },
      {
        heading: "authentication",
        text: "lorem ipsum dolor",
      },
    ],
    screens: [
      {
        pic: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
    ],
    _id: 1,
    title: "Moovey",
    role: "Design. Development. Deployment",
    desc: `A movie reviewing website for cinema lovers`,
    project: {
      desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
      category: "Full Stack web app",
      demo: {},
      repo: {},
    },
    design: {
      typography: [
        {
          family: "Montserrat",
          desc: "lorem ipsum dolro from a Lorem Ipsum passage, and going through the cites of the word in classical literature",
        },
        {
          family: "Lato",
          desc: "lorem ipsum dolro",
        },
      ],
      colorPalette: [
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "123457",
          name: "rosey",
        },
        {
          hex: "faced0",
          name: "rosey",
        },
        {
          hex: "5deaf9",
          name: "rosey",
        },
      ],
      thumbnail: `https://images.unsplash.com/photo-1649141925043-1ff2b23252f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
    },
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    uiux: [
      {
        heading: "react",
        text: "lorem ipsum dolor",
      },
      {
        heading: "tailwind css",
        text: "lorem ipsum dolor",
      },
      {
        heading: "context api",
        text: "lorem ipsum dolor",
      },
    ],
    dev: [
      {
        heading: "database",
        text: "lorem ipsum dolor",
      },
      {
        heading: "security",
        text: "lorem ipsum dolor",
      },
      {
        heading: "authentication",
        text: "lorem ipsum dolor",
      },
    ],
    screens: [
      {
        pic: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
    ],
    _id: 2,
    title: "Budgetly",
    role: "Design. Development. Deployment",
    desc: `Your personal budget tracker and investment calculator`,
    project: {
      desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
      category: "Full Stack web app",
      demo: {},
      repo: {},
    },
    design: {
      typography: [
        {
          family: "Montserrat",
          desc: "lorem ipsum dolro from a Lorem Ipsum passage, and going through the cites of the word in classical literature",
        },
        {
          family: "Lato",
          desc: "lorem ipsum dolro",
        },
      ],
      colorPalette: [
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "123457",
          name: "rosey",
        },
        {
          hex: "963258",
          name: "rosey",
        },
        {
          hex: "258741",
          name: "rosey",
        },
      ],
      thumbnail: `https://images.unsplash.com/photo-1649141925175-bdf9aad2cec9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
    },
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    uiux: [
      {
        heading: "react",
        text: "lorem ipsum dolor",
      },
      {
        heading: "tailwind css",
        text: "lorem ipsum dolor",
      },
      {
        heading: "context api",
        text: "lorem ipsum dolor",
      },
    ],
    dev: [
      {
        heading: "database",
        text: "lorem ipsum dolor",
      },
      {
        heading: "security",
        text: "lorem ipsum dolor",
      },
      {
        heading: "authentication",
        text: "lorem ipsum dolor",
      },
    ],
    screens: [
      {
        pic: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
    ],
    _id: 3,
    title: "BlackFist",
    role: "Design. Development. Deployment",
    desc: `A dummy fitness studio website`,
    project: {
      desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
      category: "Full Stack web app",
      demo: {},
      repo: {},
    },
    design: {
      typography: [
        {
          family: "Montserrat",
          desc: "lorem ipsum dolro from a Lorem Ipsum passage, and going through the cites of the word in classical literature",
        },
        {
          family: "Lato",
          desc: "lorem ipsum dolro",
        },
      ],
      colorPalette: [
        {
          hex: "FF0066",
          name: "rosey",
        },
        {
          hex: "0B14D6",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "29660F",
          name: "rosey",
        },
      ],
      thumbnail: `https://images.unsplash.com/photo-1649035571176-3d2b126d401a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
    },
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    uiux: [
      {
        heading: "react",
        text: "lorem ipsum dolor",
      },
      {
        heading: "tailwind css",
        text: "lorem ipsum dolor",
      },
      {
        heading: "context api",
        text: "lorem ipsum dolor",
      },
    ],
    dev: [
      {
        heading: "database",
        text: "lorem ipsum dolor",
      },
      {
        heading: "security",
        text: "lorem ipsum dolor",
      },
      {
        heading: "authentication",
        text: "lorem ipsum dolor",
      },
    ],
    screens: [
      {
        pic: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
    ],
    _id: 4,
    title: "Sounak",
    role: "Design. Development. Deployment",
    desc: `Personal website and portfolio of Sounak Mukherjee AKA Kanuos`,
    project: {
      desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
      category: "Full Stack web app",
      demo: {},
      repo: {},
    },
    design: {
      typography: [
        {
          family: "Montserrat",
          desc: "lorem ipsum dolro from a Lorem Ipsum passage, and going through the cites of the word in classical literature",
        },
        {
          family: "Lato",
          desc: "lorem ipsum dolro",
        },
      ],
      colorPalette: [
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
      ],
      thumbnail: `https://images.unsplash.com/photo-1649141410965-099af811a095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
    },
  },
  {
    tags: ["react", "vue", "HTML", "CSS", "JavaScript", "Typescript"],
    uiux: [
      {
        heading: "react",
        text: "lorem ipsum dolor",
      },
      {
        heading: "tailwind css",
        text: "lorem ipsum dolor",
      },
      {
        heading: "context api",
        text: "lorem ipsum dolor",
      },
    ],
    dev: [
      {
        heading: "database",
        text: "lorem ipsum dolor",
      },
      {
        heading: "security",
        text: "lorem ipsum dolor",
      },
      {
        heading: "authentication",
        text: "lorem ipsum dolor",
      },
    ],
    screens: [
      {
        pic: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
      {
        pic: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
        subHeading: "lorem ipsum",
        desc: "lorem ipsum dolor sit amet",
      },
    ],
    _id: 5,
    title: "Pomodoro App",
    role: "Design. Development. Deployment",
    desc: `A lean, clean and efficient productivity app`,
    project: {
      desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
      category: "Full Stack web app",
      demo: {},
      repo: {},
    },
    design: {
      typography: [
        {
          family: "Montserrat",
          desc: "lorem ipsum dolro from a Lorem Ipsum passage, and going through the cites of the word in classical literature",
        },
        {
          family: "Lato",
          desc: "lorem ipsum dolro",
        },
      ],
      colorPalette: [
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
        {
          hex: "FF6600",
          name: "rosey",
        },
      ],
      thumbnail: `https://images.unsplash.com/photo-1522399585117-5f8e8e0ab786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80`,
    },
  },
];
