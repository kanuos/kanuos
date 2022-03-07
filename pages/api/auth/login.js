// LOGIN API
// method allwowed : POST
import { serialize, parse } from 'cookie'

import { loginAdmin } from "../../../database/user";
import { COOKIE_OPTIONS, JWT_COOKIE_NAME } from '../../../utils/admin';
import { generateAccessToken, getPayloadFromToken } from "../../../utils/encrypt";
import { AuthValidators } from "../../../utils/validator";


export default async function (req, res) {
    try {
        const { method, body } = req;    
        
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
        
        // only allow post methods to log admin
        if (method.toLowerCase() !== 'post') throw 'Invalid method'
        
        // validate incoming credentials
        const {error, value} = AuthValidators.login.validate(body);
        if (error) throw error.details[0].message;

        // get admin with credentials from db
        const adminFromDB = await loginAdmin(value);
        if (!adminFromDB) throw 'Admin not found!'

        // if admin exists generate jwt access token 
        
        // create jwt token
        const accessToken = await generateAccessToken(adminFromDB.email, adminFromDB._id);
        
        // create a cookie that will be attached to the response
        const cookie = serialize(JWT_COOKIE_NAME, accessToken, COOKIE_OPTIONS)

        if (cookie) {
            res.setHeader('Set-Cookie', cookie)
        }

        // return success
        return res.json({
            data : adminFromDB._id,
            err : false
        })
    } 
    catch (error) {
        console.log({error})
        return res.json({
            data : error,
            err : true
        })
    }
}
