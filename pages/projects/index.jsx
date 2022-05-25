// Project LIST PAGE

// import : built in

// import : internal components
import { PUBLIC_LIST_TYPES } from "../../utils";
import { ProjectThumbnail } from "../../components/content/ProjectThumbnail";
import { getAllProjects } from "../../database/projects";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";

const ProjectList = ({ projectList, totalCount }) => {
  projectList = JSON.parse(projectList);
  totalCount = JSON.parse(totalCount);

  return (
    <PublicListLayout
      pageTitle="Sounak Mukherjee's projects"
      pageDesc="Check out the walkthroughs for various projects using the state-of-the-art technologies"
      data={{
        ...PUBLIC_LIST_TYPES.projects,
        count: totalCount,
        searchMode: totalCount > 0,
      }}
    >
      {totalCount > 0 && (
        <main className="flex flex-col my-20 gap-20 items-stretch w-full max-w-4xl mx-auto">
          {projectList.map((project, index) => (
            <ProjectThumbnail
              key={project._id}
              data={project}
              index={index + 1}
            />
          ))}
        </main>
      )}
    </PublicListLayout>
  );
};

export default ProjectList;

export async function getStaticProps() {
  let projectList = [],
    totalCount = 0;
  try {
    projectList = await getAllProjects(false);
    totalCount = projectList.length;
  } catch (error) {
    projectList = [];
    totalCount = 0;
  } finally {
    return {
      props: {
        projectList: JSON.stringify(projectList),
        totalCount: JSON.stringify(totalCount),
      },
      revalidate: 1,
    };
  }
}
