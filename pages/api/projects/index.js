//  PROJECT API

import { addProjectToDB, projectUniqueConstraint } from "../../../database/projects";
import { ContentValidators } from "../../../utils/validator";

export default async function (req, res) {
    let projectValidator;
    try {
        const { method, body } = req;

        // TODO: auth

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
                const newProject = await addProjectToDB(projectValidator.value);

                if (!newProject) throw 'Project coudln\'t be added!'

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