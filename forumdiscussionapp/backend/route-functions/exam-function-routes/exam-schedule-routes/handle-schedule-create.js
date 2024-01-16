import { sequelize } from "../../../db.js";

export const handleScheduleCreate = async (req, res) => {
  const { examId, startTime, endTime, createdByUserId } = req.body;

  const ExamSchedules = sequelize.models.ExamSchedules;

  try {
    const result = await ExamSchedules.create({
      ExamID: examId,
      StartTime: startTime,
      EndTime: endTime,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("Exam schedule created successfully");
      res.json({ message: "Exam schedule created successfully" });
    } else {
      console.error("Exam schedule creation failed");
      res.status(500).json({ error: "Exam schedule creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam schedule:", error);
    res
      .status(500)
      .json({ error: "Exam schedule creation failed", details: error.message });
  }
};
