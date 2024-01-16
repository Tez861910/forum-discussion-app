import { sequelize } from "../../../db.js";

export const handleQuestionTypeDeleteById = async (req, res) => {
  const { questionTypeId } = req.params;

  try {
    const QuestionTypes = sequelize.models.QuestionTypes;
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
  } catch (error) {
    console.error("Error deleting question type:", error);
    res
      .status(500)
      .json({ error: "Error deleting question type", details: error.message });
  }
};
