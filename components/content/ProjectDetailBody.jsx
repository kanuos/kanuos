import { useContext } from "react";
import Link from "next/link";
// import : external
import {
  IoCheckmarkCircleOutline,
  IoGameControllerOutline,
  IoPricetagOutline,
} from "react-icons/io5";

// import : internal
import { DescHeader, JoinLine } from "../public/DescHeader";
import { PageSegment } from "../public/PageComponents";
import { PUBLIC_URLS, PORTFOLIO_LINKS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AnchorStep } from "../public/PageStepComponent";

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
      <div className="relative h-full w-full max-w-4xl mx-auto">
        <DescHeader
          projectMode={true}
          name={project.title}
          date={project.date}
          tags={project.tags}
          back={PUBLIC_URLS.projects.url}
          adminMode={adminMode}
          descType={PUBLIC_URLS.projects.name}
        />

        <section className="w-full max-w-4xl mx-auto flex flex-col items-start justify-start my-8">
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

        <section className="w-full max-w-4xl mx-auto flex flex-col items-start justify-start mb-16">
          <h2 className="text-2xl inline-flex items-center justify-start">
            <span className="capitalize  font-semibold">
              Project Tech stack used
            </span>
          </h2>
          <JoinLine />
          <ul className="flex flex-wrap items-start gap-4 mt-4">
            {project.techStack?.map((t, i) => (
              <li key={i} className="flex items-start justify-start">
                <span className="text-xs grow block font-semibold opacity-75">
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-4xl mx-auto flex flex-col items-start justify-start mb-16">
          <h2 className="text-2xl inline-flex items-center justify-start">
            <span className="capitalize  font-semibold">Prerequisites</span>
          </h2>
          <JoinLine />
          <ul className="flex flex-col items-start gap-y-4 mt-4">
            {project.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start justify-start gap-x-2">
                <IoCheckmarkCircleOutline className="text-secondary text-lg grow block shrink-0" />
                <span className=" text-xs grow block">{p.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full max-w-4xl mx-auto flex flex-col items-start justify-start gap-y-10 mb-10">
          <h2 className="inline-flex items-center justify-start gap-x-2">
            <span className="text-2xl capitalize  font-semibold">Chapters</span>
            <small className="text-xs opacity-70">
              ({project.chapters.length})
            </small>
          </h2>
          <p className="leading-relaxed text-sm lg:text-base">
            Project {project.title} walkthrough is classified into{" "}
            {project.chapters.length} chapters for the better modulization. By
            default, all the chapters are marked as unread and you can toggle
            the completion status of each chapter by clicking on the button at
            the bottom of each chapter. Enjoy the journey. If you have any
            queries feel free to send me a message and I'll try to get back to
            you ASAP.
            {project.repo && Object.values(project.repo).every(Boolean) && (
              <>
                <br />
                You can find the link to the project's source code at the end of
                the chapters section.
              </>
            )}
          </p>
          <ul
            className={
              "flex flex-col items-start w-full gap-y-12 relative after:absolute after:h-full after:top-0 after:-left-0 after:w-0.5 after:bg-opacity-10 after:z-0 " +
              (isDarkMode ? "after:bg-light" : "after:bg-dark")
            }
          >
            {project.chapters.map((chapter, i) => (
              <li
                key={i}
                className="flex items-center justify-start gap-x-1 w-full z-10"
              >
                <PageSegment segment={chapter} index={i + 1} />
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
              message stating your query. Don't forget to mention the project
              title in your message. I will get back to you ASAP
            </p>

            <div className="my-6 capitalize text-xs rounded w-max flex items-center justify-center relative overflow-hidden cursor-pointer">
              <Link href={PORTFOLIO_LINKS["contact me"].url}>
                <a
                  className={
                    "py-1.5 px-6 block z-10 peer font-semibold transition-all hover:shadow-xl border-2 relative bg-transparent " +
                    (isDarkMode
                      ? "border-light hover:text-dark text-light font-semibold"
                      : "hover:text-light border-dark")
                  }
                >
                  send me a message
                </a>
              </Link>
              <span
                className={
                  "py-1.5 px-6 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300 " +
                  (isDarkMode ? "bg-light border-light" : "bg-dark border-dark")
                }
              ></span>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};
