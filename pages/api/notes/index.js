// Notes API

import { addNewNote, deleteExistingNote, editExistingNote } from '../../../database/notes';
import { NoteValidator } from '../../../utils/validator'

import { parse } from "cookie";
import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    const authCookie = parse(req.headers.cookie)[JWT_COOKIE_NAME];
    if (!authCookie){
        throw 'Not logged in'
    }
    const tokenPayloadObject = await getPayloadFromToken(authCookie);
    if (!tokenPayloadObject.payload) {
        throw 'Unauthorized'
    }

    try {
        const {method, body, query} = req;
        switch(method.toLowerCase()){
            case 'post':
                body.isComplete = Boolean(body.isComplete)
                // validate incoming note from body
                const {error, value} = NoteValidator.validate(body);
                if (error) {
                    throw error.details[0].message;
                }
                // add note to DB
                return res.json({newNote : await addNewNote(value)})
            

            case 'delete':
                const {note} = query;
                if (!note) throw 'note ID is required'
                return res.json({deletedNote : await deleteExistingNote(note)})
                
                
            case 'patch':
                const queryNote = query.note;
                if (!queryNote) throw 'note ID is required'
                const sanitizedData = NoteValidator.validate(body);
                if (sanitizedData.error) {
                    throw sanitizedData.error.details[0].message;
                }
                delete sanitizedData.value._id
                delete sanitizedData.value.__v
                return res.json({editedNote : await editExistingNote(queryNote, sanitizedData.value)})

            default:
                throw 'Invalid method'
        }

    } 
    catch (error) {
        console.log(error)
        return res.json({note : null, error : error})
    }
}