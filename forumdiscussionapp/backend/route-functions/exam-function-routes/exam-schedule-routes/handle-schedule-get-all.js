import { query } from "../../../db.js";

export const handleScheduleGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM ExamSchedule";
    const [result] = await query(sql);

    console.log("Exam schedules retrieved successfully");
    res.json({ examSchedules: result });
  } catch (error) {
    console.error("Error getting exam schedules:", error);
    res
      .status(500)
      .json({ error: "Error getting exam schedules", details: error.message });
  }
};
