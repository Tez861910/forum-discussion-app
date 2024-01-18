import { sequelize } from "../../../db.js";
import Sequelize from "sequelize";

export const handleAnswerDeleteById = async (req, res) => {
  const { answerId } = req.params;

  try {
    const Answers = sequelize.models.Answers;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Check if the answer is already deleted
    const commonAttributesInstance = await CommonAttributes.findOne({
      where: { AttributeID: Sequelize.col("Answers.CommonAttributeID") },
      include: [
        {
          model: Answers,
          where: { AnswerID: answerId },
          attributes: [],
        },
      ],
    });

    if (commonAttributesInstance.get("IsDeleted")) {
      // If the answer is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: "Answer already deleted" });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: req.user.userId },
      { where: { AttributeID: commonAttributesInstance.get("AttributeID") } }
    );

    console.log("Answer deleted successfully");
    res.json({ success: true, message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({
      success: false,
      error: "Error deleting answer",
      details: error.message,
    });
  }
};
