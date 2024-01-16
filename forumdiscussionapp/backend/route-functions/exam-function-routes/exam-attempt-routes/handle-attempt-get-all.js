import { sequelize } from "../../../db.js";

export const handleAttemptGetAll = async (req, res) => {
  try {
    const ExamAttempts = sequelize.models.ExamAttempts;
    const result = await ExamAttempts.findAll();

    console.log("Exam attempts retrieved successfully");
    res.json({ examAttempts: result });
  } catch (error) {
    console.error("Error getting exam attempts:", error);
    res
      .status(500)
      .json({ error: "Error getting exam attempts", details: error.message });
  }
};
