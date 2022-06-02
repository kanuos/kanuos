import { useContext, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";

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

export const ProjectDetailBody = ({ project }) => {
  const LENGTH = project.chapters.length;
  const { isDarkMode } = useContext(ThemeContext);
  const [activeChapter, setActiveChapter] = useState(0);
  const [completed, setCompleted] = useState(Array(LENGTH).fill(false));

  const toggleCompletionStatus = useCallback(
    ({ i, stat }) =>
      setCompleted((prev) => prev.map((el, k) => (k === i ? stat : el))),
    []
  );

  const setActiveChapterCB = useCallback((i) => setActiveChapter(() => i), []);

  return (
    <div
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
      />

      <div className="relative h-full w-full">
        <section className="section-wrapper md:grid md:grid-cols-4 gap-x-6 max-w-4xl mx-auto">
          <h2 className="heading--sub uppercase md:col-start-1 md:col-end-2 mb-2">
            Difficulty Level
          </h2>
          <p className={"content--secondary capitalize"}>
            {project.difficulty}
          </p>
        </section>

        <section className="section-wrapper md:grid md:grid-cols-4 gap-x-6 max-w-4xl mx-auto mt-20">
          <h2 className="heading--sub uppercase md:col-start-1 md:col-end-2 mb-2">
            Prerequisites
          </h2>
          <div className="markdown-editor-wrapper md:col-start-2 md:col-end-5">
            <Markdown>{project.prerequisites}</Markdown>
          </div>
        </section>

        <section className="section-wrapper my-28 max-w-4xl mx-auto">
          <div className="max-w-4xl mx-auto w-full md:grid md:grid-cols-4 gap-x-6">
            <h2 className="heading--sub uppercase mb-2 md:col-start-1 md:col-end-2">
              Project Curriculum
            </h2>
            <p className="md:col-start-2 md:col-end-5 content--secondary">
              Project <strong className="font-semibold">{project.title}</strong>{" "}
              is classified into{" "}
              <strong className="font-semibold">{LENGTH}</strong> chapters for
              the better modulization. By default, all the chapters are marked
              as unread and you can toggle the completion status of each chapter
              by clicking on the button at the bottom of each chapter.
              {project.repo && Object.values(project.repo).every(Boolean) && (
                <>
                  <br />
                  You can find the link to the project&apos;s source code at the
                  end of the chapters section.
                </>
              )}
            </p>
          </div>
          <div className="flex items-center justify-center pt-32 gap-2 w-full">
            <h3 className="heading--main w-max">Chapters</h3>
            <p className="text-sm">
              <sup>({LENGTH})</sup>
            </p>
          </div>
          <p className="text-center text-sm w-full">
            <small>
              Completed :{" "}
              {(Math.round(completed.filter(Boolean).length) * 100) / LENGTH}%
            </small>
          </p>
          <ul className="flex flex-col items-start w-full gap-y-20 mx-auto my-16 md:col-span-full pt-16 after-line--center">
            {project.chapters.map((chapter, i) => (
              <li
                key={i}
                className={`relative flex items-center justify-start w-full max-w-prose even:ml-auto odd:mr-auto rounded-lg overflow-hidden  ${
                  !isDarkMode
                    ? "nav-dark dark-shadow"
                    : "nav-light light-shadow"
                }`}
              >
                <PageComponents
                  key={activeChapter}
                  active={activeChapter}
                  setActiveChapter={setActiveChapterCB}
                  segment={chapter}
                  completed={completed[i]}
                  toggleCompletionStatus={toggleCompletionStatus}
                  index={i + 1}
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
