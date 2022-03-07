// LOGOUT API
// method allwowed : GET
import { parse, serialize } from 'cookie'

import { ADMIN_URLS } from '../../../utils';
import { COOKIE_OPTIONS, JWT_COOKIE_NAME } from '../../../utils/admin';
import { getPayloadFromToken } from "../../../utils/encrypt";


export default async function (req, res) {
    try {
        const { method } = req;    
        COOKIE_OPTIONS
        
        // only allow post methods to log admin
        if (method.toLowerCase() !== 'get') throw 'Invalid method'
        
        const authCookie = parse(req.headers.cookie)[JWT_COOKIE_NAME];
        if (!authCookie){
            const tokenPayloadObject = await getPayloadFromToken(authCookie);
            if (tokenPayloadObject.payload) {
                console.log(tokenPayloadObject.payload, Date.now())
                throw 'Already logged out!'
            }
        }


        const cookie = serialize(JWT_COOKIE_NAME, '', { maxAge : 0 })
        if (cookie) {
            res.setHeader('Set-Cookie', cookie)
        }
        
        // return success
        return res.redirect(ADMIN_URLS.dashboard.url)
    } 
    catch (error) {
        console.log({error})
        return res.json({
            data : error,
            err : true
        })
    }
}
