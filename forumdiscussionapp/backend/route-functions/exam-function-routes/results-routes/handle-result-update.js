import { query } from "../../../db.js";

export const handleResultUpdate = async (req, res) => {
  const { resultId } = req.params;
  const { userId, examId, totalScore, percentage, additionalMetrics } =
    req.body;

  try {
    const sql =
      "UPDATE Results SET UserID = ?, ExamID = ?, TotalScore = ?, Percentage = ?, AdditionalMetrics = ? WHERE ResultID = ?";
    const [result] = await query(sql, [
      userId,
      examId,
      totalScore,
      percentage,
      additionalMetrics,
      resultId,
    ]);

    if (result.affectedRows === 1) {
      console.log("Exam result updated successfully");
      res.json({ message: "Exam result updated successfully" });
    } else {
      console.error("Exam result update failed");
      res.status(500).json({ error: "Exam result update failed" });
    }
  } catch (error) {
    console.error("Error updating exam result:", error);
    res
      .status(500)
      .json({ error: "Exam result update failed", details: error.message });
  }
};
