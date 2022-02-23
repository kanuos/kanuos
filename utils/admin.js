export const LAYOUTS = {
    link : ['label', 'href'],
    outro : ['heading', 'text'],
    code : ['language', 'code', 'file'],
    typography : ['family', 'desc'],
    color : ['name', 'hex'],
}

export const CONTENT_TYPE = {
    blog : {
        name : 'blog',
        fields : [
            {
                key : 'title',
                type : 'string',
                required : true,
                check : {
                    empty(value='') {
                        return value.trim().length > 0
                    },
                    min(value='') {
                        return value.trim().length > 3
                    },
                    max(value='') {
                        return value.trim().length < 100
                    },
                }
            },
            {
                key : 'slug',
                type : 'slug',
                required : false,
            },
            {
                key : 'desc',
                type : 'string',
                required : true,
                check : {
                    empty(value='') {
                        return value.trim().length > 0
                    },
                    min(value='') {
                        return value.trim().length > 10
                    },
                    max(value='') {
                        return value.trim().length < 1000
                    },
                }
            },
            {
                key : 'tags',
                type : 'tags',
                required : true,
                check : {
                    empty(value=[]) {
                        return value.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'page',
                type : 'page',
                required : true,
                check : {
                    empty(heading='', value=[]) {
                        return heading.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'repo',
                type : 'obj',
                layout : LAYOUTS.link,
                required : false
            },
            {
                key : 'demo',
                type : 'obj',
                layout : LAYOUTS.link,
                required : false
            },
            {
                key : 'outro',
                type : 'obj',
                layout : LAYOUTS.outro,
                required : false
            },
        ]
    },
    project : {
        name : 'project',
        fields : [
            {
                key : 'title',
                type : 'string',
                required : true,
                check : {
                    empty(value='') {
                        return value.trim().length > 0
                    },
                    min(value='') {
                        return value.trim().length > 3
                    },
                    max(value='') {
                        return value.trim().length < 100
                    },
                }
            },
            {
                key : 'desc',
                type : 'string',
                required : true,
                check : {
                    empty(value='') {
                        return value.trim().length > 0
                    },
                    min(value='') {
                        return value.trim().length > 10
                    },
                    max(value='') {
                        return value.trim().length < 1000
                    },
                }
            },
            {
                key : 'tags',
                type : 'tags',
                required : true,
                check : {
                    empty(value=[]) {
                        return value.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'difficulty',
                type : 'select',
                required : false,
                option : ['beginner', 'intermediate', 'advance'],
            },
            {
                key : 'chapters',
                type : 'page',
                required : true,
                check : {
                    empty(value=[]) {
                        return value.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'prerequisites',
                type : 'array',
                required : true,
                check : {
                    empty(value=[]) {
                        return value.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'techStack',
                type : 'array',
                required : true,
                check : {
                    empty(value=[]) {
                        return value.length > 0 && value.every(Boolean)
                    },
                }
            },
            {
                key : 'repo',
                type : 'obj',
                layout : LAYOUTS.link,
                required : false
            },
            {
                key : 'demo',
                type : 'obj',
                layout : LAYOUTS.link,
                required : false
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
    CONTENT_TYPE[type].fields.forEach(el => {
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