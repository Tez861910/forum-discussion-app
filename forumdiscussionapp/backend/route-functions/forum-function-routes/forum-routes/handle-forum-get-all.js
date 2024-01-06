import { query } from "../../../db.js";

export const handleForumGetAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM Forums";
    const [result] = await query(sql);

    console.log("Forums retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forums:", error);
    res
      .status(500)
      .json({ error: "Error getting forums", details: error.message });
  }
};
