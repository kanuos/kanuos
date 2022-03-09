//  DESIGN API
// individual Design operations
// ADMIN only access routes


import { deleteDesignFromDB, updateDesignByID } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib"
import { ContentValidators } from "../../../utils/validator";


export default async function (req, res) {
    let designValidator;
    try {
        const { method, body, query : {id} } = req;

        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

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