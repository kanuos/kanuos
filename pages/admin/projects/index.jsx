// ADMIN Project list
import { getAllProjects } from "../../../database/projects";
import { ProjectThumbnail } from '../../../components/content/ProjectThumbnail'
import { IoAddCircle } from 'react-icons/io5'
import { HeadComponent } from "../../../components/Head";
import { NavBar } from "../../../components/public/Nav";
import Link from "next/link";
import { ADMIN_NEW_CONTENT } from "../../../utils";

const ProjectsAdminPage = ({allProjects}) => {
    allProjects = allProjects ? JSON.parse(allProjects) : []
    return (
    <>
        <HeadComponent title="ADMIN | Project Management" />
        <NavBar type='admin' left={true}/>
        <main className="min-h-screen h-full p-16 main-light text-dark z-10 relative">
            <h1 className="text-center mb-20 flex flex-col items-center justify-center gap-y-4">
                <small className="text-xs ml-4 text-secondary font-semibold">
                    Admin
                </small>
                <span className="text-3xl md:text-5xl font-special font-semibold capitalize">
                    Project List View
                </span>
            </h1>
            <div className="flex flex-col items-stretch w-11/12 gap-y-20 max-w-3xl mx-auto">
            {allProjects?.map((project, index) => (
                <ProjectThumbnail 
                    key={project._id} 
                    data={project} 
                    adminMode={true}
                    index={index + 1} />
            ))}
            </div>
        </main>
        <div className="h-screen fixed top-0 right-0 w-max flex flex-col pb-6 pr-4 z-10 justify-end">
            <Link href={ADMIN_NEW_CONTENT}>
                <a className="text-5xl hover:text-primary">
                    <IoAddCircle />
                </a>
            </Link>
        </div>
        </>
    )
}
    
export default ProjectsAdminPage;
    
    
export async function getServerSideProps() {
    try {
        const projects = await getAllProjects(true);
        return {
            props : {
                allProjects : JSON.stringify(projects)
            }
        }
    } 
    catch (error) {
        console.log(error)
        return {
            props : {
                allProjects : []
            }
        }
    }
}