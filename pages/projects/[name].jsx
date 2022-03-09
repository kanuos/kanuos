// Project Detail View

// import : internal
import { ProjectDetailBody } from '../../components/content/ProjectDetailBody';
import { HeadComponent } from '../../components/Head'
import { NavBar } from '../../components/public/Nav'
import { getIndividualProject, getAllProjects } from '../../database/projects'
import { deFormatURLParamString, formatURLParamString } from '../../utils';

const ProjectDetail = ({project}) => {
    project = JSON.parse(project)
  return (
    <>
    <HeadComponent title={project.name} />
    <NavBar />
    <ProjectDetailBody project={project} />
    </>
  )
}

export default ProjectDetail



export async function getStaticProps({ params }) {
    let project;
    try {
      project = await getIndividualProject(false, deFormatURLParamString(params.name));
    } 
    catch (error) {
      project = {}
    }
    finally {
      return {
        props : {
          project : JSON.stringify(project)
        },
        revalidate : 10
      }
    }
  }
  export async function getStaticPaths() {
    const allProjects = await getAllProjects(false);
    const paths = allProjects.map(d => ({ params : {name : formatURLParamString(d.title)}}));
    return {
      paths,
      fallback : false
    }
  
  }
  