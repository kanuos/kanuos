import { serialize } from "cookie";
import { COOKIE_OPTIONS, JWT_COOKIE_NAME } from "./admin";
import { getPayloadFromToken } from "./encrypt";


/**
 * 
 * @param { NextRequestType } req
 * receives incoming request with header cookie 
 * which expects auth bearer token  
 * @param { NextResponseType } res
 * if cookie has expired or invalid token - clear the same
 * @returns { boolean } whether active user is admin or not
 */
export async function isAdminMiddleware(req, res) {
    let loggedAsAdmin, error;
    try {
        const authToken = req.cookies?.[JWT_COOKIE_NAME];

        // if no cookie with JWT_COOKIE_NAME is found on the incoming request header
        if (!authToken) throw new Error("Not logged in as ADMIN");
        
        // if incoming request has cookie with JWT_COOKIE_NAME
        // validate token
        const {payload} = await getPayloadFromToken(authToken); 
        
        // invalid payload || expirer token || malformed token etc
        if (!payload) {
            const cookie = serialize(JWT_COOKIE_NAME, '', 
            { 
                ...COOKIE_OPTIONS,
                maxAge : -1, 
            })
            res.setHeader('Set-Cookie', cookie)
            throw new Error("Session expired or invalid");
        }
        // valid token
        loggedAsAdmin = true;
        error = false;
    } 
    catch (err) {
        loggedAsAdmin = false;
        error = err.message
    }
    finally {
        return {
            loggedAsAdmin, error
        }
    }
}