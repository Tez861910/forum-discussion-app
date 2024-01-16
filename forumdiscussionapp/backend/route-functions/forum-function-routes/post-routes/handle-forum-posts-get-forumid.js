import { sequelize } from "../../../db.js";

export const handleForumPostGetForumId = async (req, res) => {
  const { forumId } = req.params;

  try {
    const ForumPosts = sequelize.models.ForumPosts;

    const result = await ForumPosts.findAll({ where: { ForumID: forumId } });

    console.log("Forum posts retrieved successfully for forumId:", forumId);
    res.json(result);
  } catch (error) {
    console.error("Error getting forum posts for forumId:", forumId, error);
    res
      .status(500)
      .json({ error: "Error getting forum posts", details: error.message });
  }
};
