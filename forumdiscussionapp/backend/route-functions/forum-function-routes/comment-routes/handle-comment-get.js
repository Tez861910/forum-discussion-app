import { sequelize } from "../../../db.js";

export const handleCommentGet = async (req, res) => {
  const { threadId } = req.params;

  try {
    const Comments = sequelize.models.Comments;
    const results = await Comments.findAll({
      where: { ThreadID: threadId },
    });

    console.log("Comments fetched successfully");
    res.json({ comments: results });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "Comment retrieval failed", details: error.message });
  }
};
