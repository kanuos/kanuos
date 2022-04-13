import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import Accordion from "./Accordion";
import PortfolioProjectDetailSubSection from "./PortfolioProjectDetailSubSection";
import { JoinLine } from "../public/DescHeader";

const variants = {
  modal: {
    hide: {
      scale: 0,
      rotate: 90,
      opacity: 0,
      y: "100vh",
      borderTopRightRadius: "50px",
      borderTopRightRadius: "50px",
      transition: {
        when: "beforeChildren",
        type: "tween",
        staggerChildren: 0.25,
      },
    },
    show: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      y: "0vh",
      borderTopRightRadius: "0px",
      borderTopRightRadius: "0px",
      transition: {
        type: "tween",
      },
    },
  },
  btn: {
    hide: {
      opacity: 0,
      rotate: 90,
      transition: {
        type: "spring",
      },
    },
    show: {
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
      },
    },
  },
};

const ProjectDetailModal = ({ close, show, data, isDarkMode }) => {
  if (!data || !show) return <></>;
  const {
    title,
    uiux,
    dev,
    project,
    screens,
    design: { thumbnail, colorPalette, typography },
    tags,
    desc,
  } = data;
  return (
    <motion.article
      exit="hide"
      animate={show ? "show" : "hide"}
      variants={variants.modal}
      className={
        "h-screen overflow-hidden w-screen fixed top-0 left-0 z-50 shadow-2xl " +
        (isDarkMode ? "main-dark" : "main-light")
      }
    >
      <motion.button
        variants={variants.btn}
        className="fixed top-2 right-2 z-10"
        onClick={close}
      >
        <motion.div className="z-40 flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group rounded-full h-10 w-10 hover:rounded-full">
          <motion.span
            animate={
              show
                ? {
                    rotate: 45,
                    y: 3,
                    transition: { type: "spring", stiffness: 400 },
                  }
                : {
                    rotate: 0,
                    y: 0,
                    transition: { type: "spring", stiffness: 400 },
                  }
            }
            className={`w-6 rounded h-[2px] transition-opacity bg-current opacity-50 group-hover:opacity-100`}
          ></motion.span>
          <motion.span
            animate={
              show
                ? {
                    rotate: -45,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 },
                  }
                : {
                    rotate: 0,
                    y: 0,
                    transition: { type: "spring", stiffness: 400 },
                  }
            }
            className={`w-6 rounded h-[2px] transition-opacity bg-current opacity-50 group-hover:opacity-100`}
          ></motion.span>
        </motion.div>
      </motion.button>
      <div className="h-screen overflow-y-auto scrollbar-none block w-full">
        <section className="min-h-screen h-auto w-full block">
          <header className="min-h-screen h-full flex items-center justify-center w-full max-w-4xl mx-auto">
            <section className="flex flex-col items-start w-full gap-2 -mt-20">
              <SectionHeader
                heading={title}
                paddingBottom={false}
                shadow={title}
                content={desc}
              />
              <figure className="relative h-[40vh] sm:h-[25vh] w-full m-4 max-w-lg ml-auto my-10 shadow-2xl filter drop-shadow-2xl">
                <Image
                  loader={({ src, width }) => `${src}?q=${width}`}
                  src={thumbnail}
                  alt={title}
                  layout="fill"
                  className="h-full w-full object-cover"
                />
              </figure>
              <p className="text-xs w-full max-w-lg px-10">{project.desc}</p>
              <div className="flex flex-col items-start gap-2 mt-10 p-10">
                <p className="text-sm uppercase">
                  <small>tags</small>
                </p>
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-start">
                  {tags.map((tag, i) => (
                    <li
                      key={i}
                      className="text-xs uppercase text-primary font-semibold"
                    >
                      <small>{tag}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </header>

          <div className="h-auto w-full overflow-hidden max-w-4xl mx-auto">
            <Accordion heading="DESIGN" isDarkMode={isDarkMode}>
              <div className="p-10 flex flex-col gap-y-20 md:max-w-lg w-11/12">
                <section className="w-full flex flex-col">
                  <p className="flex flex-col items-start text-xs uppercase mb-4">
                    <small className="text-secondary font-semibold">
                      design
                    </small>
                    <span className="text-lg font-semibold -mt-1">
                      typography
                    </span>
                  </p>
                  {typography.map((font, i) => (
                    <div key={i} className="block m-6">
                      <strong className="text-sm opacity-75 font-semibold">
                        {font.family}
                      </strong>
                      <p className="text-xs opacity-50">{font.desc}</p>
                    </div>
                  ))}
                </section>

                <section className="w-full flex flex-col items-start">
                  <p className="flex flex-col items-start text-xs uppercase mb-4">
                    <small className="text-secondary font-semibold">
                      design
                    </small>
                    <span className="text-lg font-semibold -mt-1">
                      color palette
                    </span>
                  </p>
                  <div className="flex flex-wrap m-6 items-center justify gap-6 w-full">
                    {colorPalette.map((color, i) => (
                      <div
                        key={i}
                        className="flex flex-col group items-center justify-center"
                      >
                        <span
                          style={{ backgroundColor: `#${color.hex}` }}
                          className="w-16 h-16 group-hover:rotate-6 group-hover:scale-105 transition-all rounded-md filter my-2 drop-shadow-2xl shadow-lg"
                        ></span>
                        <span className="text-xs uppercase opacity-50 group-hover:opacity-100 transition-all">
                          #{color.hex}
                        </span>
                        <p className="text-xs uppercase opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-100 origin-center font-semibold text-primary">
                          <small>{color.name}</small>
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </Accordion>
          </div>

          <div className="h-auto w-full overflow-hidden max-w-4xl mx-auto">
            <Accordion heading="UI-UX" isDarkMode={isDarkMode}>
              <PortfolioProjectDetailSubSection category="ui-ux" array={uiux} />
            </Accordion>
          </div>

          <div className="h-auto w-full overflow-hidden max-w-4xl mx-auto">
            <Accordion heading="DEV" isDarkMode={isDarkMode}>
              <PortfolioProjectDetailSubSection category="dev" array={dev} />
            </Accordion>
          </div>

          <div className="h-auto w-full overflow-hidden max-w-4xl mx-auto">
            <Accordion heading="SHOTS" isDarkMode={isDarkMode}>
              <section className="grid gap-20 my-10 p-10 place-items-center">
                {screens.map((screen, i) => (
                  <div
                    key={i}
                    className="flex flex-col-reverse items-center justify-center gap-10 md:even:flex-row md:odd:flex-row-reverse md:even:ml-auto md:odd:mr-auto mx-auto md:items-start"
                  >
                    <div className="flex flex-col items-start gap-y-2 w-3/4 md:w-full max-w-xs">
                      <strong className="text-xs font-semibold uppercase">
                        {screen.subHeading}
                      </strong>
                      <JoinLine />
                      <p className="text-xs opacity-75">
                        {screen.desc} Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Aliquam expedita fugit molestiae illum
                        iure sit!
                      </p>
                    </div>
                    <figure className="filter drop-shadow-lg my-4 shadow-lg h-[60vh] w-[60vw] max-w-[20rem] min-h-[30rem] max-h-[40rem] overflow-scroll rounded-2xl shrink-0 grow-0 relative">
                      <Image
                        loader={({ src, width }) => `${src}?w=${width}&q=100`}
                        src={screen.pic}
                        alt={screen.subHeading}
                        layout="fill"
                        className="h-full block w-full object-cover"
                      />
                    </figure>
                  </div>
                ))}
              </section>
            </Accordion>
          </div>

          <div className="h-auto w-full overflow-hidden max-w-4xl mx-auto">
            <section className="flex flex-col items-start p-10 gap-y-10">
              <p className="flex flex-col items-start text-xs uppercase mb-4">
                <small className="text-secondary font-semibold">My role</small>
                <span className="text-lg font-semibold -mt-1">
                  design. development. deployment
                </span>
              </p>
              <p className="flex flex-col items-start text-xs uppercase mb-4">
                <small className="text-secondary font-semibold">
                  code repository
                </small>
                <span className="text-lg font-semibold -mt-1">github</span>
              </p>
              <p className="flex flex-col items-start text-xs uppercase mb-4">
                <small className="text-secondary font-semibold">
                  live demo
                </small>
                <span className="text-lg font-semibold -mt-1">heroku</span>
              </p>
            </section>
          </div>
        </section>
      </div>
    </motion.article>
  );
};

export default ProjectDetailModal;
