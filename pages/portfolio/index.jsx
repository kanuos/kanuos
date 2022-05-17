// Portfolio page
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

// import : internal
import { getPortfolio } from "../../database/user";

import { staticMetadata } from "../../utils/portfolio_static";
import PublicLayout from "../../components/Layouts/PublicLayout";
import { CTA } from "../../components/portfolio/CTA";
import { Showcase } from "../../components/portfolio/Showcase";
import { StyledHeader } from "../../components/portfolio/StyledHeader";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ContactMe } from "../../components/portfolio/ContactMe";
import { AboutMe } from "../../components/portfolio/AboutMe";
import { PORTFOLIO_LINKS } from "../../utils";

const PortfolioPage = ({ metadata }) => {
  metadata = JSON.parse(metadata);
  metadata = {
    ...staticMetadata,
    ...metadata,
    portfolio: [] ?? metadata.portfolio.filter((el) => el.isShowcased),
  };

  const { isDarkMode } = useContext(ThemeContext);

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
            <p className="content--main">{metadata.about}</p>
            <div className="mt-10">
              <CTA
                label="Hire me"
                href={PORTFOLIO_LINKS["contact me"].url}
                isDarkMode={isDarkMode}
              />
            </div>
          </>
        </StyledHeader>

        <Showcase works={projects} isDarkMode={isDarkMode} />
        <AboutMe isDarkMode={isDarkMode} />
        <ContactMe isDarkMode={isDarkMode} />
      </main>
    </PublicLayout>
  );
};

export default PortfolioPage;

export async function getStaticProps() {
  let metadata = {};
  console.log("portfolio motherload");
  try {
    metadata = await getPortfolio();
    return {
      props: { metadata: JSON.stringify(metadata) },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    return {
      props: { metadata: JSON.stringify({}) },
      revalidate: 1,
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
