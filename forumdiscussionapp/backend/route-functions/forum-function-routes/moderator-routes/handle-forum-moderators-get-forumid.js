import { sequelize } from "../../../db.js";

export const handleForumModeratorGetForumId = async (req, res) => {
  const { forumId } = req.params;

  try {
    const ForumModerators = sequelize.models.ForumModerators;

    const result = await ForumModerators.findAll({
      where: { ForumID: forumId },
    });

    console.log(
      "Forum moderators retrieved successfully for forumId:",
      forumId
    );
    res.json(result);
  } catch (error) {
    console.error(
      "Error getting forum moderators for forumId:",
      forumId,
      error
    );
    res.status(500).json({
      error: "Error getting forum moderators",
      details: error.message,
    });
  }
};
