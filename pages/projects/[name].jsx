// Project Detail View
import dynamic from "next/dynamic";

// import : internal
import { ProjectDetailBody } from "../../components/content/ProjectDetailBody";
import { HeadComponent } from "../../components/Head";
import { getIndividualProject, getAllProjects } from "../../database/projects";
import {
  deFormatURLParamString,
  formatURLParamString,
  generateDetailViewMetadata,
} from "../../utils";

// dynamic
const NavBar = dynamic(() =>
  import("../../components/public/Nav").then((m) => m.NavBar)
);
const ThemeToggler = dynamic(() =>
  import("../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

const ProjectDetail = ({ project }) => {
  project = JSON.parse(project);
  const content = generateDetailViewMetadata(
    project.title,
    project.tags?.map(({ tag }) => tag)?.toString(),
    project.category
  );
  return (
    <>
      <HeadComponent title={project.title} content={content} />
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
