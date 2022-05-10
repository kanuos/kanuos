import React from "react";
import { PORTFOLIO_LINKS } from "../../utils";
import { CgDice1, CgDice2, CgDice3, CgFile } from "react-icons/cg";
import { CTA } from "./CTA";

export const AboutMe = ({ isDarkMode }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["about me"].name}
      className="min-h-screen pt-20 px-10 flex flex-col items-start justify-center w-full snap-start"
    >
      <div className="w-full max-w-4xl mx-auto md:max-w-xl">
        <h2 className="heading--secondary mb-4 md:mb-8">
          What I bring to the table
        </h2>
        <p className="content--secondary max-w-xl mb-10">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using making it look like readable English.
        </p>
      </div>
      <ul className="flex flex-col w-full max-w-xl mx-auto gap-y-16 pt-6 pb-48 after-line--center">
        <SkillGroup
          heading="UI-UX and designing"
          isDarkMode={isDarkMode}
          left={true}
          text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            accusantium repudiandae labore eum natus ea in laborum temporibus!
            Obcaecati vitae culpa saepe velit voluptatibus repellat placeat eius
            voluptas quasi eaque."
        >
          <CgDice1 />
        </SkillGroup>
        <SkillGroup
          left={false}
          heading="Programming and logic"
          isDarkMode={isDarkMode}
          text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            accusantium repudiandae labore eum natus ea in laborum temporibus!
            Obcaecati vitae culpa saepe velit voluptatibus repellat placeat eius
            voluptas quasi eaque."
        >
          <CgDice2 />
        </SkillGroup>
        <SkillGroup
          left={true}
          heading="Tools and utilities"
          isDarkMode={isDarkMode}
          text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
            accusantium repudiandae labore eum natus ea in laborum temporibus!
            Obcaecati vitae culpa saepe velit voluptatibus repellat placeat eius
            voluptas quasi eaque."
        >
          <CgDice3 />
        </SkillGroup>
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
    <li
      className={`relative p-4 rounded-md drop-shadow-xl z-10 w-4/5 max-w-lg md:mt-10 nav-light ${
        left ? "mr-auto text-left" : "ml-auto text-right"
      }
      ${isDarkMode ? "light-shadow" : "dark-shadow"}
      `}
    >
      <div
        className={`absolute -top-4 p-3 bg-secondary text-light rounded-full text-lg drop-shadow-xl ${
          left ? "right-4" : "left-4"
        }`}
      >
        <div className="animate-spin">{children}</div>
      </div>
      <strong className="heading--sub">{heading}</strong>
      <p className="content--sub my-4 ">{text}</p>
    </li>
  );
};
