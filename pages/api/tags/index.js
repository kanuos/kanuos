// Tags API

import { addNewTag, deleteExistingTag } from "../../../database/tags";
import {TagValidator} from '../../../utils/validator'
import { isAdminMiddleware } from "../../../utils/authLib";

export default async function (req, res) {
    try {
        const { loggedAsAdmin, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

        const {method, body, query} = req;
        switch(method.toLowerCase()){
            case 'post':
                // validate incoming tag from body
                const {error, value} = TagValidator.validate(body);
                if (error) {
                    throw error.details[0].message;
                }
                // add tag to DB
                return res.json({tag : await addNewTag(value.tag)})
            
            case 'delete':
                const {tag} = query;
                if (!tag) throw 'Tag ID is required'

                return res.json({tag : await deleteExistingTag(tag)})

            default:
                throw 'Invalid method'
        }

    } 
    catch (error) {
        return res.json({tag : null, error : error})
    }
}