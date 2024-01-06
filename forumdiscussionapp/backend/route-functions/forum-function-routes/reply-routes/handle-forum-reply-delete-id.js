import { query } from "../../../db.js";

export const handleForumReplyDeleteById = async (req, res) => {
  const { forumReplyId } = req.params;

  try {
    const sql = "DELETE FROM ForumsReplies WHERE ForumReplyID = ?";
    const [result] = await query(sql, [forumReplyId]);

    if (result.affectedRows === 1) {
      console.log("Forum reply deleted successfully");
      res.json({ message: "Forum reply deleted successfully" });
    } else {
      console.error("Forum reply deletion failed");
      res.status(500).json({ error: "Forum reply deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting forum reply:", error);
    res
      .status(500)
      .json({ error: "Error deleting forum reply", details: error.message });
  }
};
