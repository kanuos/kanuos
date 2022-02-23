import { Schema, model, models} from 'mongoose'

const TagSchema = new Schema({
    tag : {
        type: String,
        unique: true,
        required: true
    }
})

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



export const TagModel = models.tag || model('tag', TagSchema);
export const NoteModel = models.note || model('note', NoteSchema);