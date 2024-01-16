import { sequelize } from "../../../db.js";

export const handleAttemptCreate = async (req, res) => {
  const { userId, examId, startTime, endTime, status } = req.body;

  const ExamAttempts = sequelize.models.ExamAttempts;

  try {
    const result = await ExamAttempts.create({
      UserID: userId,
      ExamID: examId,
      StartTime: startTime,
      EndTime: endTime,
      Status: status,
    });

    if (result) {
      console.log("Exam attempt created successfully");
      res.json({ message: "Exam attempt created successfully" });
    } else {
      console.error("Exam attempt creation failed");
      res.status(500).json({ error: "Exam attempt creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam attempt:", error);
    res
      .status(500)
      .json({ error: "Exam attempt creation failed", details: error.message });
  }
};
