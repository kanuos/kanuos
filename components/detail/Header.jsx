import React from "react";
import { StyledHeader } from "../portfolio/StyledHeader";
import { PageLink } from "../portfolio/PageLink";
import { Tag } from "../public/Tag";
import {
  BsThermometerLow,
  BsThermometerHalf,
  BsThermometerHigh,
  BsTag,
  BsCalendar4Week,
} from "react-icons/bs";

export const DetailHeader = ({
  title,
  desc,
  date,
  category,
  isDarkMode,
  back,
  tags = [],
  difficulty = "",
}) => {
  const DIFFICULTIES = {
    beginner: "beginner",
    intermediate: "intermediate",
    advanced: "advanced",
  };

  return (
    <StyledHeader styledText={category} isDarkMode={isDarkMode}>
      <div className="w-max max-w-xs">
        <PageLink label={back.text} href={back.url} />
      </div>
      <h1 className="heading--primary leading-none capitalize">{title}</h1>
      <p className="content--main mt-2">{desc}</p>
      <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
        <div className="flex items-center justify-start gap-1">
          <BsCalendar4Week className=" text-xs" />
          <h2 className="heading--sub uppercase">
            <small>Date</small>
          </h2>
        </div>
        <p className="pl-4 content--main">
          {new Date(date ?? "").toDateString()}
        </p>
      </section>
      {tags.length > 0 && (
        <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
          <div className="flex items-center justify-start gap-1">
            <BsTag className=" text-xs" />
            <h2 className="heading--sub uppercase">
              <small>Tag(s)</small>
            </h2>
          </div>
          <ul className="pl-4 flex flex-wrap items-center justify-start mt-4 gap-4 w-full content--main">
            {tags?.map((t, i) => (
              <li key={i} className="w-max">
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {Boolean(difficulty) && (
        <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
          <div className="flex items-center justify-start gap-1">
            {difficulty === DIFFICULTIES.beginner && (
              <BsThermometerLow className="text-xs" />
            )}
            {difficulty === DIFFICULTIES.intermediate && (
              <BsThermometerHalf className="text-xs" />
            )}
            {difficulty === DIFFICULTIES.advanced && (
              <BsThermometerHigh className="text-xs" />
            )}
            <h2 className="heading--sub uppercase">
              <small>Difficulty Level</small>
            </h2>
          </div>
          <p className="pl-4 content--main capitalize">{difficulty}</p>
        </section>
      )}
    </StyledHeader>
  );
};
