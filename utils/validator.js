import Joi from "joi";


export const TagValidator = Joi.object({
    _id : Joi.any(),
    __v : Joi.any(),
    tag : Joi.string().trim().required()
})


const SegmentValidator = Joi.object({
    _id : Joi.any(),
    __v : Joi.any(),
    heading : Joi.string().trim().required(),
    index : Joi.any(),
    steps : Joi.array().items(Joi.object({
        _id : Joi.any(),
        __v : Joi.any(),
        key : Joi.string().trim().required(),
        value : [
                Joi.string().trim().required(),
                Joi.object({
                    code : Joi.string().required(),
                    language : Joi.string().required(),
                    file : Joi.string().required(),
                }).length(3), 
                Joi.object({
                    label : Joi.string().required(),
                    href : Joi.string().required().uri(),
                }).length(2),
            ]
    })),         
})


const CommonFields = Joi.object().keys({
    _id : Joi.any(),
    __v : Joi.any(),
    title : Joi.string().required().trim().min(1),
    desc : Joi.string().required().trim().min(1),
    date : Joi.date().allow('').default(Date.now()),
    tags : Joi.array().items(TagValidator).min(1),
    isPublic : Joi.bool().default(false),
    user : Joi.any(),
    repo : Joi.any().allow(Joi.object({
        label : Joi.string().trim(),
        href : Joi.string().trim().uri(),
    }).length(2)),
    demo : Joi.any().allow(Joi.object({
        label : Joi.string().trim(),
        href : Joi.string().trim().uri(),
    }).length(2)),
})


const BlogValidator = CommonFields.keys({
    slug : Joi.string().required().trim().min(1).lowercase(),
    outro : Joi.object({
        heading : Joi.string().trim(),
        text : Joi.string().trim(),
    }).length(2).required(),
    page : Joi.array().items(SegmentValidator).min(1).required(),
})


const ProjectValidator = CommonFields.keys({
    techStack : Joi.array().items(Joi.object({
        _id : Joi.any(),
        __v : Joi.any(),
        text : Joi.string().trim().required()
    }).max(2).min(1)).min(1),
    difficulty : Joi.string().lowercase().required().default('beginner'),
    category : Joi.string().required(),
    prerequisites : Joi.array().items(Joi.object({
        _id : Joi.any(),
        __v : Joi.any(),
        text : Joi.string().trim()
    }).max(2).min(1)).min(1),
    outro : Joi.object({
        heading : Joi.string().trim(),
        text : Joi.string().trim(),
    }).length(2),
    chapters : Joi.array().items(SegmentValidator).min(1).required(),
})


export const NoteValidator = Joi.object({
    _id : Joi.any(),
    __v : Joi.any(),
    title : Joi.string().trim().required().lowercase(),
    feature : Joi.string().trim().required(),
    isComplete : Joi.bool().default(false)
})


export const MessageValidator = Joi.object({
    name : Joi.string().regex(/^[a-zA-Z ]+$/).trim().required().min(2).max(100).messages({
        'any.required' : `Please don't try to hack my site`,
        'string.empty' : `Whoops! I didn't get your name..`,
        'string.pattern.base' : `Errr! Please make sure your name contains only characters from the Enligsh alphabet`,
        'string.min' : `Hmph! Your name should be at least 2 characters long`,
        'string.max' : `Sorry for the inconvenience! In case your full name is longer than 100 characters, please provide your first name`,
    }),
    email : Joi.string().trim().lowercase().email({
        tlds : false,
        allowUnicode : false
    }).messages({
        'any.required' : `Please don't try to hack my site`,
        'string.email' : `Please provide a valid email ID so that I can reach out to you`,

    }),
    message : Joi.string().trim().required().min(10).max(800).messages({
        'any.required' : `Please don't try to hack my site`,
        'string.empty' : `Whoops! You probably forgot to type in your message for me`,
        'string.min' : `Hmph! Your message should be at least 10 characters long`,
        'string.max' : `Sorry for the inconvenience! Please keep your message length limited to 800 characters`,
    })
})






export const ContentValidators = {
    blog : BlogValidator,
    project : ProjectValidator
}