import { sequelize } from "../../../db.js";

export const handleScheduleGetAll = async (req, res) => {
  try {
    const ExamSchedules = sequelize.models.ExamSchedules;
    const result = await ExamSchedules.findAll();

    console.log("Exam schedules retrieved successfully");
    res.json({ examSchedules: result });
  } catch (error) {
    console.error("Error getting exam schedules:", error);
    res
      .status(500)
      .json({ error: "Error getting exam schedules", details: error.message });
  }
};
