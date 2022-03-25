// Portfolio page
import { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from 'framer-motion'

// import : internal
import { HeadComponent } from "../components/Head";
import { PortfolioHeader } from "../components/portfolio/PortfolioHeader";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { Showcase } from "../components/portfolio/Showcase";
import { Skills } from "../components/portfolio/Skills";
import { ThemeContext } from "../contexts/ThemeContext";
import { getPortfolio } from "../database/user"
import { VideoBG } from"../components/public/VideoBG";


import { staticMetadata } from "../utils/portfolio_static";
import { JoinLine } from "../components/public/DescHeader";
import { PortfolioLink } from "../components/portfolio/PortfolioLink";
import { PUBLIC_URLS } from "../utils";




const NavBar = dynamic(() => import("../components/public/Nav").then(m => m.NavBar));
const ThemeToggler = dynamic(() => import("../components/public/ThemeToggler").then(m => m.ThemeToggler));
const PortfolioProjectDetail = dynamic(() => import("../components/portfolio/PortfolioProjectDetail"))
const ContactMe = dynamic(() => import("../components/portfolio/ContactMe"));



const PortfolioPage = ({metadata}) => {
  metadata = { ...staticMetadata, ...JSON.parse(metadata)};
  const { isDarkMode } = useContext(ThemeContext);
  const [expandProject, setExpandProject] = useState(false);
  const [current, setCurrent] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  

  useEffect(() => {
    if (expandProject) {
      const selectedProject = metadata.portfolio.findIndex(el => el._id === expandProject);

      if (selectedProject >= 0) {
        setCurrent(metadata.portfolio[selectedProject]);
        setPrev(metadata.portfolio[selectedProject - 1]);
        setNext(metadata.portfolio[selectedProject + 1]);
        return
      }
    }
    setCurrent(null);
    setPrev(null);
    setNext(null)
  }, [expandProject, metadata.portfolio])


  if (!metadata?.portfolio || metadata.portfolio.length === 0) {
    return (
    <>
    <HeadComponent title="Sounak Mukherjee | Portfolio" />
    <NavBar type="portfolio" />
    <ThemeToggler />
    <main
      className={
        "h-screen scrollbar-none w-full overflow-hidden relative grid place-items-center filter bg-opacity-70 " +
        (isDarkMode ? "nav-dark" : "nav-light")
      }
    >
      <VideoBG />
      <div className="flex flex-col items-center justify-center gap-4">
        <small className="font-semibold uppercase text-xs"> portfolio </small>
        <div className="animate-bounce">
          <JoinLine />
        </div>
        <h1 className="text-7xl w-min text-center capitalize font-thin mb-10">
          coming soon!
        </h1>
        <PortfolioLink label='go to home' href={PUBLIC_URLS.home.url} shadow={false}/>
      </div>
    </main>
    </>
    )}

  return (
    <>
      <HeadComponent title="Sounak Mukherjee | Portfolio" content="Check out my full stack web developer portfolio website" />
      <NavBar type="portfolio" />
      <ThemeToggler />
      <main
        className={
          "min-h-screen scrollbar-none w-full overflow-hidden relative filter bg-opacity-70 " +
          (isDarkMode ? "nav-dark" : "nav-light")
        }
      >
        <VideoBG />
        <div className="w-full scrollbar-none">
          <PortfolioHeader miniBio={metadata.miniBio} name={metadata.name} />
          <section className="flex py-20 gap-20 min-h-screen w-full max-w-5xl mx-auto flex-col justify-center items-center lg:items-start lg:justify-start">
            <section className="w-full max-w-5xl mx-auto px-16">
              <SectionHeader
                heading="About me"
                cls="lg:items-end lg:text-right"
                content={
                  <div className="flex flex-col md:gap-y-6">
                    <p className="grow whitespace-pre-line text-sm max-w-3xl">
                      {metadata.bio}
                    </p>
                    <br />
                    <p className="grow whitespace-pre-line text-sm max-w-3xl">
                      {metadata.skills}
                    </p>
                    <motion.div initial={{ opacity: 0, scale : 0}} whileInView={{ opacity: 1, scale :1}} className="my-6 capitalize text-xs rounded w-max flex items-center justify-center relative overflow-hidden cursor-pointer lg:ml-auto">
                        <a className={"py-1.5 px-6 block z-10 peer font-semibold transition-all hover:shadow-xl border-2 relative bg-transparent " + (isDarkMode ? "border-light hover:text-dark text-light font-semibold" : "hover:text-light border-dark")}>
                            my resume
                        </a>
                        <span className={"py-1.5 px-6 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300 " + (isDarkMode ? "bg-light border-light" : "bg-dark border-dark")}></span>
                    </motion.div>
                  </div>
                  
                }
              />
            </section>

            <Skills isDarkMode={isDarkMode} techStack={metadata.techStack} />
          </section>
          <Showcase 
            portfolio={metadata.portfolio} 
            selectProject={({_id}) => setExpandProject(_id)} />

          <ContactMe isDarkMode={isDarkMode} />
        </div>
      </main>
      <AnimatePresence>
        {current && <PortfolioProjectDetail 
          key={JSON.stringify(current)}
          isOpen={Boolean(current)}
          close={() => setExpandProject(null)}
          prev={prev}
          next={next}
          selectProject={({_id}) => setExpandProject(_id)}
          project={current} 
          isDarkMode={isDarkMode} />}
      </AnimatePresence>
    </>
  );
};

export default PortfolioPage;


export async function getStaticProps() {
  let metadata = {};
  try {
    metadata = await getPortfolio();
    return {
      props : {metadata : JSON.stringify(metadata)},
      revalidate : 5
    }
  } 
  catch (error) {
    console.log(error);
    return {
      props : {metadata : JSON.stringify({})},
      revalidate : 5
    }  
  }
}