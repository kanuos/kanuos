import dynamic from "next/dynamic";
import React from "react";

const InfoGroup = dynamic(() =>
  import("../public/InfoGroup").then((m) => m.InfoGroup)
);
const CloseBtn = dynamic(() =>
  import("../public/CloseBtn").then((m) => m.CloseBtn)
);
const DetailHeader = dynamic(() =>
  import("../detail/Header").then((m) => m.DetailHeader)
);
const PageLink = dynamic(() => import("./PageLink").then((m) => m.PageLink));
const UserFlow = dynamic(() =>
  import("../content/UserFlow").then((m) => m.UserFlow)
);
const Screens = dynamic(() =>
  import("../content/UserFlow").then((m) => m.Screens)
);

export const WorkDetailModal = ({
  isDarkMode,
  handleSelectProject,
  work,
  allProjects = [],
}) => {
  const { project, design } = work;

  const caption = (
    <small className="font-bold">
      {(allProjects.findIndex((el) => el._id === work._id) + 1)
        .toString()
        .padStart(2, "0")}
      &nbsp;&mdash;&nbsp;
      {allProjects.length.toString().padStart(2, "0")}
    </small>
  );

  const hasPageLinks = [
    ...Object.values(project.repo),
    ...Object.values(project.demo),
  ].some(Boolean);

  return (
    <section
      className={`fixed inset-0 z-50 h-screen w-screen ${
        isDarkMode ? "nav-dark" : "nav-light"
      }`}
    >
      <div className="fixed top-2 right-2 z-20">
        <CloseBtn
          cb={() => handleSelectProject(null)}
          isOpen={true}
          isDarkMode={isDarkMode}
        />
      </div>
      <section className="absolute inset-0 z-10 h-auto min-h-screen w-full overflow-y-auto scrollbar-none pt-10">
        <DetailHeader
          caption={caption}
          title={project.title}
          thumbnail={design.thumbnail}
          figcaption={design.caption}
          desc={work.metadata}
          items={[
            {
              heading: "role",
              content: ["web design", "UI-UX development", "API development"],
            },
            {
              heading: "category",
              content: project.category,
            },
            {
              heading: "year",
              content: new Date(project.date).getUTCFullYear(),
            },
          ]}
        />
        <section className="px-8 pt-16 max-w-4xl mx-auto">
          <h2 className="heading--main text-center">User Flow</h2>
          <UserFlow steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </section>

        <section className="h-auto mx-auto">
          <Screens steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </section>

        <section className="px-8 py-16 max-w-4xl mx-auto">
          <InfoGroup
            items={[
              {
                heading: "UI-UX",
                content: design.tags.map((el) => el.tag),
              },
              {
                heading: "Development",
                content: project.tags.map((el) => el.tag),
              },
              hasPageLinks && {
                heading: "page links",
                content: [
                  Object.values(project.repo).every(Boolean) && (
                    <PageLink
                      href={project.repo.href}
                      label={project.repo.label}
                    />
                  ),
                  Object.values(project.demo).every(Boolean) && (
                    <PageLink
                      href={project.demo.href}
                      label={project.demo.label}
                    />
                  ),
                ],
              },
            ]}
          />
        </section>
      </section>
    </section>
  );
};

/*
export const UserFlow = ({ steps = [], isDarkMode }) => {
  return (
    <div className="relative w-full pt-20 mb-20 after-line--center">
      <ul className={`w-full flex flex-col`}>
        {steps.map(({ about, title }, i) => (
          <motion.li
            key={i}
            className={`my-6 last:mb-0 max-w-3xl mx-auto w-full h-auto z-10 group grid grid-rows-6 grid-cols-6 ${
              isDarkMode ? "nav-dark" : "nav-light"
            }`}
          >
            <div
              className={`group-last:border-0 border-2 border-secondary group-odd:col-start-4 group-odd:col-end-7 group-even:col-start-1 group-even:col-end-4 group-even:border-r-0 group-odd:border-l-0 row-start-4 row-end-7 z-10 h-full w-full animate-pulse ${
                isDarkMode ? "nav-dark" : "nav-light"
              } group-odd:rounded-r-md group-even:rounded-l-md`}
            ></div>
            <section
              className={`row-start-1 w-full z-20 px-4 py-6 rounded-md ${
                isDarkMode ? "nav-dark--light" : "nav-light"
              } drop-shadow-2xl ${
                steps.length === 1
                  ? "col-span-full row-end-7"
                  : "row-end-6 group-odd:col-start-1 group-even:col-start-2  group-odd:col-end-6 group-even:col-end-7"
              }`}
            >
              {steps.length > 1 && (
                <p className="text-xs mb-2">
                  <small className="px-2 py-1 bg-primary bg-opacity-10 rounded-sm font-bold text-primary">
                    Step {i + 1} - {steps.length}
                  </small>
                </p>
              )}
              <h3 className="heading--sub mb-4">{titleCase(title)}</h3>
              <p className="content--sub">{about}</p>
            </section>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};


 */
