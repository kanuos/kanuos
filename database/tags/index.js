import { isValidObjectId } from 'mongoose'
import "../index";
import { TagModel } from "../Models";


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