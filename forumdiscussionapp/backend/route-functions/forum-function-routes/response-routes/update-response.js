import { sequelize } from "../../../db.js";

export const updateResponse = async (req, res) => {
  const { responseId } = req.params;
  const { content, userId } = req.body;

  try {
    const Responses = sequelize.models.Responses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Step 1: Update Responses
    const responseResult = await Responses.update(
      { ResponseContent: content },
      { where: { ResponseID: responseId } }
    );

    if (responseResult[0] !== 1) {
      console.error("Response update failed");
      return res.status(500).json({ error: "Response update failed" });
    }

    // Step 2: Update CommonAttributes for updated by user
    const response = await Responses.findByPk(responseId);
    const commonAttributeId = response.CommonAttributeID;

    const commonAttributesResult = await CommonAttributes.update(
      { UpdatedByUserID: userId },
      { where: { AttributeID: commonAttributeId } }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Response and CommonAttributes updated successfully");
      res.json({
        message: "Response and CommonAttributes updated successfully",
      });
    } else {
      console.error("CommonAttributes update failed");
      res.status(500).json({ error: "CommonAttributes update failed" });
    }
  } catch (error) {
    console.error("Error updating response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
