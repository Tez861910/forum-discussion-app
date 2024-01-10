import { query } from "../../../db.js";

export const handleCommentGet = async (req, res) => {
  const { threadId } = req.params;

  try {
    const sql = "SELECT * FROM comments";
    const [results] = await query(sql, [threadId]);

    console.log("Comments fetched successfully");
    res.json({ comments: results });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "Comment retrieval failed", details: error.message });
  }
};