//  PROJECT API

import { addProjectToDB, projectUniqueConstraint } from "../../../database/projects";
import { parse } from "cookie";
import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    
    let projectValidator;
    try {
        const { method, body, cookies } = req;
        
        const authCookie = cookies?.[JWT_COOKIE_NAME];
        if (!authCookie){
            throw 'Not logged in'
        }
        const tokenPayloadObject = await getPayloadFromToken(authCookie);
        if (!tokenPayloadObject.payload) {
            throw 'Unauthorized || expired token'
        }

        const user = tokenPayloadObject.payload;

        switch(method.toLowerCase()) {
            case 'post':
                // Create a new Project document
                // receives newProject data from the incoming request body 
                projectValidator = ContentValidators.project.validate(body);

                // check for validation error
                if (projectValidator.error) throw projectValidator.error.details[0].message;


                // check whether Project exists
                const existingProject = await projectUniqueConstraint(projectValidator.value)
                if (existingProject) throw 'Project existis @ _id : ' + existingProject._id;

                
                // add the sanitized Project data to DB
                const project = projectValidator.value;
                project.user = user;
                const newProject = await addProjectToDB(project);

                if (!newProject) throw 'Project couldn\'t be added!'

                return res.json({
                    data : newProject,
                    err : false
                })
                
            default :
                throw 'Invalid method'
            }
    } 
    catch (err) {
        return res.json({
            data : err,
            err : true,
        })
    }
}