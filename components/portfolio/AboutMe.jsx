import Markdown from "react-markdown";
import { PORTFOLIO_LINKS } from "../../utils";
import { CgDice1, CgDice2, CgDice3, CgDice4, CgFile } from "react-icons/cg";
import { CTA } from "./CTA";

export const AboutMe = ({ isDarkMode, skills = "", techStack = [] }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["about me"].name}
      className="min-h-screen pt-20 flex flex-col max-w-5xl mx-auto px-8 md:px-10 items-start justify-center w-full snap-start"
    >
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="heading--secondary mb-4 md:mb-8">
          What I bring to the table
        </h2>
        <Markdown className="markdown-editor max-w-3xl mb-10">
          {skills}
        </Markdown>
      </div>
      <ul
        className={`flex flex-col w-full mx-auto gap-y-16 pt-16 after-line--center ${
          techStack.length > 1 ? "pb-48" : "pb-24"
        }`}
      >
        {techStack.map(({ heading, text }, i) => (
          <li className="w-full" key={i}>
            <SkillGroup
              heading={heading}
              isDarkMode={isDarkMode}
              left={i % 2 ? false : true}
              text={text}
            >
              {i === 0 && <CgDice1 />}
              {i === 1 && <CgDice2 />}
              {i === 2 && <CgDice3 />}
              {i === 3 && <CgDice4 />}
            </SkillGroup>
          </li>
        ))}
      </ul>
      <div className="w-max mx-auto pb-20">
        <CTA
          btnMode={true}
          isDarkMode={isDarkMode}
          label={
            <div className="inline-flex items-center justify-center gap-1">
              <CgFile className="group-hover:scale-110 group-hover:rotate-[360deg] transition-all" />
              My Resume
            </div>
          }
          cb={() => alert(new Date().toLocaleString())}
        />
      </div>
    </div>
  );
};

const SkillGroup = ({ children, heading, text, isDarkMode, left }) => {
  return (
    <article
      className={`relative p-6 rounded-md drop-shadow-xl z-10 md:w-4/5 max-w-lg md:mt-10 nav-light ${
        left ? "mr-auto text-left" : "ml-auto text-right"
      }
      ${isDarkMode ? "light-shadow" : "dark-shadow"}
      `}
    >
      <div
        className={`absolute -top-4 p-3 bg-secondary text-light rounded-full text-lg drop-shadow-xl
         ${left ? "right-4" : "left-4"}`}
      >
        <div className="animate-spin">{children}</div>
      </div>
      <strong className="md:text-lg lg:text-xl font-semibold break-words">
        {heading}
      </strong>
      <Markdown className="markdown-editor my-4">{text}</Markdown>
    </article>
  );
};
