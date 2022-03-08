// Tags API

import { addNewTag, deleteExistingTag } from "../../../database/tags";
import {TagValidator} from '../../../utils/validator'

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