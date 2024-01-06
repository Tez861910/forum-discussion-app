import { query } from "../../../db.js";

export const handleAttemptGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM ExamAttempt";
    const [result] = await query(sql);

    console.log("Exam attempts retrieved successfully");
    res.json({ examAttempts: result });
  } catch (error) {
    console.error("Error getting exam attempts:", error);
    res
      .status(500)
      .json({ error: "Error getting exam attempts", details: error.message });
  }
};
