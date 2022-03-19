// New portfolio API
import { isValidObjectId } from 'mongoose'
import { updatePortfolioProject, deletePortfolioProjectFromProfile } from '../../../../database/user';
import { isAdminMiddleware } from '../../../../utils/authLib'
import { PortfolioProjectValidator } from '../../../../utils/validator'

export default async function individualPortfolioProjectHandler (req, res) {
    try {
        // check for authorization
        const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
        if (!loggedAsAdmin) throw error

        // destructuring incoming req object
        const { method, body, query } = req;

        // check if incoming query ID is a mongoose objectID type
        if (!isValidObjectId(query.id)) throw 'Invalid Portfolio ID'

        switch(method.toLowerCase()) {
            case 'patch':
                // update the existing portfolio
                // validate incoming data
                const sanitizedData = PortfolioProjectValidator.validate(body);
                if (sanitizedData.error) throw sanitizedData.error.details[0].message;

                if (sanitizedData.value.user !== user._id) throw 'Not authorized'
                // create payload
                const updatedPortfolio = await updatePortfolioProject(query.id, user._id, sanitizedData.value)

                return res.json({
                    error: false,
                    data : updatedPortfolio
                })

            case 'delete':
                // delete portfolio
                const deletedPortfolio = await deletePortfolioProjectFromProfile(query.id, user._id);

                console.log({deletedPortfolio})
                return res.json({
                    error: false,
                    data: deletedPortfolio
                })

            default :
                throw 'Invalid Portfolio ID'
        }

        

    } 
    catch (error) {
        console.log(error)
        return res.json({
            error: true,
            data : error
        })
    }
}