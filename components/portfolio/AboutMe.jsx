import dynamic from "next/dynamic";
import { PORTFOLIO_LINKS } from "../../utils";
import { IoCloudDownloadOutline } from "react-icons/io5";
import Markdown from "react-markdown";

const CTA = dynamic(() => import("./CTA").then((m) => m.CTA));
const MarkdownStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.MarkdownStep)
);

export const AboutMe = ({ isDarkMode, skills = "", techStack = [] }) => {
  return (
    <section
      id={PORTFOLIO_LINKS["about me"].name}
      className={`min-h-screen mt-40 flex flex-col items-start justify-center w-full h-auto`}
    >
      <div className="px-8 w-full max-w-2xl mx-auto">
        <h2
          className={`heading__portfolio ${
            isDarkMode
              ? "heading__portfolio--dark-mode"
              : "heading__portfolio--light-mode"
          }`}
        >
          About Me
        </h2>
        <div className="mt-10">
          <MarkdownStep text={skills} />
        </div>
      </div>
      <article
        className={`px-8 flex flex-col mt-20 pb-40 lg:pb-0 lg:mb-40 gap-y-10 after-line--center lg:after:hidden w-full max-w-3xl mx-auto lg:max-w-6xl lg:flex-row lg:justify-center lg:items-stretch h-auto lg:gap-6 skill__card__container`}
      >
        {techStack.map(({ heading, text }, i) => (
          <section
            key={i}
            className={`p-6 z-10 w-5/6 lg:w-full group max-w-lg lg:hover:scale-105 transition-all will-change-transform skill__card ${
              i % 2
                ? "ml-auto lg:ml-0 lg:translate-y-6"
                : "mr-auto lg:mr-0 lg:-translate-y-6"
            } max-w-lg rounded-md drop-shadow-2xl ${
              isDarkMode ? "bg-dark__light text-light" : "bg-light text-dark"
            }`}
          >
            <strong
              className={`heading--sub capitalize font-bold break-words bg-gradient-to-r group-odd:from-primary group-even:from-secondary bg-clip-text lg:group-hover:text-transparent will-change-transform ${
                isDarkMode ? "to-light" : "to-dark"
              }`}
            >
              {heading}
            </strong>
            <div className="opacity-50 lg:group-hover:opacity-80 transition-all will-change-transform">
              <Markdown className="markdown-editor--small my-4">
                {text}
              </Markdown>
            </div>
          </section>
        ))}
      </article>
      <div className="w-max mx-auto pb-20">
        <CTA
          btnMode={true}
          isDarkMode={isDarkMode}
          label={
            <div className="inline-flex items-center justify-center gap-1">
              <IoCloudDownloadOutline className="group-hover:scale-110 group-hover:rotate-[360deg] transition-all" />
              My Resume
            </div>
          }
          cb={() => alert(new Date().toLocaleString())}
        />
      </div>
    </section>
  );
};
