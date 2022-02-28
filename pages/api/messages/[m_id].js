// Messages API
// URL : /api/messages/m_id
// query m_id → mongoose ObjectID
// Access : ADMIN
import { deleteMessageFromDB, toggleMessageReadStatus } from '../../../database/messages';


export default async function(req, res) {
    try {
        // destructure the incoming req object
        const {method, query : {m_id}, body : {isRead}} = req;
        
        // TODO: authorization
        
        switch(method.toLowerCase()) {
            case 'delete':
                // incoming messageID from ADMIN message management
                const deletedMessage = await deleteMessageFromDB(m_id);
                if (!deletedMessage) throw `Message with ID:${m_id} not found`
                return res.json({
                    error: false,
                    deleted : deletedMessage
                })
            
            case 'put':
                // check if incoming request body has isRead attribute
                if ([undefined, null].includes(isRead)) throw 'Current isRead status missing'

                let sanitizedIsReadStatus = Boolean(isRead);
                const editedMessage = await toggleMessageReadStatus(m_id, sanitizedIsReadStatus)
                // incoming messageID from ADMIN message management
                return res.json({
                    error: false,
                    edited : editedMessage
                })
            
            default : throw `HTTP method ${method} not allowed.`
        }
                
    } 
    catch (error) {
        return res.json({
            error : true,
            data : error
        })   
    }
}