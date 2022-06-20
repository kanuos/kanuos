import { isValidObjectId } from "mongoose";
import { getDataRelatedToTag } from "../../../database/tags";

export default async function individualTagHandler(req, res) {
  try {
    const {
      query: { id },
      method,
    } = req;

    // only get method is allowed
    if (method.toLowerCase() !== "get") throw "What are you trying to do??";

    // only mongoose object id is allowed as query param
    if (!isValidObjectId(id)) throw `Don't play with forces beyond your ken`;

    const data = await getDataRelatedToTag(id);

    return res.json({
      error: false,
      data,
    });
  } catch (error) {
    return res.json({
      error: true,
      data: error,
    });
  }
}
