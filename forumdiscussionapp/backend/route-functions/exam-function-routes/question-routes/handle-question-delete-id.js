import { sequelize } from "../../../db.js";

export const handleQuestionDeleteById = async (req, res) => {
  const { questionId } = req.params;
  const CommonAttributes = sequelize.models.CommonAttributes;
  const Questions = sequelize.models.Questions;

  try {
    // Find the CommonAttributeID associated with the Question
    const questionInstance = await Questions.findOne({
      where: { QuestionID: questionId },
    });

    if (!questionInstance) {
      console.error("Question not found");
      return res.status(404).json({ error: "Question not found" });
    }

    const commonAttributeId = questionInstance.get("CommonAttributeID");

    // Update the CommonAttributes table for soft deletion
    await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: req.user.userId,
      },
      { where: { AttributeID: commonAttributeId } }
    );

    console.log("Question soft deleted successfully");
    res.json({ message: "Question soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting question:", error);
    res
      .status(500)
      .json({ error: "Error soft deleting question", details: error.message });
  }
};
