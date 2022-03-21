import { AUTH_ROUTES } from "./admin"

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
    link        : 'link',
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

export const SOCIAL = {
    email : 'sounakmukherjee@ymail.com',
    phone : '+1 (607) 280-5640',
    credential : 'full stack developer',
    mailto : `mailto:sounakmukherjee@ymail.com?subject=Let's work together`
}

export const PORTFOLIO_LINKS = {
    "about me" : {
        name : 'about me',
        url : '/#about-me'
    },
    "selected works" : {
        name : 'selected works',
        url : '/#work'
    },
    "contact me" : {
        name : 'contact me',
        url : '/#contact-me'
    },
}

export const NAV_METADATA = {
    public : {
        links : PUBLIC_URLS,
        other : {
            heading : 'My portfolio',
            link : '/portfolio'
        },
        social : SOCIAL_LINKS,
        contact : SOCIAL
    },
    portfolio : {
        links : PORTFOLIO_LINKS,
        other : {
            heading : 'Check out my website',
            link : '/',
            sublinks : PUBLIC_URLS
        },
        social : SOCIAL_LINKS,
        contact : SOCIAL
    },
    admin : {
        links : ADMIN_URLS,
        other : {
            heading : 'Logout',
            link : AUTH_ROUTES.logout,
        },
        social : {
            'main site' : '/'
        }
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



export function isValidURL(href) {
    try {
        new URL(href)
        return true;
    } 
    catch (error) {
        return false;
    }
}