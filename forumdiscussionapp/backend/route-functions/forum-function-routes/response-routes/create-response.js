import { sequelize } from "../../../db.js";

export const createResponse = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const Responses = sequelize.models.Responses;

    // Step 1: Create a CommonAttributes entry
    const commonAttributesResult = await CommonAttributes.create({
      CreatedByUserID: userId,
    });

    if (!commonAttributesResult) {
      console.error("CommonAttributes creation failed");
      return res
        .status(500)
        .json({ error: "CommonAttributes creation failed" });
    }

    // Step 2: Create a Responses entry with CommonAttributeID
    await Responses.create({
      ResponseContent: content,
      UserID: userId,
      CommentID: commentId,
      CommonAttributeID: commonAttributesResult.AttributeID,
    });

    res.json({ message: "Response added successfully" });
  } catch (error) {
    console.error("Error adding response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
