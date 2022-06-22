import React from "react";
import { StyledHeader } from "../portfolio/StyledHeader";
import { PageLink } from "../portfolio/PageLink";
import { Tag } from "../public/Tag";

export const DetailHeader = ({
  title,
  desc,
  date,
  category,
  isDarkMode,
  back,
  tags = [],
}) => {
  return (
    <StyledHeader styledText={category} isDarkMode={isDarkMode}>
      <div className="w-max max-w-xs">
        <PageLink label={back.text} href={back.url} />
      </div>
      <h1 className="heading--main leading-none capitalize">{title}</h1>
      <p className="content--main my-4">{desc}</p>
      <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
        <h2 className="heading--sub uppercase">Date</h2>
        <p className="content--main">
          <small>{new Date(date ?? "").toDateString()}</small>
        </p>
      </section>
      {tags.length > 0 && (
        <section className="w-full mx-auto flex flex-col items-start justify-start mt-6">
          <h2 className="heading--sub uppercase">Tag</h2>
          <ul className="flex flex-wrap items-center justify-start mt-4 gap-4 w-full text-xs content--main">
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
