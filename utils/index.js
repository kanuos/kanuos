export const CLIENT_TYPE = {
    blog : {
        name : 'blogs',
        url : '/blogs'
    },
    project : {
        name : 'projects',
        url : '/projects'
    },
    design : {
        name : 'designs',
        url : '/designs'
    },
}


export const STEP_TYPE = {
    text        : 'text',
    code        : 'code',
    subheading  : 'subheading',
    quote       : 'quote',
    image       : 'image',
    reference   : 'reference',
}


export const SOCIAL_LINKS = {
    linkedin : 'https://www.linkedin.com/sounak',
    github : 'https://www.github.com/kanuos',
    gitlab : 'https://www.gitlab.com/kanuos',
    twitter : 'https://www.twitter.com/kanuos',
}


export const PUBLIC_URLS = {
    home : {
        name : 'home',
        url : '/',
        desc : "Check out my portfolio where I display some of my projects, download my resume, know about me, what I am working on etc."
    },
    projects : {
        name : 'projects',
        url : '/projects',
        desc : "I love working on new projects, may it be a full stack project or a front end UI/UX implementation or a web-app/mobile-app. This page lists all the published projects. Check them out now!"
    },
    blogs : {
        name : 'blogs',
        url : '/blogs',
        desc : "I write technical blogs on how-to-do something, program solutions, data-structure and algorithm concepts and much more. Here's a list of all the public blogs"
    },
    designs : {
        name : 'designs',
        url : '/designs',
        desc : "Wireframing, sketching, prototyping of UI/UX designs for various applications viz. social media platforms, shopping cart apps, landing pages and much more. Check out the list of published UI/UX designs here."
    },
}


const ADMIN_PATH = '/admin'


export const ADMIN_URLS = {
    setting : {
        name : 'profile settings',
        url : ADMIN_PATH + '/setting',
        desc: 'Change password/security question, site metadata and more'
    },
    portfolio : {
        name : 'portfolio management',
        url : ADMIN_PATH + '/portfolio',
        desc: 'Update portfolio metadata viz. name, email, social accounts, about me, bio, project showcase etc'
    },
    new : {
        name : 'new content',
        url : ADMIN_PATH + '/new-content',
        desc: 'Create new blog, project, design...'
    },
    projects : {
        name : 'projects',
        url : ADMIN_PATH + '/projects',
        desc: 'list of all projects in tabular manner, create/read/delete/edit project in ADMIN mode'
    },
    blogs : {
        name : 'blogs',
        url : ADMIN_PATH + '/blogs',
        desc: 'list of all blogs in tabular manner, create/read/delete/edit blog in ADMIN mode'
    },
    designs : {
        name : 'designs',
        url : ADMIN_PATH + '/designs',
        desc: 'list of all designs in tabular manner, create/read/delete/edit design in ADMIN mode'
    },
}


export const PUBLIC_LIST_TYPES = {
    blogs : {
        title : 'My Blogs',
        desc : `Here's a list of all my blogs, code solutions, programming solutions and concepts and more..`,
        type: 'blogs'
    },
    projects : {
        title : 'My Projects',
        desc : `Here's a list of all my front-end projects, CSS UI/UX recreations, static page creations, full stack projects, backend projects, API creation and lot more`,
        type: 'projects'
    },
    designs : {
        title : 'My Designs',
        desc : `Here's a list of all my UI/UX designs for landing pages, website designs, app designs, different products and more`,
        type: 'designs'
    },
}