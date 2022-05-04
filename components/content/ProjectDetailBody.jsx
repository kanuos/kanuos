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

export const ProjectDetailBody = ({ project }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="-mt-4">
        <StyledHeader styledText={project.category} isDarkMode={isDarkMode}>
          <PageLink
            label={"Back to Projects"}
            href={PUBLIC_URLS.projects.url}
          />
          <h1 className="text-4xl md:text-6xl font-black my-6 w-full max-w-xl">
            {project.title}
          </h1>
          <p
            className={
              "w-3/4 max-w-lg " + (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            {project.desc}
          </p>
          <section className="w-full mx-auto flex flex-col items-start justify-start my-6">
            <h2 className="text-sm font-semibold">Published On</h2>
            <p
              className={
                "my-2 max-w-3xl mr-auto w-full text-sm " +
                (isDarkMode ? "opacity-80" : "opacity-100")
              }
            >
              {new Date(project.date ?? "").toDateString()}
            </p>
          </section>
        </StyledHeader>
      </div>

      <div className="relative h-full w-full max-w-4xl mx-auto -mt-10">
        <section className="w-full mx-auto flex flex-col items-start justify-start my-10 px-10">
          <h2 className="text-sm font-semibold">Tags</h2>
          <ul className="flex flex-wrap items-center my-4 justify-start gap-4 gap-y-3 max-w-3xl mr-auto w-full ">
            {project.tags?.map((t, i) => (
              <li key={i}>
                <Tag tag={t} />
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full mx-auto flex flex-col items-start justify-start my-10 px-10">
          <h2 className="text-sm font-semibold">Difficulty Level</h2>
          <p
            className={
              "my-2 max-w-3xl mr-auto w-full text-sm capitalize " +
              (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            {project.difficulty}
          </p>
        </section>

        <section className="w-full mx-auto flex flex-col items-start justify-start my-10 px-10">
          <h2 className="text-3xl md:text-5xl font-semibold max-w-xl my-10">
            Project overview
          </h2>
          <div
            className={
              "flex flex-col items-start my-4 list-outside list-[square] justify-start gap-y-3 max-w-4xl markdown-editor w-full " +
              (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            <Markdown>{project.prerequisites}</Markdown>
          </div>
        </section>
      </div>

      <section className="w-full flex flex-col items-start justify-start py-20 relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 -z-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto w-full px-10">
          <h2 className="text-3xl md:text-5xl font-semibold max-w-xl capitalize mb-10">
            project curriculum
          </h2>
          <p className="leading-relaxed mb-6">
            Project <strong className="font-semibold">{project.title}</strong>{" "}
            is classified into{" "}
            <strong className="font-semibold">{project.chapters.length}</strong>{" "}
            chapters for the better modulization. By default, all the chapters
            are marked as unread and you can toggle the completion status of
            each chapter by clicking on the button at the bottom of each
            chapter.
            {project.repo && Object.values(project.repo).every(Boolean) && (
              <>
                <br />
                You can find the link to the project&apos;s source code at the
                end of the chapters section.
              </>
            )}
          </p>
        </div>
        <ul className="flex flex-col items-start w-11/12 max-w-4xl gap-y-10 mx-auto my-10 after:h-full after:absolute relative after:w-0.5 after:bg-secondary after:left-4  md:after:left-10 after:top-0 after:z-0">
          {project.chapters.map((chapter, i) => (
            <li
              key={i}
              className="flex items-center justify-start w-full relative z-10"
            >
              <PageSegment
                segment={chapter}
                index={i + 1}
                isDarkMode={isDarkMode}
              />
            </li>
          ))}
        </ul>
        <section className="w-full max-w-4xl mx-auto flex flex-col items-start justify-start px-10">
          <h2 className="text-3xl md:text-5xl font-semibold max-w-xl mb-6">
            <span className="text-2xl capitalize font-semibold">
              {project?.outro?.heading}
            </span>
          </h2>
          <p
            className={
              "leading-relaxed " + (isDarkMode ? "opacity-80" : "opacity-100")
            }
          >
            {project.outro?.text}
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
