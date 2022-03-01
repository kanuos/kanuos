
export const LAYOUTS = {
    link : ['label', 'href'],
    outro : ['heading', 'text'],
    code : ['language', 'code', 'file'],
    typography : ['family', 'desc'],
    color : ['name', 'hex'],
}



export const ADMIN_SELECT_OPTIONS = {
    difficulty : {
        beginner : 'beginner',
        intermediate : 'intermediate',
        advance : 'advance',
    },
    category : {
        front : "front end project",
        back : "server side project",
        full : "full stack project",
        mobile : "mobile app project",
        console : "console project",
    }
}



export const CONTENT_TYPE = {
    blog : {
        name : 'blog',
        fields : [
            {
                key : 'title',
                type : 'string',
            },
            {
                key : 'slug',
                type : 'slug',
            },
            {
                key : 'desc',
                type : 'string',
            },
            {
                key : 'tags',
                type : 'tags',
            },
            {
                key : 'page',
                type : 'page',
            },
            {
                key : 'repo',
                type : 'obj',
                layout : LAYOUTS.link,
            },
            {
                key : 'demo',
                type : 'obj',
                layout : LAYOUTS.link,
            },
            {
                key : 'outro',
                type : 'obj',
                layout : LAYOUTS.outro,
            },
        ]
    },
    project : {
        name : 'project',
        fields : [
            {
                key : 'title',
                type : 'string',
            },
            {
                key : 'desc',
                type : 'string',
            },
            {
                key : 'tags',
                type : 'tags',
            },
            {
                key : 'category',
                type : 'select',
                option : ADMIN_SELECT_OPTIONS.category,
            },
            {
                key : 'difficulty',
                type : 'select',
                option : ADMIN_SELECT_OPTIONS.difficulty,
            },
            {
                key : 'chapters',
                type : 'page',
            },
            {
                key : 'prerequisites',
                type : 'array',
            },
            {
                key : 'techStack',
                type : 'array',
            },
            {
                key : 'repo',
                type : 'obj',
                layout : LAYOUTS.link,
            },
            {
                key : 'demo',
                type : 'obj',
                layout : LAYOUTS.link,
            },
            {
                key : 'outro',
                type : 'obj',
                layout : LAYOUTS.outro,
            },
        ]
    },
    design : {
        name : 'design'
        // TODO: fields
    },
}


export function getEmptyTemplate(type) {
    let obj = {};
    CONTENT_TYPE[type]?.fields.forEach(el => {
        if (el.type === 'obj') {
            obj[el.key] = {}
            el.layout.forEach(item => obj[el.key][item] = '')
        }
        else if (["array", "page"].includes(el.type)) {
            obj[el.key] = []
        }
        else {
            obj[el.key] = ''
        }
    })
    return obj
}

export const PAGE_CONTENT = {
    blog :  [ 'text', 'subheading', 'quote', 'image', 'link', 'code'],
    project :  [ 'text', 'subheading', 'quote', 'image', 'link', 'code'],
    design : {
        // text, subheading, quote, image, reference, typography, color, flow
    },
}


/**
 * 
 * @param {string} type content type. can be anything [blog, project, design]
 * @param {id} id Mongoose ObjectID as param
 * @returns admin edit content url for respective type and id
 */
export const ADMIN_EDIT_URL = (type, id) => `/admin/edit-content/${type}?id=${id}`
    
    


export const API_ROUTES = {
    tags : '/api/tags',
    notes : `/api/notes`,
    blogs : `/api/blogs`,
    messages : `/api/messages`,
    projects : `/api/projects`,
}