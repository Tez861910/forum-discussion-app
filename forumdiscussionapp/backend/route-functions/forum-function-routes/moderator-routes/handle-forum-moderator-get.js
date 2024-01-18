import { sequelize } from "../../../db.js";

export const handleForumModeratorGet = async (req, res) => {
  try {
    const ForumModerators = sequelize.models.ForumModerators;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch forum moderators with a join on CommonAttributes to check for IsDeleted
    const result = await ForumModerators.findAll({
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
