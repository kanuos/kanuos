//  BLOG API

import { addBlogToDB, blogUniqueConstraint } from "../../../database/blogs";

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

        const { method, body } = req;

        switch(method.toLowerCase()) {
            case 'post':
                // Create a new blog document
                // receives newBlog data from the incoming request body 
                blogValidator = ContentValidators.blog.validate(body);

                // check for validation error
                if (blogValidator.error) throw blogValidator.error.details[0].message;


                // check whether blog exists
                const existingBlog = await blogUniqueConstraint(blogValidator.value)
                if (existingBlog) throw 'Blog existis @ _id : ' + existingBlog._id;

                const blog = {...blogValidator.value, user};
                
                // add the sanitized blog data to DB
                const newBlog = await addBlogToDB(blog);

                if (!newBlog) throw 'Blog coudln\'t be added!'

                return res.json({
                    data : newBlog,
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