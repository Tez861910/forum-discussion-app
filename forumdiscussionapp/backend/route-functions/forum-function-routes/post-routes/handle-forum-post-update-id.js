import { sequelize } from "../../../db.js";

export const handleForumPostUpdateById = async (req, res) => {
  const { forumPostId } = req.params;
  const { postContent } = req.body;

  try {
    if (!postContent) {
      console.log("PostContent is required for update");
      return res
        .status(400)
        .json({ error: "PostContent is required for update" });
    }

    const ForumPosts = sequelize.models.ForumPosts;

    const result = await ForumPosts.update(
      { PostContent: postContent },
      { where: { ForumPostID: forumPostId } }
    );

    if (result[0] === 1) {
      console.log("Forum post updated successfully");
      res.json({ message: "Forum post updated successfully" });
    } else {
      console.error("Forum post update failed");
      res.status(500).json({ error: "Forum post update failed" });
    }
  } catch (error) {
    console.error("Error updating forum post:", error);
    res
      .status(500)
      .json({ error: "Forum post update failed", details: error.message });
  }
};
