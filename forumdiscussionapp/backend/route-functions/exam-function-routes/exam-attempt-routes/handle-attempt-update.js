import { sequelize } from "../../../db.js";

export const handleAttemptUpdate = async (req, res) => {
  const { attemptId } = req.params;
  const { userId, examId, startTime, endTime, status } = req.body;

  const ExamAttempts = sequelize.models.ExamAttempts;

  try {
    const result = await ExamAttempts.update(
      {
        UserID: userId,
        ExamID: examId,
        StartTime: startTime,
        EndTime: endTime,
        Status: status,
      },
      {
        where: {
          AttemptID: attemptId,
        },
      }
    );

    if (result[0] === 1) {
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
