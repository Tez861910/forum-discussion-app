import { sequelize } from "../../../db.js";

export const handleUserActivityLogGetAll = async (req, res) => {
  const UserActivityLogs = sequelize.models.UserActivityLogs;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Find all UserActivityLogs where IsDeleted is false
    const result = await UserActivityLogs.findAll({
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: {
            AttributeID: sequelize.col("UserActivityLogs.CommonAttributeID"),
            IsDeleted: false,
          },
        },
      ],
    });

    console.log("User activity logs retrieved successfully");
    res.json({ userActivityLogs: result });
  } catch (error) {
    console.error("Error getting user activity logs:", error);
    res.status(500).json({
      error: "Error getting user activity logs",
      details: error.message,
    });
  }
};
