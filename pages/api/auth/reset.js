import { updatePassword } from "../../../database/user";
import { isAdminMiddleware } from "../../../utils/authLib";
import { AuthValidators } from "../../../utils/validator";

const { PASSWORD_RESET_CODE } = process.env;

export default async function resetPassword(req, res) {
  try {
    const { body, method } = req;

    // only POST method is allowed
    if (method.toLowerCase() !== "post") throw "Invalid method";

    // only admin user prior to logging in is allowed to reach endpoint
    const { loggedAsAdmin } = await isAdminMiddleware(req, res);
    if (loggedAsAdmin) throw "Already logged in";

    // validate incoming body of the request to reset password
    const validationObj = AuthValidators.reset.validate(body);
    if (validationObj.error) throw validationObj.error.details[0].message;

    // check if incoming secret matches environment code
    const data = validationObj.value;
    if (PASSWORD_RESET_CODE !== data.secret) {
      throw "Invalid ADMIN secret";
    }

    // update password service
    await updatePassword({ email: data.email, password: data.password });

    return res.json({
      data: "Changed password",
      err: false,
    });
  } catch (error) {
    return res.json({
      data: error,
      err: true,
    });
  }
}
