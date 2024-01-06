import { query } from "../../../db.js";

export const handleMCQOptionsGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM MCQOptions";
    const [result] = await query(sql);

    console.log("MCQ options retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting MCQ options:", error);
    res
      .status(500)
      .json({ error: "Error getting MCQ options", details: error.message });
  }
};
