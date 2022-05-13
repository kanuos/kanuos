import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DetailHeader } from "../detail/Header";
import { PageLink } from "../portfolio/PageLink";

// dynamic imports
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
export const BlogDetailBody = ({ blog }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="overflow-hidden">
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
      <div className="w-full max-w-4xl mx-auto relative md:mt-20">
        <ul className="relative z-0 flex flex-col items-start w-full pb-10 md:grid md:grid-cols-4">
          {blog.page.map((step, i) => {
            const { key, value } = step;
            return (
              <li
                key={i}
                className={`w-full ${
                  ["heading", "image"].includes(key)
                    ? "md:col-start-1 md:col-end-2"
                    : ""
                }
              ${
                "heading" === key
                  ? `md:sticky md:top-1 ${isDarkMode ? "bg-dark" : "bg-light"}`
                  : ""
              }
                ${
                  ["markdown", "code"].includes(key)
                    ? "md:col-start-2 md:col-end-5"
                    : ""
                }`}
              >
                {key === "markdown" && (
                  <section className="section-wrapper">
                    <MarkdownStep text={value} />
                  </section>
                )}
                {key === "code" && (
                  <section className="section-wrapper whitespace-pre-line w-full overflow-x-scroll scrollbar-none">
                    <CodeStep
                      language={step.language}
                      code={step.code}
                      file={step.filename}
                    />
                  </section>
                )}
                {key === "heading" && (
                  <h2 className="heading--sub uppercase mb-6 max-w-4xl mx-auto px-8 pb-4">
                    {value}
                  </h2>
                )}
                {key === "image" && <ImageStep url={value} />}
              </li>
            );
          })}
        </ul>
        {/* </section> */}

        {/* conclusion */}
        <section className="section-wrapper pb-20 md:grid md:grid-cols-4">
          <h2 className="heading--sub uppercase mb-6 md:col-start-1 md:col-end-2 md:sticky md:top-0">
            {blog.outro?.heading}
          </h2>
          <div className="flex flex-col items-start gap-2 md:col-start-2 md:col-end-5">
            <p className="content--secondary">{blog.outro?.text}</p>
            {[...Object.values(blog?.repo), ...Object.values(blog?.demo)].every(
              (el) => Boolean(el.trim())
            ) && (
              <div className="flex flex-col items-start gap-y-4 pt-6 my-10">
                {Object.values(blog.repo).every((el) => Boolean(el.trim())) && (
                  <PageLink label={blog.repo.label} href={blog.repo.href} />
                )}
                {Object.values(blog.demo).every((el) => Boolean(el.trim())) && (
                  <PageLink label={blog.demo.label} href={blog.demo.href} />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
