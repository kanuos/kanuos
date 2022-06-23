import { useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import GridContent from "../detail/GridContent";

// dynamic imports
const DetailHeader = dynamic(() =>
  import("../detail/Header").then((m) => m.DetailHeader)
);
const PageComponents = dynamic(() =>
  import("../public/PageComponents").then((m) => m.PageComponents)
);
const Conclusion = dynamic(() =>
  import("../detail/Conclusion").then((m) => m.Conclusion)
);

export const ProjectDetailBody = ({ project = null }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const LENGTH = project.chapters.length;

  const generateInitialActiveChapterList = useCallback(() => {
    const arr = [...new Array(LENGTH).fill(false)];
    arr[0] = true;
    return arr;
  }, [LENGTH]);

  const [activeChapter, setActiveChapter] = useState(
    generateInitialActiveChapterList()
  );

  const setActiveChapterCB = useCallback(
    (i) =>
      setActiveChapter((prev) => prev.map((el, k) => (i === k ? !el : false))),
    []
  );

  if (!project) {
    return <></>;
  }

  return (
    <div
      id="project"
      className={
        "overflow-hidden relative h-auto w-full min-h-screen " +
        (isDarkMode ? "bg-hero--dark" : "bg-hero--light")
      }
    >
      <DetailHeader
        category={project.category}
        isDarkMode={isDarkMode}
        back={{
          url: PUBLIC_URLS.projects.url,
          text: "Back to projects",
        }}
        title={project.title}
        desc={project.desc}
        date={project.date}
        tags={project.tags}
        difficulty={project.difficulty}
      />

      <div className="relative h-full w-full">
        <GridContent heading="prerequisites" text={project.prerequisites} />
        <GridContent
          heading="chapters"
          text={`Project **${project.title}** is classified into **${LENGTH}** chapters for the better modulization. By default, all the chapters are marked as unread and you can toggle the completion status of each chapter by clicking on the button at the bottom of each chapter.`}
        />

        <section className="section-wrapper my-20 max-w-5xl mx-auto">
          <ul className="flex flex-col items-start w-full gap-y-10 max-w-5xl mx-auto my-8 md:col-span-full pt-8">
            {project.chapters.map((chapter, i) => (
              <li
                key={i}
                className={`relative flex items-center justify-start w-full ml-auto rounded-md overflow-hidden  ${
                  !isDarkMode
                    ? "nav-dark dark-shadow"
                    : "nav-light light-shadow"
                } ${
                  activeChapter[i] ? "max-w-5xl" : "max-w-prose origin-right"
                }`}
              >
                <PageComponents
                  // key={activeChapter}
                  active={activeChapter}
                  setActiveChapter={setActiveChapterCB}
                  segment={chapter}
                  index={i}
                  isDarkMode={isDarkMode}
                />
              </li>
            ))}
          </ul>
        </section>

        <Conclusion
          heading={project.outro?.heading}
          text={project.outro?.text}
          repo={project?.repo}
          demo={project?.demo}
        />
      </div>
    </div>
  );
};
