import { sequelize } from "../../../db.js";

export const handleAttemptDelete = async (req, res) => {
  const { attemptId } = req.params;

  const ExamAttempts = sequelize.models.ExamAttempts;

  try {
    const result = await ExamAttempts.destroy({
      where: {
        AttemptID: attemptId,
      },
    });

    if (result === 1) {
      console.log("Exam attempt deleted successfully");
      res.json({ message: "Exam attempt deleted successfully" });
    } else {
      console.error("Exam attempt deletion failed");
      res.status(500).json({ error: "Exam attempt deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam attempt:", error);
    res
      .status(500)
      .json({ error: "Exam attempt deletion failed", details: error.message });
  }
};
