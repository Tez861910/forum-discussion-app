import { sequelize } from "../../../db.js";

export const handleScheduleUpdate = async (req, res) => {
  const { scheduleId } = req.params;
  const { examId, startTime, endTime, createdByUserId } = req.body;

  try {
    const ExamSchedules = sequelize.models.ExamSchedules;
    const result = await ExamSchedules.update(
      {
        ExamID: examId,
        StartTime: startTime,
        EndTime: endTime,
        CreatedByUserID: createdByUserId,
      },
      {
        where: {
          ScheduleID: scheduleId,
        },
      }
    );

    if (result[0] === 1) {
      console.log("Exam schedule updated successfully");
      res.json({ message: "Exam schedule updated successfully" });
    } else {
      console.error("Exam schedule update failed");
      res.status(500).json({ error: "Exam schedule update failed" });
    }
  } catch (error) {
    console.error("Error updating exam schedule:", error);
    res
      .status(500)
      .json({ error: "Exam schedule update failed", details: error.message });
  }
};
