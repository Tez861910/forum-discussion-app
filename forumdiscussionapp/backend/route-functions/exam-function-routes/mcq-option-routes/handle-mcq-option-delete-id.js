import { sequelize } from "../../../db.js";

export const handleMCQOptionDeleteById = async (req, res) => {
  const { mcqOptionId } = req.params;
  const UserID = req.user.userId;

  try {
    const CommonAttributes = sequelize.models.CommonAttributes;
    const MCQOptions = sequelize.models.MCQOptions;

    // Find the CommonAttributeID associated with the MCQOptionID
    const mcqOption = await MCQOptions.findByPk(mcqOptionId);
    const commonAttributeId = mcqOption.get("CommonAttributeID");

    // Update the corresponding CommonAttributes table
    const commonAttributesInstance = await CommonAttributes.findByPk(
      commonAttributeId
    );
    await commonAttributesInstance.update({
      IsDeleted: true,
      UpdatedByUserID: UserID,
    });

    // Respond with success message
    res.json({
      success: true,
      message: "MCQ option soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting MCQ option:", error);
    res
      .status(500)
      .json({ success: false, error: "Error soft deleting MCQ option" });
  }
};
