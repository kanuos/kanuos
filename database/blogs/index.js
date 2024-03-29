import { isValidObjectId } from "mongoose";
import { connectionFactory } from "../index";

const conn = connectionFactory();

const BlogModel = conn.models.blog;

/**
 *
 * @param {boolean} adminMode
 * @returns list of all blog docs
 * @access public
 *
 */
export async function getAllBlogs(adminMode = false) {
  // admin mode => true   lists all blogs (both public and private)
  // admin mode => false  lists all public blogs
  const filter = adminMode ? {} : { isPublic: true };

  const allBlogs = await BlogModel.find(filter).populate("tags").sort("-date");

  return allBlogs;
}

/**
 *
 * @param {boolean} adminMode if admin mode => search by id else search by slug
 * @param {ObjectId or string} searchBy slug or objectID to search blog
 * @returns a blog that matches searchBy param else throws error
 */
export async function getIndividualBlog(adminMode = false, searchBy) {
  let blog;
  if (adminMode) {
    // check if incoming blog ID is valid mongoose objectID
    if (!isValidObjectId(searchBy)) throw "Invalid BlogID (Admin Mode)";

    blog = await BlogModel.findById(searchBy).populate("tags");

    if (!blog) throw `Blog with id:${searchBy} doesn't exist`;

    return blog;
  }
  // search in client mode
  blog = await BlogModel.findOne({ slug: searchBy }).populate("tags");

  if (!blog) throw `Blog with id:${searchBy} doesn't exist`;

  return blog;
}

/**
 * @access private
 * @param blogData => sanitized blog data adhering to Joi's blog schema
 * @returns existing blog data
 * @description
 * receives blog data and checks whether blog data exists in db
 */
export async function blogUniqueConstraint(blogData) {
  // check whether new blog's slug and title are unique
  const existingBlog = await BlogModel.findOne({
    $or: [{ title: blogData.title }, { slug: blogData.slug }],
  });

  return existingBlog;
}

/**
 *
 * @param {ObjectID} blogID unique blog id == mongoose objectID
 * @param {ObjectID} user admin id == mongoose objectID
 * @returns deleted blog or throws error
 */
export async function deleteBlogFromDB(blogID, user) {
  // check if blogID is valid
  if (!isValidObjectId(blogID)) throw "Invalid Blog ID";

  // delete blog
  const deletedBlog = await BlogModel.findOneAndDelete({ _id: blogID, user });

  if (!deletedBlog) throw `Blog with id ${blogID} doesn't exist`;

  return deletedBlog;
}

/**
 * @access private
 * @param blogData => sanitized blog data adhering to Joi's blog schema
 * @returns a newBlog document if no errors are encountered
 */
export async function addBlogToDB(blogData) {
  // check if blog title and slug are unique
  const existingBlog = await blogUniqueConstraint(blogData);
  if (existingBlog)
    throw `Blog _id:${existingBlog._id} already exists with conflicting data`;
  // add blog to database
  const newBlog = await BlogModel.create(blogData);

  if (!newBlog) throw "Blog couldn't be added to DB";

  return newBlog;
}

/**
 *
 * @param {ObjectId} blogID mongoose ObjectID that represents blog ID
 * @param {ObjectId} user mongoose ObjectID that represents admin
 * @param {sanitized blog object} blogData a fully sanitized and validated blog object
 * @returns updated blog
 * @description
 * receives a blog Id and a sanitized blog object to update the blog with blogID in database
 * on success it returns the updated blog
 * on error it throws errors
 */
export async function editIndividualBlog(blogID, blogData, user) {
  // check if blog id is valid
  if (!isValidObjectId(blogID)) throw "Invalid Blog ID " + blogID;

  // unique ID blog might have non-unique slug upon edition
  // check whether the new data title and slug are unique
  const confictingData = await blogUniqueConstraint(blogData);
  if (confictingData._id.toString() !== blogID) {
    throw `Blog with title or slug exists ${JSON.stringify(confictingData)}`;
  }

  // try to update the data using find and update with upsert set to false
  // if operation returns null it means no data with ID was found
  // throw error with suggestive message
  // on success return the updated blog

  const updatedBlog = await BlogModel.findByIdAndUpdate(
    { _id: blogID, user },
    blogData,
    { new: true, upsert: false }
  );

  if (!updatedBlog) throw `Blog with ID ${blogID} doesn't exist`;

  return updatedBlog;
}
