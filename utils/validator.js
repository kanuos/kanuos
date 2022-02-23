import Joi from "joi";


export const TagValidator = Joi.object({
    _id : Joi.any(),
    tag : Joi.string().trim().required()
})

const SegmentValidator = Joi.object({
    _id : Joi.any(),
    heading : Joi.string().trim().required(),
    index : Joi.any(),
    steps : Joi.array().items(Joi.object({
        _id : Joi.any(),
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
                    href : Joi.string().required(),
                }).length(2),
            ]
        // value : Joi.object({
        //     subHeading : Joi.string().trim(),
        //     text : Joi.string().trim(),
        //     code : Joi.object({
        //         file : Joi.string().trim(),
        //         language : Joi.string().trim(),
        //         code : Joi.string().trim(),
        //     }),
        //     quote : Joi.string().trim(),
        //     image : Joi.string().trim(),
        //     reference : Joi.object({
        //         label : Joi.string().trim(),
        //         href : Joi.string().trim(),
        //     })
        // })
    
    })).min(1),         
})

const CommonFields = Joi.object().keys({
    _id : Joi.any(),
    title : Joi.string().required().trim().min(1).lowercase(),
    desc : Joi.string().required().trim().min(1).lowercase(),
    date : Joi.date().allow('').default(Date.now()),
    tags : Joi.array().items(TagValidator).min(1),
    isPublic : Joi.bool().default(false),
    user : Joi.any(),
    repo : Joi.object({
        label : Joi.string().required(),
        href : Joi.string().required(),
    }).length(2),
    demo : Joi.object({
        label : Joi.string().required(),
        href : Joi.string().required(),
    }).length(2),
})


export const BlogValidator = CommonFields.keys({
    slug : Joi.string().required().trim().min(1).lowercase(),
    outro : Joi.object({
        heading : Joi.string().trim(),
        text : Joi.string().trim(),
    }).length(2),
    page : Joi.array().items(SegmentValidator),
})

export const ProjectValidator = CommonFields.keys({
    techStack : Joi.array().items(Joi.object({
        _id : Joi.any(),
        text : Joi.string().trim().required()
    }).max(2).min(1)).min(1),
    difficulty : Joi.string().lowercase().required().default('beginner'),
    category : Joi.string().required(),
    prerequisites : Joi.array().items(Joi.object({
        _id : Joi.any(),
        text : Joi.string().trim()
    }).max(2).min(1)).min(1),
    outro : Joi.object({
        heading : Joi.string().trim(),
        text : Joi.string().trim(),
    }).length(2),
    chapters : Joi.array().items(SegmentValidator),
})
