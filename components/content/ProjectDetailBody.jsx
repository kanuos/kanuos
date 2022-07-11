import { useContext, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";

// import : internal
import { ThemeContext } from "../../contexts/ThemeContext";
import { DifficultyStatus } from "../detail/DifficultyStatus";
import { PUBLIC_URLS } from "../../utils";

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
const PageLink = dynamic(() =>
  import("../portfolio/PageLink").then((m) => m.PageLink)
);

export const ProjectDetailBody = ({ project = null }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const LENGTH = project.chapters.length;

  const [readReceipts, setReadReceipts] = useState(Array(LENGTH).fill(false));
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // get the memoized chapters read/progress percentage
  // depends on readReceipts and LENGTH changes
  const completionPercentage = useMemo(() => {
    const totalChaptersCompleted = readReceipts.filter(Boolean).length;
    return Math.round((totalChaptersCompleted * 100) / LENGTH);
  }, [readReceipts, LENGTH]);

  const getCurrentChapterIndex = useCallback(
    (index) => {
      if (index < 0 || index >= LENGTH) {
        return;
      }
      setCurrentChapterIndex(() => index);
    },
    [LENGTH]
  );

  const toggleReadStatus = useCallback(
    (index) => {
      if (index < 0 || index >= LENGTH) {
        return;
      }
      setReadReceipts((prev) => prev.map((el, i) => (i !== index ? el : !el)));
    },
    [LENGTH]
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
        title={project.title}
        desc={project.desc}
        date={project.date}
        tags={project.tags}
      />

      <p className="p-8 mt-10 w-full max-w-4xl lg:my-6 mx-auto content--secondary first-letter:font-title first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-5xl md:first-letter:text-7xl xl:first-letter:text-8xl first-letter:text-primary text-justify">
        Project is classified into{" "}
        <strong className={isDarkMode ? "text-secondary" : "text-current"}>
          {LENGTH}
        </strong>{" "}
        chapters for the better organization. The completion percentage shows
        what percentage of the content has been read. Check out for the{" "}
        <strong className={isDarkMode ? "text-secondary" : "text-current"}>
          source code
        </strong>{" "}
        and{" "}
        <strong className={isDarkMode ? "text-secondary" : "text-current"}>
          live demo
        </strong>{" "}
        of the project at the end of the project walkthrough. For any queries,
        you can drop an email or ping me up on my social media handles.
      </p>

      <div
        className={`relative h-full w-full my-10 py-10 px-8 ${
          isDarkMode ? "nav-dark" : "nav-light"
        }`}
      >
        {/* metadata section */}
        <h2 className="heading--main w-max mx-auto mb-6 capitalize text-center">
          project information
        </h2>
        <div className="relative w-full max-w-2xl mx-auto h-auto flex flex-col items-stretch justify-start gap-y-16 after-line--center pt-20 pb-32 md:pb-40">
          {/* difficulty box */}
          <article
            className={`p-6 z-10 drop-shadow-md w-5/6 mr-auto rounded-md ${
              isDarkMode ? "nav-dark--light" : "nav-light"
            }`}
          >
            <h3 className="heading--secondary">
              What is the difficulty level of this project?
            </h3>
            <ul className="flex flex-col items-start justify-start gap-4 mt-6">
              <li>
                <DifficultyStatus
                  heading="beginner"
                  checked={project.difficulty === "beginner"}
                  text="You can follow along with this project without prior experience in coding!"
                />
              </li>
              <li>
                <DifficultyStatus
                  heading="intermediate"
                  checked={project.difficulty === "intermediate"}
                  text="Basic understanding of the underlying tech-stack is required to follow along."
                />
              </li>
              <li>
                <DifficultyStatus
                  heading="advanced"
                  checked={project.difficulty === "advanced"}
                  text="Prior experience working on complicated projects with the current tech stack is needed. No explanation for basic concepts will be provided"
                />
              </li>
            </ul>
          </article>

          {/* technology box */}
          <article
            className={`p-6 z-10 drop-shadow-md w-5/6 ml-auto rounded-md ${
              isDarkMode ? "nav-dark--light" : "nav-light"
            }`}
          >
            <h3 className="heading--secondary">
              What technologies are used in this project?
            </h3>
            <ul className="flex flex-col items-start justify-start gap-2 mt-6">
              {project.techStack.map(({ text }, i) => (
                <li key={i} className="markdown-editor content--sub">
                  <Markdown>{text}</Markdown>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* chapters/table of content */}
        <div className="my-6">
          <h2 className="heading--main w-max mx-auto capitalize text-center">
            Table of Content
          </h2>
          <p className="text-xs text-center">
            <small
              className={`font-bold transition-colors ${
                completionPercentage === 0
                  ? "text-primary"
                  : completionPercentage === 100
                  ? "text-secondary"
                  : "text-current"
              }`}
            >
              Completed {completionPercentage}%
            </small>
          </p>
        </div>

        <section className="flex flex-col items-start w-full gap-y-8 max-w-4xl mx-auto md:col-span-full pb-10">
          {project.chapters.map((chapter, i) => (
            <PageComponents
              key={i}
              activeIndex={currentChapterIndex}
              readReceipts={readReceipts}
              toggleReadStatus={toggleReadStatus}
              setActiveChapter={getCurrentChapterIndex}
              segment={chapter}
              index={i}
            />
          ))}
        </section>
      </div>

      <Conclusion
        heading={project.outro?.heading}
        text={project.outro?.text}
        repo={project?.repo}
        demo={project?.demo}
      />

      <div className="mx-auto w-max">
        <PageLink
          label="Check out all projects"
          href={PUBLIC_URLS.projects.url}
        />
        <div className="mx-auto w-max relative after-line--center mt-4 pb-40"></div>
      </div>
    </div>
  );
};
