import { query } from "../../../db.js";

export const handleForumPostCreate = async (req, res) => {
  const { forumId } = req.params;
  const { userId, postContent } = req.body;

  try {
    if (!userId || !postContent) {
      console.log("UserID and PostContent are required");
      return res
        .status(400)
        .json({ error: "UserID and PostContent are required" });
    }

    const sql =
      "INSERT INTO ForumsPosts (ForumID, UserID, PostContent) VALUES (?, ?, ?)";
    const [result] = await query(sql, [forumId, userId, postContent]);

    if (result.affectedRows === 1) {
      console.log("Forum post created successfully");
      res.json({ message: "Forum post created successfully" });
    } else {
      console.error("Forum post creation failed");
      res.status(500).json({ error: "Forum post creation failed" });
    }
  } catch (error) {
    console.error("Error creating forum post:", error);
    res
      .status(500)
      .json({ error: "Forum post creation failed", details: error.message });
  }
};
