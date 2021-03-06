//  PROJECT API

import { addProjectToDB, getAllProjects, projectUniqueConstraint } from "../../../database/projects";
import { isAdminMiddleware } from "../../../utils/authLib";
import { ContentValidators } from "../../../utils/validator";


export default async function projectAPIHandler (req, res) {
    
    let projectValidator;
    try {
        const { method, body } = req;
        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

        switch(method.toLowerCase()) {
            case 'get':
                const list = await getAllProjects(true);
                return res.json({
                    data : list,
                    err : false
                })
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