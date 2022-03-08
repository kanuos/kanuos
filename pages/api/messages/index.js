// Messages API
// URL : /api/messages/m_id
// query m_id → mongoose ObjectID
// Access : PUT → public only, GET → admin only

import { addNewMessageToDB, getAllMessagesFromDB } from '../../../database/messages';
import { MessageValidator } from '../../../utils/validator'

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
        // destructure the incoming req object
        const {method, body} = req;
        
        
        switch(method.toLowerCase()) {
            case 'post':
                // access : public
                // incoming message from client
                // validate and sanitize the body
                const {error, value} = MessageValidator.validate(body);
                console.log(error)
                if (error) throw error.details[0].message; 

                const newMessage = await addNewMessageToDB(value);

                if (!newMessage) throw 'Something went wrong';

                return res.json({
                    error : false,
                    data : newMessage
                })
            case 'get':
                // access : private
                // ADMIN mode only
                // return all messages from DB
                const allMessages = await getAllMessagesFromDB();
                
                return res.json({
                    error : false,
                    data : allMessages
                })
            
            default : throw 'Access Denied'
        }
                
    } 
    catch (error) {
        return res.json({
            error : true,
            data : error
        })   
    }
}