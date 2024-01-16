import { sequelize } from "../../../db.js";

export const handleQuestionDeleteById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const Questions = sequelize.models.Questions;
    const result = await Questions.destroy({
      where: { QuestionID: questionId },
    });

    if (result === 1) {
      console.log("Question deleted successfully");
      res.json({ message: "Question deleted successfully" });
    } else {
      console.error("Question deletion failed");
      res.status(500).json({ error: "Question deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    res
      .status(500)
      .json({ error: "Error deleting question", details: error.message });
  }
};
