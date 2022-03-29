import conn from "../Models";
import { isValidObjectId } from "mongoose";

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
  design = await DesignModel.findOne({ title: searchBy }).populate("tags");

  if (!design) throw `Design with id:${searchBy} doesn't exist`;

  return design;
}

/**
 *
 * @param {DesignObject} design a validated and sanitized design js object
 * @returns a newly created design document
 */
export async function addDesignToDB(design) {
  // check if design with title exists
  const existingDesign = await DesignModel.findOne({ title: design.title });
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
