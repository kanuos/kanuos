import { isValidObjectId } from "mongoose";
import { connectionFactory } from "../index";

const conn = connectionFactory();

const DesignModel = conn.models.design;
const PortfolioModel = conn.models.portfolio;

/**
 *
 * @param {boolean} adminMode whether admin mode or client mode defaults to client mode
 * @returns list of all designs
 */
export async function getAllDesigns(adminMode = false) {
  const filter = adminMode ? {} : { isPublic: true };

  const designs = await DesignModel.find(filter).populate("tags").sort("-date");

  return designs;
}

export async function getIndividualDesign(adminMode = false, searchBy) {
  let design;
  if (adminMode) {
    // check if incoming design ID is valid mongoose objectID
    if (!isValidObjectId(searchBy)) throw "Invalid designID (Admin Mode)";

    design = await DesignModel.findById(searchBy).populate("tags");

    if (!design) throw `Design with id:${searchBy} doesn't exist`;

    return design;
  }
  // search in client mode
  design = await DesignModel.findOne({ slug: searchBy }).populate("tags");

  if (!design) throw `Design with id:${searchBy} doesn't exist`;

  return design;
}

/**
 * @access private
 * @param designData => sanitized design data adhering to Joi's design schema
 * @returns existing design data
 * @description
 * receives design data and checks whether design data exists in db
 */
export async function designUniqueConstraint(designData) {
  // check whether new design's slug and title are unique
  const existingDesign = await DesignModel.findOne({
    $or: [{ title: designData.title }, { slug: designData.slug }],
  });

  return existingDesign;
}

/**
 *
 * @param {DesignObject} design a validated and sanitized design js object
 * @returns a newly created design document
 */
export async function addDesignToDB(design) {
  // check if design with title exists
  const existingDesign = await designUniqueConstraint(design);
  if (existingDesign) throw "Design exists @ id:" + existingDesign._id;

  // create a new design document
  const newDesign = await DesignModel.create(design);

  // return the newly created design
  return newDesign;
}

export async function deleteDesignFromDB(id, user) {
  if (!isValidObjectId(id)) throw "Invalid Design ID";

  const deletedDesign = await DesignModel.findOneAndRemove({ _id: id, user });

  if (!deletedDesign) throw `Design by ID ${id} not found`;

  await PortfolioModel.findOneAndDelete({
    design: id,
  });

  return deletedDesign;
}

export async function updateDesignByID(id, design, user) {
  if (!isValidObjectId(id)) throw "Invalid Design ID";

  // unique ID design might have non-unique slug upon edition
  // check whether the new data title and slug are unique
  const confictingData = await designUniqueConstraint(design);
  if (confictingData) {
    throw `Design with title or slug exists ${JSON.stringify(confictingData)}`;
  }

  const updatedDesign = await DesignModel.findOneAndUpdate(
    { _id: id, user },
    design,
    {
      new: true,
      upsert: false,
    }
  );

  if (!updatedDesign) throw `Design with ID ${id} doesn't exist`;

  return updatedDesign;
}
