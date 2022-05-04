// Project Detail View

// import : internal
import PublicLayout from "../../components/Layouts/PublicLayout";
import { ProjectDetailBody } from "../../components/content/ProjectDetailBody";
import { getIndividualProject, getAllProjects } from "../../database/projects";
import {
  deFormatURLParamString,
  formatURLParamString,
  generateDetailViewMetadata,
} from "../../utils";

// dynamic

const ProjectDetail = ({ project }) => {
  project = JSON.parse(project);
  const content = generateDetailViewMetadata(
    project.title,
    project.tags?.map(({ tag }) => tag)?.toString(),
    project.category
  );
  return (
    <PublicLayout metaTitle={project.title} metaDesc={content}>
      <ProjectDetailBody project={project} />
    </PublicLayout>
  );
};

export default ProjectDetail;

export async function getStaticProps({ params }) {
  let project;
  try {
    project = await getIndividualProject(
      false,
      deFormatURLParamString(params.name)
    );
  } catch (error) {
    project = {};
  } finally {
    return {
      props: {
        project: JSON.stringify(project),
      },
      revalidate: 10,
    };
  }
}
export async function getStaticPaths() {
  const allProjects = await getAllProjects(false);
  const paths = allProjects.map((d) => ({
    params: { name: formatURLParamString(d.title) },
  }));
  return {
    paths,
    fallback: false,
  };
}
