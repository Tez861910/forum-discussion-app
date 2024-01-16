import { sequelize } from "../../../db.js";

export const handleQuestionUpdateById = async (req, res) => {
  const { questionId } = req.params;
  const { questionText, questionTypeId, examId, courseId, createdByUserId } =
    req.body;

  try {
    const Questions = sequelize.models.Questions;
    const result = await Questions.update(
      {
        QuestionText: questionText,
        QuestionTypeID: questionTypeId,
        ExamID: examId,
        CourseID: courseId,
        CreatedByUserID: createdByUserId,
      },
      {
        where: { QuestionID: questionId },
      }
    );

    if (result[0] === 1) {
      console.log("Question updated successfully");
      res.json({ message: "Question updated successfully" });
    } else {
      console.error("Question update failed");
      res.status(500).json({ error: "Question update failed" });
    }
  } catch (error) {
    console.error("Error updating question:", error);
    res
      .status(500)
      .json({ error: "Question update failed", details: error.message });
  }
};
