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
        url : '/'
    },
    projects : {
        name : 'projects',
        url : '/projects'
    },
    blogs : {
        name : 'blogs',
        url : '/blogs'
    },
    designs : {
        name : 'designs',
        url : '/designs'
    },
    contact : {
        name : 'contact me',
        url : '/contact'
    },
}


const ADMIN_PATH = '/admin'
export const ADMIN_NEW_CONTENT = ADMIN_PATH + '/new-content';
export const ADMIN_ACCOUNT = ADMIN_PATH + '/';
export const ADMIN_RESET = ADMIN_PATH + '/password-reset';


export const ADMIN_URLS = {
    dashboard : {
        name : 'dashboard',
        url : ADMIN_PATH + '/dashboard'
    },
    projects : {
        name : 'projects',
        url : ADMIN_PATH + '/projects'
    },
    blogs : {
        name : 'blogs',
        url : ADMIN_PATH + '/blogs'
    },
    designs : {
        name : 'designs',
        url : ADMIN_PATH + '/designs'
    },
    inbox : {
        name : 'inbox',
        url : ADMIN_PATH + '/inbox'
    },
    notes : {
        name : 'notes',
        url : ADMIN_PATH + '/notes'
    },
    tags : {
        name : 'tags',
        url : ADMIN_PATH + '/tags'
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


export function getEmptyState(steps) {
    const obj = {}
    steps.forEach(({field}) => obj[field] = '')
    return obj;
}


export const LOGIN_STEPS = [
    {
        field : 'email',
        desc : `Admin email ID`,
        constraints : {
            empty : {
                message : "Email must be non-empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            valid : {
                message : "Email must be valid",
                check(value){
                    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return re.test(value)
                }
            },
        }      
    },
    {
        field : 'password',
        desc : `Admin password`,
        constraints : {
            empty : {
                message : "Password cannot be empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "Password must be at least 6 characters long",
                check(value){
                    return value.trim().length >= 6
                }
            },
        }
            
    },
]

export const REGISTER_STEPS = [
    ...LOGIN_STEPS,
]

export const RESET_PASSWORD_STEPS = [
    ...LOGIN_STEPS,
    {
        field : 'secret',
        desc : `Admin secret`,
        constraints : {
            empty : {
                message : "secret cannot be empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "secret must be at least 6 characters long",
                check(value){
                    return value.trim().length >= 6
                }
            },
        }
            
    },
]


export const MESSAGE_STEPS = [
    {
        field : 'name',
        desc : `Let's start off with your name`,
        constraints : {
            empty : {
                message : "Your name must not be empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "Your name must have at least 2 characters",
                check(value){
                    return value.trim().length >= 2
                }
            },
            alpha : {
                message : "Your name can only contain characters from the English alphabet",
                check(value){
                    const re = /^[a-zA-Z]+[\sa-zA-Z]*$/g
                    return re.test(value.trim())
                }
            },
        }    
    },
    {
        field : 'email',
        desc : `Your email ID where I can mail you`,
        constraints : {
            empty : {
                message : "Email must be non-empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            valid : {
                message : "Email must be valid",
                check(value){
                    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return re.test(value)
                }
            },
        }      
    },
    {
        field : 'message',
        desc : `Please type in your message →`,
        constraints : {
            empty : {
                message : "Message body required",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "Maximum of 700 characters allowed",
                check(value){
                    const temp = value.trim();
                    return temp.length < 700 && temp.length > 0 
                }
            },
            max : {
                message : "Message body must be at least 20 characters",
                check(value){
                    return value.trim().length > 20 
                }
            },
        }        
    },
]


/**
 * 
 * @param {string} str string with spaces viz blog title, project title etc
 * @returns a url safe string
 */
export function formatURLParamString(str) {
    return str.trim().split(' ').join('+');
}

/**
 * 
 * @param {string} str string with plus viz blog title, project title etc
 * @returns a db title string
 */
export function deFormatURLParamString(str) {
    return str.split('+').join(' ');
}


export const NAV_LINK_DESCRIPTIONS = {
    '/' : `Hey there! Please check out my portfolio website. 
        You can know more about me, what I'm working on, my projects and much more.`,
    
    '/blogs' : `Hey there! Please check out my blogs. 
        I blog about technical blogs, code solutions, programming concepts and much more.
        Please check them out!`,
    '/blogs/[slug]' : `Hey there! Please check out my blogs. 
        I blog about technical blogs, code solutions, programming concepts and much more.
        Please check them out!`,
    
    '/designs' : `Hey there! Please check out my UI/UX designs. \nI try to implement UI/UX designs, scroll animations etc for different app-ideas and digital products. \nCheck out the list of public designs that I've created.`,
    '/designs/[design]' : `Hey there! Please check out my UI/UX designs. \nI try to implement UI/UX designs, scroll animations etc for different app-ideas and digital products. \nCheck out the list of public designs that I've created.`,

    '/projects' : `Hey there! Please check out my projects. \nI love creating all kinds of practical projects viz. front-end projects, full stack projects, console apps etc . \nCheck out the list of projects that I've created and published.`,
    '/projects/[name]' : `Hey there! Please check out my projects. \nI love creating all kinds of practical projects viz. front-end projects, full stack projects, console apps etc . \nCheck out the list of projects that I've created and published.`,
    
    
    '/contact' : `Have a project idea in mind? Want to work with me or hire me? Please feel free to send me a message. I will get back to you ASAP!`,
    
}

