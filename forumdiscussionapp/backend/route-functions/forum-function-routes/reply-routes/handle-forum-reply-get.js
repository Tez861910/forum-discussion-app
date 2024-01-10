import { query } from "../../../db.js";

export const handleForumReplyGet = async (req, res) => {
  try {
    const sql = "SELECT * FROM ForumsReplies";
    const [result] = await query(sql);

    console.log("Forum replies retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum replies:", error);
    res
      .status(500)
      .json({ error: "Error getting forum replies", details: error.message });
  }
};