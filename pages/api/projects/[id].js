//  Project API
// individual Project operations
// ADMIN only access routes

import { deleteProjectFromDB, editIndividualProject } from "../../../database/projects"
import { isAdminMiddleware } from "../../../utils/authLib"
import { ContentValidators } from "../../../utils/validator";


export default async function individualProjectAPIHandler (req, res) {
    let projectValidator;
    
    try {
        
        const { method, body, query : {id} } = req;
        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

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