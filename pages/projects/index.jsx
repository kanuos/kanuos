// Project LIST PAGE

// import : built in
import { useContext } from 'react'

// import : internal components
import { ThemeToggler } from "../../components/public/ThemeToggler"
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { ListLoader } from '../../components/public/ListLoader';
import { ProjectThumbnail } from '../../components/content/ProjectThumbnail';
import { getAllProjects } from '../../database/projects'

// import : internal contexts
import { ThemeContext } from '../../contexts/ThemeContext'


const ProjectList = ({projectList}) => {
    projectList = JSON.parse(projectList);
    const { isDarkMode } = useContext(ThemeContext);

    return (
    <>
    <HeadComponent title="Sounak Mukherjee's Projects" />
    <NavBar />
    <ThemeToggler />
    <div className={'h-full  min-h-screen scrollbar-thin w-full overflow-hidden ' + (isDarkMode ? 'main-dark' : 'main-light')}>
        <div className='px-12 py-20 max-w-3xl mx-auto select-text selection:bg-secondary selection:text-dark'>
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
                <main className="h-[30vh] flex flex-col items-center justify-center gap-2">
                    <img src='/error.png' className='h-20 w-20 object-cover' />
                    <p className='p-4 rounded-md bg-light text-dark filter drop-shadow-xl'>
                        <span className="text-sm">
                            No projects found!
                        </span>
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