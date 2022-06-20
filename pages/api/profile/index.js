import { updateUserProfile } from "../../../database/user";
import { isAdminMiddleware } from "../../../utils/authLib";
import { UserProfileValidator } from "../../../utils/validator";

export default async function userProfileHandler(req, res) {
  try {
    // if not logged in throw error
    const { loggedAsAdmin, error, user } = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) throw error;

    // destructuring the incoming req
    const { body, method } = req;
    // only patch method is allowed
    if (method.toLowerCase() !== "patch") throw "Invalid method";

    // validate the incoming body
    const sanitizedData = UserProfileValidator.validate(body);

    // throw validation error
    if (sanitizedData.error) throw sanitizedData.error.details[0].message;

    // if incoming userdata is by admin
    if (sanitizedData.value._id !== user._id) throw "Unauthorized";

    // patch database with updated data
    const updatedProfile = await updateUserProfile(
      user._id,
      sanitizedData.value
    );

    return res.json({
      error: false,
      data: updatedProfile._id,
    });
  } catch (error) {
    return res.json({
      error: true,
      data: error,
    });
  }
}
