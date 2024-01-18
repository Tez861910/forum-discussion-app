import { sequelize } from "../../../db.js";

export const handleQuestionTypeDeleteById = async (req, res) => {
  const { questionTypeId, userId } = req.params;

  try {
    const QuestionTypes = sequelize.models.QuestionTypes;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the question type to get the associated CommonAttributeID
    const questionType = await QuestionTypes.findOne({
      where: { QuestionTypeID: questionTypeId },
    });

    if (!questionType) {
      console.error("Question type not found");
      return res.status(404).json({ error: "Question type not found" });
    }

    // Update the CommonAttributes table to mark as deleted
    const commonAttributeUpdate = await CommonAttributes.update(
      {
        IsDeleted: true,
        DeletedByUserID: userId,
      },
      {
        where: { AttributeID: questionType.CommonAttributeID },
      }
    );

    if (commonAttributeUpdate[0] === 1) {
      // Delete the question type from the QuestionTypes table
      const result = await QuestionTypes.destroy({
        where: { QuestionTypeID: questionTypeId },
      });

      if (result === 1) {
        console.log("Question type deleted successfully");
        res.json({ message: "Question type deleted successfully" });
      } else {
        console.error("Question type deletion failed");
        res.status(500).json({ error: "Question type deletion failed" });
      }
    } else {
      console.error("Common attribute update failed");
      res.status(500).json({ error: "Common attribute update failed" });
    }
  } catch (error) {
    console.error("Error deleting question type:", error);
    res
      .status(500)
      .json({ error: "Error deleting question type", details: error.message });
  }
};
