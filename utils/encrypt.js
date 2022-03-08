import { compare, hash } from 'bcryptjs';
import { sign, verify} from "jsonwebtoken"


const SECRET = process.env.SECRET;
const SALT = process.env.SALT_ROUND;



/**
 * 
 * @param {string} password a plain text password that meets password constraints
 * @returns hashedPassword
 */
export async function hashPassword(password) {
    // hash password with SECRET   
    const hashedPassword = await hash(password, parseInt(SALT));
    
    if (!hashedPassword) throw 'Hashing failed'
        
    return hashedPassword;

}



/**
 * 
 * @param {string} password a plain text string that denotes the credential password
 * @param {hash} hash the hashed password from database
 * @returns {bool} returns valid credential status. if valid returns true else false 
 */
export async function isValidPassword(password, hash) {
    const isValid = await compare(password, hash);
    return isValid;
}




export async function generateAccessToken(email, _id){
    const token = sign({email, _id}, SECRET, {
        expiresIn : '10h'
    })
    return token;
}


export async function getPayloadFromToken(token) {
    try {
        const payload = verify(token, SECRET);
        return {
            payload : payload,
        };    
    } 
    catch (error) {
        return {
            payload : null
        };
    }
}