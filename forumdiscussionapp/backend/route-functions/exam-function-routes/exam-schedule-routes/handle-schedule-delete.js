import { sequelize } from "../../../db.js";

export const handleScheduleDelete = async (req, res) => {
  const { scheduleId } = req.params;

  const ExamSchedules = sequelize.models.ExamSchedules;

  try {
    const result = await ExamSchedules.destroy({
      where: {
        ScheduleID: scheduleId,
      },
    });

    if (result === 1) {
      console.log("Exam schedule deleted successfully");
      res.json({ message: "Exam schedule deleted successfully" });
    } else {
      console.error("Exam schedule deletion failed");
      res.status(500).json({ error: "Exam schedule deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam schedule:", error);
    res
      .status(500)
      .json({ error: "Exam schedule deletion failed", details: error.message });
  }
};
