import { sequelize } from "../../../db.js";

export const handleCommentDeleteId = async (req, res) => {
  const { commentId } = req.params;

  try {
    const Comments = sequelize.models.Comments;
    const result = await Comments.destroy({
      where: { CommentID: commentId },
    });

    if (result === 1) {
      console.log("Comment deleted successfully");
      res.json({ message: "Comment deleted successfully" });
    } else {
      console.error("Comment deletion failed");
      res.status(500).json({ error: "Comment deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ error: "Comment deletion failed", details: error.message });
  }
};
