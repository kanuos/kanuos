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
    contact : {
        name : 'contact me',
        url : '/contact',
        desc : "To work with me for UI/UX designing and development, full-stack development etc connect with me via email or the in-app messenger. "
    },
}


const ADMIN_PATH = '/admin'
export const ADMIN_NEW_CONTENT = ADMIN_PATH + '/new-content';


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
    inbox : {
        name : 'inbox',
        url : ADMIN_PATH + '/inbox',
        desc: 'list of all messages in tabular manner, create/read/delete/edit design in ADMIN mode'
    },
    notes : {
        name : 'notes',
        url : ADMIN_PATH + '/notes',
        desc: 'list of all plans and ideas in tabular manner, create/read/delete/edit design in ADMIN mode'
    },
    tags : {
        name : 'tags',
        url : ADMIN_PATH + '/tags',
        desc: 'list of all tags in tabular manner, create/read/delete/edit design in ADMIN mode'
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
    {
        field : 'question',
        desc : `Security question`,
        constraints : {
            empty : {
                message : "Question cannot be empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "Question must be at least 6 characters long",
                check(value){
                    return value.trim().length >= 6
                }
            },
            max : {
                message : "Question must be at most 100 characters long",
                check(value){
                    return value.trim().length <= 100
                }
            },
        }   
    },
    {
        field : 'answer',
        desc : `Security answer`,
        constraints : {
            empty : {
                message : "Answer cannot be empty",
                check(value){
                    return value.trim().length > 0
                }
            },
            min : {
                message : "Answer must be at least 6 characters long",
                check(value){
                    return value.trim().length >= 6
                }
            },
            max : {
                message : "Answer must be at most 100 characters long",
                check(value){
                    return value.trim().length <= 100
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