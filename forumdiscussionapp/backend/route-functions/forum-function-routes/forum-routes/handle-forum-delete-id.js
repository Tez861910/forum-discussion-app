import { query } from "../../../db.js";

export const handleForumDeleteById = async (req, res) => {
  const { forumId } = req.params;

  try {
    const sql = "DELETE FROM Forums WHERE ForumID = ?";
    const result = await query(sql, [forumId]);

    if (result.affectedRows === 1) {
      console.log("Forum deleted successfully");
      res.json({ message: "Forum deleted successfully" });
    } else {
      console.error("Forum deletion failed");
      res.status(500).json({ error: "Forum deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting forum:", error);
    res
      .status(500)
      .json({ error: "Error deleting forum", details: error.message });
  }
};
