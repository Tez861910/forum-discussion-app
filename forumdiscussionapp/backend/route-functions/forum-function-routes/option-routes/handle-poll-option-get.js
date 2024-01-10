import { query } from "../../../db.js";

export const handlePollOptionGet = async (req, res) => {
  try {
    const sql = "SELECT * FROM PollOptions";
    const [result] = await query(sql);

    console.log("Poll options retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting poll options:", error);
    res
      .status(500)
      .json({ error: "Error getting poll options", details: error.message });
  }
};