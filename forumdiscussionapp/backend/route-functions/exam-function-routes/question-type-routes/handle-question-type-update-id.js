import { sequelize } from "../../../db.js";

export const handleQuestionTypeUpdateById = async (req, res) => {
  const { questionTypeId } = req.params;
  const { questionTypeName } = req.body;

  try {
    const QuestionTypes = sequelize.models.QuestionTypes;
    const result = await QuestionTypes.update(
      {
        QuestionTypeName: questionTypeName,
      },
      {
        where: { QuestionTypeID: questionTypeId },
      }
    );

    if (result[0] === 1) {
      console.log("Question type updated successfully");
      res.json({ message: "Question type updated successfully" });
    } else {
      console.error("Question type update failed");
      res.status(500).json({ error: "Question type update failed" });
    }
  } catch (error) {
    console.error("Error updating question type:", error);
    res
      .status(500)
      .json({ error: "Question type update failed", details: error.message });
  }
};
