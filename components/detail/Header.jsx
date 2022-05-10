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
    <>
      <StyledHeader styledText={category} isDarkMode={isDarkMode}>
        <PageLink label={back.text} href={back.url} />
        <h1 className="heading--main leading-none">{title}</h1>
        <p className="content--main ">{desc}</p>
        <section className="w-full mx-auto flex flex-col items-start justify-start my-6">
          <h2 className="heading--sub">Date</h2>
          <p className="content--main">{new Date(date ?? "").toDateString()}</p>
        </section>
      </StyledHeader>
      {tags.length > 0 && (
        <section className="section-wrapper max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold md:text-base">
            Tag{tags.length === 1 ? "" : "s"}
          </h2>
          <ul className="flex flex-wrap items-center my-4 justify-start gap-4 gap-y-3 max-w-3xl mr-auto w-full text-sm">
            {tags?.map((t, i) => (
              <li key={i}>
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
