import { query } from "../../../db.js";

export const handleForumPostGet = async (req, res) => {
  try {
    const sql = "SELECT * FROM ForumsPosts";
    const [result] = await query(sql);

    console.log("Forum posts retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum posts:", error);
    res
      .status(500)
      .json({ error: "Error getting forum posts", details: error.message });
  }
};
