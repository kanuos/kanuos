// Project LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { ListLoader } from '../../components/public/ListLoader';
import { ProjectThumbnail } from '../../components/content/ProjectThumbnail';
import { getAllProjects } from '../../database/projects'

const ProjectList = ({projectList}) => {
    projectList = JSON.parse(projectList);
    return (
    <>
    <HeadComponent title="Sounak Mukherjee's Projects" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 max-w-3xl mx-auto select-text selection:bg-black selection:text-light'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.projects, count : projectList.length}} />
            {
                projectList.length > 0 ?
                <>
                <main className='flex flex-col my-20 gap-20'>
                    {projectList.map((project, index) => (
                        <ProjectThumbnail 
                            key={project._id} 
                            data={project} 
                            index={index + 1} />
                    ))}
                </main>
                <ListLoader />
                </>
                :
                <main className="h-[30vh] flex flex-col items-center justify-center">
                    <p className='opacity-75'>
                        No projects found!
                    </p>
                </main>
            }
        </div>
    </div>
    </>
  )
}



export default ProjectList;


export async function getStaticProps(){
    let projectList;
    try {
        projectList = await getAllProjects(false);
    } 
    catch (error) {
        projectList = [];
    }
    finally {
        return {
            props : {
                projectList : JSON.stringify(projectList)
            },
            revalidate : 10
        }
    }
}