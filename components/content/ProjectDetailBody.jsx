import { useContext } from "react";
// import : external
import {
  IoCheckmarkCircleOutline,
  IoGameControllerOutline,
  IoPricetagOutline,
} from "react-icons/io5";

// import : internal
import { PageSegment } from "../public/PageComponents";
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DescHeader } from "../public/DescHeader";
import dynamic from "next/dynamic";

const ContactModal = dynamic(() => import("../public/ContactModal"));
const AnchorStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.AnchorStep)
);
const JoinLine = dynamic(() =>
  import("../public/DescHeader").then((m) => m.JoinLine)
);

export const ProjectDetailBody = ({ project, adminMode = false }) => {
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
          projectMode={true}
          name={project.title}
          date={project.date}
          tags={project.tags}
          back={PUBLIC_URLS.projects.url}
          adminMode={adminMode}
          descType={PUBLIC_URLS.projects.name}
        />

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start my-8">
          <p className="leading-relaxed text-sm first-letter:text-6xl first-letter:float-left first-letter:font-semibold first-letter:mr-2 first-letter:-mt-6 first-letter: first-letter:uppercase float-left lg:text-base">
            {project.desc}
          </p>
          <ul className="flex flex-col items-start gap-y-0.5 mt-4">
            <li className="inline-flex items-center justify-start gap-x-2 text-xs">
              <IoGameControllerOutline className="text-sm" />
              <small className="capitalize font-semibold">Difficulty</small>
            </li>
            <li className="text-sm">
              <small className="font-semibold capitalize text-primary">
                {project.difficulty}
              </small>
            </li>
          </ul>
          <JoinLine />
          <ul className="flex flex-col items-start gap-y-0.5 mb-4">
            <li className="inline-flex items-center justify-start gap-x-2 text-xs">
              <IoPricetagOutline className="text-sm" />
              <small className="capitalize font-semibold">Category</small>
            </li>
            <li className="text-sm">
              <small className="font-semibold capitalize text-primary">
                {project.category}
              </small>
            </li>
          </ul>
        </section>

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start mb-16">
          <h2 className="text-2xl inline-flex items-center justify-start">
            <span className="capitalize  font-semibold">
              Project Tech stack used
            </span>
          </h2>
          <JoinLine />
          <ul className="flex flex-col items-start gap-1">
            {project.techStack?.map((t, i) => (
              <li key={i} className="flex items-start justify-start">
                <span className="text-xs grow block font-semibold opacity-75">
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start mb-16">
          <h2 className="text-2xl inline-flex items-center justify-start">
            <span className="capitalize  font-semibold">Prerequisites</span>
          </h2>
          <JoinLine />
          <ul className="flex flex-col items-start gap-y-4 mt-4 -ml-6">
            {project.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start justify-start gap-x-2">
                <IoCheckmarkCircleOutline className="text-secondary text-lg grow block shrink-0" />
                <span className=" text-xs grow block">{p.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-3xl mx-auto flex flex-col items-start justify-start mb-10">
          <h2 className="inline-flex items-center justify-start gap-x-2">
            <span className="text-2xl capitalize  font-semibold">Chapters</span>
            <small className="text-xs opacity-70">
              ({project.chapters.length})
            </small>
          </h2>
          <JoinLine />
          <p className="leading-relaxed text-sm lg:text-base">
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
          <ul className="flex flex-col items-start w-full mt-6">
            {project.chapters.map((chapter, i) => (
              <li
                key={i}
                className="flex items-center justify-start my-4 w-full last:after:hidden relative z-10 after:absolute after:w-0.5 after:left-4 after:h-10 after:-bottom-10 after:bg-secondary"
              >
                <PageSegment
                  segment={chapter}
                  index={i + 1}
                  isDarkMode={isDarkMode}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full mx-auto flex flex-col items-start justify-start gap-y-1">
          <h2 className="text-2xl capitalize  font-semibold">
            {project?.outro?.heading}
          </h2>
          <JoinLine />
          <section className="text-sm  w-full break-words">
            <p className="leading-relaxed text-sm ">{project.outro?.text}</p>
            <ul className="flex flex-col gap-y-4 my-4">
              {project.repo && Object.values(project.repo).every(Boolean) && (
                <li className="inline-flex items-start justify-start gap-2 group w-max">
                  <AnchorStep
                    href={project.repo.href}
                    label={project.repo.label}
                    icon="git"
                  />
                </li>
              )}
              {project.demo && Object.values(project.demo).every(Boolean) && (
                <li className="inline-flex items-start justify-start gap-2 group w-max">
                  <li className="inline-flex items-start justify-start gap-2 group w-max">
                    <AnchorStep
                      href={project.demo.href}
                      label={project.demo.label}
                    />
                  </li>
                </li>
              )}
            </ul>

            <p className="leading-relaxed text-sm">
              If you have any queries about this project, please send me a
              message stating your query. Don&apos;t forget to mention the
              project title in your message. I will get back to you ASAP
            </p>

            <ContactModal />
          </section>
        </section>
      </div>
    </main>
  );
};
