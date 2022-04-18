import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal
import { DescHeader } from "../public/DescHeader";
import { PUBLIC_URLS } from "../../utils";
import { Step } from "../public/PageStepComponent";

import { ThemeContext } from "../../contexts/ThemeContext";

const ContactModal = dynamic(() => import("../public/ContactModal"));
const JoinLine = dynamic(() =>
  import("../public/DescHeader").then((m) => m.JoinLine)
);
const AnchorStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.AnchorStep)
);

export const BlogDetailBody = ({ blog, adminMode = false }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <main
      className={
        "h-auto w-full min-h-screen relative select-text pb-20 " +
        (isDarkMode ? "main-dark" : "main-light") +
        (adminMode ? "" : " px-12 md:px-16")
      }
    >
      <div className="relative h-full w-full max-w-3xl mx-auto">
        <DescHeader
          adminMode={adminMode}
          name={blog.title}
          date={blog.date}
          tags={blog.tags}
          back={PUBLIC_URLS.blogs.url}
          descType={PUBLIC_URLS.blogs.name}
        />

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start gap-y-2">
          <p className="leading-relaxed text-sm first-letter:text-6xl first-letter:float-left first-letter:font-semibold first-letter:mr-2 first-letter:-mt-6 first-letter: first-letter:uppercase float-left">
            {blog.desc}
          </p>
        </section>

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start mt-10">
          <ul className="flex flex-col items-start w-full">
            {blog.page?.map((segment, i) => (
              <li
                key={i}
                className="flex items-center justify-start gap-x-1 my-6 w-full z-10"
              >
                <section className="text-sm  w-full rounded relative">
                  <h2 className="text-2xl capitalize  font-semibold">
                    {segment?.heading}
                  </h2>
                  <div className="ml-2">
                    <JoinLine />
                  </div>
                  <div className="flex items-stretch flex-col gap-y-2">
                    {segment.steps?.map((s, k) => (
                      <Step step={s} key={k} />
                    ))}
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full my-10 mx-auto flex flex-col items-start justify-start">
          <h2 className="text-2xl capitalize  font-semibold">
            {blog?.outro?.heading}
          </h2>
          <div className="ml-1">
            <JoinLine />
          </div>
          <section className="text-sm  w-full break-words">
            <p className="leading-relaxed text-sm">{blog.outro?.text}</p>
            <ul className="flex flex-col gap-y-4 my-4">
              {blog.repo && Object.values(blog.repo).every(Boolean) && (
                <li>
                  <AnchorStep
                    href={blog.repo.href}
                    label={blog.repo.label}
                    icon="git"
                  />
                </li>
              )}
              {blog.demo && Object.values(blog.demo).every(Boolean) && (
                <li>
                  <AnchorStep href={blog.demo.href} label={blog.demo.label} />
                </li>
              )}
            </ul>
            <p className="leading-relaxed text-sm">
              If you have any queries about this blog, please send me a message
              stating your query. Don&apos;t forget to mention the blog title in
              your message. I will get back to you ASAP
            </p>

            <ContactModal isDarkMode={isDarkMode} />
          </section>
        </section>
      </div>
    </main>
  );
};
