import { query } from "../../../db.js";

export const handleExamUpdateById = async (req, res) => {
  const { examId } = req.params;
  const { examName, examStatus, examDuration, instructions, courseId } =
    req.body;

  try {
    const sql =
      "UPDATE Exam SET ExamName = ?, ExamStatus = ?, ExamDuration = ?, Instructions = ?, CourseID = ? WHERE ExamID = ?";
    const [result] = await query(sql, [
      examName,
      examStatus,
      examDuration,
      instructions,
      courseId,
      examId,
    ]);

    if (result.affectedRows === 1) {
      console.log("Exam updated successfully");
      res.json({ message: "Exam updated successfully" });
    } else {
      console.error("Exam update failed");
      res.status(500).json({ error: "Exam update failed" });
    }
  } catch (error) {
    console.error("Error updating exam:", error);
    res
      .status(500)
      .json({ error: "Exam update failed", details: error.message });
  }
};
