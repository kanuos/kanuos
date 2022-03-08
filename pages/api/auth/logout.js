// LOGOUT API
// method allwowed : GET
import { serialize } from 'cookie'

import { COOKIE_OPTIONS, JWT_COOKIE_NAME } from '../../../utils/admin';


export default async function (req, res) {
    try {
        const { method } = req;    
        COOKIE_OPTIONS
        
        // only allow post methods to log admin
        if (method.toLowerCase() !== 'get') throw 'Invalid method'
        
        const authCookie = req.cookies?.[JWT_COOKIE_NAME];

        if (!authCookie) throw 'Already logged out'
    
        const cookie = serialize(JWT_COOKIE_NAME, '', 
            { 
                ...COOKIE_OPTIONS,
                maxAge : -1, 
            })
        res.setHeader('Set-Cookie', cookie)
        
        // return success
        return res.json({
            data : 'logged out',
            err: false
        })
    } 
    catch (error) {
        return res.json({
            data : error,
            err : true
        })
    }
}
