import { useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DetailHeader } from "../detail/Header";
import { PageLink } from "../portfolio/PageLink";

const PageSegment = dynamic(() =>
  import("../public/PageComponents").then((m) => m.PageSegment)
);

export const BlogDetailBody = ({ blog }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <DetailHeader
        category={blog.category}
        isDarkMode={isDarkMode}
        back={{
          url: PUBLIC_URLS.blogs.url,
          text: "Back to blogs",
        }}
        title={blog.title}
        desc={blog.desc}
        date={blog.date}
        tags={blog.tags}
      />

      {/* <section className="w-full flex flex-col items-start justify-start pb-10 relative "> */}
      <ul className="relative z-0 flex flex-col items-start w-full pb-10">
        {blog.page.map(({ key, value }, i) => (
          <li key={i} className="w-full">
            {key === "markdown" && (
              <section className="section-wrapper">
                <div className="markdown-editor-wrapper">
                  <Markdown>{value}</Markdown>
                </div>
              </section>
            )}
            {key === "heading" && (
              <h2 className="heading--secondary max-w-4xl mx-auto px-8 pb-4">
                {value}
              </h2>
            )}
            {key === "image" && (
              <figure className="h-[60vh] w-screen block relative my-8">
                <Image
                  src={value}
                  alt=""
                  layout="fill"
                  className="h-full w-full object-cover block"
                  loader={({ src, width }) => `${src}?w=${width}&q=100`}
                />
              </figure>
            )}
          </li>
        ))}
      </ul>
      {/* </section> */}

      {/* conclusion */}
      <section className="section-wrapper pb-20">
        <h2 className="heading--secondary mb-6 capitalize">
          {blog.outro?.heading}
        </h2>
        <p className="content--secondary">{blog.outro?.text}</p>
        <div className="flex flex-col items-start gap-y-4 pt-6 my-10">
          <PageLink label="Source code" href="" />
          <PageLink label="Live demo" href="" />
        </div>
      </section>
    </div>
  );
};
