// Project LIST PAGE
// import : internal
import { HeadComponent } from '../../components/Head'
import { PublicHeader } from '../../components/public/Header';
import { NavBar } from '../../components/public/Nav';
import { PUBLIC_LIST_TYPES } from '../../utils';
import { ListLoader } from '../../components/public/ListLoader';
import { ProjectThumbnail } from '../../components/content/ProjectThumbnail';


const ProjectList = () => {
  return (
    <>
    <HeadComponent title="Sounak Mukherjee's Projects" />
    <NavBar />
    <div className='main-light h-full w-full'>
        <div className='px-12 py-20 max-w-3xl mx-auto select-text selection:bg-black selection:text-light'>
            <PublicHeader data={{...PUBLIC_LIST_TYPES.projects, count : projectList.length}} />
            <main className='flex flex-col my-20 gap-20'>
                {projectList.map((project, index) => (
                    <ProjectThumbnail 
                        key={project._id} 
                        data={project} 
                        index={index + 1} />
                ))}
            </main>
            <ListLoader />
        </div>
    </div>
    </>
  )
}



export default ProjectList;


const projectList = [
    {
        _id : 1,
        title : 'Moovey',
        desc : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis ipsa amet, odio cupiditate voluptatibus nihil doloremque dolores nam suscipit temporibus cumque aut, sunt iure ad corporis harum delectus libero, laborum voluptas? Voluptates, odio omnis odit laudantium tempora animi maiores iusto delectus necessitatibus nulla autem recusandae alias, esse illo magnam.
        `,
        date: new Date().toDateString(),
        difficulty : 'Intermediate',
        category : 'Full Stack Web Dev',
        techStack : [
            'ReactJS for UI/UX',
            'React Context API for context management',
            'React Router for handling client side page routing',
            'TailwindCSS for styling',
            'PostgreSQL for database',
            'NodeJS as server-side language/runtime',
            'Express as backend framework',
            'JWT for authorization'
        ]
    },
    {
        _id : 2,
        title : 'Budgetly',
        desc : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis ipsa amet, odio cupiditate voluptatibus nihil doloremque dolores nam suscipit temporibus cumque aut, sunt iure ad corporis harum delectus libero, laborum voluptas? Voluptates, odio omnis odit laudantium tempora animi maiores iusto delectus necessitatibus nulla autem recusandae alias, esse illo magnam.
        `,
        date: new Date().toDateString(),
        difficulty : 'Beginner',
        category : 'Full Stack Web Dev',
        techStack : [
            'ReactJS for UI/UX',
            'React Context API for context management',
            'React Router for handling client side page routing',
            'Vanilla CSS for styling',
            'Firebase-store for database',
            'Firebase functions for server API',
            'Firebase-auth for authorization'
        ]
    },
    {
        _id : 3,
        title : 'BlackFist',
        desc : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quis ipsa amet, odio cupiditate voluptatibus nihil doloremque dolores nam suscipit temporibus cumque aut, sunt iure ad corporis harum delectus libero, laborum voluptas? Voluptates, odio omnis odit laudantium tempora animi maiores iusto delectus necessitatibus nulla autem recusandae alias, esse illo magnam.
        `,
        date: new Date().toDateString(),
        difficulty : 'Beginner',
        category : 'Front End Web Dev',
        techStack : [
            'VueJS for UI/UX',
            'VueX for context management',
            'Vue-Router for handling client side page routing',
            'Vanilla CSS for styling',
        ]
    }
]