import { sequelize } from "../../../db.js";

export const handleAttemptDelete = async (req, res) => {
  const { attemptId } = req.params;
  const UserID = req.user.userId;

  const CommonAttributes = sequelize.models.CommonAttributes;
  const ExamAttempts = sequelize.models.ExamAttempts;

  try {
    // Find CommonAttributeID using ExamAttempts table
    const examAttemptInstance = await ExamAttempts.findOne({
      where: { AttemptID: attemptId },
      attributes: ["CommonAttributeID"],
    });

    const commonAttributeID = examAttemptInstance.get("CommonAttributeID");

    // Update IsDeleted and DeletedByUserID in CommonAttributes table
    const commonAttributesResult = await CommonAttributes.update(
      { IsDeleted: true, DeletedByUserID: UserID },
      { where: { AttributeID: commonAttributeID } }
    );

    // Check if the update was successful
    if (commonAttributesResult[0] === 1) {
      console.log("Exam attempt deleted successfully");
      res.json({ success: true, message: "Exam attempt deleted successfully" });
    } else {
      console.error("Exam attempt deletion failed");
      res
        .status(500)
        .json({ success: false, error: "Exam attempt deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam attempt:", error);
    res.status(500).json({
      success: false,
      error: "Exam attempt deletion failed",
      details: error.message,
    });
  }
};
