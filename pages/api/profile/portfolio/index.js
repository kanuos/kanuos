// New portfolio API
import { addPortfolioProjectToProfile } from '../../../../database/user';
import { isAdminMiddleware } from '../../../../utils/authLib'
import { PortfolioProjectValidator } from '../../../../utils/validator'

export default async function (req, res) {
    try {
        // check for authorization
        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

        // destructuring incoming req object
        const { method, body } = req;

        // allow only post method
        if (method.toLowerCase() !== 'post') throw 'Invalid method'

        // validate incoming data
        const sanitizedData = PortfolioProjectValidator.validate(body);
        if (sanitizedData.error) throw sanitizedData.error.details[0].message;

        // create payload
        const portfolioPayload = {...sanitizedData.value, user : user._id};
        const updatedUser = await addPortfolioProjectToProfile(portfolioPayload)

        console.log(updatedUser)
        return res.json({
            error: false,
            data : updatedUser
        })

    } 
    catch (error) {
        console.log(error)
        return res.json({
            error: true,
            data : error
        })
    }
}