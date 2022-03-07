// Auth API :: register

import { parse } from "cookie";
import { registerUser } from "../../../database/user";
import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { getPayloadFromToken } from "../../../utils/encrypt";
import { AuthValidators } from "../../../utils/validator";



export default async function(req, res) {
    try {
        const {body, method} = req;
        
        if (req.headers.cookie){
            const authCookie = parse(req.headers.cookie)[JWT_COOKIE_NAME];
            if (authCookie){
                const tokenPayloadObject = await getPayloadFromToken(authCookie);
                if (tokenPayloadObject.payload) {
                    console.log(tokenPayloadObject.payload, Date.now())
                    throw 'Already logged in!'
                }
            }
        }

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