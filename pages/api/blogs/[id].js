//  BLOG API
// individual blog operations
// ADMIN only access routes

import { deleteBlogFromDB, editIndividualBlog } from "../../../database/blogs";

import { ContentValidators } from "../../../utils/validator";
import { isAdminMiddleware } from "../../../utils/authLib";

export default async function individualBlogAPIHandler(req, res) {
  let blogValidator;
  try {
    const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) throw error;

    const {
      method,
      body,
      query: { id },
    } = req;

    switch (method.toLowerCase()) {
      case "delete":
        const deletedBlog = await deleteBlogFromDB(id, user._id);
        return res.json({
          data: deletedBlog,
          err: false,
        });

      case "patch":
        // Create a new blog document
        // receives newBlog data from the incoming request body
        blogValidator = ContentValidators.blog.validate(body);

        // check for validation error
        if (blogValidator.error) throw blogValidator.error.details[0].message;

        // try to update the blog with sanitized data
        const updatedBlog = await editIndividualBlog(
          id,
          blogValidator.value,
          user._id
        );

        return res.json({
          data: updatedBlog,
          err: false,
        });

      default:
        throw "Invalid method";
    }
  } catch (err) {
    return res.json({
      data: err,
      err: true,
    });
  }
}
