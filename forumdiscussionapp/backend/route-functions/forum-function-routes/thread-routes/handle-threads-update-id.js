import { sequelize } from "../../../db.js";

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

    const Threads = sequelize.models.Threads;

    const result = await Threads.update(
      { ThreadTitle: title, ThreadContent: content, ForumID: forumId },
      { where: { ThreadID: threadId } }
    );

    if (result[0] === 1) {
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
