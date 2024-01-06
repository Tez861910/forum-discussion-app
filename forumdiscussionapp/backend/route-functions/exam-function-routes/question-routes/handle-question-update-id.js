import { query } from "../../../db.js";

export const handleQuestionUpdateById = async (req, res) => {
  const { questionId } = req.params;
  const { questionText, questionTypeId, examId, courseId, createdByUserId } =
    req.body;

  try {
    const sql =
      "UPDATE Question SET QuestionText = ?, QuestionTypeID = ?, ExamID = ?, CourseID = ?, CreatedByUserID = ? WHERE QuestionID = ?";
    const [result] = await query(sql, [
      questionText,
      questionTypeId,
      examId,
      courseId,
      createdByUserId,
      questionId,
    ]);

    if (result.affectedRows === 1) {
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
