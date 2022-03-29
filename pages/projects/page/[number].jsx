// Project LIST PAGE

// import : built in
import { useContext } from "react";
import dynamic from "next/dynamic";

// import : internal components
import { HeadComponent } from "../../../components/Head";
import { PublicHeader } from "../../../components/public/Header";
import { ITEMS_PER_PAGE, PUBLIC_LIST_TYPES } from "../../../utils";
import { ProjectThumbnail } from "../../../components/content/ProjectThumbnail";
import { getAllProjects } from "../../../database/projects";

// import : internal contexts
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Footer } from "../../../components/public/Footer";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../../components/public/Nav").then((m) => m.NavBar)
);
const ThemeToggler = dynamic(() =>
  import("../../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);
const Pagination = dynamic(() =>
  import("../../../components/public/Pagination").then((m) => m.Pagination)
);

const ProjectList = ({
  projectList,
  totalCount,
  pageStartNumber,
  pageCount,
}) => {
  projectList = JSON.parse(projectList);
  totalCount = JSON.parse(totalCount);
  pageStartNumber = JSON.parse(pageStartNumber);
  pageCount = JSON.parse(pageCount);

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
            data={{ ...PUBLIC_LIST_TYPES.projects, count: totalCount }}
          />
          {projectList.length > 0 ? (
            <>
              <main className="flex flex-col my-20 gap-20">
                {projectList.map((project, index) => (
                  <ProjectThumbnail
                    key={project._id}
                    data={project}
                    index={index + parseInt(pageStartNumber) + 1}
                  />
                ))}
              </main>
              {projectList.length < totalCount && (
                <Pagination count={pageCount} baseURL="/projects/page" />
              )}
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
      <Footer />
    </>
  );
};

export default ProjectList;

export async function getStaticProps({ params }) {
  let projectList, totalCount, pageCount;
  try {
    const allProjects = await getAllProjects(false);
    totalCount = allProjects.length;

    const pageData = [];

    let start = 0;
    while (start < allProjects.length) {
      pageData.push(allProjects.slice(start, start + ITEMS_PER_PAGE.project));
      start += ITEMS_PER_PAGE.project;
    }

    pageCount = pageData.length;

    projectList = pageData[parseInt(params.number) - 1];
  } catch (error) {
    console.log(error);
    projectList = [];
    totalCount = 0;
    pageCount = 0;
  } finally {
    return {
      props: {
        projectList: JSON.stringify(projectList),
        totalCount: JSON.stringify(totalCount),
        pageStartNumber: JSON.stringify(
          (parseInt(params.number) - 1) * ITEMS_PER_PAGE.project
        ),
        pageCount: JSON.stringify(pageCount),
      },
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjects(false);
  const pageData = [];

  let start = 0;
  while (start < allProjects.length) {
    pageData.push(allProjects.slice(start, start + ITEMS_PER_PAGE.project));
    start += ITEMS_PER_PAGE.project;
  }

  const paths = pageData.map((_, i) => ({
    params: { number: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
