//  BLOG API
// individual blog operations
// ADMIN only access routes


import { deleteBlogFromDB, editIndividualBlog } from "../../../database/blogs";
import { ContentValidators } from "../../../utils/validator";

export default async function (req, res) {
    let blogValidator;
    try {
        const { method, body, query : {id} } = req;
        // TODO: auth session 

        switch(method.toLowerCase()) {
            case 'delete':
                const deletedBlog = await deleteBlogFromDB(id);
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
                const updatedBlog = editIndividualBlog(id, blogValidator.value);

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