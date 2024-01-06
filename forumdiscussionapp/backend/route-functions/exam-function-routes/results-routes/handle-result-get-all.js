import { query } from "../../../db.js";

export const handleResultGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM Results";
    const [result] = await query(sql);

    console.log("Exam results retrieved successfully");
    res.json({ examResults: result });
  } catch (error) {
    console.error("Error getting exam results:", error);
    res
      .status(500)
      .json({ error: "Error getting exam results", details: error.message });
  }
};
