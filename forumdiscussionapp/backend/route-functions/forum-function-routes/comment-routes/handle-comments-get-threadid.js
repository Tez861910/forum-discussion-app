import { sequelize } from "../../../db.js";

export const handleCommentGetThreadId = async (req, res) => {
  const { threadId } = req.params;

  try {
    const Comments = sequelize.models.Comments;

    const results = await Comments.findAll({
      where: { ThreadID: threadId },
    });

    res.status(200).json({ comments: results });
  } catch (error) {
    console.error("Failed to retrieve comments:", error);
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};
