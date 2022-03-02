// Design API

import { addDesignToDB } from "../../../database/designs";
import { ContentValidators } from "../../../utils/validator";

export default async function (req, res) {
    try {
        const {method, body} = req;
        
        // TODO: auth
        switch(method.toLowerCase()) {
            // Add new design to DB
            case 'post':
                // validate incoming request body with the design valiator
                let parsedBody = JSON.parse(JSON.stringify(body))
                const {error, value} = ContentValidators.design.validate(parsedBody);
                if (error) throw error.details[0].message;

                const newDesign = await addDesignToDB(value);

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
        return res.json({
            error : true,
            data : error
        })
    }
}