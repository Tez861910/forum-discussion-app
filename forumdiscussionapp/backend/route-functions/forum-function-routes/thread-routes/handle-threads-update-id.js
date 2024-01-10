import { query } from "../../../db.js";

export const handleThreadsUpdateId = async (req, res) => {
  const { threadId } = req.params;
  const { title, content, forumId } = req.body;

  try {
    if (!title || !content || !forumId) {
      console.log("Title, content, forumId, and userId are required");
      return res
        .status(400)
        .json({ error: "Title, content, forumId, and userId are required" });
    }

    const sql =
      "UPDATE Threads SET ThreadTitle = ?, ThreadContent = ?, ForumID = ? WHERE ThreadID = ?";
    const result = await query(sql, [title, content, forumId, threadId]);

    if (result.affectedRows === 1) {
      console.log("Thread updated successfully");
      res.json({ message: "Thread updated successfully" });
    } else {
      console.error("Thread update failed");
      res.status(500).json({ error: "Thread update failed" });
    }
  } catch (error) {
    console.error("Error updating thread:", error);
    res
      .status(500)
      .json({ error: "Thread update failed", details: error.message });
  }
};
