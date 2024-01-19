import { sequelize } from "../../../db.js";

export const deleteResponse = async (req, res) => {
  const { responseId } = req.params;
  const { userId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Responses = sequelize.models.Responses;

    // Step 1: Find the Response and associated CommonAttributeID
    const response = await Responses.findByPk(responseId);

    if (!response) {
      console.error("Response not found");
      return res.status(404).json({ error: "Response not found" });
    }

    const commonAttributeId = response.CommonAttributeID;

    // Step 2: Update CommonAttributes for soft delete
    const commonAttributesResult = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: commonAttributeId },
      }
    );

    if (commonAttributesResult[0] === 1) {
      console.log("Response soft deleted successfully");
      res.json({ message: "Response soft deleted successfully" });
    } else {
      console.error("Response soft deletion failed");
      res.status(500).json({ error: "Response soft deletion failed" });
    }
  } catch (error) {
    console.error("Error soft deleting response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
