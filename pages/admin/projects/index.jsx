import { useState } from "react";
// ADMIN Project list

import { getAllProjects } from "../../../database/projects";
import { ADMIN_ACCOUNT, PUBLIC_LIST_TYPES } from "../../../utils";
import { isAdminMiddleware } from "../../../utils/authLib";
import { ProjectThumbnail } from "../../../components/content/ProjectThumbnail";
import { AdminListLayout } from "../../../components/Layouts/AdminListLayout";

const ProjectsAdminPage = ({ allProjects }) => {
  allProjects = allProjects ? JSON.parse(allProjects) : [];

  const [searchText, setSearchText] = useState("");

  return (
    <AdminListLayout
      type={PUBLIC_LIST_TYPES.projects.type}
      totalSize={allProjects.length}
      list={allProjects.filter((el) =>
        el.title.toLowerCase().includes(searchText.toLowerCase())
      )}
      searchText={searchText}
      getSearchText={setSearchText}
    >
      {allProjects
        .filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        )
        ?.map((project, index) => (
          <ProjectThumbnail
            key={project._id}
            data={project}
            index={index + 1}
            adminMode={true}
          />
        ))}
    </AdminListLayout>
  );
};

export default ProjectsAdminPage;

export async function getServerSideProps({ req, res }) {
  try {
    const projects = await getAllProjects(true);
    const { loggedAsAdmin } = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) {
      return {
        redirect: {
          destination: ADMIN_ACCOUNT,
          permanent: false,
        },
      };
    }
    return {
      props: {
        allProjects: JSON.stringify(projects),
      },
    };
  } catch (error) {
    return {
      props: {
        allProjects: JSON.stringify([]),
      },
    };
  }
}
