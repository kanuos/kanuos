import { isValidObjectId } from "mongoose";
import { connectionFactory } from "../index";

const conn = connectionFactory();

const ProjectModel = conn.models.project;
const PortfolioModel = conn.models.portfolio;

/**
 *
 * @param {boolean} adminMode
 * @returns list of all project docs
 * @access public
 *
 */
export async function getAllProjects(adminMode = false) {
  // admin mode => true   lists all projects (both public and private)
  // admin mode => false  lists all public projects
  const filter = adminMode ? {} : { isPublic: true };

  const allProjects = await ProjectModel.find(filter)
    .populate("tags")
    .sort("-date");

  return allProjects;
}

/**
 *
 * @param {boolean} adminMode if admin mode => search by id else search by title
 * @param {ObjectId or string} searchBy slug or objectID to search project
 * @returns a project that matches searchBy param else throws error
 */
export async function getIndividualProject(adminMode = false, searchBy) {
  let project;
  if (adminMode) {
    // check if incoming project ID is valid mongoose objectID
    if (!isValidObjectId(searchBy)) throw "Invalid projectID (Admin Mode)";

    project = await ProjectModel.findById(searchBy).populate("tags");

    if (!project) throw `Project with id:${searchBy} doesn't exist`;
    return project;
  }
  // search in client mode
  project = await ProjectModel.findOne({ slug: searchBy }).populate("tags");

  if (!project) throw `Project with id:${searchBy} doesn't exist`;

  return project;
}

/**
 * @access private
 * @param projectData => sanitized project data adhering to Joi's project schema
 * @returns existing project data
 * @description
 * receives project data and checks whether project data exists in db
 */
export async function projectUniqueConstraint(projectData) {
  // check whether new project's slug and title are unique
  const existingProject = await ProjectModel.findOne({
    $or: [{ title: projectData.title }, { slug: projectData.slug }],
  });

  return existingProject;
}

/**
 *
 * @param {ObjectID} projectID unique project id == mongoose objectID
 * @param {ObjectID} user unique admin mongoose objectID
 * @returns deleted project or throws error
 */
export async function deleteProjectFromDB(projectID, user) {
  // check if projectID is valid
  if (!isValidObjectId(projectID)) throw "Invalid project ID";

  // delete project
  const deletedproject = await ProjectModel.findOneAndDelete({
    _id: projectID,
    user,
  });

  if (!deletedproject) throw `project with id ${projectID} doesn't exist`;

  // delete associated portfolio project
  await PortfolioModel.findOneAndDelete({
    project: projectID,
  });

  return deletedproject;
}

/**
 * @access private
 * @param projectData => sanitized project data adhering to Joi's project schema
 * @returns a newProject document if no errors are encountered
 */
export async function addProjectToDB(projectData) {
  // check if project title and slug are unique
  const existingproject = await projectUniqueConstraint(projectData);
  if (existingproject)
    throw `project _id:${existingproject._id} already exists with conflicting data`;
  // add project to database
  const newProject = await ProjectModel.create(projectData);

  if (!newProject) throw "project couldn't be added to DB";

  return newProject;
}

/**
 *
 * @param {ObjectId} projectID mongoose ObjectID that represents project ID
 * @param {sanitized project object} projectData a fully sanitized and validated project object
 * @param {ObjectId} user mongoose ObjectID that represents admin user
 * @returns updated project
 * @description
 * receives a project Id and a sanitized project object to update the project with projectID in database
 * on success it returns the updated project
 * on error it throws errors
 */
export async function editIndividualProject(projectID, projectData, user) {
  // check if project id is valid
  if (!isValidObjectId(projectID)) throw "Invalid project ID " + projectID;

  // unique ID project might have non-unique slug upon edition
  // check whether the new data title and slug are unique
  const confictingData = await projectUniqueConstraint(projectData);
  if (confictingData) {
    throw `Project with title or slug exists ${JSON.stringify(confictingData)}`;
  }

  // try to update the data using find and update with upsert set to false
  // if operation returns null it means no data with ID was found
  // throw error with suggestive message
  // on success return the updated project

  const updatedProject = await ProjectModel.findOneAndUpdate(
    {
      _id: projectID,
      user,
    },
    projectData,
    {
      new: true,
      upsert: false,
    }
  );

  if (!updatedProject) throw `project with ID ${projectID} doesn't exist`;

  return updatedProject;
}
