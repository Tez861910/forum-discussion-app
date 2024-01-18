import { sequelize } from "../../../db.js";

export const handleMCQOptionUpdateById = async (req, res) => {
  const { mcqOptionId } = req.params;
  const { mcqQuestionId, mcqOptionText, isCorrect, createdByUserId } = req.body;
  const UserID = req.user.userId; // Assuming you have user information in the request

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const MCQOptions = sequelize.models.MCQOptions;

    // Update the MCQOptions table
    const result = await MCQOptions.update(
      {
        MCQQuestionID: mcqQuestionId,
        MCQOptionText: mcqOptionText,
        IsCorrect: isCorrect,
        CreatedByUserID: createdByUserId,
      },
      {
        where: {
          MCQOptionID: mcqOptionId,
        },
      }
    );

    // Find the CommonAttributeID associated with the MCQOptionID
    const mcqOption = await MCQOptions.findByPk(mcqOptionId);
    const commonAttributeId = mcqOption.get("CommonAttributeID");

    // Update the corresponding CommonAttributes table
    const commonAttributesInstance = await CommonAttributes.findByPk(
      commonAttributeId
    );
    await commonAttributesInstance.update({
      UpdatedByUserID: UserID,
    });

    // Respond with success message
    if (result[0] === 1) {
      console.log("MCQ option updated successfully");
      res.json({ success: true, message: "MCQ option updated successfully" });
    } else {
      console.error("MCQ option update failed");
      res
        .status(500)
        .json({ success: false, error: "MCQ option update failed" });
    }
  } catch (error) {
    console.error("Error updating MCQ option:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "MCQ option update failed",
        details: error.message,
      });
  }
};
