import { sequelize } from "../../../db.js";

export const handleForumModeratorGetUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const ForumModerators = sequelize.models.ForumModerators;

    const result = await ForumModerators.findAll({
      where: { UserID: userId },
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
