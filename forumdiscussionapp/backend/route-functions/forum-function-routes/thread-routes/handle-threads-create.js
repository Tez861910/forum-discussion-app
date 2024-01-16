import { sequelize } from "../../../db.js";

export const handleThreadsCreate = async (req, res) => {
  const { title, content, forumId, userId } = req.body;

  try {
    if (!title || !content || !forumId || !userId) {
      console.log("Title, content, forumId, and userId are required");
      return res
        .status(400)
        .json({ error: "Title, content, forumId, and userId are required" });
    }

    const Threads = sequelize.models.Threads;

    const result = await Threads.create({
      ThreadTitle: title,
      ThreadContent: content,
      ForumID: forumId,
      UserID: userId,
    });

    if (result) {
      console.log("Thread created successfully");
      res.json({ message: "Thread created successfully" });
    } else {
      console.error("Thread creation failed");
      res.status(500).json({ error: "Thread creation failed" });
    }
  } catch (error) {
    console.error("Error creating thread:", error);
    res
      .status(500)
      .json({ error: "Thread creation failed", details: error.message });
  }
};
