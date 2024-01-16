import { sequelize } from "../../../db.js";

export const handleForumPostDeleteById = async (req, res) => {
  const { forumPostId } = req.params;

  try {
    const ForumPosts = sequelize.models.ForumPosts;

    const result = await ForumPosts.destroy({
      where: { ForumPostID: forumPostId },
    });

    if (result === 1) {
      console.log("Forum post deleted successfully");
      res.json({ message: "Forum post deleted successfully" });
    } else {
      console.error("Forum post deletion failed");
      res.status(500).json({ error: "Forum post deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting forum post:", error);
    res
      .status(500)
      .json({ error: "Error deleting forum post", details: error.message });
  }
};
