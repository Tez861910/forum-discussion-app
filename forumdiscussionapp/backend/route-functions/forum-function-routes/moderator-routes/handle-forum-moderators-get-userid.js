import { sequelize } from "../../../db.js";

export const handleForumModeratorGetUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const ForumModerators = sequelize.models.ForumModerators;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch forum moderators for the specified userId with a join on CommonAttributes to check for IsDeleted
    const result = await ForumModerators.findAll({
      where: { UserID: userId },
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

    console.log("Forum moderators retrieved successfully for userId:", userId);
    res.json(result);
  } catch (error) {
    console.error("Error getting forum moderators for userId:", userId, error);
    res.status(500).json({
      error: "Error getting forum moderators",
      details: error.message,
    });
  }
};
