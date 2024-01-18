import { sequelize } from "../../../db.js";

export const handleForumModeratorGetForumId = async (req, res) => {
  const { forumId } = req.params;

  try {
    const ForumModerators = sequelize.models.ForumModerators;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch forum moderators for the specified forumId with a join on CommonAttributes to check for IsDeleted
    const result = await ForumModerators.findAll({
      where: { ForumID: forumId },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: {
            IsDeleted: false,
          },
        },
      ],
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
