import React from "react";
import { PORTFOLIO_LINKS } from "../../utils";

export const AboutMe = ({ isDarkMode }) => {
  return (
    <div
      id={PORTFOLIO_LINKS["about me"].name}
      className="h-screen py-20 flex flex-col items-start justify-center w-full max-w-4xl mx-auto snap-start"
    >
      <div className="px-10">
        <h2 className="text-3xl md:text-5xl font-semibold max-w-xs md:max-w-xl">
          What I&apos;ll bring to the table
        </h2>
        <p className="w-full max-w-lg text-xs font-semibold mt-6 mb-10">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
      </div>
      <ul className="flex flex-col w-full max-w-xl lg:ml-10">
        <li className="pl-14 pr-10 py-4 border-t border-opacity-10 border-secondary last-of-type:border-b lg:border-none">
          <strong className="font-semibold text-xs capitalize">
            UI&ndash;UX
          </strong>
          <p className="text-sm leading-3 mt-4 opacity-60 font-semibold">
            <small>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus accusantium repudiandae labore eum natus ea in laborum
              temporibus! Obcaecati vitae culpa saepe velit voluptatibus
              repellat placeat eius voluptas quasi eaque.
            </small>
          </p>
        </li>
        <li className="pl-14 pr-10 py-4 border-t border-opacity-10 border-secondary last-of-type:border-b lg:border-none">
          <strong className="font-semibold text-xs capitalize">
            Backend development
          </strong>
          <p className="text-sm leading-3 mt-4 opacity-60 font-semibold">
            <small>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus accusantium repudiandae labore eum natus ea in laborum
              temporibus! Obcaecati vitae culpa saepe velit voluptatibus
              repellat placeat eius voluptas quasi eaque.
            </small>
          </p>
        </li>
      </ul>
    </div>
  );
};
