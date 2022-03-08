//  BLOG API
// individual blog operations
// ADMIN only access routes


import { deleteBlogFromDB, editIndividualBlog } from "../../../database/blogs";

import { JWT_COOKIE_NAME } from "../../../utils/admin";
import { ContentValidators } from "../../../utils/validator";
import { getPayloadFromToken } from '../../../utils/encrypt'

export default async function (req, res) {
    let blogValidator;
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
        
        const { method, body, query : {id} } = req;

        switch(method.toLowerCase()) {
            case 'delete':
                const deletedBlog = await deleteBlogFromDB(id, user._id);
                return res.json({
                    data: deletedBlog,
                    err : false
                })

            case 'patch':
                // Create a new blog document
                // receives newBlog data from the incoming request body 
                blogValidator = ContentValidators.blog.validate(body);

                // check for validation error
                if (blogValidator.error) throw blogValidator.error.details[0].message;
                
                // try to update the blog with sanitized data
                const updatedBlog = editIndividualBlog(id, blogValidator.value, user._id);

                return res.json({
                    data : updatedBlog,
                    err : false
                })
                
            default :
                throw 'Invalid method'
            }
    } 
    catch (err) {
        console.log(err)
        return res.json({
            data : err,
            err : true,
        })
    }
}