// Project Detail View
import dynamic from "next/dynamic";
// import : internal
import PublicLayout from "../../components/Layouts/PublicLayout";
import { ProjectDetailBody } from "../../components/content/ProjectDetailBody";
import { getIndividualProject, getAllProjects } from "../../database/projects";
import { generateDetailViewMetadata } from "../../utils";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

// dynamic
const ContactMe = dynamic(() =>
  import("../../components/portfolio/ContactMe").then((m) => m.ContactMe)
);

const ProjectDetail = ({ project }) => {
  project = JSON.parse(project);
  const content = generateDetailViewMetadata(
    project.title,
    project.tags?.map(({ tag }) => tag)?.toString(),
    project.category
  );

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout metaTitle={"Project : " + project.title} metaDesc={content}>
      <ProjectDetailBody project={project} />
      <ContactMe portfolioMode={false} isDarkMode={isDarkMode} />
    </PublicLayout>
  );
};

export default ProjectDetail;

export async function getStaticProps({ params }) {
  let project;
  try {
    project = await getIndividualProject(false, params.name);
    return {
      props: {
        project: JSON.stringify(project),
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export async function getStaticPaths() {
  const allProjects = await getAllProjects(false);
  const paths = allProjects.map((d) => ({
    params: { name: d.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
