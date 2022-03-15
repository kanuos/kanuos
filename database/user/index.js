import { hashPassword, isValidPassword } from '../../utils/encrypt';
import conn from '../Models';

const UserModel = conn.models.user;
const PortfolioModel = conn.models.portfolio;




/**
 * 
 * @param {string} email a string email to match admin's email. Default ''
 * @returns admin document or null
 */
export async function getAdminUser(email='') {
    email = email.trim().toLowerCase();
    // if email argument is passed search admin by user
    // if no email is passed search with empty filter
    const filter = email.length > 0 ? {email} : {}
    // query the user collection for admin user
    // since for the time being only one user is allowed
    // db query findone is used instead of find
    const admin = await UserModel.findOne(filter).populate({
        path : 'portfolio',
        populate : {
            path : 'design project',
            populate : {
                path : 'tags'
            }
        }
    });
    return admin;
}


/**
 * 
 * @returns register admin
 */
export async function registerUser(user) {
    // query the user collection to check user uniqueness
    const existingAdmin = await getAdminUser(user.email);

    // admin already exists
    // for the time being only one admin account is permitted
    if (existingAdmin) throw `Admin with ID ${existingAdmin._id} already exists`

    // hash the password 
    const hashedPassword = await hashPassword(user.password);

    // replace plain text password with the hashedPassword
    user.password = hashedPassword;

    // add new user to DB
    const newAdmin = await UserModel.create(user);

    // error in creating admin
    if (!newAdmin) throw `Admin couldn't be added.`

    return newAdmin;
}



/**
 * 
 * @param {userDoc} user receives user email, password in plain text
 * @description
 * This method finds an admin that matches the credentials
 * If no admin is found, an error is throw which will be caught by the API handler
 * On success, returns the admin doc with the credentials
 * @returns adminDOC
 */
export async function loginAdmin(user) {
    const existingAdmin = await await getAdminUser(user.email);

    // admin does not exist
    if (!existingAdmin) throw `Admin doesnt exist`

    // validate whether password matches or not
    const isValidCredential = await isValidPassword(user.password, existingAdmin.password);
    if (!isValidCredential) throw 'Invalid credentials'

    // password and email matches
    // return the logged admin
    return existingAdmin
}


export async function updatePassword(user) {
    // query the user collection to check user uniqueness
    const existingAdmin = await getAdminUser(user.email);

    // if admin email isnt registered throw error
    if (!existingAdmin) throw `Admin doesn't exists`

    // hash the password 
    const hashedPassword = await hashPassword(user.password);

    // replace plain text password with the hashedPassword
    user.password = hashedPassword;

    // add new user to DB
    const updatedUser = await UserModel.findOneAndUpdate({email : user.email}, {...user}, { new : true});

    // error in creating admin
    if (!updatedUser) throw `Admin couldn't be added.`

    return updatedUser;
}



export async function updateUserProfile(activeUserID, metadata) {
    const updatedProfile = await UserModel.findByIdAndUpdate(activeUserID, metadata, { new: true, upsert: false});

    return updatedProfile;
}



export async function addPortfolioProjectToProfile(newDoc) { 
    // insert sanitized doc into portfolio sub-array
    const newPortfolio = await PortfolioModel.create(newDoc)
    await UserModel.findByIdAndUpdate(newDoc.user, { $push : { portfolio : newPortfolio}}, {new : true, upsert: false});
    const populatedData = await PortfolioModel.findById(newPortfolio._id).populate({
            path : 'design project',
            populate : {
                path : 'tags'
        }
    });
    return populatedData;
}


export async function deletePortfolioProjectFromProfile(portfolioID, userID) { 
    const deletedPortfolio = await PortfolioModel.findOneAndRemove({
        _id : portfolioID,
        user : userID
    });
    return deletedPortfolio;
}



export async function updatePortfolioProject(portfolioID, userID, updateDoc) { 
    const updatedPortfolio = await PortfolioModel.findOneAndUpdate({
        _id : portfolioID,
        user : userID
    }, updateDoc,  {
        new : true,
        upsert : false
    }).populate({
        path : 'design project',
        populate : {
            path : 'tags'
    }
});

    return updatedPortfolio;
}