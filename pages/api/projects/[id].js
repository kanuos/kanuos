//  Project API
// individual Project operations
// ADMIN only access routes

import { deleteProjectFromDB, editIndividualProject } from "../../../database/projects"

import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    let projectValidator;
    
    try {
        
        const { method, body, cookies,  query : {id} } = req;

        const authCookie = cookies?.[JWT_COOKIE_NAME];
        
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
                const deletedProject = await deleteProjectFromDB(id, user._id);
                return res.json({
                    data: deletedProject,
                    err : false
                })

            case 'patch':
                // Edit existing project document
                // receives patchedProject data from the incoming request body 
                projectValidator = ContentValidators.project.validate(body);

                // check for validation error
                if (projectValidator.error) throw projectValidator.error.details[0].message;
                
                // try to update the project with sanitized data
                const updatedProject = await editIndividualProject(id, projectValidator.value, user._id);

                return res.json({
                    data : updatedProject,
                    err : false
                })
                
            default :
                throw 'Invalid method'
            }
    } 
    catch (err) {
        console.log(err)
        return res.json({
            data : err,
            err : true,
        })
    }
}