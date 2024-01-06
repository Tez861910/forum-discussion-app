import { query } from "../../../db.js";

export const handleAttemptUpdate = async (req, res) => {
  const { attemptId } = req.params;
  const { userId, examId, startTime, endTime, status } = req.body;

  try {
    const sql =
      "UPDATE ExamAttempt SET UserID = ?, ExamID = ?, StartTime = ?, EndTime = ?, Status = ? WHERE AttemptID = ?";
    const [result] = await query(sql, [
      userId,
      examId,
      startTime,
      endTime,
      status,
      attemptId,
    ]);

    if (result.affectedRows === 1) {
      console.log("Exam attempt updated successfully");
      res.json({ message: "Exam attempt updated successfully" });
    } else {
      console.error("Exam attempt update failed");
      res.status(500).json({ error: "Exam attempt update failed" });
    }
  } catch (error) {
    console.error("Error updating exam attempt:", error);
    res
      .status(500)
      .json({ error: "Exam attempt update failed", details: error.message });
  }
};
