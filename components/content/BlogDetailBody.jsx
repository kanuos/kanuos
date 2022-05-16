import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DetailHeader } from "../detail/Header";
import { Conclusion } from "../detail/Conclusion";

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
    <div className="overflow-hidden relative">
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
        <ul className="relative z-0 flex flex-col items-start w-full pb-10 md:grid md:grid-cols-4 gap-6">
          {blog.page.map((step, i) => {
            const { key, value } = step;
            return (
              <li
                key={i}
                className={`w-full 
                ${
                  ["heading", "image"].includes(key)
                    ? "md:col-start-1 md:col-end-2"
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
                      language={value.language}
                      code={value.code}
                      file={value.filename}
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
        <Conclusion
          heading={blog.outro?.heading}
          text={blog.outro?.text}
          repo={blog.repo}
          demo={blog.demo}
        />
      </div>
    </div>
  );
};
