import { sequelize } from "../../../db.js";

export const handleCommentCreate = async (req, res) => {
  const { threadId } = req.params;
  const { content, userId } = req.body;

  try {
    if (!content) {
      console.log("Comment content is required");
      return res.status(400).json({ error: "Comment content is required" });
    }

    const Comments = sequelize.models.Comments;
    const result = await Comments.create({
      CommentContent: content,
      UserID: userId,
      ThreadID: threadId,
    });

    if (result) {
      console.log("Comment created successfully");
      res.json({ message: "Comment created successfully" });
    } else {
      console.error("Comment creation failed");
      res.status(500).json({ error: "Comment creation failed" });
    }
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "Comment creation failed", details: error.message });
  }
};
