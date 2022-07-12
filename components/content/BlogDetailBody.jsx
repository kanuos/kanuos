import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal
import { PUBLIC_URLS, titleCase } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";

// dynamic imports
const DetailHeader = dynamic(() =>
  import("../detail/Header").then((m) => m.DetailHeader)
);
const Conclusion = dynamic(() =>
  import("../detail/Conclusion").then((m) => m.Conclusion)
);
const CodeStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.CodeStep)
);
const ImageStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.ImageStep)
);
const MarkdownStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.MarkdownStep)
);

// React Component
export const BlogDetailBody = ({ blog = null }) => {
  const { isDarkMode } = useContext(ThemeContext);
  if (!blog) return <></>;

  return (
    <div className="overflow-hidden relative h-auto">
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

      {/* 
      <p className="content--secondary text-justify">
       */}
      <div
        className={`relative h-full w-full mt-10 py-16  ${
          isDarkMode ? "nav-dark" : "nav-light"
        }`}
      >
        {blog.page.map((step, i) => {
          const { key, value } = step;
          return (
            <section className="w-full max-w-4xl mx-auto" key={i}>
              {key === "markdown" && (
                <section className="px-8 content--secondary">
                  <MarkdownStep text={value} firstLetter={i === 0} />
                </section>
              )}
              {key === "code" && (
                <section className="whitespace-pre-line w-full overflow-x-scroll scrollbar-none px-8 content--secondary">
                  <CodeStep
                    language={value.language}
                    code={value.code}
                    file={value.filename}
                  />
                </section>
              )}
              {key === "heading" && (
                <div className="mt-10 mb-6 w-full px-8">
                  <h2 className="heading--main">{titleCase(value)}</h2>
                </div>
              )}
              {key === "image" && <ImageStep url={value} />}
            </section>
          );
        })}
        {/* </section> */}
      </div>
      {/* conclusion */}
      <Conclusion
        heading={blog.outro?.heading}
        text={blog.outro?.text}
        repo={blog.repo}
        demo={blog.demo}
      />
      <div className="mx-auto w-max">
        <PageLink label="Check out all blogs" href={PUBLIC_URLS.blogs.url} />
        <div className="mx-auto w-max relative after-line--center mt-4 pb-40"></div>
      </div>
    </div>
  );
};
