// Design API

import { addDesignToDB } from "../../../database/designs";

import { parse } from "cookie";
import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    try {
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

        const {method, body} = req;
        
        switch(method.toLowerCase()) {
            // Add new design to DB
            case 'post':
                // validate incoming request body with the design valiator
                let parsedBody = JSON.parse(JSON.stringify(body))
                const {error, value} = ContentValidators.design.validate(parsedBody);
                if (error) throw error.details[0].message;

                const design = {...value, user};

                console.log(design)

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