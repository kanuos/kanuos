import React from "react";
import { StyledHeader } from "../portfolio/StyledHeader";
import { PageLink } from "../portfolio/PageLink";
import { Tag } from "../public/Tag";
import { BsPuzzle, BsTags, BsCalendar4Week } from "react-icons/bs";

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
  return (
    <StyledHeader styledText={category} isDarkMode={isDarkMode}>
      <div className="w-max max-w-xs">
        <PageLink label={back.text} href={back.url} />
      </div>
      <h1 className="heading--primary leading-none capitalize">{title}</h1>
      <p className="content--main mt-2">{desc}</p>
      <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
        <div className="flex items-center justify-start gap-2">
          <BsCalendar4Week className=" text-xs" />
          <h2 className="heading--sub uppercase">
            <small>Date</small>
          </h2>
        </div>
        <p className="pl-5 content--main">
          <small>{new Date(date ?? "").toDateString()}</small>
        </p>
      </section>
      {Boolean(difficulty) && (
        <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
          <div className="flex items-center justify-start gap-1.5">
            <BsPuzzle className="text-sm" />
            <h2 className="heading--sub uppercase">
              <small>Difficulty Level</small>
            </h2>
          </div>
          <p className="pl-5 content--main capitalize">
            <small>{difficulty}</small>
          </p>
        </section>
      )}
      {tags.length > 0 && (
        <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
          <div className="flex items-center justify-start gap-1.5">
            <BsTags className=" text-sm" />
            <h2 className="heading--sub uppercase">
              <small>Tag(s)</small>
            </h2>
          </div>
          <ul className="pl-5 flex flex-wrap items-center justify-start mt-2 gap-4 w-full content--main">
            {tags?.map((t, i) => (
              <li key={i} className="w-max">
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </StyledHeader>
  );
};
