import { Schema, model, models} from 'mongoose'

// Tag Schema for maintaining tags for references to other content models
const TagSchema = new Schema({
    tag : {
        type: String,
        unique: true,
        required: true
    }
})


// Note Schema for notes and future ideas plans
const NoteSchema = new Schema({
    title : {
        type : String,
        unique : true,
        required :  true
    },
    feature : {
        type : String,
        required :  true
    },
    isComplete : {
        type: Boolean,
        default: false
    }
})


// Blog Schema for CRUD operations of Blogs
const BlogSchema = new Schema({
    title : {
        type : String,
        required: true,
        unique : true,
    },
    slug : {
        type : String,
        required: true,
        unique: true,
    },
    desc : {
        type : String,
        required: true,
    },
    tags : [
        {
            type : Schema.Types.ObjectId,
            ref : 'tag'
        }
    ],
    date : {
        type : Date,
        default: Date.now
    },
    page : [
        {
            type: Object
        }
    ],
    repo : {
        type: Object
    },
    demo : {
        type: Object
    },
    outro : {
        type: Object
    },
    isPublic : {
        type: Boolean,
        default : false
    },
    user : {
        // User Model ref 
        type: Object
    },
})


// Message schema for incoming client messages and admin management of the same
const MessageSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    isRead : {
        type : Boolean,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    },
})















export const TagModel = models.tag || model('tag', TagSchema);
export const NoteModel = models.note || model('note', NoteSchema);
export const BlogModel = models.blog || model('blog', BlogSchema);
export const MessageModel = models.message || model('message', MessageSchema);