// Design API

import { addDesignToDB } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib"
import { ContentValidators } from "../../../utils/validator";

export default async function (req, res) {
    try {
        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

        const {method, body} = req;
        
        switch(method.toLowerCase()) {
            // Add new design to DB
            case 'post':
                // validate incoming request body with the design valiator
                let parsedBody = JSON.parse(JSON.stringify(body))
                const {error, value} = ContentValidators.design.validate(parsedBody);
                if (error) throw error.details[0].message;

                const design = {...value, user};

                const newDesign = await addDesignToDB(design);

                if (!newDesign) throw 'Couldnt add design to DB'

                return res.json({
                    error: false,
                    data : newDesign
                })
            default :
                throw 'Invalid method'
        }
    } 
    catch (error) {
        console.log(error)
        return res.json({
            error : true,
            data : error
        })
    }
}