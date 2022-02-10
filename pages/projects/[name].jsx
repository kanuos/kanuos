// Project Detail View

// import : internal
import { ProjectDetailBody } from '../../components/content/ProjectDetailBody';
import { HeadComponent } from '../../components/Head'


const ProjectDetail = () => {
  return (
    <>
    <HeadComponent title={project.name} />
    {/* navbar goes here */}
    <ProjectDetailBody project={project} />
    </>
  )
}

export default ProjectDetail




const project = {
    name : `Moovey`,
    date : Date.now(),
    tags : ['Express', 'PostgreSQL', 'Session', 'EJS', 'Tailwind'],
    desc : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    difficulty: 'intermediate',
    prerequisites : [
        "Basic JavaScript knowledge",
        "Basic understanding of HTTP request/response cycle",
        "HTML and CSS",
        "Basic PostgreSQL DML queries",
        "Beginner level understanding of Git"
    ],
    chapters : [
        {
            segmentHeading : 'Installation & setup',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
        {
            segmentHeading : 'Planning the API',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
        {
            segmentHeading : 'Database and Models',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
        {
            segmentHeading : 'Creating the server',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
        {
            segmentHeading : 'REST Endpoints',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
        {
            segmentHeading : 'Security and Middlewares',
            content: [
            {
                type : 'subheading',
                content : `brushing up required skills`
            },
            {
                type : 'text',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'quote',
                content : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
            },
            {
                type : 'code',
                code : `def is_even(n):
                return n % 2 == 0`,
                filename : 'index.py',
                language : 'python'
            },
            ]
        },
    ],
    outro : {
        heading : 'summary',
        text : `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis ipsum totam rem ut, tempora architecto quas dolore suscipit blanditiis molestiae quisquam sed ullam earum facilis asperiores culpa minima accusantium possimus, recusandae voluptatem debitis similique quod. Libero iste recusandae nam culpa quasi aliquid, deserunt sunt non necessitatibus optio dolor accusantium natus.`,
        repo : `https://www.github.com/kanuos`,
        demo : `https://www.netlify.com/`,
    },
    isPublic : true,
    user : {
        name : 'sounak mukherjee',
        link : { text : '@kanuos', url : 'https://www.github.com/kanuos'},
        about : `Libero iste recusandae nam culpa quasi aliquid, deserunt sunt non necessitatibus optio dolor accusantium natus.`
    }
    
}