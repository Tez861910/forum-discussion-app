import { query } from "../../../db.js";

export const handleForumUpdateById = async (req, res) => {
  const { forumId } = req.params;
  const { forumName, forumDescription } = req.body;

  try {
    if (!forumName && !forumDescription) {
      console.log(
        "At least one field (forumName or forumDescription) is required for update"
      );
      return res.status(400).json({
        error:
          "At least one field (forumName or forumDescription) is required for update",
      });
    }

    const sql =
      "UPDATE Forums SET ForumName = ?, ForumDescription = ? WHERE ForumID = ?";
    const [result] = await query(sql, [forumName, forumDescription, forumId]);

    if (result.affectedRows === 1) {
      console.log("Forum updated successfully");
      res.json({ message: "Forum updated successfully" });
    } else {
      console.error("Forum update failed");
      res.status(500).json({ error: "Forum update failed" });
    }
  } catch (error) {
    console.error("Error updating forum:", error);
    res
      .status(500)
      .json({ error: "Forum update failed", details: error.message });
  }
};
