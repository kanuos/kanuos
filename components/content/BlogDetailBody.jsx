import { useContext } from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

// import : internal
import { StyledHeader } from "../portfolio/StyledHeader";
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";

const Tag = dynamic(() => import("../public/Tag").then((m) => m.Tag));
const PageSegment = dynamic(() =>
  import("../public/PageComponents").then((m) => m.PageSegment)
);

export const BlogDetailBody = ({ blog }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="-mt-4">
        <StyledHeader styledText={blog.category} isDarkMode={isDarkMode}>
          <PageLink label={"Back to blogs"} href={PUBLIC_URLS.blogs.url} />
          <h1 className="text-4xl md:text-6xl font-black my-6 w-full max-w-xl">
            {blog.title}
          </h1>
          <p
            className={
              "w-3/4 max-w-lg " + (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            {blog.desc}
          </p>
          <section className="w-full mx-auto flex flex-col items-start justify-start my-6">
            <h2 className="text-sm font-semibold">Published On</h2>
            <p
              className={
                "my-2 max-w-3xl mr-auto w-full text-sm " +
                (isDarkMode ? "opacity-80" : "opacity-100")
              }
            >
              {new Date(blog.date ?? "").toDateString()}
            </p>
          </section>
        </StyledHeader>
      </div>

      <div className="relative h-full w-full max-w-4xl mx-auto -mt-10">
        <section className="w-full mx-auto flex flex-col items-start justify-start my-10 px-10">
          <h2 className="text-sm font-semibold">Tags</h2>
          <ul className="flex flex-wrap items-center my-4 justify-start gap-4 gap-y-3 max-w-3xl mr-auto w-full ">
            {blog.tags?.map((t, i) => (
              <li key={i}>
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="w-full flex flex-col items-start justify-start py-10 relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 -z-10 pointer-events-none"></div>
        <ul className="relative z-0 flex flex-col items-start w-full max-w-4xl px-10 mx-auto my-10 gap-y-4 after:h-full">
          {blog.page.map(({ key, value }, i) => (
            <li
              key={i}
              className="flex items-center justify-start w-full relative z-10"
            >
              {key === "markdown" && (
                <div
                  className={
                    "flex flex-col items-start list-outside list-[square] justify-start gap-y-3 max-w-4xl markdown-editor w-full break-normal mb-10 " +
                    (isDarkMode ? "opacity-80" : "opacity-100")
                  }
                >
                  <Markdown>{value}</Markdown>
                </div>
              )}
              {key === "heading" && (
                <h2 className="text-2xl md:text-4xl font-semibold max-w-xl mt-6">
                  <span className="capitalize">{value}</span>
                </h2>
              )}
            </li>
          ))}
        </ul>
        <section className="relative z-0 w-full max-w-4xl mx-auto flex flex-col items-start justify-start px-10">
          <h2 className="text-2xl md:text-4xl font-semibold max-w-xl mb-6">
            <span className="capitalize">{blog?.outro?.heading}</span>
          </h2>
          <p
            className={
              "leading-relaxed " + (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            {blog.outro?.text}
          </p>
        </section>
      </section>

      <section className="w-full mx-auto max-w-4xl flex flex-col items-start justify-start my-10 px-10 pb-20">
        <h2 className="text-sm font-semibold">Resources</h2>
        <p
          className={
            "my-2 max-w-3xl mr-auto w-full text-sm capitalize " +
            (isDarkMode ? "opacity-80" : "opacity-100")
          }
        >
          REPO + DEMO
          {/* TODO: complete repo demo */}
        </p>
      </section>
    </>
  );
};
