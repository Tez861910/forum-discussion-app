import { sequelize } from "../../../db.js";

export const handleResultUpdate = async (req, res) => {
  const { resultId } = req.params;
  const { userId, examId, totalScore, percentage, additionalMetrics } =
    req.body;

  try {
    const Results = sequelize.models.Results;
    const result = await Results.update(
      {
        UserID: userId,
        ExamID: examId,
        TotalScore: totalScore,
        Percentage: percentage,
        AdditionalMetrics: additionalMetrics,
      },
      {
        where: { ResultID: resultId },
      }
    );

    if (result[0] === 1) {
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
