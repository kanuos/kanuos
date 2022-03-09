// Auth API :: register

import { registerUser } from "../../../database/user";
import { AuthValidators } from "../../../utils/validator";
import { isAdminMiddleware } from "../../../utils/authLib"



export default async function(req, res) {
    try {
        const {body, method} = req;
        
        const { loggedAsAdmin } = await isAdminMiddleware(req, res);
        if (loggedAsAdmin) throw 'Already logged in!'

        // only post method allowed
        switch(method.toLowerCase()) {
            case 'post':
                // validate incoming request body
                let {error, value} = AuthValidators.register.validate(body);
                if (error) throw error.details[0].message;

                // encrypt
                const registeredUser = await registerUser(value);
                if (!registeredUser) throw `Admin creation failed`

                return res.json({
                    err: false,
                    data : registeredUser.email
                })
            
            default:
                throw 'Invalid method'
        }
    } 
    catch (error) {
        console.log(error)
        return res.json({
            err: true,
            data : error
        })
    }
}