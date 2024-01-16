import { sequelize } from "../../../db.js";

export const handleResultCreate = async (req, res) => {
  const { userId, examId, totalScore, percentage, additionalMetrics } =
    req.body;

  try {
    const Results = sequelize.models.Results;
    const newResult = await Results.create({
      UserID: userId,
      ExamID: examId,
      TotalScore: totalScore,
      Percentage: percentage,
      AdditionalMetrics: additionalMetrics,
    });

    if (newResult) {
      console.log("Exam result created successfully");
      res.json({ message: "Exam result created successfully" });
    } else {
      console.error("Exam result creation failed");
      res.status(500).json({ error: "Exam result creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam result:", error);
    res
      .status(500)
      .json({ error: "Exam result creation failed", details: error.message });
  }
};
