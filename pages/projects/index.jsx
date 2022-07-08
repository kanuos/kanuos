// Project LIST PAGE

// import : built in
import { useState, useEffect } from "react";

// import : internal components
import { PUBLIC_LIST_TYPES } from "../../utils";
import { ProjectThumbnail } from "../../components/content/ProjectThumbnail";
import { getAllProjects } from "../../database/projects";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";

const ProjectList = ({ projectList, totalCount }) => {
  projectList = JSON.parse(projectList);
  totalCount = parseInt(JSON.parse(totalCount));

  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(totalCount);

  useEffect(() => {
    setCount(
      () =>
        projectList.filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        ).length
    );
  }, [searchText, projectList]);

  return (
    <PublicListLayout
      pageTitle="Sounak Mukherjee's projects"
      pageDesc="Projects walkthroughs for front end, back-end and full stack cross platform projects"
      data={{
        ...PUBLIC_LIST_TYPES.projects,
        count,
        searchMode: totalCount > 0,
      }}
      searchText={searchText}
      setSearchText={(x) => setSearchText(x)}
    >
      <main className="flex flex-col mb-20 gap-20 items-stretch w-full max-w-5xl mx-auto">
        {count > 0 ? (
          <>
            {projectList
              .filter((el) =>
                el.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((project, index) => (
                <ProjectThumbnail
                  key={project._id}
                  data={project}
                  index={index + 1}
                />
              ))}
          </>
        ) : (
          <>
            {totalCount > 0 ? (
              <p className="content--sub font-bold">
                No project with{" "}
                <span className="text-primary text-lg">{searchText}</span>{" "}
                keyword found!{" "}
              </p>
            ) : (
              <></>
            )}
          </>
        )}
      </main>
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
