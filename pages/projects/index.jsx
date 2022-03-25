// Project LIST PAGE

// import : built in
import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal components
import { HeadComponent } from "../../components/Head";
import { PublicHeader } from "../../components/public/Header";
import { PUBLIC_LIST_TYPES } from "../../utils";
import { ProjectThumbnail } from "../../components/content/ProjectThumbnail";
import { getAllProjects } from "../../database/projects";

// import : internal contexts
import { ThemeContext } from "../../contexts/ThemeContext";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../components/public/Nav").then((m) => m.NavBar)
);
const ThemeToggler = dynamic(() =>
  import("../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);
const ListLoader = dynamic(() =>
  import("../../components/public/ListLoader").then((m) => m.ListLoader)
);

const ProjectList = ({ projectList }) => {
  projectList = JSON.parse(projectList);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee's Projects"
        content="Check out the walkthroughs for various projects using the state-of-the-art technologies"
      />
      <NavBar />
      <ThemeToggler />
      <div
        className={
          "h-full  min-h-screen scrollbar-thin w-full overflow-hidden " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <div className="px-12 py-20 max-w-3xl mx-auto select-text">
          <PublicHeader
            data={{ ...PUBLIC_LIST_TYPES.projects, count: projectList.length }}
          />
          {projectList.length > 0 ? (
            <>
              <main className="flex flex-col my-20 gap-20">
                {projectList.map((project, index) => (
                  <ProjectThumbnail
                    key={project._id}
                    data={project}
                    index={index + 1}
                  />
                ))}
              </main>
              <ListLoader />
            </>
          ) : (
            <main className="h-[30vh] flex flex-col items-center justify-center gap-2">
              <p className="p-4 rounded-md bg-light text-dark filter drop-shadow-xl">
                <span className="text-sm">No projects found!</span>
              </p>
            </main>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectList;

export async function getStaticProps() {
  let projectList;
  try {
    projectList = await getAllProjects(false);
  } catch (error) {
    projectList = [];
  } finally {
    return {
      props: {
        projectList: JSON.stringify(projectList),
      },
      revalidate: 10,
    };
  }
}
