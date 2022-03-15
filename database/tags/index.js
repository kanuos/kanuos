import mongoose from 'mongoose';
import { isValidObjectId } from 'mongoose'
import conn from "../Models";

const TagModel = conn.models.tag;

/**
 * 
 * @returns all tags from tag collection
 * 
 */
export async function getAllTags() {
    const tags = await TagModel.find({})
    return tags;
}


/**
 * 
 * @param tag string of new tag 
 * @returns newly created tag
 * 
 */
export async function addNewTag(tag){
    tag = tag.trim().toLowerCase();
    
    if (!tag) throw 'Tag cannot be empty'

    const existingTag = await TagModel.findOne({tag : tag.trim().toLowerCase()});
    if (existingTag) {
        throw `Tag "${tag}" already exists`
    }

    return await TagModel.create({tag})
}



export async function deleteExistingTag(tagID) {
    if (!isValidObjectId(tagID)) throw 'Invalid tag ID'

    const deletedTag = await TagModel.findByIdAndDelete(tagID);

    if (!deletedTag) throw `Tag by id ${tagID} not deleted`

    return deletedTag;
}



export async function getDataRelatedToTag(tagID) {
    const data = await TagModel.aggregate([
        {
            $match : {
               "_id" : mongoose.Types.ObjectId(tagID)
            }
        }, 
        {
            $lookup: {
                from: "projects", 
                localField: "_id",
                foreignField: "tags",
                as: "project"
            }
        }, 
        {
            $lookup: {
                from: "blogs", 
                localField: "_id",
                foreignField: "tags",
                as: "blog"
            }
        },
        {
            $lookup: {
                from: "designs", 
                localField: "_id",
                foreignField: "tags",
                as: "design"
            }
        }
    ]);
    return data;
}