//  DESIGN API
// individual Design operations
// ADMIN only access routes


import { deleteDesignFromDB, updateDesignByID } from "../../../database/designs";

import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    let designValidator;
    try {
        const { method, body, query : {id} } = req;

        const cookie = req.cookies;
        
        if (!cookie) throw 'Not logged in'
        const authCookie = cookie[JWT_COOKIE_NAME];
        if (!authCookie){
            throw 'Not logged in'
        }
        const tokenPayloadObject = await getPayloadFromToken(authCookie);
        if (!tokenPayloadObject.payload) {
            throw 'Unauthorized'
        }
        const user = tokenPayloadObject.payload;

        switch(method.toLowerCase()) {
            case 'delete':
                const deletedDesign = await deleteDesignFromDB(id, user._id);
                return res.json({
                    data: deletedDesign,
                    err : false
                })

            case 'patch':
                // Create a new Design document
                // receives newDesign data from the incoming request body 
                designValidator = ContentValidators.design.validate(body);

                // check for validation error
                if (designValidator.error) throw designValidator.error.details[0].message;
                
                // try to update the Design with sanitized data
                const updatedDesign = await updateDesignByID(id, designValidator.value, user._id);

                return res.json({
                    data : updatedDesign,
                    err : false
                })
                
            default :
                throw 'Invalid method'
            }
    } 
    catch (err) {
        console.log('line44 ',err)
        return res.json({
            data : err,
            err : true,
        })
    }
}