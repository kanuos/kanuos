// Project Detail View

// import : internal
import { ProjectDetailBody } from "../../components/content/ProjectDetailBody";
import { HeadComponent } from "../../components/Head";
import { NavBar } from "../../components/public/Nav";
import { ThemeToggler } from "../../components/public/ThemeToggler";
import { getIndividualProject, getAllProjects } from "../../database/projects";
import {
  deFormatURLParamString,
  formatURLParamString,
  generateDetailViewMetadata,
} from "../../utils";

const ProjectDetail = ({ project }) => {
  project = JSON.parse(project);
  const content = generateDetailViewMetadata(
    project.title,
    project.tags?.map(({ tag }) => tag)?.toString(),
    project.category
  );
  return (
    <>
      <HeadComponent title={project.name} content={content} />
      <NavBar />
      <ThemeToggler />
      <ProjectDetailBody project={project} />
    </>
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
