import { sequelize } from "../../../db.js";

export const handleForumModeratorGet = async (req, res) => {
  try {
    const ForumModerators = sequelize.models.ForumModerators;

    const result = await ForumModerators.findAll();

    console.log("Forum moderators retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forum moderators:", error);
    res.status(500).json({
      error: "Error getting forum moderators",
      details: error.message,
    });
  }
};
