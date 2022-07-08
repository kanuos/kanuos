import Markdown from "react-markdown";
import { PORTFOLIO_LINKS } from "../../utils";
import { CgDice1, CgDice2, CgDice3, CgDice4, CgFile } from "react-icons/cg";
import { CTA } from "./CTA";
import GridContent from "../detail/GridContent";

export const AboutMe = ({ isDarkMode, skills = "", techStack = [] }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["about me"].name}
      className="min-h-screen pt-20 flex flex-col max-w-5xl mx-auto items-start justify-center w-full snap-start p-1"
    >
      <GridContent text={skills} heading="what i bring to the table" />
      <ul
        className={`flex flex-col w-full mx-auto gap-y-16 pt-16 after-line--center ${
          techStack.length > 1 ? "pb-48" : "pb-24"
        }`}
      >
        {techStack.map(({ heading, text }, i) => (
          <li className="w-11/12 mx-auto" key={i}>
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
      <strong className="heading--secondary font-bold break-words">
        {heading}
      </strong>
      <Markdown className="markdown-editor my-4">{text}</Markdown>
    </article>
  );
};
