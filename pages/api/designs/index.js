// Design API

import { addDesignToDB, getAllDesigns } from "../../../database/designs";
import { isAdminMiddleware } from "../../../utils/authLib";
import { ContentValidators } from "../../../utils/validator";

export default async function designAPIHandler(req, res) {
  try {
    const { loggedAsAdmin, user, error } = await isAdminMiddleware(req, res);
    if (!loggedAsAdmin) throw error;

    const { method, body } = req;

    switch (method.toLowerCase()) {
      case "get":
        const list = await getAllDesigns(true);
        return res.json({
          data: list,
          err: false,
        });
      // Add new design to DB
      case "post":
        // validate incoming request body with the design valiator
        let parsedBody = JSON.parse(JSON.stringify(body));
        const { error, value } = ContentValidators.design.validate(parsedBody);
        if (error) throw error.details[0].message;

        const design = { ...value, user };

        const newDesign = await addDesignToDB(design);

        if (!newDesign) throw "Couldnt add design to DB";

        return res.json({
          error: false,
          data: newDesign,
        });
      default:
        throw "Invalid method";
    }
  } catch (error) {
    return res.json({
      error: true,
      data: error,
    });
  }
}
